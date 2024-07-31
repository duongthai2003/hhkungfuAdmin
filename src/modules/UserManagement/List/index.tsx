import { useEffect, useState } from 'react';
import AppsContainer from '@crema/components/AppsContainer';
import { useIntl } from 'react-intl';
import AppsHeader from '@crema/components/AppsContainer/AppsHeader';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import AppInfoView from '@crema/components/AppInfoView';
import { Input, Modal } from 'antd';
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
import { set } from 'lodash';
import { useSearchParams } from 'react-router-dom';
import ModalDetailReport from 'modules/ReportManagement/TradingsList/modalDetailReport';
import ChangeCustomer from './ChangePass';

type OrderProps = {
  items: CustomersDataType[];
  total: number;
  start: number;
  limit: number;
};
const Customers = () => {
  const { messages } = useIntl();
  const [{ apiData, loading }, { setQueryParams, reCallAPI }] =
    useGetDataApi<OrderProps>('/users', undefined, {}, false);

  const [page, setPage] = useState<number>(1);
  const [search, setSearchQuery] = useState('');
  const [start, setStart] = useState<number>(0);
  const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
  const [currentRow, setCurrentRow] = useState<any>(null);
  const [changeCurrentRow, setChangeCurrentRow] = useState<any>(null);
  const [showModalUserDetail, setShowModalUserDetail] = useState(false);

  const onChange = (page: number) => {
    console.log(page);
    setStart(page * apiData?.limit - apiData?.limit);
    setPage(page);
  };
  useEffect(() => {
    setQueryParams({ start: start, limit: 10 });
  }, [start, page]);

  const onSearchOrder = (e: any) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  const handleOk = () => {
    console.log(56475765757);
    setIsShowModalEditUser(false);
  };

  const handleCancel = () => {
    setIsShowModalEditUser(false);
    setCurrentRow(false);
    setChangeCurrentRow(false);
  };

  return (
    <>
      <AppPageMeta title="Danh sách người dùng" />
      <AppsContainer title="Danh sách người dùng" fullView type="bottom">
        <AppsHeader key={'wrap'}>
          <StyledCustomerHeader>
            <StyledCustomerInputView>
              <Input
                id="user-name"
                placeholder="Search"
                type="search"
                onChange={onSearchOrder}
              />
            </StyledCustomerInputView>
            <StyledCustomerHeaderRight>
              <StyledCustomerHeaderPagination
                pageSize={10}
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
              onEdit={(row) => setCurrentRow(row)}
              onChangePass={(row) => setChangeCurrentRow(row)}
              refresh={reCallAPI}
            />
          </AppsContent>
        )}

        <StyledCustomerFooterPagination
          key={'wrap2'}
          pageSize={10}
          count={apiData?.total || 0}
          page={page}
          onChange={onChange}
        />
      </AppsContainer>

      {currentRow && (
        <Modal
          title={'Thay đổi'}
          open={!!currentRow}
          onOk={handleOk}
          footer={false}
          onCancel={handleCancel}
        >
          <EditCustomer row={currentRow} reCallAPI={reCallAPI} />
        </Modal>
      )}

      {changeCurrentRow && (
        <Modal
          title={'Thay đổi mật khẩu'}
          open={!!changeCurrentRow}
          onOk={handleOk}
          footer={false}
          onCancel={handleCancel}
        >
          <ChangeCustomer row={changeCurrentRow} reCallAPI={reCallAPI} />
        </Modal>
      )}

      <AppInfoView />
    </>
  );
};

export default Customers;
