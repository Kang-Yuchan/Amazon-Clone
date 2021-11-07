import { NextApiRequest, NextApiResponse } from 'next';
import { CartItem } from '../../../store/cart';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY!);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { cart, email, name } = req.body;

  const transformedCart = cart.map((item: CartItem) => ({
    description: item.description,
    quantity: item.itemCount,
    price_data: {
      currency: 'jpy',
      unit_amount: item.price,
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_rates: ['shr_1Jt5OcF9zhPpdiZKM9C3Txwj'],
    shipping_address_collection: {
      allowed_countries: ['JP', 'US'],
    },
    line_items: transformedCart,
    mode: 'payment',
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(cart.map((item: CartItem) => item.image)),
    },
  });

  res.status(200).json({ id: session.id });
};
