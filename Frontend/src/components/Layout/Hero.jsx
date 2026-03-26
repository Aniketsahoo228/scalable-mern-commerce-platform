import { Link } from "react-router-dom";
import heroImg from "../../assets/Azurelle.webp";

const Hero = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap');
        .hero-brand { font-family: 'Cormorant Garamond', serif; }
        .hero-body  { font-family: 'Montserrat', sans-serif; }

        .hero-btn {
          display: inline-block;
          padding: 16px 48px;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.5);
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: color 0.4s ease;
        }
        .hero-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #c9a96e;
          transform: translateX(-100%);
          transition: transform 0.4s ease;
          z-index: 0;
        }
        .hero-btn:hover::before { transform: translateX(0); }
        .hero-btn:hover { border-color: #c9a96e; color: #1a1a1a; }
        .hero-btn span { position: relative; z-index: 1; }

        .hero-fade { animation: heroFade 1.2s ease forwards; opacity: 0; }
        .hero-fade-1 { animation-delay: 0.3s; }
        .hero-fade-2 { animation-delay: 0.6s; }
        .hero-fade-3 { animation-delay: 0.9s; }
        @keyframes heroFade {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section className="relative overflow-hidden">
        <img
          src={heroImg}
          alt="Aurelle Hero"
          className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"
          style={{ filter: "brightness(0.65)" }}
        />

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)'
        }} />

        <div className="hero-body absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="hero-fade hero-fade-1 text-[10px] font-semibold tracking-[0.5em] uppercase mb-6"
            style={{ color: '#c9a96e' }}>
            New Season 2026
          </p>
          <h1 className="hero-brand hero-fade hero-fade-2 text-white font-light leading-none mb-6"
            style={{ fontSize: 'clamp(56px, 12vw, 120px)', letterSpacing: '-0.02em' }}>
            Vacation<br /><em>Ready</em>
          </h1>
          <div className="hero-fade hero-fade-2" style={{ width: 40, height: 1, background: '#c9a96e', margin: '0 auto 24px' }} />
          <p className="hero-fade hero-fade-2 text-[12px] tracking-[0.2em] mb-10"
            style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 360 }}>
            Explore our vacation-ready outfits with fast worldwide shipping.
          </p>
          <div className="hero-fade hero-fade-3">
            <Link to="#" className="hero-btn"><span>Shop Now</span></Link>
          </div>
        </div>

        {/* Bottom gold line */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 1, background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)'
        }} />
      </section>
    </>
  );
};

export default Hero;
