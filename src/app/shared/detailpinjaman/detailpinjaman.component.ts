import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PinjamanService } from 'src/app/services/pinjaman.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  SnackbarUpdate,
  SnackbarWarning,
} from 'src/app/components/snackbar/snackbar.component';

@Component({
  selector: 'app-detailpinjaman',
  templateUrl: './detailpinjaman.component.html',
  styleUrls: ['./detailpinjaman.component.scss'],
})
export class DetailpinjamanComponent implements OnInit {
  details = '';
  dataBuku;
  dataUser;

  namaUser;
  namaPetugas;
  idBuku;
  judulBuku;
  tglPinjam;
  tglBalik;
  status;
  showBtn: boolean = true;

  constructor(
    public activeRoute: ActivatedRoute,
    public afs: PinjamanService,
    public popup: MatSnackBar
  ) {}

  getDataUser() {
    this.afs.getUser().subscribe((data) => {
      this.dataUser = data.map((u) => {
        return {
          id: u.payload.doc.id,
          nama: u.payload.doc.data()['nama'],
        };
      });
    });
  }

  getDataBuku() {
    this.afs.getBuku().subscribe((data) => {
      this.dataBuku = data.map((b) => {
        return {
          id: b.payload.doc.id,
          judul: b.payload.doc.data()['judul'],
          kelas: b.payload.doc.data()['kelas'],
        };
      });
    });
  }

  showDetailPinjaman() {
    this.afs.getSinglePinjaman(this.details).subscribe((detail) => {
      this.idBuku = detail.payload.data()['idBuku'];
      this.namaUser = detail.payload.data()['namaUser'];
      this.namaPetugas = detail.payload.data()['namaPetugas'];
      this.judulBuku = detail.payload.data()['judulBuku'];
      this.tglPinjam = detail.payload.data()['tglPinjam'];
      this.tglBalik = detail.payload.data()['tglBalik'];
      this.status = detail.payload.data()['status'];
    });
  }

  delPinjaman(record_id) {
    if (confirm('Yakin ingin menghapus data ?')) {
      this.afs.delDataPinjaman(record_id);
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

  updateStatus() {
    let Record = {};
    Record['status'] = 'Peminjaman Selesai';

    this.afs
      .updateDataPinjam(Record, this.details)
      .then((res) => {
        this.popup.openFromComponent(SnackbarUpdate, {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });

        console.log(res);
        this.ngOnInit();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  ngOnInit(): void {
    this.details = this.activeRoute.snapshot.params.id;
    this.showDetailPinjaman();
  }
}
