import { StarFilled } from '@ant-design/icons';
import OrderActions from './OrderActions';
import { StyledCustomerTable } from '../index.styled';
import type { CustomersDataType } from '@crema/types/models/ecommerce/EcommerceApp';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

type Props = {
  customers: CustomersDataType[];
  loading: boolean;
  refresh: () => void;
  onEdit?: (row?: any) => any;
};
const CustomerTable = ({ customers, loading, refresh, onEdit }: Props) => {
  console.log('vvvv', customers[0]);
  const columns: ColumnsType<CustomersDataType> = [
    {
      title: 'Tên tài khoản',
      dataIndex: 'bankHolderName',
      key: 'bankHolderName',
    },
    {
      title: 'Số tài khoản',
      dataIndex: 'bankAccountNumber',
      key: 'bankAccountNumber',
    },
    {
      title: 'Tên ngân hàng',
      dataIndex: 'bank',
      key: 'bank',
      render: (bank) => <span>{`${bank.name} ( ${bank.shortName} )`}</span>,
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createAt) => <span>{dayjs(createAt).format('DD-MM-YYYY')}</span>,
    },
    {
      title: 'Actions',
      dataIndex: '',
      key: 'actions',
      className: 'customer-table-actions',
      fixed: 'right',
      render: (row) => <OrderActions
        row={row}
        refresh={refresh}
        onEdit={() => onEdit && onEdit(row)}
      />,
    },
  ];
  return (
    <>
      <StyledCustomerTable
        hoverColor
        data={customers}
        columns={columns}
        loading={loading}
        scroll={{ x: 'auto' }}
      />
    </>
  );
};

export default CustomerTable;
