import { SearchOutlined } from '@ant-design/icons';
import { Button, DatePicker, Input, Space, Table, Tooltip } from 'antd';
import { Form, InputNumber, Popconfirm, Typography } from 'antd';

import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';

import './table.less';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const BasicTable = ({ tableData,
  addData,
  editData,
  filteredInfo,
  filterData,
  sortedInfo,
  sortData,
  editingKey,
  setEditingKey }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(tableData);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [count, setCount] = useState(data.length);
  const searchInput = useRef(null);

  const isEditing = (record) => record.key === editingKey;


  const clearFilters = () => {
    filterData({})
  };

  const clearAll = () => {
    filterData({});
    sortData({});
  };

  const handleEditEvent = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const handleCancelEvent = () => {
    setEditingKey('');
  };

  const handleSaveEvent = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        editData({ ...row, key })
      } else {
        newData.push(row);
      }

      setData(newData);
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleChangeEvent = (pagination, filters, sorter) => {
    filterData(filters)
    sortData(sorter);
  };

  const handleAddEvent = () => {
    let currentTime = new Date();

    const newData = {
      key: count + 1,
      name: '',
      address: '',
      date: currentTime.toLocaleDateString("en-US"),
      zone: 0,
      region: 'Depot',
      dispatchGroupTime: '5:30 AM',
      truckDispatchTime: "12:00 PM",
      truckEndTime: '5:30 AM',
      pretripTime: "12:00 PM",
      serviceType: 'A',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    };

    addData(newData);
    setData([newData, ...data]);
    setCount(count + 1);
    handleEditEvent(newData);
  };

  const handleDeleteEvent = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  const handleSearchEvent = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleResetEvent = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const handleSelectEvent = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {

      return (
        <div className='table-filter-wrapper'>
          {
            dataIndex === 'date' ?
              <DatePicker
                format={"MM/DD/YYYY"}
                onChange={(e) => {
                  setSelectedKeys(e ? [e.format("MM/DD/YYYY")] : []);
                }}
                onPressEnter={() => handleSearchEvent(selectedKeys, confirm, dataIndex)}
                allowClear={true}
              /> : <Input
                ref={searchInput}
                placeholder={`Search ${dataIndex}`}
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => handleSearchEvent(selectedKeys, confirm, dataIndex)}
              />
          }

          <Space>
            <Button
              type="primary"
              onClick={() => handleSearchEvent(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
            >
              Filter
            </Button>
            <Button
              onClick={() => clearFilters && handleResetEvent(clearFilters)}
              size="small"
            >
              Reset
            </Button>
            {/* <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({
                  closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button> */}
          </Space>
        </div>
      )
    },

    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),

    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),

    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        if (searchInput?.current && searchInput?.current.hasOwnProperty('select')) {
          setTimeout(() => searchInput?.current?.select(), 100);
        }

      }
    },

    render: (text) => {
      return (searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : <span title={text}>{text}</span>

      )
    }


  });

  const getRowSelectionProps = {
    selectedRowKeys,
    onChange: handleSelectEvent,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }

            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }

            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  const columns = [
    {
      title: 'Operation',
      dataIndex: 'operation',
      width: 130,
      fixed: 'left',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => handleSaveEvent(record.key)}>
              Save {' '}
            </Typography.Link>
            <Button type="link" danger='true'>
              <Popconfirm title="Sure to cancel?" onConfirm={handleCancelEvent}>
                Cancel
              </Popconfirm>
            </Button>
          </span>
        ) : (
          <>
            <Typography.Link disabled={editingKey !== ''} onClick={() => handleEditEvent(record)}>
              Edit {' '}
            </Typography.Link>
            <Button type="link" danger='true' disabled={editingKey !== ''}>
              <Popconfirm title="Sure to delete?" onConfirm={() => handleDeleteEvent(record.key)}>
                Delete
              </Popconfirm>
            </Button>
          </>
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      filteredValue: filteredInfo.name || null,
      sorter: (a, b) => ('' + a.name).localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      fixed: 'left',
      ellipsis: true,
      editable: true,
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 200,
      filteredValue: filteredInfo.address || null,
      ...getColumnSearchProps('address'),
      sorter: (a, b) => ('' + a.address).localeCompare(b.address),
      sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
      sortDirections: ['descend', 'ascend'],
      ellipsis: true,
      editable: true,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 100,
      filteredValue: filteredInfo.date || null,
      ...getColumnSearchProps('date'),
      sorter: (a, b) => ('' + a.date).localeCompare(b.date),
      sortOrder: sortedInfo.columnKey === 'date' ? sortedInfo.order : null,
      sortDirections: ['descend', 'ascend'],
      ellipsis: true,
      editable: true,
    },
    {
      title: 'Zone',
      dataIndex: 'zone',
      key: 'zone',
      width: 90,
      filteredValue: filteredInfo.zone || null,
      ...getColumnSearchProps('zone'),
      sorter: (a, b) => ('' + a.zone).localeCompare(b.zone),
      sortOrder: sortedInfo.columnKey === 'zone' ? sortedInfo.order : null,
      sortDirections: ['descend', 'ascend'],
      ellipsis: true,
      editable: true,
    },
    {
      title: 'Region',
      dataIndex: 'region',
      key: 'region',
      width: 100,
      filteredValue: filteredInfo.region || null,
      ...getColumnSearchProps('region'),
      sorter: (a, b) => ('' + a.region).localeCompare(b.region),
      sortOrder: sortedInfo.columnKey === 'region' ? sortedInfo.order : null,
      sortDirections: ['descend', 'ascend'],
      ellipsis: true,
      editable: true,
    },
    {
      title: 'Dispatch Group Time',
      dataIndex: 'dispatchGroupTime',
      key: 'dispatchGroupTime',
      width: 130,
      filteredValue: filteredInfo.dispatchGroupTime || null,
      ...getColumnSearchProps('dispatchGroupTime'),
      sorter: (a, b) => ('' + a.dispatchGroupTime).localeCompare(b.dispatchGroupTime),
      sortOrder: sortedInfo.columnKey === 'dispatchGroupTime' ? sortedInfo.order : null,
      sortDirections: ['descend', 'ascend'],
      ellipsis: false,
      editable: true,
    },
    {
      title: 'Truck Dispatch Time',
      dataIndex: 'truckDispatchTime',
      key: 'truckDispatchTime',
      width: 150,
      filteredValue: filteredInfo.truckDispatchTime || null,
      ...getColumnSearchProps('truckDispatchTime'),
      sorter: (a, b) => ('' + a.truckDispatchTime).localeCompare(b.truckDispatchTime),
      sortOrder: sortedInfo.columnKey === 'truckDispatchTime' ? sortedInfo.order : null,
      sortDirections: ['descend', 'ascend'],
      ellipsis: false,
      editable: true,
    },
    {
      title: 'Truck End Time',
      dataIndex: 'truckEndTime',
      key: 'truckEndTime',
      width: 150,
      filteredValue: filteredInfo.truckEndTime || null,
      ...getColumnSearchProps('truckEndTime'),
      sorter: (a, b) => ('' + a.truckEndTime).localeCompare(b.truckEndTime),
      sortOrder: sortedInfo.columnKey === 'truckEndTime' ? sortedInfo.order : null,
      sortDirections: ['descend', 'ascend'],
      ellipsis: true,
      editable: true,
    },
    {
      title: 'Pre-trip Time',
      dataIndex: 'pretripTime',
      key: 'pretripTime',
      width: 140,
      filteredValue: filteredInfo.pretripTime || null,
      ...getColumnSearchProps('pretripTime'),
      sorter: (a, b) => ('' + a.pretripTime).localeCompare(b.pretripTime),
      sortOrder: sortedInfo.columnKey === 'pretripTime' ? sortedInfo.order : null,
      sortDirections: ['descend', 'ascend'],
      ellipsis: true,
      editable: true,
    },
    {
      title: 'Service Type',
      dataIndex: 'serviceType',
      key: 'serviceType',
      width: 140,
      filteredValue: filteredInfo.serviceType || null,
      ...getColumnSearchProps('serviceType'),
      sorter: (a, b) => ('' + a.serviceType).localeCompare(b.serviceType),
      sortOrder: sortedInfo.columnKey === 'serviceType' ? sortedInfo.order : null,
      sortDirections: ['descend', 'ascend'],
      ellipsis: true,
      editable: true,
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Space className='table-header'>
        <h2>Sample Table</h2>

        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
        <Button
          onClick={handleAddEvent}
          type="primary"
        >
          + Add
        </Button>
      </Space>

      <Table
        className='logistic-table'
        size="small"
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        rowSelection={getRowSelectionProps}
        columns={mergedColumns}
        rowClassName="editable-row"
        dataSource={data}
        onChange={handleChangeEvent}
        scroll={{
          x: 800,
          y: 600,
        }}
        expandable={{
          expandedRowRender: (record) => (
            <p> {record.description} </p>
          ),
          rowExpandable: (record) => record.name !== 'Not Expandable',
        }}
        pagination={{
          position: ['bottomCenter'] //topLeft | topCenter | topRight |bottomLeft | bottomCenter | bottomRight
        }}
      />
    </Form>
  )


}

export default BasicTable;