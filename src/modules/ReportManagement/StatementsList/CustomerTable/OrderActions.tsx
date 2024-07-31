import { Button, Dropdown } from 'antd';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { useConfirmationContext } from '@components/confirmation';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { deleteDataApi } from '@crema/hooks/APIHooks';

const OrderActions = ({ row, refresh, onEdit }: any) => {
  const confirm = useConfirmationContext();
  const InfoViewActions = useInfoViewActionsContext();

  const handleDeletePaymentGateway = async (id: string) => {
    // try {
      await confirm.showConfirm({
        message: 'Bạn có chắc chắn muốn xóa tài khoản này?',
      });
      // delete
      await deleteDataApi(`payment-gateways/${id}`, InfoViewActions);
      refresh();
      InfoViewActions.showMessage('thanh cong');
    // } catch (err) {
    //   throw err;
    // }
  };

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
      onClick: () => handleDeletePaymentGateway(row._id),
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
