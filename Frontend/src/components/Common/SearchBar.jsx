import { useEffect, useMemo, useState } from "react";
import {
  HiMagnifyingGlass,
  HiMiniXMark,
} from "react-icons/hi2";

import {
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams] = useSearchParams();

  // ========================================
  // Optimized Search Param Sync
  // ========================================

  const searchValue = useMemo(
    () => searchParams.get("search") || "",
    [searchParams]
  );

  const [searchTerm, setSearchTerm] =
    useState(searchValue);

  const [isOpen, setIsOpen] =
    useState(false);

  // ========================================
  // Sync only when actual search changes
  // ========================================

  useEffect(() => {
    setSearchTerm(searchValue);
  }, [searchValue]);

  // ========================================
  // Escape Key Close
  // ========================================

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen]);

  // ========================================
  // Toggle Search
  // ========================================

  const handleSearchToggle = () => {
    setIsOpen((prev) => !prev);
  };

  // ========================================
  // Handle Search Submit
  // ========================================

  const handleSearch = (e) => {
    e.preventDefault();

    const trimmedSearch =
      searchTerm.trim();

    const params =
      location.pathname.startsWith(
        "/collections/"
      )
        ? new URLSearchParams(
            searchParams
          )
        : new URLSearchParams();

    if (trimmedSearch) {
      params.set(
        "search",
        trimmedSearch
      );
    } else {
      params.delete("search");
    }

    navigate({
      pathname:
        location.pathname.startsWith(
          "/collections/"
        )
          ? location.pathname
          : "/collections/all",

      search: params.toString()
        ? `?${params.toString()}`
        : "",
    });

    setIsOpen(false);
  };

  return (
    <div className="flex items-center">
      {isOpen ? (
        <div className="fixed left-0 top-0 z-50 flex min-h-[88px] w-full items-center justify-center border-b border-white/5 bg-[#111] px-4 animate-in fade-in duration-200">

          <form
            onSubmit={handleSearch}
            className="relative flex items-center"
          >
            {/* Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search your favourite"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(
                    e.target.value
                  )
                }
                autoFocus
                className="
                  w-[480px]
                  max-w-[90vw]
                  border
                  border-white/10
                  bg-white/5
                  px-4
                  py-2.5
                  pr-11
                  text-[12px]
                  tracking-[0.05em]
                  text-white
                  outline-none
                  transition-all
                  duration-300
                  placeholder:text-[11px]
                  placeholder:tracking-[0.1em]
                  placeholder:text-white/25
                  focus:border-[#c9a96e]/50
                  focus:ring-4
                  focus:ring-[#c9a96e]/10
                "
              />

              {/* Submit */}
              <button
                type="submit"
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-white/30
                  transition-colors
                  duration-200
                  hover:text-[#c9a96e]
                "
              >
                <HiMagnifyingGlass className="h-4 w-4" />
              </button>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={
                handleSearchToggle
              }
              className="
                fixed
                right-6
                text-white/30
                transition-colors
                duration-200
                hover:text-[#c9a96e]
              "
            >
              <HiMiniXMark className="h-5 w-5" />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={handleSearchToggle}
          className="
            flex
            items-center
            text-[#555]
            transition-colors
            duration-200
            hover:text-[#c9a96e]
          "
        >
          <HiMagnifyingGlass className="h-[18px] w-[18px]" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;