import React, { useState } from "react";
import { StyledEditCustomerForm } from "./index.styled";
import { Button, Col, Form, Input, Row } from "antd";
import { patchDataApi, postDataApi } from "@crema/hooks/APIHooks";
import { useInfoViewActionsContext } from "@crema/context/AppContextProvider/InfoViewContextProvider";

function ChangeCustomer({ row, reCallAPI }: any) {
  console.log("row", row);

  const [form] = Form.useForm();
  const [isloading, setIsloading] = useState(false);
  const inforViewContext = useInfoViewActionsContext();
  const onFinish = async (values: any) => {
    console.log(values);

    try {
      setIsloading(true);
      await patchDataApi(
        `users/admin-reset-pass/${row._id}`,
        inforViewContext,
        {
          ...values,
        }
      );
      reCallAPI();
      console.log(values);
    } finally {
      setTimeout(() => {
        setIsloading(false);
      }, 1000);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <StyledEditCustomerForm
      form={form}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="newPassword"
        rules={[{ required: true, message: "password" }]}
      >
        <Input placeholder="password" type="password" />
      </Form.Item>

      <Form.Item name="confirmPassword">
        <Input placeholder="confirmPassword" type="password" />
      </Form.Item>

      <Form.Item style={{ textAlign: "end" }}>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            padding: "0 35px",
            fontSize: "17px",
            marginTop: "11px",
          }}
          loading={isloading}
        >
          Thay đổi
        </Button>
      </Form.Item>
    </StyledEditCustomerForm>
  );
}

export default ChangeCustomer;
