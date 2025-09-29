import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
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
            <span className="text-yellow-400">Privacy</span> 
            <span className="text-white"> Policy</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            At Hirpa Furniture Industry, your privacy is of paramount importance. This policy explains how we collect, 
            use, and protect your personal information when you visit our website or make a purchase.
          </p>
        </div>

        {/* Privacy Policy Sections */}
        <div className="space-y-16">

          {/* Information We Collect */}
          <div>
            <h2 className="text-4xl font-bold text-yellow-400 mb-6">1. Information We Collect</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              We collect personal information that you provide to us when using our website. This includes:
            </p>
            <ul className="list-disc pl-6 text-lg text-gray-300 mb-6">
              <li>Name, email address, and contact information</li>
              <li>Billing and shipping address</li>
              <li>Payment information (processed securely by our payment gateway)</li>
              <li>Information about your use of our website, including IP address and browser type</li>
            </ul>
          </div>

          {/* How We Use Your Information */}
          <div>
            <h2 className="text-4xl font-bold text-yellow-400 mb-6">2. How We Use Your Information</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              We use the information we collect to provide you with the best service and improve your experience with us. 
              This includes:
            </p>
            <ul className="list-disc pl-6 text-lg text-gray-300 mb-6">
              <li>Processing orders and delivering products to your address</li>
              <li>Providing customer support and responding to inquiries</li>
              <li>Improving our website and services</li>
              <li>Sending promotional offers and updates (with your consent)</li>
            </ul>
          </div>

          {/* Data Security */}
          <div>
            <h2 className="text-4xl font-bold text-yellow-400 mb-6">3. Data Security</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              We take the security of your personal information seriously. Our website uses industry-standard security 
              protocols, including encryption, to protect your data. However, no system is entirely secure, and we cannot 
              guarantee the absolute security of your information.
            </p>
          </div>

          {/* Sharing Your Information */}
          <div>
            <h2 className="text-4xl font-bold text-yellow-400 mb-6">4. Sharing Your Information</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              We do not sell or rent your personal information to third parties. We may share your data with trusted 
              service providers, such as payment processors or delivery services, who assist us in fulfilling your orders.
            </p>
          </div>

          {/* Your Rights */}
          <div>
            <h2 className="text-4xl font-bold text-yellow-400 mb-6">5. Your Rights</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-lg text-gray-300 mb-6">
              <li>Request access to your personal information</li>
              <li>Request corrections to any inaccuracies in your personal information</li>
              <li>Request deletion of your personal information, subject to legal limitations</li>
              <li>Opt-out of receiving marketing communications</li>
            </ul>
          </div>

          {/* Changes to Privacy Policy */}
          <div>
            <h2 className="text-4xl font-bold text-yellow-400 mb-6">6. Changes to This Privacy Policy</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be reflected on this page with a 
              new effective date.
            </p>
          </div>

          {/* Contact Us */}
          <div>
            <h2 className="text-4xl font-bold text-yellow-400 mb-6">7. Contact Us</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              If you have any questions or concerns about this Privacy Policy, please contact us:
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

export default PrivacyPolicy;
