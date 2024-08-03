import { StarFilled } from "@ant-design/icons";
import OrderActions from "./OrderActions";
import { StyledCustomerTable } from "../index.styled";
import type { CustomersDataType } from "@crema/types/models/ecommerce/EcommerceApp";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

type Props = {
  customers: CustomersDataType[];
  loading: boolean;
  refresh: () => void;
  onEdit?: (row?: any) => any;
};
const CustomerTable = ({ customers, loading, refresh, onEdit }: Props) => {
  const columns: ColumnsType<CustomersDataType> = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Tên tập phim",
      dataIndex: "nameEpisodes",
      key: "nameEpisodes",
    },

    {
      title: "Tập",
      dataIndex: "episodesNum",
      key: "episodesNum",
    },
    {
      title: "Thời gian tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createAt) => <span>{dayjs(createAt).format("DD-MM-YYYY")}</span>,
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      className: "customer-table-actions",
      fixed: "right",
      render: (row) => (
        <OrderActions
          row={row}
          refresh={refresh && refresh}
          onEdit={() => onEdit && onEdit(row)}
        />
      ),
    },
  ];
  return (
    <>
      <StyledCustomerTable
        hoverColor
        data={customers}
        columns={columns}
        loading={loading}
        scroll={{ x: "auto" }}
      />
    </>
  );
};

export default CustomerTable;
