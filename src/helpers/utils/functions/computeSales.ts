import Money from "../money/money";

function getStartEndWeek() {
  const curr = new Date; // get current date
  curr.setDate(curr.getDate() - 7)
  const first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  const last = first + 7; // last day is the first day + 6

  const firstdayWeek = new Date(curr.setDate(first + 1)).getDate();
  const lastdayWeek = new Date(curr.setDate(last)).getDate();

  return { firstdayWeek, lastdayWeek };
}

function differenceTwoDates(start: any, end: any) {
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function computeSalesInterval(sales: any) {
  const today = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const yesterday = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const week = [0, 0, 0, 0, 0, 0, 0];
  const lastweek = [0, 0, 0, 0, 0, 0, 0];
  const month = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 28

  const dateNow = new Date();
  const thisDay = dateNow.getDate();

  const end = new Date();
  end.setHours(23, 59, 59, 0);

  sales.forEach((sale: any) => {
    const saleDate = sale.created_at.toDate();

    const differenceDate = differenceTwoDates(saleDate, end)

    if (differenceDate <= 28) {// Este mês
      month[28 - differenceDate] += sale.value
      if (differenceDate <= 7) {// Esta semana
        week[7 - differenceDate] += sale.value;
        if (saleDate.getDate() === thisDay) {// Hoje
          today[saleDate.getHours()] += sale.value;
        } else if (saleDate.getDate() === thisDay - 1) {// Ontem
          yesterday[saleDate.getHours()] += sale.value;
        }
      } else if (differenceDate <= 14) {// Semana passada
        lastweek[14 - differenceDate] += sale.value;
      }
    }
  })

  return {
    today: today.map(item => Money.centsToCoin(item)),
    yesterday: yesterday.map(item => Money.centsToCoin(item)),
    week: week.map(item => Money.centsToCoin(item)),
    lastweek: lastweek.map(item => Money.centsToCoin(item)),
    month: month.map(item => Money.centsToCoin(item)),
  }
}