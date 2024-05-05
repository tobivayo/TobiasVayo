import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-generic-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-button.component.html',
  styleUrl: './generic-button.component.css'
})
export class GenericButtonComponent {

  @Input() buttonText: string = "Button";
  @Input() buttonColor: string = "#F1E079";
  @Input() isDisabled: boolean = false;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  
}
