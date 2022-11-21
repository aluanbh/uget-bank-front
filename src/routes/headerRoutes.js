import React from 'react';
import { authPages, financialMenu, demoPages, layoutMenu } from '../menu';
import DashboardHeader from '../pages/common/Headers/DashboardHeader';
import DefaultHeader from '../pages/common/Headers/DefaultHeader';

const headers = [
  { path: authPages.login.path, element: null, exact: true },
  { path: authPages.signUp.path, element: null, exact: true },
  { path: authPages.page404.path, element: null, exact: true },
  { path: financialMenu.financial.path, element: <DashboardHeader />, exact: true },
  { path: demoPages.contactUs.path, element: <DashboardHeader />, exact: true },
  { path: demoPages.profile.path, element: <DashboardHeader />, exact: true },
  { path: demoPages.documentations.path, element: <DashboardHeader />, exact: true },
  { path: demoPages.clients.path, element: <DashboardHeader />, exact: true },
  { path: demoPages.myKeys.path, element: <DashboardHeader />, exact: true },
  { path: demoPages.instantPix.path, element: <DashboardHeader />, exact: true },
  { path: demoPages.pixBilling.path, element: <DashboardHeader />, exact: true },
  { path: demoPages.transfer.path, element: <DashboardHeader />, exact: true },
  { path: demoPages.establishments.path, element: <DashboardHeader />, exact: true },
  { path: demoPages.users.path, element: <DashboardHeader />, exact: true },
  { path: demoPages.withdrawals.path, element: <DashboardHeader />, exact: true },
  { path: demoPages.receivables.path, element: <DashboardHeader />, exact: true },
  /*{
    path: `*`,
    element: <DefaultHeader />,
  },*/
];

export default headers;
