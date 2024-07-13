export const proposal = [
  {
    id: 1,
    interest_rate: "85",
    minimum_collateral_percentage: "85%",
    address: "0x1A2b3c4D5e6F7g8H9i0J1k2L3m4N5o6P7Q8r9S0t",
  },
  {
    id: 2,
    interest_rate: "20",
    minimum_collateral_percentage: "75%",
    address: "0x1A2b3c4D5e6F7g8H9i0J1k2L3m4N5o6P7Q8r9S0t",
  },
];
export const proposalRecieved = [
  {
    id: 1,
    interest_rate: 15,
    minimum_collateral_percentage: 85,
    address: "0x1A2b3c4D5e6F7g8H9i0J1k2L3m4N5o6P7Q8r9S0t",
  },
  {
    id: 2,
    interest_rate: 20,
    minimum_collateral_percentage: 70,
    address: "0x1A2b3c4D5e6F7g8H9i0J1k2L3m4N5o6P7Q8r9S0t",
  },
];

export type Proposal = (typeof proposal)[number];
export type ProposalRecieved = (typeof proposalRecieved)[number];
