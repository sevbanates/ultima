import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Customer, CustomerDto } from '../models/customer.models';
import { CustomerService } from '../services/customer.service';
import { Subject, takeUntil } from 'rxjs';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { PagedAndSortedResponse } from 'src/app/core/models/response-model';
import { DefaultCustomerListRequestModel } from '../models/customer.types';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements OnInit {
  customers: Array<CustomerDto> = [];
  pagination: PagedAndSortedResponse<any>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private readonly _router: Router = inject(Router);
  protected readonly _customerService: CustomerService = inject(CustomerService);
  protected readonly _changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  requestModel: DefaultCustomerListRequestModel = new DefaultCustomerListRequestModel();
  // Delete dialog logic
  deleteCustomerDialog: boolean = false;
  selectedCustomer: CustomerDto | null = null;

  currentPage = 1;
  pageSize = 10;



  ngOnInit(): void {
    this.getPagination();
    this.getEntityPage();
    this._customerService._entityList.pipe(takeUntil(this._unsubscribeAll)).subscribe((entityList) => {
      this.customers = entityList;
    })
  }

  getEntityPage() {
    // this.isLoading = true;
    // if (this.pageType > 0) {
    //   this.requestModel.Statuses = [this.pageType];
    // }
    return this._customerService.getEntityPage(this.requestModel).subscribe(() => {
      // this.isLoading = false;
    });
  }

  onPageChange(event: any) {
    this.requestModel.Limit = event.rows;
    this.requestModel.Page = event.page + 1;
    this.getEntityPage();
  }

  getPagination() {
    this._customerService.pagination$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((pagination) => {
        this.pagination = pagination;
        this._changeDetectorRef.markForCheck();
      });
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
  }

  navigateToCreateCustomer() {
    this._router.navigate([`customer/create`]);
  }

  editCustomer(customer: CustomerDto) {
    this._router.navigate([`customer/details/${customer.Id}/${customer.GuidId}`]);
  }

  // Delete logic
  openDeleteCustomerDialog(customer: CustomerDto) {
    this.selectedCustomer = customer;
    this.deleteCustomerDialog = true;
  }

  closeDeleteCustomerDialog() {
    this.deleteCustomerDialog = false;
    this.selectedCustomer = null;
  }

  confirmDeleteCustomer() {
    // Servis ile silme işlemini burada yapacaksın
    // this._invoiceService.deleteEntity(this.selectedCustomer.Id, this.selectedCustomer.GuidId).subscribe(() => {...})
    this.closeDeleteCustomerDialog();
  }
}
