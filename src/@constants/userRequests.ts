export enum UserRequestStatus {
  Pending = 1, // dang cho
  Assigned = 6, // dang xu ly
  UserPaid = 2, // da gui tien, cho xu ly
  Approved = 3, // da chap nhan
  Rejected = 4, // Khong chap nhan
  Canceled = 5, // Huy chap nhan
}

export enum UserVerifyStatus {
  Pending = 1, // dang cho
  Approved = 2, // da chap nhan
  Rejected = 3, // Khong chap nhan
}

export const FirmShowDateMapping = {
  2: "Thứ 2",
  3: "Thứ 3",
  4: "Thứ 4",
  5: "Thứ 5",
  6: "Thứ 6",
  7: "Thứ 7",
  8: "chủ nhật",
};

export const UserRequestStatusMapping = {
  [UserRequestStatus.Pending]: "Đang chờ",
  [UserRequestStatus.Assigned]: "Đang xử lý",
  [UserRequestStatus.Approved]: "Đã duyệt (Hoàn thành)",
  [UserRequestStatus.Rejected]: "Từ chối",
  [UserRequestStatus.Canceled]: "Đã huỷ",
};

export const UserVerifyStatusMapping = {
  [UserVerifyStatus.Pending]: "Đang chờ",
  [UserVerifyStatus.Approved]: "Đã duyệt (Hoàn thành)",
  [UserVerifyStatus.Rejected]: "Từ chối",
};

export const PopularStatusMpaping = {
  0: "không phổ biến",
  1: "Phổ biến",
};
