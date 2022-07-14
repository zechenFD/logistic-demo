import { Button, Form, Input, Select } from "antd";
import React from "react";

function OperationalForms({ addToTable }) {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    addToTable(values);
    form.resetFields();
  };

  return (
    <>
      <Form form={form} onFinish={onFinish} labelCol={{ span: 5 }}>
        <Form.Item name="street_address" label="Address">
          <Input placeholder="Enter the Address" />
        </Form.Item>
        <Form.Item name="city" label="City">
          <Input placeholder="Enter the City" />
        </Form.Item>
        <Form.Item name="zip" label="Zip">
          <Input placeholder="Enter the ZipCode" />
        </Form.Item>
        <Form.Item name="service_type" label="Service Type">
          <Select>
            <Select.Option value="home">Home</Select.Option>
            <Select.Option value="corporate">Corporate</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="expressEligible" label="Express">
          <Select>
            <Select.Option value="true">Eligible</Select.Option>
            <Select.Option value="false">Not Eligible</Select.Option>
          </Select>
        </Form.Item>
        <Button block htmlType="submit" type="primary">
          ADD
        </Button>
      </Form>
    </>
  );
}

export default OperationalForms;
