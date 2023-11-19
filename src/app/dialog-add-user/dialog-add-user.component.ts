import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user: User = new User();
  birthDate!: Date;
  firestore: Firestore = inject(Firestore);
  loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {

  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };

  async saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    try {
      this.loading = true;
      await addDoc(collection(this.firestore, 'users'), this.user.toJSON());
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
