<template>
    <div style="border: solid gray 0.1px;">
        <div style="border: solid grey 0.5px;">
            <el-row :gutter="10">
                <el-col :span="2">
                    <el-select
                    v-model="versionSelection"
                    :size="'small'"
                    @change="displayDocs">
                        <el-option label="常规版" :value="1"/>
                        <el-option label="轻量版" :value="0"/>
                    </el-select>
                </el-col>

                <el-col :span="4">
                    <el-input
                    v-model="tableParams.keyWord"
                    :size="'small'"
                    @change="displayDocs">
                        <template #append>
                            <el-icon @click="displayDocs"><Search/></el-icon>
                        </template>
                    </el-input>
                </el-col>
            </el-row>
        </div>
        
        <div>
            <el-row>
                <el-table
                class="table"
                :data="docsShow"
                :span-method="spanMethod"
                :height="480"
                :cell-style="docsCellStyle"
                border>
                    <el-table-column label="操作">
                        <template #default>
                            <el-button plain link>插入凭证</el-button> <br>
                            <el-button plain link>红字冲销</el-button> <br>
                            <el-button plain link>修改</el-button> <br>
                            <el-button plain link>删除</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column type="selection"/>
                    <el-table-column label="摘要" prop="summary">
                        <template #default="scope">
                            <span v-if="scope.row.rowType === 1">日期：{{ scope.row.journalDate }} 凭证字号：{{ scope.row.voucherFullNum }} 付单据：{{ scope.row.docNum }} 分类：{{ scope.row.classification }}</span>
                            <span v-if="scope.row.rowType === 3">合计：({{ changeMoneyToCH(scope.row.creditAmount) }})</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="科目" prop="subjectBeanFullName"/>
                    <el-table-column label="借方金额" prop="debitAmount"/>
                    <el-table-column label="贷方金额" prop="creditAmount"/>
                </el-table>
            </el-row>
        </div>

        <div>
            <el-row>
                <el-col>
                    <pageFlipper 
                    :total="tableParams.total" 
                    :pageSize="tableParams.pageSize" 
                    :pageNum="tableParams.pageNum" 
                    :disableFlag="tableParams.disableFlag" 
                    @pageChange="updateTable"/>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { req_docs } from '@/request/doc';
import { useSetStore } from '@/pinia/set';
import { changeMoneyToCH } from '@/util/chnNumberCap';

const setStore = useSetStore();

onMounted(async () => {
    scrollBar = document.getElementsByClassName("table")[0].getElementsByClassName("el-scrollbar__wrap")[0];
    await displayDocs();
})

//config
const versionSelection = ref(1);
const tableParams = ref({
    total: 0,
    pageNum: 1,
    pageSize: 50,
    disableFlag: true,
    keyWord: null,
    keyWordType: "10,60,30,50"
});
const spanMethod = ({row, column, rowIndex, columnIndex}) => {
    if (row.rowType == 1) {
        if (columnIndex == 0 || columnIndex == 1) {
            return [row.voucherLength + 2, 1];
        } else if (columnIndex == 2) {
            return [1, 4];
        } else {
            return [0, 0];
        }
    } else if (row.rowType == 3) {
        if (columnIndex == 0 || columnIndex == 1) {
            return[0,0]
        }
        if (columnIndex == 2) {
            return [1, 2];
        }
        if (columnIndex == 3) {
            return [0, 0];
        }
    } else {
        if (columnIndex == 0 || columnIndex == 1) {
            return[0,0]
        }
    }


};

//docs
const docsData = ref();
const docsShow = ref([]);
const docsCellStyle = ({row, column, rowIndex, columnIndex}) => {
    if (tableParams.value.keyWord && ['subjectBeanFullName', 'summary', 'debitAmount', 'creditAmount'].includes(column.property)) {
        if (String(row[column.property]).search(tableParams.value.keyWord) !== -1) {
            return {'border': "solid red 1px"};
        }
    }
}
let docsPtr = 0;
const getDocs = async () => {
    docsData.value = [];
    docsShow.value = [];
    docsPtr = 0;
    let result = await req_docs({
        pageSize: tableParams.value.pageSize, 
        currentPeriod: setStore.sob.currentPeriod,
        pageNum: tableParams.value.pageNum,
        keyWord: tableParams.value.keyWord,
        keyWordType: tableParams.value.keyWordType,
        customerId: localStorage.getItem('customerId')
    });
    tableParams.value.total = result.total;
    docsData.value = result.data;
}
const displayDocs = async () => {
    await getDocs();
    if (versionSelection.value == 1) {
        docsShow.value.push(...docsData.value);
        scrollBar.removeEventListener("scroll",checkReachBottom);
    } else {
        scrollBar.addEventListener("scroll", checkReachBottom);
        appendDocs(); 
    }
}
const appendDocs = () => {
    for (let i = 0; i < 12; i ++){
        if (docsPtr == docsData.value.length) return
        docsShow.value.push(docsData.value[docsPtr]);
        docsPtr ++;
    }
}

let scrollBar;
const checkReachBottom = () => {
    const reachedBottom = (440 + scrollBar.scrollTop) == scrollBar.scrollHeight;
    console.log(reachedBottom);
    if(reachedBottom) appendDocs();
}
const updateTable = (update) => {
    tableParams.value.pageNum = update.pageNum;
    tableParams.value.pageSize = update.pageSize;
    displayDocs();
}


</script>

