import { createSlice } from '@reduxjs/toolkit';
import { mockTabkeData } from './mock_table_data';

const initialState = [...mockTabkeData];

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

      // let currentTime = new Date();

      // const newData = {
      //   key: count + 1,
      //   name: '',
      //   address: '',
      //   date: currentTime.toLocaleDateString("en-US"),
      //   zone: 0,
      //   region: 'Depot',
      //   dispatchGroupTime: '5:30 AM',
      //   truckDispatchTime: "12:00 PM",
      //   truckEndTime: '5:30 AM',
      //   pretripTime: "12:00 PM",
      //   serviceType: 'A',
      //   description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
      // };
      // addData(newData);
      // setData([newData, ...data]);
      // setCount(count + 1);
      // handleEditEvent(newData);
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