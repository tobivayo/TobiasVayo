export enum ColumnType {
    String = 'string',
    Image = 'image',
    Date = 'date'
}

export interface ITableColumn {
    key: string;
    title: string;
    type: ColumnType
}

export interface ITableData {
    [key: string]: any;
}


export const productTableColumnsMock: ITableColumn[] = [
    {
        key: 'logo',
        title: 'Logo',
        type: ColumnType.Image
    },
    {
        key: 'name',
        title: 'Name',
        type: ColumnType.String
    },
    {
        key: 'description',
        title: 'Description',
        type: ColumnType.String
    },
    {
        key: 'dateRelease',
        title: 'Date of Release',
        type: ColumnType.Date
    },
    {
        key: 'dateRevision',
        title: 'Date of Revision',
        type: ColumnType.Date
    }
];