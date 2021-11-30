/*
 * @Author: Li-HONGYAO
 * @Date: 2021-05-21 23:39:56
 * @LastEditTime: 2021-11-30 20:22:48
 * @LastEditors: Lee
 * @Description:
 */
import { InjectionKey } from "vue";
import {
  createStore,
  ActionTree,
  GetterTree,
  MutationTree,
  Store,
  StoreOptions,
} from "vuex";

// Declare state struct
declare interface globalStore {
  aptDetails?: any;
}
// Define All params of StoreOptions
const globalStoreState: globalStore = {
  aptDetails: 123,
};

const globalStoreGetters: GetterTree<globalStore, any> = {
  aptDetails: (state) => state.aptDetails,
};

const globalStoreMutations: MutationTree<globalStore> = {
  UPDATE_APT_DETAILS(state, payload) {
    state.aptDetails = payload;
  },
};
const globalStoreActions: ActionTree<globalStore, any> = {
  updateAptDetails({ commit }, payload) {
    commit("UPDATE_APT_DETAILS", payload);
  },
};

// Define StoreOptions
const globalStoreOption: StoreOptions<globalStore> = {
  state: globalStoreState,
  getters: globalStoreGetters,
  mutations: globalStoreMutations,
  actions: globalStoreActions,
};

// Defind current store key
export const globalStoreKey: InjectionKey<Store<globalStore>> = Symbol();

export default createStore<globalStore>(globalStoreOption);
