import { useState, VFC } from 'react';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import { Product, RealTimeMoneyOrder } from '../../types';
import { StarIcon } from '@heroicons/react/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/outline';
import Currency from 'react-currency-formatter';
import { useRecoilState } from 'recoil';
import { cartState } from '../../store/cart';

const MAX_RATING = 5;
const YEN_PER_DOLLAR_CURRRENT = 113;
type Props = {
  product: Product;
  realTimeMoneyOrder?: RealTimeMoneyOrder;
};
const Product: VFC<Props> = ({ product, realTimeMoneyOrder }) => {
  const productRating = Math.ceil(product.rating.rate);
  const priceAsJpy = realTimeMoneyOrder
    ? Math.ceil(product.price * parseInt(realTimeMoneyOrder.JPY, 10))
    : Math.ceil(product.price * YEN_PER_DOLLAR_CURRRENT);
  const [hasPrime] = useState(Math.random() < 0.5);
  const [cart, setCart] = useRecoilState(cartState);
  const isIncludeInCart = !!cart.find((item) => item.id === product.id);

  const addItemToCart = (product: Product) => {
    if (!isIncludeInCart) {
      setCart((state) => [
        ...state,
        { ...product, itemCount: 1, hasPrime, price: priceAsJpy },
      ]);
    }
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {product.category}
      </p>
      <Image src={product.image} height={200} width={200} objectFit="contain" />
      <h4 className="my-3">{product.title}</h4>
      <div className="flex">
        {Array(MAX_RATING)
          .fill('star')
          .map((__, index) =>
            productRating >= index + 1 ? (
              <StarIcon
                key={index}
                className="text-yellow-500 h-startSolidIcon"
              />
            ) : (
              <StarOutlineIcon key={index} className="h-5 text-yellow-500" />
            ),
          )}
      </div>
      <p className="text-xs my-2 line-clamp-2">{product.description}</p>
      <div className="flex items-center mb-5">
        <div className="text-xs">¥</div>
        <div className="text-2xl h-full pt-1 ml-1">
          <Currency
            quantity={priceAsJpy}
            currency="JPY"
            group=","
            pattern="##,### "
          />
        </div>
      </div>
      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img
            loading="lazy"
            className="w-12"
            src="https://links.papareact.com/fdw"
            alt=""
          />
          <p className="text-xs text-gray-500">無料翌日配達</p>
        </div>
      )}
      <button
        type="button"
        className="mt-auto button"
        disabled={isIncludeInCart}
        onClick={() => addItemToCart(product)}
      >
        {isIncludeInCart ? 'すでにカートに入ってます' : 'カートに入れる'}
      </button>
    </div>
  );
};

export default Product;

export const getServerSideProps: GetServerSideProps = async () => {
  const realTimeMoneyOrder = await fetch(
    'http://api.aoikujira.com/kawase/json/usd',
  ).then((res) => res.json());
  return {
    props: {
      realTimeMoneyOrder,
    },
  };
};
