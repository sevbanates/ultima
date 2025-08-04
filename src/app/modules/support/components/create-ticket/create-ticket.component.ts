import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CategoryEnum, CreateTicketRequest, PriorityEnum } from '../../models/ticket.model';
import { SupportService } from '../../services/support.service';

@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.scss'
})
export class CreateTicketComponent implements OnInit {

  ticketForm: FormGroup;
  isSubmitting = false;

  categoryOptions = [
    { label: 'Teknik', value: CategoryEnum.Technical },
    { label: 'Faturalama', value: CategoryEnum.Billing },
    { label: 'Özellik Talebi', value: CategoryEnum.FeatureRequest },
    { label: 'Hata Raporu', value: CategoryEnum.BugReport },
    { label: 'Genel', value: CategoryEnum.General }
  ];

  priorityOptions = [
    { label: 'Düşük', value: PriorityEnum.Low },
    { label: 'Orta', value: PriorityEnum.Medium },
    { label: 'Yüksek', value: PriorityEnum.High },
    { label: 'Acil', value: PriorityEnum.Urgent }
  ];

  constructor(
    private fb: FormBuilder,
    private supportService: SupportService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.ticketForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      // description: ['', [Validators.required, Validators.minLength(20)]],
      category: ['', Validators.required],
      priority: ['medium', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    // Form initialization is done in constructor
  }

  onSubmit() {
    if (this.ticketForm.valid) {
      this.isSubmitting = true;
      const ticketData: CreateTicketRequest = this.ticketForm.value;

      this.supportService.createTicket(ticketData).subscribe({
        next: (response) => {
          if (response.IsSuccess) {
            this.messageService.add({
              severity: 'success',
              summary: 'Başarılı',
              detail: 'Destek talebiniz başarıyla oluşturuldu. Ticket ID: ' + response.Entity
            });
            setTimeout(() => {
              this.router.navigate(['/support/' + response.Entity.Id + '/' + response.Entity.GuidId]);
            }, 2000);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Hata',
              detail: response.ReturnMessage.toString() || 'Destek talebi oluşturulamadı.'
            });
          }
          this.isSubmitting = false;
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Destek talebi oluşturulurken bir hata oluştu.'
          });
          this.isSubmitting = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched() {
    Object.keys(this.ticketForm.controls).forEach(key => {
      const control = this.ticketForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const control = this.ticketForm.get(fieldName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return 'Bu alan zorunludur.';
      }
      if (control.errors['email']) {
        return 'Geçerli bir e-posta adresi giriniz.';
      }
      if (control.errors['minlength']) {
        return `En az ${control.errors['minlength'].requiredLength} karakter olmalıdır.`;
      }
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.ticketForm.get(fieldName);
    return !!(control?.invalid && control?.touched);
  }

  goBack() {
    this.router.navigate(['/support']);
  }
} 