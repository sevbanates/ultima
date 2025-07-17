import { Component, inject, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Subject, takeUntil } from 'rxjs';
import { CustomerDto } from '../models/customer.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerAndCityModel } from '../models/customer.types';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss'
})
export class CustomerDetailComponent implements OnInit {
 
entity: CustomerDto;
form!: FormGroup;
countryCityModel: CustomerAndCityModel;
private _unsubscribeAll: Subject<any> = new Subject<any>();
protected readonly _customerService:CustomerService=inject(CustomerService);
 private readonly _formBuilder: FormBuilder = inject(FormBuilder);

  /**
   *
   */
  constructor() {
     this._customerService.getCountryAndCities().pipe(takeUntil(this._unsubscribeAll)).subscribe((response) => {
      this.countryCityModel = response.Entity;
    });
  }

   ngOnInit(): void {

   
   this._customerService._entity.pipe(takeUntil(this._unsubscribeAll)).subscribe((entity) => {
         this.entity = entity;
         })
         if (this.entity?.Id > 0) {
          this.initForm();
         }
         else{
          this.initForm2();
         }
  }
initForm() {
        // const passwordValidators = !this.entity?.Id ? [Validators.required, Validators.minLength(6), Validators.maxLength(20)] : [];
        // const passwordConfirmationValidators = !this.entity?.Id ? [Validators.required, Validators.minLength(6), Validators.maxLength(20)] : [];
        this.form = this._formBuilder.group({

            Id: [this.entity?.Id,],
            GuidId: [this.entity?.GuidId],
            Name: [this.entity?.Name, Validators.required],
            Surname: [this.entity?.Surname, Validators.required],
            VknTckn: [this.entity?.VknTckn, [Validators.required, Validators.maxLength(11), Validators.minLength(10)]],
            Email: [this.entity?.Email, [Validators.required, Validators.email]],
            Phone: [this.entity?.Phone, Validators.required],
            Country: [this.entity?.Country, Validators.required],
            City: [this.entity?.City, Validators.required],
            District: [this.entity?.District, Validators.required],
            FullAddress: [this.entity?.FullAddress],

            BuildingName: [this.entity?.BuildingName],
            BuildingNumber: [this.entity?.BuildingNumber],
            FloorNumber: [this.entity?.FloorNumber],
            DoorNumber: [this.entity?.DoorNumber],
            PostalCode: [this.entity?.PostalCode],
            AddressDescription: [this.entity?.AddressDescription],
            CreDate: [this.entity?.CreDate],

        });

    }

    initForm2() {
        
        this.form = this._formBuilder.group({

            Id: [0,],
            GuidId: [],
            Name: [, Validators.required],
            Surname: [, Validators.required],
            VknTckn: [, [Validators.required, Validators.maxLength(11), Validators.minLength(10)]],
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

    countryChange(event: any){
      debugger
      this.form.controls['Country'].setValue(event.value.Value);
    }
}
