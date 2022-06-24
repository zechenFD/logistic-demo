import { Table, Tag } from "antd";
import { useEffect, useState } from "react";

const Routing = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [pageSize, setpageSize] = useState(8);
  const [selectedRow, setSelectedRow] = useState([3]);

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
  ];

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
    </>
  );
};

export default Routing;
