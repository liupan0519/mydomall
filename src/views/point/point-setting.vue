<style lang="less">
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Form :label-width="100">
      <Card>
        <p slot="title">积分设置</p>
        <Row type="flex" justify="start">
          <Col span="2">
            <FormItem label="消费送积分">
              <i-switch v-model="pointSetting.enabled" size="large">
                <span slot="open">开启</span>
                <span slot="close">关闭</span>
              </i-switch>
            </FormItem>
          </Col>
          <Col span="6"  v-if="pointSetting.enabled">
            <FormItem>
              每消费<inputNumber :precision="2" v-model="pointSetting.amount"></inputNumber>元赠送<inputNumber v-model="pointSetting.point"></inputNumber>积分
            </FormItem>
          </Col>
        </Row>     
        <Button @click="updatePointSetting" type="primary" size="large" :loading="loading">保存</Button>
      </Card>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      pointSetting: {}
    };
  },
  methods: {
    updatePointSetting() {
      this.loading = true;
      this.$http
        .post(
          "/admin/updatePointSetting",
          this.common.request(this.pointSetting)
        )
        .then(
          response => {
            this.loading = false;
            if (response.data.body.status.statusCode == 0) {
              this.$Notice.success({
                title: "成功",
                desc: "积分设置已保存",
                duration: 2
              });
            } else {
              this.$Message.error(response.data.body.status.errorDesc);
            }
          },
          response => {
            this.loading = false;
          }
        );
    },
    getPointSetting() {
      this.$http
        .post("/admin/getPointSetting", this.common.request({}))
        .then(
          response => {
            if (response.data.body.status.statusCode == 0) {
              this.pointSetting = response.data.body.data;
            }
          },
          response => {}
        );
    }
  },
  created() {},
  mounted() {
    this.getPointSetting();
  },
  destroyed() {}
};
</script>
<style>

</style>
