import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { InvoiceCreateDto, InvoiceItemCreateDto } from '../models/create-invoice-dto.model';
import { MenuItem, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { FormDataService } from '../services/form-data.service';
import { FormGroup } from '@angular/forms';
import { RecipientComponent } from './recipient/recipient.component';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.scss'
})
export class CreateInvoiceComponent implements OnInit{

  /**
   *
   */
  currentStepIndex = 0;
currentStepForm: FormGroup | null = null;
  constructor(private router: Router, private route: ActivatedRoute, private formData: FormDataService, private messageService: MessageService, private invoiceService: InvoiceService) {
    
  }

    routeItems: MenuItem[] = [];
 protected readonly _invoiceService:InvoiceService=inject(InvoiceService);
  ngOnInit(): void {

    this.router.navigate(['recipient'], { relativeTo: this.route });
//     const invoice: InvoiceCreateDto = {
//   invoiceDate: new Date().toISOString(),
//   invoiceNumber: 'arv',
//   customerId: 0,
//   items: [],
//   totalAmount: 0,
//   status: 1
// };
    // this._invoiceService.createEntity(invoice).subscribe((res) => {
    //   alert(res.Entity)
    // })

     
      this.routeItems = [
            { label: 'Alıcı Bilgileri', routerLink:'recipient' },
            { label: 'Fatura Bilgileri', routerLink:'invoice-information'},
            { label: 'Ürün ve Hizmetler', routerLink:'invoice-product'},
            // { label: 'Confirmation', routerLink: 'confirmation' },
        ];
  }
  

  goNext() {
 if (this.currentStepForm?.invalid) {
    this.currentStepForm.markAllAsTouched();
    this.messageService.add({
      severity: 'warn',
      summary: 'Eksik Bilgi',
      detail: 'Lütfen gerekli alanları doldurun.',
      life:3000
    });
    return;
  }

  if (this.currentStepIndex < this.routeItems.length - 1) {
    this.currentStepIndex++;
        this.router.navigate([this.routeItems[this.currentStepIndex].routerLink], {relativeTo: this.route});
  }

}

goBack() {
  if (this.currentStepIndex > 0) {
    this.currentStepIndex--;
      this.router.navigate([this.routeItems[this.currentStepIndex].routerLink], {relativeTo: this.route});
  }
}


onStepActivate(componentInstance: any) {
  if (componentInstance.formReady) {
    componentInstance.formReady.subscribe((form: FormGroup) => {
      this.currentStepForm = form;
    });
  }
}

// completeTask(){
//   let model: InvoiceCreateDto;
//   model.invoiceNumber= "q";
//   model.customerId= 1;
//   model.invoiceDate = new Date().toISOString();
//   model.status = 1;
//   model.totalAmount = 10000;
//   model.items.push(new InvoiceItemCreateDto());

//   this.invoiceService.createEntity(model).subscribe((res) => {
//     console.log(res);
//   })
// }
}
