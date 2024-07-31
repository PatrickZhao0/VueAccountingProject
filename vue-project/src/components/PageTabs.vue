<template>
    <div style="margin-left: -20px;">
        <el-row :gutter="0">
            <el-col>
                <el-button class="tabs" plain v-for="tab in tabs" :key="tab.id" @click.exact="router.push(tab.path)">
                    <span :style="`color: ${route.path === tab.path ? 'red' : 'black'}`">{{tab.menuName}}&nbsp; &nbsp;</span> <el-icon @click="deleteTabs(tab)"><Close/></el-icon>
                </el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
const store = useStore();
const router = useRouter();
const route = useRoute();
const tabs = computed(() => store.state.tabsTrack.tabs);


function deleteTabs(tab) {
    store.commit('tabsTrack/delete', tab);
    if(tab.path == route.path) router.push(store.state.tabsTrack.tabs[store.state.tabsTrack.tabs.length-1].path);
}
</script>

<style scoped>
.tabs{
    border-radius: 0;
    padding: 0px;
    margin-left: 0px;
}
</style>