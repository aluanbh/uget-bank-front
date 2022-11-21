import React from 'react';
import { authPages, demoPages, layoutMenu } from '../menu';
import Footer from '../layout/Footer/Footer';

const footers = [
  // { path: layoutMenu.blank.path, element: null, exact: true },
  { path: authPages.login.path, element: null, exact: true },
  { path: authPages.signUp.path, element: null, exact: true },
  { path: authPages.page404.path, element: null, exact: true },
  { path: '*', element: <Footer /> },
];

export default footers;
