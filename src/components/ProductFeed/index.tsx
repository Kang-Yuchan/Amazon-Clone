import { VFC } from 'react';
import { Product } from '../../types';
import ProductCard from '../ProductCard';

type Props = {
  products: Product[];
};
const ProductFeed: VFC<Props> = ({ products }) => {
  return (
    <div>
      {products.map((product) => (
        <ProductCard product={product} />
      ))}
    </div>
  );
};

export default ProductFeed;
