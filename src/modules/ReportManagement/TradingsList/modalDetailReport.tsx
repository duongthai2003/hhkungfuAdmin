import { Modal, ModalProps } from 'antd';
import { UserRequestStatusMapping } from '@constants/userRequests';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useGetDataApi } from '@crema/hooks/APIHooks';
type modalDetailReportProps = ModalProps & {
  row?: any;
};

const ModalDetailReport = ({ open, row, onCancel }: modalDetailReportProps) => {
  const [startData, setstartData] = useState<any>(row?.userId);

  const [{ apiData, loading }, { setQueryParams, reCallAPI }] =
    useGetDataApi<any>(`users/${row?.userId}`, undefined, {}, false);

  useEffect(() => {
    if (row) {
      setQueryParams({});
      setstartData(row?.userId);
    }
  }, [row]);

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
            Id người dùng :<strong> {apiData?._id} </strong>{' '}
          </p>
          <p>
            Tên người dùng :<strong> {apiData?.username} </strong>{' '}
          </p>
          <p>
            Địa chỉ Email :<strong> {apiData?.email}</strong>{' '}
          </p>

          <p>
            Ngày tạo :{' '}
            <strong>
              {dayjs(apiData?.createdAt).format('DD/MM/YYYY HH:MM')}
            </strong>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDetailReport;
