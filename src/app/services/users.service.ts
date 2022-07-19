import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(public afs: AngularFirestore) { }

  getUsers() {
    return this.afs.collection('dataPetugas').snapshotChanges();
  }

  getSingleUser(id) {
    return this.afs.doc('dataPetugas/' + id).snapshotChanges();
  }

  postDataUser(id, Record) {
    return this.afs.collection('dataPetugas').doc(id).set(Record);
  }

  delDataUser(record_id) {
    this.afs.doc('dataPetugas/' + record_id).delete();
  }

  updateDataUser(Record, details) {
    return this.afs.collection('dataPetugas').doc(details).update(Record);
  }
}
