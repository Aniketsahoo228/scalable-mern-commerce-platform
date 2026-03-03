import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const categories = ["Top Wear", "Bottom Wear"];
const colors = ["Red", "Blue", "Green", "Yellow", "Black", "White", "Gray", "Orange", "Purple", "Pink"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const materials = ["Cotton", "Silk", "Wool", "Linen", "Denim", "Leather", "Polyester", "Rayon"];
const brands = ["Nike", "Adidas", "Puma", "Zara", "H&M", "Levi's", "Gucci", "Under Armour"];
const genders = ["Men", "Women"];

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    gender: searchParams.get("gender") || "",
    color: searchParams.get("color") || "",
    size: searchParams.get("size") ? searchParams.get("size").split(",") : [],
    material: searchParams.get("material") ? searchParams.get("material").split(",") : [],
    brand: searchParams.get("brand") ? searchParams.get("brand").split(",") : [],
    minPrice: Number(searchParams.get("minPrice") || 0),
    maxPrice: Number(searchParams.get("maxPrice") || 100),
  });

  const [priceRange, setPriceRange] = useState([filters.minPrice, filters.maxPrice]);

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

  const _updateSingle = (key, value) => {
    const nextFilters = { ...filters, [key]: value };
    setFilters(nextFilters);
    updateQuery({ [key]: value });
    console.log(nextFilters);
  };

  const _toggleArray = (key, value) => {
    const exists = filters[key].includes(value);
    const nextArray = exists ? filters[key].filter((v) => v !== value) : [...filters[key], value];
    const nextFilters = { ...filters, [key]: nextArray };
    setFilters(nextFilters);
    updateQuery({ [key]: nextArray });
    console.log(nextFilters);
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
      newFilters.minPrice = 0;
      newFilters.maxPrice = max;
      setPriceRange([0, max]);
    } else {
      newFilters[name] = value;
    }
    setFilters(newFilters);
    updateQuery(newFilters);
    console.log(newFilters);
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
            {colors.map((color) => (
              <label key={color} style={{ cursor: "pointer" }} aria-label={color}>
                <input
                  type="radio"
                  name="color"
                  value={color}
                  checked={filters.color === color}
                  onChange={handlefilterChange}
                  className="sr-only"
                />
                <span
                  style={{
                    display: "block",
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    backgroundColor: color.toLowerCase(),
                    border: filters.color === color ? "2px solid #c9a96e" : "2px solid rgba(255,255,255,0.1)",
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
            type="range" name="maxPrice"
            min="500" max="10000"
            value={priceRange[1]}
            onChange={handlefilterChange}
            className="fs-range"
          />
          <div className="flex justify-between mt-3">
            <span className="text-[10px] tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>₹500</span>
            <span className="text-[10px] font-semibold tracking-widest" style={{ color: '#c9a96e' }}>₹{priceRange[1]}</span>
            <span className="text-[10px] tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>₹10000</span>
          </div>
        </div>

      </div>
    </>
  );
};

export default FilterSidebar;
