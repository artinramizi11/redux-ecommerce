import { useDispatch, useSelector } from 'react-redux';
import {  RootState } from '../store/store';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { selectPage } from '../store/filterProductsSlice';
import FilterSystem from '../Components/FilterSystem';
import Pagination from '../Components/Pagination';

const Homepage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {id} = useParams()


  const products = useSelector((state: RootState) => state.products.products);
  const selectedPage = useSelector((state: RootState) => state.filterProducts.selectedPage)
  const pageSize = useSelector((state: RootState) => state.filterProducts.pageSize)
  const searchQuery = useSelector((state: RootState) => state.filterProducts.searchQuery)
  const searchPrice = useSelector((state: RootState) => state.filterProducts.searchByPrice)

  const totalProducts = products.length 
  const totalPages = Math.ceil(totalProducts / pageSize);

  const paginatedProducts = useMemo(() => {
  const startIndex = (selectedPage - 1) * pageSize;
  const endIndex = startIndex + pageSize
  return products.slice(startIndex, endIndex).filter((product) => {
    const matchBySearch = searchQuery ? product.title.toLowerCase().includes(searchQuery?.toLowerCase()) : true
    const matchByPrice = searchPrice ? product.price >= searchPrice : true
    return matchByPrice && matchBySearch
  });
}, [products, selectedPage, pageSize,searchQuery, searchPrice]);

console.log(paginatedProducts)


useEffect(() => { 
  if(id){
    dispatch(selectPage({page: Number(id)}))
  } else {
    return;
  }

},[id])



  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Products</h1>
       <FilterSystem />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         <Pagination paginatedProducts={paginatedProducts} />
        </div>
      <div className='mt-4 flex justify-center'>
      {Array.from({ length: totalPages }).map((_, i) => (
  <button
    key={i} 
    className={`px-4 py-2 mx-1 rounded-lg cursor-pointer transition-all duration-300 ${selectedPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-blue-100'}
                border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
    onClick={() => {
      dispatch(selectPage({ page: i + 1 }));
      navigate(`/page/${i + 1}`);
    }} >{i + 1}</button>
))}
      </div>

      </div>
    </div>
  );
};

export default Homepage;
