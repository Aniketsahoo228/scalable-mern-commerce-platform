import { useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";

const selectedProduct = {
  name: "Stylish Jacket", price: 1200, originalPrice: 1500,
  description: "This is a stylish jacket perfect for any occasion.",
  brand: "FashionBrand", material: "Leather",
  sizes: ["S", "M", "L", "XL"], color: ["Red", "Black"],
  images: [
    { url: "https://picsum.photos/500/500?random=1", altText: "Stylish Jacket 1" },
    { url: "https://picsum.photos/500/500?random=2", altText: "Stylish Jacket 2" },
  ],
};

const similarProducts = [
  { _id: 1, name: "Product 1", price: 1000, images: [{ url: "https://picsum.photos/500/500?random=3" }] },
  { _id: 2, name: "Product 2", price: 1000, images: [{ url: "https://picsum.photos/500/500?random=4" }] },
  { _id: 3, name: "Product 3", price: 1000, images: [{ url: "https://picsum.photos/500/500?random=5" }] },
  { _id: 4, name: "Product 4", price: 1000, images: [{ url: "https://picsum.photos/500/500?random=6" }] },
];

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState(selectedProduct.images[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const isButtonDisabled = !selectedSize || !selectedColor || isProcessing;

  const handleAddCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color", { duration: 1000 });
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      toast.success("Added to cart!", { duration: 1000 });
      setIsProcessing(false);
    }, 500);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@300;400;500;600&display=swap');
        .pd-brand { font-family: 'Cormorant Garamond', serif; }
        .pd-body  { font-family: 'Montserrat', sans-serif; }

        .pd-thumb {
          width: 72px; height: 72px; object-fit: cover; cursor: pointer;
          border: 1px solid rgba(255,255,255,0.05);
          transition: border-color 0.3s ease;
        }
        .pd-thumb.active { border-color: #c9a96e; }
        .pd-thumb:hover { border-color: rgba(201,169,110,0.5); }

        .pd-size-btn {
          padding: 8px 16px;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px; font-weight: 500; letter-spacing: 0.15em;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent; color: rgba(255,255,255,0.5);
          cursor: pointer; transition: all 0.3s ease;
        }
        .pd-size-btn:hover { border-color: rgba(201,169,110,0.4); color: #c9a96e; }
        .pd-size-btn.active { border-color: #c9a96e; color: #c9a96e; background: rgba(201,169,110,0.08); }

        .pd-qty-btn {
          width: 36px; height: 36px;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent; color: rgba(255,255,255,0.6);
          font-size: 18px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s ease;
        }
        .pd-qty-btn:hover { border-color: #c9a96e; color: #c9a96e; }

        .pd-add-btn {
          width: 100%; padding: 18px;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px; font-weight: 600; letter-spacing: 0.3em; text-transform: uppercase;
          border: none; cursor: pointer;
          background: #c9a96e; color: #1a1a1a;
          position: relative; overflow: hidden;
          transition: opacity 0.3s ease;
        }
        .pd-add-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: #1a1a1a;
          transform: translateX(-100%);
          transition: transform 0.4s ease; z-index: 0;
        }
        .pd-add-btn:not(:disabled):hover::before { transform: translateX(0); }
        .pd-add-btn:not(:disabled):hover { color: #c9a96e; }
        .pd-add-btn span { position: relative; z-index: 1; }
        .pd-add-btn:disabled { opacity: 0.4; cursor: not-allowed; }
      `}</style>

      <div className="pd-body" style={{ background: '#111' }}>
        <div className="max-w-6xl mx-auto px-6 py-16">

          <div className="flex flex-col md:flex-row gap-12">

            {/* Images */}
            <div className="md:w-1/2 flex gap-4">
              {/* Thumbnails */}
              <div className="hidden md:flex flex-col gap-3">
                {selectedProduct.images.map((img, i) => (
                  <img
                    key={i} src={img.url} alt={img.altText}
                    onClick={() => setMainImage(img)}
                    className={`pd-thumb ${mainImage.url === img.url ? "active" : ""}`}
                  />
                ))}
              </div>
              {/* Main */}
              <div className="flex-1 overflow-hidden">
                <img src={mainImage.url} alt="Main" className="w-full h-auto object-cover" style={{ display: 'block' }} />
              </div>
            </div>

            {/* Mobile thumbnails */}
            <div className="md:hidden flex gap-3 overflow-x-auto">
              {selectedProduct.images.map((img, i) => (
                <img key={i} src={img.url} alt={img.altText} onClick={() => setMainImage(img)}
                  className={`pd-thumb flex-shrink-0 ${mainImage.url === img.url ? "active" : ""}`} />
              ))}
            </div>

            {/* Info */}
            <div className="md:w-1/2">
              <p className="text-[9px] font-semibold tracking-[0.4em] uppercase mb-3" style={{ color: '#c9a96e' }}>
                {selectedProduct.brand}
              </p>
              <h1 className="pd-brand text-5xl font-light text-white mb-4">{selectedProduct.name}</h1>
              <div style={{ width: 32, height: 1, background: '#c9a96e', marginBottom: 16 }} />

              <div className="flex items-baseline gap-3 mb-6">
                <span className="pd-brand text-3xl font-light text-white">₹{selectedProduct.price}</span>
                <span className="text-sm line-through" style={{ color: 'rgba(255,255,255,0.25)' }}>₹{selectedProduct.originalPrice}</span>
                <span className="text-[10px] tracking-widest" style={{ color: '#c9a96e' }}>
                  {Math.round((1 - selectedProduct.price / selectedProduct.originalPrice) * 100)}% OFF
                </span>
              </div>

              <p className="text-[12px] leading-relaxed tracking-wide mb-8" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {selectedProduct.description}
              </p>

              {/* Color */}
              <div className="mb-6">
                <p className="text-[9px] font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Color {selectedColor && <span style={{ color: '#c9a96e' }}>— {selectedColor}</span>}
                </p>
                <div className="flex gap-3">
                  {selectedProduct.color.map((color) => (
                    <button
                      key={color} onClick={() => setSelectedColor(color)}
                      style={{
                        width: 28, height: 28, borderRadius: '50%',
                        backgroundColor: color.toLowerCase(),
                        filter: "brightness(0.6)",
                        border: selectedColor === color ? "2px solid #c9a96e" : "2px solid rgba(255,255,255,0.1)",
                        cursor: 'pointer', transition: 'border-color 0.3s ease',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="mb-8">
                <p className="text-[9px] font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Size {selectedSize && <span style={{ color: '#c9a96e' }}>— {selectedSize}</span>}
                </p>
                <div className="flex gap-2">
                  {selectedProduct.sizes.map((size) => (
                    <button key={size} onClick={() => setSelectedSize(size)}
                      className={`pd-size-btn ${selectedSize === size ? "active" : ""}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <p className="text-[9px] font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>Quantity</p>
                <div className="flex items-center gap-0">
                  <button className="pd-qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                  <span className="w-12 text-center text-white text-sm" style={{ border: '1px solid rgba(255,255,255,0.1)', height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {quantity}
                  </span>
                  <button className="pd-qty-btn" onClick={() => setQuantity(q => q + 1)}>+</button>
                </div>
              </div>

              {/* Add to Cart */}
              <button className="pd-add-btn" onClick={handleAddCart} disabled={isProcessing}>
                <span>{isProcessing ? "Adding..." : "Add to Cart"}</span>
              </button>

              {/* Characteristics */}
              <div className="mt-10" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 24 }}>
                <p className="text-[9px] font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: '#c9a96e' }}>Details</p>
                {[
                  { label: "Brand", value: selectedProduct.brand },
                  { label: "Material", value: selectedProduct.material },
                ].map((row, i, arr) => (
                  <div key={row.label} className="flex justify-between py-3"
                    style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                    <span className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>{row.label}</span>
                    <span className="text-[12px] text-white tracking-wide">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Similar Products */}
          <div className="mt-24">
            <div className="text-center mb-10">
              <p className="text-[9px] font-semibold tracking-[0.4em] uppercase mb-3" style={{ color: '#c9a96e' }}>Discover More</p>
              <h2 className="pd-brand text-5xl font-light text-white">You May Also Like</h2>
              <div style={{ width: 32, height: 1, background: '#c9a96e', margin: '12px auto 0' }} />
            </div>
            <ProductGrid products={similarProducts} />
          </div>

        </div>
      </div>
    </>
  );
};

export default ProductDetails;