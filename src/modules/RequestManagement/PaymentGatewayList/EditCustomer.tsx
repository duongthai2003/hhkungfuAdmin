import { Form, Input, Modal, Select } from 'antd';
import { StyledEditCustomerForm } from './index.styled';
import { useEffect, useState } from 'react';
import { postDataApi, putDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import styled from 'styled-components';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';

type EditCustomerType = {
  showModal?: boolean;
  // setShowModal: () => void
  title?: string;
  row?: any;
  isAddNew?: boolean;
  onClose?: (force?: boolean) => any;
  refresh?: () => any;
};

const Customdiv = styled.div`
  span:first-child {
    display: inline-block;
    height: 25px;
    img {
      height: 100%;
      object-fit: cover;
    }
  }
  span:last-child {
    fontsize: 12px;
  }
`;
const EditCustomer = ({
  showModal,
  // setShowModal,
  isAddNew,
  title,
  row,
  onClose,
  refresh,
}: EditCustomerType) => {
  const [form] = Form.useForm();
  const [{ apiData }] = useGetDataApi('/payment-gateways/banks');
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [activeBank, setActiveBank] = useState([]);
  const inforViewContext = useInfoViewActionsContext();

  useEffect(() => {
    if (row) {
      form.setFieldsValue({
        bankId: row.bankId,
        bankAccountNumber: row.bankAccountNumber,
        bankHolderName: row.bankHolderName,
      });
    }
  }, [row]);

  // useEffect(() => {
  //   setActiveBank(apiData && apiData[0]);
  // }, [apiData]);

  const handleOk = () => {
    // setConfirmLoading(true);
    form.submit();
    // setTimeout(() => {
    //   setShowModal(false);
    //   setConfirmLoading(false);
    // }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    onClose && onClose(false);
  };

  // //////////////////////
  const onFinish = async (values: any) => {
    try {
      setConfirmLoading(true);
      if (isAddNew) {
        await postDataApi(`payment-gateways`, inforViewContext, {
          ...values,
        });
      } else {
        await putDataApi(`payment-gateways/${row._id}`, inforViewContext, {
          ...values,
        });
      }
      refresh && refresh();
      onClose && onClose();
    } finally {
      setConfirmLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const optionArray = (datart: any) => {
    return (
      datart &&
      datart.map((item: any, index: any) => {
        return {
          key: item.id,
          searchName: `${item.name} ( ${item.shortName} )`,
          label: (
            <Customdiv>
              <span>
                {' '}
                <img src={item.logo} />
              </span>
              <span>{`${item.name} ( ${item.shortName} )`}</span>
            </Customdiv>
          ),
          value: item.id,
        };
      })
    );
  };

  // const handleAddNew = (values: any) => {
  //   postDataApi(`payment-gateways`, inforViewContext, {
  //     ...values
  //   })
  // }

  return (
    <>
      <Modal
        title={title}
        open={showModal}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <StyledEditCustomerForm
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="bankHolderName"
            rules={[
              { required: true, message: 'vui lòng nhập tên tài khoản !' },
            ]}
          >
            <Input placeholder="Tên tài khoản" />
          </Form.Item>

          <Form.Item
            name="bankAccountNumber"
            rules={[
              { required: true, message: 'vui lòng nhập số tài khoản !' },
            ]}
          >
            <Input placeholder="Số tài khoản" type="number" />
          </Form.Item>

          <Form.Item
            name="bankId"
            rules={[{ required: true, message: 'vui lòng nhập !' }]}
          >
            <Select
              options={optionArray(apiData)}
              showSearch
              labelInValue={false}
              optionFilterProp="searchName"
              optionLabelProp="label"
            />
          </Form.Item>
        </StyledEditCustomerForm>
      </Modal>
    </>
  );
};

export default EditCustomer;
