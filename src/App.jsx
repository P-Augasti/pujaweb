import { useState } from 'react'
import './App.css'

const PRODUCTS = [
  { id: 1, name: 'Silk Oversized Shirt', category: 'tops', price: 189, image: '👔', color: 'Cream' },
  { id: 2, name: 'Tailored Blazer', category: 'outerwear', price: 349, image: '🧥', color: 'Black' },
  { id: 3, name: 'Wide Leg Trousers', category: 'bottoms', price: 199, image: '👖', color: 'Charcoal' },
  { id: 4, name: 'Linen Dress', category: 'dresses', price: 229, image: '👗', color: 'White' },
  { id: 5, name: 'Minimalist Tee', category: 'tops', price: 79, image: '👕', color: 'Black' },
  { id: 6, name: 'Wool Coat', category: 'outerwear', price: 499, image: '🧥', color: 'Camel' },
  { id: 7, name: 'High-Waist Skirt', category: 'bottoms', price: 159, image: '👖', color: 'Navy' },
  { id: 8, name: 'Maxi Gown', category: 'dresses', price: 599, image: '👗', color: 'Burgundy' },
]

const CATEGORIES = ['all', 'tops', 'bottoms', 'dresses', 'outerwear']

function App() {
  const [cart, setCart] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showCart, setShowCart] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory)

  const addToCart = (product) => {
    setCart([...cart, product])
  }

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index))
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0)

  const handleContactSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold tracking-tight">LUXE</h1>
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-black transition"
            >
              Cart
              {cart.length > 0 && (
                <span className="absolute top-1 right-1 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl sm:text-6xl font-bold mb-6 tracking-tight">Elevated Elegance</h2>
            <p className="text-xl text-gray-600 mb-8">Curated collections for the discerning minimalist</p>
            <button
              onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
              className="inline-block bg-black text-white px-8 py-3 text-lg font-medium hover:bg-gray-800 transition"
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Products Section */}
          <div className="lg:col-span-2" id="products">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Collections</h3>
              <div className="flex flex-wrap gap-3">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-sm font-medium transition capitalize ${
                      selectedCategory === cat
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="border border-gray-200 p-4 hover:shadow-lg transition">
                  <div className="text-6xl mb-4">{product.image}</div>
                  <h4 className="text-lg font-semibold mb-2">{product.name}</h4>
                  <p className="text-gray-600 text-sm mb-3">{product.color}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">${product.price}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 transition"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className={`sticky top-20 ${showCart ? 'block' : 'hidden lg:block'}`}>
              <div className="border border-gray-200 p-6">
                <h3 className="text-2xl font-bold mb-6">Shopping Bag</h3>

                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Your bag is empty</p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                      {cart.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-start pb-4 border-b">
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">${item.price}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(idx)}
                            className="text-gray-400 hover:text-red-600 transition"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="border-t-2 pt-4 mb-6">
                      <div className="flex justify-between text-lg font-bold mb-4">
                        <span>Total:</span>
                        <span>${totalPrice}</span>
                      </div>
                      <button className="w-full bg-black text-white py-3 font-semibold hover:bg-gray-800 transition">
                        Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
          <p className="text-gray-300 mb-8">Get exclusive access to new collections and early sale previews</p>

          {submitted ? (
            <div className="text-green-400 text-lg font-medium">✓ Thank you! Check your email soon.</div>
          ) : (
            <form onSubmit={handleContactSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 bg-white text-black placeholder-gray-600 focus:outline-none"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-white text-black font-semibold hover:bg-gray-200 transition"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black transition">New Arrivals</a></li>
                <li><a href="#" className="hover:text-black transition">Collections</a></li>
                <li><a href="#" className="hover:text-black transition">Sale</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black transition">Our Story</a></li>
                <li><a href="#" className="hover:text-black transition">Sustainability</a></li>
                <li><a href="#" className="hover:text-black transition">Craftsmanship</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black transition">Contact</a></li>
                <li><a href="#" className="hover:text-black transition">Shipping</a></li>
                <li><a href="#" className="hover:text-black transition">Returns</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black transition">Instagram</a></li>
                <li><a href="#" className="hover:text-black transition">Twitter</a></li>
                <li><a href="#" className="hover:text-black transition">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 LUXE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
