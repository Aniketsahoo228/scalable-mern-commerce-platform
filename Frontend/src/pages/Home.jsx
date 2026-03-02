import Hero from "../components/Layout/Hero";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";

const placeholderProducts = Array.from({ length: 8 }, (_, i) => ({
  _id: i + 1,
  name: "Product " + (i + 1),
  price: 1000,
  images: [{ url: `https://picsum.photos/500/500?random=${i + 3}` }],
}));

const Home = () => {
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
          <ProductDetails />
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
          <ProductGrid products={placeholderProducts} />
        </div>
      </section>

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;