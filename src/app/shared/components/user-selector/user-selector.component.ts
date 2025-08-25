import { Component, OnInit } from '@angular/core';
import { UserPreferenceService } from '../../services/user-preference.service';
import { environment } from 'src/app/environments/environment';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AccounterUserSelectionResponseDto } from '../../model/user-selector.model';

interface DropdownOption {
  label: string;
  value: number | null;
}

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss']
})
export class UserSelectorComponent implements OnInit {
  accessibleUsers: AccounterUserSelectionResponseDto;
  selectedUserId: number | null = null;
  isAccounter = true;
  loading = false;
  dropdownOptions: DropdownOption[] = [];

  constructor(private userPreferenceService: UserPreferenceService,
     private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadAccessibleUsers();
  }

  loadAccessibleUsers(): void {
    // Role kontrolü AuthService'den yap, API sonucundan bağımsız
    const roleId = this.authService?.userData?.RoleId;
    this.isAccounter = roleId === 102;
    
    // console.log('🔥 UserSelector isAccounter check:', { roleId, isAccounter: this.isAccounter });
    
    this.loading = true;
    this.userPreferenceService.getAccessibleUsers().subscribe({
      next: (response) => {
        if (response.IsSuccess) {
          this.accessibleUsers = response.Entity;
          this.selectedUserId = response.Entity?.CurrentSelectedUserId || null;
        } else {
          // Fallback test data for development
          // this.accessibleUsers = [
          //   { userId: 1, fullName: 'Ahmet Yılmaz' },
          //   { userId: 2, fullName: 'Mehmet Demir' },
          //   { userId: 3, fullName: 'Ayşe Kaya' }
          // ];
        }
        this.buildDropdownOptions();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading accessible users:', error);
        // Fallback test data
        // this.accessibleUsers = [
        //   { userId: 1, fullName: 'Ahmet Yılmaz' },
        //   { userId: 2, fullName: 'Mehmet Demir' },
        //   { userId: 3, fullName: 'Ayşe Kaya' }
        // ];
        this.buildDropdownOptions();
        this.loading = false;
      }
    });
  }

  buildDropdownOptions(): void {
    this.dropdownOptions = [
      { label: '🏠 Kendi Hesabım', value: null },
      ...this.accessibleUsers.AccessibleUsers.map(user => ({
        label: user.FullName,
        value: user.UserId
      }))
    ];
  }

  getSelectedUserName(): string {
    if (this.selectedUserId === null) {
      return 'Ben';
    }
    
    const user = this.accessibleUsers.AccessibleUsers.find(u => u.UserId === this.selectedUserId);
    return user ? user.FullName.split(' ')[0] : 'Kullanıcı'; // Sadece ilk isim
  }

  onUserChange(event: any): void {
    const newUserId = event.value;
    
    this.userPreferenceService.setSelectedUser({ selectedUserId: newUserId }).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.selectedUserId = newUserId;
        }
      },
      error: (error) => {
        console.error('Error updating selected user:', error);
      }
    });
  }


}