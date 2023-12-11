export interface ExpensesByCategory {
  salaries: number;
  supplies: number;
  services: number;
}

export interface Month {
  id: string;
  month: string;
  revenue: number;
  expenses: number;
  nonOperationalExpenses: number;
  operationalExpenses: number;
}

export interface Day {
  id: string;
  date: string;
  revenue: number;
  expenses: number;
}

export interface rankingItem {
  fullName: string;
  university: string;
  wave: string;
  categoryRanking: {
    totalC1: number;
    totalC2: number;
    totalC3: number;
  }
  total: number;
}

export interface GetKpisResponse {
  id: string;
  _id: string;
  __v: number;
  totalProfit: number;
  totalRevenue: number;
  totalExpenses: number;
  expensesByCategory: ExpensesByCategory;
  monthlyData: Array<Month>;
  dailyData: Array<Day>;
  createdAt: string;
  updatedAt: string;
}

export interface GetProductsResponse {
  id: string;
  _id: string;
  __v: number;
  price: number;
  expense: number;
  transactions: Array<string>;
  createdAt: string;
  updatedAt: string;
}

export interface GetTransactionsResponse {
  id: string;
  _id: string;
  __v: number;
  buyer: string;
  amount: number;
  productIds: Array<string>;
  createdAt: string;
  updatedAt: string;
}

export interface Waves {
  wave: string;
  answers: number;
}

export interface GetXLSResponse {
  rows: Array<XLS>;
}

export interface GetSurveyResponse {
  university: string;
  wave: string;
  rows: Array<XLS>;
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface Row {
  id: string | number;
  fullName: string;
  university: string;
  wave: string;
  behavior: number;
  personality: number;
  hability: number;
  total: number;
}

export interface GetRankingResponse {
  fullName: string;
  university: string;
  wave: string;
  categoryRanking: {
    totalC1: number;
    totalC2: number;
    totalC3: number;
  }
  total: number;
}

export interface XLS {
  id: string;
  university: string;
  wave: string;
  fullName: string;
  birthdate: string;
  gender: string;
  question01: number;
  question02: number;
  question03: number;
  question04: number;
  question05: number;
  question06: number;
  question07: number;
  question08: number;
  question09: number;
  question10: number;
  question11: number;
  question12: number;
  question13: number;
  question14: number;
  question15: number;
  question16: number;
  question17: number;
  question18: number;
  question19: number;
  question20: number;
  question21: number;
  question22: number;
  question23: number;
  question24: number;
  question25: number;
  question26: number;
  question27: number;
  question28: number;
}

export interface ExpensesByCategoryX {
  salaries: number;
  supplies: number;
  services: number;
}

export interface SortColumn {
  readonly columnKey: string;
  readonly direction: SortDirection;
}

export type SortDirection = 'ASC' | 'DESC';

