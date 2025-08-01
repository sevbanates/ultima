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
import { Ticket, TicketDto } from '../../models/ticket.model';
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
  selectedStatus: string = 'all';
  selectedPriority: string = 'all';
  selectedCategory: string = 'all';
  searchTerm: string = '';

  statusOptions = [
    { label: 'Tümü', value: 'all' },
    { label: 'Açık', value: 'open' },
    { label: 'İşlemde', value: 'in_progress' },
    { label: 'Çözüldü', value: 'resolved' },
    { label: 'Kapalı', value: 'closed' }
  ];

  priorityOptions = [
    { label: 'Tümü', value: 'all' },
    { label: 'Düşük', value: 'low' },
    { label: 'Orta', value: 'medium' },
    { label: 'Yüksek', value: 'high' },
    { label: 'Acil', value: 'urgent' }
  ];

  categoryOptions = [
    { label: 'Tümü', value: 'all' },
    { label: 'Teknik', value: 'technical' },
    { label: 'Faturalama', value: 'billing' },
    { label: 'Özellik Talebi', value: 'feature_request' },
    { label: 'Hata Raporu', value: 'bug_report' },
    { label: 'Genel', value: 'general' }
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
      const statusMatch = this.selectedStatus === 'all' || ticket.Status === this.selectedStatus;
      const priorityMatch = this.selectedPriority === 'all' || ticket.Priority === this.selectedPriority;
      const categoryMatch = this.selectedCategory === 'all' || ticket.Category === this.selectedCategory;
      const searchMatch = !this.searchTerm || 
        ticket.Title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        ticket.Description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        ticket.CreatedBy.toLowerCase().includes(this.searchTerm.toLowerCase());

      return statusMatch && priorityMatch && categoryMatch && searchMatch;
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'open': return 'warning';
      case 'in_progress': return 'info';
      case 'resolved': return 'success';
      case 'closed': return 'secondary';
      default: return 'secondary';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'open': return 'Açık';
      case 'in_progress': return 'İşlemde';
      case 'resolved': return 'Çözüldü';
      case 'closed': return 'Kapalı';
      default: return 'Bilinmiyor';
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'danger';
      case 'urgent': return 'danger';
      default: return 'secondary';
    }
  }

  getPriorityLabel(priority: string): string {
    switch (priority) {
      case 'low': return 'Düşük';
      case 'medium': return 'Orta';
      case 'high': return 'Yüksek';
      case 'urgent': return 'Acil';
      default: return 'Bilinmiyor';
    }
  }

  getCategoryLabel(category: string): string {
    switch (category) {
      case 'technical': return 'Teknik';
      case 'billing': return 'Faturalama';
      case 'feature_request': return 'Özellik Talebi';
      case 'bug_report': return 'Hata Raporu';
      case 'general': return 'Genel';
      default: return 'Bilinmiyor';
    }
  }

  getCategoryIcon(category: string): string {
    switch (category) {
      case 'technical': return 'pi pi-cog';
      case 'billing': return 'pi pi-credit-card';
      case 'feature_request': return 'pi pi-star';
      case 'bug_report': return 'pi pi-exclamation-triangle';
      case 'general': return 'pi pi-question-circle';
      default: return 'pi pi-file';
    }
  }

  openTicket(ticket: Ticket) {
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
    return this.tickets.filter(t => t.Status === 'open').length;
  }

  get inProgressTicketsCount(): number {
    return this.tickets.filter(t => t.Status === 'in_progress').length;
  }

  get resolvedTicketsCount(): number {
    return this.tickets.filter(t => t.Status === 'resolved').length;
  }

  get totalTicketsCount(): number {
    return this.tickets.length;
  }
} 