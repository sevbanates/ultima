import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormDataService } from '../../services/form-data.service';
import { InvoiceCreateDto, InvoiceItemCreateDto } from '../../models/create-invoice-dto.model';
import { InvoiceService } from '../../services/invoice.service';
import { InvoiceStatus, InvoiceTypes, Scenario } from '../../models/invoice.types';

@Component({
  selector: 'app-invoice-product',
  templateUrl: './invoice-product.component.html',
  styleUrl: './invoice-product.component.scss'
})
export class InvoiceProductComponent implements OnInit {
productForm!: FormGroup;
deleteProductDialog: boolean = false;
index: number;
isEditMode: boolean = false;
editingIndex: number = -1;

  constructor(private fb: FormBuilder, private formData: FormDataService, private invoiceService: InvoiceService) {
    
  }
  ngOnInit(): void {

    this.productForm = this.fb.group({
  productName: ['', Validators.required],
  // productCode: [''],
  quantity: [0, Validators.required],
  unit: ['', Validators.required],
  vatRate: ['', Validators.required],
  unitPrice: [0, Validators.required],
});
    const savedData = this.formData.getStepData('invoiceProduct');
    if (savedData) {
      this.productForm.patchValue(savedData);
    }

      this.productForm.valueChanges.subscribe(value => {
   this.formData.setStepData('invoiceProduct', value);
  });

  }


units = [
  { label: 'Adet', value: 'Adet' },
  { label: 'Kg', value: 'Kg' },
  { label: 'Litre', value: 'Litre' },
];

vatRates = [
  { label: '%0', value: 0 },
  { label: '%1', value: 1 },
  { label: '%10', value: 10 },
  { label: '%20', value: 20 },
];

productList: any[] = [];


addProduct() {
  if (this.productForm.valid) {
    if (this.isEditMode) {
      // Update existing product
      this.productList[this.editingIndex] = this.productForm.value;
      this.resetForm();
    } else {
      // Add new product
      this.productList.push(this.productForm.value);
      this.productForm.reset({ quantity: 0, unitPrice: 0 });
    }
  }
}

editProduct(index: number) {
  const selected = this.productList[index];
  this.productForm.patchValue(selected);
  this.isEditMode = true;
  this.editingIndex = index;
}

resetForm() {
  this.productForm.reset({ quantity: 0, unitPrice: 0 });
  this.isEditMode = false;
  this.editingIndex = -1;
}

deleteProduct(index: number) {
  this.deleteProductDialog = true;
  this.index = index;
}

confirmDelete(){
   this.deleteProductDialog = false;
   this.productList.splice(this.index, 1);
   if (this.isEditMode) {
    this.resetForm();
   }
}

completeTask(){
  let model: InvoiceCreateDto = {
    InvoiceNumber: "q",
InvoiceDate : new Date().toISOString(),
Status : InvoiceStatus.Draft,
TotalAmount : 10000,
Items: [],
Address:'',
City:'',
Country:'',
Currency:1,
DeliveryAddress:'sad',
District:'sds',
FirstName:'asdas',
InvoiceType:0,
LastName:'asd',
Note:'sad',
Scenario:0,
TaxOffice:'asd',
Telephone:'asd',
Vkn:123,
  };
 

  this.invoiceService.createEntity(model).subscribe((res) => {
    console.log(res);
  })
}

beforeSave(){
  const recipient = this.formData.getStepData('recipient');
const invoiceInfo = this.formData.getStepData('invoiceInfo');
const invoiceDetails = this.formData.getStepData('invoiceDetails');
}

}
