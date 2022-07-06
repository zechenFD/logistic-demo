import { useSelector, useDispatch } from "react-redux";
import BasicTable from '../../components/tables/table';

// import {useFetchBreedsQuery} from './apiSlice';
import { selectMockData, addData, editData } from "./homeSlice.js";

const HomePage = () => {
    // API fectching testing
    // const { data = [], isFetching } = useFetchBreedsQuery(10);
    // console.log("data: ", data);

    // get mock data
    const mockData = useSelector(selectMockData);
    const dispatch = useDispatch();

    const handleAddEvent = (data) => {
        dispatch(addData(data))
    }

    const handleEditEvent = (data) => {
        dispatch(editData(data))
    }

    return (
        <BasicTable 
            tableData={mockData} 
            addData={handleAddEvent}
            editData={handleEditEvent}
        />
    )
}

export default HomePage;