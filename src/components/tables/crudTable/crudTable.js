import {
  Table,
  Tooltip,
  Tag,
  Modal,
  Input,
  Button,
  Form,
  Space,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  HomeOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import API from "../../../api";
import OperationalForms from "../../forms/basicform";

import './crudTable.less'

const CrudTable = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);
  const [editingRecordRow, setEditingRecordRow] = useState(null);
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const { Option } = Select;
  const [filteredInfo, setFilteredInfo] = useState({});
  const [addModal, setAddModal] = useState(false);

  const getData = () => {
    API.get(`/addresses`)
      .then((response) => {
        setDataSource(response.data.slice(0, 15));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setLoading(true);
    getData();
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
  };

  //const [formData, setFormData] = useState([]);

  const addToTable = (values) => {
    values.id = Math.random();
    setDataSource([values, ...dataSource]);
    setAddModal(false);
  };

  const addAddress = () => {
    setAddModal(true);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };
  const columns = [
    {
      title: "Street Address",
      dataIndex: "street_address",
      key: "street_address",
      width: 500,
      filteredValue: filteredInfo.street_address || null,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              style={{ width: 200 }}
              placeholder="Enter Search Key"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              style={{ margin: 10 }}
              type="primary"
              onClick={() => {
                confirm();
              }}
            >
              Search
            </Button>
            <Button
              style={{ margin: 10 }}
              type="ghost"
              onClick={() => {
                clearFilters();
              }}
            >
              Clear
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.street_address
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      render: (text, record) => {
        if (record?.id === editingRecordRow?.id && editMode) {
          return (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {" "}
                <Form.Item
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: "please Enter Street Address",
                    },
                  ]}
                >
                  <Input
                    style={{ width: 350 }}
                    size="medium"
                    onChange={(e) => {
                      setEditingRecordRow((pre) => {
                        return { ...pre, street_address: e.target.value };
                      });
                    }}
                  ></Input>
                </Form.Item>
                <Button
                  type="link"
                  onClick={() => {
                    API.patch(`/addresses/${editingRecordRow.id}`, {
                      street_address: editingRecordRow.street_address,
                    })
                      .then((response) => {
                        setDataSource(response.data.slice(0, 15));
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                    setEditMode(false);
                    setEditingRecordRow(null);
                  }}
                >
                  Save
                </Button>
                <Button
                  type="link"
                  onClick={() => {
                    setEditMode(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </>
          );
        }

        return (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {" "}
              <p>{text}</p>
              <Button
                type="link"
                onClick={() => {
                  setEditingRecordRow(record);
                  form.setFieldsValue({
                    title: record.street_address,
                  });
                  setEditMode(true);
                }}
              >
                Edit
              </Button>
            </div>
          </>
        );
      },
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      width: 150,
      ellipsis: {
        showTitle: false,
      },
      render: (city) => {
        return (
          <Tooltip placement="topLeft" title={city}>
            {city}
          </Tooltip>
        );
      },
      filteredValue: filteredInfo.city || null,
      sorter: (a, b) => {
        return a.city.localeCompare(b.city);
      },
      filters: [
        {
          text: "Category 1",
          value: "Category 1",
          children: [
            {
              text: "Brooklyn",
              value: "Brooklyn",
            },
          ],
        },
        {
          text: "Category 2",
          value: "Category 2",
          children: [
            {
              text: "Bronx",
              value: "Bronx",
            },
            {
              text: "Long Island City",
              value: "Long Island City",
            },
          ],
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.city.includes(value),
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      width: 100,
      filteredValue: filteredInfo.state || null,
    },
    {
      title: "Zip",
      dataIndex: "zip",
      key: "zip",
      width: 100,
      filteredValue: filteredInfo.zip || null,
    },
    {
      title: "Service Type",
      dataIndex: "service_type",
      key: "service_type",
      width: 150,
      render: (text) => {
        const type = text === "home" ? <HomeOutlined /> : <ShopOutlined />;
        return (
          <>
            <Space>
              {" "}
              <span>{text?.toUpperCase()}</span>
              {type}
            </Space>
          </>
        );
      },
      filters: [
        {
          text: "Home",
          value: "home",
        },
        {
          text: "Corporate",
          value: "corporate",
        },
      ],
      onFilter: (value, record) => {
        return record.service_type === value;
      },
      filterSearch: true,
      filteredValue: filteredInfo.service_type || null,
    },

    {
      title: "Express Eligible",
      dataIndex: "expressEligible",
      key: "expressEligible",
      width: 150,
      render: (expressEligible) => {
        return (
          <Tag color={expressEligible ? "Green" : "Red"}>
            {expressEligible ? "Eligible" : "Not Eligible"}
            {expressEligible ? (
              <ShoppingCartOutlined style={{ marginLeft: 5 }} />
            ) : (
              ""
            )}
          </Tag>
        );
      },
      //applying filtering
      filters: [
        {
          text: "Express",
          value: true,
        },
        {
          text: "Non Express",
          value: false,
        },
      ],
      onFilter: (value, record) => {
        return record.expressEligible === value;
      },
      filteredValue: filteredInfo.expressEligible || null,
    },
    {
      title: "Actions",
      key: "actions",
      width: 200,
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditingRow(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteRow(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];
  //row deletion
  const onDeleteRow = (record) => {
    Modal.confirm({
      title: "Are you sure to delete the row ?",
      okText: "Yes",
      cancelText: "No",
      okType: "Danger",
      onOk: () => {
        API.delete(`/addresses/${record.id}`)
          .then((response) => {
            setDataSource(response.data.slice(0, 15));
          })
          .catch((error) => {
            console.log(error);
          });
      },
    });
  };

  //editing for a row with modal implementation
  const onEditingRow = (record) => {
    setDisplayModal(true);
    setEditingRecordRow({ ...record });
  };

  return (
    <>
    
      <Space
        style={{
          marginBottom: 16,
        }}
      >
          <h2>Address Table</h2>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button type="primary" onClick={addAddress}>Add Address</Button>
      </Space>
      <Form form={form}>
        {" "}
        <Table
          loading={loading}
          dataSource={dataSource}
          columns={columns}
          pagination={{
            position: ['bottomCenter'] //topLeft | topCenter | topRight |bottomLeft | bottomCenter | bottomRight
          }}
          rowKey="id"
          rowSelection={{
            type: "checkbox",
            selectedRowKeys: selectedRow,
            onChange: (row) => {
              setSelectedRow(row);
            },
            onSelect: (record) => {
              console.log("record", record);
            },
            selections: [
              Table.SELECTION_ALL,
              Table.SELECTION_NONE,
              {
                key: "even",
                text: "Select Even Rows",
                onSelect: (allKeys) => {
                  const evenSelectedKeys = allKeys.filter((key) => {
                    return key % 2 === 0;
                  });
                  setSelectedRow(evenSelectedKeys);
                },
              },
            ],
          }}
          expandable={{
            expandedRowRender: (record) => {
              const nestedColumns = [
                {
                  title: "Type",
                  key: "type",
                  dataIndex: "type",
                },
                {
                  title: "Planned",
                  key: "planned",
                  dataIndex: "planned",
                },
                {
                  title: "Allocated",
                  key: "allocated",
                  dataIndex: "allocated",
                },
                {
                  title: "Unassigned",
                  key: "unassigned",
                  dataIndex: "unassigned",
                },
              ];

              return (
                <Table
                  columns={nestedColumns}
                  dataSource={record.nestedData}
                  pagination={false}
                />
              );
            },
            rowExpandable: (record) => record?.nestedData?.length > 0,
          }}
          scroll={{
            x: 1400,
            y: 450,
          }}
          onChange={handleChange}
        ></Table>
      </Form>
      <Modal
        title="Change Service Type To"
        visible={displayModal}
        onCancel={() => {
          setDisplayModal(false);
        }}
        onOk={() => {
          API.patch(`/addresses/${editingRecordRow.id}`, {
            zip: editingRecordRow.zip,
            service_type: editingRecordRow.service_type,
          })
            .then((response) => {
              setDataSource(response.data.slice(0, 15));
            })
            .catch((error) => {
              console.log(error);
            });
          setDisplayModal(false);
          setEditingRecordRow(null);
        }}
        onText="Save"
      >
        <Space>
          {" "}
          Zip:
          <Input
            value={editingRecordRow?.zip}
            style={{ width: 100 }}
            onChange={(e) => {
              setEditingRecordRow((pre) => {
                return { ...pre, zip: e.target.value };
              });
            }}
          />
          Service Type:{" "}
          <Select
            //placeholder="Change Service Type"
            defaultValue={editingRecordRow?.service_type}
            style={{
              width: 180,
            }}
            onChange={(value) => {
              setEditingRecordRow((pre) => {
                return { ...pre, service_type: value };
              });
            }}
          >
            <Option value="home">Home</Option>
            <Option value="corporate">Corporate</Option>
          </Select>
        </Space>
      </Modal>
      <Modal
        title="Add Address"
        visible={addModal}
        footer={null}
        onCancel={() => {
          setAddModal(false);
        }}
      >
        <OperationalForms addToTable={addToTable} />
      </Modal>
    </>
  );
};

export default CrudTable;
