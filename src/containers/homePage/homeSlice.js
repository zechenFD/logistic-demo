import { createSlice } from '@reduxjs/toolkit';
import { mockTabkeData } from './mock_table_data';
import axios from 'axios';

const initialState = {
  data: [...mockTabkeData],
  filteredInfo: {},
  sortedInfo: {},
  editingKey: ''
};

export const getEmployeesInfo = async () => {
  const config = {
    method: 'post',
    url: 'http://logisticsdev2.nj01/logisticsapi/v/1/fd/employee/getAllEmployeesInfo',
    headers: {
      'Cookie': 'NSC_mphjtujdtefw2=ffffffff094838cf45525d5f4f58455e445a4a4229a0; Path=/; HttpOnly;'
    },
    data: null
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    getData(state, action) {
      console.log("state: ", state);
      console.log("action: ", action);
    },
    addData(state, action) {
      console.log("add: post data to server");
      console.log("state: ", state);
      console.log("action: ", action);
    },
    editData(state, action) {
      console.log("edit: post data to server");
      console.log("state: ", state);
      console.log("action: ", action);
    },
    filterData(state, action) {
      state.filteredInfo = action.payload;
    },
    sortData(state, action) {
      state.sortedInfo = action.payload;
    },
    setEditingKey(state, action) {
      console.log("action: ", action);
      state.editingKey = action.payload;
    }

  },
});

export const selectHomeData = (state) => state.home;

export const { getData, addData, editData, filterData, sortData, setEditingKey } = homeSlice.actions;

export default homeSlice.reducer;