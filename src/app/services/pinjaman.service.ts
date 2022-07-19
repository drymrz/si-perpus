import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PinjamanService {
  constructor(public afs: AngularFirestore) { }

  getUser() {
    return this.afs.collection('dataPetugas').snapshotChanges();
  }

  getBuku() {
    return this.afs.collection('dataBuku').snapshotChanges();
  }

  getSingleBuku(id) {
    return this.afs.doc('dataBuku/' + id).snapshotChanges();
  }

  updateJumlahBuku(id, Record) {
    return this.afs.collection('dataBuku').doc(id).update(Record);
  }


  getPinjaman() {
    return this.afs.collection('dataPinjaman').snapshotChanges();
  }

  getSinglePinjaman(id) {
    return this.afs.doc('dataPinjaman/' + id).snapshotChanges();
  }

  postPinjaman(Record) {
    return this.afs.collection('dataPinjaman').add(Record);
  }

  delDataPinjaman(record_id) {
    this.afs.doc('dataPinjaman/' + record_id).delete();
  }

  updateDataPinjam(Record, details) {
    return this.afs.collection('dataPinjaman').doc(details).update(Record);
  }
}
