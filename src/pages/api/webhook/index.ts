import { buffer } from 'micro';
import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';
import * as admin from 'firebase-admin';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY!);

const serviceAc: any = {
  type: 'service_account',
  project_id: 'clone-fc324',
  private_key_id: '6f52fea719dc6c37e6f9f256933782eac57d512f',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCRJNN2ofXBbFSO\n9x/xLEkDxtAcTns8EHiUCeyAbr8fky4rJUaGCeNJV3xlGdRtg2+BfcRckbM+lL2z\nPTa6/KDFSryXECVE681wkSM+pDByNMgUgu4oCfuXWpUstUSPLAUJn9BXJ3Y5co/n\nA7Wd4hLOxhhGYLlorru27HF45Bn0Wlp4tgV1IdeMyGuGQPb/u1Fy/MGpESrzDOLy\nncACzVWqvQACfmdbqXxWoBsBA24OuaX3JwGFNaqjXfZusV8E6g1OXFHbS9v8Wgpm\ntNy6pNiB0FPQ5H0T8EAdH+UsJMjdDuty1SiZSoFRDbJWgNYyCuzxnVBrG0s/UPmN\n5XG+/vB3AgMBAAECggEAAUW33tXboCbxdNFgw832E+TlxSHA/c1NKUsO+i8+WKoD\nIRiyDhG/HtD4A7Dexlj9HL77/i2+ywElypDyTmBRjnkxvwdCtGB2zBJRo0ZwMEgb\nKubc7Jftzy1Zmms6XyDtKGDwxBrR8/33mfhT2r71GD/vTYqihXLmrVtUQVGKkrRG\nrWuUT1dXExre+sJvI6JnX1dcBciOfX3O5vQ7gEo1k7t4xefjzFDJ3+0c1/q/tSAA\nd6m2AcQ7W6AjoqYfYDNQVQLJk0AL+VEg8thE+RMYYz67V6AXcfS5MXZ5MfEpPYd2\nAir3Ppog17Fybn0CRpyr6DVSiakYJNSup+/Vhg1lGQKBgQDLC0BA7Ziu3pGXIy3r\nkXvR3Qn8r/QhjC5GEvZ0HsSMQ8/RICzlNPeRg1B+W4WGxSJs9yxtP604K5nvZ9tG\n0QNvUggDEdiJWVZy9sRoXp7T5ofU8aZzZkbQ3eFDg2dHQkjUfMKQCPcK0HFr/LUn\n88G7sewW0Xzirbled91Uqw09fwKBgQC2/7oQw2cbj0TUGyXOISOlIVG+crpvpZEf\n/MfYeBqrkpLyHRDOCQYNQ5vpse1xtDhEgyFFaNopAa6FrEN6wqH6v+WJXgFe859v\nWDmdbLQLI5XE5UmXlRQXKDjErUKpLbvS8vcB60k9GVLqzsseCUhK7LUgNUyBHEC3\n/09tj2m5CQKBgDPSqFCqE9k2F2TC5tqEJF05FG55Hk9drwXVmy+iFrpSKH2Qv8S0\nkyeBo47MnzT5pcK4B4/Ou9BlWIHBOTdG66CDCGZ4LJNJyQXIs/KLi/A7m5mfH8O+\na/6tUuxfYoHOijYpraMDlsIc14YfVsFetqjITaC5US2t920EHOqaSePTAoGAGzmU\nXuYTMuBvpvaa+z2m5ew9Ew5SekWxf4bF3IiRvzDBN8/nLh/djJ+gVHYqEx5yuI6h\npofg3PTpF+325A6MtpdR+MvJfGzWLWR8vdTsPDQBFhfeiPSe1osfVvNH1Y9+P/Xx\nlZGBhdt8oH4/baqH3M22bKJBTXv8jOMo1+3cFrECgYAK8qk505bmAisxyGVtUi+b\nlXT3JvE4JGItnYrny94Uw9vKBYTugr1Sgp9iff9opq3VkDUnTqtp4EeadZ/xFAIa\nHgE677rOxnsBF1mc9T1J/4z95DZ4GrNYS5cC+EUqfLgWaCmmuEOasREgV/sINvi6\n5e5y/7yosue7012+1wjSkw==\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-1qo6d@clone-fc324.iam.gserviceaccount.com',
  client_id: '114097434240322881764',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1qo6d%40clone-fc324.iam.gserviceaccount.com',
};
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAc),
    })
  : admin.app();

const endPointSecret = 'whsec_rAKId4Q3MmA26qzEHLpmhPQ0VeHvxqo7';

export const config = {
  api: {
    bodyParser: false,
  },
};

const fulfillOrder = async (session: any) => {
  return app
    .firestore()
    .collection('users')
    .doc(session.metadata.email)
    .collection('orders')
    .doc(session.id)
    .set({
      amount: session.amount_total,
      amount_shipping: session.total_details.amount_shipping,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(
        `SUCCESS: Order ${session.id} has been added to the DataBase`,
      );
    });
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req, res);
  if (req.method === 'POST') {
    const payload = await buffer(req).toString();
    const stripeSignature = req.headers['stripe-signature']!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        payload,
        stripeSignature,
        endPointSecret,
      );
    } catch (error) {
      return res.status(400).send(`Webhook error: ${error}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session: any = event.data.object;
      fulfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webhook Error: ${err}`));
    }
  }
};
