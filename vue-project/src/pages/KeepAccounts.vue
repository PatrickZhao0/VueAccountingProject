<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="2">
                <el-button style="border-radius: var(--el-border-radius-); border-bottom: solid 2px red;">全部企业</el-button>
            </el-col>

            <el-col :span="6">
                <el-input v-model="tableParams.keyWord" placeholder="请输入客户简称" @keydown.enter="getTableData">
                    <template #append>
                        <el-button icon = "Search" @click="getTableData"/>
                    </template>
                </el-input>
            </el-col>

            <el-col :span="3">
                <el-select v-model="tableParams.consultantId" @change="getTableData" clearable filterable :disabled="!consultantRequestFlag">
                    <el-option
                    v-for="consultant in consultantData"
                    :key="consultant.userId"
                    :label="consultant.userName"
                    :value="consultant.userId">
                    </el-option>
                </el-select>
            </el-col>

            <el-col :span="3" :offset="3">
                <el-button color="red" icon="calendar" style="border-radius: var(--el-border-radius-);">任务中心</el-button>
            </el-col>
        </el-row>

        <el-table :data="tableData" height="500">
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="客户名称" prop="customerFullName"></el-table-column>
            <el-table-column label="客户编号" prop="customerNumber" sortable></el-table-column>
            <el-table-column label="操作" prop="accountBookStatus">
                <template #default = 'scope'>
                    <div style="text-align: center;">
                        <el-button v-if="scope.row.accountBookStatus != 10" type="danger" size="small" plain 
                        @click="createSet(scope.row)">
                            未建帐套
                        </el-button>

                        <el-button v-else size="small" type='danger' link @click="toCustomerIndex(scope.row)">
                            进帐套
                        </el-button>
                    </div>
                </template>

            </el-table-column>
            <el-table-column label="最后结帐月" prop="latestClosedPeriod"></el-table-column>
            <el-table-column label="本月工作状态" header-align="center">
                <el-table-column label="财务" prop="accountants"> </el-table-column>
                <el-table-column label="税务" prop="taxation"> </el-table-column>
                <el-table-column label="审帐"> </el-table-column>
                <el-table-column label="提交人"> </el-table-column>
            </el-table-column>
            <el-table-column label="其他">
                <template #default="scope">
                    <el-button v-show="scope.row.accountBookStatus == 10" size="small" type="danger" link>
                        删除帐套
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <pageFlipper 
        :total="tableParams.total" 
        :pageSize="tableParams.pageSize" 
        :pageNum="tableParams.pageNum" 
        :disableFlag="tableRequestFlag" 
        @pageChange = "updateTable"/>

        <el-dialog v-model="setCreationDialog" width="800">
            <template #header>
                <div>
                    <span>创建帐套</span>
                </div>
            </template>
            <SetCreation :cusInfo = "activeCustomerInfo" @cancel="setCreationDialog = false"/>
        </el-dialog>    
    </div>
</template>

<script>
import { req_consultants, req_tableData } from '@/request/accounts';
import {req_cusInfoSimp} from '@/request/customerInfo';
export default {
    data() {
        const initialId = localStorage.getItem("jti");
        return {
            activeCustomerInfo : "",
            setCreationDialog: false,
            tableRequestFlag: true,
            consultantRequestFlag: true,
            tableParams: {
                pageNum: 1,
                pageSize: 10,
                keyWord: "",
                total: 0,
                totalPages: 0,
                consultantId: initialId
            },
            tableData: [],
            consultantData: []
        }
    },

    created(){
        this.getTableData();
        this.getConsultants();
    },

    methods: {
        async getConsultants() {
            if(this.consultantRequestFlag) {
                this.consultantRequestFlag = false;
                this.consultantData = await req_consultants();
                this.consultantRequestFlag = true;
            }
        },

        async getTableData() {
            if(this.tableRequestFlag){
                this.tableRequestFlag = false;
                const result = await req_tableData({
                    consultantId: this.tableParams.consultantId,
                    vatType: 0, 
                    pageNum: this.tableParams.pageNum,
                    pageSize: this.tableParams.pageSize,
                    keyWord: this.tableParams.keyWord
                })
                this.tableData = result.data;
                this.tableParams.total  = result.total;
                this.tableParams.totalPages = result.totalPages;
                this.tableRequestFlag = true;
            }
        },

        getCustomerId(row) {
            localStorage.setItem("customerId", row.customerId);
        },

        toCustomerIndex(row) {
            this.getCustomerId(row);
            this.$router.push('/index');
        },

        async createSet(row){
            const cusInfo = await req_cusInfoSimp(row.customerId, err => {
                this.$message.error(`错误: ${err.message}`);
                this.dialogVisible = false;
            });
            this.activeCustomerInfo = cusInfo;
            this.setCreationDialog = true;
        },

        updateTable(obj) {
            this.tableParams = {
                ...this.tableParams,
                ...obj
            }
            this.getTableData();
        }
    }
}
</script>