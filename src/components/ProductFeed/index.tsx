import { VFC } from 'react';
import { Product } from '../../types';
import ProductCard from '../ProductCard';

type Props = {
  products: Product[];
};
const ProductFeed: VFC<Props> = ({ products }) => {
  const recommendProducts = products.filter(
    (product) => product.rating.rate >= 4,
  );
  const secondRecommendProducts = products.filter(
    (product) => product.rating.rate >= 3 && product.rating.rate < 4,
  );
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 -mt-14 mx-auto">
      {products.slice(0, 4).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <div className="md:col-span-full bg-white py-2 px-5 mx-5">
        <p className="text-lg md:text-base">おすすめはこちら</p>
        <div className="flex overflow-x-scroll space-x-10 w-full h-72 py-5">
          {recommendProducts.map((product) => (
            <img src={product.image} className="w-48 object-contain" alt="" />
          ))}
        </div>
      </div>
      <div className="md:col-span-2">
        {products.slice(4, 5).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.slice(6, 12).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <div className="md:col-span-full bg-white py-2 px-5 mx-5">
        <p className="text-lg md:text-base">こちらもおすすめ</p>
        <div className="flex overflow-x-scroll space-x-10 w-full h-72 py-5">
          {secondRecommendProducts.map((product) => (
            <img src={product.image} className="w-48 object-contain" alt="" />
          ))}
        </div>
      </div>
      <div className="md:col-span-2">
        {products.slice(13, 14).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.slice(15, products.length).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductFeed;
