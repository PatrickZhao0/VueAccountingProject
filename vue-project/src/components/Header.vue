<template>
    <div>
        <el-row :gutter="10" class="rowBar">
            <el-col :span="5">
                <el-select class="sharpeBox" v-model="customerSelection" value-key="" filterable @change="customerSelectionUpdate" :size= "'small'">
                    <el-option v-for="customer in customerList"
                    :key="customer.customerId"
                    :label="customer.originalName"
                    :value="customer.customerId"
                    >
                    </el-option>
                </el-select>       
            </el-col>

            <el-col :span="2">
                <div>
                    <el-date-picker
                    class="sharpeBox datePicker"
                    v-model="dateSelection"
                    type="month"
                    :disabled-date="disablePeriods"
                    format="YYYY-MM"
                    :clearable="false"
                    :size= "'small'"
                    />  
                </div>

            </el-col>

            <el-col :span="11" :offset="6" style="margin-top: -10px;">
                <span class="font-smaller">当前所属期是&nbsp;</span>
                <div class="digitBox" v-for="digit in DdlInfo.currentPeriod.length">
                    <span class="ddlDisplay">{{ DdlInfo.currentPeriod.charAt(digit - 1) }}</span>
                </div>
                <span class="font-smaller">&nbsp;距纳税申报截止日期还剩&nbsp;</span>
                <div class="digitBox" v-for="digit in 2">
                    <span class="ddlDisplay">{{ DdlInfo.deadline.charAt(digit - 1) }}</span>
                </div>
                <span class="font-smaller">&nbsp;天&nbsp; </span>

                <el-icon style="cursor: pointer" size="15"><Setting /></el-icon>
                <el-icon @click="this.$router.push('/keepAccounts')" size="15" style="cursor: pointer"><Switch /></el-icon>
                                
            </el-col>
            
        </el-row>
    </div>
</template>

<script>
import {req_cusNameId, req_cusAvailPeriods, req_cusDdl} from '@/request/customerInfo';
import { req_cusSOBsetting } from '@/request/customerInfo';
import { ElRow } from 'element-plus';
import { useSetStore } from '@/pinia/set';

export default {
    data() {
        return {
            store: useSetStore(),
            customerSelection: localStorage.getItem('customerId'),
            availablePeriodInfo: [],
            dateSelection: "",
            customerList: [],
            DdlInfo: {
                currentPeriod: "",
                deadline: ""
            }
        }
    },

    created(){
        this.getCustomerInfo();
        this.getCustomerInfoSimplified();
        this.getavailablePeriods();
        this.getDdl();
    },

    methods: {
        async getCustomerInfo() {
            const customerId = localStorage.getItem('customerId');
            const res = await req_cusSOBsetting(customerId);
            this.store.sob = res;
        },

        async getCustomerInfoSimplified() {
            this.customerList = await req_cusNameId();
        },

        async getavailablePeriods() {
            this.availablePeriodInfo = await req_cusAvailPeriods(this.customerSelection);
            this.store.availablePeriods = this.availablePeriodInfo;
            this.dateSelection = this.availablePeriodInfo[this.availablePeriodInfo.length - 1].period;
        },

        async getDdl() {
            this.DdlInfo = await req_cusDdl(this.customerSelection);
        },

        disablePeriods(time) {
            for (let item of this.availablePeriodInfo) {
                let available = new Date(item.period);
                if (available.getFullYear() === time.getFullYear() && available.getMonth() === time.getMonth()){
                    return false;
                }
            }
            return true;
        },

        customerSelectionUpdate(){
            this.getavailablePeriods();
            this.getDdl();
        }

    }
}
</script>

<style>

.datePicker{
    width: 120px !important;
}
.rowBar{
    margin-top: 13px;
    margin-bottom: 6px;
}

.sharpeBox > * {
    border-radius: 0px;
}

.digitBox {
    background-color: brown;
    margin-top: 2.75px;
    margin-right: 2px;
    display: inline-block; 
    width: 25px; 
    text-align: center;
    padding: 10px 0px;
}

.ddlDisplay {
    color: white;
    font-size: small;
    margin-top: 2.75px;
}
</style>