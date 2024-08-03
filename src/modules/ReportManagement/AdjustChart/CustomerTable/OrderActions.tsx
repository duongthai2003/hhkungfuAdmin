import { Button, Dropdown, Modal, Form } from "antd";
import {
  CloseCircleOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { postDataApi } from "@crema/hooks/APIHooks";
import { useInfoViewActionsContext } from "@crema/context/AppContextProvider/InfoViewContextProvider";
import React, { useState } from "react";

import { useConfirmationContext } from "@components/confirmation";
import { DetailModal } from "./DetailModal";
import UpdateModal from "./Updatemodal";
import { deleteDataApi } from "../../../../@crema/hooks/APIHooks";

const OrderActions = ({ row, refresh }) => {
  const InfoViewActions = useInfoViewActionsContext();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const cf = useConfirmationContext();
  const [showModaldetail, setShowModaldetail] = useState(false);
  const [form] = Form.useForm();

  const handleRequest = async (id: string) => {
    console.log(id);

    try {
      await cf.showConfirm({
        message: "Bạn có chắc chắn muốn thực hiện hành động này?",
      });
      await deleteDataApi(`/movies/${id}`, InfoViewActions, {});
      refresh();
      InfoViewActions.showMessage("thanh cong");
    } catch (err) {
      console.log("eeee", err);
      throw err;
    }
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      // const valid = await form.validateFields();
      // console.log(form.getFieldsValue().rejectReason);
      await postDataApi(`user-requests/${row._id}/reject`, InfoViewActions, {
        rejectReason: form.getFieldsValue().rejectReason,
      });

      setConfirmLoading(false);
      setOpen(false);
      refresh();
    } catch (err) {
      setConfirmLoading(false);

      await cf.showConfirm({
        message: "Request đã không còn tồn tại",
      });
      setOpen(false);
      refresh();
      throw err;
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const handleCancelDetail = () => {
    setShowModaldetail(false);
  };

  const items = [
    {
      key: 1,
      label: "Chi tiết",
      icon: <InfoCircleOutlined />,
      onClick: () => setShowModaldetail(true),
    },

    {
      key: 3,

      icon: <EyeOutlined />,
      onClick: showModal,
      label: "Thay đổi",
    },
    {
      key: 4,

      icon: <CloseCircleOutlined />,
      onClick: () => handleRequest(row && row._id),
      label: "Xóa ",
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button shape="circle">
          <MoreOutlined />
        </Button>
      </Dropdown>

      {/* <Modal
        title="Lý do"
        open={open}
        onOk={handleOk}
        okText="Xác nhận"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        <Form
          form={form}
          name="basic"
          autoComplete="off"
          // initialValues={{
          //   rejectReason: 'fddg',
          // }}
        >
          <Form.Item
            name="rejectReason"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập lý do từ chối",
              },
            ]}
          >
            <TextArea
              placeholder="Lý do từ chối"
              allowClear
              style={{
                outline: "none",
                resize: "none",
              }}
            />
          </Form.Item>
        </Form>
      </Modal> */}
      {open && (
        <UpdateModal
          open={open}
          onCancel={handleCancel}
          row={row}
          reCallAPI={refresh}
          setOpen={setOpen}
        />
      )}

      <DetailModal
        open={showModaldetail}
        onCancel={handleCancelDetail}
        row={row && row}
      />
    </>
  );
};
export default OrderActions;
