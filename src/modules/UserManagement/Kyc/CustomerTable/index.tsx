import { StarFilled } from '@ant-design/icons';
import OrderActions from './OrderActions';
import { StyledCustomerTable } from '../index.styled';
import type { CustomersDataType } from '@crema/types/models/ecommerce/EcommerceApp';
import type { ColumnsType } from 'antd/es/table';
import dayjs, { Dayjs } from 'dayjs';
import { UserVerifyStatusMapping } from '@constants/userRequests';

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
      title: 'Tên người gửi',
      dataIndex: 'user',
      key: 'userName',
      render: (user) => <span>{user.firstName + ' ' + user.lastName}</span>,
    },
    {
      title: 'Nickname',
      dataIndex: 'user',
      key: 'userNameUser',
      render: (user) => user.username,
    },
    {
      title: 'Email',
      dataIndex: 'user',
      key: 'email',
      render: (user) => user.email,
    },
    {
      title: 'Tên xác thực',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => {
        const date = dayjs(createdAt).format('DD/MM/YYYY HH:mm');
        return <span>{date}</span>;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'joinDate',
      render: (status) => {
        return <>{UserVerifyStatusMapping[status]}</>;
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
