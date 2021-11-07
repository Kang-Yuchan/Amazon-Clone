import React, { useCallback, VFC } from 'react';
import { CartItem, cartState } from '../../store/cart';
import Image from 'next/image';
import Currency from 'react-currency-formatter';
import { useRecoilState } from 'recoil';

const AVAILABLE_ITEM_COUNT_SELECT = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

type Props = {
  product: CartItem;
};
const CheckoutProduct: VFC<Props> = ({ product }) => {
  const [cart, setCart] = useRecoilState(cartState);
  const onChangeItemCount = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCart: CartItem[] = [...cart].map((item) =>
      item.id === product.id
        ? { ...item, itemCount: parseInt(e.target.value, 10) }
        : item,
    );
    setCart(newCart);
  };

  const removeFromCart = () => {
    const filteredCart = [...cart].filter((item) => item.id !== product.id);
    setCart(filteredCart);
  };

  return (
    <div className="grid grid-cols-5 border border-gray-200 p-3 mt-5">
      <Image src={product.image} height={200} width={180} objectFit="contain" />
      <div className="col-span-3 mx-5">
        <p>{product.title}</p>
        <p className="text-xs my-2 line-clamp-3">{product.description}</p>
        <div className="flex font-bold text-lg items-center">
          <span className="mr-1">¥</span>
          <span>
            <Currency
              quantity={product.price}
              currency="JPY"
              group=","
              pattern="##,### "
            />
          </span>
        </div>
        {product.hasPrime && (
          <div className="flex items-center space-x-1">
            <img
              loading="lazy"
              className="w-12"
              src="https://links.papareact.com/fdw"
              alt=""
            />
            <p className="text-xs text-gray-500">プライム無料配送</p>
          </div>
        )}
        <div className="flex">
          <select
            name=""
            id=""
            className="mr-2 cursor-pointer rounded-lg border-solid border border-gray-200 bg-gray-100 p-1 px-3 text-xm"
            onChange={onChangeItemCount}
            value={product.itemCount}
          >
            {AVAILABLE_ITEM_COUNT_SELECT.map((val) => (
              <option value={val}>数量: {val}</option>
            ))}
          </select>
          <span
            className="px-2 border-gray-200 blueLink"
            onClick={removeFromCart}
          >
            削除
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;
