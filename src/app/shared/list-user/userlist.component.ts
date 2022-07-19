import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarSuccess } from 'src/app/components/snackbar/snackbar.component';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss'],
})
export class UserlistComponent implements OnInit {
  dataUsers: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'id',
    'nama',
    'jenisKelamin',
    'umur',
    'actions',
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public userSvc: UsersService, public modal: MatDialog) { }

  openModal() {
    this.modal.open(AddUserModal, {
      disableClose: true,
    });
  }

  getUsersdata() {
    this.userSvc.getUsers().subscribe((data) => {
      let array = data.map((u) => {
        return {
          id: u.payload.doc.id,
          nama: u.payload.doc.data()['nama'],
          umur: u.payload.doc.data()['umur'],
          jenisKelamin: u.payload.doc.data()['jenisKelamin'],
          alamat: u.payload.doc.data()['alamat'],
        };
      });
      this.dataUsers = new MatTableDataSource(array);
      this.dataUsers.sort = this.sort;
      this.dataUsers.paginator = this.paginator;
    });
  }

  ngOnInit(): void {
    this.getUsersdata();
  }
}

@Component({
  selector: 'add-user-modal',
  templateUrl: './addusermodal.html',
  styleUrls: ['./userlist.component.scss'],
})
export class AddUserModal {
  userID: string;
  namaUser: string;
  jenisKelamin: string;
  alamatUser: string;
  umurUser: string;

  constructor(public userSvc: UsersService, public popup: MatSnackBar) { }

  postDataUser() {
    let Record = {};

    Record['nama'] = this.namaUser;
    Record['alamat'] = this.alamatUser;
    Record['jenisKelamin'] = this.jenisKelamin;
    Record['umur'] = this.umurUser;

    this.userSvc.postDataUser(this.userID, Record).then((res) => {
      this.popup.openFromComponent(SnackbarSuccess, {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      console.log(res);
      this.dataKosong();

      let cncl = document.getElementById('cancelBtn');
      cncl?.click();
    });
  }

  dataKosong() {
    this.namaUser = '';
    this.jenisKelamin = '';
    this.umurUser = '';
    this.alamatUser = '';
  }
}
