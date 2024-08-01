<template>
    <div>
        <el-row>
            <el-col :span="1">
                <el-select 
                :size="'small'"
                v-model="reportType"
                @change="reportType ? getIncomeStatement() : getQuaterlyReport()">
                    <el-option label="月" :value="1"/>
                    <el-option label="季" :value="0"/>
                </el-select>
            </el-col>

            <el-col :span="2">
                <el-date-picker
                type="month"
                format="YYYY-MM"
                v-model="dateSelection"
                :disabled-date="disabledPeriods"
                :clearable= 'false'
                :size= "'small'"
                @change="reportType ? getIncomeStatement() : getQuaterlyReport()"
                />
            </el-col>

            <el-col :span="2">
                <el-select 
                :size="'small'"
                v-model="detailed"
                @change="reportType ? getIncomeStatement() : getQuaterlyReport()">
                    <el-option label="有明细" :value="30"/>
                    <el-option label="无明细" :value="20"/>
                </el-select>
            </el-col>
            

        </el-row>
        <el-table
        border
        height="500"
        :data="incomeStatement"
        v-if="reportType">
            <el-table-column label="项目" prop="name"/>
            <el-table-column label="行次" prop="num"/>
            <el-table-column label="本月金额" prop="monthAccumulatedOccurBalance"/>
            <el-table-column label="本年累计金额" prop="yearAccumulatedOccurBalance"/>
        </el-table>

        <el-table
        border
        height="500"
        :data="incomeStatement"
        v-else>
            <el-table-column label="项目" prop="name"/>
            <el-table-column label="行次" prop="num"/>
            <el-table-column label="本年累计金额" prop="yearAccumulatedOccurBalance"/>
            <el-table-column label="第一季度" prop="firstQuarter"/>
            <el-table-column label="第二季度" prop="secondQuarter"/>
            <el-table-column label="第三季度" prop="thirdQuarter"/>
            <el-table-column label="第季度" prop="fourthQuarter"/>
        </el-table>


    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useSetStore } from '@/pinia/set';
import { req_reportIncomeStatement, req_reportQuarterlyReport } from '@/request/report';   
const setStore = useSetStore();

onMounted( async () => {
    await getIncomeStatement();
});

const getIncomeStatement = async () => {
    const customerId = localStorage.getItem('customerId');
    const currentPeriod = formatedDateSelection.value;
    const subjectId = setStore.sob.subjectId;
    const sheetType = detailed.value;
    incomeStatement.value = (await req_reportIncomeStatement({currentPeriod, customerId, subjectId, sheetType})).data;
}
const getQuaterlyReport = async () => {
    const customerId = localStorage.getItem('customerId');
    const currentPeriod = formatedDateSelection.value;
    const sheetType = detailed.value;
    incomeStatement.value = await req_reportQuarterlyReport({customerId, currentPeriod, sheetType});
}

const reportType = ref(1);
const detailed = ref(30);
const incomeStatement = ref([]);
const dateSelection = ref(new Date(setStore.sob.currentPeriod));
const formatedDateSelection = computed(() => {
    return `${dateSelection.value.getFullYear()}-${(dateSelection.value.getMonth() + 1).toString().padStart(2, '0')}`
});
const disabledPeriods = time => {
    for (let item of setStore.availablePeriods) {
        let available = new Date(item.period);
        if (available.getFullYear() === time.getFullYear() && available.getMonth() === time.getMonth()){
            return false;
        }
    }
    return true;
};
</script>