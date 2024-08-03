import { Col, Modal, ModalProps, Row } from "antd";
import React from "react";
// import { FirmShowDateMapping } from "@constants/userRequests";
import dayjs from "dayjs";
import { useEffect } from "react";
// import { useGetDataApi } from "@crema/hooks/APIHooks";

export type DetailModalProps = ModalProps & {
  row?: any;
};

export const DetailEpisodeModal = ({
  open,
  row,
  onCancel,
}: DetailModalProps) => {
  console.log("jjjjjjjjjjj", row);

  return (
    <Modal
      title=" Chi tiết"
      open={open}
      cancelText="Đóng"
      onCancel={onCancel}
      width={1000}
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          {/* <OkBtn /> */}
        </>
      )}
    >
      <Row>
        <Col span={17}>
          <span>Tên : </span>
          <strong>{row.nameEpisodes}</strong>
          <br />

          <p>
            Ngày tạo :{" "}
            <strong>{dayjs(row.createdAt).format("DD/MM/YYYY ")}</strong>
          </p>
        </Col>
      </Row>
      <Row>
        <Col span={24} className="gutter-row">
          <h3>Video</h3>
          <div style={{ textAlign: "center" }}>
            <video
              controls
              src={`${import.meta.env.VITE_BASE_API_URI}/episode/episodeFirm/${row.nameFile}`}
            />
          </div>
        </Col>
      </Row>
    </Modal>
  );
};
