import React from "react";

const ShippingInfo = () => {
  return (
    <div className="relative overflow-hidden min-h-screen bg-black">
      {/* Background Styling */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(234,179,8,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(234,179,8,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-yellow-900/10 to-black"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 text-white">
        
        {/* Hero Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-yellow-400">Shipping</span> 
            <span className="text-white"> Information</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We aim to provide clear and reliable shipping information to ensure you have a seamless shopping experience with Hirpa Furniture Industry.
          </p>
        </div>

        {/* Shipping Information Sections */}
        <div className="space-y-16">

          {/* Shipping Methods */}
          <div>
            <h2 className="text-4xl font-bold text-yellow-400 mb-6">1. Shipping Methods</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              We offer several shipping options to ensure that your order arrives safely and in a timely manner. Our available shipping methods include:
            </p>
            <ul className="list-disc pl-6 text-lg text-gray-300 mb-6">
              <li>Standard Shipping (5-7 business days)</li>
              <li>Expedited Shipping (2-3 business days)</li>
              <li>Overnight Shipping (Next business day)</li>
            </ul>
          </div>

          {/* Shipping Charges */}
          <div>
            <h2 className="text-4xl font-bold text-yellow-400 mb-6">2. Shipping Charges</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Shipping charges vary depending on the shipping method and the delivery location. The total shipping cost will be calculated at checkout.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              For orders over $500, we offer free standard shipping to most regions.
            </p>
          </div>

          {/* Delivery Time */}
          <div>
            <h2 className="text-4xl font-bold text-yellow-400 mb-6">3. Delivery Time</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              The delivery time depends on the shipping method you choose and your location. Please note that delivery times are estimates and may vary due to unforeseen circumstances, such as weather or carrier delays.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Standard Shipping: 5-7 business days
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Expedited Shipping: 2-3 business days
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Overnight Shipping: Next business day (available only in select areas)
            </p>
          </div>

          {/* Shipping Restrictions */}
          <div>
            <h2 className="text-4xl font-bold text-yellow-400 mb-6">4. Shipping Restrictions</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Please note the following shipping restrictions:
            </p>
            <ul className="list-disc pl-6 text-lg text-gray-300 mb-6">
              <li>We currently only ship within [your country/region].</li>
              <li>Some remote locations may experience longer delivery times.</li>
              <li>Furniture items may require special delivery arrangements (contact us for more information).</li>
            </ul>
          </div>

          {/* Order Processing Time */}
          <div>
            <h2 className="text-4xl font-bold text-yellow-400 mb-6">5. Order Processing Time</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Once you place an order, we will begin processing it within 1-2 business days. You will receive an email notification with tracking information once your order has shipped.
            </p>
          </div>

          {/* Tracking Your Order */}
          <div>
            <h2 className="text-4xl font-bold text-yellow-400 mb-6">6. Tracking Your Order</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              You will receive an email containing tracking information once your order has been shipped. You can track the status of your order through our carrier’s website or by contacting us.
            </p>
          </div>

          {/* Lost or Damaged Shipments */}
          <div>
            <h2 className="text-4xl font-bold text-yellow-400 mb-6">7. Lost or Damaged Shipments</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              If your shipment is lost or arrives damaged, please contact us immediately. We will work with the carrier to resolve the issue and ensure that you receive your order as quickly as possible.
            </p>
          </div>

          {/* Contact Us */}
          <div>
            <h2 className="text-4xl font-bold text-yellow-400 mb-6">8. Contact Us</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              If you have any questions or concerns about shipping, please don't hesitate to contact us:
            </p>
            <p className="text-lg text-gray-300">
              <strong>Email:</strong> <a href="mailto:support@hirpafurniture.com" className="text-yellow-400 hover:text-yellow-300">support@hirpafurniture.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;
