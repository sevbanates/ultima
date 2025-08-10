export interface DashboardStatistics {
  // Fatura istatistikleri
  totalInvoices: number;
  monthlyInvoices: number;
  weeklyInvoices: number;
  dailyInvoices: number;
  
  // Gelir istatistikleri
  totalRevenue: number;
  monthlyRevenue: number;
  weeklyRevenue: number;
  dailyRevenue: number;
  
  // Gider istatistikleri (invoice'lardan kesinti veya maliyet hesaplanan)
  totalExpenses: number;
  monthlyExpenses: number;
  weeklyExpenses: number;
  dailyExpenses: number;
  
  // Net kar
  totalProfit: number;
  monthlyProfit: number;
  weeklyProfit: number;
  dailyProfit: number;
  
  // Müşteri istatistikleri
  totalCustomers: number;
  activeCustomers: number;
  newCustomersThisMonth: number;
  
  // Son faturalar
  recentInvoices: InvoiceSummary[];
}

export interface InvoiceSummary {
  id: number;
  invoiceNumber: string;
  customerName: string;
  amount: number;
  date: string;
  status: string;
}

export interface DashboardCard {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  percentage?: number;
  trend?: 'up' | 'down' | 'stable';
  subtitle?: string;
}

