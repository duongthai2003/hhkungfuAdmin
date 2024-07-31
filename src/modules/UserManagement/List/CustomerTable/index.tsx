import { StarFilled } from '@ant-design/icons';
import OrderActions from './OrderActions';
import { StyledCustomerTable } from '../index.styled';
import type { CustomersDataType } from '@crema/types/models/ecommerce/EcommerceApp';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

type Props = {
  customers: CustomersDataType[];
  loading: boolean;
  onEdit: Function;
  refresh: Function;
  onChangePass: Function;
};
const CustomerTable = ({
  customers,
  loading,
  onEdit,
  refresh,
  onChangePass,
}: Props) => {
  const columns: ColumnsType<CustomersDataType> = [
    {
      title: 'Id',
      dataIndex: '_id',
      key: 'Id',
    },
    {
      title: 'Tên',
      dataIndex: 'firstName',
      key: 'name',
      render: (col: any, row: any) => {
        return <span>{`${row.firstName} ${row.lastName}`}</span>;
      },
    },
    {
      title: 'username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Ngày tạo',
      dataIndex: '',
      key: 'createAt',
      render: (col: any, row: any) => {
        return <span>{dayjs(row.createdAt).format('DD-MM-YYYY')}</span>;
      },
    },

    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      className: 'customer-table-actions',
      fixed: 'right',
      render: (col: any, row: any) => (
        <OrderActions
          data={row}
          onEdit={() => {
            onEdit && onEdit(row);
          }}
          onChangePass={() => {
            onChangePass && onChangePass(row);
          }}
          refresh={refresh}
        />
      ),
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
