import { Component, inject, OnInit } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { InvoiceCreateDto } from '../models/create-invoice-dto.model';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private router: Router, private route: ActivatedRoute) {
    
  }

    routeItems: MenuItem[] = [];
 protected readonly _invoiceService:InvoiceService=inject(InvoiceService);
  ngOnInit(): void {

    this.router.navigate(['recipient'], { relativeTo: this.route });
    const invoice: InvoiceCreateDto = {
  invoiceDate: new Date().toISOString(),
  InvoiceNumber: 'arv',
  customerId: 0,
  items: [],
  totalAmount: 0,
  status: 1
};
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

}
