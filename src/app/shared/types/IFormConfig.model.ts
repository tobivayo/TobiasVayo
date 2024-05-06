export interface IFormField {
    key: string;
    label: string;
    type: string;
    value: any;
    validations: {
      required?: boolean;
      minlength?: number;
      maxlength?: number;
      min?: number;
      minDate?: Date;
      max?: number;
      pattern?: string;
    };
    asyncValidations: {
      uniqueId?: boolean;
    }
    isDisabled: boolean;
  }
  
  export interface IFormConfig {
    fields: IFormField[];
  }
  