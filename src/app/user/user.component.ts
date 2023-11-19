import { Component, inject } from '@angular/core';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { Firestore, collection, doc, onSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  firestore: Firestore = inject(Firestore);
  users: any;
  unsubUserList;

  constructor(public dialog: MatDialog) {
    this.unsubUserList = this.fetchUserCollection();
  }

  ngOnDestroy() {
    this.unsubUserList();
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  fetchUserCollection() {
    return onSnapshot(collection(this.firestore, "users"), (snapshot) => {
      this.updateUsers(snapshot);
    }, (error) => {
      console.log(error);
    });
  }

  updateUsers(snapshot: any) {
    this.users = [];
    snapshot.forEach((userRef: any) => {
      const user = userRef.data();
      user.id = userRef.id;
      this.users.push(user);
    });
  }
}
