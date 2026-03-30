import { useState, useEffect, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { fetchProductsByFilters } from "../redux/slices/productsSlice";

const CollectionPages = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const {products, loading, error } = useSelector((state) => state.products);
  const queryString = searchParams.toString();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  
  useEffect(() => {
    const queryParams = Object.fromEntries([...searchParams]);
    dispatch(fetchProductsByFilters({ collection, ...queryParams}));
  }, [dispatch, collection, queryString])
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@300;400;500;600&display=swap');
        .cp-brand { font-family: 'Cormorant Garamond', serif; }
        .cp-body  { font-family: 'Montserrat', sans-serif; }

        .cp-filter-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 18px;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.25em; text-transform: uppercase;
          background: transparent;
          border: 1px solid rgba(201,169,110,0.3);
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .cp-filter-btn:hover {
          border-color: #c9a96e;
          color: #c9a96e;
        }

        .cp-sidebar {
          width: 260px;
          min-width: 260px;
          background: #1a1a1a;
          border-right: 1px solid rgba(201,169,110,0.1);
          overflow-y: auto;
          transition: transform 0.3s ease;
        }
        .cp-sidebar::-webkit-scrollbar { width: 3px; }
        .cp-sidebar::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.2); }

        .cp-loading {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          height: 300px; gap: 16px;
        }
        .cp-spinner {
          width: 36px; height: 36px; border-radius: 50%;
          border: 1px solid rgba(201,169,110,0.2);
          border-top-color: #c9a96e;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div
        className="cp-body flex min-h-screen overflow-x-hidden"
        style={{ background: '#111' }}
      >

        {/* Overlay */}
        {isSidebarOpen && (
          <div
            onClick={toggleSidebar}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(4px)',
              zIndex: 40,
            }}
          />
        )}

        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className="cp-sidebar"
          style={{
            position: 'fixed', top: 0, left: 0, bottom: 0,
            zIndex: 50,
            transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          }}
          // Desktop static
        >
          {/* Sidebar Header */}
          <div
            className="px-6 py-5 flex items-center justify-between"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div>
              <p className="text-[9px] font-semibold tracking-[0.4em] uppercase" style={{ color: '#c9a96e' }}>
                Refine
              </p>
              <p className="cp-brand text-2xl font-light text-white mt-0.5">Filters</p>
            </div>
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-[18px]"
              style={{ color: 'rgba(255,255,255,0.3)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>
          <FilterSidebar />
        </div>

        {/* Desktop static sidebar */}
        <div
          className="cp-sidebar hidden lg:block flex-shrink-0"
          style={{ position: 'sticky', top: 0, height: '100vh' }}
        >
          <div
            className="px-6 py-5"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <p className="text-[9px] font-semibold tracking-[0.4em] uppercase" style={{ color: '#c9a96e' }}>
              Refine
            </p>
            <p className="cp-brand text-2xl font-light text-white mt-0.5">Filters</p>
          </div>
          <FilterSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 flex flex-col w-full">

          {/* Top Bar */}
          <div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 gap-4"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-4">
              {/* Mobile filter toggle */}
              <button onClick={toggleSidebar} className="cp-filter-btn lg:hidden">
                <FaFilter style={{ fontSize: 10 }} />
                Filters
              </button>

              <div>
                <p className="text-[9px] font-semibold tracking-[0.4em] uppercase" style={{ color: '#c9a96e' }}>
                  Browse
                </p>
                <h2 className="cp-brand text-3xl font-light text-white">All Collections</h2>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
                {products.length} items
              </span>
              <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.1)' }} />
              <SortOptions />
            </div>
          </div>

          {/* Gold line */}
          <div style={{ height: 1, background: 'linear-gradient(90deg, #c9a96e, transparent)' }} />

          {/* Products */}
          <div className="flex-1 p-6">
            {loading ? (
              <div className="cp-loading">
                <div className="cp-spinner" />
                <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  Loading Collection...
                </p>
              </div>
            ) : error ? (
              <p className="text-center text-red-400 mt-10">{error}</p>
            ) : products.length === 0 ? (
              <p
                className="text-center text-[10px] tracking-widest uppercase mt-10"
                style={{ color: 'rgba(255,255,255,0.25)' }}
              >
                No products found.
              </p>
            ) : (
              <ProductGrid products={products} loading ={loading} error = {error}/>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default CollectionPages;
