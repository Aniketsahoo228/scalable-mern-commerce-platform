import { Link } from "react-router-dom";

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return <p>Loading ...</p>
  }

  if (error) {
    return <p>Error:{error}</p>
  }
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@300;400;500;600&display=swap');
        .pg-brand { font-family: 'Cormorant Garamond', serif; }
        .pg-body  { font-family: 'Montserrat', sans-serif; }

        .pg-card { position: relative; overflow: hidden; background: #1a1a1a; }
        .pg-card img {
          width: 100%; height: 380px; object-fit: cover;
          transition: transform 6s ease;
          display: block;
        }
        .pg-card:hover img { transform: scale(1.05); }

        .pg-card-bar {
          padding: 16px;
          border-top: 1px solid rgba(255,255,255,0.05);
          background: #1a1a1a;
          transition: border-color 0.3s ease;
        }
        .pg-card:hover .pg-card-bar { border-color: rgba(201,169,110,0.3); }
      `}</style>

      <div className="pg-body grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {products.map((product, index) => (
          <Link key={index} to={`/product/${product._id}`} className="block">
            <div className="pg-card">
              <img
                src={product.images[0].url}
                alt={product.images[0].altText || product.name}
              />
              <div className="pg-card-bar">
                <h3 className="pg-brand text-lg font-light text-white mb-1">{product.name}</h3>
                <p className="text-[11px] tracking-widest font-semibold" style={{ color: '#c9a96e' }}>
                  ${product.price}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProductGrid;
