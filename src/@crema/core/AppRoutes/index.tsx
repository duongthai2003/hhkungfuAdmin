import { Navigate } from 'react-router-dom';

import { authRouteConfig } from './AuthRoutes';
import Error403 from '../../../modules/errorPages/Error403';
import { errorPagesConfigs } from './ErrorPagesRoutes';
import { dashboardConfig } from './DashboardsRoutes';
import { extraPagesConfigs } from './ExtraPagesRoutes';
import { ecommerceConfig } from './EcommerceRoutes';
import { userListConfig } from './UserListRoutes';
import { userPagesConfig } from './UserPagesRoutes';
import { thirdPartyConfigs } from './ThirdPartyRoutes';
import { invoiceConfig } from './InvoiceRoutes';
import { appsConfig } from './AppsRoutes';
import { accountPagesConfigs } from './AccountRoutes';
import { initialUrl } from '@crema/constants/AppConst';
import { userManagementConfig } from './UserManagementRoutes';
import { requestManagementConfig } from './RequestManagementRoutes';
import { reportManagementConfig } from './ReportManagementRoutes';

const authorizedStructure = {
  fallbackPath: '/signin',
  unAuthorizedComponent: <Error403 />,
  routes: [
    ...dashboardConfig,
    ...accountPagesConfigs,
    ...appsConfig,
    ...thirdPartyConfigs,
    ...extraPagesConfigs,
    ...ecommerceConfig,
    ...userPagesConfig,
    ...userListConfig,
    ...invoiceConfig,
    ...userManagementConfig,
    ...requestManagementConfig,
    ...reportManagementConfig,
  ],
};

const publicStructure = {
  fallbackPath: initialUrl,
  routes: authRouteConfig,
};
const anonymousStructure = {
  routes: errorPagesConfigs.concat([
    {
      path: '/',
      element: <Navigate to={initialUrl} />,
    },
    {
      path: '*',
      element: <Navigate to="/error-pages/error-404" />,
    },
  ]),
};

export { authorizedStructure, publicStructure, anonymousStructure };
