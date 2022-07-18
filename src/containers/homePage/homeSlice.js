import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../api';

const initialState = {
  data: [],
  filteredInfo: {},
  sortedInfo: {},
  editingKey: '',
  isLoading: true
};

export const getSampleTableData = createAsyncThunk("home/getSampleTableData", async () => {
  const respData = await API.get(`/mocktabledata`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return respData;
}
);


export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
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
    [getSampleTableData.pending]: (state) => {
      state.isLoading = true;
    },
    [getSampleTableData.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    [getSampleTableData.rejected]: (state) => {
      state.isLoading = false;
    },
  }
});

export const selectHomeData = (state) => state.home;

export const { addData, editData, filterData, sortData, setEditingKey } = homeSlice.actions;

export const homeReducer = homeSlice.reducer;