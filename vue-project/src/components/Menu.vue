<template>
    <div>
        <div style="display: grid;">
            <el-image class="icon" :src="'https://caichendaizhang.oss-cn-shenzhen.aliyuncs.com/crm/brand_logo_opacity.png'"></el-image>
        </div>
       
        <el-menu 
        default-active="0"
        collapse>
            
            <template v-for="item in menuContent" :key="item.index">
                <el-sub-menu class="tabs" v-if="item.children && item.children.length" :index="item.index">
                    <template #title>
                        {{item.menuName}}
                    </template>
                    <el-menu-item v-for="subItem in item.children" :index="subItem.index" :key="subItem.index" @click="gotoPage(subItem)">
                        {{ subItem.menuName }}
                    </el-menu-item>
                </el-sub-menu>
                <div v-else class="tabs">
                    <el-menu-item :index="item.index" @click="gotoPage(item)">
                    {{ item.menuName }}
                    </el-menu-item>
                </div>
                
            </template>
            
        </el-menu>  

    </div>

</template>


<script>
import { req_menu } from '@/request/menu';
export default{
    data() {
        return {
            isCommissioner: null,
            totalElement: null,
            menuContent: []
        }
    },

    created() {
        this.getMenuItems();
    },

    methods: {
        async getMenuItems() {
            const customerId = localStorage.getItem("customerId");
            const result = await req_menu({
                "customerId": customerId,
                "platformType": 30
            });
            this.isCommissioner = result.isCommissioner;
            this.totalElement = result.totalElement;
            this.menuContent = result.content;
        },

        gotoPage(page){
            this.$store.commit('tabsTrack/append', page);
            this.$router.push(page.path);
        }
    }
}
</script>

<style>
.icon {
    width: 50px;
    justify-self: center;
}
.tabs > * {
    padding-left: 15px;
    padding-right: 15px;
    justify-content: center;
}

</style>