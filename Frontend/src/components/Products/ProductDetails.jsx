import { useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";

const selectedProduct = {
  name: "Stylish Jacket",
  price: 1200,
  originalPrice: 1500,
  description: "This is a stylish jacket perfect for any occasion.",
  brand: "FashionBrand",
  material: "Leather",
  sizes: ["S", "M", "L", "XL"],
  color: ["Red", "Black"],
  images: [
    {
      url: "https://picsum.photos/500/500?random=1",
      altText: "Stylish Jacket 1",
    },
    {
      url: "https://picsum.photos/500/500?random=2",
      altText: "Stylish Jacket 2",
    },
  ],
};

const similarProducts = [
    {
   _id: 1,
   name : "Product 1",
   price: 1000,
   images: [{url: "https://picsum.photos/500/500?random=3"}]
},{
   _id: 2,
   name : "Product 1",
   price: 1000,
   images: [{url: "https://picsum.photos/500/500?random=4"}]
},{
   _id: 3,
   name : "Product 1",
   price: 1000,
   images: [{url: "https://picsum.photos/500/500?random=5"}]
},{
   _id: 4,
   name : "Product 1",
   price: 1000,
   images: [{url: "https://picsum.photos/500/500?random=6"}]
},
];

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState(selectedProduct.images[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsButtonDisabled] = useState(false);
  const isButtonDisabled = !selectedSize || !selectedColor || isProcessing;

  const handleAddCart = () => {
    if (isButtonDisabled) {
      toast.error("Please select a size and color before adding to cart", {duration : 1000, });
      return;
    }
    setIsButtonDisabled(true);

    setTimeout(() => {
        toast.success("product add is cart!", {
            duration:1000,
        });
        setIsButtonDisabled(false);
    }, 500);
  };
  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 flex">
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {selectedProduct.images.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt={img.altText || `Thumbnail ${index}`}
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                    mainImage.url === img.url ? "border-black" : "border-gray-300"
                  }`}
                />
              ))}
            </div>

            <div className="mb-4 w-full">
              <img
                src={mainImage.url}
                alt="Main Product"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
            {selectedProduct.images.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={img.altText || `Thumbnail ${index}`}
                onClick={() => setMainImage(img)}
	               className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                    mainImage.url === img.url ? "border-black" : "border-gray-300"
                  }`}
              />
            ))}
          </div>

          <div className="md:w-1/2 md:ml-10">
            <h3 className="text-2xl font-semibold text-gray-900">{selectedProduct.name}</h3>

            <p className="mt-2 text-xl font-bold text-gray-900">Rs. {selectedProduct.price}</p>
            <p className="text-gray-500 line-through">Rs. {selectedProduct.originalPrice}</p>

            <p className="mt-4 text-gray-700">{selectedProduct.description}</p>
            
                <div className="mb-4">
                <p className="text-gray-700">Color:</p>
                <div className="flex gap-2 mt-2">
                    {selectedProduct.color.map((color) => (
                    <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border ${
                        selectedColor === color
                            ? "border-4 border-black"
                            : "border-gray-300"
                        }`}
                        style={{
                        backgroundColor: color.toLowerCase(),
                        filter: "brightness(0.5)",
                        }}
                    ></button>
                    ))}
                </div>
                </div>
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-2">Sizes</h4>
              <div className="flex gap-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 border rounded text-sm ${
                      selectedSize === size ? "bg-black text-white border-black" : "text-gray-800"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-700">Quantity</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2 py-1 bg-gray-200 text-lg"
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2 py-1 bg-gray-200 text-lg"
                >
                  +
                </button>
              </div>
            </div>

           <button
                onClick={handleAddCart}
                disabled={isProcessing}
                className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${
                    isButtonDisabled
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-gray-900"
                }`}
                >
                {isProcessing ? "Adding..." : "ADD TO CART"}
            </button>

            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1">Brand</td>
                     <td className="py-1">{selectedProduct.brand}</td> 
                  </tr>
                  <tr>
                    <td className="py-1">Material</td>
                     <td className="py-1">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className = "mt-20">
          <h2 className="text-2xl text-center font-bold mb-4">
            You May Also Like
          </h2>
          <ProductGrid products = {similarProducts}/>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

/*
Legacy draft (kept intentionally for future reference):

<div className="md:hidden flex overall-x-scroll space-x-4 mb-4">
  {selectedProduct.images.map((img, index) => (
    <img
      key={index}
      src={img.url}
      alt={img.altText || `Thumbnail ${index}`}
      onClick={() => setMainImage(img)}
      className="w-20 h-20 object-cover rounded-lg cursor-pointer border"
    />
  ))}
</div>

<div className="felx items-center space-x-4 mt-2">...</div>
*/
