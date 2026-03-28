import { Link } from "react-router-dom";
import mensCollectionImage from "../../assets/mens-collection.webp";
import womensCollectionImage from "../../assets/womens-collection.webp";

const GenderCollectionSection = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@300;400;500;600&display=swap');
        .gc-brand { font-family: 'Cormorant Garamond', serif; }
        .gc-body  { font-family: 'Montserrat', sans-serif; }

        .gc-card {
          position: relative;
          overflow: hidden;
          flex: 1;
          display: block;
          text-decoration: none;
        }
        .gc-card img {
          width: 100%; height: 700px; object-fit: cover;
          transition: transform 8s ease;
          display: block;
        }
        .gc-card:hover img { transform: scale(1.04); }

        .gc-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%);
          transition: background 0.4s ease;
        }
        .gc-card:hover .gc-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 55%);
        }

        .gc-label {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 40px 36px;
        }

        .gc-shop-link {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          position: relative;
          padding-bottom: 3px;
          transition: color 0.3s ease;
        }
        .gc-shop-link::after {
          content: '';
          position: absolute; bottom: 0; left: 0;
          width: 0; height: 1px;
          background: #c9a96e;
          transition: width 0.35s ease;
        }
        .gc-card:hover .gc-shop-link { color: #c9a96e; }
        .gc-card:hover .gc-shop-link::after { width: 100%; }
      `}</style>

      <section className="gc-body py-16 px-4 lg:px-0"
        style={{ background: '#111' }}>
        <div className="container mx-auto">

          {/* Section Label */}
          <div className="text-center mb-10">
            <p className="text-[9px] font-semibold tracking-[0.4em] uppercase mb-3" style={{ color: '#c9a96e' }}>
              Collections
            </p>
            <h2 className="gc-brand text-5xl font-light text-white">Shop by Style</h2>
            <div style={{ width: 32, height: 1, background: '#c9a96e', margin: '12px auto 0' }} />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            {/* Women */}
            <Link to="/collections/all?gender=Women" className="gc-card">
              <img src={womensCollectionImage} alt="Women's Collection" />
              <div className="gc-overlay" />
              <div className="gc-label">
                <p className="text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>For Her</p>
                <h2 className="gc-brand text-4xl font-light text-white mb-4">Women's Collection</h2>
                <span className="gc-shop-link">
                  Shop Now
                </span>
              </div>
            </Link>

            {/* Men */}
            <Link to="/collections/all?gender=Men" className="gc-card">
              <img src={mensCollectionImage} alt="Men's Collection" />
              <div className="gc-overlay" />
              <div className="gc-label">
                <p className="text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>For Him</p>
                <h2 className="gc-brand text-4xl font-light text-white mb-4">Men's Collection</h2>
                <span className="gc-shop-link">
                  Shop Now
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default GenderCollectionSection;
