import { atom, selector } from "recoil";

export type BasketItem = {
  id: string;
  name: string;
}

export const basketState = atom<BasketItem[]>({ 
  key: "basketState",
  default: [],
});

/* 이건 redux에서 useSelector로 호출할때처럼 여기 값을 useRecoilValue(selector명)으로 호출가능(갱신은 불가) 
export const basketLengthState = selector<number>({ 
  key: "basketLengthState",
  get: ({ get }) => {
    const basket = get(basketState);
    return basket.length;
  },
});
*/
// Usage

/*
  function ShowItems() {
    const [basket, setBasket] = useRecoilState(basketState);

    const addToBasket = useCallback(() => {
      setBasket((state) =>
        [...state, { id: String(state.length + 1), name: "IPhone 13", ...other }].sort((a, b) =>
          a.id.localeCompare(b.id)
        )
      );
    }, [setBasket]);

    const removeFromBasket = useCallback((selectItemId: string) => {
      setBasket((state) => [...state].filter((item) => item.id !== selectItemId));
    }, [setBasket]);

    return (
      <div>
        {basket.map((item) => (
          <div key={item.id}>
            <span>{item.name}</span>
            <button type="button" onClick={() => removeFromBasket(item.id)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addToBasket}>Add</button>
      </div>
    );
  }
*/
