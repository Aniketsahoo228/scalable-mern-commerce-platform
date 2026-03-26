import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchNewArrivals();
  }, []);

  const updateScrollButtons = () => {
    const c = scrollRef.current;
    if (!c) return;
    setCanScrollLeft(c.scrollLeft > 0);
    setCanScrollRight(c.scrollLeft < c.scrollWidth - c.clientWidth - 1);
  };

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft - (x - startX) * 1.5;
  };

  useEffect(() => {
    const c = scrollRef.current;
    if (!c || newArrivals.length === 0) return;
    updateScrollButtons();
    c.addEventListener("scroll", updateScrollButtons);
    return () => c.removeEventListener("scroll", updateScrollButtons);
  }, [newArrivals]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@300;400;500;600&display=swap');
        .na-brand { font-family: 'Cormorant Garamond', serif; }
        .na-body  { font-family: 'Montserrat', sans-serif; }

        .na-scroll::-webkit-scrollbar { display: none; }
        .na-scroll { -ms-overflow-style: none; scrollbar-width: none; }

        .na-card { position: relative; overflow: hidden; }
        .na-card img { transition: transform 6s ease; display: block; }
        .na-card:hover img { transform: scale(1.05); }

        .na-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%);
        }

        .na-scroll-btn {
          width: 40px; height: 40px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(201,169,110,0.3);
          background: transparent;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .na-scroll-btn:hover:not(:disabled) {
          border-color: #c9a96e;
          color: #c9a96e;
          background: rgba(201,169,110,0.08);
        }
        .na-scroll-btn:disabled { opacity: 0.2; cursor: not-allowed; }
      `}</style>

      <section className="na-body py-20 px-4 lg:px-0"
        style={{ background: 'linear-gradient(180deg, #111 0%, #1a1a1a 100%)' }}>
        <div className="container mx-auto">

          {/* Header */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[9px] font-semibold tracking-[0.4em] uppercase mb-3" style={{ color: '#c9a96e' }}>
                Just Landed
              </p>
              <h2 className="na-brand text-5xl font-light text-white">New Arrivals</h2>
              <div style={{ width: 32, height: 1, background: '#c9a96e', marginTop: 12 }} />
            </div>
            <div className="flex gap-2">
              <button className="na-scroll-btn" onClick={() => scroll("left")} disabled={!canScrollLeft}>
                <FiChevronLeft size={18} />
              </button>
              <button className="na-scroll-btn" onClick={() => scroll("right")} disabled={!canScrollRight}>
                <FiChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Scroll Track */}
          <div
            ref={scrollRef}
            className={`na-scroll flex gap-4 overflow-x-auto ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
          >
            {newArrivals.length === 0 ? (
              <p className="text-white">Loading...</p>
            ) : (
              newArrivals.map((product) => (
                <div key={product._id} className="na-card min-w-[90%] sm:min-w-[45%] lg:min-w-[28%]">
                  <img
                    draggable="false"
                    src={product.images?.[0]?.url || "https://via.placeholder.com/500"}  // ✅ fixed
                    alt={product.images?.[0]?.altText || product.name}                   // ✅ fixed
                    className="w-full h-[480px] object-cover"
                  />
                  <div className="na-card-overlay" />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 24px' }}>
                    <Link to={`/product/${product._id}`}>
                      <p className="text-[9px] tracking-[0.3em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        New Arrival
                      </p>
                      <h4 className="na-brand text-2xl font-light text-white mb-1">{product.name}</h4>
                      <p className="text-[11px] tracking-widest" style={{ color: '#c9a96e' }}>${product.price}</p>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </section>
    </>
  );
};

export default NewArrivals;
