<style lang="less">
</style>

<template>
	<div>
		<Row class="margin-top-10">
			<Col span="24">
			<Card>
				<p slot="title">
					{{$t('product.list')}}
				</p>
				<Row>
					<div>
						<!-- <Select v-model="selectedSupplierUuid" style="width:240px" placeholder="供应商" clearable filterable>
							<Option v-for="item in suppliers" :value="item.supplierUuid" :key="item.supplierUuid">{{ item.supplierName }}</Option>
						</Select> -->
						<Select v-model="onSale" style="width:120px" :placeholder="$t('product.onSale')" clearable>
							<Option v-for="item in onSales" :value="item.issale" :key="item.issale">{{ item.name }}</Option>
						</Select>
						<Input v-model="searchProductName" :placeholder="$t('product.productName')" type="text" style="width: 150px"
						 clearable />
						<Input v-model="productCateDTO.title" :placeholder="$t('product.productCateDTO')" style="width: 150px" readonly
						 type="text" clearable @click.native="prodCateModal = true" />
						<Select v-model="selectedProductBrandUuid" style="width:120px" :placeholder="$t('product.productBrandName')"
						 clearable filterable>
							<Option v-for="item in brands" :value="item.productBrandUuid" :key="item.productBrandUuid">{{ item.name }}</Option>
						</Select>
						<i-switch size="large" v-model="hot">
							<span slot="open">{{$t('product.hot')}}</span>
							<span slot="close">{{$t('product.hot')}}</span>
						</i-switch>
						<i-switch size="large" v-model="recommend">
							<span slot="open">{{$t('product.recommend')}}</span>
							<span slot="close">{{$t('product.recommend')}}</span>
						</i-switch>
						<i-switch size="large" v-model="newProduct">
							<span slot="open">{{$t('product.newProduct')}}</span>
							<span slot="close">{{$t('product.newProduct')}}</span>
						</i-switch>
						<!-- <i-switch size="large" v-model="onSale">
                <span slot="open">上架</span>
                <span slot="close">上架</span>
              </i-switch> -->
						<Button type="success" @click="handleSearch">{{$t('btn.search')}}</Button>
						<Button class="f_r" icon="plus" type="primary" @click="add()">{{$t('product.add')}}</Button>
						<Button class="f_r" icon="plus" type="warning" @click="exportFile()">{{$t('product.exportProduct')}}</Button>
					</div>
				</Row>

				<Row class="margin-top-10">
					<Col span="24">
					<div>
						<Table :loading="loading" @on-sort-change="onsort" :columns="productColumn" :data="productData" border stripe ref="productTable"></Table>
					</div>
					</Col>
				</Row>
				<Row class="margin-top-10">
					<Page ref="productpage" :total="total" size="small" :pageSize="pageSize" @on-change="changepage" show-total
					 show-elevator></Page>
				</Row>
			</Card>
			</Col>
		</Row>
		<div>
			<Modal :title="$t('product.exportProduct')" v-model="exportFileModal">
				<Upload ref="upload" multiple :action="actionName" name="file" :show-upload-list="true" :on-format-error="handleFormatError"
				 :on-success="handleSuccess" :on-error="handleError" :format="['xlsx','xls','xlm','xls','xlt','xlw','csv']">
					<Button type="info" icon="ios-cloud-upload-outline">{{$t('common.selectFile')}}</Button>
				</Upload>
				<div slot="footer">
				</div>
			</Modal>
			<Modal v-model="prodCateModal" :title="$t('product.prodCateModal')" @on-cancel="prodCateModal = false">
				<Tree :data="producttype" :load-data="loadProdCateData" :render="renderContent"></Tree>
				<div slot="footer">

				</div>
			</Modal>
			<Modal v-model="disableModel" ref="disableModel" :title="$t('product.disableModel')">
				{{$t('product.disableModelCon')}}
				<div slot="footer">
					<Button type="text" @click="disablecancel">{{$t('btn.cancel')}}</Button>
					<Button type="primary" @click="disableok()">{{$t('btn.define')}}</Button>
				</div>
			</Modal>
			<Modal v-model="enableModel" ref="disableModel" :title="$t('product.enableModel')">
				{{$t('product.enableModelCon')}}
				<div slot="footer">
					<Button type="text" @click="enablecancel">{{$t('btn.cancel')}}</Button>
					<Button type="primary" @click="enableok()">{{$t('btn.define')}}</Button>
				</div>
			</Modal>
			<Modal v-model="delModel" ref="delModel" :title="$t('product.delModel')">
				{{$t('product.delModelCon')}}
				<div slot="footer">
					<Button type="text" @click="delcancel">{{$t('btn.cancel')}}</Button>
					<Button type="primary" @click="delok()">{{$t('btn.define')}}</Button>
				</div>
			</Modal>
			<Modal v-model="editModel" ref="editModel" :title="$t('product.editModel')">
				{{$t('product.editModelCon')}}
				<div slot="footer">
					<Button type="text" @click="editcancel">{{$t('btn.cancel')}}</Button>
					<Button type="primary" @click="editProduct()">{{$t('btn.define')}}</Button>
				</div>
			</Modal>
			<Modal :title="$t('common.showPreviewImage')" v-model="showPreviewImage">
				<img :src="previewImageUrl" v-if="showPreviewImage" style="width: 100%" />
				<div slot="footer">
					<Button type="default" @click="showPreviewImage = false">{{$t('btn.close')}}</Button>
				</div>
			</Modal>
		</div>
	</div>
