import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

import {
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import { Link } from "react-router-dom";
import axios from "axios";

const NewArrivals = () => {

  const scrollRef = useRef(null);

  const [isDragging, setIsDragging] =
    useState(false);

  const [startX, setStartX] =
    useState(0);

  const [scrollLeft, setScrollLeft] =
    useState(0);

  const [canScrollLeft, setCanScrollLeft] =
    useState(false);

  const [canScrollRight, setCanScrollRight] =
    useState(true);

  const [newArrivals, setNewArrivals] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  useEffect(() => {

    const fetchNewArrivals = async () => {

      setLoading(true);

      try {

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );

        setNewArrivals(response.data || []);

      } catch (err) {

        console.error("Fetch error:", err);

        setError(
          "Failed to load new arrivals."
        );

      } finally {

        setLoading(false);
      }
    };

    fetchNewArrivals();

  }, []);

  const updateScrollButtons =
    useCallback(() => {

      const container =
        scrollRef.current;

      if (!container) return;

      setCanScrollLeft(
        container.scrollLeft > 0
      );

      setCanScrollRight(
        container.scrollLeft <
          container.scrollWidth -
            container.clientWidth -
            1
      );

    }, []);

  const scroll = (direction) => {

    scrollRef.current?.scrollBy({
      left:
        direction === "left"
          ? -320
          : 320,
      behavior: "smooth",
    });
  };

  const handleMouseDown =
    useCallback((e) => {

      if (!scrollRef.current) return;

      setIsDragging(true);

      setStartX(
        e.pageX -
          scrollRef.current.offsetLeft
      );

      setScrollLeft(
        scrollRef.current.scrollLeft
      );

    }, []);

  const handleMouseMove =
    useCallback((e) => {

      if (
        !isDragging ||
        !scrollRef.current
      ) {
        return;
      }

      e.preventDefault();

      const x =
        e.pageX -
        scrollRef.current.offsetLeft;

      scrollRef.current.scrollLeft =
        scrollLeft -
        (x - startX) * 1.5;

    }, [
      isDragging,
      scrollLeft,
      startX,
    ]);

  const handleMouseUp =
    useCallback(() => {
      setIsDragging(false);
    }, []);

  const handleMouseLeave =
    useCallback(() => {
      setIsDragging(false);
    }, []);

  useEffect(() => {

    const container =
      scrollRef.current;

    if (
      !container ||
      newArrivals.length === 0
    ) {
      return;
    }

    updateScrollButtons();

    container.addEventListener(
      "scroll",
      updateScrollButtons
    );

    return () => {
      container.removeEventListener(
        "scroll",
        updateScrollButtons
      );
    };

  }, [
    newArrivals,
    updateScrollButtons,
  ]);

  return (
    <section className="bg-gradient-to-b from-[#111] to-[#1a1a1a] px-4 py-20 lg:px-0">

      <div className="container mx-auto">

        {/* Header */}
        <div className="mb-10 flex items-end justify-between">

          <div>

            <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.4em] text-[#c9a96e]">
              Just Landed
            </p>

            <h2 className="font-['Cormorant_Garamond'] text-5xl font-light text-white">
              New Arrivals
            </h2>

            <div className="mt-3 h-[1px] w-8 bg-[#c9a96e]" />

          </div>

          <div className="flex gap-2">

            <button
              onClick={() =>
                scroll("left")
              }
              disabled={!canScrollLeft}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9a96e]/30 text-white/50 transition-all duration-300 hover:border-[#c9a96e] hover:bg-[#c9a96e]/10 hover:text-[#c9a96e] disabled:cursor-not-allowed disabled:opacity-20"
            >
              <FiChevronLeft size={18} />
            </button>

            <button
              onClick={() =>
                scroll("right")
              }
              disabled={!canScrollRight}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9a96e]/30 text-white/50 transition-all duration-300 hover:border-[#c9a96e] hover:bg-[#c9a96e]/10 hover:text-[#c9a96e] disabled:cursor-not-allowed disabled:opacity-20"
            >
              <FiChevronRight size={18} />
            </button>

          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
              Loading...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center justify-center py-20">
            <p className="text-[11px] uppercase tracking-[0.2em] text-red-300">
              {error}
            </p>
          </div>
        )}

        {/* Products */}
        {!loading &&
          !error && (
            <div
              ref={scrollRef}
              onMouseDown={
                handleMouseDown
              }
              onMouseMove={
                handleMouseMove
              }
              onMouseUp={
                handleMouseUp
              }
              onMouseLeave={
                handleMouseLeave
              }
              className={`scrollbar-hide flex select-none gap-4 overflow-x-auto ${
                isDragging
                  ? "cursor-grabbing"
                  : "cursor-grab"
              }`}
            >

              {newArrivals.length ===
              0 ? (

                <div className="flex w-full items-center justify-center py-20">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/35">
                    No New Arrivals
                  </p>
                </div>

              ) : (

                newArrivals.map(
                  (product) => {

                    const imageUrl =
                      product.images?.[0]
                        ?.url ||
                      "https://placehold.co/500x700?text=No+Image";

                    const imageAlt =
                      product.images?.[0]
                        ?.altText ||
                      product.name;

                    return (
                      <div
                        key={
                          product._id
                        }
                        className="group relative min-w-[90%] overflow-hidden sm:min-w-[45%] lg:min-w-[28%]"
                      >

                        <img
                          draggable="false"
                          src={
                            imageUrl
                          }
                          alt={
                            imageAlt
                          }
                          loading="lazy"
                          className="h-[480px] w-full object-cover transition-transform duration-[6000ms] group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-7">

                          <Link
                            to={`/product/${product._id}`}
                          >

                            <p className="mb-1 text-[9px] uppercase tracking-[0.3em] text-white/40">
                              New Arrival
                            </p>

                            <h4 className="mb-1 font-['Cormorant_Garamond'] text-2xl font-light text-white">
                              {
                                product.name
                              }
                            </h4>

                            <p className="text-[11px] tracking-[0.25em] text-[#c9a96e]">
                              $
                              {Number(
                                product.price ||
                                  0
                              ).toLocaleString()}
                            </p>

                          </Link>
                        </div>
                      </div>
                    );
                  }
                )
              )}
            </div>
          )}
      </div>
    </section>
  );
};

export default NewArrivals;
