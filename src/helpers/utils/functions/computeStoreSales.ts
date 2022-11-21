import Money from "../money/money";

function differenceTwoDates(start: any, end: any) {
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function computeSalesStore(storesData: any, sales: any) {

  const end = new Date();
  end.setHours(23, 59, 59, 0);

  sales.forEach((sale: any) => {
    const saleDate = sale.created_at.toDate();
    const differenceDate = differenceTwoDates(saleDate, end)

    if (differenceDate <= 28 && storesData[sale.storeId]) {
      storesData[sale.storeId].data[28 - differenceDate] += sale.value;
    }
  })

  Object.keys(storesData).forEach(key => {
    storesData[key].data.forEach((item: any) => item = Money.centsToCoin(item))
  })
}