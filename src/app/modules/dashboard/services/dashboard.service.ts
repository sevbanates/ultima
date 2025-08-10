import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { DashboardStatistics, DashboardCard } from '../models/dashboard-statistics.model';
import { ResponseModel } from 'src/app/core/models/response-model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly apiUrl = environment.restApiUrl;
  private readonly _httpClient: HttpClient = inject(HttpClient);
  
  private readonly _statistics: BehaviorSubject<DashboardStatistics | null> = new BehaviorSubject(null);
  private readonly _loading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  get statistics$(): Observable<DashboardStatistics | null> {
    return this._statistics.asObservable();
  }

  get loading$(): Observable<boolean> {
    return this._loading.asObservable();
  }

  // Dashboard istatistiklerini getir
  getDashboardStatistics(): Observable<ResponseModel<DashboardStatistics>> {
    this._loading.next(true);
    
    return this._httpClient.get<ResponseModel<DashboardStatistics>>(`${this.apiUrl}dashboard/statistics`)
      .pipe(
        tap((response) => {
          if (response.IsSuccess) {
            this._statistics.next(response.Entity);
          }
          this._loading.next(false);
        })
      );
  }

  // Mock veri döndüren metod (API hazır olmadığında kullanım için)
  getMockDashboardStatistics(): Observable<DashboardStatistics> {
    this._loading.next(true);
    
    const mockData: DashboardStatistics = {
      totalInvoices: 156,
      monthlyInvoices: 23,
      weeklyInvoices: 6,
      dailyInvoices: 2,
      
      totalRevenue: 125000,
      monthlyRevenue: 18500,
      weeklyRevenue: 4200,
      dailyRevenue: 850,
      
      totalExpenses: 35000,
      monthlyExpenses: 5200,
      weeklyExpenses: 1100,
      dailyExpenses: 250,
      
      totalProfit: 90000,
      monthlyProfit: 13300,
      weeklyProfit: 3100,
      dailyProfit: 600,
      
      totalCustomers: 42,
      activeCustomers: 38,
      newCustomersThisMonth: 5,
      
      recentInvoices: [
        {
          id: 1,
          invoiceNumber: 'INV-2024-001',
          customerName: 'ABC Şirketi',
          amount: 2500,
          date: '2024-01-15',
          status: 'Ödendi'
        },
        {
          id: 2,
          invoiceNumber: 'INV-2024-002',
          customerName: 'XYZ Ltd.',
          amount: 1800,
          date: '2024-01-14',
          status: 'Beklemede'
        },
        {
          id: 3,
          invoiceNumber: 'INV-2024-003',
          customerName: 'DEF A.Ş.',
          amount: 3200,
          date: '2024-01-13',
          status: 'Ödendi'
        }
      ]
    };

    return new Observable(observer => {
      setTimeout(() => {
        this._statistics.next(mockData);
        this._loading.next(false);
        observer.next(mockData);
        observer.complete();
      }, 1000); // 1 saniye gecikme ile API çağrısını simüle et
    });
  }

  // Dashboard kartları oluştur
  generateDashboardCards(statistics: DashboardStatistics): DashboardCard[] {
    return [
      {
        title: 'Toplam Fatura',
        value: statistics.totalInvoices,
        icon: 'pi-file-edit',
        color: 'blue',
        percentage: this.calculatePercentageChange(statistics.monthlyInvoices, statistics.weeklyInvoices * 4),
        trend: this.getTrend(statistics.monthlyInvoices, statistics.weeklyInvoices * 4),
        subtitle: `Bu ay ${statistics.monthlyInvoices} fatura`
      },
      {
        title: 'Toplam Gelir',
        value: this.formatCurrency(statistics.totalRevenue),
        icon: 'pi-chart-line',
        color: 'green',
        percentage: this.calculatePercentageChange(statistics.monthlyRevenue, statistics.weeklyRevenue * 4),
        trend: this.getTrend(statistics.monthlyRevenue, statistics.weeklyRevenue * 4),
        subtitle: `Bu ay ${this.formatCurrency(statistics.monthlyRevenue)}`
      },
      {
        title: 'Toplam Gider',
        value: this.formatCurrency(statistics.totalExpenses),
        icon: 'pi-minus-circle',
        color: 'red',
        percentage: this.calculatePercentageChange(statistics.monthlyExpenses, statistics.weeklyExpenses * 4),
        trend: this.getTrend(statistics.monthlyExpenses, statistics.weeklyExpenses * 4),
        subtitle: `Bu ay ${this.formatCurrency(statistics.monthlyExpenses)}`
      },
      {
        title: 'Net Kar',
        value: this.formatCurrency(statistics.totalProfit),
        icon: 'pi-dollar',
        color: 'purple',
        percentage: this.calculatePercentageChange(statistics.monthlyProfit, statistics.weeklyProfit * 4),
        trend: this.getTrend(statistics.monthlyProfit, statistics.weeklyProfit * 4),
        subtitle: `Bu ay ${this.formatCurrency(statistics.monthlyProfit)}`
      },
      {
        title: 'Aktif Müşteri',
        value: statistics.activeCustomers,
        icon: 'pi-users',
        color: 'indigo',
        percentage: this.calculatePercentageChange(statistics.newCustomersThisMonth, 0),
        trend: statistics.newCustomersThisMonth > 0 ? 'up' : 'stable',
        subtitle: `${statistics.newCustomersThisMonth} yeni müşteri`
      },
      {
        title: 'Günlük Ortalama',
        value: this.formatCurrency(statistics.dailyRevenue),
        icon: 'pi-calendar',
        color: 'orange',
        percentage: this.calculatePercentageChange(statistics.dailyRevenue, statistics.weeklyRevenue / 7),
        trend: this.getTrend(statistics.dailyRevenue, statistics.weeklyRevenue / 7),
        subtitle: 'Günlük gelir ortalaması'
      }
    ];
  }

  private formatCurrency(amount: number): string {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  private calculatePercentageChange(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  }

  private getTrend(current: number, previous: number): 'up' | 'down' | 'stable' {
    if (current > previous) return 'up';
    if (current < previous) return 'down';
    return 'stable';
  }
}

