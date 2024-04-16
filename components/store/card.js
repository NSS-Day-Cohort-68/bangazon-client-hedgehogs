import Link from "next/link";
import { ProductCard } from "../../components/product/card";

export function StoreCard({ store, width = "is-half" }) {
  return (
    <div className={`column ${width}`}>
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">{store.name}</p>
        </header>
        <div className="card-content">
          <p className="content">Owner: {store.seller.user.username}</p>
          <div className="content">{store.description}</div>
          <div className="content"> {store.products.length} items for sale</div>
        </div>
        <div className="columns is-multiline">
          {store.products.slice(0, 4).map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
        <footer className="card-footer">
          <Link href={`stores/${store.id}`}>
            <a className="card-footer-item">View Store</a>
          </Link>
        </footer>
      </div>
    </div>
  );
}
