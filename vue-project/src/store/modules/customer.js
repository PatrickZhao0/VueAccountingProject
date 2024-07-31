

export default {
    namespaced:true,
    state() {
        return {
            basicInfo: {}
        }
    },
    mutations: {
        updateBasicInfo(state, payload) {
            state.basicInfo = payload;
        }
    },
    actions: {
        myAction() {
            console.log('xxxxxxx')
        }
    }
}