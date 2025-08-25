export class AccounterAccessibleUserDto {
    UserId: number;
    FirstName: string;
    LastName: string;
    FullName: string;
    Email: string;
    IsSelected: boolean;

    }

    export class AccounterUserSelectionResponseDto {
      AccessibleUsers: AccounterAccessibleUserDto[] = [];
      CurrentSelectedUserId: number | null = null;
      
      }