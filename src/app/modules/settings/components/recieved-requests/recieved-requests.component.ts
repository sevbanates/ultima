import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SettingsService } from '../../services/settings.service';
import { AccounterRequestDto, AccounterRequestStatus } from '../../models/accounter.models';

// AccounterRequestDto'yu kullanacağız, interface kaldırıldı

@Component({
  selector: 'app-recieved-requests',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    BadgeModule,
    AvatarModule,
    AvatarGroupModule,
    TagModule,
    TooltipModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './recieved-requests.component.html',
  styleUrl: './recieved-requests.component.scss'
})
export class RecievedRequestsComponent implements OnInit {

  requests: AccounterRequestDto[] = [];
  filteredRequests: AccounterRequestDto[] = [];
  selectedStatus: string = 'all';
  isLoading: boolean = false;

  statusOptions = [
    { label: 'Tümü', value: 'all' },
    { label: 'Taslak', value: AccounterRequestStatus.Draft.toString() },
    { label: 'Onaylandı', value: AccounterRequestStatus.Approved.toString() },
    { label: 'Reddedildi', value: AccounterRequestStatus.Rejected.toString() },
    { label: 'İptal Edildi', value: AccounterRequestStatus.Canceled.toString() }
  ];

  ngOnInit() {
    this.loadRequests();
  }

  loadRequests() {
    this.isLoading = true;
    this.settingsService.getAccounterRequest().subscribe({
      next: (response) => {
        if (response.IsSuccess && response.EntityList) {
          this.requests = response.EntityList;
          this.filterRequests();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'İstekler yüklenirken hata oluştu.'
          });
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading requests:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'İstekler yüklenirken hata oluştu.'
        });
        this.isLoading = false;
      }
    });
  }

  filterRequests() {
    this.filteredRequests = this.requests.filter(request => {
      const statusMatch = this.selectedStatus === 'all' || request.Status.toString() === this.selectedStatus.toString();
      return statusMatch;
    });
  }

  getStatusColor(status: AccounterRequestStatus): string {
    switch (status) {
      case AccounterRequestStatus.Draft: return 'info';
      case AccounterRequestStatus.Approved: return 'success';
      case AccounterRequestStatus.Rejected: return 'danger';
      case AccounterRequestStatus.Canceled: return 'secondary';
      default: return 'secondary';
    }
  }

  getStatusLabel(status: AccounterRequestStatus): string {
    switch (status) {
      case AccounterRequestStatus.Draft: return 'Taslak';
      case AccounterRequestStatus.Approved: return 'Onaylandı';
      case AccounterRequestStatus.Rejected: return 'Reddedildi';
      case AccounterRequestStatus.Canceled: return 'İptal Edildi';
      default: return 'Bilinmiyor';
    }
  }

  getUserAvatar(name: string): string {
    const names = name.split(' ');
    if (names.length >= 2) {
      return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
    }
    return name.charAt(0).toUpperCase() + (name.charAt(1) || '').toUpperCase();
  }

  approveRequest(request: AccounterRequestDto) {
    // TODO: Backend'e approve request API call'u yapılacak
    request.Status = AccounterRequestStatus.Approved;
    this.settingsService.changeStatus(request).subscribe({
      next: (response) => {
        if (response.IsSuccess) {
          this.loadRequests();
          this.filterRequests();
        }
      }
    });
    
    // this.messageService.add({
    //   severity: 'success',
    //   summary: 'Onaylandı',
    //   detail: `${request.TargetFullName} isteği onaylandı.`
    // });
  }

  rejectRequest(request: AccounterRequestDto) {
    // TODO: Backend'e reject request API call'u yapılacak
    request.Status = AccounterRequestStatus.Rejected;
    this.settingsService.changeStatus(request).subscribe({
      next: (response) => {
        if (response.IsSuccess) {
          this.loadRequests();
          this.filterRequests();
        }
      }
    });
    // this.filterRequests();
    // this.messageService.add({
    //   severity: 'error',
    //   summary: 'Reddedildi',
    //   detail: `${request.TargetFullName} isteği reddedildi.`
    // });
  }

  onStatusChange() {
    this.filterRequests();
  }

  constructor(
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    private settingsService: SettingsService
  ) {}

  get draftCount(): number {
    return this.filteredRequests.filter(r => r.Status === AccounterRequestStatus.Draft).length;
  }

  get approvedCount(): number {
    return this.filteredRequests.filter(r => r.Status === AccounterRequestStatus.Approved).length;
  }

  get rejectedCount(): number {
    return this.filteredRequests.filter(r => r.Status === AccounterRequestStatus.Rejected).length;
  }

  get canceledCount(): number {
    return this.filteredRequests.filter(r => r.Status === AccounterRequestStatus.Canceled).length;
  }
}
