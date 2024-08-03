import { StarFilled } from "@ant-design/icons";
import OrderActions from "./OrderActions";
import { StyledCustomerTable } from "../index.styled";
import type { CustomersDataType } from "@crema/types/models/ecommerce/EcommerceApp";
import type { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import {
  FirmShowDateMapping,
  PopularStatusMpaping,
} from "@constants/userRequests";
import { css } from "styled-components";

type Props = {
  customers: CustomersDataType[];
  loading: boolean;
  refresh: () => void;
};

const CustomerTable = ({ customers, loading, refresh }: Props) => {
  const columns: ColumnsType<CustomersDataType> = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Tên phim",
      dataIndex: "namefirm",
      key: "namefirm",
    },
    // {
    //   title: "Mô tả",
    //   dataIndex: "description",
    //   key: "description",
    //   // render: (user) => user.email,
    // },
    {
      title: "Thời gian chiếu",
      dataIndex: "Showtimes",
      key: "Showtimes",
      render: (Showtimes: number) => FirmShowDateMapping[Showtimes] || "N/A",
    },
    {
      title: "Phổ biến",
      dataIndex: "populalStatus",
      key: "populalStatus",
      render: (populalStatus: number) => PopularStatusMpaping[populalStatus],
    },
    // {
    //   title: "Đã thanh toán",
    //   dataIndex: "paidAt",
    //   key: "paidAt",
    // },
    // {
    //   title: "Ngân hàng",
    //   dataIndex: "paymentInfo",
    //   key: "rating",
    //   render: (paymentInfo) => <span>{paymentInfo?.bank?.shortName}</span>,
    // },
    // {
    //   title: "Tên chủ tài khoản",
    //   dataIndex: "paymentInfo",
    //   key: "balance",
    //   render: (paymentInfo) => <span>{paymentInfo?.bankHolderName}</span>,
    // },
    {
      title: "Thể loại",
      dataIndex: "categorys",
      key: "categorys",
      render: (categorys) => {
        return (
          <div>
            {categorys.map((item: any, index: any) => {
              return (
                <p style={{ margin: "0" }} key={index}>
                  {item.categoryName}
                </p>
              );
            })}
          </div>
        );
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "joinDate",
      render: (createdAt) => {
        const date = dayjs(createdAt).format("DD/MM/YYYY mm:ss");
        return <span>{date}</span>;
      },
    },
    // {
    //   title: "Trạng thái",
    //   dataIndex: "status",
    //   key: "joinDate",
    //   render: (status) => {
    //     return <>{UserRequestStatusMapping[status]}</>;
    //   },
    // },
    {
      title: "Actions",
      // dataIndex: '_id',
      key: "actions",
      className: "customer-table-actions",
      fixed: "right",
      render: (row) => <OrderActions row={row} refresh={refresh} />,
    },
  ];
  return (
    <StyledCustomerTable
      hoverColor
      data={customers}
      columns={columns}
      loading={loading}
      scroll={{ x: "auto" }}
    />
  );
};

export default CustomerTable;
