import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products,search,showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]); //
  const [sortType,setSortType]=useState('relavent');


  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };

  useEffect(() => {
    if (Array.isArray(products)) {
      setFilterProducts(products);
    }
  }, [products]); 

  const applyFilter = ()=>{
    let productsCopy=products.slice();

    if(showSearch && search){
       productsCopy=productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()));
      }


    if(category.length>0){
      productsCopy=productsCopy.filter(item=>category.includes(item.category));
    }

     if(subCategory.length>0){
      productsCopy=productsCopy.filter(item=>subCategory.includes(item.subCategory));

    }
    setFilterProducts(productsCopy);

  }

    const sortProduct=()=>{
      let fcopy=filterProducts.slice();
      switch (sortType){
        case 'low high':
          setFilterProducts(fcopy.sort((a,b)=>(a.price-b.price)));
          break;

          case 'high low':
          setFilterProducts(fcopy.sort((a,b)=>(b.price-a.price)));
          break;

          default:
            applyFilter();
            break;
      }
    }
  

   useEffect(()=>{
    applyFilter();

   },[category,subCategory,search,showSearch,products]);

   
   useEffect(()=>{
    sortProduct();

   },[sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-6 pt-10 px-4 sm:px-10 border-t bg-gray-50'>
      
      {/* Left Sidebar - Filters */}
      <div className='sm:w-64 w-full'>
        <div className='bg-white shadow rounded-xl p-4'>
          <p
            onClick={() => setShowFilter(!showFilter)}
            className='text-xl font-semibold flex items-center justify-between cursor-pointer'
          >
            FILTERS
            <img
              className={`h-3 sm:hidden transition-transform ${showFilter ? 'rotate-90' : ''}`}
              src={assets.dropdown_icon}
              alt=""
            />
          </p>

          <div className={`${showFilter ? '' : 'hidden'} sm:block mt-4 space-y-6`}>
            {/* Category Filter */}
            <div>
              <p className='text-sm font-medium text-gray-700 mb-2'>CATEGORIES</p>
              <div className='flex flex-col gap-2 text-sm text-gray-600'>
                <label className='flex items-center gap-2'>
                  <input type="checkbox" value="Men" className='w-4 h-4' onChange={toggleCategory} /> Men
                </label>
                <label className='flex items-center gap-2'>
                  <input type="checkbox" value="Women" className='w-4 h-4' onChange={toggleCategory} /> Women
                </label>
                <label className='flex items-center gap-2'>
                  <input type="checkbox" value="Kids" className='w-4 h-4' onChange={toggleCategory} /> Kids
                </label>
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <p className='text-sm font-medium text-gray-700 mb-2'>TYPE</p>
              <div className='flex flex-col gap-2 text-sm text-gray-600'>
                <label className='flex items-center gap-2'>
                  <input type="checkbox" value="Topwear" className='w-4 h-4' onChange={toggleSubCategory} /> Topwear
                </label>
                <label className='flex items-center gap-2'>
                  <input type="checkbox" value="Bottomwear" className='w-4 h-4' onChange={toggleSubCategory} /> Bottomwear
                </label>
                <label className='flex items-center gap-2'>
                  <input type="checkbox" value="Winterwear" className='w-4 h-4' onChange={toggleSubCategory} /> Winterwear
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Products */}
      <div className='flex-1'>

        <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4'>
          
          <Title text1={"ALL"} text2={"COLLECTION"} />
         <select
         value={sortType}
         onChange={(e) => setSortType(e.target.value)}
         className='border rounded-md px-3 py-2 text-sm shadow-sm outline-none'
>
        <option value="relavant">Sort by: Relavent</option>
        <option value="low high">Sort by: Low to High</option>
        <option value="high low">Sort by: High to Low</option>
        </select>

        </div>

        {/* Product Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              price={item.price}
              id={item._id}
              image={item.images} // 👈 yahan image ki jagah images pass karein
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
