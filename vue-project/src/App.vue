<template>
    <div>
        <div class="view" v-if="notoken">   
            <router-view></router-view>
        </div> 

        <div v-else>
            <div class="view" v-if="noCustomerId">   
                <router-view></router-view>
            </div> 
            <el-container class="view" v-else> 
                <el-aside width="63px" style="border-right: solid grey 0.7px;">
                        <Menu/>
                </el-aside>
                <el-container>

                    <el-header height="80px" style="border-bottom: solid grey 0.7px;" >
                        <Header/>
                        <PageTabs/>
                    </el-header>

                    <el-main>
                        <div v-if="setStore.sob">
                            <router-view></router-view>
                        </div>
                    </el-main>

                </el-container>

            </el-container>
        </div>

    </div>

</template>
<script>
import { useSetStore } from '@/pinia/set';
export default {

    data() {
        return {
            notoken: !localStorage.getItem('token'),
            noCustomerId: !localStorage.getItem('customerId'),
            setStore: useSetStore()
        }
    },
    created() {
        window.$updateNoToken = (bool = true) => {
            this.notoken = bool;
        };

        window.$updateNoCustomerId = (bool = true) => {
            this.noCustomerId = bool;
            console.log(this.noCustomerId);
        };

    }

}
</script>

<style scoped>
    .view{
        height: 100vh;
    }
</style>

