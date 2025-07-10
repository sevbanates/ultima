import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrl: './recipient.component.scss'
})
export class RecipientComponent implements OnInit {
  form!: FormGroup;
@Output() formReady = new EventEmitter<FormGroup>();
  constructor(private fb: FormBuilder,  private formDataService: FormDataService) {}

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

    const savedData = this.formDataService.getStepData('recipient');
    if (savedData) {
      this.form.patchValue(savedData);
    }

     this.form.valueChanges.subscribe((value) => {
      this.formDataService.setStepData('recipient', value);
    });
  
  }

    getForm(): FormGroup {
    return this.form;
  }
}
