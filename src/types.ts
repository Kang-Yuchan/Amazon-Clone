export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type RealTimeMoneyOrder = {
  result: 'ok' | string;
  basecode: 'USD';
  update: string;
  source: '*';
  API_URL: 'http://api.aoikujira.com/kawase/';
  money: string;
  JPY: string;
  ARS: string;
  UYU: string;
  ANG: string;
  CAD: string;
  CUP: string;
  GTQ: string;
  KYD: string;
  CRC: string;
  COP: string;
  JMD: string;
  CLP: string;
  DOP: string;
  TTD: string;
  NIO: string;
  HTG: string;
  PAB: string;
  BSD: string;
  BMD: string;
  PYG: string;
  BBD: string;
  BRL: string;
  VES: string;
  BZD: string;
  PEN: string;
  BOB: string;
  HNL: string;
  MXN: string;
  XCD: string;
  XPF: string;
  INR: string;
  IDR: string;
  AUD: string;
  KHR: string;
  SGD: string;
  LKR: string;
  SCR: string;
  THB: string;
  NZD: string;
  NPR: string;
  PKR: string;
  BDT: string;
  FJD: string;
  PHP: string;
  BND: string;
  VND: string;
  MOP: string;
  MYR: string;
  MMK: string;
  LAK: string;
  KRW: string;
  HKD: string;
  TWD: string;
  CNY: string;
  ISK: string;
  ALL: string;
  GBP: string;
  UAH: string;
  HRK: string;
  CHF: string;
  SEK: string;
  RSD: string;
  CZK: string;
  DKK: string;
  NOK: string;
  HUF: string;
  BGN: string;
  BYN: string;
  PLN: string;
  MDL: string;
  EUR: string;
  RON: string;
  RUB: string;
  AZN: string;
  AED: string;
  AMD: string;
  YER: string;
  ILS: string;
  IQD: string;
  IRR: string;
  UZS: string;
  OMR: string;
  KZT: string;
  QAR: string;
  KGS: string;
  KWD: string;
  GEL: string;
  SAR: string;
  TMT: string;
  TRY: string;
  BHD: string;
  JOD: string;
  LBP: string;
};