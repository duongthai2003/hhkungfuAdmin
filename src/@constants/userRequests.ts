export enum UserRequestStatus {
  Pending = 1, // dang cho
  Assigned = 6, // dang xu ly
  UserPaid = 2, // da gui tien, cho xu ly
  Approved = 3, // da chap nhan
  Rejected = 4, // Khong chap nhan
  Canceled = 5, // Huy chap nhan
}

export enum UserRequestType {
  Deposit = 1, // nap tien
  Withdrawal = 2, // rut tien
}

export enum UserVerifyStatus {
  Pending = 1, // dang cho
  Approved = 2, // da chap nhan
  Rejected = 3, // Khong chap nhan
}

export const UserRequestTypeMapping = {
  [UserRequestType.Deposit]: 'Nạp tiền',
  [UserRequestType.Withdrawal]: 'Rút tiền',
};

export const UserRequestStatusMapping = {
  [UserRequestStatus.Pending]: 'Đang chờ',
  [UserRequestStatus.Assigned]: 'Đang xử lý',
  [UserRequestStatus.Approved]: 'Đã duyệt (Hoàn thành)',
  [UserRequestStatus.Rejected]: 'Từ chối',
  [UserRequestStatus.Canceled]: 'Đã huỷ',
};

export const UserVerifyStatusMapping = {
  [UserVerifyStatus.Pending]: 'Đang chờ',
  [UserVerifyStatus.Approved]: 'Đã duyệt (Hoàn thành)',
  [UserVerifyStatus.Rejected]: 'Từ chối',
};
