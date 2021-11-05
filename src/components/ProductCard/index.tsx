import { VFC } from 'react';
import { Product } from '../../types';

type Props = {
  product: Product;
};
const Product: VFC<Props> = ({ product }) => {
  return <p>{product.title}</p>;
};

export default Product;
