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
import {
  Button,
  Card,
  Checkbox,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Space,
  Typography,
} from 'antd';
import { useState } from 'react';
import { FormProps } from 'antd/lib';
import styled from 'styled-components';
import { WebSocketProvider } from '@contexts/WebSocketContext';
import CardSummaries from './CardSummaries';
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

const Setting = () => {
  const [search, setSearchQuery] = useState('');
  const [page, setPage] = useState<number>(1);
  const [startData, setstartData] = useState<number>(0);

  const onFinish: FormProps<SettingProps>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

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
    <WebSocketProvider keepAliveInterval={1000} initDidMount>
      <AppPageMeta title="Điều chỉnh biểu đồ" />
      <AppsContainer title={'Điều chỉnh biểu đồ'} fullView type="bottom">
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
        <div style={{ padding: 10 }}>
          <CardSummaries />
        </div>
      </AppsContainer>

      <AppInfoView />
    </WebSocketProvider>
  );
};
export default Setting;
