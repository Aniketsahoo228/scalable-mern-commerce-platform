import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; {/* ✅ added Link */}

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const mockOrderDetails = {
      _id: id,
      createdAt: new Date(),
      isPaid: true,
      isDelivered: false,
      paymentMethod: "PayPal",
      shippingMethod: "Standard",
      shippingAddress: {
        address: "123 Main Street",
        city: "Bhubaneswar",
        state: "Odisha",
        postalCode: "751001",
        country: "India",
      },
      orderItems: [
        {
          productId: "1",
          name: "Jacket",
          price: 120,
          quantity: 1,
          image: "https://picsum.photos/150?random=1",
        },
        {
          productId: "2",
          name: "Shoes",
          price: 200,
          quantity: 2,
          image: "https://picsum.photos/150?random=2",
        },
      ],
    };

    const timer = setTimeout(() => {
      setOrderDetails(mockOrderDetails);
    }, 0);

    return () => clearTimeout(timer);
  }, [id]);

  if (!orderDetails) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">
        Order Details
      </h2>

      <div className="p-6 rounded-lg border">

        {/* Order Info + Status */}
        <div className="flex flex-col sm:flex-row justify-between mb-8">
          <div>
            <h3 className="text-lg md:text-xl font-semibold">
              Order ID: #{orderDetails._id}
            </h3>

            <p className="text-gray-600">
              {new Date(orderDetails.createdAt).toLocaleDateString()}
            </p>

            <p className="text-gray-600">
              Payment Method: {orderDetails.paymentMethod}
            </p>

            <p className="text-gray-600">
              Shipping Method: {orderDetails.shippingMethod}
            </p>
          </div>

          {/* Status Badges */}
          <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
            <span
              className={`${
                orderDetails.isPaid
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              } px-3 py-1 rounded-full text-sm font-medium mb-2`}
            >
              {orderDetails.isPaid ? "Approved" : "Not Paid"}
            </span>

            <span
              className={`${
                orderDetails.isDelivered
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              } px-3 py-1 rounded-full text-sm font-medium`}
            >
              {orderDetails.isDelivered ? "Delivered" : "Processing Delivery"}
            </span>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">

          {/* Payment Info */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
            <p>Payment Method: {orderDetails.paymentMethod}</p>
            <p>Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
          </div>

          {/* Shipping Info */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
            <p>Shipping Method: {orderDetails.shippingMethod}</p>
            <p>
              Address:{" "}
              {orderDetails.shippingAddress.city},{" "}
              {orderDetails.shippingAddress.country}
            </p>
          </div>

        </div>

        {/* Product List */}
        <div className="overflow-x-auto">
          <h4 className="text-lg font-semibold mb-4">Products</h4>

          <table className="min-w-full text-gray-600 mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Unit Price</th>
                <th className="py-2 px-4 text-left">Quantity</th>
                <th className="py-2 px-4 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.orderItems.map((item) => (
                <tr key={item.productId} className="border-b">
                  <td className="py-2 px-4 flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg mr-4"
                    />
                    <Link to={`/product/${item.productId}`}>
                      {item.name}
                    </Link>
                  </td>
                  {/* ✅ added missing cells */}
                  <td className="py-2 px-4">${item.price}</td>
                  <td className="py-2 px-4">{item.quantity}</td>
                  <td className="py-2 px-4">${item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to="/my-order" className="text-blue-500 hover:underline" >
        
          Back to My Order 
       </Link>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
