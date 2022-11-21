import { ACCESS_LEVEL } from "./types/roles";

export const homeMenu = {
  intro: { id: 'intro', text: 'Intro', path: '#intro', icon: 'Vrpano', subMenu: null },
  bootstrap: {
    id: 'bootstrap',
    text: 'Bootstrap Components',
    path: '#bootstrap',
    icon: 'BootstrapFill',
    subMenu: null,
  },
  storybook: {
    id: 'storybook',
    text: 'Storybook',
    path: '#storybook',
    icon: 'CustomStorybook',
    subMenu: null,
  },
  formik: {
    id: 'formik',
    text: 'Formik',
    path: '#formik',
    icon: 'CheckBox',
    subMenu: null,
  },
  apex: {
    id: 'apex',
    text: 'Apex Charts',
    path: '#apex',
    icon: 'AreaChart',
    subMenu: null,
  },
};

export const authPages = {
  signUp: {
    id: 'signUp',
    text: 'Sign Up',
    path: '/sign-up',
    icon: 'PersonAdd',
  },
  login: {
    id: 'login',
    text: 'Login',
    path: '/',
    icon: 'Login',
  },
  logout: {
    id: 'logout',
    text: 'Sair',
    path: '/logout',
    icon: 'Logout',
  },
  page404: {
    id: 'Page404',
    text: '404 Page',
    path: '/404',
    icon: 'ReportGmailerrorred',
  },
}

export const financialMenu = {
  financial: {
    id: 'financial',
    text: 'Resumo da Conta',
    path: '/financial',
    icon: 'Dashboard',
    subMenu: null,
  },
};


export const demoPages = {
  clients: {
    id: 'clients',
    text: 'Clientes',
    path: 'clients',
    icon: 'PersonAddAlt',
  },
  myKeys: {
    id: 'myKeys',
    text: 'Minhas Chaves',
    path: 'myKeys',
    icon: 'VpnKey',
  },
  instantPix: {
    id: 'instantPix',
    text: 'PIX Imediato',
    path: 'instantPix',
    icon: 'AddBox',
  },
  pixBilling: {
    id: 'pixBilling',
    text: 'PIX Cobrança',
    path: 'pixBilling',
    icon: 'AddBox',
  },
  transfer: {
    id: 'transfer',
    text: 'Transferência',
    path: 'transfer',
    icon: 'AddBox',
  },
  receivables: {
    id: 'receivables',
    text: 'Extratos Recebíveis',
    path: 'receivables',
    icon: 'AddBox',
  },
  withdrawals: {
    id: 'withdrawals',
    text: 'Extratos Transferências',
    path: 'withdrawals',
    icon: 'AddBox',
  },
  // rates: {
  //   id: 'rates',
  //   text: 'Taxas',
  //   path: 'rates',
  //   icon: 'money',
  // },
  users: {
    id: 'users',
    text: 'Usuários',
    path: 'users',
    icon: 'Person',
  },
  establishments: {
    id: 'establishments',
    text: 'Estabelecimentos',
    path: 'establishments',
    icon: 'Storefront',
  },
  contactUs: {
    id: 'contactUs',
    text: 'Fale Conosco',
    path: 'contactUs',
    icon: 'ContactSupport',
  },
  documentations: {
    id: 'documentations',
    text: 'Ajuda',
    path: 'documentations',
    icon: 'TextSnippet',
  },
  profile: {
    id: 'profile',
    text: 'Perfil',
    path: 'profile',
    icon: 'AccountCircle',
  },


};


export const productsMenu = {
  companyA: { id: 'companyA', text: 'Company A', path: 'grid-pages/products', subMenu: null },
  companyB: { id: 'companyB', text: 'Company B', path: '/', subMenu: null },
  companyC: { id: 'companyC', text: 'Company C', path: '/', subMenu: null },
  companyD: { id: 'companyD', text: 'Company D', path: '/', subMenu: null },
};
