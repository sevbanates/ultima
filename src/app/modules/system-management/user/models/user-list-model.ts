import { BaseModel } from "src/app/core/models/base-model";
import { PagedAndSortedSearchInput } from "src/app/core/models/request-model";

export class UserListRequestModel extends PagedAndSortedSearchInput{
    // StartDate?:Date;
    // EndDate?:Date;
    IsActive?:boolean;
    RoleId?:number;
    ClientId?:number;
}


export class DefaultUserListRequestModel extends UserListRequestModel{

    constructor() {
        super();
        this.Page = 1;
        this.Limit = 10;
        this.SortExpression =  "UserName"+":"+"desc";
        this.Search = "";
        this.IsActive= true;
    }
}


export interface User extends BaseModel {
    Id: number;
    GuidId: string;
    CompanyId: number;
    UserName: string;
    FirstName: string;
    Email: string;
    LastName: string;
    PhoneNumber: string;
    Password: string;
    PasswordSalt: string;
    PasswordSalt2: string;
    PasswordConfirmation: string;
    LastIpAddress: string;
    LastLoginTime?: Date;
    RoleName:string;
    IsActive: boolean;
    Token:string;
    RoleId: number;
    IsDeleted?:boolean;
    UserLogoPath?:string;
    IsFirstLogin:boolean;
    CreDate?: Date;
    SecurityTotalList:Array<ControllerActionTotal>;
    ClientId: number|null;

    LastEntryDate?: Date;
    SelselectedRoles: number[];
    ForgetPasswordMail: string;
    VerificationCode: string;
    NewPassword: string;
    NewPassword2: string;
    Selcompanies: number[];
    IsAdmin:boolean;
    IsUser:boolean;

    CanClientEdit:boolean|null;
}


export class UserBasicDto  {
    Id: number;
    GuidId:string;
    FirstName: string;
    LastName: string;
    Email: string;
    PhoneNumber: string;
    UserName: string;
    CreDate: Date;
    RoleId: number;
    IsActive: boolean;
    Photo: string;
    RoleName: string;
    FullName: string;
}



export class UpdateUserDto  {
    Id: number;
    GuidId:string;
    UserName: string;
    FirstName: string;
    LastName: string;
    Email: string;
    PhoneNumber: string;
    RoleId: number;
    IsActive: boolean;

}
export class CreateUserDto  {
    UserName: string;
    FirstName: string;
    LastName: string;
    Email: string;
    PhoneNumber: string;
    Password:string;
    PasswordConfirmation:string;
    RoleId: number;
    IsActive: boolean;
    // ClientId: number|null;

}

export class LoginModel{
    UserName:string;
    Password:string;
}
export class ResetPasswordModel{
    Password:string;
    ConfirmPassword:string;
    Token:string;
}

export class ControllerActionTotal{
    Id:number;
    Total:number;
    Controller:string;
    RoleKey:number;
}
export class LoginUserInfo{
    UserId:number;
    Email:string;
}
export class ForgotPasswordModel{
    Email:string;
}

export class LoginModelCode{
    UserId:number;
    Code:string;
}

export class UserChangePasswordDto  {
    GuidId: string;
    Password: string;
    PasswordConfirmation: string;
}




