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
  @Input() isReadOnly: boolean = false;
  @Input() isRequired: boolean = false;
  public minLength: number | null = null;
  public maxLength: number | null = null;
  public pattern: string | null = null;
  public min: number | null = null;
  public max: number | null = null;
  @Input() minDate: Date | null = null;
  @Output() change: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    console.log('field', this.type)
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
    if (this.formField.hasError('min')) {
      this.min = this.formField.getError('min')['min'];
    }
    if (this.formField.hasError('max')) {
      this.max = this.formField.getError('max')['max'];
    }
    if (this.formField.hasError('minDate')) {
      this.minDate = this.formField.getError('minDate')['requiredMinDate'];
    }
  }
  
  public onChange(event: any) {
    this.change.emit();
  }
}
