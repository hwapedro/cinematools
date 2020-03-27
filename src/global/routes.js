import { GeneralPage } from '../components/pages/general';
import React from 'react';

export const autoRoutes = [
  {
    plural: 'shops',
    singular: 'shop',
    route: '/shops',
    render: () => <GeneralPage model='shops' />,
    name: 'Shops'
  }
];