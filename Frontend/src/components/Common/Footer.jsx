import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandLinkedin } from "react-icons/tb";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Montserrat:wght@300;400;500;600&display=swap');
        .footer-root { font-family: 'Montserrat', sans-serif; }
        .footer-brand { font-family: 'Cormorant Garamond', serif; }

        .footer-link {
          font-size: 12px;
          letter-spacing: 0.08em;
          color: #8a8078;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          padding-bottom: 2px;
        }
        .footer-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1px;
          background: #c9a96e;
          transition: width 0.3s ease;
        }
        .footer-link:hover { color: #c9a96e; }
        .footer-link:hover::after { width: 100%; }

        .footer-social {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px; height: 34px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.5);
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .footer-social:hover {
          border-color: #c9a96e;
          color: #c9a96e;
          background: rgba(201,169,110,0.08);
        }

        .footer-input {
          flex: 1;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-right: none;
          padding: 12px 16px;
          font-size: 11px;
          letter-spacing: 0.1em;
          color: #fff;
          outline: none;
          font-family: 'Montserrat', sans-serif;
          transition: border-color 0.3s ease;
        }
        .footer-input::placeholder { color: rgba(255,255,255,0.25); }
        .footer-input:focus { border-color: rgba(201,169,110,0.5); }

        .footer-btn {
          background: #c9a96e;
          color: #1a1a1a;
          border: none;
          padding: 12px 20px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          transition: background 0.3s ease;
        }
        .footer-btn:hover { background: #e0be85; }
      `}</style>

      <footer
        className="footer-root"
        style={{
          background: "linear-gradient(180deg, #1a1a1a 0%, #111 100%)",
          borderTop: "1px solid rgba(201,169,110,0.2)",
        }}
      >
        <div className="container mx-auto px-6 pt-16 pb-8">

          {/* Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">

            {/* Newsletter */}
            <div>
              <p className="footer-brand text-3xl font-light tracking-[0.25em] text-white mb-1">AURELLE</p>
              <div style={{ width: 28, height: 1, background: '#c9a96e', marginBottom: 20 }} />
              <p className="text-[12px] leading-relaxed tracking-wide mb-2" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Be the first to hear about new arrivals, exclusive events, and special offers.
              </p>
              <p className="text-[11px] font-semibold tracking-widest uppercase mb-5" style={{ color: '#c9a96e' }}>
                Get 10% off your first order
              </p>
              <div className="flex">
                <input className="footer-input" type="email" placeholder="Your email address" required />
                <button className="footer-btn" type="submit">Join</button>
              </div>
            </div>

            {/* Shop */}
            <div>
              <p className="text-[9px] font-semibold tracking-[0.3em] uppercase mb-5" style={{ color: '#c9a96e' }}>Shop</p>
              <ul className="space-y-3">
                {["Men's Top Wear", "Women's Top Wear", "Men's Bottom Wear", "Women's Bottom Wear"].map((item) => (
                  <li key={item}><Link to="#" className="footer-link">{item}</Link></li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <p className="text-[9px] font-semibold tracking-[0.3em] uppercase mb-5" style={{ color: '#c9a96e' }}>Support</p>
              <ul className="space-y-3">
                {["Contact Us", "About Us", "FAQs", "Features"].map((item) => (
                  <li key={item}><Link to="#" className="footer-link">{item}</Link></li>
                ))}
              </ul>
            </div>

            {/* Follow */}
            <div>
              <p className="text-[9px] font-semibold tracking-[0.3em] uppercase mb-5" style={{ color: '#c9a96e' }}>Follow Us</p>
              <div className="flex items-center space-x-2 mb-8">
                <a href="https://www.linkedin.com/in/aniket-sahoo-b17496299/" target="_blank" rel="noopener noreferrer" className="footer-social">
                  <TbBrandLinkedin className="h-4 w-4" />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social">
                  <IoLogoInstagram className="h-4 w-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social">
                  <RiTwitterXLine className="h-3.5 w-3.5" />
                </a>
              </div>

              <p className="text-[9px] font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>Call Us</p>
              <a
                href="tel:+917978244564"
                className="flex items-center gap-2 text-[12px] tracking-wide transition-colors duration-300"
                style={{ color: 'rgba(255,255,255,0.55)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#c9a96e'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
              >
                <FiPhoneCall className="h-3.5 w-3.5" />
                +91-797-824-4564
              </a>
            </div>

          </div>

          {/* Bottom Bar */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24 }}
            className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
              © 2026 Aurelle. All Rights Reserved.
            </p>
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)' }} />
            <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Crafted with care · Style Redefined
            </p>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;
