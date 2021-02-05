<style lang="less">
    @import '../styles/common.less';
</style>

<template>
    
    <div>
        <Form :label-width="120">
            <Card>
                <p slot="title">
                     {{$('fee.title')}}
                </p>
                <Row>
                    <Col span="6" > 
                        <FormItem :label="$('fee.exchangeRate')+'：'">
                            <InputNumber :min="minExchangeRate" v-model="merchant.exchangeRate" :placeholder="$('fee.exchangeRatePH')" ></InputNumber>%
                        </FormItem>  
                    </Col>     
                    <Col span="6" > 
                        <Button :loading="loading" type="primary" @click="updateExchangeRate()">{{$t('btn.save')}}</Button> 
                    </Col>              
                </Row>
                <Row>
                    <Col span="12" > 
                        <a style="color: #ff9900">{{$('fee.con')}}</a>
                    </Col>                  
                </Row>
            </card>
        </Form>
     </div>               
</template>

<script>
export default {
    components: {
        
    },
    data () {
        return {
            loading: false,
            mobileNo:'',
            minExchangeRate: 0,
            merchant:{}
        }
    },
    methods: {
        updateExchangeRate(){
            this.loading = true;
            let options = {
                exchangeRate:this.merchant.exchangeRate,
                mobileNo: this.mobileNo
            };
            this.$http.post("/merchant/updateExchangeRate", this.common.request(options))
			.then(response => {
				if(response.data.body.status.statusCode == 0) {
					var data = response.data.body.data;
					this.$Notice.success({
						desc: this.$('fee.updateExchangeRate'),
						duration: 2
                    });
                    this.loading=false;
				} else {
					this.$Message.error(response.data.body.status.errorDesc);
				}
			}, response => {
                this.$Message.error( this.$('comment.error'));
                this.loading=false;
			})
        },
        inquiryExchangeRate () {
            let searchOptions = {
                    'mobileNo':this.mobileNo
            }
            this.$http.post("/merchant/inquiryMerchant", this.common.request(searchOptions))  
            .then(response => {
                if(response.data.body.status.statusCode==0){
                    var data = response.data.body.data;
                    this.merchant = data;
                    if (data.closed) {
                            this.$router.push({
                                name: "login"
                              });
                        }

                }else{
                    this.$Message.error(response.data.body.status.errorDesc);
                }
            }, response => {  
                this.$Message.error(response.data.body.status.errorDesc);
            })
        },
    },
    mounted () {
        this.mobileNo = localStorage["name"];
        this.inquiryExchangeRate();
    },

};
</script>

