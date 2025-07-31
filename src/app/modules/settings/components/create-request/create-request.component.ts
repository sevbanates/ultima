import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';

interface RequestType {
  label: string;
  value: string;
  icon: string;
  description: string;
}

interface Priority {
  label: string;
  value: string;
  color: string;
}

@Component({
  selector: 'app-create-request',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BadgeModule,
    ButtonModule,
    CardModule,
    DividerModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './create-request.component.html',
  styleUrl: './create-request.component.scss'
})
export class CreateRequestComponent implements OnInit {

  requestForm!: FormGroup;
  isSubmitting = false;

  requestTypes: RequestType[] = [
    {
      label: 'Sistem Erişimi',
      value: 'access',
      icon: 'pi pi-key',
      description: 'Sistem modüllerine erişim talep edin'
    },
    {
      label: 'İzin Talebi',
      value: 'permission',
      icon: 'pi pi-lock',
      description: 'Özel izinler talep edin'
    },
    {
      label: 'Yeni Özellik',
      value: 'feature',
      icon: 'pi pi-star',
      description: 'Yeni özellik veya geliştirme talep edin'
    },
    {
      label: 'Teknik Destek',
      value: 'support',
      icon: 'pi pi-question-circle',
      description: 'Teknik destek veya yardım talep edin'
    }
  ];

  priorities: Priority[] = [
    {
      label: 'Düşük',
      value: 'low',
      color: 'success'
    },
    {
      label: 'Orta',
      value: 'medium',
      color: 'warning'
    },
    {
      label: 'Yüksek',
      value: 'high',
      color: 'danger'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.requestForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      requestType: ['', Validators.required],
      priority: ['medium', Validators.required],
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  getSelectedRequestType(): RequestType | undefined {
    const selectedType = this.requestForm.get('requestType')?.value;
    return this.requestTypes.find(type => type.value === selectedType);
  }

  getSelectedPriority(): Priority | undefined {
    const selectedPriority = this.requestForm.get('priority')?.value;
    return this.priorities.find(priority => priority.value === selectedPriority);
  }

  onSubmit() {
    if (this.requestForm.valid) {
      this.isSubmitting = true;
      
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', this.requestForm.value);
        
        this.messageService.add({
          severity: 'success',
          summary: 'Başarılı!',
          detail: 'İsteğiniz başarıyla gönderildi. En kısa sürede size dönüş yapılacaktır.'
        });
        
        this.requestForm.reset();
        this.requestForm.patchValue({ priority: 'medium' });
        this.isSubmitting = false;
      }, 2000);
    } else {
      this.markFormGroupTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Hata!',
        detail: 'Lütfen tüm alanları doğru şekilde doldurun.'
      });
    }
  }

  markFormGroupTouched() {
    Object.keys(this.requestForm.controls).forEach(key => {
      const control = this.requestForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.requestForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return 'Bu alan zorunludur.';
      }
      if (field.errors['email']) {
        return 'Geçerli bir e-posta adresi girin.';
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `En az ${requiredLength} karakter girin.`;
      }
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.requestForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }
}
