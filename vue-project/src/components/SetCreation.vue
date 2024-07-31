<template>

    <el-form v-if="creationForm" :inline="true" label-position="right" :model="creationForm" ref="creationForm" :rules="creationFromRules">
        <el-form-item label="企业名称">
            <el-input v-model="creationForm.customerFullName" disabled/>
        </el-form-item>
        <el-form-item label="会计准则" placeholder="请选择" style="width: 200px" prop="subjectId">
            <el-select v-model="creationForm.subjectId">
                <el-option 
                v-for="item in subjects"
                :key="item.id"
                :value="item.subjectId"
                :label="item.name"/>
            </el-select>
        </el-form-item> <br>
        <el-form-item label="统一社会信用代码">
            <el-input v-model="creationForm.taxIdentificationNum" disabled></el-input>
        </el-form-item>
        <el-form-item label="帐套启用年月" prop="createMonth">
            <el-date-picker v-model="creationForm.createMonth" type="month" value-format="YYYY-MM" placeholder="请选择日期"/>
        </el-form-item>
        <el-form-item label="经营性质">
            <el-select v-model="creationForm.businessNature" style="width: 200px" disabled>
            </el-select>
        </el-form-item>
        <el-form-item label="类型" placeholder="请选择" style="width: 200px" prop="businessNatureType">
            <el-select v-if="cusDictionary.businessNatureTypes" v-model="creationForm.businessNatureType">
                <el-option 
                v-for="(item,index) in cusDictionary.businessNatureTypes[creationForm.businessNature]"
                :value="item"
                :key="index"
                :label="item"/>
            </el-select>
        </el-form-item> <br>

        <el-form-item label="增值税种类">
            <el-radio-group v-model="creationForm.vatType" @change="setVat20Options">
                <el-radio :value="10" size="large">一般纳税人</el-radio>
                <el-radio :value="20" size="large">小规模纳税人</el-radio>
            </el-radio-group>
        </el-form-item> 

        <el-form-item label="无票收入模块" v-show="this.creationForm.vatType == 20">
            <el-radio-group v-model="creationForm.noTicketIncome">
                <el-radio :value="1" size="large">启用</el-radio>
                <el-radio :value="0" size="large">不启用</el-radio>
            </el-radio-group>
        </el-form-item><br>
        <el-form-item label="增值税征收方式">

        </el-form-item> <br>
        <el-form-item label="所得税征收方式">

        </el-form-item>
        <el-form-item label="启用仓库账" v-show="this.creationForm.vatType == 20">
            <el-radio-group v-model="creationForm.isWarehouseAccount">
                <el-radio :value="1" size="large">启用</el-radio>
                <el-radio :value="0" size="large">不启用</el-radio>
            </el-radio-group>
        </el-form-item>

        <div>
            <el-button @click="submitCreationForm">提交</el-button>
            <el-button @click="this.$emit('cancel')">取消</el-button>
        </div>
    </el-form>

</template>

<script>
import { req_subjects } from '@/request/subjects';
import { req_cusDictionary } from '@/request/customerInfo';
import { req_submitSOBCreation } from '@/request/SOB';

export default {
    props: [
        'cusInfo'
    ],

    data() {
        return {
            cusDictionary: {},
            subjects: {},
            creationForm: null,

            creationFromRules: {
                subjectId: [
                    {required: true, message: "此项为必填项"}
                ],
                createMonth: [
                    {required: true, message: "此项为必填项"}
                ],
                businessNatureType: [
                    {required: true, message: "此项为必填项"}
                ]
            }
        }
    },
    
    created() {
        this.getSubjects();
        (async () =>{
            await this.getBusinessNatureTypes();
            this.initCreationForm();
        })();
    },

    computed: {

        submissionForm() {
            return {
                "customerId": this.cusInfo.customerId,
                "createMonth": this.creationForm.createMonth,
                "subjectId": this.creationForm.subjectId,
                "businessNature": this.creationForm.businessNature,
                "vatType": this.creationForm.vatType,
                "isWarehouseAccount": this.creationForm.isWarehouseAccount,
                "noTicketIncome": this.creationForm.noTicketIncome,
                "corporateIncomeTaxType": this.creationForm.corporateIncomeTaxType,
                // "incomeTaxCollectionType": this.creationForm.incomeTaxCollectionType,
                "taxableIncomeRate": 0,
                "asKuaiji": "",
                "asJizhang": "",
                "asShenhe": "",
                "asChuna": "",
                "asZhidan": "",
                "wsFuze": "",
                "wsKuaiji": "",
                "wsCangku": "",
                "wsJingban": "",
                "wsZhidan": "",
                "industrialType": ""
            }
        }
    },

    watch: {
        cusInfo() {
            this.initCreationForm();
        }
    },

    methods: {
        initCreationForm() {
            const obj = {
                customerFullName: "",
                subjectId: "",
                taxIdentificationNum: "",
                createMonth: "",
                businessNature: "",
                businessNatureType: "",
                vatType: 10,
                vatCollectionType: null,
                incomeTaxCollectionType: 10,
                corporateIncomeTaxType: 10,
                noTicketIncome: null,
                isWarehouseAccount: null
            }
            if (this.$refs['creationForm']) this.$refs['creationForm'].resetFields();
            for(let key in obj) {
                if(this.cusInfo.hasOwnProperty(key)) {
                    obj[key] = this.cusInfo[key];
                }
            }
            this.creationForm = obj
        },

        async getSubjects() {
            this.subjects = await req_subjects();
        },

        async getBusinessNatureTypes() {
            this.cusDictionary = await req_cusDictionary();
        },

        setVat20Options() {
            if(this.creationForm.vatType == 10) {
                this.creationForm.isWarehouseAccount = null;
                this.creationForm.noTicketIncome = null;
            } else {
                this.creationForm.isWarehouseAccount = 0;
                this.creationForm.noTicketIncome = 1;
            }
        },

        submitCreationForm() {
            this.$refs['creationForm'].validate( valid => {
                if(valid) {
                    req_submitSOBCreation(this.submissionForm);
                }    
            });
            
        }
    }
}
</script>