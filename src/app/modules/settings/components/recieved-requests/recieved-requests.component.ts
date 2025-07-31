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

interface RequestItem {
  id: number;
  userName: string;
  userEmail: string;
  userAvatar: string;
  requestType: 'access' | 'permission' | 'feature' | 'support';
  requestTitle: string;
  requestDescription: string;
  requestDate: Date;
  status: 'pending' | 'approved' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  department?: string;
}

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

  requests: RequestItem[] = [];
  filteredRequests: RequestItem[] = [];
  selectedStatus: string = 'all';
  selectedPriority: string = 'all';
  selectedType: string = 'all';

  statusOptions = [
    { label: 'Tümü', value: 'all' },
    { label: 'Bekleyen', value: 'pending' },
    { label: 'Onaylanan', value: 'approved' },
    { label: 'Reddedilen', value: 'rejected' }
  ];

  priorityOptions = [
    { label: 'Tümü', value: 'all' },
    { label: 'Düşük', value: 'low' },
    { label: 'Orta', value: 'medium' },
    { label: 'Yüksek', value: 'high' }
  ];

  typeOptions = [
    { label: 'Tümü', value: 'all' },
    { label: 'Erişim', value: 'access' },
    { label: 'İzin', value: 'permission' },
    { label: 'Özellik', value: 'feature' },
    { label: 'Destek', value: 'support' }
  ];

  ngOnInit() {
    this.loadRequests();
    this.filterRequests();
  }

  loadRequests() {
    this.requests = [
      {
        id: 1,
        userName: 'Ahmet Yılmaz',
        userEmail: 'ahmet.yilmaz@company.com',
        userAvatar: 'AY',
        requestType: 'access',
        requestTitle: 'Sistem Erişim Talebi',
        requestDescription: 'Muhasebe modülüne erişim talep ediyorum. Günlük raporları görüntülemek için gerekli.',
        requestDate: new Date('2024-01-15'),
        status: 'pending',
        priority: 'high',
        department: 'Muhasebe'
      },
      {
        id: 2,
        userName: 'Fatma Demir',
        userEmail: 'fatma.demir@company.com',
        userAvatar: 'FD',
        requestType: 'permission',
        requestTitle: 'Dosya Yükleme İzni',
        requestDescription: 'Proje dosyalarını sisteme yükleyebilmek için gerekli izinleri talep ediyorum.',
        requestDate: new Date('2024-01-14'),
        status: 'pending',
        priority: 'medium',
        department: 'Proje Yönetimi'
      },
      {
        id: 3,
        userName: 'Mehmet Kaya',
        userEmail: 'mehmet.kaya@company.com',
        userAvatar: 'MK',
        requestType: 'feature',
        requestTitle: 'Yeni Raporlama Özelliği',
        requestDescription: 'Satış raporlarında grafik görünümü eklenmesini talep ediyorum.',
        requestDate: new Date('2024-01-13'),
        status: 'approved',
        priority: 'low',
        department: 'Satış'
      },
      {
        id: 4,
        userName: 'Zeynep Özkan',
        userEmail: 'zeynep.ozkan@company.com',
        userAvatar: 'ZÖ',
        requestType: 'support',
        requestTitle: 'Teknik Destek Talebi',
        requestDescription: 'E-posta entegrasyonunda sorun yaşıyorum. Yardım talep ediyorum.',
        requestDate: new Date('2024-01-12'),
        status: 'rejected',
        priority: 'high',
        department: 'İnsan Kaynakları'
      },
      {
        id: 5,
        userName: 'Can Arslan',
        userEmail: 'can.arslan@company.com',
        userAvatar: 'CA',
        requestType: 'access',
        requestTitle: 'Admin Paneli Erişimi',
        requestDescription: 'Sistem yönetimi için admin paneline erişim talep ediyorum.',
        requestDate: new Date('2024-01-11'),
        status: 'pending',
        priority: 'high',
        department: 'IT'
      }
    ];
  }

  filterRequests() {
    this.filteredRequests = this.requests.filter(request => {
      const statusMatch = this.selectedStatus === 'all' || request.status === this.selectedStatus;
      const priorityMatch = this.selectedPriority === 'all' || request.priority === this.selectedPriority;
      const typeMatch = this.selectedType === 'all' || request.requestType === this.selectedType;
      
      return statusMatch && priorityMatch && typeMatch;
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'pending': return 'warning';
      case 'approved': return 'success';
      case 'rejected': return 'danger';
      default: return 'secondary';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'pending': return 'Bekliyor';
      case 'approved': return 'Onaylandı';
      case 'rejected': return 'Reddedildi';
      default: return 'Bilinmiyor';
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'danger';
      default: return 'secondary';
    }
  }

  getPriorityLabel(priority: string): string {
    switch (priority) {
      case 'low': return 'Düşük';
      case 'medium': return 'Orta';
      case 'high': return 'Yüksek';
      default: return 'Bilinmiyor';
    }
  }

  getTypeIcon(type: string): string {
    switch (type) {
      case 'access': return 'pi pi-key';
      case 'permission': return 'pi pi-lock';
      case 'feature': return 'pi pi-star';
      case 'support': return 'pi pi-question-circle';
      default: return 'pi pi-file';
    }
  }

  getTypeLabel(type: string): string {
    switch (type) {
      case 'access': return 'Erişim';
      case 'permission': return 'İzin';
      case 'feature': return 'Özellik';
      case 'support': return 'Destek';
      default: return 'Diğer';
    }
  }

  approveRequest(request: RequestItem) {
    request.status = 'approved';
    this.filterRequests();
    this.messageService.add({
      severity: 'success',
      summary: 'Onaylandı',
      detail: `${request.userName} isteği onaylandı.`
    });
  }

  rejectRequest(request: RequestItem) {
    request.status = 'rejected';
    this.filterRequests();
    this.messageService.add({
      severity: 'error',
      summary: 'Reddedildi',
      detail: `${request.userName} isteği reddedildi.`
    });
  }

  onStatusChange() {
    this.filterRequests();
  }

  onPriorityChange() {
    this.filterRequests();
  }

  onTypeChange() {
    this.filterRequests();
  }

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

  get pendingCount(): number {
    return this.filteredRequests.filter(r => r.status === 'pending').length;
  }

  get approvedCount(): number {
    return this.filteredRequests.filter(r => r.status === 'approved').length;
  }

  get rejectedCount(): number {
    return this.filteredRequests.filter(r => r.status === 'rejected').length;
  }
}
