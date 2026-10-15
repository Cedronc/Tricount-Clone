export interface Tricount {
  id: string;
  name: string;
  emoji: string;
  currency: string;
  participants: { id: string; name: string; email: string }[];
  totalSpending: number;
  userBalance: number;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}