import { createStore } from "vuex";
import { sortArray } from "../utils/helpers";
import axios from 'axios'

export default createStore({
  state: {
    users: [],
    selectedUsers: new Map(),
    loading: false,
  },
  getters: {
    getQueriedData: (state) => (callback, sort) => {
      // A getter to query the Users
      // Users are filtered using a callback that is sent from the Data Table Component
      let filteredList = state.users.filter((user) => callback(user));

      // Sort Array with sortArray Helper
      filteredList = sortArray(filteredList, sort);
      return filteredList;
    },
    getUnpaidTotal: (state) => {
      // Store Users in a local variable
      let users = state.users;

      // Use Reduce to calculate the unpaid balance
      return users.reduce((unpaidBalance, currentUser) => {
        if (
          currentUser.payment_status == "unpaid" ||
          currentUser.payment_status == "overdue"
        ) {
          return (unpaidBalance =
            Number(unpaidBalance) + Number(currentUser.amount));
        }
        return unpaidBalance;
      }, 0);
    },
  },
  mutations: {
    storeUsers(state, payload) {
      state.users = payload;
    },
    addUser(state, payload) {
      state.selectedUsers.set(payload.id, payload);
    },
    removeUser(state, payload) {
      state.selectedUsers.delete(payload.id);
    },
    setLoading(state, payload) {
      state.loading =  payload;
    }
  },
  actions: {
    async fetchAndStoreUsers({ commit }) {
      commit("setLoading", true);
      try {
        const response = await axios.get('./mock_data.json');
        commit("storeUsers", response.data);
        
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        commit("setLoading", false);

      }
    },

    // Would be Async if API was available
    paySelectedDues({ state }) {
      // if API was available
      // let baseRoute = 'bode-slowmo'
      let selectedUsers = state.selectedUsers;
      selectedUsers.forEach((user) => {
        let temp = user;
        temp.payment_status = "paid";
        // Change the payment_date property of the user
        let timeElapsed = Date.now();
        let today = new Date(timeElapsed);
        user.payment_date = today.toLocaleDateString();
        user = temp;
      });
      // If API was available
      // Axios.post(baseRoute + 'mark-paid', user)
      state.selectedUsers = new Map();
    },
  },
});
