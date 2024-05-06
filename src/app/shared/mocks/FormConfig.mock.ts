import { IFormConfig } from "../types/IFormConfig.model";
import { productsMock } from "./Product.mock";

export const mockFormConfigWithValue: IFormConfig = {
    fields: [
        {
            key: 'id',
            label: 'Product ID',
            type: 'text',
            value: productsMock[0].id,
            validations: {
                required: true,
                minlength: 2,
                maxlength: 10
            },
            asyncValidations: {
                uniqueId: true
            },
            isDisabled: false
        },
        {
            key: 'name',
            label: 'Product Name',
            type: 'text',
            value: productsMock[0].name,
            validations: {
                required: true,
                minlength: 3,
                maxlength: 50
            },
            asyncValidations: {},
            isDisabled: false
        },
        {
            key: 'description',
            label: 'Description',
            type: 'textarea',
            value: productsMock[0].description,
            validations: {
                required: true,
                minlength: 10,
                maxlength: 200
            },
            asyncValidations: {},
            isDisabled: false
        },
        {
            key: 'logo',
            label: 'Logo URL',
            type: 'text',
            value: productsMock[0].logo,
            validations: {
                required: true,
                pattern: 'https?://.+'
            },
            asyncValidations: {},
            isDisabled: false
        },
        {
            key: 'dateRelease',
            label: 'Date of Release',
            type: 'date',
            value: productsMock[0].dateRelease.toISOString().substring(0, 10),
            validations: {
                required: true,
                minDate: new Date('2020-01-01')
            },
            asyncValidations: {},
            isDisabled: false
        },
        {
            key: 'dateRevision',
            label: 'Date of Revision',
            type: 'date',
            value: productsMock[0].dateRevision.toISOString().substring(0, 10),
            validations: {
                required: true
            },
            asyncValidations: {},
            isDisabled: false
        }
    ]
};

export const mockEmptyFormConfig: IFormConfig = {
    fields: [
        {
            key: 'id',
            label: 'Product ID',
            type: 'text',
            value: '',
            validations: {
                required: true,
                minlength: 2,
                maxlength: 10
            },
            asyncValidations: {
                uniqueId: true
            },
            isDisabled: false
        },
        {
            key: 'name',
            label: 'Product Name',
            type: 'text',
            value: '',
            validations: {
                required: true,
                minlength: 3,
                maxlength: 50
            },
            asyncValidations: {},
            isDisabled: false
        },
        {
            key: 'description',
            label: 'Description',
            type: 'text',
            value: '',
            validations: {
                required: true,
                minlength: 10,
                maxlength: 200
            },
            asyncValidations: {},
            isDisabled: false
        },
        {
            key: 'logo',
            label: 'Logo URL',
            type: 'text',
            value: '',
            validations: {
                required: true,
                pattern: 'https?://.+'
            },
            asyncValidations: {},
            isDisabled: false
        },
        {
            key: 'dateRelease',
            label: 'Date of Release',
            type: 'date',
            value: new Date('06-05-2024').toISOString().substring(0, 10),
            validations: {
                required: true,
                minDate: new Date()
            },
            asyncValidations: {},
            isDisabled: false
        },
        {
            key: 'dateRevision',
            label: 'Date of Revision',
            type: 'date',
            value: new Date('06-05-2025').toISOString().substring(0, 10),
            validations: {
                required: true
            },
            asyncValidations: {},
            isDisabled: false
        }
    ]
};
