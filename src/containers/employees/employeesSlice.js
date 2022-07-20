import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import employeesInfo from '../../mockAPI/mockEmployeesInfo.json';
import API from '../../api';

const initialState = {
  data: [],
  filteredInfo: {},
  sortedInfo: {},
  editingKey: '',
  isLoading: true,
  isRequestFailed: false
};


export const getEmployeesInfo = createAsyncThunk("employeesInfo/getEmployeesInfo", async () => {
  const respData = await API.get(`/mockEmployeesInfo`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return respData;
}
);


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
  extraReducers: {
    [getEmployeesInfo.pending]: (state) => {
      state.isLoading = true;
      state.isRequestFailed = false;
    },
    [getEmployeesInfo.fulfilled]: (state, action) => {
      if(action.payload){
        state.data = action.payload.map((item, index) => ({
          ...item,
          key: index
        }));
        state.isRequestFailed = false;
      }else{
        state.data = employeesInfo.employeeInfoList.map((item, index) => ({
          ...item,
          key: index
        }));
        state.isRequestFailed = true;
      }

      state.isLoading = false;
    },
    [getEmployeesInfo.rejected]: (state) => {
      state.isLoading = false;
      state.isRequestFailed = true;
    },
  }
});

export const selectEmployeesInfo = (state) => state.employeesInfo;

export const { getData, addData, editData, filterData, sortData, setEditingKey } = employeesInfoSlice.actions;

export const employeesInfoReducer =  employeesInfoSlice.reducer;