export const TRIBUTARY_SITUATION = {
  ISENTO: 0,
  TRIBUTO_18: 1,
  SUBS_TRIBUTARIO: 2,
} as const;

export function convertTrybuIntToPTBR(option: number) {
  if(option === TRIBUTARY_SITUATION.ISENTO) return 'Isento';
  if(option === TRIBUTARY_SITUATION.TRIBUTO_18) return 'Tributado 18%';
  if(option === TRIBUTARY_SITUATION.SUBS_TRIBUTARIO) return 'Substituição Tributária';
  return '';
}