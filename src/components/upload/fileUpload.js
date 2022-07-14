import { Button, Typography, Upload, message } from "antd";
import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import API from "../../api";

function FileUpload() {
  const { Title } = Typography;
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file);
    });
    setUploading(true);
    try {
      const res = await API.post(``, formData);
      console.log(res);
      setFileList([]);
      message.success("upload successfully.");
    } catch (ex) {
      console.log(ex);
      message.error("upload failed.");
    }
    setUploading(false);
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <>
      <Title level={2}>File Upload</Title>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{
          marginTop: 16,
        }}
      >
        {uploading ? "Uploading" : "Start Upload"}
      </Button>
    </>
  );
}

export default FileUpload;
