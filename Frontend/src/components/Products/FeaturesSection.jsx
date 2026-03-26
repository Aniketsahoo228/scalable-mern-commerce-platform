import { HiShoppingBag } from "react-icons/hi";
import { HiArrowPathRoundedSquare, HiOutlineCreditCard } from "react-icons/hi2";

const features = [
  { icon: HiShoppingBag, title: "Free International Shipping", desc: "On all orders over Rs. 8,000" },
  { icon: HiArrowPathRoundedSquare, title: "45 Days Return", desc: "Money back guarantee" },
  { icon: HiOutlineCreditCard, title: "Secure Checkout", desc: "100% secured checkout process" },
];

const FeaturesSection = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap');
        .fs-body { font-family: 'Montserrat', sans-serif; }

        .fs-card {
          display: flex; flex-direction: column; align-items: center;
          padding: 40px 24px; text-align: center;
          border: 1px solid rgba(201,169,110,0.1);
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .fs-card:hover {
          border-color: rgba(201,169,110,0.35);
          background: rgba(201,169,110,0.04);
        }

        .fs-icon-wrap {
          width: 52px; height: 52px;
          border-radius: 50%;
          border: 1px solid rgba(201,169,110,0.3);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }
        .fs-card:hover .fs-icon-wrap {
          background: rgba(201,169,110,0.1);
          border-color: #c9a96e;
        }
      `}</style>

      <section
        className="fs-body py-16 px-4"
        style={{
          background: "#1a1a1a",
          borderTop: "1px solid rgba(201,169,110,0.15)",
          borderBottom: "1px solid rgba(201,169,110,0.15)",
        }}
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-0">
          {features.map((feature, i) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={i}
                className="fs-card"
                style={{ borderRight: i < 2 ? "1px solid rgba(201,169,110,0.1)" : "none" }}
              >
                <div className="fs-icon-wrap">
                  <IconComponent style={{ color: "#c9a96e", fontSize: 20 }} />
                </div>
                <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-[11px] tracking-wide" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default FeaturesSection;
