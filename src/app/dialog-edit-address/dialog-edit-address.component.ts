import { Component, inject } from '@angular/core';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {
  user: User = new User();
  firestore: Firestore = inject(Firestore);
  loading: boolean = false;
  userId!: string;

  constructor(
    public dialogRef: MatDialogRef<DialogEditAddressComponent>
    ) {
  }

  async saveUser() {
    try {
      this.loading = true;
      const userRef = doc(collection(this.firestore, 'users'), this.userId)
      await updateDoc(userRef, this.user.toJSON());
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
      this.closeDialog();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
