import { Modal, ModalProps } from 'antd';
import { UserRequestStatusMapping } from '@constants/userRequests';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useGetDataApi } from '@crema/hooks/APIHooks';

export type DetailModalProps = ModalProps & {
  row?: any;
};

export const DetailModal = ({ open, row, onCancel }: DetailModalProps) => {
  const [{ apiData, loading }, { setQueryParams, reCallAPI }] = useGetDataApi(
    `/user-requests/${row._id}/get-qr-code`,
    undefined,
    {},
    false,
  );

  const loadMoreDetail = async () => {
    reCallAPI();
  };

  useEffect(() => {
    if (row._id && open) {
      loadMoreDetail();
    }
  }, [row, open]);

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
            Người gửi :<strong> {row.user?.displayName} </strong>{' '}
          </p>
          <p>
            Số lượng :
            <strong>
              {' '}
              {row?.amount} {row.currency}
            </strong>{' '}
          </p>
          <p>
            Tài khoản hưởng thụ :
            <strong> {row.paymentInfo?.bankHolderName} </strong>{' '}
          </p>
          <p>
            {' '}
            Số tài khoản hưởng thụ :{' '}
            <strong>{row.paymentInfo?.bankAccountNumber}</strong>
          </p>
          <p>
            Nội dung : <strong>{row?.code}</strong>
          </p>
          <p>
            Trạng thái : <strong>{UserRequestStatusMapping[row.status]}</strong>
          </p>
          <p>
            Ngày tạo :{' '}
            <strong>{dayjs(row.createdAt).format('DD/MM/YYYY HH:MM')}</strong>
          </p>

          <p>
            QR CODE:
            {apiData?.qrCode ? (
              <div>
                <img src={apiData.qrCode} />
              </div>
            ) : null}
          </p>
        </div>
      </div>
    </Modal>
  );
};
