<style lang="less">
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Spin size="large" v-if="spinShow" class="mask"></Spin>
    <Card>
    <Form :label-width="90">
        <Row type="flex" justify="start">
          <Col span="8">
            <FormItem label="快递公司:">{{courier.result.expName}}</FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col span="8">
            <FormItem label="快递单号:">{{courier.result.number}}</FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col span="8">
            <FormItem label="快递员:">{{courier.result.courier}}</FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col span="8">
            <FormItem label="手机号码:">{{courier.result.courierPhone}}</FormItem>
          </Col>
        </Row>
      </Form>
    <Steps direction="vertical">
        <Step icon="record" :title="item.time" :content="item.status" v-for="item in courier.result.list"></Step>
    </Steps>  
    </Card>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      courierNo:'',
      courier:{
        result:{
          list:[]
        }
      }
    }
  },
  methods: {
    inquiryCourier(courierNo) {
      let searchOptions = {
        number: courierNo
      };
      this.spinShow = true;
      this.$http
        .post("/admin/getCourierInfo", this.common.request(searchOptions))
        .then(
          response => {
            this.spinShow = false;
            if (response.data.body.status.statusCode == 0) {
              var data = response.data.body.data;
              this.courier = data;
            } else {
              this.$Message.error(response.data.body.status.errorDesc);
            }
          },
          response => {
            this.$Message.error(response.data.body.status.errorDesc);
            this.spinShow = false;
          }
        );
    }
  },
  created() {
    this.courierNo = this.$route.query.courierNo;
    this.inquiryCourier(this.courierNo);
  }
};
</script>
