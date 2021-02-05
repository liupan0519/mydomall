<style lang="less">
    @import '../../styles/common.less';
</style>

<template>
    
    <div>
        <Form ref="member" :model="member" :label-width="80">
            <Card>
                <p slot="title">
                    <Icon type="ios-person"></Icon>
                     {{$t('member.infos')}}
                </p>
                <Row>
                <Col span="18">
                    <Row type="flex" justify="start">
                         <Col span="10" >
                            <FormItem :label="$t('member.name')" prop="memberName">
                                <Input v-model='member.memberName'></Input>
                            </FormItem>
                        </Col>
                        <Col span="10" offset="2">
                            <FormItem :label="$t('member.phone')" prop="memberMobileNo">
                                <Input v-model='member.memberMobileNo'></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="start">
                         <Col span="10" >
                            <FormItem :label="$t('member.idCardNo')" prop="memberIdNo">
                                <Input v-model='member.memberIdNo'></Input>
                            </FormItem>
                        </Col>
                        <Col span="10" offset="2">
                            <FormItem :label="$t('member.memberBirthday')" prop="memberBirthday">
                                <Input v-model='member.memberBirthday'></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="start">
                         <Col span="10" >
                            <FormItem :label="$t('member.memberSex')" prop="memberSex">
                                <Input v-model='member.memberSex'></Input>
                            </FormItem>
                        </Col>
                        <Col span="10" offset="2">
                            <FormItem :label="$t('member.addresses')">
                                <Cascader :data="addresses" trigger="hover"></Cascader>
                            </FormItem>
                        </Col>
                    </Row>
                </Col>
                <Col span="6">
                    <Row type="flex" justify="center"  class="t_c">
                        <Col span="24">
                            <Avatar icon="person" size="large" />
                        </Col>
                    </Row>
                    <Row type="flex" justify="center"  class="t_c margin-top-10">
                        <Col span="24">
                            <Upload action="">
                                <Button type="ghost" icon="ios-cloud-upload-outline">{{$t('member.upload')}}</Button>
                            </Upload>
                        </Col>
                    </Row>
                </Col>
                </Row>
            </Card>
            <Card class="margin-top-10">
                <p slot="title">
                    <Icon type="ios-person"></Icon>
                     {{$t('member.memberinfos')}}
                </p>
                <Row>
                <Col span="24">
                    <Row type="flex" justify="start">
                         <Col span="8" >
                            <FormItem :label="$t('member.memberLevel')" prop="memberLevel">
                                <Select clearable v-model="member.memberLevel">
                                    <Option v-for="item in memberLevels" :value="item.value" :key="item.value">{{ item.label}}</Option>
                                </Select>
                                <span v-if="member.memberLevel === $t('member.memberLevel1')">{{$t('member.descLevel1')}}</span>
                                <span v-if="member.memberLevel === $t('member.memberLevel2')">{{$t('member.descLevel2')}}</span>
                                <span v-if="member.memberLevel === $t('member.memberLevel3')">{{$t('member.descLevel3')}}</span>
                            </FormItem>
                        </Col>
                        <Col span="8" offset="2">
                            <FormItem :label="$t('member.memberCardNo')" prop="memberCardNo">
                                <Input v-model='member.memberCardNo'></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="start">
                         <Col span="10" >
                            <FormItem :label="$t('member.memberDuration')" prop="memberDuration">
                                <RadioGroup v-model="member.memberDuration">
                                    <Radio :label="$t('member.type1')"></Radio>
                                    <Radio :label="$t('member.type2')">
                                        <DatePicker type="date" style="width: 200px">
                                        </DatePicker>
                                    </Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem :label="$t('member.referral')" prop="memberBirthday">
                                <Select clearable v-model="member.MemberReferral.memberName">
                                    <Option v-for="item in memberReferrals" :value="item.value" :key="item.value">{{ item.label}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="start">
                         <Col span="24" >
                            <FormItem :label="$t('member.notice')" style="width: 400px">
                                <CheckboxGroup v-model="member.notificationTarget">
                                    <Checkbox :label="$t('member.member')">
                                        <span>{{$t('member.member')}}</span>
                                    </Checkbox>
                                    <Checkbox :label="$t('member.referral')">
                                        <span>{{$t('member.referral')}}</span>
                                    </Checkbox>
                                </CheckboxGroup>
                            </FormItem>
                        </Col>
                    </Row>
                </Col>
                </Row>
            </Card>
        </Form>
   
        <div class="margin-top-10">
            <Button type="primary" @click="addok('member')" icon="checkmark">{{$t('btn.save')}}</Button>
        </div>
     </div>               
</template>

<script>
import expandRow from './components/member-list-table-expand.vue';
import {ajaxMemberListData} from './data/member-list-data.js';
export default {
    components: {
        expandRow
    },
    data () {
        return {
            member: {
                MemberReferral:{}
            },
            loading: true,
            memberColumn: [],
            memberData: [],
            searchMemberId:'',
            searchMemberName:'',
            searchMemberMobileNo:'',
            memberLevels:[{
                label:this.$t('member.memberLevel1'), value: this.$t('member.memberLevel1'),minAmount:5000,maxAmount:9999999
            },
            {
                label:this.$t('member.memberLevel2'), value: this.$t('member.memberLevel2'),minAmount:1000,maxAmount:5000
            },
            {
                label:this.$t('member.memberLevel3'), value: this.$t('member.memberLevel3'),minAmount:0,maxAmount:1000
            }],
            memberReferrals:[/* {
                label:'刘阳', value: '刘阳'
            },{
                label:'乔建辉', value: '乔建辉'
            } */],
            addresses: [{
                    value: 'beijing',
                    label: '北京',
                    children: [
                        {
                            value: 'gugong',
                            label: '故宫'
                        },
                        {
                            value: 'tiantan',
                            label: '天坛'
                        },
                        {
                            value: 'wangfujing',
                            label: '王府井'
                        }
                    ]
                }, {
                    value: 'jiangsu',
                    label: '江苏',
                    children: [
                        {
                            value: 'nanjing',
                            label: '南京',
                            children: [
                                {
                                    value: 'fuzimiao',
                                    label: '夫子庙',
                                }
                            ]
                        },
                        {
                            value: 'suzhou',
                            label: '苏州',
                            children: [
                                {
                                    value: 'zhuozhengyuan',
                                    label: '拙政园',
                                },
                                {
                                    value: 'shizilin',
                                    label: '狮子林',
                                }
                            ]
                        }
                    ],
                }]
        }
    },
    methods: {
        getData () {
            this.member.memberCardNo = this.$route.params.memberCardNo;
        },
        
        addok (name) {
            this.$Notice.success({
                title:this.$t('common.successStr'),
                desc: this.$t('common.saveSuccess'),
                duration: 2
            });
        }
        
    },
    created () {
        this.getData();
    }
};
</script>
