<style lang="less">
@import "../../styles/common.less";
</style>

<template>
  <div>
    <!-- <Spin size="large" fix v-if="spinShow" class="mask"></Spin> -->
    <Form :label-width="150">
      <Card>
        <p slot="title">提现手续费</p>
        <Row type="flex" justify="start">
          <Col span="4">
            <FormItem label="会员提现手续费率:">
              %
              <InputNumber
                v-model="taxRate"
                style="width:80%"
                :min="0"
                :max="100"
                placeholder="会员提现时授权的手续费"
              >
              </InputNumber>
            </FormItem>
          </Col>
          <Col span="8">
          <Alert style="display:inline-block" type="info">设置为0表示不收取手续费</Alert>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col span="4">
            <FormItem label="商家提现手续费率:">
              %
              <InputNumber
                v-model="merchantTaxRate"
                style="width:80%"
                :min="0"
                :max="100"
                placeholder="商家提现时收取的手续费"
              >
              </InputNumber>
            </FormItem>
          </Col>
          <Col span="8">
          <Alert style="display:inline-block" type="info">设置为0表示不收取手续费</Alert>
          </Col>
        </Row>
        <Button type="primary" size="large" @click="changeTaxRateSetting()" :loading="loading">保存</Button>
      </Card>
    </Form>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      loading: false,
      taxRate: 0,
      merchantTaxRate: 0
    };
  },
  methods: {
    changeTaxRateSetting() {
      this.loading = true;
      let options = {
        settings: [
          {
            name: "TAX_RATE",
            value: this.taxRate
          },
          {
            name: "TAX_RATE_MERCHANT",
            value: this.merchantTaxRate
          }
        ]
      };
      this.$http.post("/admin/changeParameter", this.common.request(options)).then(
        response => {
          this.loading = false;
          if (response.data.body.status.statusCode == 0) {
            var data = response.data.body.data;
            this.$Notice.success({
              desc: "已经成功保存提现手续费参数",
              duration: 2
            });
          } else {
            this.$Message.error("出错了，请稍后重试");
          }
        },
        response => {
          this.loading = false;
          this.$Message.error("出错了，请稍后重试");
        }
      );
    },
    inquiryParameter(name) {
      let options = {
        name: name
      };
      this.$http.post("/inquiryParameter", this.common.request(options)).then(
        response => {
          if (response.data.body.status.statusCode == 0) {
              if(name=='TAX_RATE')
                this.taxRate = Number(response.data.body.data.value);
              if(name=='TAX_RATE_MERCHANT')
                this.merchantTaxRate = Number(response.data.body.data.value);
          }
        },
        response => {}
      );
    }
  },
  created() {},
  mounted() {
    this.inquiryParameter("TAX_RATE");
    this.inquiryParameter("TAX_RATE_MERCHANT");
  },
  destroyed() {}
};
</script>
<style>

</style>
