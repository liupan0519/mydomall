<style lang="less">
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Form ref="groupBuy" :label-width="120">
      <Card>
        <p slot="title">{{$t('withdraw.applicationTitle')}}</p>
        <Row>
          <Col span="24">
            <Row type="flex" justify="start">
              <Col span="6">
                <FormItem :label="$t('withdraw.availableBalance')">
                  <Span style="width:200px;font-size:20px;color: red">{{availableBalance}}元</Span>
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col span="8">
                <FormItem :label="$t('withdraw.withdrawAmount')">
                  <InputNumber :min="100" v-model="withdrawAmount" style="width:200px"></InputNumber>&nbsp;&nbsp;&nbsp;<a @click="withdrawAmount = availableBalance">全部提现</a>
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col span="8">
                <FormItem :label="$t('withdraw.paymentMethod')" prop="paymentMethod">
                  <Select v-model="paymentMethod" style="width:200px">
                    <Option value="BANK">{{$t('common.bank')}}</Option>
                    <Option value="ALIPAY">{{$t('common.alipay')}}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="start" v-if="paymentMethod=='BANK'">
              <Col span="6">
                <FormItem :label="$t('withdraw.bankAccountName')">
                  <Input v-model="bankAccountName" style="width:200px"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="start" v-if="paymentMethod=='BANK'">
              <Col span="6">
                <FormItem :label="$t('withdraw.bankName')" prop="bankName">
                  <Select v-model="bankName" style="width:200px">
                    <Option :value="bank.label" v-for="bank in bankList">{{bank.label}}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="start" v-if="paymentMethod=='BANK'">
              <Col span="6">
                <FormItem :label="$t('withdraw.bankAccountNo')">
                  <Input v-model="bankAccountNo" style="width:200px"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="start" v-if="paymentMethod=='ALIPAY'">
              <Col span="6">
                <FormItem :label="$t('withdraw.alipayId')">
                  <Input v-model="alipayId" style="width:200px"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col span="6">
                  <span style="color:red">{{$t('withdraw.warning',{
										'merchantTaxRate':merchantTaxRate
									})}}</span>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </Form>

    <div class="margin-top-10">
      <Button size="large" type="default" @click="back()" class="margin-right-10">{{$t('btn.back')}}</Button>
      <Button type="primary" size="large" :loading="loading" @click="submit" icon="checkmark">{{$t('btn.submit')}}</Button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      paymentMethod: "BANK", //银行储蓄账号
      bankAccountName: "",
      bankName: this.$t('withdraw.bankNameDefault'),
      bankList: this.common.bankList,
      bankAccountNo: "",
      alipayId: "",
      withdrawAmount: 100,
      availableBalance: null,
      merchantTaxRate: 0,
      loading: false
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    submit() {
      let that = this;
      //检查金额
				if(!this.withdrawAmount){
          this.$Message.error(that.$t('withdraw.emptyWithdrawAmount'));
					return;
				}
				if(this.withdrawAmount===0 || this.withdrawAmount>this.availableBalance){
					this.$Message.error(that.$t('withdraw.validWithdrawAmount'));
					return;
				}
				//如果是银行卡提现, 检查各项输入是否正确
				if(this.paymentMethod=='BANK'){
					if(!this.bankAccountName){
						this.$Message.error(that.$t('withdraw.emptyAccountName'));
						return;
					}
					if(!this.bankName){
						this.$Message.error(that.$t('withdraw.emptyBankName'));
						return;
					}
					if(!this.bankAccountNo){
						this.$Message.error(that.$t('withdraw.emptyAccountNo'));
						return;
					}
				}
				//如果是支付宝提现, 检查各项输入是否正确
				if(this.paymentMethod=='ALIPAY'){
					if(!this.alipayId){
						this.$Message.error(that.$t('withdraw.emptyAlipayId'));
						return;
					}
				}
				let options = {
					merchantDTO:{
						merchantUuid: this.common.getObject('MERCHANTUUID')
					},
					withdrawAmount: this.withdrawAmount,
					bankAccountName: this.bankAccountName,
					bankName: this.bankName,
					bankAccountNo: this.bankAccountNo,
					alipayId: this.alipayId,
					paymentMethod: this.paymentMethod
				}
      this.loading = true;
      this.$http
        .post("/merchant/applyWithdraw", this.common.request(options))
        .then(
          response => {
            this.loading = false;
            if (response.data.body.status.statusCode == 0) {
              var data = response.data.body.data;
              this.$Notice.success({
                title: that.$t('common.successStr'),
                desc: that.$t('withdraw.applyWithdraw'),
                duration: 2
              });
              this.$router.push({
                name: "fundwithdraw"
              });
            } else {
              this.$Message.error(response.data.body.status.errorDesc);
            }
          },
          response => {
            this.loading = false;
            this.$Message.error(that.$t('common.saveError'));
          }
        );
    },
    inquiryTaxRate() {
      this.$http
        .post(
          "/inquiryParameter",
          this.common.request({
            name: "TAX_RATE_MERCHANT"
          })
        )
        .then(
          response => {
            if (response.data.body.status.statusCode == 0) {
              this.merchantTaxRate = response.data.body.data.value;
            }
          },
          response => {}
        );
    },
    inquiryBalance() {
      this.$http
        .post(
          "/merchant/inquiryMerchant",
          this.common.request({
            merchantUuid: this.common.getObject('MERCHANTUUID')
          })
        )
        .then(
          response => {
            if (response.data.body.status.statusCode == 0) {
              this.availableBalance = response.data.body.data.availableBalance;
            }
          },
          response => {}
        );
    }
  },
  created() {
    this.inquiryTaxRate();
    this.inquiryBalance();
  }
};
</script>
