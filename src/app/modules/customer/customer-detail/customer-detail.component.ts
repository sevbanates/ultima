import { Component, inject, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerAndCityModel } from '../models/customer.types';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss'
})
export class CustomerDetailComponent implements OnInit {

  form!: FormGroup;
  countryCityModel: CustomerAndCityModel;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  protected readonly _customerService: CustomerService = inject(CustomerService);
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private _entityData: any = null;
  submitted = false;

  ngOnInit(): void {
    this.initForm();
    this._route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      const guidId = params.get('guidid');
      if (id && id > 0) {
        this._customerService.getEntityById(id, guidId)
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((response) => {
            this._entityData = response?.Entity;
            this.tryPatchForm();
          });
      }
    });
    this._customerService.getCountryAndCities()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response) => {
        this.countryCityModel = response.Entity;
        this.tryPatchForm();
      });
  }

  tryPatchForm() {
    if (!this._entityData || !this.countryCityModel?.Countries) return;
    const countryObj = this.countryCityModel.Countries.find(
      c => c.Value === this._entityData.Country
    );
    this.form.patchValue({
      ...this._entityData,
      Country: countryObj ? countryObj.Value : null
    });
  }

  initForm() {
    this.form = this._formBuilder.group({
      Id: [0],
      GuidId: [],
      Name: [, Validators.required],
      Surname: [, Validators.required],
      VknTckn: [, [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      Email: [, [Validators.required, Validators.email]],
      Phone: [, Validators.required],
      Country: [, Validators.required],
      City: [, Validators.required],
      District: [, Validators.required],
      FullAddress: [],
      BuildingName: [],
      BuildingNumber: [],
      FloorNumber: [],
      DoorNumber: [],
      PostalCode: [],
      AddressDescription: [],
      CreDate: [],
    });
  }

  countryChange(event: any) {
    this.form.controls['Country'].setValue(event.value);
  }

  save() {
    this.submitted = true;
    if (this.form.invalid) return;
    const formValue = { ...this.form.value };
    // Country nesne ise sadece Value'sunu gönder
    if (formValue.Country && typeof formValue.Country === 'object' && 'Value' in formValue.Country) {
      formValue.Country = formValue.Country.Value;
    }
    if (formValue.Id && formValue.Id > 0) {
      // Update
      this._customerService.updateEntity(formValue.Id, formValue).subscribe(() => {
        this._router.navigate(['/customer']);
      });
    } else {
      // Create
      this._customerService.createEntity(formValue).subscribe(() => {
        this._router.navigate(['/customer']);
      });
    }
  }
}
