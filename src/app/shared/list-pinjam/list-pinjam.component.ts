import { Component, OnInit, ViewChild } from '@angular/core';
import { PinjamanService } from 'src/app/services/pinjaman.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarSuccess } from 'src/app/components/snackbar/snackbar.component';
import { WebcamImage } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-list-pinjam',
  templateUrl: './list-pinjam.component.html',
  styleUrls: ['./list-pinjam.component.scss'],
})
export class ListPinjamComponent implements OnInit {
  dataPinjam: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'judulBuku',
    'namaUser',
    'namaPetugas',
    'status',
    'actions',
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public afs: PinjamanService, public modal: MatDialog) {}

  openModal() {
    this.modal.open(AddPinjamModal, {
      disableClose: true,
    });
  }

  getDataPinjaman() {
    this.afs.getPinjaman().subscribe((data) => {
      let array = data.map((p) => {
        return {
          id: p.payload.doc.id,
          namaUser: p.payload.doc.data()['namaUser'],
          namaPetugas: p.payload.doc.data()['namaPetugas'],
          judulBuku: p.payload.doc.data()['judulBuku'],
          tglPinjam: p.payload.doc.data()['tglPinjam'],
          tglBalik: p.payload.doc.data()['tglBalik'],
          status: p.payload.doc.data()['status'],
        };
      });
      this.dataPinjam = new MatTableDataSource(array);
      this.dataPinjam.sort = this.sort;
      this.dataPinjam.paginator = this.paginator;
    });
  }

  ngOnInit(): void {
    this.getDataPinjaman();
  }
}

@Component({
  selector: 'app-pinjam-modal',
  templateUrl: './add-pinjam.modal.html',
  styleUrls: ['./list-pinjam.component.scss'],
})
export class AddPinjamModal {
  idBuku;
  singleJudul;
  dataBuku;
  dataPetugas;
  namaUser;
  namaPetugas;
  judulBuku;
  tglPinjam;
  tglBalik;
  status;

  public webcamImage: WebcamImage = null;

  constructor(public afs: PinjamanService, public popup: MatSnackBar) {}

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  triggerSnapshot(): void {
    this.trigger.next();
  }

  handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  getDataUser() {
    this.afs.getUser().subscribe((data) => {
      this.dataPetugas = data.map((p) => {
        return {
          id: p.payload.doc.id,
          nama: p.payload.doc.data()['nama'],
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
          jumlah: b.payload.doc.data()['jumlah'],
        };
      });
    });
  }

  getJudulBuku() {
    this.afs.getSingleBuku(this.idBuku).subscribe((j) => {
      this.judulBuku = j.payload.data()['judul'];
    });
  }

  postDataPinjam() {
    let Record = {};
    Record['idBuku'] = this.idBuku;
    Record['namaUser'] = this.namaUser;
    Record['namaPetugas'] = this.namaPetugas;
    Record['judulBuku'] = this.judulBuku;
    Record['tglPinjam'] = this.tglPinjam;
    Record['tglBalik'] = this.tglBalik;
    this.status = 'Peminjaman Berlangsung';
    Record['status'] = this.status;
    Record['img64'] = this.webcamImage.imageAsBase64.toString();

    this.afs
      .postPinjaman(Record)
      .then((res) => {
        this.popup.openFromComponent(SnackbarSuccess, {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        console.log(res);

        let ref = document.getElementById('cancelBtn');
        ref?.click();
      })
      .catch((error) => {
        alert('Terjadi Kesalahan');
        console.log(error);
      });
  }

  ngOnInit(): void {
    this.getDataUser();
    this.getDataBuku();
  }
}
