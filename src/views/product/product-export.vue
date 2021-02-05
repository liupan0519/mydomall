<style lang="less">
	@import '../../styles/common.less';
</style>

<template>
	<div>
		<Card>
			<p slot="title">
				商品批量导入说明
			</p>
			<ul class="text-help">
				<li>1. 先下载模板,严格按模板文件里面的说明进行EXCEL内容整理</li>
				<li>2. 点击浏览,选择整理好的EXCEL文件后直接导入</li>
				<!-- <li>3. 点击"导入",导入成功后系统会提示上传成功</li> -->
			</ul>
		</Card>
		<Card class="margin-top-10">
			<p slot="title">
				商品批量导入
			</p>
			<Row type="flex" align="middle">
				<Col span="4">
				1. 点击按钮下载商品模板
				</Col>
				<Col span="10">
				<a href="https://www.e4work.com/market/image/login_bg02.jpg" download="商品导入模板">
					<Button type="info">商品模板</Button>
				</a>
				</Col>
			</Row>
			<Row type="flex" align="middle" class="margin-top-10">
				<Col span="4">
				2. 选择文件导入
				</Col>
				<Col span="10">
				<Upload ref="upload" multiple :action="actionName" name="file" :show-upload-list="true" :on-format-error="handleFormatError"
				 :on-success="handleSuccess" :on-error="handleError" :format="['xlsx','xls','xlm','xls','xlt','xlw','csv']">
					<Button type="info" icon="ios-cloud-upload-outline">选择文件批量导入...</Button>
				</Upload>
				<!-- <Upload action="//jsonplaceholder.typicode.com/posts/">
                        <Button type="ghost" icon="ios-cloud-upload-outline">选择文件...</Button>
                    </Upload> -->
				</Col>
			</Row>
			<!-- <Row type="flex"  align="middle" class="margin-top-10">
                <Col span="4">
                    <Button :loading="loadingStatus" type="primary" @click="exportmember">导入</Button>
                </Col>
            </Row> -->
		</Card>
	</div>
</template>

<script>
	export default {

		data() {
			return {
				file: null,
				loadingStatus: false,
				actionName: this.$http.defaults.baseURL + "admin/importProductExecl" //上传图片action
			}
		},
		methods: {
			handleUpload(file) {
				this.file = file;
				return false;
			},
			exportmember() {
				if (!this.file) {
					this.$Message.error("请先选择文件")
					return;
				}
				this.loadingStatus = true;
				console.log("this.file:")
				console.log(this.file)
				// 看这里
				/* this.$refs.upload.post(this.file); */
				this.$http
					.post("/admin/importProductExecl", this.common.request({
						"file": this.file
					}))
					.then(
						response => {
							console.log(response);
							this.loadingStatus = false;
							this.$refs.upload.clearFiles()
							if (response.data.body.status.statusCode == 0) {
								var data = response.data.body.data;
								this.$Notice.success({
									title: '成功',
									desc: '商品已导入',
									duration: 2
								});
							} else {
								this.$Message.error(response.data.body.status.errorDesc);
								this.$refs.upload.clearFiles()
							}
						},
						response => {
							this.$Message.error("数据导入失败！")
							//后台调用成功后将正在加载状态取消
							this.loadingStatus = false;
							this.$refs.upload.clearFiles()
						}
					);
			},
			// 上传成功
			handleSuccess(res, file) {
				console.log(res)
				this.loadingStatus = false;
				this.file = file;
				//后台调用成功后将正在加载状态取消
			},
			handleFormatError(file) {
				this.$Notice.warning({
					title: '文件格式不正确',
					desc: '文件 ' + file.name + ' 格式不正确，请上传.xls,.xlsx,.xlm,.xls,.xlt,.xlw,.csv文件。'
				})
			},
			handleError(error, file) {
				this.$Message.error("数据导入失败！")
			}
		},
		created() {

		}
	};
</script>
