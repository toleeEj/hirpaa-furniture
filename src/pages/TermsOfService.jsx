import React from "react";

const TermsOfService = () => {
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
            <span className="text-yellow-400">Terms of</span> 
            <span className="text-white"> Service</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            By using our website and services, you agree to the following Terms of Service. Please read them carefully.
          </p>
        </div>

        {/* Terms of Service Sections */}
        <div className="space-y-16">

          {/* Introduction */}
          <div>
            <h2 className="text-4xl font-bold text-yellow-400 mb-6">1. Introduction</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Welcome to Hirpa Furniture Industry. By accessing and using our website and services, you agree to abide by these Terms of Service and our Privacy Policy. If you do not agree with any part of these terms, please refrain from using our services.
            </p>
          </div>

          {/* Use of Services */}
          <div>
            <h2 className="text-4xl font-bold text-yellow-400 mb-6">2. Use of Our Services</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              You agree to use our website and services for lawful purposes only. You shall not engage in any activities that could damage, disable, or impair the functionality of the website, or interfere with any other party's use of the website.
            </p>
          </div>

          {/* Account Creation */}
          <div>
            <h2 className="text-4xl font-bold text-yellow-400 mb-6">3. Account Creation</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              To access certain features of our website, you may be required to create an account. You agree to provide accurate and complete information during the registration process. It is your responsibility to keep your account details secure.
            </p>
          </div>

          {/* Privacy and Data Protection */}
          <div>
            <h2 className="text-4xl font-bold text-yellow-400 mb-6">4. Privacy and Data Protection</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              We respect your privacy. Please review our Privacy Policy to understand how we collect, use, and protect your personal data.
            </p>
          </div>

          {/* Shipping and Delivery */}
          <div>
            <h2 className="text-4xl font-bold text-yellow-400 mb-6">5. Shipping and Delivery</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Our shipping services are detailed on the Shipping Info page. Please refer to that page for information about shipping rates, delivery times, and shipping restrictions.
            </p>
          </div>

          {/* Returns and Exchanges */}
          <div>
            <h2 className="text-4xl font-bold text-yellow-400 mb-6">6. Returns and Exchanges</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              We accept returns and exchanges in accordance with our Return Policy. Please review our Returns page for more details.
            </p>
          </div>

          {/* Limitation of Liability */}
          <div>
            <h2 className="text-4xl font-bold text-yellow-400 mb-6">7. Limitation of Liability</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Hirpa Furniture Industry is not responsible for any indirect, incidental, or consequential damages arising out of or in connection with the use of our website or services.
            </p>
          </div>

          {/* Amendments */}
          <div>
            <h2 className="text-4xl font-bold text-yellow-400 mb-6">8. Amendments</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              We may update or modify these Terms of Service from time to time. Any changes will be reflected on this page with an updated date. Please review these terms periodically.
            </p>
          </div>

          {/* Governing Law */}
          <div>
            <h2 className="text-4xl font-bold text-yellow-400 mb-6">9. Governing Law</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              These Terms of Service are governed by the laws of [Your Country/State]. Any disputes arising from the use of our website or services will be handled in the courts located within [Your Location].
            </p>
          </div>

          {/* Contact Us */}
          <div>
            <h2 className="text-4xl font-bold text-yellow-400 mb-6">10. Contact Us</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <p className="text-lg text-gray-300">
              <strong>Email:</strong> <a href="mailto:support@hirpafurniture.com" className="text-yellow-400 hover:text-yellow-300">support@hirpafurniture.com</a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Hirpa Furniture Industry. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default TermsOfService;
