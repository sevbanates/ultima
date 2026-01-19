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
  selectedCustomer: CustomerSelectModel | undefined = undefined;

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
      // deliveryAddress: ['']
    });
    this.formReady.emit(this.form);

    // Müşteri listesini çek
    this.invoiceService.getCustomers().subscribe(res => {
      this.customers = res.Entity || [];
      
      // Müşteri listesi yüklendikten sonra kaydedilen seçimi geri yükle
      this.restoreSelectedCustomer();
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
    
    // Seçilen müşteriyi kaydet
    this.formDataService.setStepData('selectedCustomer', customer);
  }

  private restoreSelectedCustomer(): void {
    const savedCustomer = this.formDataService.getStepData('selectedCustomer');
   
    if (savedCustomer && savedCustomer.Id && this.customers.length > 0) {
      // Kaydedilen müşteriyi mevcut listede bul
      const foundCustomer = this.customers.find(c => c.Id === savedCustomer.Id);
      
      if (foundCustomer) {
        this.selectedCustomer = foundCustomer;
       
      } else {
      }
    } else {
      
    }
  }

  getForm(): FormGroup {
    return this.form;
  }
}
