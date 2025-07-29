import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PagedAndSortedResponse } from 'src/app/core/models/response-model';
import { DefaultUserListRequestModel, UserBasicDto } from '../../models/user-list-model';
import { Table } from 'primeng/table';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users: Array<UserBasicDto> = [];
  pagination: PagedAndSortedResponse<any>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private readonly _router: Router = inject(Router);
  protected readonly _userService: UserService = inject(UserService);
  protected readonly _changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  requestModel: DefaultUserListRequestModel = new DefaultUserListRequestModel();
  selectedUser: UserBasicDto | null = null;
  deleteUserDialog: boolean = false;

  ngOnInit(): void {
    this.getPagination();
    this.getEntityPage();
    this._userService._entityList.pipe(takeUntil(this._unsubscribeAll)).subscribe((entityList) => {
      this.users = entityList;
    })
  }

  getEntityPage() {
    // this.isLoading = true;
    // if (this.pageType > 0) {
    //   this.requestModel.Statuses = [this.pageType];
    // }
    return this._userService.getEntityPage(this.requestModel).subscribe(() => {
      // this.isLoading = false;
    });
  }


  getPagination() {
    this._userService.pagination$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((pagination) => {
        this.pagination = pagination;
        this._changeDetectorRef.markForCheck();
      });
  }

  onPageChange(event: any) {
    this.requestModel.Limit = event.rows;
    this.requestModel.Page = event.page + 1;
    this.getEntityPage();
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
  }

  navigateToCreateUser() {
    this._router.navigate([`users/create`]);
  }

  editUser(user: UserBasicDto) {
    this._router.navigate([`users/details/${user.Id}/${user.GuidId}`]);
  }

  openDeleteUserDialog(user: UserBasicDto) {
    this.selectedUser = user;
    this.deleteUserDialog = true;
  }

  closeDeleteUserDialog() {
    this.deleteUserDialog = false;
    this.selectedUser = null;
  }

  confirmDeleteUser() {
    // Servis ile silme işlemini burada yapacaksın
    // this._invoiceService.deleteEntity(this.selectedCustomer.Id, this.selectedCustomer.GuidId).subscribe(() => {...})
    this.closeDeleteUserDialog();
  }
}
