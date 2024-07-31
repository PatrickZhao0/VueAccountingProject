import { defineStore } from "pinia";
import { ref } from "vue";
export const useSetStore = defineStore('setStore', () => {
    const sob = ref();

    return {
        sob
    }
})