import { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Button, DatePicker, Input, Space, Table } from 'antd';
import { Form, InputNumber, Popconfirm, Typography } from 'antd';

import { capitalizeFirstLetter } from '../../../utilities/common';
import LogisticAlert from '../../alerts/logisticAlert';
import { OpenMessage } from '../../messages/messages';
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

const BasicTable = ({
  tableData,
  tableTitle,
  hiddenColumns,
  wideColumns,
  narrowColumns,
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
  const [alertShow, setAlertShow] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  const searchInput = useRef(null);

  useEffect(() => {
      let alertTimer = setTimeout(() => setAlertShow(false), 5000);

      return () => {
        clearTimeout(alertTimer);
      };
    }, [alertShow]
  );

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
      ...record,
    });
    console.log("record: ", record);
    setEditingKey(record.key);
    setAlertMsg("Edit Successfully!");
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
        editData({ ...row, key });
      } else {
        newData.push(row);
      }
      setAlertShow(true);
      setData(newData);
      setEditingKey('');
      OpenMessage('Updating', 'Update Successfully!');
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
    const columnList = Object.keys(data[0]);
    const newData = {};

    columnList.map((item) => {
      switch (item) {
        case 'key':
          newData['key'] = (count + 1).toString();
          break;
        case 'date':
          newData.date = currentTime.toLocaleDateString("en-US");
          break;
        default:
          newData[item] = null;
          break;
      }
    });

    addData(newData);
    setData([newData, ...data]);
    setCount(count + 1);
    handleEditEvent(newData);
    setAlertMsg("Add Successfully!");
  };

  const handleDeleteEvent = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setAlertMsg("Delete Successfully!");
    setAlertShow(true);
    setData(newData);
    OpenMessage('Deleting', 'Delete Successfully!');
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

  const handleAlertCloseEvent = () => {
    setAlertShow(false);
  }

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
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),

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

  const columns = () => {
    const columnsArray = [];
    const columnList = Object.keys(data[0]);

    columnList.map((column, index) => {
      if (!hiddenColumns || !hiddenColumns.includes(column)) {
        columnsArray.push({
          title: capitalizeFirstLetter(column).replace(/([A-Z])/g, ' $1').trim(),
          dataIndex: column,
          key: column,
          width: wideColumns?.includes(column) ? 180 : (narrowColumns?.includes(column) ? 100 : 120),
          filteredValue: filteredInfo[column] || null,
          ...getColumnSearchProps(column),
          sorter: (a, b) => {
            return ('' + a[column]).localeCompare(b[column])
          },
          sortOrder: sortedInfo.columnKey === column ? sortedInfo.order : null,
          sortDirections: ['descend', 'ascend'],
          fixed: index === 0 ? 'left' : null,
          ellipsis: wideColumns?.includes(column),
          editable: true,
        })
      }
    });

    return [
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
      ...columnsArray
    ];
  }


  const mergedColumns = columns().map((col) => {
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
        <h2>{tableTitle}</h2>

        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
        <Button
          onClick={handleAddEvent}
          type="primary"
        >
          + Add
        </Button>
      </Space>

      {alertShow && <LogisticAlert alertType='success' alertMsg={alertMsg} alertClose={handleAlertCloseEvent} />}

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