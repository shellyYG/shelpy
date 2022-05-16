require('dotenv').config();
const axios = require('axios');
const CryptoJS = require('crypto-js');
// B2C Receipt
// Production:https://box.ecloudlife.com Test:https://boxtest.ecloudlife.com
const isDeveloping = 0; // TODO

const endpoint = isDeveloping
  ? process.env.RECEIPT_DEV_ENDPOINT
  : process.env.RECEIPT_PRODUCTION_ENDPOINT;

const apiSecret = isDeveloping
  ? process.env.RECEIPT_DEV_API_SECRET
  : process.env.RECEIPT_PRODUCTION_API_SECRET;

const apiKey = isDeveloping
  ? process.env.RECEIPT_DEV_API_KEY
  : process.env.RECEIPT_PRODUCTION_API_KEY;

const today = new Date();
const dateString = `${today.getFullYear()}${('0' + (today.getMonth() + 1)).slice(-2)}${
  ('0' + today.getDate()).slice(-2)
}`;
const timeString = `${('0' + today.getHours()).slice(-2)}${(
  '0' +today.getMinutes()
).slice(-2)}${('0' + today.getSeconds()).slice(-2)}`;

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}


async function generateReceipt({
  buyerId,
  buyerName,
  buyerEmail,
  bookingId,
  payAmount,
}) {
  const data = {
    api_key: apiKey,
    invoice: {
      invoices: [
        {
          order_id: bookingId.toString(),
          buyer: {
            identifier: '00000000', // buyer has no tax ID number
            name: buyerName,
            email_address: buyerEmail,
          },
          invoice_date: dateString, // value of today
          invoice_time: timeString,
          tax_type: '1',
          tax_rate: 0.05,
          tax_amount: 0, // if buyer does not have tax ID number, then this is 0
          sales_amount: parseInt(payAmount),
          free_tax_sales_amount: 0,
          zero_tax_sales_amount: 0,
          total_amount: payAmount,
          member_carrier_inc_id: process.env.RECEIPT_IDENTIFIER,
          member_carrier_identifier: buyerId.toString(),
          print_mark: 'N',
          random_number: parseInt(
            getRandomArbitrary(1000, 9999).toString()
          ).toString(),
          details: [
            {
              description: 'SHELPY SERVICE',
              quantity: 1,
              sequence_number: '1',
              unit_price: payAmount,
              amount: payAmount,
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
    CryptoJS.HmacSHA256(JSON.stringify(data), apiSecret)
  );
  const headers = {
    signature,
  };
  const response = await axios.post(endpoint, data, { headers });
  if (response) {
    const resStatus = response.status;
    const resData = response.data;
    return { status: resStatus, data: resData };
  } else {
    return { status: 500, data: 'error' };
  }
}

module.exports = {
  generateReceipt,
};
