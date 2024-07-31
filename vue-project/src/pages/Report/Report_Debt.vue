<template>
    <el-table
    border>
        <el-table-column label="资产"/>
        <el-table-column label="行次"/>
        <el-table-column label="期末余额"/>
        <el-table-column label="年初余额"/>
        <el-table-column label="负债及所有者权益"/>
        <el-table-column label="行次"/>
        <el-table-column label="期末余额"/>
        <el-table-column label="年初余额"/>
    </el-table>
    
</template>

<script setup>
import { req_reportDebt } from '@/request/report';
import { onMounted, ref } from 'vue';
import { useSetStore } from '@/pinia/set';

//hooks
onMounted(async () => {
    // rawForm = await req_reportDebt();
    
    
});

const rawForm = ref([]);
const customerId = localStorage.getItem("customerId");
let store = useSetStore();
console.log(store.sob)

</script>