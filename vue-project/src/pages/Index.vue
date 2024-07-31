<template>
    <div>

        <el-row justify="center">

            <el-col :span="3">
                <div>
                    <div>
                        <span>帐套信息</span>
                    </div>

                    <div>
                        <div>
                            <span>企业名称：</span>
                        </div>
                        
                        <div>
                            <span>记账服务期：</span>
                        </div>

                        <div>
                            <span>报税会计制度： </span>
                        </div>

                        <div>
                            <span>纳税人编号：</span>
                        </div>

                    </div>
                </div>
            </el-col>

            <el-col :span="3">
                <div>
                    <div>
                        <span>帐套负责人员</span>
                    </div>

                    <div>  
                        <div>
                            <span>顾问：</span>
                        </div>
                        
                        <div>
                            <span>助理：</span>
                        </div>
                    </div>
                
                </div>
            </el-col>

        </el-row>

            <div>
                <div>
                    <span>月度工作快捷工具</span>
                </div>

                <div>
                    <el-button type="primary" size="default" @click="">账务处理</el-button>
                    
                    <el-divider/>

                    <el-button type="primary" size="default" @click="">税款计算</el-button>
                    <el-button type="primary" size="default" @click="">电子税务局</el-button>
                    <el-button type="primary" size="default" @click="">勾选平台</el-button>
                    <el-button type="primary" size="default" @click="">出口汇率查询</el-button>

                    <el-divider/>
                    
                    <el-button type="primary" size="default" @click="">增值税申报</el-button>
                    <el-button type="primary" size="default" @click="">财务报表报送</el-button>
                    
                </div>
            </div>
    </div>
</template>

<script>
// import { req_cusSOBsetting } from '@/request/customerInfo';
export default {
    data() {
        return {
            
        }
    },

    // created() {
    //     this.getCustomerInfo();
    // },

    // methods: {
    //     async getCustomerInfo() {
    //         const customerId = localStorage.getItem('customerId');
    //         const res = await req_cusSOBsetting(customerId);
    //         this.pushToCustomerInfoStore(res);
    //     },
    //     pushToCustomerInfoStore(payload) {
    //         this.$store.commit('customer/updateBasicInfo', payload);
    //     }
    // }
}

</script>