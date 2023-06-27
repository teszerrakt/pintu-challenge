import { IGetPriceChangeResponse } from 'src/interface'

export const MOCK_PRICE_CHANGE_DATA: IGetPriceChangeResponse[] = [
  {
    pair: 'busd/idr',
    latestPrice: '15015',
    day: '0.15',
    week: '0.16',
    month: '0.41',
    year: '1.22',
  },
  {
    pair: '1inch/idr',
    latestPrice: '4876',
    day: '-3.86',
    week: '17.98',
    month: '-16.72',
    year: '-54.89',
  },
  {
    pair: 'alpha/idr',
    latestPrice: '1762',
    day: '-4.13',
    week: '3.34',
    month: '11.66',
    year: '-10.19',
  },
  {
    pair: 'ldo/idr',
    latestPrice: '28919',
    day: '-1.28',
    week: '0.00',
    month: '-2.87',
    year: '203.83',
  },
  {
    pair: 'vet/idr',
    latestPrice: '280',
    day: '2.19',
    week: '26.13',
    month: '-2.10',
    year: '-27.84',
  },
]
