import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const sortOptions = [
  { label: "Newest",             value: "newest"   },
  { label: "Price: Low to High", value: "priceAsc" },
  { label: "Price: High to Low", value: "priceDesc" },
  { label: "Popularity",         value: "popularity" },
];

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState(searchParams.get("sortBy") || "");

  const handleSort = (e) => {
    const value = e.target.value;
    setSelected(value);
    const params = new URLSearchParams(searchParams);
    if (value) params.set("sortBy", value);
    else params.delete("sortBy");
    setSearchParams(params);
    console.log("Sort:", value);
  };

  return (
    <>
      <style>{`
        .sort-select {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.15em;
          background: transparent;
          border: 1px solid rgba(201,169,110,0.3);
          color: rgba(255,255,255,0.5);
          padding: 8px 14px;
          cursor: pointer;
          outline: none;
          transition: all 0.3s ease;
          appearance: none;
          padding-right: 28px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23c9a96e' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
        }
        .sort-select:hover { border-color: #c9a96e; color: #c9a96e; }
        .sort-select option { background: #1a1a1a; color: #fff; }
      `}</style>

      <select className="sort-select" value={selected} onChange={handleSort}>
        <option value="">Default</option>
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </>
  );
};

export default SortOptions;
