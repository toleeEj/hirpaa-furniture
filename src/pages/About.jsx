import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-black">
      {/* Simplified Background */}
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
            <span className="text-yellow-400">Crafting</span> 
            <span className="text-white"> Excellence</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            For over a decade, Hirpaa Furniture has been transforming spaces with exquisite, 
            handcrafted furniture that blends timeless elegance with modern functionality.
          </p>
        </div>

        {/* Meet the Owners Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-yellow-400 mb-6">Meet the Owners</h2>
          <p className="text-xl text-gray-300 mb-10">
            The visionaries behind Hirpaa Furniture. Each owner brings their unique expertise and passion to our company.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {['owner1.webp', 'owner2.webp', 'owner3.jpg', 'owner4.jpg', 'owner5.webp'].map((image, index) => (
              <div key={index} className="flex flex-col items-center space-y-4">
                <img 
                  src={`/images/${image}`} 
                  alt={`Owner ${index + 1}`} 
                  className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-xl border-4 border-yellow-400" 
                />
                <h3 className="text-xl font-semibold text-yellow-300">Owner {index + 1}</h3>
                <p className="text-gray-300">Owner {index + 1} is passionate about crafting timeless pieces that blend function and beauty.</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { number: '12+', label: 'Years Experience' },
            { number: '5000+', label: 'Happy Customers' },
            { number: '200+', label: 'Unique Designs' },
            { number: '15+', label: 'Awards Won' }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">{stat.number}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Our Story */}
          <div>
            <div className="mb-8">
              <span className="text-yellow-400 font-semibold text-lg">Our Journey</span>
              <h2 className="text-4xl font-bold mt-2 text-white">The Hirpaa Story</h2>
            </div>
            
            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                Founded in 2012 by master craftsman Samuel Hirpaa, our company began as a small workshop 
                with a big vision: to create furniture that tells a story. What started as a passion project 
                has grown into a renowned brand known for exceptional quality and design innovation.
              </p>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                Each piece in our collection is meticulously crafted by skilled artisans who share our 
                commitment to excellence. We source only the finest materials, ensuring that every item 
                not only looks beautiful but stands the test of time.
              </p>

              <div className="bg-yellow-500/10 p-6 rounded-lg border-l-4 border-yellow-400">
                <p className="text-yellow-200 italic text-lg">
                  "Furniture should be more than functional—it should inspire, comfort, and become 
                  part of your family's story."
                </p>
                <p className="text-yellow-400 mt-2 font-semibold">- Samuel Hirpaa, Founder</p>
              </div>
            </div>
          </div>

          {/* Mission & Values */}
          <div className="space-y-8">
            {/* Mission */}
            <div className="bg-black/30 p-6 rounded-xl border border-yellow-500/20">
              <h3 className="text-2xl font-semibold mb-4 text-yellow-300 flex items-center">
                <span className="text-yellow-400 mr-3">🎯</span>
                Our Mission
              </h3>
              <p className="text-gray-300 leading-relaxed">
                To enhance living spaces with furniture that combines aesthetic beauty, functional design, 
                and sustainable practices. We're committed to creating pieces that become cherished parts 
                of your home for generations.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-black/30 p-6 rounded-xl border border-yellow-500/20">
              <h3 className="text-2xl font-semibold mb-4 text-yellow-300 flex items-center">
                <span className="text-yellow-400 mr-3">✨</span>
                Our Vision
              </h3>
              <p className="text-gray-300 leading-relaxed">
                To be the leading choice for discerning homeowners who value quality craftsmanship, 
                innovative design, and furniture that makes a statement while serving everyday life.
              </p>
            </div>

            {/* Values */}
            <div className="bg-black/30 p-6 rounded-xl border border-yellow-500/20">
              <h3 className="text-2xl font-semibold mb-4 text-yellow-300 flex items-center">
                <span className="text-yellow-400 mr-3">💎</span>
                Core Values
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Quality Craftsmanship',
                  'Sustainability',
                  'Customer Focus',
                  'Innovation',
                  'Timeless Design',
                  'Integrity'
                ].map((value, index) => (
                  <div key={index} className="flex items-center text-gray-300">
                    <span className="text-yellow-400 mr-2">✓</span>
                    {value}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-yellow-400 mb-4">Why Choose Hirpaa?</h2>
            <p className="text-gray-300 text-lg">Discover what sets us apart in the world of fine furniture</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🔨',
                title: 'Expert Craftsmanship',
                description: 'Each piece handcrafted by skilled artisans with decades of experience'
              },
              {
                icon: '🌿',
                title: 'Sustainable Materials',
                description: 'Ethically sourced wood and eco-friendly finishes for a greener future'
              },
              {
                icon: '⚡',
                title: 'Custom Solutions',
                description: 'Tailored designs to fit your unique space and personal style'
              },
              {
                icon: '🏆',
                title: 'Award-Winning Design',
                description: 'Recognized internationally for innovation and aesthetic excellence'
              },
              {
                icon: '🚚',
                title: 'White-Glove Delivery',
                description: 'Professional installation and setup included with every purchase'
              },
              {
                icon: '🔒',
                title: 'Lifetime Warranty',
                description: 'Comprehensive warranty because we stand behind our craftsmanship'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-yellow-500/5 rounded-lg border border-yellow-500/10">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold text-yellow-300 mb-3">{feature.title}</h4>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 rounded-2xl border border-yellow-500/30">
          <h3 className="text-3xl font-bold text-yellow-300 mb-4">Ready to Transform Your Space?</h3>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            Explore our collections or schedule a consultation with our design experts to bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-3 rounded-lg font-semibold text-lg shadow-lg"
            >
              View Collections
            </Link>
            <Link
              to="/contact"
              className="border-2 border-yellow-500 text-yellow-400 px-8 py-3 rounded-lg font-semibold text-lg"
            >
              Book Consultation
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-6 text-yellow-300">Get in Touch</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-3 text-gray-300">
              <span className="text-2xl text-yellow-400">📧</span>
              <a href="mailto:info@hirpaafurniture.com" className="hover:text-yellow-300">
                info@hirpaafurniture.com
              </a>
            </div>
            <div className="flex items-center justify-center space-x-3 text-gray-300">
              <span className="text-2xl text-yellow-400">📞</span>
              <a href="tel:+1234567890" className="hover:text-yellow-300">
                +1 (234) 567-890
              </a>
            </div>
            <div className="flex items-center justify-center space-x-3 text-gray-300">
              <span className="text-2xl text-yellow-400">📍</span>
              <Link to="/contact" className="hover:text-yellow-300">
                Visit Showroom
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
