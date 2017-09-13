import { Subscription } from 'rxjs/Rx';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { UploadService } from '../../core/upload/upload.service';
import { Upload } from '../../core/upload/upload';
import { User } from '../../core/auth/user';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  selectedFiles: FileList;
  currentUpload: Upload;
  user: User;
  subs: Subscription;

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private upload: UploadService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
    this.subs = this.auth.getUserData().subscribe(user => {
      this.user = user;
      this.form.setValue({ name: user.name });
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.auth
        .updateUserData(this.form.value)
        .then(() => {
          console.log('SUCCESS');
        })
        .catch(error =>
          console.log('ERROR @ AuthService#updateUserData() :', error)
        );
    }
    this.formSubmitAttempt = true;
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.upload.pushUpload(this.currentUpload);
  }
}
