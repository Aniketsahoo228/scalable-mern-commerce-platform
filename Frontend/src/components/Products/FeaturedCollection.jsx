import { Link } from "react-router-dom";
import featured from "../../assets/featured.webp";

const FeaturedCollection = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@300;400;500;600&display=swap');
        .fc-brand { font-family: 'Cormorant Garamond', serif; }
        .fc-body  { font-family: 'Montserrat', sans-serif; }

        .fc-btn {
          display: inline-block;
          padding: 16px 44px;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: #1a1a1a; background: #c9a96e;
          text-decoration: none;
          position: relative; overflow: hidden;
          transition: color 0.4s ease;
        }
        .fc-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: #1a1a1a;
          transform: translateX(-100%);
          transition: transform 0.4s ease; z-index: 0;
        }
        .fc-btn:hover::before { transform: translateX(0); }
        .fc-btn:hover { color: #c9a96e; }
        .fc-btn span { position: relative; z-index: 1; }

        .fc-img-wrap { overflow: hidden; }
        .fc-img-wrap img { transition: transform 8s ease; display: block; }
        .fc-img-wrap:hover img { transform: scale(1.03); }
      `}</style>

      <section className="fc-body py-20 px-4 lg:px-0"
        style={{ background: '#111' }}>
        <div className="container mx-auto">
          <div className="flex flex-col-reverse lg:flex-row items-stretch"
            style={{ border: '1px solid rgba(201,169,110,0.15)' }}>

            {/* Left Text */}
            <div className="lg:w-1/2 flex flex-col justify-center p-12 lg:p-16"
              style={{ background: '#1a1a1a' }}>
              <p className="text-[9px] font-semibold tracking-[0.4em] uppercase mb-4" style={{ color: '#c9a96e' }}>
                Featured
              </p>
              <h2 className="fc-brand text-5xl lg:text-6xl font-light text-white leading-tight mb-6">
                Apparel made for<br /><em>everyday life</em>
              </h2>
              <div style={{ width: 32, height: 1, background: '#c9a96e', marginBottom: 24 }} />
              <p className="text-[12px] leading-relaxed tracking-wide mb-10"
                style={{ color: 'rgba(255,255,255,0.4)', maxWidth: 380 }}>
                Discover high-quality, comfortable clothing that effortlessly blends fashion and function. Designed to make you look and feel great every day.
              </p>
              <div>
                <Link to="/collections/all" className="fc-btn"><span>Shop Now</span></Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="fc-img-wrap lg:w-1/2">
              <img src={featured} alt="Featured Collection" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedCollection;
