import { Button, Dropdown } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { DetailEpisodeModal } from "../detailModal";
import AddEpisodeModal from "../addfirmmodal";
const OrderActions = ({ row, refresh, onEdit }: any) => {
  const [open, setOpen] = useState<boolean>(false);

  const [showModaldetail, setShowModaldetail] = useState<boolean>(false);

  const showModal = () => {
    setOpen(true);
  };

  const items = [
    {
      key: 1,
      label: "Chi tiết",
      icon: <InfoCircleOutlined />,
      onClick: () => setShowModaldetail(true),
    },
    {
      key: 2,
      label: "Chỉnh sửa",
      icon: <EditOutlined />,
      onClick: showModal,
    },
  ];

  const handleCancelDetail = () => {
    setShowModaldetail(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      {" "}
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button shape="circle">
          <MoreOutlined />
        </Button>
      </Dropdown>
      {open && (
        <AddEpisodeModal
          open={open}
          onCancel={handleCancel}
          row={row}
          reCallAPI={refresh && refresh}
          setOpen={setOpen}
        />
      )}
      {showModaldetail && (
        <DetailEpisodeModal
          open={showModaldetail}
          onCancel={handleCancelDetail}
          row={row && row}
        />
      )}
    </>
  );
};
export default OrderActions;
