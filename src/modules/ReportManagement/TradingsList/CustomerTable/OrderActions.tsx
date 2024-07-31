import { Button, Dropdown } from 'antd';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';

const OrderActions = ({ row, refresh, onEdit }: any) => {
  const items = [
    {
      key: 1,
      label: 'Chỉnh sửa',
      icon: <EditOutlined />,
      onClick: onEdit,
    },
    {
      key: 2,
      label: 'Xóa',
      icon: <DeleteOutlined />,
    },
  ];

  return (
    <>
      {' '}
      <Dropdown menu={{ items }} trigger={['click']}>
        <Button shape="circle">
          <MoreOutlined />
        </Button>
      </Dropdown>
    </>
  );
};
export default OrderActions;
