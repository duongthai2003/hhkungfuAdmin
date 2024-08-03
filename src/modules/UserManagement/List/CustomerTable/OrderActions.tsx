import { Button, Dropdown } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { useConfirmationContext } from "@components/confirmation";
import { useInfoViewActionsContext } from "@crema/context/AppContextProvider/InfoViewContextProvider";
import { deleteDataApi } from "@crema/hooks/APIHooks";

const OrderActions = ({ data, onEdit, refresh, onChangePass }: any) => {
  const confirm = useConfirmationContext();
  const InfoViewActions = useInfoViewActionsContext();

  const handleDeleteUser = async () => {
    await confirm.showConfirm({
      message: "Bạn có chắc chắn muốn xóa tài khoản này?",
    });
    await deleteDataApi(`/users/${data._id}`, InfoViewActions);
    refresh();
    InfoViewActions.showMessage("thanh cong");
  };

  const items = [
    // { key: 1, label: <span style={{ fontSize: 14 }}>View Order</span> },
    {
      key: 1,
      label: "Chỉnh sửa",
      icon: <EditOutlined />,
      onClick: onEdit,
    },
    {
      key: 2,
      label: "Thay đổi mật khẩu",
      icon: <EditOutlined />,
      onClick: onChangePass,
    },
    {
      key: 3,
      label: "Xóa",
      icon: <DeleteOutlined />,
      onClick: handleDeleteUser,
    },
  ];
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button shape="circle">
        <MoreOutlined />
      </Button>
    </Dropdown>
  );
};
export default OrderActions;
