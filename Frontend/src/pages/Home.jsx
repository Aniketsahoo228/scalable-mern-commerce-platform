import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../components/Layout/Hero";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";


const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    // Fetch products for a specific collection
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );

    // Fetch best seller product
    const fetchBestSeller = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );

        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBestSeller();
  }, [dispatch]);
  
  return (
    <div style={{ background: '#111' }}>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      {/* Best Seller */}
      <section style={{ background: '#111', padding: '80px 16px' }}>
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: '0.4em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: 12 }}>
              Trending Now
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 48, fontWeight: 300, color: '#fff' }}>
              Best Sellers
            </h2>
            <div style={{ width: 32, height: 1, background: '#c9a96e', margin: '12px auto 0' }} />
          </div>
          {bestSellerProduct ? (<ProductDetails productId={bestSellerProduct._id} />): 
          (<p className ="text-center">Loading best seller product ...</p>) }
          
        </div>
      </section>

      {/* Top Wear for Women */}
      <section style={{ background: '#1a1a1a', padding: '80px 16px' }}>
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: '0.4em', color: '#c9a96e', textTransform: 'uppercase', marginBottom: 12 }}>
              For Her
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 48, fontWeight: 300, color: '#fff' }}>
              Top Wear For Women
            </h2>
            <div style={{ width: 32, height: 1, background: '#c9a96e', margin: '12px auto 24px' }} />
          </div>
          <ProductGrid products={products} loading ={loading} error= {error}/>
        </div>
      </section>

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;
