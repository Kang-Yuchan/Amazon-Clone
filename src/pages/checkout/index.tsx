import { NextPage } from 'next';
import Head from 'next/head';
import Header from '../../components/Header';
import { signIn, useSession } from 'next-auth/client';
import Image from 'next/image';
import { useRouter } from 'next/dist/client/router';
import { useRecoilState } from 'recoil';
import { CartItem, cartState } from '../../store/cart';
import CheckoutProduct from '../../components/CheckoutProduct';
import Currency from 'react-currency-formatter';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { Stripe } from 'stripe';
const stripePromise = loadStripe(process.env.stripe_public_key!);

const getAllItemCount = (cart: CartItem[]): number =>
  cart.reduce(
    (total, currentValue) => (total = total + currentValue.itemCount),
    0,
  );

const getAllItemPrice = (cart: CartItem[]): number =>
  cart.reduce(
    (total, currentValue) =>
      (total = total + currentValue.price * currentValue.itemCount),
    0,
  );

const Checkout: NextPage = () => {
  const [session] = useSession();
  const router = useRouter();
  const [cart] = useRecoilState(cartState);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await axios.post('/api/checkout_session', {
      cart,
      email: session?.user?.email,
      name: session?.user?.name,
    });

    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result?.error) {
      alert(result.error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Amazon Cloneショッピングカート</title>
      </Head>
      <div className="bg-gray-100">
        <Header />
        <main className="flex flex-col-reverse md:flex-row mx-autol">
          <div className="flex flex-col flex-grow justify-center items-center m-5 shadow-sm md:mr-10">
            <Image
              src="https://links.papareact.com/ikj"
              width={1020}
              height={250}
              objectFit="contain"
              quality={100}
            />
            <div className="md:bg-white md:p-5 space-y-10 w-full mt-5">
              {session ? (
                <div>
                  {cart.length > 0 ? (
                    <>
                      <h1 className="text-3xl pb-4 border-b-2 border-gray-200 w-full">
                        ショッピングカート
                      </h1>
                      {cart.map((item) => (
                        <CheckoutProduct key={item.id} product={item} />
                      ))}
                    </>
                  ) : (
                    <>
                      <h1 className="text-3xl pb-4 border-b-2 border-gray-200 w-full">
                        お客様のAmazonカートに商品はありません。
                      </h1>
                    </>
                  )}
                </div>
              ) : (
                <>
                  {cart.length > 0 ? (
                    <>
                      <h1 className="text-3xl pb-4 border-b-2 border-gray-200 w-full">
                        ショッピングカート
                      </h1>
                      {cart.map((item) => (
                        <CheckoutProduct key={item.id} product={item} />
                      ))}
                    </>
                  ) : (
                    <div className="flex flex-col md:flex-row items-center md:items-start">
                      <img
                        src="https://m.media-amazon.com/images/G/09/cart/empty/kettle-desaturated._CB424694075_.svg"
                        alt=""
                        className="w-5/6 md:w-2/6 mr-"
                      />
                      <div className="flex flex-col md:ml-5 items-center w-full md:items-start">
                        <h2 className="text-2xl leading-8 font-bold pt-8">
                          Amazonカートは空です
                        </h2>
                        <button
                          onClick={() => signIn()}
                          className="w-full block text-center px-4 py-3  md:w-auto text-base bg-yellow-300 rounded-lg hover:bg-yellow-400 md:px-4 md:py-1 shadow-sm mt-4"
                        >
                          ご自身のアカウントにサインイン
                        </button>
                        <button
                          onClick={() => router.push('/')}
                          className="w-full block text-center px-4 py-3  md:hidden text-base bg-yellow-300 rounded-lg hover:bg-yellow-400 md:px-4 md:py-1 shadow-sm mt-4"
                        >
                          ショッピングを続ける
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-2 md:mt-5 md:mr-5">
            {cart.length > 0 && (
              <div className="md:bg-white md:p-4 mt-5 mx-5 md:m-0">
                <div className="text-xl md:text-lg">
                  <span>
                    小計
                    <span className="hidden md:inline">
                      {' '}
                      ({getAllItemCount(cart)} 個の商品) (税込)
                      <br />:
                    </span>
                  </span>
                  <span className="font-bold">
                    <span className="ml-2 mr-1 md:mx-1">¥</span>
                    <span className="text-2xl md:text-lg">
                      <Currency
                        quantity={getAllItemPrice(cart)}
                        currency="JPY"
                        group=","
                        pattern="##,### "
                      />
                    </span>
                  </span>
                </div>
                <button
                  role="link"
                  disabled={!session}
                  type="button"
                  onClick={createCheckoutSession}
                  className={`w-full block text-center px-4 py-3 text-base rounded-lg ${
                    session
                      ? 'bg-yellow-300 hover:bg-yellow-400'
                      : 'bg-gray-300'
                  } md:px-4 md:py-1 shadow-sm mt-4`}
                >
                  {session ? (
                    <>
                      <span>レジに進む</span>
                      <span className="md:hidden">
                        {' '}
                        ({getAllItemCount(cart)} 個の商品) (税込)
                      </span>
                    </>
                  ) : (
                    <span>サインインしてください</span>
                  )}
                </button>
              </div>
            )}
            <div className="hidden md:block bg-white rounded-lg border border-gray-200 py-3 px-36" />
          </div>
        </main>
      </div>
    </>
  );
};

export default Checkout;
