import { useEffect, useState } from "react";
import AppsContainer from "@crema/components/AppsContainer";
import { useIntl } from "react-intl";
import AppsHeader from "@crema/components/AppsContainer/AppsHeader";
import AppsContent from "@crema/components/AppsContainer/AppsContent";
import AppInfoView from "@crema/components/AppInfoView";
import { Button, Flex, Input, Modal, Space } from "antd";
import AppPageMeta from "@crema/components/AppPageMeta";
import {
  StyledCustomerFooterPagination,
  StyledCustomerHeader,
  StyledCustomerHeaderPagination,
  StyledCustomerHeaderRight,
  StyledCustomerInputView,
} from "./index.styled";
import { useGetDataApi } from "@crema/hooks/APIHooks";
import CustomerTable from "./CustomerTable";
import EditCustomer from "./EditCustomer";

import type { CustomersDataType } from "@crema/types/models/ecommerce/EcommerceApp";
import { PlusOutlined } from "@ant-design/icons";
import UpdateModal from "./CustomerTable/Updatemodal";

// import { start } from 'repl';

type OrderProps = {
  items: CustomersDataType[];
  total: number;
  limit: number;
};
const Customers = () => {
  const [page, setPage] = useState<number>(1);
  const [startData, setstartData] = useState<number>(0);
  const [search, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [openAddModal, setOpenAddModal] = useState<any>(false);

  const { messages } = useIntl();
  const [{ apiData, loading }, { setQueryParams, reCallAPI }] =
    useGetDataApi<OrderProps>("/movies", undefined, {}, false);
  // params for request
  useEffect(() => {
    setQueryParams({ start: startData, limit: 10 });
  }, [startData, page]);

  const onChange = (page: number) => {
    setPage(page);
    setstartData(page * apiData.limit - apiData.limit);
  };

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

  const handleShowAddModal = () => {
    if (openAddModal) {
      setOpenAddModal(false);
    } else {
      setOpenAddModal(true);
    }
  };
  console.log("hhhhhh", openAddModal);

  return (
    <>
      <AppPageMeta title="Customers" />

      <AppsContainer title={"Quản lý danh sách phim"} fullView type="bottom">
        <AppsHeader key={"wrap"}>
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
              <Button icon={<PlusOutlined />} onClick={handleShowAddModal}>
                Thêm mới
              </Button>
              {openAddModal && (
                <UpdateModal
                  open={openAddModal}
                  onCancel={handleShowAddModal}
                  setOpen={setOpenAddModal}
                  reCallAPI={reCallAPI}
                />
              )}
            </Flex>

            <StyledCustomerHeaderRight>
              {/* ////////////  panigation */}

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
            key={"wrap1"}
            style={{
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <CustomerTable
              loading={loading}
              customers={apiData?.items}
              refresh={reCallAPI}
            />
          </AppsContent>
        )}

        <StyledCustomerFooterPagination
          key={"wrap2"}
          pageSize={apiData?.limit || 10}
          count={apiData?.total || 0}
          page={page}
          onChange={onChange}
        />
      </AppsContainer>

      <Modal
        title={messages["ecommerce.addCustomer"] as string}
        open={isModalVisible}
        onOk={handleOk}
        footer={false}
        onCancel={handleCancel}
      >
        <EditCustomer />
      </Modal>

      <AppInfoView />
    </>
  );
};

export default Customers;
