export const FONT_TYPE = {
  UPPERCASE: 0,
  LOWERCASE: 1,
  NORMAL: 2,
} as const;

export function convertIntToTypeFont(type: number) {
  if(type === FONT_TYPE.UPPERCASE) return 'UPPERCASE';
  if(type === FONT_TYPE.LOWERCASE) return 'LOWERCASE';
  if(type === FONT_TYPE.NORMAL) return 'NORMAL';
  return '';
}