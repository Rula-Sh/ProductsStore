import {
  Component,
  inject,
  signal,
  TemplateRef,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbDateStruct,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-modal',
  imports: [NgbDatepickerModule, FormsModule],
  templateUrl: './date-modal.component.html',
  styleUrl: './date-modal.component.scss',
})
export class DateModalComponent {
  private modalService = inject(NgbModal);
  closeResult: WritableSignal<string> = signal('');
  selectedDate: NgbDateStruct | null = null;

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult.set(`Closed with: ${result}`);
        },
        (reason) => {
          this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
        }
      );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
  saveDate(modal: any) {
    console.log('Selected date:', this.selectedDate);
    modal.close('Save click');
  }
}
