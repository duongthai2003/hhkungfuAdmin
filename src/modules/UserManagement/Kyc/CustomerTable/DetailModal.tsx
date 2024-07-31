import { Col, Modal, ModalProps, Row } from 'antd';
import {
  UserRequestStatusMapping,
  UserVerifyStatusMapping,
} from '@constants/userRequests';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useGetDataApi } from '@crema/hooks/APIHooks';
import styled from 'styled-components';
import { ViewImage } from './ViewImage';

const CustomDiv = styled.div`
  .Card {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 9px;

    p {
      font-size: 13px;
      margin-bottom: 9px;
    }
  }
  .image {
    border: 1.5px dashed #b2aeae;
    padding: 5px;
    width: 450px;
    height: 215px;
    border-radius: 2px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .viewImg {
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    background: rgba(0, 0, 0);
    z-index: 9999;
    padding: 20px;
    img {
      // margin: auto;
    }
  }

  @media (max-width: 739px) {
    .image {
      width: 380px;
    }
  }
`;

export type DetailModalProps = ModalProps & {
  row?: any;
};

export const DetailModal = ({ open, row, onCancel }: DetailModalProps) => {
  const [isViewImg, setIsViewImg] = useState<boolean>(false);
  const [pathImg, setPathImg] = useState<string>('');
  const handleViewImg = (src: string) => {
    setPathImg(src);
    setIsViewImg(true);
  };
  const handleCloseViewImg = () => {
    setPathImg('');
    setIsViewImg(false);
  };
  return (
    <Modal
      title=" Chi tiết"
      open={open}
      cancelText="Đóng"
      onCancel={onCancel}
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          {/* <OkBtn /> */}
        </>
      )}
    >
      <div className="row">
        <div className="col-lg-12 infor_amount">
          <p>
            Tên người dùng :
            <strong> {row.user.firstName + ' ' + row.user.lastName} </strong>{' '}
          </p>{' '}
          <p>
            Email :<strong> {row.user.email} </strong>{' '}
          </p>
          <p>
            Tên xác thực :<strong> {row.userName} </strong>{' '}
          </p>
          <p>
            Địa chỉ :<strong> {row?.address}</strong>
          </p>
          <p>
            {' '}
            Số điện thoại : <strong>{row.phoneNumber}</strong>
          </p>
          <p>
            Ngày tạo :{' '}
            <strong>{dayjs(row.createdAt).format('DD/MM/YYYY HH:MM')}</strong>
          </p>
          <p>
            Trạng thái : <strong>{UserVerifyStatusMapping[row.status]}</strong>
          </p>
          {row.rejectedReason && (
            <p>
              Lý do từ chối : <strong>{row.rejectedReason}</strong>
            </p>
          )}
          <CustomDiv>
            Hình ảnh căn cước công dân:
            <div className="IdCard">
              <Row>
                <Col span={24}>
                  <div className="Card">
                    <div
                      className="image"
                      onClick={() => handleViewImg(row.frontOfIdCard)}
                    >
                      {' '}
                      <img src={row.frontOfIdCard} />
                    </div>
                    <p>Mặt trước</p>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <div className="Card">
                    <div
                      className="image"
                      onClick={() => handleViewImg(row.backSideIdCard)}
                    >
                      {' '}
                      <img src={row.backSideIdCard} />
                    </div>
                    <p>Mặt sau</p>
                  </div>
                </Col>
              </Row>
              {isViewImg ? (
                <div className="viewImg" onClick={handleCloseViewImg}>
                  <img
                    src={pathImg}
                    onClick={(even) => even.stopPropagation()}
                  ></img>
                </div>
              ) : (
                ''
              )}
            </div>
          </CustomDiv>
        </div>
      </div>
    </Modal>
  );
};
