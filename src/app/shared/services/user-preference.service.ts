import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { ResponseModel } from 'src/app/core/models/response-model';
import { AccounterUserSelectionResponseDto } from '../model/user-selector.model';

@Injectable({
  providedIn: 'root'
})
export class UserPreferenceService {
  private baseUrl = environment.restApiUrl + 'user-preferences';

  constructor(private http: HttpClient) {}

  getAccessibleUsers(): Observable<ResponseModel<AccounterUserSelectionResponseDto>> {
    return this.http.get<ResponseModel<AccounterUserSelectionResponseDto>>(`${this.baseUrl}/accessible-users`);
  }

  setSelectedUser(request: { selectedUserId: number | null }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/set-selected-user`, request);
  }

  getSelectedUserId(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/selected-user-id`);
  }

  initializeSelectedUser(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/initialize-selected-user`, {});
  }
}