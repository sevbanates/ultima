import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SettingsService } from '../../services/settings.service';
import { CreateAccounterRequestDto } from '../../models/accounter.models';

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
    private messageService: MessageService,
    private settingsService: SettingsService
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
      debugger
      const email = this.mailForm.get('email')?.value;
      
      // Simulate mail sending API call
      const dto: CreateAccounterRequestDto = {
      TargetEmail : email
      }
      this.settingsService.createAccounterRequest(dto).subscribe((response) => {
        if (response.IsSuccess) {
          // this.messageService.add({
          //   severity: 'success',
          //   summary: 'Başarılı!',
          //   detail: `${email} adresine mail başarıyla gönderildi.`,
          //   life: 4000
          // });
          this.isEmailSent = true;
          this.isSubmitting = false;
        }else{
          // this.messageService.add({ 
          //   severity: 'error',
          //   summary: 'Hata!',
          //   detail: response.ReturnMessage[0],
          //   life: 3000
          // });
          this.isSubmitting = false;
        }
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