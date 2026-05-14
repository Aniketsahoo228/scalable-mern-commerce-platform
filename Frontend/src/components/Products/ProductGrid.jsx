import { Link } from "react-router-dom";

const ProductGrid = ({
  products = [],
  loading,
  error,
}) => {

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
          Loading Products...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-[11px] uppercase tracking-[0.2em] text-red-300">
          Error: {error}
        </p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/35">
          No Products Found
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

      {products.map((product) => {

        const imageUrl =
          product.images?.[0]?.url ||
          "https://placehold.co/400x380?text=No+Image";

        const imageAlt =
          product.images?.[0]?.altText ||
          product.name ||
          "Product Image";

        return (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="group block"
          >
            <div className="overflow-hidden border border-white/[0.04] bg-[#1a1a1a] transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a96e]/20 hover:shadow-2xl">

              <div className="overflow-hidden">
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  loading="lazy"
                  className="h-[380px] w-full object-cover transition-transform duration-[6000ms] group-hover:scale-105"
                />
              </div>

              <div className="border-t border-white/[0.05] bg-[#1a1a1a] p-4 transition-colors duration-300 group-hover:border-[#c9a96e]/25">

                <h3 className="mb-1 line-clamp-1 font-['Cormorant_Garamond'] text-lg font-light text-white">
                  {product.name}
                </h3>

                <p className="text-[11px] font-semibold tracking-[0.25em] text-[#c9a96e]">
                  ${Number(product.price || 0).toLocaleString()}
                </p>

              </div>
            </div>
          </Link>
        );
      })}

    </div>
  );
};

export default ProductGrid;
