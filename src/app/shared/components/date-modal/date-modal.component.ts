import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  NgbActiveModal,
  NgbDatepickerModule,
  NgbDateStruct,
  NgbModalModule,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-modal',
  imports: [CommonModule, NgbDatepickerModule, NgbModalModule],
  templateUrl: './date-modal.component.html',
  styleUrl: './date-modal.component.scss',
})
export class DateModalComponent {
  model: NgbDateStruct | null = null;

  constructor(public activeModal: NgbActiveModal) {}

  confirm() {
    this.activeModal.close(this.model);
  }

  cancel() {
    this.activeModal.dismiss('cancell');
  }
}
