import React from 'react';
import { RoutePermittedRole } from '@crema/constants/AppEnums';

const UserList = React.lazy(
  () => import('../../../modules/UserManagement/List'),
);
const UserKyc = React.lazy(() => import('../../../modules/UserManagement/Kyc'));
export const userManagementConfig = [
  {
    permittedRole: RoutePermittedRole.User,
    path: '/user-management',
    element: <UserList />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: '/user-kyc',
    element: <UserKyc />,
  },
];
