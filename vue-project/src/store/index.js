import { createStore } from "vuex";
import customer from "./modules/customer";
import tabsTrack from "./modules/tabsTrack";
const store = createStore({
    modules: {
        customer,
        tabsTrack
    }
})

export default store;