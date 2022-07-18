import { createSlice } from '@reduxjs/toolkit';
import { mockTabkeData } from './mock_table_data';

const initialState = {
  data: [...mockTabkeData],
  filteredInfo: {},
  sortedInfo: {},
  editingKey: ''
};

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