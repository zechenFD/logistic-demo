import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import BasicTable from '../../components/tables/basicTable/table';
import { getEmployeesInfo, selectEmployeesInfo, addData, editData, filterData, sortData, setEditingKey, getData } from "./employeesSlice.js";

const EmployeesPage = () => {
    const employeesInfo = useSelector(selectEmployeesInfo);
    const dispatch = useDispatch();
    const { data, isLoading, isRequestFailed, filteredInfo, sortedInfo, editingKey } = employeesInfo;
    const hiddenColumns = ['key', 'warnings', 'errors', 'debug', 'notice'];
    const wideColumns = ['employeeDistributionEmail', 'fullName'];
    const narrowColumns = ['status', 'errorCode']

    useEffect(() => {
        dispatch(getEmployeesInfo());
    }, [])

    if(isLoading){
        return <div>loading...</div>
    }

    return (
        <BasicTable
            isRequestFailed={isRequestFailed}
            tableTitle='Employees Info'
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

export default EmployeesPage;