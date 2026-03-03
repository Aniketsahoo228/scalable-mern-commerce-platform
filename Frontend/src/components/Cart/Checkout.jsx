import { useState } from "react";

const cart = {
  products: [
    {
      name: "stylish",
      size: "M",
      color: "Black",
      price: 1200,
      // image: "https://picsum.photos/150?random=1",
    },
    {
      name: "Casual stylish",
      size: "42",
      color: "White",
      price: 1500,
      // image: "https://picsum.photos/150?random=2",
    },
  ],
  totalPrice: 1950,
};

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form>
            <h3 className="text-lg mb-4">Contact Details</h3>
            <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                 type="email"
                 value="user@example.com"
                 className="w-full p-2 border rounded" 
                 disabled/>
            </div>
            <h3 className="text-lg mb-4">Delivery</h3>
            <div className="mb-4 grid grid-cols-2 gap-2">
                <div>
                <label className="block text-gray-700">First Name</label>
                <input 
                  type = "text"
                  value={shippingAddress.firstName}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      firstName: e.target.value,
                    })
                  }
                  className = "w-full p-2 border rounded"
                />
                </div>
                <div>
                <label className="block text-gray-700">Last Name</label>
                <input 
                  type = "text"
                  value={shippingAddress.lastName}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                     lastName: e.target.value,
                    })
                  }
                  className = "w-full p-2 border rounded"
                />
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <input 
                type = "text"
                value={shippingAddress.address}
                onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                     address : e.target.value,
                    })
                }
                    className = "w-full p-2 border rounded"
                    requiresd                />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
                
                <div>
                <label className="block text-gray-700">City</label>
                <input 
                  type = "text"
                  value={shippingAddress.city}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      city: e.target.value,
                    })
                  }
                  className = "w-full p-2 border rounded"
                />
                </div>
                <div>
                <label className="block text-gray-700">Postal Code</label>
                <input 
                  type = "text"
                  value={shippingAddress.postalCode}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                     postalCode: e.target.value,
                    })
                  }
                  className = "w-full p-2 border rounded"
                />
                </div>
            
            </div>
             <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <input 
                type = "text"
                value={shippingAddress.address}
                onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                     address : e.target.value,
                    })
                }
                    className = "w-full p-2 border rounded"
                    requiresd                />
            </div>
             <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <input 
                type = "text"
                value={shippingAddress.address}
                onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                     address : e.target.value,
                    })
                }
                    className = "w-full p-2 border rounded"
                    requiresd                />
            </div>
        </form>
      </div>
     
    </div>
  );
};

export default Checkout;
