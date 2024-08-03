import { useEffect, useState } from "react";
import AppsContainer from "@crema/components/AppsContainer";
import { useIntl } from "react-intl";
import AppsHeader from "@crema/components/AppsContainer/AppsHeader";
import AppsContent from "@crema/components/AppsContainer/AppsContent";
import AppInfoView from "@crema/components/AppInfoView";
import { Button, Flex, Input, Modal, Select, Space } from "antd";
import AppPageMeta from "@crema/components/AppPageMeta";
import {
  StyledCustomerFooterPagination,
  StyledCustomerHeader,
  StyledCustomerHeaderPagination,
  StyledCustomerHeaderRight,
  StyledCustomerInputView,
} from "./index.styled";
import { getDataApi, useGetDataApi } from "@crema/hooks/APIHooks";
import CustomerTable from "./CustomerTable";

import type { CustomersDataType } from "@crema/types/models/ecommerce/EcommerceApp";
import { PlusOutlined } from "@ant-design/icons";
import { values } from "lodash";
import { useInfoViewActionsContext } from "@crema/context/AppContextProvider/InfoViewContextProvider";
import AddEpisodeModal from "./addfirmmodal";
import { backgroundDark } from "@crema/constants/defaultConfig";

type OrderProps = {
  customers: CustomersDataType[];
  customerCount: number;
  data?: any;
};
const Customers = () => {
  const { messages } = useIntl();
  const [currentRow, setCurrentRow] = useState<any>(null);
  const [{ apiData: apiDataMovie }, { setQueryParams, reCallAPI }] =
    useGetDataApi<any>("/movies", undefined, {}, false);

  const [page, setPage] = useState<number>(1);
  const [search, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [startData, setstartData] = useState<number>(0);
  const [episodeOfMovie, setepisodeOfMovie] = useState<any>();
  const [movieID, setmovieID] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showAddEpisodeModal, setShowAddEpisodeModal] =
    useState<boolean>(false);
  const [reCallApiEpisode, setreCallApiEpisode] = useState<boolean>(false);

  const infoViewContext = useInfoViewActionsContext();

  const handleChange = async (value: string) => {
    try {
      setLoading(true);
      const dataEpisode = await getDataApi<OrderProps>(
        `episode/allEpisodeOfFirm/${value}?start=${startData}&limit=10`,
        infoViewContext,
        {}
      );

      setepisodeOfMovie(dataEpisode?.data);
      setmovieID(value);
      setLoading(false);
    } catch (er) {
      console.log(er);
    }
  };

  const onChange = (page: number) => {
    setPage(page);
  };
  const handleRecall = () => {
    console.log(324567897654321345678);

    if (reCallApiEpisode) {
      setreCallApiEpisode(false);
    } else {
      setreCallApiEpisode(true);
    }
  };

  useEffect(() => {
    movieID && handleChange(movieID);
  }, [startData, page, reCallApiEpisode]);

  useEffect(() => {
    setQueryParams({});
  }, []);

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

  const optionsMovies = (data: any) => {
    return (
      data &&
      data.map((item: any, index: any) => {
        return {
          key: item._id,
          label: item.namefirm,
          value: item._id,
          searchName: item.namefirm,
        };
      })
    );
  };

  const handleShowAddmodal = () => {
    if (showAddEpisodeModal) {
      setShowAddEpisodeModal(false);
    } else {
      setShowAddEpisodeModal(true);
    }
  };

  return (
    <>
      <AppPageMeta title="Tập phim" />
      <AppsContainer title={"Tập phim"} fullView type="bottom">
        <AppsHeader key={"wrap"}>
          <StyledCustomerHeader>
            <Flex gap={10}>
              {/* <StyledCustomerInputView>
                <Input
                  id="user-name"
                  placeholder="Search"
                  type="search"
                  onChange={onSearchOrder}
                />
              </StyledCustomerInputView> */}
              <Space size={10} direction="horizontal" />

              <Select
                style={{ width: "200px" }}
                placeholder="Chọn phim"
                options={optionsMovies(apiDataMovie?.items)}
                optionFilterProp="searchName"
                onChange={handleChange}
              />
              <Space size={10} direction="horizontal" />
              <Button
                icon={<PlusOutlined />}
                onClick={() => handleShowAddmodal()}
              >
                Thêm mới
              </Button>
            </Flex>

            <StyledCustomerHeaderRight>
              <StyledCustomerHeaderPagination
                pageSize={10}
                count={episodeOfMovie?.items.length || 0}
                page={page}
                onChange={onChange}
              />
            </StyledCustomerHeaderRight>
          </StyledCustomerHeader>
        </AppsHeader>

        {episodeOfMovie?.items ? (
          <AppsContent
            key={"wrap1"}
            style={{
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <CustomerTable
              loading={loading}
              customers={episodeOfMovie?.items}
              refresh={handleRecall}
              onEdit={(row) => setCurrentRow(row)}
            />
          </AppsContent>
        ) : (
          <AppsContent
            key={"wrap1"}
            style={{
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h3>Chọn một bộ phim</h3>
            </div>
          </AppsContent>
        )}

        <StyledCustomerFooterPagination
          key={"wrap2"}
          pageSize={10}
          count={episodeOfMovie?.items.length || 0}
          page={page}
          onChange={onChange}
        />
      </AppsContainer>

      {showAddEpisodeModal && (
        <AddEpisodeModal
          open={showAddEpisodeModal}
          setOpen={setShowAddEpisodeModal}
          onCancel={handleShowAddmodal}
          reCallAPI={handleRecall}
        />
      )}
      <AppInfoView />
    </>
  );
};

export default Customers;
