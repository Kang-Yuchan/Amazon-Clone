import { atom } from "recoil";

export type BasketItem = {
  id: string;
  name: string;
}
export const basketState = atom<BasketItem[]>({
  key: "basketState",
  default: [],
});

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
