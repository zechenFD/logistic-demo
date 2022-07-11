import { createSlice } from '@reduxjs/toolkit';
import { mockTabkeData } from './mock_table_data';

const initialState = {
  isLoading: false,
  data: [...mockTabkeData]
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
    }

  },
});

export const { getData, addData, editData } = homeSlice.actions;
export const selectMockData = (state) => state.mockData; // mockData is defined in store
export default homeSlice.reducer;