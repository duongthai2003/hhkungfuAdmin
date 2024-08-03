import React from "react";
import { RoutePermittedRole } from "@crema/constants/AppEnums";

const AdjustChart = React.lazy(
  () => import("../../../modules/ReportManagement/AdjustChart")
);

export const reportManagementConfig = [
  {
    permittedRole: RoutePermittedRole.User,
    path: "/favourite-management",
    element: <AdjustChart />,
  },
];
