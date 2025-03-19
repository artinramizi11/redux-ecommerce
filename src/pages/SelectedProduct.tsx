import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart, getProductById } from '../store/productsSlice';
import { RootState } from '../store/store';

const SelectedProduct = () => {
  const params = useParams();
  const product = useSelector((state: RootState) => state.products.products.find((product) => product.id === Number(params.id)));
  const dispatch = useDispatch();

  useEffect(() => {
    if (params.id) {
      dispatch(getProductById({ id: Number(params.id) }));
    }
  }, [params.id]);

  if (!product) {
    return <p className="text-center text-xl text-gray-500 mt-20">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6 flex flex-col justify-center">
      <div className="flex flex-col md:flex-row items-center gap-10 min-h-[500px]">
        <div className="flex-shrink-0">
          <img className="w-full md:w-80 h-[400px] object-cover rounded-xl shadow-lg" src={product?.images[0]} alt={product?.title} />
        </div>
        <div className="flex-grow max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product?.title}</h1>
          <h4 className="text-lg text-gray-600 mb-6 leading-relaxed">{product?.description}</h4>
          <h4 className="text-2xl font-semibold text-gray-900 mb-6">${product?.price}</h4>
          <div className="flex flex-wrap gap-2">
            {product?.tags.map((tag, index) => (
              <span key={index} className="bg-gray-300 px-4 py-2 rounded-full text-sm text-gray-800">
                {tag}
              </span>
            ))}
          </div>
    




        </div>
      </div>
    </div>
  );
};

export default SelectedProduct;
