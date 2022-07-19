import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { BukuService } from 'src/app/services/buku.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  SnackbarUpdate,
  SnackbarWarning,
} from 'src/app/components/snackbar/snackbar.component';

export interface dataTransfer {
  details: string;
  noRegist: string;
  judulBuku: string;
  jenisBuku: boolean;
  bukuKelas: string;
  namaPenerbit: string;
  tahunTerbit: any;
  jumlahBuku: number;
  tampilJenis: string;
}

@Component({
  selector: 'app-detailbuku',
  templateUrl: './detailbuku.component.html',
  styleUrls: ['./detailbuku.component.scss'],
})
export class DetailbukuComponent implements OnInit {
  details = '';
  noRegist: string;
  judulBuku: string;
  jenisBuku: boolean;
  bukuKelas: string;
  namaPenerbit: string;
  tahunTerbit: any;
  jumlahBuku: number;
  tampilJenis: string;

  clicked;

  constructor(
    public activeRoute: ActivatedRoute,
    public crudSvc: BukuService,
    public modal: MatDialog,
    public popup: MatSnackBar
  ) { }

  openModal() {
    this.modal.open(EditBukuModal, {
      disableClose: true,
      data: {
        details: this.details,
        noRegist: this.noRegist,
        judulBuku: this.judulBuku,
        jenisBuku: this.jenisBuku,
        bukuKelas: this.bukuKelas,
        namaPenerbit: this.namaPenerbit,
        tahunTerbit: this.tahunTerbit,
        jumlahBuku: this.jumlahBuku,
        tampilJenis: this.tampilJenis,
      },
    });
  }

  showDetailBuku() {
    this.crudSvc.getSingleDoc(this.details).subscribe((detail) => {
      this.noRegist = detail.payload.id;
      this.judulBuku = detail.payload.data()['judul'];
      this.jenisBuku = detail.payload.data()['jenis'];
      this.bukuKelas = detail.payload.data()['kelas'];
      this.namaPenerbit = detail.payload.data()['penerbit'];
      this.tahunTerbit = detail.payload.data()['terbitan'];
      this.jumlahBuku = detail.payload.data()['jumlah'];
      this.tampilJenis = detail.payload.data()['tampilJenis'];
    });
  }

  deleteDataBuku(record_id) {
    if (confirm('Yakin ingin menghapus data ?')) {
      this.crudSvc.delDataBuku(record_id);
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
    this.showDetailBuku();
  }
}

@Component({
  selector: 'edit-buku-model',
  templateUrl: './editbuku.modal.html',
  styleUrls: ['./detailbuku.component.scss'],
})
export class EditBukuModal {
  details = '';
  noRegist: string;
  judulBuku: string;
  jenisBuku: boolean;
  bukuKelas: string;
  namaPenerbit: string;
  tahunTerbit: any;
  jumlahBuku: number;
  tampilJenis: string;
  clicked: boolean = false;

  constructor(
    public afs: BukuService,
    public popup: MatSnackBar,
    public dialogRef: MatDialogRef<EditBukuModal>,
    @Inject(MAT_DIALOG_DATA) public data: dataTransfer
  ) { }

  updateDataBuku() {
    this.clicked = !this.clicked;
    let Record = {};
    Record['regist'] = this.noRegist;
    Record['judul'] = this.judulBuku;
    Record['penerbit'] = this.namaPenerbit;
    Record['terbitan'] = this.tahunTerbit;
    Record['jumlah'] = this.jumlahBuku;

    if (this.jenisBuku == false) {
      Record['jenis'] = this.jenisBuku;
      Record['tampilJenis'] = 'Buku Bacaan';
      Record['kelas'] = '';
    } else {
      Record['jenis'] = this.jenisBuku;
      Record['tampilJenis'] = 'Buku Pelajaran';
      Record['kelas'] = this.bukuKelas;
    }

    this.afs
      .updateDataBuku(Record, this.details)
      .then((res) => {
        this.popup.openFromComponent(SnackbarUpdate, {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        console.log(res);

        let bck = document.getElementById('cancelBtn');
        bck?.click();
        this.clicked = false;
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
    this.noRegist = this.data.noRegist;
    this.judulBuku = this.data.judulBuku;
    this.jenisBuku = this.data.jenisBuku;
    this.bukuKelas = this.data.bukuKelas;
    this.namaPenerbit = this.data.namaPenerbit;
    this.tahunTerbit = this.data.tahunTerbit;
    this.jumlahBuku = this.data.jumlahBuku;
    this.tampilJenis = this.data.tampilJenis;
  }
}
