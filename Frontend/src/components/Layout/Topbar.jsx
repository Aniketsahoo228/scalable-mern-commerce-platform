import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

const Topbar = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap');

        .topbar { font-family: 'Montserrat', sans-serif; }

        .topbar-social {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.7);
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .topbar-social:hover {
          border-color: #c9a96e;
          color: #c9a96e;
          background: rgba(201,169,110,0.1);
        }

        .topbar-marquee {
          display: flex;
          align-items: center;
          gap: 48px;
          animation: marquee 18s linear infinite;
          white-space: nowrap;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .topbar-marquee:hover { animation-play-state: paused; }

        .marquee-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #c9a96e;
          flex-shrink: 0;
        }
      `}</style>

      <div
        className="topbar"
        style={{
          background: "linear-gradient(90deg, #1a1a1a 0%, #2a2218 50%, #1a1a1a 100%)",
          borderBottom: "1px solid rgba(201,169,110,0.2)",
        }}
      >
        <div className="container mx-auto flex items-center justify-between py-2.5 px-6">

          {/* Social Icons */}
          <div className="hidden md:flex items-center space-x-2">
            <a href="#" className="topbar-social"><TbBrandMeta className="h-3.5 w-3.5" /></a>
            <a href="#" className="topbar-social"><IoLogoInstagram className="h-3.5 w-3.5" /></a>
            <a href="#" className="topbar-social"><RiTwitterXLine className="h-3 w-3" /></a>
          </div>

          {/* Scrolling Message */}
          <div className="flex-grow overflow-hidden mx-6">
            <div className="flex" style={{ width: "200%" }}>
              <div className="topbar-marquee">
                {[
                  "We ship worldwide — Fast & reliable",
                  "Free shipping on orders over ₹2,000",
                  "New arrivals every Friday",
                  "We ship worldwide — Fast & reliable",
                  "Free shipping on orders over ₹2,000",
                  "New arrivals every Friday",
                ].map((msg, i) => (
                  <span key={i} className="flex items-center gap-3">
                    <span
                      className="text-[11px] font-light tracking-[0.18em] uppercase"
                      style={{ color: "rgba(255,255,255,0.75)" }}
                    >
                      {msg}
                    </span>
                    <span className="marquee-dot" />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="hidden md:block">
            <a
              href="tel:+1234567890"
              className="text-[11px] tracking-[0.15em] transition-colors duration-300"
              style={{ color: "rgba(255,255,255,0.6)", fontWeight: 400 }}
              onMouseEnter={e => e.target.style.color = "#c9a96e"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}
            >
              +1 (234) 567-890
            </a>
          </div>

        </div>
      </div>
    </>
  );
};

export default Topbar;