</template>

<script>
	import expandRow from "./components/product-list-table-expand.vue";
	import expandButton from "./components/product-list-button-expand.vue";
	import {
		ajaxProductListData
	} from "./data/product-list-insale-data.js";
	import table2excel from "@/libs/table2excel.js";
	export default {
		components: {
			expandRow
		},
		data() {
			return {
				loading: false,
				editModel: false,
				resetModel: false,
				addModel: false,
				prodCateModal: false,
				exportFileModal: false,
				actionName: this.$http.defaults.baseURL + "admin/importProductExecl", //上传图片action
				isonsort: '',
				producttype: [ //选择的类目数据
					{
						title: this.$t('product.allCateDTO'),
						loading: false,
						//                      expand: false,
						render: (h, {
							root,
							node,
							data
						}) => {
							return h(
								"span", {
									style: {
										display: "inline-block",
										width: "100%"
									}
								},
								[
									h("span", [
										h("Icon", {
											props: {
												type: "ios-folder-outline"
											},
											style: {
												marginRight: "8px"
											}
										}),
										h("span", data.title)
									]),
									h(
										"span", {
											style: {
												display: "inline-block",
												float: "right",
												marginRight: "32px"
											}
										},
										[
											h(
												"Button", {
													props: Object.assign({}, this.buttonProps, {
														icon: "checkmark",
														type: "warning"
													}),
													style: {
														marginRight: "8px"
													},
													on: {
														click: () => {
															this.selectProdCate(data);
														}
													}
												},
												this.$t('product.selectCateDTO')
											)
										]
									),
								]
							);
						},
						children: []
					}
				],
				editRow: {},
				addRow: {},
				multipleCouponRow: {},
				productColumn: [],
				productData: [],
				index: 1,
				productCateDTO: {
					productCateUuid: ""
				},
				searchProductName: "",
				newProduct: false,
				recommend: false,
				hot: false,
				onSale: '',
				total: 0,
				pageSize: 20,
				startIndex: 0,
				products: [],
				productlist: [],
				delModel: false,
				linkModel: false,
				disableModel: false,
				enableModel: false,
				editModel: false,
				suppliers: [],
				brands: [],
				onSales: [{
						issale: '3',
						name: this.$t('product.issale3')
					},
					{
						issale: '2',
						name: this.$t('product.issale2')
					},
					{
						issale: '1',
						name: this.$t('product.issale1')
					},
				],
				selectedSupplierUuid: '',
				selectedProductBrandUuid: '',
				showPreviewImage: false, //预览照片模态框
				previewImageUrl: '' //预览照片地址
			};
		},
		methods: {
			exportFile() {
				this.exportFileModal = true;
			},
			// 上传成功
			handleSuccess(res, file) {
				//后台调用成功后将正在加载状态取消
				var that = this;
				that.file = null;
				if (res.body.status.statusCode === '0') {
					that.handleSearch();
					//this.loadingStatus = false;
					that.$Notice.success({
						title: that.$t('common.successStr'),
						desc: that.$t('common.exportDesc'),
						duration: 2
					});
				} else {
					this.$Message.error(res.body.status.errorDesc)
				}
				
			},
			handleFormatError(file) {
				this.$Notice.warning({
					title: this.$t('common.fileError'),
					desc: this.$t('common.fileDesc') + file.name + this.$t('common.fileFormat')
				})
			},
			handleError(error, file) {
				this.$Message.error(this.$t('common.exportError'))
			},
			//预览照片
			previewProductImage(url) {
				this.showPreviewImage = true;
				this.previewImageUrl = url;
			},
			getData() {
				let that = this;
				this.productColumn = [
					// {
					// 	type: "expand",
					// 	width: 30,
					// 	render: (h, params) => {
					// 		return h(expandRow, {
					// 			props: {
					// 				row: params.row
					// 			}
					// 		});
					// 	}
					// },
					// {
					// 	title: "供应商",
					// 	align: "center",
					// 	key: "supplierName",
					// 	width: 100,
					// },
					{
						title: that.$t('product.productCateName'),
						align: "center",
						key: "productCateName",
						width: 100,
					},
					{
						title: that.$t('product.productBrandName'),
						align: "center",
						key: "productBrandName",
						width: 100,
					},
					{
						title: that.$t('product.name'),
						key: "productName",
						width: "200px",
						render: (h, params) => {
							return h(
								"span", {
									props: {
										row: params.row
									}
								},
								[
									h("img", {
										attrs: {
											src: params.row.productMainImage.url
										},
										style: {
											width: "60px",
											height: "48px",
											display: "inline-block",
											float: "left",
											margin: "5px 0"
										},
										on: {
											click: () => {
												this.previewProductImage(params.row.productMainImage.url)
											}
										}
									}),
									h(
										"span", {
											style: {
												display: "inline-block",
												float: "right",
												width: "100px",
												marginTop: "10px"
											}
										},
										params.row.productName
									)
								]
							);
						}
					},
					{
						title: that.$t('product.price'),
						align: "center",
						width: 100,
						render: (h, params) => {
							return h(
								"span", {
									props: {
										row: params.row
									}
								},
								[
									h(
										"span", {
											style: {
												display: "inline-block",
												float: "right",
												width: "100px",
												marginTop: "10px",
												color: "red"
											}
										},
										params.row.unitPrice + that.$t('common.unit')
									),
									h(
										"span", {
											style: {
												display: "inline-block",
												float: "right",
												width: "100px",
												"text-decoration": "line-through"
											}
										},
										params.row.unitPriceStandard + that.$t('common.unit')
									)
								]
							);
						}
					},
					{
						title: that.$t('product.marketing'),
						align: "center",
						render: (h, params) => {
							let isHot = params.row.hot;
							let isRecommend = params.row.recommend;
							let isNew = params.row.new;
							return h(
								"span", {
									props: {
										row: params.row
									}
								},
								[
									h('tag', {
										props: {
											color: "green"
										},
										style: {
											display: isHot ? "display" : "none"
										}
									}, that.$t('product.hot')),
									h('tag', {
										props: {
											color: "green"
										},
										style: {
											display: isRecommend ? "display" : "none"
										}
									}, that.$t('product.recommend')),
									h('tag', {
										props: {
											color: "green"
										},
										style: {
											display: isNew ? "display" : "none"
										}
									}, that.$t('product.newProduct'))
								]
							);
						}
					},
					{
						title: that.$t('product.soldUnit'),
						align: "center",
						key: "soldUnit",
						width: "100",
						sortable: 'custom'
					},
					{
						title: that.$t('product.totalUnit'),
						align: "center",
						key: "totalUnit",
						width: "100"
					},
					{
						title: that.$t('product.status'),
						align: 'center',
						width: 120,
						render: (h, params) => {
							let status = '';
							let color = '';
							if (params.row.onSale) {
								status = that.$t('product.onSale');
								color = 'green';
							} else if (!params.row.verifyStatus) {
								status = that.$t('product.unSale');
								color = 'red';
							} else if (params.row.verifyStatus == '0') {
								status = that.$t('product.verifyStatus0');
								color = 'gray';
							} else if (params.row.verifyStatus == '1') {
								status = that.$t('product.verifyStatus1');
								color = 'green';
							} else if (params.row.verifyStatus == '2') {
								status = that.$t('product.verifyStatus2');
								color = 'red';
							}
							return h('tag', {
								props: {
									color: color
								}
							}, status)
						}
					},
					{
						title: that.$t('product.verifyDetail'),
						align: 'center',
						width: 120,
						render: (h, params) => {
							return h('span', {
								style: {
									display: params.row.verifyStatus == '2' ? 'display' : 'none'
								}
							}, params.row.verifyMsg)
						}
					},
					{
						title: that.$t('common.operate'),
						align: "center",
						width: 180,
						render: (h, params) => {
							let type = '';
							let saleText = '';
							if (params.row.onSale) {
								saleText = that.$t('product.sale1');
								type = 'warning';
							} else if (!params.row.verifyStatus) {
								saleText = that.$t('product.sale2');
								type = 'success';
							} else if (params.row.verifyStatus == '0') {
								saleText = that.$t('btn.revoke')
								type = 'default';
							} else if (params.row.verifyStatus == '1') {
								//本状态不存在
							} else if (params.row.verifyStatus == '2') {
								saleText = that.$t('product.sale2');
								type = 'success';
							}
							return h("span", {}, [
								h(
									"Button", {
										props: {
											type: type,
											row: params.row,
											size: "small"
										},
										style: {
											marginRight: "8px"
										},
										on: {
											click: () => {
												if (params.row.onSale)
													this.disable(params.row);
												else if (params.row.verifyStatus == '0')
													this.disable(params.row);
												else
													this.enable(params.row);
											}
										}
									},
									saleText
								),
								h(
									"Button", {
										props: {
											type: "primary",
											row: params.row,
											size: "small"
										},
										style: {
											marginRight: "8px"
										},
										on: {
											click: () => {
												this.edit(params.row);
											}
										}
									},
									that.$t('btn.edit')
								),
								h('Poptip', {
									props: {
										confirm: true,
										title: that.$t('product.deleteCon'),
										transfer: true
									},
									on: {
										'on-ok': () => {
											this.deleteProduct(params.row);
										}
									}
								}, [
									h('Button', {
										props: {
											type: 'error',
											size: 'small'
										},
										style: {
											margin: '0 5px 0 0'
										},
									}, that.$t('btn.delete'))
								])
							]);
						}
					}
				];
			},
			//加载类目数据
			loadProdCateData(item, callback) {
				var options = {};
				if (item.title == that.$t('product.productType')) {
					options = {
						actionType: "ROOT"
					};
				} else {
					options = {
						actionType: "CHILD",
						productCateUuid: item.productCateUuid || ""
					};
				}
				this.$http
					.post("/merchant/inquiryProductCate", this.common.request(options))
					.then(
						response => {
							if (response.data.body.status.statusCode == 0) {
								var cates = response.data.body.data.cates;
								var data = [];
								cates.forEach(function(val, ind) {
									if (val.leaf) {
										var obj = {
											title: val.cateName,
											productCateUuid: val.productCateUuid,
											children: []
										};
									} else {
										var obj = {
											title: val.cateName,
											loading: false,
											productCateUuid: val.productCateUuid,
											children: []
										};
									}

									data.push(obj);
								});
								callback(data);
							} else {
								this.$Message.error(response.data.body.status.errorDesc);
							}
						},
						response => {
							this.$Message.error($t('common.fail'));
						}
					);
			},
			deleteProduct(row) {
				if (row.onSale) {
					this.$Message.error($t('product.deleteError'));
					return false;
				}
				var options = {
					actionType: 'DELETE',
					productUuid: row.productUuid
				}
				this.$http.post("/merchant/changeProduct", this.common.request(options))
					.then(response => {
						if (response.data.body.status.statusCode == 0) {
							var data = response.data.body.data;
							this.$Notice.success({
								title: $t('product.deleteSuccess'),
								duration: 2
							});
							this.searchProduct();
						} else {
							this.$Notice.success({
								title: $t('common.failStr'),
								desc: response.data.body.status.errorDesc,
								duration: 2
							});
						}
					}, response => {
						this.$Message.error($t('common.error'));
					})
			},
			//商品类目页面生成
			renderContent(h, {
				root,
				node,
				data
			}) {
				return h(
					"span", {
						style: {
							display: "inline-block",
							width: "100%"
						}
					},
					[
						h("span", [h("span", data.title)]),
						h(
							"span", {
								style: {
									display: "inline-block",
									float: "right",
									marginRight: "32px"
								}
							},
							[
								h(
									"Button", {
										props: Object.assign({}, this.buttonProps, {
											icon: "checkmark",
											type: "warning"
										}),
										style: {
											marginRight: "8px"
										},
										on: {
											click: () => {
												this.selectProdCate(data);
											}
										}
									},
									$t('product.selectCateDTO')
								)
							]
						)
					]
				);
			},
			resetPage() {
				this.startIndex = 0;
				this.total = 0;
				this.productData = [];
				this.productlist = [];
				//重新设置成显示第一页
				this.$nextTick(function() {
					this.$refs["productpage"].currentPage = 1;
				});
			},
			//处理分页-页数改变
			changepage(index) {
				this.startIndex = (index - 1) * this.pageSize;
				this.index = index;
				this.searchProduct();
			},
			add() {
				let keyArray = [];
				var searchOptions = {
					startIndex: this.startIndex,
					pageSize: this.pageSize,
					index: this.index
				};
				//判断是否有商品名称查询条件
				if (this.searchProductName) {
					keyArray.push("PRODUCT_NAME");
					searchOptions.productName = this.searchProductName;
				}
				//判断是否有商品品类查询条件
				if (this.productCateDTO.productCateUuid) {
					keyArray.push("PRODUCT_CATE");
					searchOptions.productCateUuid = this.productCateDTO.productCateUuid;
				}
				//判断是否有供应商查询条件
				if (this.selectedSupplierUuid) {
					keyArray.push("SUPPLIER");
					searchOptions.supplierUuid = this.selectedSupplierUuid;
				}
				//判断是否有上架查询条件
				if (this.onSale == '1') {
					keyArray.push("ON_SALE");
					searchOptions.onSale = this.onSale;
				}
				if (this.onSale == '2') {
					keyArray.push("ON_SALE");
					searchOptions.onSale = this.onSale;
				}
				//判断是否有新品查询条件
				if (this.newProduct) {
					keyArray.push("NEW");
					searchOptions.new = this.newProduct;
				}
				//判断是否有推荐查询条件
				if (this.recommend) {
					keyArray.push("RECOMMEND");
					searchOptions.recommend = this.recommend;
				}
				//判断是否有热卖查询条件
				if (this.hot) {
					keyArray.push("HOT");
					searchOptions.hot = this.hot;
				}
				searchOptions.keyArray = keyArray;
				// var searchOptions = JSON.stringify(searchOptions);
				// searchOptions = encodeURI(searchOptions);
				this.$router.push({
					name: "productadd",
					query: {
						searchOptions: searchOptions
					}
				});
			},
			selectProdCate(data) {
				this.prodCateModal = false;
				this.productCateDTO = data;
			},
			exportMember() {
				this.$refs.memberTable.exportCsv({
					filename: $t('member.title')
				});
			},
			sendMultipleCoupon() {
				this.multipleCouponModel = true;
			},
			multiplecouponcancel() {
				this.multipleCouponModel = false;
			},
			multiplecouponok() {
				this.$Notice.success({
					title: $t('common.successStr'),
					desc: $t('coupon.couponok'),
					duration: 2
				});
				this.multipleCouponModel = false;
			},
			changeProduct(type) {
				var _this = this;
				var options = {
					actionType: type,
					productUuid: this.productUuid,
					supplierDTO: {
						supplierUuid: this.selectedSupplierUuid
					}
				};
				this.$http
					.post("/merchant/changeProduct", this.common.request(options))
					.then(
						response => {
							if (response.data.body.status.statusCode == 0) {
								this.$Notice.success({
									title: _this.$t('common.successStr'),
									desc: _this.$t('product.changeProduct'),
									duration: 2
								});
								this.searchProduct(this.selectedSupplierUuid);
							} else {
								this.$Message.error(response.data.body.status.errorDesc);
							}
						},
						response => {
							this.$Message.error($t('common.fail'));
						}
					);
			},
			handleSearch() {
				this.resetPage();
				this.searchProduct();
			},
			onsort(order) {
				if (order.order !== "normal") {
					this.startIndex = 0;
					this.pageSize = 20;
					this.isonsort = order.order,
						this.searchProduct();
				}
			},
			searchProduct() {
				let keyArray = ['MERCHANT'];
				var searchOptions = {
					startIndex: this.startIndex,
					pageSize: this.pageSize,
					merchantUuid: this.common.getObject('MERCHANTUUID')
				};
				//判断是否有商品名称查询条件
				if (this.searchProductName) {
					keyArray.push("PRODUCT_NAME");
					searchOptions.productName = this.searchProductName;
				}
				//判断是否有商品品类查询条件
				if (this.productCateDTO.productCateUuid) {
					keyArray.push("PRODUCT_CATE");
					searchOptions.productCateUuid = this.productCateDTO.productCateUuid;
				}
				//判断是否有供应商查询条件
				if (this.selectedSupplierUuid) {
					keyArray.push("SUPPLIER");
					searchOptions.supplierUuid = this.selectedSupplierUuid;
				}
				//判断是否有商品品牌查询条件
				if (this.selectedProductBrandUuid) {
					keyArray.push("BRAND");
					searchOptions.productBrandUuid = this.selectedProductBrandUuid;
				}
				//判断是否有上架查询条件
				if (this.onSale == '1') {
					keyArray.push("ON_SALE");
					searchOptions.onSale = false;
				}
				if (this.onSale == '2') {
					keyArray.push("ON_SALE");
					searchOptions.onSale = true;
				}
				//判断是否有新品查询条件
				if (this.newProduct) {
					keyArray.push("NEW");
					searchOptions.new = this.newProduct;
				}
				//判断是否有推荐查询条件
				if (this.recommend) {
					keyArray.push("RECOMMEND");
					searchOptions.recommend = this.recommend;
				}
				//判断是否有热卖查询条件
				if (this.hot) {
					keyArray.push("HOT");
					searchOptions.hot = this.hot;
				}
				if (this.isonsort) {
					searchOptions.sortBy = "soldUnit";
					searchOptions.sort = this.isonsort
				}
				searchOptions.keyArray = keyArray;
				this.loading = true;
				this.$http
					.post("/merchant/searchProduct", this.common.request(searchOptions))
					.then(
						response => {
							if (response.data.body.status.statusCode == 0) {
								this.loading = false;
								this.products = response.data.body.data.products;
								this.total = response.data.body.data.total;
								this.products.forEach(function(val, ind) {
									//商品类目
									if (val.productCateDTO) {
										val.productCateName = val.productCateDTO.cateName;
									}
									//供应商
									if (val.supplierDTO)
										val.supplierName = val.supplierDTO.supplierName;
									//商品品牌
									if (val.productBrandDTO) {
										val.productBrandName = val.productBrandDTO.name;
									}
									//多规格商品
									if (val.skuEnabled) {
										if (val.minUnitPoint && val.maxUnitPoint) {
											val.unitPrice = val.minUnitPoint + "-" + val.maxUnitPoint;
										}
									}
								});
								this.productData = this.products;
								this.getData();
							} else {
								this.loading = false;
								this.$Message.error(response.data.body.status.errorDesc);
							}
						},
						response => {
							this.$Message.error($t('common.fail'));
						}
					);
			},
			editProduct() {
				let keyArray = [];
				var searchOptions = {
					startIndex: this.startIndex,
					pageSize: this.pageSize,
					index: this.index
				};
				//判断是否有商品名称查询条件
				if (this.searchProductName) {
					keyArray.push("PRODUCT_NAME");
					searchOptions.productName = this.searchProductName;
				}
				//判断是否有商品品类查询条件
				if (this.productCateDTO.productCateUuid) {
					keyArray.push("PRODUCT_CATE");
					searchOptions.productCateUuid = this.productCateDTO.productCateUuid;
				}
				if (this.productCateDTO.title) {
					searchOptions.title = this.productCateDTO.title;
				}
				//判断是否有供应商查询条件
				if (this.selectedSupplierUuid) {
					keyArray.push("SUPPLIER");
					searchOptions.supplierUuid = this.selectedSupplierUuid;
				}
				//判断是否有上架查询条件
				if (this.onSale == '1') {
					keyArray.push("ON_SALE");
					searchOptions.onSale = this.onSale;
				}
				if (this.onSale == '2') {
					keyArray.push("ON_SALE");
					searchOptions.onSale = this.onSale;
				}
				//判断是否有新品查询条件
				if (this.newProduct) {
					keyArray.push("NEW");
					searchOptions.new = this.newProduct;
				}
				//判断是否有推荐查询条件
				if (this.recommend) {
					keyArray.push("RECOMMEND");
					searchOptions.recommend = this.recommend;
				}
				//判断是否有热卖查询条件
				if (this.hot) {
					keyArray.push("HOT");
					searchOptions.hot = this.hot;
				}
				searchOptions.keyArray = keyArray;
				this.$router.push({
					name: "productedit",
					query: {
						productUuid: this.productUuid,
						searchOptions: searchOptions
					}
				});
			},
			edit(row) {
				this.productUuid = row.productUuid;
				if (row.onSale) {
					this.editModel = true;
				} else {
					this.editProduct();
				}
			},
			del(row) {
				this.productUuid = row.productUuid;
				this.delModel = true;
			},
			enable(row) {
				this.productUuid = row.productUuid;
				this.enableModel = true;
			},
			delcancel(row) {
				this.delModel = false;
			},
			editcancel(row) {
				this.editModel = false;
			},
			delok(row) {
				this.changeProduct("DELETE");
				this.delModel = false;
			},
			enableok() {
				this.changeProduct("ENABLE");
				this.enableModel = false;
			},
			enablecancel() {
				this.enableModel = false;
			},
			disable(row) {
				this.productUuid = row.productUuid;
				this.disableModel = true;
			},
			disableok() {
				this.changeProduct("DISABLE");
				this.disableModel = false;
			},
			disablecancel() {
				this.disableModel = false;
			},
			inquirySupplier() {
				var options = {};
				this.$http
					.post("/merchant/inquirySupplier", this.common.request(options))
					.then(
						response => {
							if (response.data.body.status.statusCode == 0) {
								this.suppliers = response.data.body.data.suppliers;
							} else {
								this.$Message.error(response.data.body.status.errorDesc);
							}
						},
						response => {
							this.$Message.error($t('common.fail'));
						}
					);
			},
			inquiryBrand() {
				var options = {};
				this.$http
					.post("/merchant/inquiryBrand", this.common.request(options))
					.then(
						response => {
							if (response.data.body.status.statusCode == 0) {
								this.brands = response.data.body.data.brands;
							} else {
								this.$Message.error(response.data.body.status.errorDesc);
							}
						},
						response => {
							this.$Message.error($t('common.fail'));
						}
					);
			}
		},
		created() {
			let searchOptions = this.$route.query.searchOptions;
			if (searchOptions) {
				if (searchOptions.pageSize) {
					this.startIndex = searchOptions.startIndex;
					this.pageSize = searchOptions.pageSize;
					this.searchProductName = searchOptions.productName;
					this.productCateDTO.productCateUuid = searchOptions.productCateUuid;
					this.selectedSupplierUuid = searchOptions.supplierUuid;
					this.selectedProductBrandUuid = searchOptions.supplierUuid;
					this.onSale = searchOptions.onSale;
					this.productCateDTO.title = searchOptions.title;
					this.newProduct = searchOptions.new;
					this.recommend = searchOptions.recommend;
					this.hot = searchOptions.hot;
					this.index = searchOptions.index;
					this.$nextTick(function() {
						this.$refs["productpage"].currentPage = searchOptions.index;
					});
				}
			}
			this.inquirySupplier();
			this.inquiryBrand();
			this.searchProduct();
		}
	};
</script>
