import { PagedAndSortedSearchInput } from "src/app/core/models/request-model";

export interface ControllerListRequestModel extends PagedAndSortedSearchInput{
}

export interface ControllerActionRole {
    Id: number;
    Controller: string;
    ActionName: string;
    ActionNo: number;
    RoleId: number;
    
}

export interface ControllerModel {
    ControllerName: string;
    RoleId:number;
    Actions:Array<ControllerActionModel>    
}

export interface ControllerActionModel  {
    ActionName: string;
    ActionNo: number;
    Active:boolean;
}