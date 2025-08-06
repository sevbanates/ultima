import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-create-request',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './create-request.component.html',
  styleUrl: './create-request.component.scss'
})
export class CreateRequestComponent implements OnInit {

  mailForm!: FormGroup;
  isSubmitting = false;
  isEmailSent = false;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.mailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.mailForm.valid) {
      this.isSubmitting = true;
      const email = this.mailForm.get('email')?.value;
      
      // Simulate mail sending API call
      setTimeout(() => {
        console.log('Sending mail to:', email);
        
        this.messageService.add({
          severity: 'success',
          summary: 'Başarılı!',
          detail: `${email} adresine mail başarıyla gönderildi.`,
          life: 4000
        });
        
        this.isEmailSent = true;
        this.isSubmitting = false;
      }, 2000);
    } else {
      this.markFormGroupTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Hata!',
        detail: 'Lütfen geçerli bir e-posta adresi girin.',
        life: 3000
      });
    }
  }

  resetForm() {
    this.mailForm.reset();
    this.isEmailSent = false;
    this.isSubmitting = false;
  }

  markFormGroupTouched() {
    Object.keys(this.mailForm.controls).forEach(key => {
      const control = this.mailForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.mailForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return 'E-posta adresi zorunludur.';
      }
      if (field.errors['email']) {
        return 'Geçerli bir e-posta adresi girin.';
      }
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.mailForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  // Mail sending simulation
  private sendEmail(email: string): Promise<boolean> {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        console.log(`Mail sent to: ${email}`);
        resolve(true);
      }, 1500);
    });
  }
}