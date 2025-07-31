import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Ticket, TicketMessage } from '../../models/ticket.model';
import { SupportService } from '../../services/support.service';

@Component({
  selector: 'app-support-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    BadgeModule,
    TagModule,
    InputTextareaModule,
    DropdownModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './support-detail.component.html',
  styleUrl: './support-detail.component.scss'
})
export class SupportDetailComponent implements OnInit {

  ticket: Ticket | undefined;
  responseForm: FormGroup;
  isSubmitting = false;

  statusOptions = [
    { label: 'Açık', value: 'open' },
    { label: 'İşlemde', value: 'in_progress' },
    { label: 'Çözüldü', value: 'resolved' },
    { label: 'Kapalı', value: 'closed' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private supportService: SupportService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.responseForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(10)]],
      isInternal: [false]
    });
  }

  ngOnInit() {
    const ticketId = this.route.snapshot.paramMap.get('id');
    if (ticketId) {
      this.loadTicket(ticketId);
    }
  }

  loadTicket(ticketId: string) {
    this.supportService.getTicketById(ticketId).subscribe(ticket => {
      this.ticket = ticket;
      if (!ticket) {
        this.router.navigate(['/support']);
      }
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

  onSubmit() {
    if (this.responseForm.valid && this.ticket) {
      this.isSubmitting = true;
      const response = this.responseForm.value;

      this.supportService.addResponse(this.ticket.id, response, true).subscribe({
        next: (message) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Yanıtınız gönderildi.'
          });
          this.responseForm.reset();
          this.loadTicket(this.ticket!.id);
          this.isSubmitting = false;
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Yanıt gönderilirken bir hata oluştu.'
          });
          this.isSubmitting = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  updateStatus(newStatus: string) {
    if (this.ticket) {
      this.supportService.updateTicketStatus(this.ticket.id, newStatus as any).subscribe({
        next: (updatedTicket) => {
          this.ticket = updatedTicket;
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Ticket durumu güncellendi.'
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Durum güncellenirken bir hata oluştu.'
          });
        }
      });
    }
  }

  markFormGroupTouched() {
    Object.keys(this.responseForm.controls).forEach(key => {
      const control = this.responseForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const control = this.responseForm.get(fieldName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return 'Bu alan zorunludur.';
      }
      if (control.errors['minlength']) {
        return `En az ${control.errors['minlength'].requiredLength} karakter olmalıdır.`;
      }
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.responseForm.get(fieldName);
    return !!(control?.invalid && control?.touched);
  }

  goBack() {
    this.router.navigate(['/support']);
  }
} 