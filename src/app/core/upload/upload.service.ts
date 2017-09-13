import { Injectable } from '@angular/core';
import { Upload } from './upload';
import * as firebase from 'firebase/app';
import {
  AngularFireDatabase,
  FirebaseListObservable
} from 'angularfire2/database';
import 'firebase/storage';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UploadService {
  constructor(private db: AngularFireDatabase, public auth: AuthService) {}

  private basePath = '/uploads';

  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  pushUpload(upload: Upload) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef
      .child(`${this.basePath}/${upload.file.name}`)
      .put(upload.file);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        // upload in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        upload.progress = snap.bytesTransferred / snap.totalBytes * 100;
      },
      error => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        this.saveFileData(upload);
      }
    );
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    this.db.list(`${this.basePath}/`).push(upload);
    this.auth.updateUserData({photo: upload.url});
  }
}
