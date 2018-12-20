import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {
  constructor(private db: AngularFirestore) {
    // For time error
    db.firestore.settings({ timestampsInSnapshots: true });
  }

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      // tslint:disable-next-line:no-shadowed-variable
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  registerCurrentUser(formData) {
    return new Promise((resolve, reject) => {
      const user = firebase.auth().currentUser;
      const data = {
        fullName: formData.fullName,
        accountType: formData.accountType,
        joinedAt: new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };
      user
        .updateProfile({
          displayName: formData.fullName,
          photoURL: user.photoURL
        })
        .then(res => {
          this.db
            .doc(`users/${user.uid}`)
            .set(data, { merge: true })
            .then(() => resolve())
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }
}
