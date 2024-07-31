import { StarFilled } from '@ant-design/icons';
import OrderActions from './OrderActions';
import { StyledCustomerTable } from '../index.styled';
import type { CustomersDataType } from '@crema/types/models/ecommerce/EcommerceApp';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { FormattedNumber } from 'react-intl';
import { BsArrowDownRightCircle, BsArrowUpRightCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';

type Props = {
  customers: CustomersDataType[];
  loading: boolean;
  refresh: () => void;
  onDetail?: (row?: any) => any;
};
const CustomStyle = styled.div`
  p {
    margin-bottom: 0 !important;
  }
`;
const CustomerTable = ({ customers, loading, refresh, onDetail }: Props) => {
  const TradingStatusMapping = {
    1: 'Đang mở',
    2: 'Đã đóng',
  };
  const typeTradeIcon = {
    1: <BsArrowUpRightCircle style={{ fontSize: '28px', color: 'green' }} />,
    2: <BsArrowDownRightCircle style={{ fontSize: '28px', color: 'red' }} />,
  };
  const columns: ColumnsType<CustomersDataType> = [
    {
      title: 'Kiểu',
      dataIndex: 'subtype',
      key: 'subtype',
      render: (subtype) => <span>{typeTradeIcon[subtype]}</span>,
    },
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'ID người dùng',
      dataIndex: '',
      key: 'userId',
      render: (row) => {
        return (
          // <Link to={`/user-management?userId=${row?.userId}`}>
          <div
            onClick={() => {
              onDetail(row);
            }}
            style={{ cursor: 'pointer' }}
          >
            {row?.userId}
          </div>
          // </Link>
        );
      },
    },
    {
      title: 'Bắt đầu',
      dataIndex: 'start',
      key: 'start',
      render: (start: any) => {
        return (
          <CustomStyle>
            <p>{dayjs.unix(start).format('DD-MM-YYYY')}</p>
            <p>{dayjs.unix(start).format('hh:mm:ss')}</p>
          </CustomStyle>
        );
      },
    },

    {
      title: 'Trạng thái',
      dataIndex: '',
      key: 'status',
      render: (row) => (
        <td>
          {row.end ? (
            <CustomStyle>
              <p>{dayjs.unix(row.end).format('DD-MM-YYYY')}</p>
              <p>{dayjs.unix(row.end).format('hh:mm:ss')}</p>
            </CustomStyle>
          ) : (
            <span
              style={{
                color: 'green',
                fontWeight: '600',
              }}
            >
              {TradingStatusMapping[row.status]}
            </span>
          )}
        </td>
      ),
    },

    {
      title: 'Tiền đặt',
      dataIndex: 'stake',
      key: 'stake',
      render: (stake: any) => {
        return <span>{<FormattedNumber value={stake} />}</span>;
      },
    },
    {
      title: 'Giá vào',
      dataIndex: 'entry',
      key: 'entry',
      render: (entry: any) => {
        return <span>{<FormattedNumber value={entry} />}</span>;
      },
    },
    {
      title: 'Giá ra',
      dataIndex: 'exit',
      key: 'exit',
      render: (exit: any) => {
        return <span>{<FormattedNumber value={exit} />}</span>;
      },
    },
    {
      title: 'Lợi nhuận',
      dataIndex: 'pnl',
      key: 'pnl',
      render: (pnl: any) => {
        return (
          <span style={{ color: `${pnl > 0 ? 'green' : 'red'} ` }}>
            <FormattedNumber value={pnl} />
          </span>
        );
      },
    },
    // {
    //   title: 'Actions',
    //   dataIndex: '',
    //   key: 'actions',
    //   className: 'customer-table-actions',
    //   fixed: 'right',
    //   render: (row) => (
    //     <OrderActions
    //       row={row}
    //       refresh={refresh}
    //       onEdit={() => onDetail && onDetail(row)}
    //     />
    //   ),
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
