import { Component, Input } from '@angular/core';
import { FormConfig } from '../../types/IFormConfig';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-form-view',
  standalone: true,
  imports: [ ReactiveFormsModule, FormsModule ],
  templateUrl: './form-view.component.html',
  styleUrl: './form-view.component.css'
})
export class FormViewComponent {
  @Input() formConfig: FormConfig = {} as FormConfig;
  public form: FormGroup;

  constructor( private _formService: FormService ) {}

  ngOnInit(): void {
    this.createForm();  
  }

  private createForm() {
    this.form = this._formService.createForm(this.formConfig);
  }
}
