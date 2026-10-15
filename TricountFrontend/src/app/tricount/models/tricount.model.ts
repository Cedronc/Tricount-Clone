import { UserResource } from "ngx-clerk";

export interface Participant {
  id: string;
  name: string;
  email: string;
}

export interface Tricount {
  id: string;
  name: string;
  emoji: string;
  currency: string;
  userIds: string[];
  participants: Participant[];
  totalSpending: number;
  userBalance: number;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}
