import { ActionType, IMenuItem } from "../types/IMenu.model";

export const menuItemListMock: IMenuItem[] = [
    {
        label: 'Edit',
        action: () => {},
        icon: 'ph ph-pencil',
        type: ActionType.Navigate,
        route: `/edit/p1` 
      },
      {
        label: 'Delete',
        action: () => {},
        icon: 'ph ph-trash',
        type: ActionType.Dialog,
        data: {
          id: 'p1',
          name: 'Product One'
        }
      }
];

export const menuItemListMock2: IMenuItem[] = [
    {
        label: 'Edit',
        action: () => {},
        icon: 'ph ph-pencil',
        type: ActionType.Navigate,
        route: `/edit/p2` 
      },
      {
        label: 'Delete',
        action: () => {},
        icon: 'ph ph-trash',
        type: ActionType.Dialog,
        data: {
          id: 'p2',
          name: 'Product Two'
        }
      }
];