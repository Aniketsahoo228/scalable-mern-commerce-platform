import { useEffect, useState } from "react";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const [priceRange, setPriceRange] = useState([0, 100]);

const categories = ["Top Wear", "Bottom Wear"];

const colors = ["Crimson", "Scarlet", "Maroon", "Burgundy", "Cherry Red", "Ruby", "Wine Red", "Brick Red", "Firebrick", "Blood Red"];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const materials = ["Cotton", "Silk", "Wool", "Linen", "Denim", "Leather", "Polyester", "Rayon"];

const brands = ["Nike", "Adidas", "Puma", "Zara", "H&M", "Levi's", "Gucci", "Under Armour"];

const genders = ["Men", "Women"];

useEffect(() => {
    const params = object.fromEntries([...searchParams])

    setFilters {
    category: params.category || "",
    gender: params.gender || "",
    color: params.color || "",
    size: params.size ? params.size.split(",") : [],
    material: params.material ? params.material.split(",") : [],
    brand: params.brand ? params.brand.split(",") : [],
    minPrice: params.minPrice || 0,
    maxPrice,
  };
})

  return <div>FilterSidebar</div>;
};

export default FilterSidebar;
