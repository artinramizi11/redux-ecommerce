import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import { setSearchByPrice, setSearchQuery } from "../store/filterProductsSlice"
import { RootState } from "../store/store"

function FilterSystem (){

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchParams,setSearchParams] = useSearchParams({q: "", price: ""})
    const searchQuery = useSelector((state: RootState) => state.filterProducts.searchQuery)
    const searchPrice = useSelector((state: RootState) => state.filterProducts.searchByPrice)
  
    useEffect(() => {
      dispatch(setSearchQuery(searchParams.get("q") as string))
      dispatch(setSearchByPrice(Number(searchParams.get("price"))))
    },[searchParams])
  
  
  
    function handleChangeByTitle(e: any){
      const query = e.target.value
      setSearchParams((prev) => {
        const updatedParams = new URLSearchParams(prev)
        updatedParams.set("q", query)
        return updatedParams
        
      })
  
    }
  
    function handleChangeByPrice(e: any){
      const price = e.target.value
      setSearchParams((prev) => {
        const updatedParams = new URLSearchParams(prev)
        updatedParams.set("price", price)
        return updatedParams })
  
    }
  
    return (
      <div className="flex flex-col gap-4 mt-6 mb-4">
  <input
    type="text"
    placeholder="Search by title"
    onChange={(e) => handleChangeByTitle(e)}
    value={searchQuery || ""}
    className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
  />
  <input
    type="number"
    placeholder="Enter a price"
    onChange={(e) => handleChangeByPrice(e)}
    value={searchPrice || ""}
    className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
  />
</div>

    )
  
  }

  
  export default FilterSystem