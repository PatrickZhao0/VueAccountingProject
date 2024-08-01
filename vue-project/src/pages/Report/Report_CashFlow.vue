<template>
    <div>
        <el-row></el-row>
        <el-table
        height="550"
        border
        :data="formatedCashFlowForm">
            <el-table-column label="项目" prop="name"/>
            <el-table-column label="行次" prop="num"/>
            <el-table-column label="本月金额" prop="monthAccumulatedOccurBalance"/>
            <el-table-column label="本年累积金额" prop="yearAccumulatedOccurBalance"/>
            <el-table-column label="项目" prop="name1"/>
            <el-table-column label="行次" prop="num1"/>
            <el-table-column label="本月金额" prop="monthAccumulatedOccurBalance"/>
            <el-table-column label="本年累积金额" prop="yearAccumulatedOccurBalance"/>
        </el-table>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'; 
import { useSetStore } from '@/pinia/set';
import { req_reportCashFlow } from '@/request/report';
const setStore = useSetStore();

onMounted(() => {
    getCashFlow();
});


const getCashFlow = async (sheetType = 40) => {
    const currentPeriod = setStore.sob.currentPeriod;
    const customerId = setStore.sob.customerId;
    let rawForm = (await req_reportCashFlow({currentPeriod, customerId, sheetType})).data;
    formatCashFlowChart(rawForm);                                   
}

const formatCashFlowChart = (rawForm) => {
    if(rawForm.length % 2 != 0) {
        rawForm.push({});
    }
    let leftCol = rawForm.slice(0, rawForm.length/2);
    let rightCol = rawForm.slice(rawForm.length/2, rawForm.length);
    formatedCashFlowForm.value = leftCol.map((value, index) => {
        return {
            ...leftCol[index],
            configId1: rightCol[index].configId,
            monthAccumulatedOccurBalance1: rightCol[index].monthAccumulatedOccurBalance,
            monthFormula1: rightCol[index].monthFormula,
            monthFormulaDesc1: rightCol[index].monthFormulaDesc,
            monthFormulaParams1: rightCol[index].monthFormulaParams,
            name1: rightCol[index].name,
            num1: rightCol[index].num,
            operationType1: rightCol[index].operationType,
            sheetType1: rightCol[index].sheetType,
            sortNum1: rightCol[index].sortNum,
            subjectId1: rightCol[index].subjectId,
            yearAccumulatedOccurBalance1: rightCol[index].yearAccumulatedOccurBalance,
            yearFormula1: rightCol[index].yearFormula,
            yearFormulaDesc1: rightCol[index].yearFormulaDesc,
            yearFormulaParams1: rightCol[index].yearFormulaParams
        }
    });
    console.log(formatedCashFlowForm.value); 
}

const formatedCashFlowForm = ref();
</script>


