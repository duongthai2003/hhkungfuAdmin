import { StarFilled } from '@ant-design/icons';
import OrderActions from './OrderActions';
import { StyledCustomerTable } from '../index.styled';
import type { CustomersDataType } from '@crema/types/models/ecommerce/EcommerceApp';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { BsArrowDownShort, BsArrowUpShort } from 'react-icons/bs';
import { FaDongSign } from 'react-icons/fa6';
import { GiDodge } from 'react-icons/gi';
import { FormattedNumber, FormattedNumberParts } from 'react-intl';

type Props = {
  customers: CustomersDataType[];
  loading: boolean;
  refresh: () => void;
  onEdit?: (e: any) => any;
};
export const CurrencyIcons: any = {
  VND: <FaDongSign style={{ color: '#F7931A', fontSize: '14px' }} />,
  USDT: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="20"
      height="20"
      viewBox="0 0 48 48"
    >
      <circle cx="24" cy="24" r="20" fill="#26a69a"></circle>
      <rect width="18" height="5" x="15" y="13" fill="#fff"></rect>
      <path
        fill="#fff"
        d="M24,21c-4.457,0-12,0.737-12,3.5S19.543,28,24,28s12-0.737,12-3.5S28.457,21,24,21z M24,26 c-5.523,0-10-0.895-10-2c0-1.105,4.477-2,10-2s10,0.895,10,2C34,25.105,29.523,26,24,26z"
      ></path>
      <path
        fill="#fff"
        d="M24,24c1.095,0,2.093-0.037,3-0.098V13h-6v10.902C21.907,23.963,22.905,24,24,24z"
      ></path>
      <path
        fill="#fff"
        d="M25.723,25.968c-0.111,0.004-0.223,0.007-0.336,0.01C24.932,25.991,24.472,26,24,26 s-0.932-0.009-1.387-0.021c-0.113-0.003-0.225-0.006-0.336-0.01c-0.435-0.015-0.863-0.034-1.277-0.06V36h6V25.908 C26.586,25.934,26.158,25.953,25.723,25.968z"
      ></path>
    </svg>
  ),
};
const CustomerTable = ({ customers, loading, refresh, onEdit }: Props) => {
  const TypeTransaction = ({ type }: any) => {
    const iconType: any = {
      1: <BsArrowDownShort style={{ fontSize: '22px', color: 'red' }} />,
      2: <BsArrowUpShort style={{ fontSize: '22px', color: '#36b37e' }} />,
      3: <BsArrowUpShort style={{ fontSize: '22px', color: '#36b37e' }} />,
      4: <BsArrowDownShort style={{ fontSize: '22px', color: 'red' }} />,
    };

    const UserRequestTypeTransionMapping = {
      1: 'Mua',
      2: 'Bán',
      3: 'Nạp tiền',
      4: 'Rút tiền',
    };
    return (
      <span style={{ display: 'flex', gap: '5px' }}>
        {iconType[type]}

        {UserRequestTypeTransionMapping[type]}
      </span>
    );
  };

  const columns: ColumnsType<CustomersDataType> = [
    {
      title: 'ID ',
      dataIndex: '_id',
      key: 'id ',
      // render: () => {},
    },
    {
      title: 'ID người dùng',
      dataIndex: '',
      key: 'userId',
      render: (row) => (
        <div
          onClick={() => {
            onEdit(row);
          }}
          style={{ cursor: 'pointer' }}
        >
          {row?.userId}
        </div>
      ),
    },
    {
      title: 'Ngày ',
      dataIndex: 'time',
      key: 'time ',
      render: (time) => {
        return <>{dayjs.unix(time).format('DD/MM/YYYY')}</>;
      },
    },
    {
      title: 'Kiểu ',
      dataIndex: 'type',
      key: 'type ',
      render: (type) => {
        return (
          <>
            <TypeTransaction type={type} />
          </>
        );
      },
    },
    {
      title: 'Ví ',
      dataIndex: 'wallet',
      key: ' wallet',
      render: (wallet) => {
        return (
          <div style={{ display: 'flex' }}>
            {CurrencyIcons[wallet?.currency]}
            <span style={{ marginLeft: '5px' }}>
              {wallet?.type === 1 ? 'Ví chính' : 'Demo'}
            </span>
          </div>
        );
      },
    },
    {
      title: 'Số lượng ',
      dataIndex: 'amount',
      key: 'amount  ',
      render: (amount) => {
        return (
          <>
            <span style={{ color: amount > 0 ? '#36b37e' : 'red' }}>
              {`${amount > 0 ? '+' : ''}`}
              {<FormattedNumber value={amount} />}
            </span>
          </>
        );
      },
    },
    {
      title: 'balance ',
      dataIndex: 'balance',
      key: 'balance ',
      render: (balance) => {
        return (
          <>
            {' '}
            <strong>
              <FormattedNumber value={balance} />
            </strong>{' '}
          </>
        );
      },
    },

    // {
    //   title: 'Actions',
    //   dataIndex: '',
    //   key: 'actions',
    //   className: 'customer-table-actions',
    //   fixed: 'right',
    //   render: ( => <OrderActions
    //     {
    //     refresh={refresh}
    //     onEdit={() => onEdit && onEdit(}
    //   />,
    // },
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
