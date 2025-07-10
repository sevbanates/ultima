import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrl: './recipient.component.scss'
})
export class RecipientComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder,  private formDataService: FormDataService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      vkn: [''],
      firstName: [''],
      lastName: [''],
      title: [''],
      taxOffice: [''],
      address: [''],
      deliveryAddress: ['']
    });

    const savedData = this.formDataService.getStepData('recipient');
    if (savedData) {
      this.form.patchValue(savedData);
    }

     this.form.valueChanges.subscribe((value) => {
      this.formDataService.setStepData('recipient', value);
    });
  
  }
}
