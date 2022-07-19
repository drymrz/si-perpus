import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class BukuService {
  constructor(private fireSvc: AngularFirestore) { }

  postDocumentBuku(id, Record) {
    return this.fireSvc.collection('dataBuku').doc(id).set(Record);
  }

  updateDataBuku(Record, details) {
    return this.fireSvc.collection('dataBuku').doc(details).update(Record);
  }

  getDataBuku() {
    return this.fireSvc.collection('dataBuku').snapshotChanges();
  }

  getSingleDoc(id) {
    return this.fireSvc.doc('dataBuku/' + id).snapshotChanges();
  }

  delDataBuku(record_id) {
    this.fireSvc.doc('dataBuku/' + record_id).delete();
  }
}
