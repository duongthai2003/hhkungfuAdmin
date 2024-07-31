export enum TradingStatus {
  Open = 1,
  Closed = 2,
}

export enum TradingType {
  RiseFall = 1,
}

export enum TradingSubType {
  Rise = 1,
  Fall = 2,
}

export const TradingStatusMapping = {
  [TradingStatus.Open]: 'Đang mở',
  [TradingStatus.Closed]: 'Đã đóng',
};
