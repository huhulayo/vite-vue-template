/*
 * @Author: Li-HONGYAO
 * @Date: 2021-05-21 23:39:56
 * @LastEditTime: 2021-05-22 00:10:33
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: /多多汇宝/src/store/index.ts
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
