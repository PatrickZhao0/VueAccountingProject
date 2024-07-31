<template>
    <div>
        <el-row>

        </el-row>
        <el-table
        border
        height="500"
        :data="incomeStatement">
            <el-table-column label="项目" prop="name"/>
            <el-table-column label="行次" prop="num"/>
            <el-table-column label="本月金额" prop="monthAccumulatedOccurBalance"/>
            <el-table-column label="本年累计金额" prop="yearAccumulatedOccurBalance"/>
        </el-table>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useSetStore } from '@/pinia/set';
import { req_reportIncomeStatement } from '@/request/report';   
const setStore = useSetStore();

onMounted( async () => {
    await getIncomeStatement();
});

const getIncomeStatement = async (sheetType = 30) => {
    const customerId = localStorage.getItem('customerId');
    const currentPeriod = setStore.sob.currentPeriod;
    const subjectId = setStore.sob.subjectId;
    incomeStatement.value = (await req_reportIncomeStatement({currentPeriod, customerId, subjectId, sheetType})).data;
    console.log(incomeStatement.value);
}
const incomeStatement = ref([]);

</script>