import { useEffect, useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSearchToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const trimmedSearch = searchTerm.trim();
    const params = location.pathname.startsWith("/collections/")
      ? new URLSearchParams(searchParams)
      : new URLSearchParams();

    if (trimmedSearch) {
      params.set("search", trimmedSearch);
    } else {
      params.delete("search");
    }

    navigate({
      pathname: location.pathname.startsWith("/collections/")
        ? location.pathname
        : "/collections/all",
      search: params.toString() ? `?${params.toString()}` : "",
    });

    setIsOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap');

        .sb-expanded {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          min-height: 88px;
          background: #111;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          animation: sbFadeIn 0.25s ease;
        }

        @keyframes sbFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .sb-input {
          width: 480px;
          max-width: 90vw;
          padding: 10px 44px 10px 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          letter-spacing: 0.05em;
          outline: none;
          transition: border-color 0.3s ease;
        }
        .sb-input:focus {
          border-color: rgba(201,169,110,0.5);
        }
        .sb-input::placeholder {
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.1em;
          font-size: 11px;
        }

        .sb-search-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.3);
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: color 0.2s ease;
          padding: 0;
        }
        .sb-search-btn:hover { color: #c9a96e; }

        .sb-close-btn {
          position: fixed;
          right: 24px;
          color: rgba(255,255,255,0.3);
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: color 0.2s ease;
          padding: 0;
        }
        .sb-close-btn:hover { color: #c9a96e; }

        .sb-toggle-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #555;
          display: flex;
          align-items: center;
          padding: 0;
          transition: color 0.2s ease;
        }
        .sb-toggle-btn:hover { color: #c9a96e; }
      `}</style>

      <div style={{ display: "flex", alignItems: "center" }}>
        {isOpen ? (
          <div className="sb-expanded">
            <form onSubmit={handleSearch} style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Search your favourite"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="sb-input"
                  autoFocus
                />
                <button type="submit" className="sb-search-btn">
                  <HiMagnifyingGlass style={{ width: 16, height: 16 }} />
                </button>
              </div>
              <button type="button" onClick={handleSearchToggle} className="sb-close-btn">
                <HiMiniXMark style={{ width: 20, height: 20 }} />
              </button>
            </form>
          </div>
        ) : (
          <button onClick={handleSearchToggle} className="sb-toggle-btn">
            <HiMagnifyingGlass style={{ width: 18, height: 18 }} />
          </button>
        )}
      </div>
    </>
  );
};

export default SearchBar;
