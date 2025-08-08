import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateUserDto, CreateUserDto } from '../../models/user-list-model';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserChangePasswordComponent } from '../user-change-password/user-change-password.component';
import { Role } from 'src/app/core/enums/role.enum';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  form!: FormGroup;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  protected readonly _userService: UserService = inject(UserService);
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _dialogService = inject(DialogService);
  private _entityData: any = null;
  submitted = false;
  isEditMode = false;
  private dialogRef?: DynamicDialogRef;

  // Role dropdown options
  roleOptions = [
    { label: 'Admin', value: Role.Admin },
    { label: 'Kullanıcı', value: Role.User },
    { label: 'Muhasebeci', value: Role.Accounter }
  ];

  constructor(

  ) {}

  ngOnInit() {
    // Route'dan id parametresini al ve isEditMode'u belirle
    const id = this._route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
    }
    
    // Form oluştur (isEditMode'a göre validasyonlar ayarlanacak)
    this.initForm();
    
    // Eğer edit moddaysa user verisini al ve formu doldur
    if (this.isEditMode) {
      this._userService.entity$.subscribe(user => {
        if (user) {
          this.patchForm(user);
        }
      });
    }
  }

  initForm() {
    this.form = this._formBuilder.group({
      Id: [null],
      GuidId: [''],
      UserName: ['', [Validators.required, Validators.minLength(3)]],
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      Password: [''],
      PasswordConfirmation: [''],
      RoleId: [null, [Validators.required]],
      IsActive: [true],
      ClientId: [null]
    });

    // Eğer ekleme modundaysa password validasyonlarını ekle
    if (!this.isEditMode) {
      this.form.get('Password')?.setValidators([Validators.required, Validators.minLength(6)]);
      this.form.get('PasswordConfirmation')?.setValidators([Validators.required]);
      this.form.setValidators(this.passwordsMatchValidator);
    } else {
      // Edit modda password validasyonlarını kaldır
      this.form.get('Password')?.clearValidators();
      this.form.get('PasswordConfirmation')?.clearValidators();
      this.form.clearValidators();
      this.form.get('Password')?.updateValueAndValidity();
      this.form.get('PasswordConfirmation')?.updateValueAndValidity();
      this.form.updateValueAndValidity();
    }
  }

  // Şifreler eşleşiyor mu kontrolü
  passwordsMatchValidator(group: AbstractControl) {
    const pass = group.get('Password')?.value;
    const confirm = group.get('PasswordConfirmation')?.value;
    if (pass !== confirm) {
      group.get('PasswordConfirmation')?.setErrors({ notMatch: true });
    } else {
      group.get('PasswordConfirmation')?.setErrors(null);
    }
    return null;
  }

  // Kolay erişim için getterlar
  get f() { return this.form.controls; }

  onSubmit() {
    debugger
    this.submitted = true;
    if (this.form.invalid) return;
    if (this.isEditMode) {
      // Güncelleme işlemi - sadece UpdateUserDto'da olan alanları gönder
      const updateData: UpdateUserDto = {
        Id: this.form.value.Id,
        GuidId: this.form.value.GuidId,
        UserName: this.form.value.UserName,
        FirstName: this.form.value.FirstName,
        LastName: this.form.value.LastName,
        Email: this.form.value.Email,
        PhoneNumber: this.form.value.PhoneNumber,
        RoleId: this.form.value.RoleId,
        IsActive: this.form.value.IsActive
      };
      
      this._userService.updateEntity(updateData).subscribe((response) => {
        if(response.IsSuccess){
          this._router.navigate(['/users']);
        }
      });
    } else {
      // Ekleme işlemi - sadece CreateUserDto'da olan alanları gönder
      const createData: CreateUserDto = {
        UserName: this.form.value.UserName,
        FirstName: this.form.value.FirstName,
        LastName: this.form.value.LastName,
        Email: this.form.value.Email,
        PhoneNumber: this.form.value.PhoneNumber,
        Password: this.form.value.Password,
        PasswordConfirmation: this.form.value.PasswordConfirmation,
        RoleId: this.form.value.RoleId,
        IsActive: this.form.value.IsActive
      };
      
      this._userService.createEntity(createData).subscribe((response) => {
        if(response.IsSuccess){
          this._router.navigate(['/users']);
        }
      });
    }
  }

  changePassword() {
    // Şifre değiştirme dialog'unu aç
    this.dialogRef = this._dialogService.open(UserChangePasswordComponent, {
      header: 'Şifre Değiştir',
      width: '500px',
      data: {
        userId: this.form.value.Id,
        guidId: this.form.value.GuidId
      }
    });

    this.dialogRef.onClose.subscribe((result) => {
      if (result) {
        console.log('Şifre değiştirme işlemi tamamlandı:', result);
        // Başarılı mesajı göster veya başka bir işlem yap
      }
    });
  }

  patchForm(user: any) {
    if (!user) return;
    this.form.patchValue({
      Id: user.Id ?? null,
      GuidId: user.GuidId ?? '',
      UserName: user.UserName ?? '',
      FirstName: user.FirstName ?? '',
      LastName: user.LastName ?? '',
      Email: user.Email ?? '',
      PhoneNumber: user.PhoneNumber ?? '',
      RoleId: user.RoleId ?? null,
      IsActive: user.IsActive ?? true,
      // ClientId: user.ClientId ?? null
      // Password ve PasswordConfirmation patchlenmez (güvenlik için)
    });
  }

  goBack() {
    this._router.navigate(['/users']);
  }
}
