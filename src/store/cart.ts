import { atom, selector } from 'recoil';
import { Product } from '../types';

export type CartItem = Product & {
  itemCount: number;
};

export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: [],
});

/* 이건 redux에서 useSelector로 호출할때처럼 여기 값을 useRecoilValue(selector명)으로 호출가능(갱신은 불가) 
export const cartLengthState = selector<number>({ 
  key: "cartLengthState",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.length;
  },
});
*/
// Usage

/*
  function ShowItems() {
    const [cart, setcart] = useRecoilState(cartState);

    const addTocart = useCallback(() => {
      setcart((state) =>
        [...state, { id: String(state.length + 1), name: "IPhone 13", ...other }].sort((a, b) =>
          a.id.localeCompare(b.id)
        )
      );
    }, [setcart]);

    const removeFromcart = useCallback((selectItemId: string) => {
      setcart((state) => [...state].filter((item) => item.id !== selectItemId));
    }, [setcart]);

    return (
      <div>
        {cart.map((item) => (
          <div key={item.id}>
            <span>{item.name}</span>
            <button type="button" onClick={() => removeFromcart(item.id)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addTocart}>Add</button>
      </div>
    );
  }
*/
