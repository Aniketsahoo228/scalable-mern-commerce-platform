import { useState, useEffect, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";

const CollectionPages = () => {
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        { _id: 1, name: "Product 1", price: 1000, images: [{ url: "https://picsum.photos/500/500?random=3" }] },
        { _id: 2, name: "Product 2", price: 1000, images: [{ url: "https://picsum.photos/500/500?random=4" }] },
        { _id: 3, name: "Product 3", price: 1000, images: [{ url: "https://picsum.photos/500/500?random=5" }] },
        { _id: 4, name: "Product 4", price: 1000, images: [{ url: "https://picsum.photos/500/500?random=6" }] },
        { _id: 5, name: "Product 5", price: 1000, images: [{ url: "https://picsum.photos/500/500?random=7" }] },
        { _id: 6, name: "Product 6", price: 1000, images: [{ url: "https://picsum.photos/500/500?random=8" }] },
        { _id: 7, name: "Product 7", price: 1000, images: [{ url: "https://picsum.photos/500/500?random=9" }] },
        { _id: 8, name: "Product 8", price: 1000, images: [{ url: "https://picsum.photos/500/500?random=10" }] },
      ];
      setProducts(fetchedProducts);
    }, 1000);
  }, []);

  return (
    // ✅ Fix 1 — added min-h-screen
    <div className="flex flex-col lg:flex-row min-h-screen">

      {/* Mobile Filter Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" /> Filters
      </button>

      {/* Sidebar — ✅ Fix 2 — added lg:min-w-[256px] */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0 lg:min-w-[256px]`}
      >
        <FilterSidebar />
      </div>

      {/* Main Content — ✅ Fix 3 — added min-w-0 */}
      <div className="flex-grow p-4 min-w-0">
        <h2 className="text-2xl uppercase mb-4">All Collections</h2>

        <div className="flex items-center mb-4">
          <FaFilter />
          <span className="ml-2 text-sm text-gray-600">
            {products.length} items
          </span>
        </div>

        {products.length === 0 ? (
          <p className="text-gray-400 text-sm">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-lg p-4">
                <img
                  src={product.images?.[0]?.url || "https://picsum.photos/500/500?grayscale"}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg mb-3"
                />
                <h3 className="text-sm">{product.name}</h3>
                <p className="text-gray-500">₹{product.price}</p>
              </div>
            ))}
          </div>
        )}
        <SortOptions />
        <ProductGrid  products={products}/>
      </div>

    </div>
  );
};

export default CollectionPages;
