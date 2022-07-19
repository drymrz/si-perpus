import { Component, OnInit, ViewChild } from '@angular/core';
import { BukuService } from '../../services/buku.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarSuccess } from 'src/app/components/snackbar/snackbar.component';

@Component({
  selector: 'app-listbuku',
  templateUrl: './bukulist.component.html',
  styleUrls: ['./bukulist.component.scss'],
})
export class bukulistComponent implements OnInit {
  dataBuku: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'regist',
    'judul',
    'tampilJenis',
    'penerbit',
    'actions',
  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public crudSvc: BukuService, public modal: MatDialog) { }
  openModal() {
    this.modal.open(AddBukuModal, {
      disableClose: true,
    });
  }
  showDataBuku() {
    this.crudSvc.getDataBuku().subscribe((data) => {
      let array = data.map((b) => {
        return {
          id: b.payload.doc.id,
          judul: b.payload.doc.data()['judul'],
          jenis: b.payload.doc.data()['jenis'],
          tampilJenis: b.payload.doc.data()['tampilJenis'],
          kelas: b.payload.doc.data()['kelas'],
          penerbit: b.payload.doc.data()['penerbit'],
          terbitan: b.payload.doc.data()['terbitan'],
          jumlah: b.payload.doc.data()['jumlah'],
        };
      });
      this.dataBuku = new MatTableDataSource(array);
      this.dataBuku.sort = this.sort;
      this.dataBuku.paginator = this.paginator;
    });
  }

  ngOnInit(): void {
    this.showDataBuku();
  }
}

@Component({
  selector: 'app-addbuku',
  templateUrl: './add-buku.modal.html',
  styleUrls: ['./bukulist.component.scss'],
})
export class AddBukuModal {
  noRegist: string;
  judulBuku: string;
  jenisBuku: boolean = false;
  bukuKelas: string;
  namaPenerbit: string;
  tahunTerbit: Date;
  jumlahBuku: number;
  clicked: boolean = false;
  tampilJenis: string;

  constructor(public crudSvc: BukuService, public popup: MatSnackBar) { }

  createDataBuku() {
    this.clicked = !this.clicked;
    let Record = {};
    Record['judul'] = this.judulBuku;
    Record['penerbit'] = this.namaPenerbit;
    Record['terbitan'] = this.tahunTerbit;
    Record['jumlah'] = this.jumlahBuku;

    if (this.jenisBuku == false) {
      Record['jenis'] = this.jenisBuku;
      Record['tampilJenis'] = 'Buku Bacaan';
    } else {
      Record['jenis'] = this.jenisBuku;
      Record['tampilJenis'] = 'Buku Pelajaran';
      Record['kelas'] = this.bukuKelas;
    }

    this.crudSvc
      .postDocumentBuku(this.noRegist, Record)
      .then((res) => {
        this.popup.openFromComponent(SnackbarSuccess, {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.dataKosong();
        console.log(res);

        let ref = document.getElementById('cancelBtn');
        ref?.click();
        this.clicked = false;
      })
      .catch((error) => {
        alert('Terjadi Kelasahan !');
        console.log(error);
      });
  }

  dataKosong() {
    this.noRegist = '';
    this.judulBuku = '';
    this.jenisBuku = undefined;
    this.bukuKelas = '';
    this.namaPenerbit = '';
    this.tahunTerbit = undefined;
    this.jumlahBuku = undefined;
  }
}
