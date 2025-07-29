import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserService } from '../../services/user.service';
import { UserChangePasswordDto } from '../../models/user-list-model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-user-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './user-change-password.component.html',
  styleUrl: './user-change-password.component.scss'
})
export class UserChangePasswordComponent {
  form!: FormGroup;
  submitted = false;
  loading = false;

  private readonly _formBuilder = inject(FormBuilder);
  private readonly _userService = inject(UserService);
  private readonly _dialogRef = inject(DynamicDialogRef);
  private readonly _config = inject(DynamicDialogConfig);

  constructor() {
    this.initForm();
  }

  initForm() {
    this.form = this._formBuilder.group({
      Password: ['', [Validators.required, Validators.minLength(6)]],
      PasswordConfirmation: ['', [Validators.required]]
    }, { validators: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(group: any) {
    const pass = group.get('Password')?.value;
    const confirm = group.get('PasswordConfirmation')?.value;
    if (pass !== confirm) {
      group.get('PasswordConfirmation')?.setErrors({ notMatch: true });
    } else {
      group.get('PasswordConfirmation')?.setErrors(null);
    }
    return null;
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;

    this.loading = true;
    const changePasswordData: UserChangePasswordDto = {
      GuidId: this._config.data.guidId,
      Password: this.form.value.Password,
      PasswordConfirmation: this.form.value.PasswordConfirmation
    };

    // TODO: UserService'e changePassword metodu ekle
    // this._userService.changePassword(changePasswordData).subscribe({
    //   next: (response) => {
    //     if (response.IsSuccess) {
    //       this._dialogRef.close({ success: true, message: 'Şifre başarıyla değiştirildi' });
    //     } else {
    //       // Hata mesajı göster
    //     }
    //   },
    //   error: (error) => {
    //     // Hata mesajı göster
    //   },
    //   complete: () => {
    //     this.loading = false;
    //   }
    // });

    // Şimdilik mock response
    setTimeout(() => {
      this.loading = false;
      this._dialogRef.close({ success: true, message: 'Şifre başarıyla değiştirildi' });
    }, 1000);
  }

  onCancel() {
    this._dialogRef.close();
  }
}
