import { VFC } from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import { signIn, useSession } from 'next-auth/client';
import Image from 'next/image';
import { useRouter } from 'next/dist/client/router';
import { useRecoilState } from 'recoil';
import { cartState } from '../../store/cart';
import CheckoutProduct from '../../components/CheckoutProduct';

const Checkout: VFC = () => {
  const [session] = useSession();
  const router = useRouter();
  const [cart] = useRecoilState(cartState);
  return (
    <>
      <Head>
        <title>Amazon Cloneショッピングカート</title>
      </Head>
      <div className="bg-gray-100">
        <Header />
        <main className="flex mx-autol">
          <div className="flex flex-col flex-grow justify-center items-center m-5 shadow-sm mr-10">
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
          <div className="bg-white rounded-xl border border-gray-200 py-4 px-5"></div>
        </main>
      </div>
    </>
  );
};

export default Checkout;
