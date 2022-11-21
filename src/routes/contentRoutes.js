import React, { lazy } from 'react';
import { authPages, financialMenu, demoPages } from '../menu';
import MyKeys from '../pages/presentation/myKeys/myKeys';
import InstantPix from '../pages/presentation/instantPix/instantPix';
import PixBilling from '../pages/presentation/pixBilling/pixBilling';
import Receivables from '../pages/presentation/receivables/receivables';
import Withdrawals from '../pages/presentation/withdrawals/withdrawals';
import Transfer from '../pages/presentation/transfer/transfer';
import ContactUs from '../pages/presentation/contactUs/ContactUs';
import Documentations from '../pages/presentation/documentations/Documentations';
import Establishments from '../pages/presentation/establishments/Establishments';
import Users from '../pages/presentation/users/Users';
import Clients from '../pages/presentation/clients/Clients';
import Profile from '../pages/presentation/profile/profile';
import Rates from '../pages/presentation/rates/rates';



const LANDING = {
  FINANCIAL: lazy(() => import('../pages/financial/FinancialPage')),
};
const AUTH = {
  LOGIN: lazy(() => import('../pages/presentation/auth/Login')),
  PAGE_404: lazy(() => import('../pages/presentation/auth/Page404')),
};


const presentation = [
  /**
   * Auth
   */
  {
    path: authPages.login.path,
    element: <AUTH.LOGIN />,
    exact: true,
  },
  {
    path: authPages.signUp.path,
    element: <AUTH.LOGIN isSignUp />,
    exact: true,
  },
  {
    path: authPages.page404.path,
    element: <AUTH.PAGE_404 />,
    exact: true,
  },

  /** ************************************************** */
  /**
   * Landing
   */
  {
    path: financialMenu.financial.path,
    element: <LANDING.FINANCIAL />,
    exact: true,
  },
  {
    path: demoPages.documentations.path,
    element: <Documentations />,
    exact: true,
  },
  {
    path: demoPages.clients.path,
    element: <Clients />,
    exact: true,
  },
  {
    path: demoPages.contactUs.path,
    element: <ContactUs />,
    exact: true,
  },
  {
    path: demoPages.profile.path,
    element: <Profile />,
    exact: true,
  },
  {
    path: demoPages.myKeys.path,
    element: <MyKeys />,
    exact: true,
  },
  {
    path: demoPages.instantPix.path,
    element: <InstantPix />,
    exact: true,
  },
  {
    path: demoPages.pixBilling.path,
    element: <PixBilling />,
    exact: true,
  },
  {
    path: demoPages.transfer.path,
    element: <Transfer />,
    exact: true,
  },
  {
    path: demoPages.receivables.path,
    element: <Receivables />,
    exact: true,
  },
  // {
  //   path: demoPages.rates.path,
  //   element: <Rates />,
  //   exact: true,
  // },
  {
    path: demoPages.withdrawals.path,
    element: <Withdrawals />,
    exact: true,
  },
  {
    path: demoPages.establishments.path,
    element: <Establishments />,
    exact: true,
  },
  {
    path: demoPages.users.path,
    element: <Users />,
    exact: true,
  },

];
const contents = [...presentation];

export default contents;
