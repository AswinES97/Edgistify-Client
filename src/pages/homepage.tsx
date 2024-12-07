import { Fragment, useEffect, useState } from "react";
import loadProducts from "../api/productsApi";
import { LoadingSpinner } from "../components/spinner";
import { CardComponent } from "../components/card";
import { IProduct } from "../types/types";
import { Pagination } from "../components/pagination";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const data = await loadProducts(skip, count);
      setProducts(data.products);
      setCount(data.productCount);
    }
    fetchData();
  }, [skip, count]);

  const loading: JSX.Element[] = [];

  for (let i = 0; i < 9; i++) {
    loading.push(<LoadingSpinner key={i} />);
  }

  return (
    <div>
      {products.length === 0 ? (
        <div className="flex flex-wrap gap-5">{loading}</div>
      ) : (
        <Fragment>
          <div className="flex flex-wrap gap-5 w-auto justify-center pt-36">
            {products.map((product: IProduct) => {
              return <CardComponent key={product.id} product={product} />;
            })}
          </div>
          <div className="flex justify-center my-10">
            <Pagination
              totalNumber={Math.ceil(count / 9)}
              skipState={{ skip, setSkip }}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default HomePage;
