import AppInfoView from '@crema/components/AppInfoView';
import AppPageMeta from '@crema/components/AppPageMeta';
import AppsContainer from '@crema/components/AppsContainer';
import AppsHeader from '@crema/components/AppsContainer/AppsHeader';
import {
  StyledCustomerHeader,
  StyledCustomerHeaderPagination,
  StyledCustomerHeaderRight,
  StyledCustomerInputView,
} from '../TradingsList/index.styled';
import { Button, Checkbox, Flex, Form, Input, Space } from 'antd';
import { useEffect, useState } from 'react';
import { FormProps } from 'antd/lib';
import styled from 'styled-components';
import { backgrounds } from 'polished';
import { postDataApi, putDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { useForm } from 'antd/es/form/Form';
type SettingProps = {
  PaymentLevel?: string;
  RateUsd?: string;
  remember?: string;
};
export const FormSettingStyle = styled.div`
  display: flex;
  margin-top: 30px;
  justify-content: center;
  form {
    min-width: 400px;
    label {
      font-size: 15px;
      font-weight: 600;
    }
    label::before {
      display: none !important;
    }
  }
  :where(.css-dev-only-do-not-override-10fj0ws).ant-col-16 {
    max-width: 100%;
  }
`;
type OrderProps = {
  // items: CustomersDataType[];
  // total: number;
  // start: number;
  // limit: number;
  configs: any;
};
const Setting = () => {
  const InfoViewActions = useInfoViewActionsContext();
  const [search, setSearchQuery] = useState('');
  const [page, setPage] = useState<number>(1);
  const [{ apiData, loading }, { setQueryParams, reCallAPI }] =
    useGetDataApi<OrderProps>('/applications/configs', undefined, {}, false);

  const [form] = Form.useForm();
  useEffect(() => {
    setQueryParams({});
  }, []);
  useEffect(() => {
    form.setFieldValue('PaymentLevel', apiData?.configs?.tradingRate);
    form.setFieldValue('RateUsd', apiData?.configs?.usdRate);
  }, [apiData]);

  const onFinish: FormProps<SettingProps>['onFinish'] = async (values) => {
    console.log('Success:', values);
    await putDataApi('applications/configs', InfoViewActions, {
      usdRate: values.RateUsd,
      tradingRate: values.PaymentLevel,
    });

    reCallAPI();
  };
  console.log('cscdscdsvs', apiData);
  const onFinishFailed: FormProps<SettingProps>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo);
  };

  const onSearchOrder = (e: any) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };
  return (
    <>
      <AppPageMeta title="Setting" />
      <AppsContainer title={'Cài đặt'} fullView type="bottom">
        <AppsHeader key={'wrap'}>
          <StyledCustomerHeader>
            <Flex gap={10}>
              <StyledCustomerInputView>
                <Input
                  id="user-name"
                  placeholder="Search"
                  type="search"
                  onChange={onSearchOrder}
                />
              </StyledCustomerInputView>
              <Space size={10} direction="horizontal" />
            </Flex>
          </StyledCustomerHeader>
        </AppsHeader>

        <FormSettingStyle>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            // initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item<SettingProps>
              label="Mức chi trả"
              name="PaymentLevel"
              rules={[
                { required: true, message: 'Vui lòng nhập mức chi trả !' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<SettingProps>
              label="Tỷ giá usdt/vnd"
              name="RateUsd"
              rules={[{ required: true, message: 'Vui lòng nhập tỷ giá !' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ padding: '0 35px' }}
              >
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </FormSettingStyle>
      </AppsContainer>

      <AppInfoView />
    </>
  );
};
export default Setting;
