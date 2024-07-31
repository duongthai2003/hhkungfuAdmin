import React from 'react';
import { RoutePermittedRole } from '@crema/constants/AppEnums';

const AdjustChart = React.lazy(
  () => import('../../../modules/ReportManagement/AdjustChart'),
);

const TradingsList = React.lazy(
  () => import('../../../modules/ReportManagement/TradingsList'),
);

const StatementsList = React.lazy(
  () => import('../../../modules/ReportManagement/StatementsList'),
);
const Setting = React.lazy(
  () => import('../../../modules/ReportManagement/Setting'),
);

export const reportManagementConfig = [
  {
    permittedRole: RoutePermittedRole.User,
    path: '/report-management/adjust-chart',
    element: <AdjustChart />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: '/report-management',
    element: <TradingsList />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: '/report-management/statements',
    element: <StatementsList />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: '/report-management/setting',
    element: <Setting />,
  },
];
