export interface WalletHistoryModel {
  id: string;
  promoterId: string;
  amount: number;
  createDate: string;
  type: 'credit' | 'debit';
}
