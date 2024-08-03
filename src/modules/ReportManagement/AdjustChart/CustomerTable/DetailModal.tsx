import { Col, Modal, ModalProps, Row } from "antd";
import { FirmShowDateMapping } from "@constants/userRequests";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useGetDataApi } from "@crema/hooks/APIHooks";

export type DetailModalProps = ModalProps & {
  row?: any;
};

export const DetailModal = ({ open, row, onCancel }: DetailModalProps) => {
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
          <span>Tên phim : </span>
          <strong>{row.namefirm}</strong>
          <br />
          <span>Thời gian chiếu : </span>
          <strong>{FirmShowDateMapping[row.Showtimes]}</strong>
          <p>
            Ngày tạo :{" "}
            <strong>{dayjs(row.createdAt).format("DD/MM/YYYY HH:MM")}</strong>
          </p>
          <p>
            Tập mới nhất : <strong>{row.LatestEpisode}</strong>
          </p>
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={8} className="gutter-row">
          <h3>Ảnh bìa</h3>
          <img
            src={`${import.meta.env.VITE_BASE_API_URI}/movies/poster/${row.poster}`}
          />
        </Col>
        <Col span={16} className="gutter-row">
          <h3>Mô tả</h3>
          <p
            style={{ height: "400px", overflowY: "scroll" }}
            dangerouslySetInnerHTML={{
              __html: row.description.replace(/\n/g, "<br/>"),
            }}
          ></p>
        </Col>
      </Row>
    </Modal>
  );
};
