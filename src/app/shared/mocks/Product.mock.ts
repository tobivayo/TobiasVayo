import { IBackProduct, IProduct } from "../types/IProduct.model";
import { menuItemListMock, menuItemListMock2 } from "./MenuItem.mock";

export const productsMock: IProduct[] = [
    {
        id: 'p1',
        name: 'Product One',
        description: 'Description of product one.',
        logo: 'http://example.com/logo1.png',
        dateRelease: new Date('2024-01-01'),
        dateRevision: new Date('2025-01-01'),
        actions: menuItemListMock
    },
    {
        id: 'p2',
        name: 'Product Two',
        description: 'Description of product two.',
        logo: 'http://example.com/logo2.png',
        dateRelease: new Date('2025-01-01'),
        dateRevision: new Date('2026-01-01'),
        actions: menuItemListMock2
    }
];

export const backProductsMock: IBackProduct[] = [
    {
        id: 'p1',
        name: 'Product One',
        description: 'Description of product one.',
        logo: 'http://example.com/logo1.png',
        date_release: new Date('2024-01-01'),
        date_revision: new Date('2025-01-01')
    },
    {
        id: 'p2',
        name: 'Product Two',
        description: 'Description of product two.',
        logo: 'http://example.com/logo2.png',
        date_release: new Date('2025-01-01'),
        date_revision: new Date('2026-01-01')
    }
];