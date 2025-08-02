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
import { Ticket, TicketDto, TicketMessage, TicketMessageDto, TicketStatus, CreateTicketMessageRequest } from '../../models/ticket.model';
import { SupportService } from '../../services/support.service';
import { ResponseModel } from 'src/app/core/models/response-model';
import { Subject, takeUntil } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { LocalStorageType } from 'src/app/core/enums/local-storage-type.enum';
import { User } from 'src/app/modules/system-management/user/models/user-list-model';

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

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  ticket: TicketDto | undefined;
  responseForm: FormGroup;
  isSubmitting = false;
  currentUser: User;

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
    private messageService: MessageService,
    private localStorageService: LocalStorageService
  ) {
    this.responseForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(10)]],
      isInternal: [false]
    });
    
    this.currentUser = this.localStorageService.getItem(LocalStorageType.userData) as User;
  }

  ngOnInit() {
      this.supportService.entity$.pipe(takeUntil(this._unsubscribeAll)).subscribe((entity) => {
        this.ticket = entity;
        // Debug için console log ekle
        if (this.ticket) {
          console.log('Ticket data:', this.ticket);
          console.log('Messages:', this.ticket.Messages);
          if (this.ticket.Messages && this.ticket.Messages.length > 0) {
            console.log('First message structure:', this.ticket.Messages[0]);
            console.log('Available properties:', Object.keys(this.ticket.Messages[0]));
            
            // Check for common property naming issues
            this.ticket.Messages.forEach((msg, index) => {
              console.log(`Message ${index} properties:`, {
                senderType: this.getMessageProperty(msg, 'senderType'),
                senderName: this.getMessageProperty(msg, 'senderName'),
                message: this.getMessageProperty(msg, 'message'),
                createdAt: this.getMessageProperty(msg, 'createdAt'),
                isInternal: this.getMessageProperty(msg, 'isInternal')
              });
            });
          }
        }
      })
      // this.loadTicket(Number(ticketId), ticketguidId);
    
  }

  loadTicket(ticketId: number, guidId: string) {


    
    this.supportService.getEntityById(ticketId, guidId).subscribe((response) => {
      if (response.IsSuccess) {
        this.ticket = response.Entity;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: response.ReturnMessage.toString() || 'Ticket bulunamadı.'
        });
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

      const messageRequest: CreateTicketMessageRequest = {
        ticketId: this.ticket.Id,
        senderId: this.currentUser.Id,
        senderName: this.currentUser.UserName,
        senderEmail: this.currentUser.Email,
        senderType: this.currentUser.IsAdmin ? 'admin' : 'user',
        message: response.message,
        attachments: "", // Boş string olarak gönder
        isInternal: response.isInternal || false
      };

      this.supportService.addMessage(messageRequest).subscribe({
        next: (response) => {
          if (response.IsSuccess) {
            this.messageService.add({
              severity: 'success',
              summary: 'Başarılı',
              detail: 'Yanıtınız gönderildi.'
            });
            this.responseForm.reset();
            this.loadTicket(this.ticket!.Id, this.ticket!.GuidId);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Hata',
              detail: response.ReturnMessage.toString() || 'Yanıt gönderilemedi.'
            });
          }
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
      const ticketId = this.ticket.Id;
      this.supportService.changeStatus(ticketId, newStatus as TicketStatus).subscribe({
        next: (response) => {
          if (response.IsSuccess) {
            this.messageService.add({
              severity: 'success',
              summary: 'Başarılı',
              detail: 'Ticket durumu güncellendi.'
            });
            // Reload the ticket to get updated data
            this.loadTicket(this.ticket!.Id, this.ticket!.GuidId);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Hata',
              detail: response.ReturnMessage.toString() || 'Durum güncellenemedi.'
            });
          }
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

  // Debug method to check message structure
  debugMessage(message: any, index: number) {
    console.log(`Message ${index}:`, message);
    console.log('Properties:', Object.keys(message));
  }

  // Helper method to safely get message property
  getMessageProperty(message: any, propName: string): any {
    if (!message) return null;
    
    // Try camelCase first
    if (message[propName] !== undefined && message[propName] !== null) {
      return message[propName];
    }
    
    // Try PascalCase
    const pascalCaseProp = propName.charAt(0).toUpperCase() + propName.slice(1);
    if (message[pascalCaseProp] !== undefined && message[pascalCaseProp] !== null) {
      return message[pascalCaseProp];
    }
    
    // Try snake_case
    const snakeCaseProp = propName.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    if (message[snakeCaseProp] !== undefined && message[snakeCaseProp] !== null) {
      return message[snakeCaseProp];
    }
    
    return null;
  }

  // Helper method to format message date
  formatMessageDate(message: any): string {
    const dateValue = message.createdAt || message.CreatedAt || message.created_at || message.Created_At;
    if (!dateValue) return 'Tarih bilinmiyor';
    
    try {
      const date = new Date(dateValue);
      return date.toLocaleDateString('tr-TR') + ' ' + date.toLocaleTimeString('tr-TR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch (error) {
      console.error('Date parsing error:', error);
      return 'Geçersiz tarih';
    }
  }
} 