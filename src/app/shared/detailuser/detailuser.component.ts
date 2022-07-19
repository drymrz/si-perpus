import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  SnackbarUpdate,
  SnackbarWarning,
} from 'src/app/components/snackbar/snackbar.component';

export interface dataTransfer {
  details: string;
  namaUser: string;
  alamatUser: string;
  jenisKelamin: string;
  umurUser: string;
}

@Component({
  selector: 'app-detailuser',
  templateUrl: './detailuser.component.html',
  styleUrls: ['./detailuser.component.scss'],
})
export class DetailuserComponent implements OnInit {
  details = '';
  namaUser;
  alamatUser;
  jenisKelamin;
  umurUser;
  clicked: boolean = false;

  constructor(
    public activeRoute: ActivatedRoute,
    public crudSvc: UsersService,
    public modal: MatDialog,
    public popup: MatSnackBar
  ) {}

  openModal() {
    this.modal.open(EditUserModal, {
      width: '550px',
      disableClose: true,
      data: {
        details: this.details,
        namaUser: this.namaUser,
        alamatUser: this.alamatUser,
        jenisKelamin: this.jenisKelamin,
        umurUser: this.umurUser,
      },
    });
  }

  showDetailUser() {
    this.crudSvc.getSingleUser(this.details).subscribe((detail) => {
      this.namaUser = detail.payload.data()['nama'];
      this.alamatUser = detail.payload.data()['alamat'];
      this.jenisKelamin = detail.payload.data()['jenisKelamin'];
      this.umurUser = detail.payload.data()['umur'];
    });
  }

  deleteDataUser(record_id) {
    if (confirm('Yakin ingin menghapus data ?')) {
      this.crudSvc.delDataUser(record_id);
      this.popup.openFromComponent(SnackbarWarning, {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      let ref = document.getElementById('backBtn');
      ref?.click();
    } else {
      return;
    }
  }

  ngOnInit(): void {
    this.details = this.activeRoute.snapshot.params.id;
    this.showDetailUser();
  }
}

@Component({
  selector: 'edit-user-model',
  templateUrl: './editusermodal.html',
  styleUrls: ['./detailuser.component.scss'],
})
export class EditUserModal {
  details = '';
  namaUser;
  alamatUser;
  jenisKelamin;
  umurUser;

  constructor(
    public afs: UsersService,
    public popup: MatSnackBar,
    public dialogRef: MatDialogRef<EditUserModal>,
    @Inject(MAT_DIALOG_DATA) public data: dataTransfer
  ) {}

  updateUser() {
    let Record = {};
    Record['nama'] = this.namaUser;
    Record['alamat'] = this.alamatUser;
    Record['jenisKelamin'] = this.jenisKelamin;
    Record['umur'] = this.umurUser;

    this.afs
      .updateDataUser(Record, this.details)
      .then((res) => {
        this.popup.openFromComponent(SnackbarUpdate, {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        console.log(res);

        let cncl = document.getElementById('cancelBtn');
        cncl.click();
      })
      .catch((error) => {
        alert('terjadi kesalahan !');
        console.log(error);
      });
  }

  onCancel() {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.details = this.data.details;
    this.namaUser = this.data.namaUser;
    this.alamatUser = this.data.alamatUser;
    this.jenisKelamin = this.data.jenisKelamin;
    this.umurUser = this.data.umurUser;
  }
}
