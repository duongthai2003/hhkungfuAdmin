import { Button, Form, Input, Row, Col, Select } from "antd";
import { StyledEditCustomerForm } from "./index.styled";
import { useEffect, useState } from "react";
import { patchDataApi, putDataApi, useGetDataApi } from "@crema/hooks/APIHooks";
import { useInfoViewActionsContext } from "@crema/context/AppContextProvider/InfoViewContextProvider";
import { CustomersDataType } from "@crema/types/models/ecommerce/EcommerceApp";
type OrderProps = {
  items: CustomersDataType[];
  total: number;
  start: number;
  limit: number;
};
export enum UserTypeStatus {
  use = 1,
  admin = 2,
}
export const UserTypeStatusMapping: any = {
  [UserTypeStatus.use]: "User",
  [UserTypeStatus.admin]: "Admin",
};
const UserTypeMapping: any = {
  ["User"]: 1,
  ["Admin"]: 2,
};
const EditCustomer = ({ row, reCallAPI }: any) => {
  console.log("rowwww", row);

  const [form] = Form.useForm();
  const inforViewContext = useInfoViewActionsContext();
  const [isloading, setIsloading] = useState(false);

  // const [{ apiData: dataPermission }] =
  //   useGetDataApi<OrderProps>('/permission');

  // const [{ apiData: dataRoles }] = useGetDataApi<OrderProps>("/roles");

  const onFinish = async (values: any) => {
    try {
      setIsloading(true);

      await patchDataApi(`/users/${row._id}`, inforViewContext, {
        ...values,
        // type: UserTypeMapping[form.getFieldValue('type')],
      });
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

  // set default value
  useEffect(() => {
    if (row) {
      form.setFieldsValue({
        firstName: row.firstName,
        lastName: row.lastName,
        username: row.username,
        email: row.email,
        // type: UserTypeStatusMapping[row.type],
      });
    }
  }, [row]);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const OptionArray = (data: any) => {
    return (
      data &&
      data.map((item: any, index: any) => {
        return {
          key: item._id,
          searchName: item.name,
          value: item._id,
          label: item.name,
        };
      })
    );
  };

  return (
    <StyledEditCustomerForm
      form={form}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Row gutter={[16, 24]} style={{ marginBottom: "10px" }}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: "Họ" }]}
          >
            <Input placeholder="Họ" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="lastName"
            rules={[{ required: true, message: "Tên" }]}
          >
            <Input placeholder="Tên" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "nickname" }]}
      >
        <Input placeholder="nickname" />
      </Form.Item>{" "}
      <Form.Item name="email">
        <Input placeholder="Email" disabled />
      </Form.Item>
      <Form.Item name="type">
        {row && (
          <Select
            defaultValue={UserTypeStatusMapping[row.type]}
            // mode="multiple"
            placeholder={"Vai trò"}
            onChange={handleChange}
            options={[
              {
                value: 1,
                label: "User",
              },
              {
                value: 2,
                label: "Admin",
              },
            ]}
            allowClear
          />
        )}
      </Form.Item>
      {/* <Form.Item name="role">
        <Select
          // defaultValue="lucy"
          mode="multiple"
          placeholder={"Chức vụ"}
          onChange={handleChange}
          options={OptionArray(dataRoles?.items)}
          allowClear
        />
      </Form.Item> */}
      {/* <Form.Item
        name="permission"
        // rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
      >
        <Select
          mode="multiple"
          // defaultValue="lucy"
          placeholder={'Quyền hạn'}
          onChange={handleChange}
          options={OptionArray(dataPermission?.items)}
          optionFilterProp="searchName"
          optionLabelProp="label"
          allowClear
        />
      </Form.Item> */}
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
};

export default EditCustomer;
