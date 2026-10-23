import { Spinner } from 'react-bootstrap';
import useProducts from '../hooks/use-products';
import ProductCard from './product-card';
import ProductFilterBar from './product-filter-bar';

const ProductList = () => {
  const { products, isLoading, error } = useProducts();

  if (error) {
    return <h2>Failed to load products. Try again later.</h2>;
  }

  return (
    <>
      <div className="d-flex flex-column gap-2">
        <ProductFilterBar />
        {products?.length ? (
          products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <h2>No products found.</h2>
        )}
      </div>

      {isLoading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      )}
    </>
  );
};

export default ProductList;
