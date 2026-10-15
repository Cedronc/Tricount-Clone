export interface Expense {
  id: string;
  tricountId: string;
  description: string;
  amount: number;
  payer: { id: string; name: string; email: string };
  participants: { id: string; name: string; email: string }[];
  date: string;
  createdAt: string;
  updatedAt: string;
}