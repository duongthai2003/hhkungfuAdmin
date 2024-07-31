import { useEffect, useState } from 'react';
import AppsContainer from '@crema/components/AppsContainer';

import { useIntl } from 'react-intl';
import AppsHeader from '@crema/components/AppsContainer/AppsHeader';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import AppInfoView from '@crema/components/AppInfoView';
import { Button, Flex, Input, Modal, Space } from 'antd';
import AppPageMeta from '@crema/components/AppPageMeta';

import {
  StyledCustomerFooterPagination,
  StyledCustomerHeader,
  StyledCustomerHeaderPagination,
  StyledCustomerHeaderRight,
  StyledCustomerInputView,
} from './index.styled';
import { useGetDataApi } from '@crema/hooks/APIHooks';
import CustomerTable from './CustomerTable';
import EditCustomer from './EditCustomer';

import type { CustomersDataType } from '@crema/types/models/ecommerce/EcommerceApp';
import { PlusOutlined } from '@ant-design/icons';
import ModalDetailReport from '../TradingsList/modalDetailReport';

type OrderProps = {
  customers: CustomersDataType[];
  customerCount: number;
};
const Customers = () => {
  const { messages } = useIntl();
  const [currentRow, setCurrentRow] = useState<any>(null);
  const [{ apiData, loading }, { setQueryParams, reCallAPI }] =
    useGetDataApi<any>('/transactions', undefined, {}, false);

  const [page, setPage] = useState<number>(1);
  const [search, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [startData, setstartData] = useState<number>(0);

  const onChange = (page: number) => {
    setPage(page);
    setstartData(page * apiData.limit - apiData.limit);
  };
  useEffect(() => {
    setQueryParams({ start: startData, limit: 10 });
  }, [startData, page]);

  const onSearchOrder = (e: any) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <AppPageMeta title="statements" />
      <AppsContainer title={'statements'} fullView type="bottom">
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
              {/* <Button icon={<PlusOutlined />} onClick={() => setCurrentRow({})}>
                Thêm mới
              </Button> */}
            </Flex>

            <StyledCustomerHeaderRight>
              <StyledCustomerHeaderPagination
                pageSize={apiData?.limit || 10}
                count={apiData?.total || 0}
                page={page}
                onChange={onChange}
              />
            </StyledCustomerHeaderRight>
          </StyledCustomerHeader>
        </AppsHeader>

        {apiData?.items && (
          <AppsContent
            key={'wrap1'}
            style={{
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <CustomerTable
              loading={loading}
              customers={apiData?.items}
              refresh={reCallAPI}
              onEdit={(row) => setCurrentRow(row)}
            />
          </AppsContent>
        )}

        <StyledCustomerFooterPagination
          key={'wrap2'}
          pageSize={apiData?.limit || 10}
          count={apiData?.total || 0}
          page={page}
          onChange={onChange}
        />
      </AppsContainer>

      <Modal
        title={messages['ecommerce.addCustomer'] as string}
        open={isModalVisible}
        onOk={handleOk}
        footer={false}
        onCancel={handleCancel}
      >
        <EditCustomer />
      </Modal>

      <EditCustomer
        showModal={!!currentRow}
        onClose={() => setCurrentRow(null)}
        // setShowModal={setShowModal}
        title={currentRow?._id ? 'Thêm tài khoản' : 'Sửa Tài Khoản'}
        isAddNew={!currentRow?._id}
        row={currentRow}
        refresh={reCallAPI}
      />

      <AppInfoView />
      {!!currentRow && (
        <ModalDetailReport
          row={currentRow}
          open={!!currentRow}
          onCancel={() => setCurrentRow(null)}
        />
      )}
    </>
  );
};

export default Customers;
