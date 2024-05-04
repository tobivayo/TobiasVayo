import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-generic-field',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './generic-field.component.html',
  styleUrl: './generic-field.component.css'
})
export class GenericFieldComponent {

  @Input() formField: FormControl = new FormControl();
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() isDisabled: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() isReadOnly: boolean = false;
  @Input() minLength: number | null = null;
  @Input() maxLength: number | null = null;
  @Input() pattern: string | null = null;
  @Output() change: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this.checkControlValidators()
  }

  public checkControlValidators() {
    if (this.formField.hasError('required')) {
      this.isRequired = true;
    }
  }

  public checkValidators() {
    if (this.formField.hasError('minlength')) {
      this.minLength = this.formField.getError('minlength')['requiredLength'];
    }
    if (this.formField.hasError('maxlength')) {
      this.maxLength = this.formField.getError('maxlength')['requiredLength'];
    }
    if (this.formField.hasError('pattern')) {
      this.pattern = this.formField.getError('pattern')['requiredPattern'];
    }
  }
  
  public onChange(event: any) {
    this.change.emit();
  }
}
