import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  APIResponse,
  EarnedLeave,
  Employee,
  LeaveRequest,
} from '../model/master';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  apiUrl: string = 'https://projectapi.gerasim.in/api/EmployeeManagement/';
  loggedUserData: any;

  constructor(private http: HttpClient) {
    const localDate = localStorage.getItem('leaveUser');
    if (localDate) {
      this.loggedUserData = JSON.parse(localDate);
    }
  }

  getParentDepartment(): Observable<APIResponse> {
    return this.http.get<APIResponse>(this.apiUrl + 'GetParentDepartment');
  }

  getChildDepartmentByParentId(id: string): Observable<APIResponse> {
    return this.http.get<APIResponse>(
      this.apiUrl + 'GetChildDepartmentByParentId?deptId=1'
    );
  }

  createNewEmployee(obj: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}CreateEmployee`, obj);
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl + 'GetAllEmployees');
  }

  getAllChildEmployees(): Observable<APIResponse> {
    return this.http.get<APIResponse>(this.apiUrl + 'GetAllChildEmployees');
  }

  deleteEmp(id: Number): Observable<Employee[]> {
    return this.http.delete<Employee[]>(this.apiUrl + 'DeleteEmployee/' + id);
  }

  udpateEmp(emp: Employee): Observable<Employee> {
    return this.http.put<Employee>(
      this.apiUrl + 'UpdateEmployee/' + emp.employeeId,
      emp
    );
  }

  addFarnedLeave(emp: EarnedLeave): Observable<APIResponse> {
    return this.http.post<APIResponse>(this.apiUrl + 'AddNewEarnedLeave/', emp);
  }

  getAllEarnedLeaves(): Observable<APIResponse> {
    return this.http.get<APIResponse>(this.apiUrl + 'GetAllEarnedLeaves');
  }

  getLeaveType(): Observable<APIResponse> {
    return this.http.get<APIResponse>(this.apiUrl + 'GetLeaveTypes');
  }

  newRequest(emp: LeaveRequest): Observable<APIResponse> {
    return this.http.post<APIResponse>(
      this.apiUrl + 'CreateNewLeaveRequest/',
      emp
    );
  }

  getAllLeaveRequestByEmpId(id: number): Observable<APIResponse> {
    return this.http.get<APIResponse>(
      this.apiUrl + 'GetAllLeaveRequestByEmpId?id=' + id
    );
  }

  getAllLeaveRequest(): Observable<APIResponse> {
    return this.http.get<APIResponse>(this.apiUrl + 'GetAllLeaveRequest');
  }

  changeLeaveReq(leaveid: number, status: string): Observable<APIResponse> {
    return this.http.get<APIResponse>(
      this.apiUrl + 'ChangeLeaveStatus?leaveId=' + leaveid + '&status=' + status
    );
  }
}
