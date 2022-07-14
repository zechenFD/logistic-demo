import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Input,
  Modal,
  Select,
  Space,
  Table,
  TimePicker,
} from "antd";
import { Form, InputNumber, Popconfirm, Typography } from "antd";

import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { mockTabkeData } from "./mock_table_data";

import "./table.less";

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
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
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

const BasicTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(mockTabkeData);
  const [editingKey, setEditingKey] = useState("");

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [addModal, setAddModal] = useState(false);

  const searchInput = useRef(null);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const addAddress = () => {
    setAddModal(true);
  };

  const padTo2Digits = (num) => {
    return num.toString().padStart(2, "0");
  };

  const formatDate = (date) => {
    return [
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
      date.getFullYear(),
    ].join("/");
  };

  const formatTime = (date) => {
    return (
      [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes())].join(
        ":"
      ) +
      " " +
      [padTo2Digits(date.getHours()) >= 12 ? "PM" : "AM"]
    );
  };

  const onFinish = (values) => {
    values.key = Math.random();
    values.date = formatDate(new Date(values.date));
    values.dispatchGroupTime = formatTime(new Date(values.dispatchGroupTime));
    values.truckDispatchTime = formatTime(new Date(values.truckDispatchTime));
    values.truckEndTime = formatTime(new Date(values.truckEndTime));
    values.pretripTime = formatTime(new Date(values.pretripTime));
    console.log("values", values);
    setData([values, ...data]);
    setAddModal(false);
  };

  // 👇️ 2022-01-15 14:24:00 (yyyy-mm-dd hh:mm:ss)

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
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
          </Button>
        </Space>
      </div>
    ),

    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),

    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),

    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },

    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
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
        key: "even",
        text: "Select Even Row",
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
      title: "operation",
      dataIndex: "operation",
      width: 120,
      fixed: "left",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      filteredValue: filteredInfo.name || null,
      sorter: (a, b) => ("" + a.name).localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      fixed: "left",
      ellipsis: true,
      editable: true,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 200,
      filteredValue: filteredInfo.address || null,
      ...getColumnSearchProps("address"),
      sorter: (a, b) => ("" + a.address).localeCompare(b.address),
      sortOrder: sortedInfo.columnKey === "address" ? sortedInfo.order : null,
      sortDirections: ["descend", "ascend"],
      ellipsis: true,
      editable: true,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 200,
      filteredValue: filteredInfo.date || null,
      ...getColumnSearchProps("date"),
      sorter: (a, b) => ("" + a.date).localeCompare(b.date),
      sortOrder: sortedInfo.columnKey === "date" ? sortedInfo.order : null,
      sortDirections: ["descend", "ascend"],
      ellipsis: true,
      editable: true,
    },
    {
      title: "Zone",
      dataIndex: "zone",
      key: "zone",
      width: 200,
      filteredValue: filteredInfo.zone || null,
      ...getColumnSearchProps("zone"),
      sorter: (a, b) => ("" + a.zone).localeCompare(b.zone),
      sortOrder: sortedInfo.columnKey === "zone" ? sortedInfo.order : null,
      sortDirections: ["descend", "ascend"],
      ellipsis: true,
      editable: true,
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      width: 200,
      filteredValue: filteredInfo.region || null,
      ...getColumnSearchProps("region"),
      sorter: (a, b) => ("" + a.region).localeCompare(b.region),
      sortOrder: sortedInfo.columnKey === "region" ? sortedInfo.order : null,
      sortDirections: ["descend", "ascend"],
      ellipsis: true,
      editable: true,
    },
    {
      title: "Dispatch Group Time",
      dataIndex: "dispatchGroupTime",
      key: "dispatchGroupTime",
      width: 200,
      filteredValue: filteredInfo.dispatchGroupTime || null,
      ...getColumnSearchProps("dispatchGroupTime"),
      sorter: (a, b) =>
        ("" + a.dispatchGroupTime).localeCompare(b.dispatchGroupTime),
      sortOrder:
        sortedInfo.columnKey === "dispatchGroupTime" ? sortedInfo.order : null,
      sortDirections: ["descend", "ascend"],
      ellipsis: true,
      editable: true,
    },
    {
      title: "Truck Dispatch Time",
      dataIndex: "truckDispatchTime",
      key: "truckDispatchTime",
      width: 200,
      filteredValue: filteredInfo.truckDispatchTime || null,
      ...getColumnSearchProps("truckDispatchTime"),
      sorter: (a, b) =>
        ("" + a.truckDispatchTime).localeCompare(b.truckDispatchTime),
      sortOrder:
        sortedInfo.columnKey === "truckDispatchTime" ? sortedInfo.order : null,
      sortDirections: ["descend", "ascend"],
      ellipsis: true,
      editable: true,
    },
    {
      title: "Truck End Time",
      dataIndex: "truckEndTime",
      key: "truckEndTime",
      width: 200,
      filteredValue: filteredInfo.truckEndTime || null,
      ...getColumnSearchProps("truckEndTime"),
      sorter: (a, b) => ("" + a.truckEndTime).localeCompare(b.truckEndTime),
      sortOrder:
        sortedInfo.columnKey === "truckEndTime" ? sortedInfo.order : null,
      sortDirections: ["descend", "ascend"],
      ellipsis: true,
      editable: true,
    },
    {
      title: "Pre-trip Time",
      dataIndex: "pretripTime",
      key: "pretripTime",
      width: 200,
      filteredValue: filteredInfo.pretripTime || null,
      ...getColumnSearchProps("pretripTime"),
      sorter: (a, b) => ("" + a.pretripTime).localeCompare(b.pretripTime),
      sortOrder:
        sortedInfo.columnKey === "pretripTime" ? sortedInfo.order : null,
      sortDirections: ["descend", "ascend"],
      ellipsis: true,
      editable: true,
    },
    {
      title: "Service Type",
      dataIndex: "serviceType",
      key: "serviceType",
      width: 150,
      filteredValue: filteredInfo.serviceType || null,
      ...getColumnSearchProps("serviceType"),
      sorter: (a, b) => ("" + a.serviceType).localeCompare(b.serviceType),
      sortOrder:
        sortedInfo.columnKey === "serviceType" ? sortedInfo.order : null,
      sortDirections: ["descend", "ascend"],
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
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      {" "}
      <Form form={form} component={false}>
        <Space
          style={{
            marginBottom: 16,
          }}
        >
          <h2>Table</h2>
          <Button onClick={clearFilters}>Clear filters</Button>
          <Button onClick={clearAll}>Clear filters and sorters</Button>
          <Button onClick={addAddress}>Add</Button>
        </Space>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          rowSelection={rowSelection}
          columns={mergedColumns}
          rowClassName="editable-row"
          dataSource={data}
          onChange={handleChange}
          scroll={{
            x: 800,
            y: 600,
          }}
          expandable={{
            expandedRowRender: (record) => (
              <p
                style={{
                  margin: 0,
                }}
              >
                {record.description}
              </p>
            ),
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
        />
        ;
      </Form>
      <Modal
        title="Add Address"
        visible={addModal}
        footer={null}
        onCancel={() => {
          setAddModal(false);
        }}
      >
        <Form form={form} labelCol={{ span: 8 }} onFinish={onFinish}>
          <Form.Item name="name" label="Name">
            <Input placeholder="Enter the Name" />
          </Form.Item>
          <Form.Item name="age" label="Age">
            <InputNumber placeholder="Enter the Age" />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input placeholder="Enter the address" />
          </Form.Item>
          <Form.Item name="zone" label="Zone">
            <Input placeholder="Enter the zone" />
          </Form.Item>
          <Form.Item name="region" label="Region">
            <Input placeholder="Enter the region" />
          </Form.Item>
          <Form.Item name="date" label="Date">
            <DatePicker />
          </Form.Item>
          <Form.Item name="dispatchGroupTime" label="Dispatch Group Time">
            <TimePicker use12Hours format="h:mm A" />
          </Form.Item>
          <Form.Item name="truckDispatchTime" label="Truck Dispatch Time">
            <TimePicker use12Hours format="h:mm A" />
          </Form.Item>
          <Form.Item name="truckEndTime" label="Truck End Time">
            <TimePicker use12Hours format="h:mm A" />
          </Form.Item>
          <Form.Item name="pretripTime" label="Pre-trip Time">
            <TimePicker use12Hours format="h:mm A" />
          </Form.Item>
          <Form.Item name="serviceType" label="Service Type">
            <Select>
              <Select.Option value="A">A</Select.Option>
              <Select.Option value="B">B</Select.Option>
              <Select.Option value="C">C</Select.Option>
            </Select>
          </Form.Item>
          <Button block htmlType="submit" type="primary">
            ADD
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default BasicTable;
