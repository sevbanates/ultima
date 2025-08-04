import { Component, OnInit } from '@angular/core';
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
import { CategoryEnum, PriorityEnum, Ticket, TicketDto, TicketStatusEnum } from '../../models/ticket.model';
import { SupportService } from '../../services/support.service';
import { Subject, takeUntil } from 'rxjs';

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
    InputTextModule
  ],
  templateUrl: './support-list.component.html',
  styleUrl: './support-list.component.scss'
})
export class SupportListComponent implements OnInit {

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  tickets: TicketDto[] = [];
  filteredTickets: TicketDto[] = [];
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

  constructor(
    private supportService: SupportService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets() {

    this.supportService.entityList$.pipe(takeUntil(this._unsubscribeAll)).subscribe((entityList) => {
      this.tickets = entityList;
      this.filterTickets();
    })
    
  }

  filterTickets() {
    this.filteredTickets = this.tickets.filter(ticket => {
      const statusMatch = this.selectedStatus === 0 || ticket.Status === this.selectedStatus;
      const priorityMatch = this.selectedPriority === 0 || ticket.Priority === this.selectedPriority;
      const categoryMatch = this.selectedCategory === 0 || ticket.Category === this.selectedCategory;
      const searchMatch = !this.searchTerm || 
        ticket.Title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        ticket.Description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        ticket.CreatedBy.toLowerCase().includes(this.searchTerm.toLowerCase());

      return statusMatch && priorityMatch && categoryMatch && searchMatch;
    });
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

  openTicket(ticket: TicketDto) {
    debugger
    this.router.navigate([`support/${ticket.Id}/${ticket.GuidId}`]);
  }

  createNewTicket() {
    this.router.navigate(['/support/create']);
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

  get openTicketsCount(): number {
    return this.tickets.filter(t => t.Status === TicketStatusEnum.Open).length;
  }

  get inProgressTicketsCount(): number {
    return this.tickets.filter(t => t.Status === TicketStatusEnum.InProgress).length;
  }

  get resolvedTicketsCount(): number {
    return this.tickets.filter(t => t.Status === TicketStatusEnum.Resolved).length;
  }

  get totalTicketsCount(): number {
    return this.tickets.length;
  }
} 