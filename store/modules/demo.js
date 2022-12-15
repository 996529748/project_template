import { UPDATE_ADD_REQUEST_COUNT } from "../mutation-types";
const axios = {
  state: {
    requestCount: 0,
  },
  mutations: {
    // test
    [UPDATE_ADD_REQUEST_COUNT](state) {
      state.requestCount = state.requestCount + 1;
    },
  },
};

export default axios;
