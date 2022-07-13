import { createSlice } from '@reduxjs/toolkit';
import employeesInfo from './mock_employees_info.json';


const initialState = {
  data: [...employeesInfo.employeeInfoList].map((item, index) => ({
    ...item,
    key: index
  })),
  filteredInfo: {},
  sortedInfo: {},
  editingKey: ''
};

const employeesInfoSlice = createSlice({
  name: 'employeesInfo',
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

export const selectEmployeesInfo = (state) => state.employeesInfo;

export const { getData, addData, editData, filterData, sortData, setEditingKey } = employeesInfoSlice.actions;

export default employeesInfoSlice.reducer;