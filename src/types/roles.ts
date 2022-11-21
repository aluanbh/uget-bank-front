export const ROLE = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  COORDINATOR: 'coordinator',
  // CASHIER: 'cashier',
  TICKET: 'ticket',
  RECHARGE: 'recharge',
  CONSUMPTION: 'consumption',
  STREETVENDOR: 'streetvendor',
  CASHIERSTREETVENDOR: 'cashierstreetvendor',
  WAITER: 'waiter',
  HOSTESS: 'hostess',
}

export const ACCESS_LEVEL = {
  ADMIN: 3,
  MANAGER: 2,
  COORDINATOR: 1,
  // CASHIER: 0,
  TICKET: 0,
  RECHARGE: 0,
  CONSUMPTION: 0,
  STREETVENDOR: 0,
  CASHIERSTREETVENDOR: 0,
  WAITER: 0,
  HOSTESS: 0,
}

export function convertRolesPTBR(role: string) {
  switch (role) {
    case ROLE.ADMIN: return 'Administrador uGet';
    case ROLE.MANAGER: return 'Gerente';
    case ROLE.COORDINATOR: return 'Coordenador';
    // case ROLE.CASHIER: return 'Caixa';
    case ROLE.TICKET: return 'Operador Ticket';
    case ROLE.RECHARGE: return 'Operador Recarga/Bilheteria';
    case ROLE.CONSUMPTION: return 'Operador Consumo';
    case ROLE.STREETVENDOR: return 'Ambulante';
    case ROLE.CASHIERSTREETVENDOR: return 'Caixa Ambulante';
    case ROLE.WAITER: return 'Garçom';
    case ROLE.HOSTESS: return 'Hostess';
    default: return 'Indefinido'
  }
}

export function roleLevel(role: string) {
  switch (role) {
    case ROLE.ADMIN: return ACCESS_LEVEL.ADMIN;
    case ROLE.MANAGER: return ACCESS_LEVEL.MANAGER;
    case ROLE.COORDINATOR: return ACCESS_LEVEL.COORDINATOR;
    // case ROLE.CASHIER: return ACCESS_LEVEL.CASHIER;
    case ROLE.TICKET: return ACCESS_LEVEL.TICKET;
    case ROLE.RECHARGE: return ACCESS_LEVEL.RECHARGE;
    case ROLE.CONSUMPTION: return ACCESS_LEVEL.CONSUMPTION;
    case ROLE.STREETVENDOR: return ACCESS_LEVEL.STREETVENDOR;
    case ROLE.CASHIERSTREETVENDOR: return ACCESS_LEVEL.CASHIERSTREETVENDOR;
    case ROLE.WAITER: return ACCESS_LEVEL.WAITER;
    case ROLE.HOSTESS: return ACCESS_LEVEL.HOSTESS;
    default: return -1;
  }
}