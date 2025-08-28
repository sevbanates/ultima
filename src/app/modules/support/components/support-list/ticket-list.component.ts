import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { CategoryEnum, PriorityEnum, Ticket, TicketDto, TicketStatusEnum, DefaultTicketListRequestModel, TicketListRequestModel } from '../../models/ticket.model';
import { SupportService } from '../../services/support.service';
import { Subject, takeUntil } from 'rxjs';
import { PagedAndSortedResponse } from 'src/app/core/models/response-model';
import { Table } from 'primeng/table';
import { User } from 'src/app/modules/system-management/user/models/user-list-model';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { LocalStorageType } from 'src/app/core/enums/local-storage-type.enum';

@Component({
  selector: 'app-support-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    BadgeModule,
    TagModule,
    TooltipModule,
    DropdownModule,
    InputTextModule,
    TableModule,
    PaginatorModule
  ],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.scss'
})
export class TicketListComponent implements OnInit {

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  tickets: TicketDto[] = [];
  pagination: PagedAndSortedResponse<any>;
  requestModel: DefaultTicketListRequestModel = new DefaultTicketListRequestModel();
  
  selectedStatus: number = 0;
  selectedPriority: number = 0;
  selectedCategory: number = 0;
  searchTerm: string = '';

  statusOptions = [
    { label: 'Tümü', value: 0 },
    { label: 'Açık', value: 1 },
    { label: 'İşlemde', value: 2 },
    { label: 'Çözüldü', value: 3 },
    { label: 'Kapalı', value: 4 }
  ];

  priorityOptions = [
    { label: 'Tümü', value: 0 },
    { label: 'Düşük', value: 1 },
    { label: 'Orta', value: 2 },
    { label: 'Yüksek', value: 3 },
    { label: 'Acil', value: 4 }
  ];

  categoryOptions = [
    { label: 'Tümü', value: 0 },
    { label: 'Teknik', value: 1 },
    { label: 'Faturalama', value: 2 },
    { label: 'Özellik Talebi', value: 3 },
    { label: 'Hata Raporu', value: 4 },
    { label: 'Genel', value: 5 }
  ];

  private readonly _router: Router = inject(Router);
  protected readonly _supportService: SupportService = inject(SupportService);
  protected readonly _changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  public user: User = inject(LocalStorageService).getItem(LocalStorageType.userData);
  constructor() {}

  ngOnInit() {
    this.getPagination();
    // this.getEntityPage();
    this._supportService.entityList$.pipe(takeUntil(this._unsubscribeAll)).subscribe((entityList) => {
      this.tickets = entityList;
    });
  }

  getEntityPage() {
    return this._supportService.getEntityPage(this.requestModel).subscribe(() => {
      // Loading completed
    });
  }

  onPageChange(event: any) {
    this.requestModel.Limit = event.rows;
    this.requestModel.Page = event.page + 1;
    this.getEntityPage();
  }

  getPagination() {
    this._supportService.pagination$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((pagination) => {
        this.pagination = pagination;
        this._changeDetectorRef.markForCheck();
      });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  filterTickets() {
    // Server-side filtreleme için requestModel'i güncelle ve yeniden yükle
    this.requestModel.TicketCategory = this.selectedCategory;
    this.requestModel.TicketStatus = this.selectedStatus;
    this.requestModel.TicketPriority = this.selectedPriority;
    this.requestModel.Search = this.searchTerm;
    this.requestModel.Page = 1; // Filtreleme yapıldığında ilk sayfaya dön
    this.getEntityPage();
  }

  getStatusColor(status: number): string {
    switch (status) {
      case TicketStatusEnum.Open: return 'warning';
      case TicketStatusEnum.InProgress: return 'info';
      case TicketStatusEnum.Resolved: return 'success';
      case TicketStatusEnum.Closed: return 'secondary';
      default: return 'secondary';
    }
  }

  getStatusLabel(status: number): string {
    switch (status) {
      case TicketStatusEnum.Open: return 'Açık';
      case TicketStatusEnum.InProgress: return 'İşlemde';
      case TicketStatusEnum.Resolved: return 'Çözüldü';
      case TicketStatusEnum.Closed: return 'Kapalı';
      default: return 'Bilinmiyor';
    }
  }

  getPriorityColor(priority: number): string {
    switch (priority) {
      case PriorityEnum.Low: return 'success';
      case PriorityEnum.Medium: return 'warning';
      case PriorityEnum.High: return 'danger';
      case PriorityEnum.Urgent: return 'danger';
      default: return 'secondary';
    }
  }

  getPriorityLabel(priority: number): string {
    switch (priority) {
      case PriorityEnum.Low: return 'Düşük';
      case PriorityEnum.Medium: return 'Orta';
      case PriorityEnum.High: return 'Yüksek';
      case PriorityEnum.Urgent: return 'Acil';
      default: return 'Bilinmiyor';
    }
  }

  getCategoryLabel(category: number): string {
    switch (category) {
      case CategoryEnum.Technical: return 'Teknik';
      case CategoryEnum.Billing: return 'Faturalama';
      case CategoryEnum.FeatureRequest: return 'Özellik Talebi';
      case CategoryEnum.BugReport: return 'Hata Raporu';
      case CategoryEnum.General: return 'Genel';
      default: return 'Bilinmiyor';
    }
  }

  getCategoryIcon(category: number): string {
    switch (category) {
      case CategoryEnum.Technical: return 'pi pi-cog';
      case CategoryEnum.Billing: return 'pi pi-credit-card';
      case CategoryEnum.FeatureRequest: return 'pi pi-star';
      case CategoryEnum.BugReport: return 'pi pi-exclamation-triangle';
      case CategoryEnum.General: return 'pi pi-question-circle';
      default: return 'pi pi-file';
    }
  }

  getTicketStatusClass(status: number): string {
    switch (status) {
      case TicketStatusEnum.Open: return 'status-open';
      case TicketStatusEnum.InProgress: return 'status-in-progress';
      case TicketStatusEnum.Resolved: return 'status-resolved';
      case TicketStatusEnum.Closed: return 'status-closed';
      default: return 'status-unknown';
    }
  }

  openTicket(ticket: TicketDto) {
    this._router.navigate([`tickets/${ticket.Id}/${ticket.GuidId}`]);
  }

  createNewTicket() {
    this._router.navigate(['/tickets/create']);
  }

  onStatusChange() {
    this.filterTickets();
  }

  onPriorityChange() {
    this.filterTickets();
  }

  onCategoryChange() {
    this.filterTickets();
  }

  onSearchChange() {
    this.filterTickets();
  }

  getOpenTicketsCount(): number {
    return this.tickets.filter(t => t.Status === TicketStatusEnum.Open).length;
  }

  getInProgressTicketsCount(): number {
    return this.tickets.filter(t => t.Status === TicketStatusEnum.InProgress).length;
  }

  getResolvedTicketsCount(): number {
    return this.tickets.filter(t => t.Status === TicketStatusEnum.Resolved).length;
  }

  getTotalTicketsCount(): number {
    return this.pagination?.TotalCount || 0;
  }
} 