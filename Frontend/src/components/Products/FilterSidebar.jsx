import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const categories = ["Top Wear", "Bottom Wear"];
const colors = [
  { name: "Red",            hex: "#e53e3e" },
  { name: "Blue",           hex: "#3182ce" },
  { name: "Yellow",         hex: "#ecc94b" },
  { name: "Black",          hex: "#1a1a1a" },
  { name: "White",          hex: "#f7fafc" },
  { name: "Gray",           hex: "#718096" },
  { name: "Pink",           hex: "#ed64a6" },
  { name: "Olive",          hex: "#6b7c3a" },
  { name: "Beige",          hex: "#e8d5b0" },
  { name: "Navy",           hex: "#1a365d" },
  { name: "Light Blue",     hex: "#90cdf4" },
  { name: "Dark Blue",      hex: "#2a4365" },
  { name: "Navy Blue",      hex: "#1e3a5f" },
  { name: "Burgundy",       hex: "#702459" },
  { name: "Lavender",       hex: "#b794f4" },
  { name: "Khaki",          hex: "#c3a35d" },
  { name: "Brown",          hex: "#7b341e" },
  { name: "Charcoal",       hex: "#2d3748" },
  { name: "Heather Gray",   hex: "#b6b8b0" },
  { name: "Dark Green",     hex: "#276749" },
  { name: "Dark Wash",      hex: "#2c3e6b" },
  { name: "Tropical Print", hex: "#38a169" },
  { name: "Navy Palms",     hex: "#1a3a5c" },
];
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const materials = ["Cotton", "Cotton Blend", "Denim", "Fleece", "Linen Blend", "Polyester", "Silk Blend", "Viscose", "Wool Blend"];
const brands = ["ActiveWear", "Beach Breeze", "BohoVibes", "BreezyVibes", "CasualLook", "ChicKnit", "ChicStyle", "ChicWrap", "ChillZone", "ClassicStyle", "ComfortFit", "ComfyFit", "ComfyTees", "DelicateWear", "DenimCo", "DenimStyle", "Elegance", "ElegantStyle", "ElegantWear", "Everyday Comfort", "ExecutiveStyle", "FeminineWear", "Heritage Wear", "LoungeWear", "Modern Fit", "Polo Classics", "SportX", "Street Style", "Street Vibes", "StreetStyle", "StreetWear", "SunnyStyle", "Urban Chic", "Urban Threads", "UrbanStyle", "Winter Basics"];
const genders = ["Men", "Women"];
const MIN_PRICE = 500;
const MAX_PRICE = 10000;

