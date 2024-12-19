import { MasterService } from './../../services/master.service';
import { Component, inject, OnInit } from '@angular/core';
import {
  APIResponse,
  ChildDept,
  Employee,
  ParentDept,
} from '../../model/master';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit {
  employeeObj: Employee = new Employee();
  parentDeptId: string = '';
  masterSrv = inject(MasterService);
  parentDepartmentList: ParentDept[] = [];
  childDepartmentList: ChildDept[] = [];
  employeeList: Employee[] = [];

  ngOnInit(): void {
    this.loadEmployee();
    this.loadParentDept();
  }

  loadParentDept() {
    this.masterSrv.getParentDepartment().subscribe((res: APIResponse) => {
      this.parentDepartmentList = res.data;
    });
  }

  getAllChild() {
    this.masterSrv.getAllChildEmployees().subscribe((res: APIResponse) => {
      this.childDepartmentList = res.data;
    });
  }

  loadEmployee() {
    this.masterSrv.getAllEmployees().subscribe((res: Employee[]) => {
      this.employeeList = res;
    });
  }

  onEdit(item: Employee) {
    this.employeeObj = item;
    this.getAllChild();
  }

  onDelete(id: number) {
    const isDelete = confirm('Are u Sure Want to Delete');
    if (isDelete) {
      this.masterSrv.deleteEmp(id).subscribe((res: Employee[]) => {
        this.loadEmployee();
      });
    }
  }

  onDeptChange() {
    this.masterSrv
      .getChildDepartmentByParentId(this.parentDeptId)
      .subscribe((res: APIResponse) => {
        this.childDepartmentList = res.data;
      });
  }

  onSaveEmployee() {
    this.masterSrv
      .createNewEmployee(this.employeeObj)
      .subscribe((res: Employee) => {
        alert('Сотрудник Добавлин');
        this.employeeObj = new Employee();
        this.loadEmployee();
      });
  }

  onUpdateEmployee() {
    this.masterSrv.udpateEmp(this.employeeObj).subscribe((res: Employee) => {
      alert('Сотрудник Изменен');
      this.employeeObj = new Employee();
      this.loadEmployee();
    });
  }
}
