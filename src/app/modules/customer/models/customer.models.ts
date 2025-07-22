import { BaseModel } from "src/app/core/models/base-model";

export interface Customer extends BaseModel {
  GuidId:string;

  name: string;
  surname: string;
  vknTckn: string;
  isCompany: boolean;

  // İletişim Bilgileri
  email?: string;
  phone?: string;
  mobilePhone?: string;

  // Adres Bilgileri
  country?: string;
  city?: string;
  district?: string;
  fullAddress?: string;

  buildingName?: string;
  buildingNumber?: string;
  floorNumber?: string;
  doorNumber?: string;

  postalCode?: string;
  addressDescription?: string;

  // Fatura ilişkisi burada tutulmayabilir ama eklemek istersen:
  invoices?: any[]; // veya Invoice[] tipi kullanabilirsin
}
export interface CustomerDto extends BaseModel {
  GuidId: string;

  Name: string;
  Surname: string;
  VknTckn: string;
  IsCompany: boolean;
  Title?: string;

  // İletişim Bilgileri
  Email?: string;
  Phone?: string;
  MobilePhone?: string;

  // Adres Bilgileri
  Country?: string;
  City?: string;
  District?: string;
  FullAddress?: string;

  BuildingName?: string;
  BuildingNumber?: string;
  FloorNumber?: string;
  DoorNumber?: string;

  PostalCode?: string;
  AddressDescription?: string;

  CreDate: Date;
  // Fatura ilişkisi burada tutulmayabilir ama eklemek istersen:
}

