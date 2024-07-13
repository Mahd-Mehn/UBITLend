export const transactions = [
  {
    id: 1,
    amount: "1000 USC",
    type: "Lending",
    address: "0x1A2b3c4D5e6F7g8H9i0J1k2L3m4N5o6P7Q8r9S0t",
    duration: 10,
    expiring_date: "20th august, 2024",
    has_expired: false,
    collateral: 70,
    interest: 15,
    status: "Pending",
  },
];

export type Transactions = (typeof transactions)[number];
