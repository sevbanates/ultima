import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormDataService } from '../../services/form-data.service';
import { CustomerService } from '../../../customer/services/customer.service';
import { CustomerDto } from '../../../customer/models/customer.models';
import { SelectNumberModel } from 'src/app/core/models/utility-model';
import { InvoiceService } from '../../services/invoice.service';
import { CustomerSelectModel } from 'src/app/modules/customer/models/customer.types';

@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrl: './recipient.component.scss'
})
export class RecipientComponent implements OnInit {
  form!: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();

  customers: CustomerSelectModel[] = [];
  selectedCustomer: CustomerSelectModel | null = null;

  constructor(
    private fb: FormBuilder,
    private formDataService: FormDataService,
    private customerService: CustomerService,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      vkn: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      title: [''],
      taxOffice: [''],
      address: [''],
      deliveryAddress: ['']
    });
    this.formReady.emit(this.form);

    // Müşteri listesini çek
    this.invoiceService.getCustomers().subscribe(res => {
      this.customers = res.Entity || [];
    });

    const savedData = this.formDataService.getStepData('recipient');
    if (savedData) {
      this.form.patchValue(savedData);
    }

    this.form.valueChanges.subscribe((value) => {
      this.formDataService.setStepData('recipient', value);
    });
  }

  onCustomerSelect(customer: CustomerSelectModel) {
    this.selectedCustomer = customer;
    this.form.patchValue({
      vkn: customer.VknTckn,
      firstName: customer.Name,
      lastName: customer.Surname,
      title: customer.IsCompany ? (customer.Title || '') : ''
    });
  }

  getForm(): FormGroup {
    return this.form;
  }
}
