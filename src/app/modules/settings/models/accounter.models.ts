export interface AccounterRequestDto {
    Id: number;
    GuidId: string;
    TargetFullName: string;
    Status: AccounterRequestStatus;
    CreDate: Date;
  }

  export enum AccounterRequestStatus {
    Draft = 1,
    Approved = 2,
    Rejected = 3,
    Canceled = 4
  }

  export interface CreateAccounterRequestDto {
    TargetEmail: string;
  }

  export interface ChangeAccounterRequestStatusDto {
    Id: number;
    GuidId: string;
    Status: AccounterRequestStatus;
  }