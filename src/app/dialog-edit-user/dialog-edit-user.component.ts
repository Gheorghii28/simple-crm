import { Component, inject, OnInit } from '@angular/core';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {
  user: User = new User();
  birthDate: Date = new Date();
  firestore: Firestore = inject(Firestore);
  loading: boolean = false;
  userId!: string;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) {
  }

  ngOnInit() {
    this.birthDate = new Date(this.user.birthDate);
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
    console.log('Current user is:', this.user);

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
