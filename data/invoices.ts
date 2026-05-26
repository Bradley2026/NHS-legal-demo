// TODO: Replace with real synthetic invoice data from David

export type Invoice = {
  id: string;
  firmId: string;
  departmentId: string;
  matterId: string;
  amount: number;
  date: string;
  description: string;
  feeEarner: string;
  grade: "Partner" | "Associate" | "Solicitor" | "Paralegal";
  hourlyRate: number;
  hours: number;
};

export const invoices: Invoice[] = [];
