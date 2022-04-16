require('dotenv').config();
const axios = require('axios');
const CryptoJS = require('crypto-js');
// B2C Receipt
// Production:https://box.ecloudlife.com Test:https://boxtest.ecloudlife.com
const isDeveloping = 1;

const API_SECRET = process.env.RECEIPT_API_SECRET;
const endpoint = isDeveloping
  ? process.env.RECEIPT_DEV_ENDPOINT
  : process.env.RECEIPT_PRODUCTION_ENDPOINT;

const data = {
  api_key: process.env.RECEIPT_API_KEY,
  invoice: {
    invoices: [
      {
        order_id: 'AA00000000',
        buyer: { identifier: '53567686', name: '1234' },
        invoice_date: '20220416', // value of today
        invoice_time: '183000',
        tax_type: '1',
        tax_rate: 0.5,
        tax_amount: 24,
        sales_amount: 1234,
        free_tax_sales_amount: 12,
        zero_tax_sales_amount: 123,
        total_amount: 1234,
        print_mark: 'Y',
        random_number: 'AAAA',
        details: [
          {
            description: 'FOOD',
            quantity: 1,
            sequence_number: '1',
            unit_price: 1000,
            amount: 245,
          },
        ],
      },
    ],
  },
  pos_id: '',
  auto_assign_invoice_track: true,
  for_print: false,
  callback_url: null,
};
const signature = CryptoJS.enc.Base64.stringify(
  CryptoJS.HmacSHA256(JSON.stringify(data), API_SECRET)
);

async function run() {
  const headers = {
    signature,
  };
  const response = await axios.post(endpoint, data, { headers });
  console.log('response: ', response.data);
}

run();
