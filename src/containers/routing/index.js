import { Table, Tag, Modal, Input } from "antd";
import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const Routing = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [pageSize, setpageSize] = useState(8);
  const [selectedRow, setSelectedRow] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);
  const [editingRecordRow, setEditingRecordRow] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => {
        setDataSource(data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      //applying sort
      sorter: (a, b) => a.id > b.id,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Completed",
      dataIndex: "completed",
      key: "completed",
      render: (completed) => {
        const color = completed ? "Green" : "Red";
        return (
          <Tag color={color} key={completed ? "Completed" : "In-Progress"}>
            {completed ? "Completed" : "In-Progress"}
          </Tag>
        );
      },
      //applying filtering
      filters: [
        {
          text: "Completed",
          value: true,
        },
        {
          text: "In-Progress",
          value: false,
        },
      ],
      onFilter: (value, record) => {
        return record.completed === value;
      },
    },
    {
      title: "Actions",
      key: "actions",
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
        setDataSource((pre) => {
          return pre.filter((eachRecord) => eachRecord.id !== record.id);
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
      <h1>Routing Page</h1>
      <Table
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: pageSize,
          //pagination changes and can make API calls
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
      ></Table>
      <Modal
        title="Edit"
        visible={displayModal}
        onCancel={() => {
          setDisplayModal(false);
        }}
        onOk={() => {
          setDataSource((individualRecord) => {
            return individualRecord.map((record) => {
              if (record.id === editingRecordRow.id) {
                return editingRecordRow;
                console.log("editingRecordRow", editingRecordRow);
              } else {
                return record;
              }
            });
          });

          setDisplayModal(false);
        }}
        onText="Save"
      >
        <Input value={editingRecordRow?.id} disabled />
        <Input
          value={editingRecordRow?.title}
          style={{ marginTop: 10 }}
          onChange={(e) => {
            setEditingRecordRow((pre) => {
              return { ...pre, title: e.target.value };
            });
          }}
        />
        <Input
          value={editingRecordRow?.completed}
          style={{ marginTop: 10 }}
          onChange={(e) => {
            setEditingRecordRow((pre) => {
              return { ...pre, completed: e.target.value };
            });
          }}
        />
      </Modal>
    </>
  );
};

export default Routing;
