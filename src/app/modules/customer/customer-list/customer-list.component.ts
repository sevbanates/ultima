import { Component, inject, OnInit } from '@angular/core';
import { Customer, CustomerDto } from '../models/customer.models';
import { CustomerService } from '../services/customer.service';
import { Subject, takeUntil } from 'rxjs';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements OnInit {
customers: Array<CustomerDto> = [];
 private _unsubscribeAll: Subject<any> = new Subject<any>();
/**
 *
 */

private readonly _router: Router = inject(Router);
protected readonly _invoiceService:CustomerService=inject(CustomerService);
constructor() {

}
  ngOnInit(): void {
    this._invoiceService._entityList.pipe(takeUntil(this._unsubscribeAll)).subscribe((entityList) => {
      this.customers = entityList;
      console.log(this.customers[0]);
    })
  }


     onGlobalFilter(table: Table, event: Event) {
          table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
      }

      navigateToCreateCustomer(){
      this._router.navigate([`customer/create`]);
      }

      editCustomer(customer: CustomerDto){
         let dd = this._router.navigate([`customer/details/${customer.Id}/${customer.GuidId}`]);
      }
}
