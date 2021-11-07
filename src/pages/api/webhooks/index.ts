import { buffer } from 'micro';
import Cors from 'micro-cors';
import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';
import * as admin from 'firebase-admin';
import serviceAccount from '../../../../serviceAccountKey.json';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-08-27',
});

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    })
  : admin.app();

const endPointSecret = process.env.STRIPE_SIGNING_SECRET!;

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
});

const fulfillOrder = async (session: any) => {
  return app
    .firestore()
    .collection('users')
    .doc(session.metadata.email)
    .collection('orders')
    .add({
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

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
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

    if (event.type === 'payment_intent.succeeded') {
      const session: any = event.data.object;
      fulfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webhook Error: ${err}`));
      res.json({ received: true });
    }
  }
};

export default cors(webhookHandler as any);
