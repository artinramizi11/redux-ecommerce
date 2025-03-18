import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

const OrdersPage = () => {
  const orders = useSelector((state: RootState) => state.products.orders)

  return (
    <div className="container mx-auto p-6">
      {orders.length === 0 && (
        <p className="text-center text-lg text-gray-500 mt-10 font-semibold">
          You have no orders
        </p>
      )}
      {orders.length > 0 && orders.map((orderList, i) => {
        const totalPrice = orderList.reduce((acc, pr) => acc + pr.price, 0)
        return (
          <div key={i} className="mb-8 bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center border-b-2 pb-4 mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">Order {i + 1}</h1>
                <p className="text-lg text-gray-600">{orderList.length} Products</p>
              </div>
              <div className="text-right">
                <p className="text-lg text-gray-800 font-medium">Total: ${totalPrice.toFixed(2)}</p>
              </div>
            </div>

            <table className="min-w-full table-auto text-left">
              <thead>
                <tr className="bg-gray-50 text-sm font-semibold text-gray-700 border-b">
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Price</th>
                </tr>
              </thead>
              <tbody>
                {orderList.map((order, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 border-b">
                    <td className="px-6 py-4 text-sm text-gray-800">{order.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">${order.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      })}
    </div>
  )
}

export default OrdersPage
