import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormDataService } from '../../services/form-data.service';
import { InvoiceCreateDto, InvoiceItemCreateDto } from '../../models/create-invoice-dto.model';
import { InvoiceService } from '../../services/invoice.service';
import { InvoiceStatus, InvoiceTypes, Scenario } from '../../models/invoice.types';

@Component({
  selector: 'app-invoice-product',
  templateUrl: './invoice-product.component.html',
  styleUrl: './invoice-product.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
        transform: 'scale(0.8)'
      })),
      state('*', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      transition('void => *', [
        animate('400ms cubic-bezier(0.4, 0, 0.2, 1)')
      ]),
      transition('* => void', [
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ])
  ]
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
    
    // Kaydedilmiş form verilerini yükle
    const savedData = this.formData.getStepData('invoiceProduct');
    if (savedData) {
      this.productForm.patchValue(savedData);
    }

    // Kaydedilmiş ürün listesini yükle
    const savedProductList = this.formData.getStepData('productList');
    if (savedProductList && Array.isArray(savedProductList)) {
      this.productList = savedProductList;
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
    
    // Ürün listesini kaydet
    this.formData.setStepData('productList', this.productList);
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
resetFormByEditingIndex() {
  this.productForm.reset({ quantity: 0, unitPrice: 0 });
  this.isEditMode = false;
  // this.editingIndex = -1;
}

onUnitPriceInput(event: any) {
  let value = event.target.value;
  
  // Noktalama işaretlerini kaldır
  value = value.replace(/[^\d]/g, '');
  
  // Eğer boşsa 0 yap
  if (!value) {
    value = '0';
  }
  
  // Form control'e set et
  this.productForm.get('unitPrice')?.setValue(parseInt(value), { emitEvent: false });
  
  // Input'u formatla
  event.target.value = this.formatNumber(parseInt(value));
}

formatNumber(value: number | null | undefined): string {
  if (!value) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

onKeyPress(event: KeyboardEvent) {
  // Sadece sayı tuşlarına izin ver (0-9)
  const pattern = /[0-9]/;
  const inputChar = String.fromCharCode(event.charCode);
  
  if (!pattern.test(inputChar)) {
    event.preventDefault();
  }
}

// Fiyat hesaplama methodları
getTotalAmount(): number {
  if (!Array.isArray(this.productList)) {
    return 0;
  }
  
  return this.productList.reduce((total, product) => {
    const quantity = product.quantity || 0;
    const unitPrice = product.unitPrice || 0;
    return total + (quantity * unitPrice);
  }, 0);
}

getTotalVAT(): number {
  if (!Array.isArray(this.productList)) {
    return 0;
  }
  
  return this.productList.reduce((total, product) => {
    const quantity = product.quantity || 0;
    const unitPrice = product.unitPrice || 0;
    
    // vatRate bir obje olarak saklanıyor, value'sunu al
    const vatRate = product.vatRate?.value || 0;
    
    const subtotal = quantity * unitPrice;
    const vatAmount = subtotal * vatRate / 100;
    
    return total + vatAmount;
  }, 0);
}

getTotalWithVAT(): number {
  return this.getTotalAmount() + this.getTotalVAT();
}

// Tablo gösterimi için label methodları
getUnitLabel(unit: any): string {
  if (typeof unit === 'string') return unit;
  return unit?.label || '';
}

getVatRateLabel(vatRate: any): string {
  if (typeof vatRate === 'string') return vatRate;
  return vatRate?.label || '';
}

// Tekil ürün hesaplama methodları
getProductVATAmount(product: any): number {
  const quantity = product.quantity || 0;
  const unitPrice = product.unitPrice || 0;
  const vatRate = product.vatRate?.value || 0;
  
  const subtotal = quantity * unitPrice;
  return subtotal * vatRate / 100;
}

getProductTotalAmount(product: any): number {
  const quantity = product.quantity || 0;
  const unitPrice = product.unitPrice || 0;
  const vatAmount = this.getProductVATAmount(product);
  
  const subtotal = quantity * unitPrice;
  return subtotal + vatAmount;
}

deleteProduct(index: number) {
  this.deleteProductDialog = true;
  this.index = index;
}

confirmDelete(){
   this.deleteProductDialog = false;
   this.productList.splice(this.index, 1);
   
   // Ürün listesini kaydet
   this.formData.setStepData('productList', this.productList);
   
    if (this.isEditMode && this.editingIndex === this.index) {
     this.resetFormByEditingIndex();
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
