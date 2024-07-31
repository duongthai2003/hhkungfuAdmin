import { Button, Dropdown, Modal, Form } from 'antd';
import {
  CheckOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { postDataApi } from '@crema/hooks/APIHooks';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import React, { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { useConfirmationContext } from '@components/confirmation';
import { DetailModal } from './DetailModal';

const OrderActions = ({ row, refresh }) => {
  const InfoViewActions = useInfoViewActionsContext();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const cf = useConfirmationContext();
  const [showModaldetail, setShowModaldetail] = useState(false);
  const [form] = Form.useForm();
  const isAssigned = !!row.assignedAt;
  const isApproved = !!row.approvedAt;
  const isRejected = !!row.rejectedAt;

  const handleApprovalRequest = async (id: string) => {
    try {
      await cf.showConfirm({
        message: 'Bạn có chắc chắn muốn phê duyệt yêu cầu này?',
      });
      await postDataApi(`user-verify/${id}/approval`, InfoViewActions, {
        id: id,
      });
      refresh();
      InfoViewActions.showMessage('thanh cong');
    } catch (err) {
      console.log('eeee', err);
      throw err;
    }
  };

  const handleRequest = async (id: string, type: string) => {
    try {
      await cf.showConfirm({
        message: 'Bạn có chắc chắn muốn thực hiện hành động này?',
      });
      await postDataApi(`user-requests/${id}/${type}`, InfoViewActions, {});
      refresh();
      InfoViewActions.showMessage('thanh cong');
    } catch (err) {
      console.log('eeee', err);
      throw err;
    }
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    if (form.getFieldsValue().rejectReason !== undefined) {
      setConfirmLoading(true);
      await postDataApi(`user-verify/${row._id}/reject`, InfoViewActions, {
        rejectReason: form.getFieldsValue().rejectReason,
      });

      setConfirmLoading(false);
      setOpen(false);
      refresh();
    }
    console.log(form.getFieldsValue().rejectReason);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  const handleCancelDetail = () => {
    setShowModaldetail(false);
  };

  const items = [
    {
      key: 1,
      label: 'Chi tiết',
      icon: <InfoCircleOutlined />,
      onClick: () => setShowModaldetail(true),
    },
    // {
    //   key: 4,
    //   disabled: isAssigned,
    //   icon: <EyeOutlined />,
    //   onClick: () => handleRequest(row._id, 'mark-review'),
    //   label: 'Xem xét',
    // },
    {
      key: 2,
      disabled: isApproved || isRejected,
      icon: <CheckOutlined />,
      onClick: () => handleApprovalRequest(row._id),
      label: 'Phê duyệt',
    },
    {
      key: 3,
      disabled: isApproved || isRejected,
      icon: <CloseCircleOutlined />,
      onClick: showModal,
      label: 'Từ chối',
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={['click']}>
        <Button shape="circle">
          <MoreOutlined />
        </Button>
      </Dropdown>

      <Modal
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
                message: 'Vui lòng nhập lý do từ chối',
              },
            ]}
          >
            <TextArea
              placeholder="Lý do từ chối"
              allowClear
              style={{
                outline: 'none',
                resize: 'none',
              }}
            />
          </Form.Item>
        </Form>
      </Modal>

      <DetailModal
        open={showModaldetail}
        onCancel={handleCancelDetail}
        row={row}
      />
    </>
  );
};
export default OrderActions;
