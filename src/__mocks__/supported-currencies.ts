import { IGetSupportedCurrenciesPayload } from 'src/apis/latestPrice/interface'

export const MOCK_SUPPORTED_CURRENCIES: IGetSupportedCurrenciesPayload[] = [
  {
    currencyGroup: 'BUSD',
    color: '#FEBF11',
    currencySymbol: 'BUSD',
    name: 'Binance USD',
    logo: 'https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_BUSD.svg',
    decimal_point: 18,
    listingDate: '2023-02-06T07:00:00Z',
    wallets: [
      {
        currencyGroup: 'BUSD',
        tokenSymbol: 'BUSD',
        decimal_point: 18,
        tokenType: 'ERC-20',
        blockchain: 'Ethereum',
        explorer: 'https://etherscan.io/tx/',
        listingDate: '2023-02-06T07:00:00Z',
        blockchainName: 'Ethereum',
        logo: 'https://s3.ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/blockchain/ERC-20.svg',
      },
      {
        currencyGroup: 'BUSD',
        tokenSymbol: 'BUSDBSC',
        decimal_point: 18,
        tokenType: 'BEP-20',
        blockchain: 'Binance Smartchain',
        explorer: 'https://bscscan.com/tx/',
        listingDate: '2023-02-06T07:00:01Z',
        blockchainName: 'BNB Smart Chain',
        logo: 'https://s3.ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/blockchain/BEP-20+(BSC).svg',
      },
    ],
  },
  {
    currencyGroup: '1INCH',
    color: '#3B76BA',
    currencySymbol: '1INCH',
    name: '1inch',
    logo: 'https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_1INCH.svg',
    decimal_point: 18,
    listingDate: '2021-08-26T05:15:18Z',
    wallets: [
      {
        currencyGroup: '1INCH',
        tokenSymbol: '1INCH',
        decimal_point: 18,
        tokenType: 'ERC-20',
        blockchain: 'Ethereum',
        explorer: 'https://etherscan.io/tx/',
        listingDate: '2021-08-26T05:15:18Z',
        blockchainName: 'Ethereum',
        logo: 'https://s3.ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/blockchain/ERC-20.svg',
      },
    ],
  },
  {
    currencyGroup: 'ALPHA',
    color: '#1F66E6',
    currencySymbol: 'ALPHA',
    name: 'Alpha Finance',
    logo: 'https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_ALPHA.svg',
    decimal_point: 18,
    listingDate: '2022-01-13T18:15:20Z',
    wallets: [
      {
        currencyGroup: 'ALPHA',
        tokenSymbol: 'ALPHA',
        decimal_point: 18,
        tokenType: 'ERC-20',
        blockchain: 'Ethereum',
        explorer: 'https://etherscan.io/tx/',
        listingDate: '2022-01-13T18:15:20Z',
        blockchainName: 'Ethereum',
        logo: 'https://s3.ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/blockchain/ERC-20.svg',
      },
    ],
  },
  {
    currencyGroup: 'LDO',
    color: '#469BF0',
    currencySymbol: 'LDO',
    name: 'Lido DAO',
    logo: 'https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_LDO.svg',
    decimal_point: 18,
    listingDate: '2022-05-20T04:00:18Z',
    wallets: [
      {
        currencyGroup: 'LDO',
        tokenSymbol: 'LDO',
        decimal_point: 18,
        tokenType: 'ERC-20',
        blockchain: 'Ethereum',
        explorer: 'https://etherscan.io/tx/',
        listingDate: '2022-05-20T04:00:18Z',
        blockchainName: 'Ethereum',
        logo: 'https://s3.ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/blockchain/ERC-20.svg',
      },
    ],
  },
  {
    currencyGroup: 'VET',
    color: '#23B2F9',
    currencySymbol: 'VET',
    name: 'VeChain',
    logo: 'https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_VET.svg',
    decimal_point: 18,
    listingDate: '2022-07-28T07:00:09Z',
    wallets: [
      {
        currencyGroup: 'VET',
        tokenSymbol: 'VET',
        decimal_point: 18,
        tokenType: 'VeChain',
        blockchain: 'VeChain',
        explorer: 'https://explore.vechain.org/transactions/',
        listingDate: '2022-07-28T07:00:09Z',
        blockchainName: 'VeChain',
        logo: 'https://s3.ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/blockchain/Vechain.svg',
      },
    ],
  },
]
