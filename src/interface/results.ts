export default interface ResultsContextInterface {
  sales: any[],
  productsSold: any[] | null,
  productsDicionary: any | null,
  complementsSold: any[] | null,
  totems: any[] | null,
  totemsDicionary: any | null,
  complamentsDicionary: any | null,
  setdataFilter: (data: any) => void,
  dataFilter: {
    store: string,
    firstDate: string,
    secondDate: string,
  },
  eatHere: number,
  toTake: number,
}