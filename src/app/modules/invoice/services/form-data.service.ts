import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private data: { [key: string]: any } = {};

  setStepData(step: string, formValue: any): void {
    this.data[step] = formValue;
  }

  getStepData(step: string): any {
    return this.data[step] || {};
  }

  getAllData(): any {
    return this.data;
  }

  reset(): void {
    this.data = {};
  }

  
}
