export const convertToUSD = (number) => {
  return '$' + parseFloat(number, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
}
