<style lang="less">
@import "../../styles/common.less";
</style>

<template>
  <div>
    <Form :label-width="200">
      <Card>
        <p slot="title">{{$t('print.title')}}</p>
        <Row type="flex" justify="start">
          <Col span="12">
            <FormItem :label="$t('print.feieUser')">
              <Input
                v-model="printSetting.feieUser"
                style="width:80%"
                :maxlength="100"
                :placeholder="$t('print.feieUserPH')"
              />
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col span="12">
            <FormItem :label="$t('print.feieUkey')">
              <Input
                v-model="printSetting.feieUkey"
                style="width:80%"
                :maxlength="100"
                :placeholder="$t('print.feieUkeyPH')"
              />
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col span="12">
            <FormItem :label="$t('print.feieSn')">
              <Input
                v-model="printSetting.feieSn"
                style="width:80%"
                :maxlength="100"
                :placeholder="$t('print.feieSnPH')"
              />
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col span="12">
            <FormItem :label="$t('print.feieKey')">
              <Input
                v-model="printSetting.feieKey"
                style="width:80%"
                :maxlength="100"
                :placeholder="$t('print.feieKeyPH')"
              />
            </FormItem>
          </Col>
        </Row>
         <Row type="flex" justify="start">
          <Alert style="display:inline-block" type="warning">{{$t('print.warning')}}</Alert>
        </Row>
        <Button @click="updatePrintSetting" type="primary" size="large" :loading="loading">{{$t('btn.save')}}</Button>
      </Card>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      printSetting: {}
    };
  },
  methods: {
    updatePrintSetting() {
      this.loading = true;
      this.$http
        .post(
          "/merchant/updatePrintSetting",
          this.common.request(this.printSetting)
        )
        .then(
          response => {
            this.loading = false;
            if (response.data.body.status.statusCode == 0) {
              this.$Notice.success({
                title: this.$t('common.successStr'),
                desc: this.$t('print.saveSuccess'),
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
    getPrintSetting() {
      var merchantUuid = this.common.getObject('MERCHANTUUID');
      this.$http
        .post("/merchant/getPrintSetting", this.common.request({
          merchantUuid: merchantUuid
        }))
        .then(
          response => {
            if (response.data.body.status.statusCode == 0) {
              this.printSetting = response.data.body.data;
            }
          },
          response => {}
        );
    }
  },
  created() {},
  mounted() {
    this.getPrintSetting();
  },
  destroyed() {}
};
</script>
<style>

</style>
