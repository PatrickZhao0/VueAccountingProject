export default {
    namespaced:true,
    state() {
        return {
            tabs: [
                {
                    menuName: '首页',
                    path: '/index'
                }
            ]
        }
    },
    mutations: {
        append(state, payload) {
            if (! state.tabs.some(obj => obj.menuName === payload.menuName)) {
                state.tabs.push(payload);
            }
        },

        delete(state, payload) {
            state.tabs = state.tabs.filter(obj => obj.menuName !== payload.menuName);
            if(state.tabs.length == 0) state.tabs.push({menuName:'首页', path: '/index'});
        }
    }
}