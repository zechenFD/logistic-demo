import { useSelector, useDispatch } from "react-redux";
import BasicTable from '../../components/tables/basicTable/table';
import { selectHomeData, addData, editData, filterData, sortData, setEditingKey } from "./homeSlice.js";

const HomePage = () => {
    const homeData = useSelector(selectHomeData);
    const dispatch = useDispatch();
    const { data, filteredInfo, sortedInfo, editingKey } = homeData;
    const hiddenColumns = ['key', 'age', 'description'];
    const wideColumns = ['address'];
    const narrowColumns = ['zone', 'serviceType', 'region']

    return (
        <BasicTable
            tableTitle='Sample Table'
            tableData={data}
            hiddenColumns={hiddenColumns}
            wideColumns={wideColumns}
            narrowColumns={narrowColumns}
            filteredInfo={filteredInfo}
            sortedInfo={sortedInfo}
            editingKey={editingKey}
            addData={(data) => dispatch(addData(data))}
            editData={(data) => dispatch(editData(data))}
            filterData={(data) => dispatch(filterData(data))}
            sortData={(data) => dispatch(sortData(data))}
            setEditingKey={(key) => dispatch(setEditingKey(key))}
        />
    )
}

export default HomePage;