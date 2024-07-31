import React from 'react';
import {RoutePermittedRole} from '@crema/constants/AppEnums';

const RequestList = React.lazy(
  () => import('../../../modules/RequestManagement/RequestList'),
);

const PaymentGatewayList = React.lazy(
  () => import('../../../modules/RequestManagement/PaymentGatewayList'),
);
export const requestManagementConfig = [
  {
    permittedRole: RoutePermittedRole.User,
    path: '/request-management',
    element: <RequestList />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: '/request-management/payment-gateways',
    element: <PaymentGatewayList />,
  },
];
