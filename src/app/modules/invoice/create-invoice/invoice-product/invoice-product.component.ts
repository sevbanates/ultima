import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-invoice-product',
  templateUrl: './invoice-product.component.html',
  styleUrl: './invoice-product.component.scss'
})
export class InvoiceProductComponent implements OnInit {
productForm!: FormGroup;
deleteProductDialog: boolean = false;
index: number;
  constructor(private fb: FormBuilder, private formData: FormDataService) {
    
  }
  ngOnInit(): void {

    this.productForm = this.fb.group({
  productName: ['', Validators.required],
  productCode: [''],
  quantity: [1, Validators.required],
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
  { label: '%1', value: 1 },
  { label: '%8', value: 8 },
  { label: '%18', value: 18 },
  { label: '%20', value: 20 },
];

productList: any[] = [];


addProduct() {
  if (this.productForm.valid) {
    this.productList.push(this.productForm.value);
    this.productForm.reset({ quantity: 1, unitPrice: 0 });
  }
}

editProduct(index: number) {
  const selected = this.productList[index];
  this.productForm.patchValue(selected);
  this.productList.splice(index, 1);
}

deleteProduct(index: number) {
  this.deleteProductDialog = true;
  this.index = index;
}

confirmDelete(){
   this.deleteProductDialog = false;
   this.productList.splice(this.index, 1);
}

}
