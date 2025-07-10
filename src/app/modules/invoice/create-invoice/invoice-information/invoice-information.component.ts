import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-invoice-information',
  templateUrl: './invoice-information.component.html',
  styleUrl: './invoice-information.component.scss'
})
export class InvoiceInformationComponent {
 form!: FormGroup;

  warehouses = [{ label: 'Merkez Depo', value: 'merkez' }];
  currencies = [{ label: 'TRY - Türk Lirası', value: 'TRY' }];
  invoiceTypes = [{ label: 'Satış', value: 'satis' }];
  scenarios = [{ label: 'E-Arşiv Fatura', value: 'earsiv' }];
  archiveTypes = [{ label: 'Elektronik', value: 'elektronik' }];
  serials = [{ label: 'E-Arşiv Fatura - EAR', value: 'EAR' }];

  constructor(private fb: FormBuilder, private formData: FormDataService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      invoiceDate: [new Date()],
      warehouse: [null],
      currency: [null],
      invoiceType: [null],
      scenario: [null],
      archiveType: [null],
      serial: [null],
      note: ['']
    });

   const savedData = this.formData.getStepData('fatura');
    if (savedData) {
      this.form.patchValue(savedData);
    }

    this.form.valueChanges.subscribe(val => {
      this.formData.setStepData('fatura', val);
    });
  }
}
