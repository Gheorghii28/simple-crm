import { Component, inject } from '@angular/core';
import { Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  userId: any;
  unsubUser;
  firestore: Firestore = inject(Firestore)
  currentUser: User = new User();
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog
    ) {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.unsubUser = this.fetchUserData();
  }

  ngOnDestroy() {
    this.unsubUser();
  }

  fetchUserData() {
    return onSnapshot(doc(this.firestore, 'users', this.userId), (user: any) => {
      this.currentUser = new User(user.data());
      this.loading = true;
    });
  }

  editUserDetails() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.currentUser.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

  editAddress() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.currentUser.toJSON());
    dialog.componentInstance.userId = this.userId;
  }
}
