import { StarFilled } from '@ant-design/icons';
import OrderActions from './OrderActions';
import { StyledCustomerTable } from '../index.styled';
import type { CustomersDataType } from '@crema/types/models/ecommerce/EcommerceApp';
import type { ColumnsType } from 'antd/es/table';
import dayjs, { Dayjs } from 'dayjs';
import {
  UserRequestTypeMapping,
  UserRequestStatusMapping,
} from '@constants/userRequests';

type Props = {
  customers: CustomersDataType[];
  loading: boolean;
  refresh: () => void;
};

const CustomerTable = ({ customers, loading, refresh }: Props) => {
  const columns: ColumnsType<CustomersDataType> = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Tên',
      dataIndex: 'user',
      key: 'name',
      render: (user) => user.displayName,
    },
    {
      title: 'Email',
      dataIndex: 'user',
      key: 'email',
      render: (user) => user.email,
    },
    {
      title: 'Nạp/Rút',
      dataIndex: 'type',
      key: 'type',
      render: (type: number) => UserRequestTypeMapping[type] || 'N/A',
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Đã thanh toán',
      dataIndex: 'paidAt',
      key: 'paidAt',
    },
    {
      title: 'Ngân hàng',
      dataIndex: 'paymentInfo',
      key: 'rating',
      render: (paymentInfo) => <span>{paymentInfo?.bank?.shortName}</span>,
    },
    {
      title: 'Tên chủ tài khoản',
      dataIndex: 'paymentInfo',
      key: 'balance',
      render: (paymentInfo) => <span>{paymentInfo?.bankHolderName}</span>,
    },
    {
      title: 'số tài khoản',
      dataIndex: 'paymentInfo',
      key: 'address',
      render: (paymentInfo) => <span>{paymentInfo?.bankAccountNumber}</span>,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'joinDate',
      render: (createdAt) => {
        const date = dayjs(createdAt).format('DD/MM/YYYY mm:ss');

        return <span>{date}</span>;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'joinDate',
      render: (status) => {
        return <>{UserRequestStatusMapping[status]}</>;
      },
    },
    {
      title: 'Actions',
      // dataIndex: '_id',
      key: 'actions',
      className: 'customer-table-actions',
      fixed: 'right',
      render: (row) => <OrderActions row={row} refresh={refresh} />,
    },
  ];
  return (
    <StyledCustomerTable
      hoverColor
      data={customers}
      columns={columns}
      loading={loading}
      scroll={{ x: 'auto' }}
    />
  );
};

export default CustomerTable;
