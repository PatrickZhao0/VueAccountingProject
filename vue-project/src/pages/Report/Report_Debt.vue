<template>
    <div>
        <el-date-picker
        type="month"
        format="YYYY-MM"
        v-model="dateSelection"
        :disabled-date="disabledPeriods"
        :clearable= 'false'
        :size= "'small'"
        @change="updateFinalTable"
        />
    </div>
    <el-table
    :data="finalTable"
    height="550"
    border>
        <el-table-column label="资产">
            <template #default="scope">
                <el-text>{{scope.row.name}} <el-tooltip placement="right" :content="scope.row.formulaDesc"><el-icon v-if="scope.row.formulaDesc"><QuestionFilled /></el-icon></el-tooltip>  </el-text>
            </template>
        </el-table-column>
        <el-table-column label="行次" prop="num"/>
        <el-table-column label="期末余额" prop="endingBalance"/>
        <el-table-column label="年初余额" prop="openingBalance"/>
        <el-table-column label="负债及所有者权益">
            <template #default="scope">
                <el-text>{{scope.row.name1}} <el-tooltip placement="right" :content="scope.row.formulaDesc1"><el-icon v-if="scope.row.formulaDesc1"><QuestionFilled /></el-icon></el-tooltip>  </el-text>
            </template>
        </el-table-column>
        <el-table-column label="行次" prop="num1"/>
        <el-table-column label="期末余额" prop="endingBalance1"/>
        <el-table-column label="年初余额" prop="openingBalance1"/>
    </el-table>
    
</template>

<script setup>
import { req_reportDebt } from '@/request/report';
import { computed, onMounted, ref } from 'vue';
import { useSetStore } from '@/pinia/set';
const store = useSetStore();
const customerId = localStorage.getItem("customerId");

//hooks
onMounted(async () => {
    updateFinalTable();
});


const finalTable = ref([]);
const updateFinalTable = async () => {
    let rawForm = await req_reportDebt({
        customerId: store.sob.customerId,
        currentPeriod: formatedDateSelection.value,
        type: store.sob.companyType,
        subjectId: store.sob.subjectId
    });
    let asset = rawForm.slice(0, rawForm.length/2);
    let liability = rawForm.slice(rawForm.length/2, rawForm.length);
    finalTable.value = asset.map((value, index) => {
        return {
            ...asset[index], 
            configId1: liability[index].configId,
            endingBalance1 : liability[index].endingBalanceFormula,
            endingBalanceFormulaParams1: liability[index].endingBalanceFormulaParams,
            formulaDesc1: liability[index].formulaDesc,
            id1: liability[index].id,
            name1: liability[index].name,
            num1: liability[index].num,
            openingBalance1: liability[index].openingBalance,
            openingBalanceFormula1: liability[index].openingBalanceFormula,
            openingBalanceFormulaParams1: liability[index].openingBalanceFormulaParams,
            operationType1: liability[index].operationType,
            sortNum1: liability[index].sortNum,
            subjectId1: liability[index].subjectId
        }
    });
}

const dateSelection = ref(new Date(store.sob.currentPeriod));
const formatedDateSelection = computed(() => {
    return `${dateSelection.value.getFullYear()}-${(dateSelection.value.getMonth() + 1).toString().padStart(2, '0')}`
});
const disabledPeriods = time => {
    for (let item of store.availablePeriods) {
        let available = new Date(item.period);
        if (available.getFullYear() === time.getFullYear() && available.getMonth() === time.getMonth()){
            return false;
        }
    }
    return true;
};
</script>