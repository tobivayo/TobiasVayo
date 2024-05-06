import { Component, TemplateRef, ViewChild } from '@angular/core';
import { GenericButtonComponent } from '../generic-button/generic-button.component';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [GenericButtonComponent],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {
  @ViewChild('confirmationDialog') public tempRef!: TemplateRef<any>;

  public createEmbededView() {
    return this.tempRef.createEmbeddedView(null);
  }
}
