// types/transaction.ts
export interface Transaction {
  id: string;
  amount: string;
  type: string;
  address: string;
  duration: string;
  expiringDate: string;
  hasExpired: boolean;
  collateral: string;
  interest: string;
  status: string;
}
