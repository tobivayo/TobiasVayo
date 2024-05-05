import { IMenuItem } from "./IMenu.model";

export interface IProduct {
    id: string;
    name: string;
    description: string;
    logo: string;
    dateRelease: Date;
    dateRevision: Date;
    actions?: IMenuItem[];
}

export interface IBackProduct {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: Date;
    date_revision: Date;
}


export const productsMock: IProduct[] = [
    {
        id: '1',
        name: 'AlphaGadget',
        description: 'A high-tech gadget designed to enhance your daily productivity.',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        dateRelease: new Date('2022-03-01'),
        dateRevision: new Date('2023-01-15')
    },
    {
        id: '2',
        name: 'BetaTool',
        description: 'An innovative tool that simplifies complex tasks with ease.',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        dateRelease: new Date('2022-07-15'),
        dateRevision: new Date('2023-02-20')
    },
    {
        id: '3',
        name: 'GammaSoftware',
        description: 'Next-generation software that offers solutions for data analysis.',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        dateRelease: new Date('2021-11-05'),
        dateRevision: new Date('2023-03-30')
    }
];