const sanitizeFilters = (searchParams) => {
  const sanitizeArray = (key, validOptions) =>
    (searchParams.get(key)?.split(",") || []).filter((value) =>
      validOptions.includes(value)
    );

  const clamp = (value, fallback) => {
    const numericValue = Number(value);
    if (Number.isNaN(numericValue)) return fallback;
    return Math.min(MAX_PRICE, Math.max(MIN_PRICE, numericValue));
  };

  return {
    category: categories.includes(searchParams.get("category"))
      ? searchParams.get("category")
      : "",
    gender: genders.includes(searchParams.get("gender"))
      ? searchParams.get("gender")
      : "",
    color: colors.some((c) => c.name === searchParams.get("color"))
      ? searchParams.get("color")
      : "",
    size: sanitizeArray("size", sizes),
    material: sanitizeArray("material", materials),
    brand: sanitizeArray("brand", brands),
    minPrice: searchParams.has("minPrice")
      ? clamp(searchParams.get("minPrice"), MIN_PRICE)
      : "",
    maxPrice: searchParams.has("maxPrice")
      ? clamp(searchParams.get("maxPrice"), MAX_PRICE)
      : "",
  };
};

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(() => sanitizeFilters(searchParams));
  const [priceRange, setPriceRange] = useState(() => {
    const nextFilters = sanitizeFilters(searchParams);
    return [
      nextFilters.minPrice === "" ? MIN_PRICE : nextFilters.minPrice,
      nextFilters.maxPrice === "" ? MAX_PRICE : nextFilters.maxPrice,
    ];
  });

  useEffect(() => {
    const nextFilters = sanitizeFilters(searchParams);
    setFilters(nextFilters);
    setPriceRange([
      nextFilters.minPrice === "" ? MIN_PRICE : nextFilters.minPrice,
      nextFilters.maxPrice === "" ? MAX_PRICE : nextFilters.maxPrice,
    ]);

    const normalizedParams = new URLSearchParams(searchParams);
    if (nextFilters.category) normalizedParams.set("category", nextFilters.category);
    else normalizedParams.delete("category");
    if (nextFilters.gender) normalizedParams.set("gender", nextFilters.gender);
    else normalizedParams.delete("gender");
    if (nextFilters.color) normalizedParams.set("color", nextFilters.color);
    else normalizedParams.delete("color");
    if (nextFilters.size.length) normalizedParams.set("size", nextFilters.size.join(","));
    else normalizedParams.delete("size");
    if (nextFilters.material.length) normalizedParams.set("material", nextFilters.material.join(","));
    else normalizedParams.delete("material");
    if (nextFilters.brand.length) normalizedParams.set("brand", nextFilters.brand.join(","));
    else normalizedParams.delete("brand");
    if (nextFilters.minPrice !== "") normalizedParams.set("minPrice", String(nextFilters.minPrice));
    else normalizedParams.delete("minPrice");
    if (nextFilters.maxPrice !== "") normalizedParams.set("maxPrice", String(nextFilters.maxPrice));
    else normalizedParams.delete("maxPrice");

    const current = searchParams.toString();
    const normalized = normalizedParams.toString();
    if (current !== normalized) {
      setSearchParams(normalizedParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const updateQuery = (next) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(next).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length) params.set(key, value.join(","));
        else params.delete(key);
      } else if (value === "" || value === null || value === undefined) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });
    setSearchParams(params);
  };

  const handlefilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };

    if (type === "checkbox") {
      newFilters[name] = checked
        ? [...newFilters[name], value]
        : newFilters[name].filter((item) => item !== value);
    } else if (type === "range") {
      const max = Number(value);
      newFilters.minPrice = max === MAX_PRICE ? "" : MIN_PRICE;
      newFilters.maxPrice = max === MAX_PRICE ? "" : max;
      setPriceRange([MIN_PRICE, max]);
    } else {
      newFilters[name] = value;
    }

    setFilters(newFilters);
    updateQuery(newFilters);
  };

  const sectionLabel = (text) => (
    <p className="text-[9px] font-semibold tracking-[0.3em] uppercase mb-3 mt-1" style={{ color: '#c9a96e' }}>
      {text}
    </p>
  );

  const radioStyle = (checked) => ({
    fontFamily: "'Montserrat', sans-serif",
    fontSize: 11,
    letterSpacing: '0.05em',
    color: checked ? '#c9a96e' : 'rgba(255,255,255,0.4)',
    transition: 'color 0.3s ease',
  });

  return (
    <>
      <style>{`
        .fs-input[type="radio"], .fs-input[type="checkbox"] {
          accent-color: #c9a96e;
        }
        .fs-range {
          -webkit-appearance: none;
          width: 100%; height: 2px;
          background: rgba(255,255,255,0.1);
          outline: none; cursor: pointer;
        }
        .fs-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px; height: 14px;
          border-radius: 50%;
          background: #c9a96e;
          border: 2px solid #111;
          cursor: pointer;
        }
      `}</style>

      <div className="p-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>

        {/* Category */}
        <div className="mb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 20 }}>
          {sectionLabel("Category")}
          {categories.map((c) => (
            <div key={c} className="flex items-center mb-2 gap-2">
              <input type="radio" name="category" value={c} checked={filters.category === c}
                onChange={handlefilterChange} className="fs-input" />
              <span style={radioStyle(filters.category === c)}>{c}</span>
            </div>
          ))}
        </div>

        {/* Gender */}
        <div className="mb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 20 }}>
          {sectionLabel("Gender")}
          {genders.map((g) => (
            <div key={g} className="flex items-center mb-2 gap-2">
              <input type="radio" name="gender" value={g} checked={filters.gender === g}
                onChange={handlefilterChange} className="fs-input" />
              <span style={radioStyle(filters.gender === g)}>{g}</span>
            </div>
          ))}
        </div>

        {/* Color */}
        <div className="mb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 20 }}>
          {sectionLabel("Color")}
          <div className="flex flex-wrap gap-2">
            {colors.map(({ name, hex }) => (
              <label key={name} style={{ cursor: "pointer" }} aria-label={name}>
                <input
                  type="radio"
                  name="color"
                  value={name}
                  checked={filters.color === name}
                  onChange={handlefilterChange}
                  className="sr-only"
                />
                <span
                  style={{
                    display: "block",
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    backgroundColor: hex,
                    border: filters.color === name
                      ? "2px solid #c9a96e"
                      : "2px solid rgba(255,255,255,0.1)",
                    transition: "border-color 0.3s ease",
                  }}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Size */}
        <div className="mb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 20 }}>
          {sectionLabel("Size")}
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <label key={size} style={{ cursor: "pointer" }}>
                <input
                  type="checkbox"
                  name="size"
                  value={size}
                  checked={filters.size.includes(size)}
                  onChange={handlefilterChange}
                  className="sr-only"
                />
                <span
                  style={{
                    display: "inline-block",
                    padding: "5px 12px",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    border: filters.size.includes(size) ? "1px solid #c9a96e" : "1px solid rgba(255,255,255,0.1)",
                    color: filters.size.includes(size) ? "#c9a96e" : "rgba(255,255,255,0.4)",
                    background: filters.size.includes(size) ? "rgba(201,169,110,0.08)" : "transparent",
                    transition: "all 0.3s ease",
                  }}
                >
                  {size}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Material */}
        <div className="mb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 20 }}>
          {sectionLabel("Material")}
          {materials.map((m) => (
            <div key={m} className="flex items-center mb-2 gap-2">
              <input type="checkbox" name="material" value={m} checked={filters.material.includes(m)}
                onChange={handlefilterChange} className="fs-input" />
              <span style={radioStyle(filters.material.includes(m))}>{m}</span>
            </div>
          ))}
        </div>

        {/* Brand */}
        <div className="mb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 20 }}>
          {sectionLabel("Brand")}
          {brands.map((b) => (
            <div key={b} className="flex items-center mb-2 gap-2">
              <input type="checkbox" name="brand" value={b} checked={filters.brand.includes(b)}
                onChange={handlefilterChange} className="fs-input" />
              <span style={radioStyle(filters.brand.includes(b))}>{b}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="mb-4">
          {sectionLabel("Price Range")}
          <input
            type="range"
            name="maxPrice"
            min={MIN_PRICE}
            max={MAX_PRICE}
            value={priceRange[1]}
            onChange={handlefilterChange}
            className="fs-range"
          />
          <div className="flex justify-between mt-3">
            <span className="text-[10px] tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>₹{MIN_PRICE}</span>
            <span className="text-[10px] font-semibold tracking-widest" style={{ color: '#c9a96e' }}>₹{priceRange[1]}</span>
            <span className="text-[10px] tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>₹{MAX_PRICE}</span>
          </div>
        </div>

      </div>
    </>
  );
};

export default FilterSidebar;
