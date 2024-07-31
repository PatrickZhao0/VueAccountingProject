<template>
    <div>
        <el-row>
            <el-col :span="6">
                <el-button 
                class="button" 
                v-for="bean in beanTypes" 
                :style="`border-bottom:  ${(bean.code == beanType) ? 'solid red' : ''}`"
                @click="beanTableChange(bean.code)">
                    {{ bean.name }}
                </el-button>
            </el-col>

            <el-col :span="4" >
                <el-tabs class="tabs" v-model="tabValue">
                    <el-tab-pane label="科目设置" :name="0"/>
                    <el-tab-pane label="期初设置" :name="1"/>
                </el-tabs>
            </el-col>
        </el-row>

        <el-table
        v-if="tabValue == 0"
        :data="subjectsTable"
        row-key="fullCode"
        :height="600"
        lazy>  

            <el-table-column fixed label="科目编码" prop="code">
                <template #default="scope">
                    <el-text>
                        <el-icon @click="scope.row.expanded ? deleteSubjectsChildren(scope.$index) : loadSubjectsChildren(scope)">
                            <ArrowRight v-if="scope.row.children && !scope.row.expanded"/>
                            <ArrowDown v-else-if="scope.row.children && scope.row.expanded"></ArrowDown>
                        </el-icon>  
                        {{ scope.row.code }}
                    </el-text>
                </template>

            </el-table-column>

            <el-table-column label="科目名称" prop="name"/>

            <el-table-column label="计量单位" prop="unit"/>

            <el-table-column label="外币核算">

                <el-table-column label="外币币别"/>

                <el-table-column label="期末调汇">
                    <template #default="scope">
                        <span>{{ scope.row.endingExchange ? '是' : '否' }}</span>
                    </template>
                </el-table-column>

            </el-table-column>

            <el-table-column label="余额方向">
                <template #default="scope">
                    <span>{{ (scope.row.direction == 1) ? '借' : '贷' }}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="danger" link v-if="scope.row.enabled" @click="enabledUnpdate(scope.row)">停用</el-button>
                    <el-button type="danger" link v-else @click="enabledUnpdate(scope.row)">启用</el-button>
                    <el-button type="danger" link>新增</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-table
        v-else
        border
        :data="initialsTable"
        row-key="fullCode"
        :height="600"
        show-summary
        :summary-method="summaryMethod"
        lazy>  
            <el-table-column fixed label="科目编码">
                <template #default="scope">
                    <el-text>
                        <el-icon @click="scope.row.expanded? deleteInitialsChildren(scope.$index) : loadInitialsChildren(scope)">
                            <ArrowRight v-if="scope.row.children && !scope.row.expanded"/>
                            <ArrowDown v-else-if="scope.row.children && scope.row.expanded"></ArrowDown>
                        </el-icon>  
                        {{ scope.row.code }}
                    </el-text>
                </template>  
            </el-table-column>

            <el-table-column label="科目名称" prop="name"/>

            <el-table-column label="余额方向">
                <template #default="scope">
                    <span>{{ (scope.row.direction == 1) ? '借' : '贷' }}</span>
                </template>
            </el-table-column>

            <el-table-column label="期初数量">
                <template #default="scope">
                    <el-input v-model="tempQuantityInput" v-if="editPermit === scope.row.code" type="number"
                    @blur="confirmEdit(scope)"/>
                    <div 
                    v-else style="height: 30px;"
                    @click="editAttempt(scope)">
                        <p>{{ scope.row.openingQuantity }}</p>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="期初余额">
                <template #default="scope">
                    <el-input 
                    v-model="tempBalanceInput"
                    v-if="editPermit === scope.row.code" type="number" 
                    @blur="confirmEdit(scope)"/>

                    <div v-else style="height: 30px;"
                    @click="editAttempt(scope)">
                        <p> {{ scope.row.openingBalance }}</p>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
        v-model="editWarn"
        width="500"
        show-close
        center>
            <span>修改父级数据，将会清空子级数据，确定清空吗?</span>
            <template #footer>
                <el-button type="warning" @click="confirmClear">确定</el-button>
            </template>
        </el-dialog>
    </div>
    
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { req_beanSetting, req_beanEnabledUpdate, req_initialsSetting } from '@/request/subjects';
    import { ElMessage } from 'element-plus';

    //Hooks
    onMounted(() => {   
        getSubjectSetting();
        getInitialSetting();
    });

    //Public 
    const customerId = localStorage.getItem('customerId');
    const tabValue = ref(0);

    const beanType = ref(10);
    const beanTypes = [
        {name: '资产', code: 10},
        {name: '负债', code: 20},
        {name: '权益', code: 30},
        {name: '成本', code: 40},
        {name: '损益', code: 50},
    ];
    const beanTableChange = (code) => {
        beanType.value = code;
        getInitialSetting();
        getSubjectSetting();
    }

    //Subjects Table
    const subjectsTable = ref([]);
    const getSubjectSetting = async () => {
        subjectsTable.value = await req_beanSetting({customerId, beanType: beanType.value});
        for(let row of subjectsTable.value) {
            row.expanded = false;
        }
    }
    const loadSubjectsChildren = async (scope) => {
        SubjectsExpansionCheck(scope.$index);
        scope.row.expanded = true;
        try{
            const children = await req_beanSetting({customerId, beanType: beanType.value, pCode: scope.row.code});
            for (let child of children) {
                child.expanded = false;
            }
            const spliceIndex = (() => {
                for (let key in subjectsTable.value) {
                    if (subjectsTable.value[key].fullCode == scope.row.fullCode) {
                        return ++key;
                    }
                }
            })();
            subjectsTable.value.splice(spliceIndex, 0, ...children); 
        } catch (e) {
            ElMessage({
                message: e, //'子组件加载失败',
                type: "error"
            });
        }
    }
    const SubjectsExpansionCheck = (index) => {
        for (let prevIndex = index -1; subjectsTable.value[prevIndex]; prevIndex --) {
            if ( (subjectsTable.value[prevIndex].code.length === subjectsTable.value[index].code.length) 
            && subjectsTable.value[prevIndex].expanded == true 
            && subjectsTable.value[prevIndex].children) {
                deleteSubjectsChildren(prevIndex);
                break;
            }
        }
        while (subjectsTable.value[index + 1]) {
            if (subjectsTable.value[index + 1].expanded == true) {
                subjectsTable.value[index + 1].expanded = false;
                deleteSubjectsChildren(index + 1);
                break;
            }
            index ++;
        }
    }    
    const deleteSubjectsChildren = (index) => {
        subjectsTable.value[index].expanded = false
        let nextRowIndex = index + 1;
        while(subjectsTable.value[nextRowIndex].code.length != subjectsTable.value[index].code.length) {
            subjectsTable.value.splice(nextRowIndex, 1);
        }    
    }
    const enabledUnpdate = async row => {
        row.enabled = ! row.enabled;
        const enabled = row.enabled ? 0 : 1;
        await req_beanEnabledUpdate({beanId: row.beanId, enabled: enabled, customerId: customerId, code: row.code});
    } 

    //Initials Table 
    const initialsTable = ref([]);
    const showForeignAmount = ref(0);
    const getInitialSetting = async () => {
        initialsTable.value = await req_initialsSetting({customerId, beanType: beanType.value, showForeignAmount: showForeignAmount.value});
        for (let row of initialsTable.value) {
            row.expanded = false;
        }
    }
    const initialsExpansionCheck = (index) => {
        for (let prevIndex = index -1; initialsTable.value[prevIndex]; prevIndex --) {
            if ( (initialsTable.value[prevIndex].code.length === initialsTable.value[index].code.length) 
            && initialsTable.value[prevIndex].expanded == true 
            && initialsTable.value[prevIndex].children) {
                deleteInitialsChildren(prevIndex);
                break;
            }
        }
        while (initialsTable.value[index + 1]) {
            if (initialsTable.value[index + 1].expanded == true) {
                initialsTable.value[index + 1].expanded = false;
                deleteInitialsChildren(index + 1);
                break;
            }
            index ++;
        }
    }
    const loadInitialsChildren = async (scope) => {
        initialsExpansionCheck(scope.$index);
        const parentInstance = scope.row;
        console.log("loadChilren");
        parentInstance.expanded = true;
        try{
           
            const retrieved = deletedChildren.value.find(item => item.code === parentInstance.code);
            let children;
            if (retrieved) {
                children = retrieved.deleted;
            } else {
                console.log("request...");
                children = await req_initialsSetting({customerId, beanType: beanType.value, showForeignAmount: showForeignAmount.value, pCode: parentInstance.code});
            }

            let childrenBalanceSum = 0;
            let childrenQuantitySum = 0;
            for (let child of children) {
                child.expanded = false;
                childrenBalanceSum += Number(child.openingBalance);
                childrenQuantitySum += Number(child.openingQuantity);
            }

            childrenBalanceSum = childrenBalanceSum ? childrenBalanceSum : null;
            childrenQuantitySum = childrenQuantitySum ? childrenQuantitySum : null;
            console.log(childrenBalanceSum,childrenQuantitySum);
            if (childrenBalanceSum != parentInstance.openingBalance || childrenQuantitySum != parentInstance.openingQuantity) {
                for (let child of children) {
                    child.openingBalance = null;
                    child.openingQuantity = null;
                }
            }
            
            const spliceIndex = (() => {
                for (let key in initialsTable.value) {
                    if (initialsTable.value[key].fullCode == scope.row.fullCode) {
                        return ++key;
                    }
                }
            })();
            initialsTable.value.splice(spliceIndex, 0, ...children); 
        } catch (e) {
            ElMessage({
                message: e, //'子组件加载失败',
                type: "error"
            });
        }
        console.log("loadChilren Dobe");
    }
    const deletedChildren = ref([]);
    const deleteInitialsChildren = (index) => {
        console.log("delete Start");
        // 截取前先询问
        const parentInstance = initialsTable.value[index];
        let firstChildIndex = index + 1;
        let deleteNums = 0;
        for (let nextIndex = 0; parentInstance.pCode !== initialsTable.value[firstChildIndex + nextIndex].pCode; nextIndex ++) {
            deleteNums ++;
        }

        const deleted = initialsTable.value.splice(firstChildIndex, deleteNums);

        const checkDeleted = deletedChildren.value.findIndex(item => item.code === parentInstance.code);
        if (checkDeleted === -1) {
            console.log('append deleted');
            deletedChildren.value.push({
                code: parentInstance.code,
                deleted: deleted
            });
        } else {
            console.log('update change')
            deletedChildren.value[checkDeleted].deleted = deleted;
        }

        parentInstance.expanded = false
    }
    const editPermit = ref(null);
    const editWarn = ref(false);
    const editRowIndex = ref();
    const tempBalanceInput = ref();
    const tempQuantityInput = ref();
    const editAttempt = (scope) => {
        const editInstance = scope.row;
        tempBalanceInput.value = editInstance.openingBalance;
        tempQuantityInput.value = editInstance.openingQuantity;
        
        if (!editInstance.children) {
            editPermit.value = editInstance.code;
            return;
        }
        
        if (!editInstance.openingBalance && !editInstance.openingQuantity) {
            editPermit.value = editInstance.code;
            return;
        }    
        
        if (!editInstance.expanded && !deletedChildren.value.find(item => item.code === editInstance.code) ){
            ElMessage({
                message: '请先加载子组建',
                type: 'error'
            });
            return;
        }

        editWarn.value = true;
        editPermit.value = null;
        editRowIndex.value = scope.$index;
        
    }
    const confirmClear = () => {
        if (initialsTable.value[editRowIndex.value].expanded) {
            for (let nextRowIndex = editRowIndex.value + 1; 
            initialsTable.value[nextRowIndex].code.length != initialsTable.value[editRowIndex.value].code.length; 
            nextRowIndex ++) {
                initialsTable.value[nextRowIndex].openingBalance = null;
                initialsTable.value[nextRowIndex].openingQuantity = null;
            }
        } 
        initialsTable.value[editRowIndex.value].openingBalance = null;
        initialsTable.value[editRowIndex.value].openingQuantity = null;
        editWarn.value = false;
    }
    const confirmEdit = (scope) => {
        console.log('confirm');
        scope.row.openingBalance = Number(tempBalanceInput.value) ? Number(tempBalanceInput.value) : null;
        scope.row.openingQuantity = Number(tempQuantityInput.value) ? Number(tempQuantityInput.value) : null;
        let pCode = scope.row.pCode;

        if (pCode == 0) {
            editPermit.value = null;
            return;
        }

        let balanceSum = Number(scope.row.openingBalance);
        let quantitySum = Number(scope.row.openingQuantity);
        for (let prevIndex = scope.$index - 1; initialsTable.value[prevIndex].pCode === pCode; prevIndex --) {
            balanceSum += Number(initialsTable.value[prevIndex].openingBalance);
            quantitySum += Number(initialsTable.value[prevIndex].openingQuantity);
        }
        for (let nextIndex = scope.$index + 1; initialsTable.value[nextIndex].pCode === pCode; nextIndex ++) {
            balanceSum += Number(initialsTable.value[nextIndex].openingBalance);
            quantitySum += Number(initialsTable.value[nextIndex].openingQuantity);
        }

        balanceSum = balanceSum ? balanceSum : null;
        quantitySum = quantitySum ? quantitySum : null;
        
        let parentIndex = initialsTable.value.findIndex(item => item.code == pCode);
        initialsTable.value[parentIndex].openingBalance = balanceSum ? balanceSum : initialsTable.value[parentIndex].openingBalance;
        initialsTable.value[parentIndex].openingQuantity = quantitySum ? quantitySum : initialsTable.value[parentIndex].openingQuantity;
        editPermit.value = null;
        console.log(balanceSum, quantitySum);
    }
    const summaryMethod = (param) => {
        let totalOpeningBalance = 0;
        let totalOpeningQuantity = 0
        for(let row of initialsTable.value) {
            console.log(row)
            if (row.code.length === 4) {
                totalOpeningBalance += Number(row.openingBalance);
                totalOpeningQuantity += Number(row.openingQuantity);
            }
        }
        return ['合计', '', '', totalOpeningQuantity, totalOpeningBalance]
    }

</script>

<style scoped>
.button{
    margin-left: 0;
    border-radius: 0;
}
.tabs {
    margin-top: -10px;
}
.tabs > * {
    margin-bottom: 0px;
}
.el-tabs {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>