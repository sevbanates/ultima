import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit, OnDestroy{

    rememberMe: boolean = false;
    signInForm: UntypedFormGroup;
 protected readonly _formBuilder:UntypedFormBuilder=inject(UntypedFormBuilder);
protected readonly _router:Router=inject(Router);
 private _unsubscribeAll: Subject<any> = new Subject<any>();
 protected readonly _authService:AuthService=inject(AuthService);
     protected readonly _activatedRoute:ActivatedRoute=inject(ActivatedRoute);
      @ViewChild('signInNgForm') signInNgForm: NgForm;
    showAlert: boolean = false;

       ngOnInit(): void {
    this.initForm();
  }
        initForm(){
        this.signInForm = this._formBuilder.group({
            UserName     : ['admin', [Validators.required, Validators.minLength(2)]],
            Password  : ['sa123', Validators.required],
            RememberMe: ['']
        });
    }



      signInConfirmCode(): void{

        if ( this.signInForm.invalid )
            return;

        this.signInForm.disable();
        this.showAlert = false;

        this._authService
        .signInConfirmCode(this.signInForm.value)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(
            (res) => {

                const redirectURL =
                    this._activatedRoute.snapshot.queryParamMap.get(
                        'redirectURL'
                    ) || '/signed-in-redirect';
                this._router.navigateByUrl(redirectURL);


                if (res.Entity.IsUser && !res.Entity?.LastLoginTime) {
                    // this.openClientInfoDialog();
                }


            },
            (response) => {
                // this.verificationForm.enable();
                // this.verificationNgForm.resetForm();
                this.signInForm.enable();
                this.signInNgForm.form.controls['Password'].setValue('');
                // this.alert = {
                //     type: 'error',
                //     message: 'Wrong user name or password'
                // };

                this.showAlert = true;
            }
        );
      
    }
  ngOnDestroy(): void
    {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}


