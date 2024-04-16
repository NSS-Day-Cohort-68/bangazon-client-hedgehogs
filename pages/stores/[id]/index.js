import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/layout";
import Navbar from "../../../components/navbar";
import { ProductCard } from "../../../components/product/card";
import Detail from "../../../components/store/detail";
import { useAppContext } from "../../../context/state";
import { deleteProduct } from "../../../data/products";
import {
  favoriteStore,
  getStoreById,
  unfavoriteStore,
} from "../../../data/stores";

export default function StoreDetail() {
  const { profile } = useAppContext();
  const router = useRouter();
  const { id } = router.query;
  const [store, setStore] = useState({});
  const [isOwner, setIsOwner] = useState(false);
  const [userStore, setUserStore] = useState({})


  // useEffect(() => {
  //     const x = profile.store[0]

  //     setUserStore(x)
  // }, [profile])

  useEffect(() => {
    if (id) {
      refresh();
    }
    if (parseInt(id) === profile.store[0].id) {
      setIsOwner(true);
    }
  }, [id, profile]);

  const refresh = () =>
    getStoreById(id).then((storeData) => {
      if (storeData) {
        setStore(storeData);
      }
    });

  const removeProduct = (productId) => {
    deleteProduct(productId).then(refresh);
  };

  const favorite = () => {
    const store = {
      "store_id": id
    }
    favoriteStore(store).then(refresh)
  }

  const unfavorite = () => {
    const store = {
      "store_id": id
    }
    unfavoriteStore(store).then(refresh)
  }

  return (
      
    
    <>
    
      <Detail
        store={store}
        isOwner={isOwner}
        favorite={favorite}
        unfavorite={unfavorite}
      />
      <div className="columns is-multiline">
        
        {isOwner ? (
          
          <>
            <div className="column is-full">
              <h2 className="title is-4">Selling</h2>
              <p>
                Quantity:{" "}
                {store.products?.filter((product) => !product.sold).length || 0}{" "}
              </p>
            </div>
            {store.products
              ?.filter((product) => !product.sold)
              .map((product) => (
                <ProductCard
                  product={product}
                  key={product.id}
                  isOwner={isOwner}
                  removeProduct={removeProduct}
                />
              ))}
            <div className="column is-full">
              <h2 className="title is-4">Sold</h2>
              <p>
                Number Sold:{" "}
                {store.products?.filter((product) => product.sold).length || 0}
                <div>
                  {store.products
                    ?.filter((product) => product.sold)
                    .map((product) => (
                      <ProductCard
                        product={product}
                        key={product.id}
                        isOwner={isOwner}
                        removeProduct={removeProduct}
                      />
                    ))}
                </div>
              </p>
            </div>
          </>
        ) : (
          store.products?.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              isOwner={isOwner}
              removeProduct={removeProduct}
            />
          ))
        )}

        {store.products?.length === 0 ? <p>There's no products yet</p> : <></>}
      </div>
    </>
  );
}

StoreDetail.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
};
