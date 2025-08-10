import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { DashboardService } from './services/dashboard.service';
import { DashboardStatistics, DashboardCard, InvoiceSummary } from './models/dashboard-statistics.model';

// PrimeNG imports
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ProgressBarModule,
    TableModule,
    ButtonModule,
    SkeletonModule,
    TagModule,
    ChartModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly dashboardService = inject(DashboardService);
  private readonly destroy$ = new Subject<void>();

  statistics: DashboardStatistics | null = null;
  dashboardCards: DashboardCard[] = [];
  loading = false;
  recentInvoices: InvoiceSummary[] = [];

  // Chart data
  revenueChartData: any;
  revenueChartOptions: any;

  ngOnInit(): void {
    this.initializeChartOptions();
    this.loadDashboardData();
    this.subscribeToServices();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeToServices(): void {
    this.dashboardService.statistics$
      .pipe(takeUntil(this.destroy$))
      .subscribe(statistics => {
        if (statistics) {
          this.statistics = statistics;
          this.dashboardCards = this.dashboardService.generateDashboardCards(statistics);
          this.recentInvoices = statistics.recentInvoices;
          this.updateChartData(statistics);
        }
      });

    this.dashboardService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => {
        this.loading = loading;
      });
  }

  private loadDashboardData(): void {
    // Mock veri kullanıyoruz, gerçek API hazır olduğunda getDashboardStatistics() kullanılacak
    this.dashboardService.getMockDashboardStatistics().subscribe();
  }

  private initializeChartOptions(): void {
    this.revenueChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value: any) {
              return new Intl.NumberFormat('tr-TR', {
                style: 'currency',
                currency: 'TRY',
                minimumFractionDigits: 0
              }).format(value);
            }
          }
        }
      }
    };
  }

  private updateChartData(statistics: DashboardStatistics): void {
    this.revenueChartData = {
      labels: ['Günlük', 'Haftalık', 'Aylık', 'Toplam'],
      datasets: [
        {
          label: 'Gelir',
          data: [
            statistics.dailyRevenue,
            statistics.weeklyRevenue,
            statistics.monthlyRevenue,
            statistics.totalRevenue
          ],
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
          borderColor: 'rgba(34, 197, 94, 1)',
          borderWidth: 2
        },
        {
          label: 'Gider',
          data: [
            statistics.dailyExpenses,
            statistics.weeklyExpenses,
            statistics.monthlyExpenses,
            statistics.totalExpenses
          ],
          backgroundColor: 'rgba(239, 68, 68, 0.2)',
          borderColor: 'rgba(239, 68, 68, 1)',
          borderWidth: 2
        }
      ]
    };
  }

  getStatusSeverity(status: string): string {
    switch (status.toLowerCase()) {
      case 'ödendi':
        return 'success';
      case 'beklemede':
        return 'warning';
      case 'iptal':
        return 'danger';
      default:
        return 'info';
    }
  }

  getTrendIcon(trend: string): string {
    switch (trend) {
      case 'up':
        return 'pi-arrow-up';
      case 'down':
        return 'pi-arrow-down';
      default:
        return 'pi-minus';
    }
  }

  getTrendClass(trend: string): string {
    switch (trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  }

  refreshData(): void {
    this.loadDashboardData();
  }
}
