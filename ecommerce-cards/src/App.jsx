import { useState, useEffect, useMemo } from "react";
import ProductCard from "./ProductCard";
import "./App.css";

const EXCHANGE_RATE = 83.5;

function App() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

  // Product Details Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    let ignore = false;
    setStatus("loading");

    const timer = setTimeout(() => {
      const url = searchQuery.trim()
        ? `https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery)}&limit=100`
        : "https://dummyjson.com/products?limit=100";

      fetch(url)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch");
          return res.json();
        })
        .then((data) => {
          if (ignore) return;
          setProducts(data.products || []);
          setStatus("ready");
        })
        .catch(() => {
          if (ignore) return;
          setStatus("error");
        });
    }, 400);

    return () => {
      ignore = true;
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const categories = useMemo(() => {
    const cats = products.map((p) => p.category);
    return ["all", ...Array.from(new Set(cats))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (sortOrder === "low-high") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-low") {
      result = [...result].sort((a, b) => b.price - a.price);
    }
    return result;
  }, [products, selectedCategory, sortOrder]);

  // --- CART LOGIC ---
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleDecreaseQuantity = (productId) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing && existing.quantity === 1) {
        // If quantity is 1, remove it entirely
        return prev.filter((item) => item.id !== productId);
      }
      // Otherwise, just subtract 1
      return prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * EXCHANGE_RATE * item.quantity,
    0
  );

  if (status === "loading" && products.length === 0) {
    return (
      <div className="app-container">
        <p style={{ textAlign: "center", color: "#fff" }}>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>Mini Store</h1>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: "10px 16px",
              borderRadius: "30px",
              border: "1px solid #333",
              background: "#1e1e1e",
              color: "#fff",
              fontSize: "14px",
              outline: "none",
              width: "240px",
            }}
          />
          <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
            Cart
            {totalCount > 0 && <span className="badge">{totalCount}</span>}
          </button>
        </div>
      </header>

      <div className="layout-container">
        <aside className="filter-sidebar">
          <h3>Filters</h3>
          <div className="filter-group">
            <label>Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1).replace("-", " ")}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Sort by Price</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="filter-select"
            >
              <option value="default">Default</option>
              <option value="low-high">Low to High</option>
              <option value="high-low">High to Low</option>
            </select>
          </div>
        </aside>

        <main style={{ flex: 1 }}>
          {filteredProducts.length === 0 && status === "ready" ? (
            <p style={{ textAlign: "center", color: "#888", marginTop: "40px" }}>
              No products match your filters.
            </p>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onViewDetails={setSelectedProduct}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* PRODUCT DETAILS MODAL */}
      {selectedProduct && (
        <>
          <div className="overlay" onClick={() => setSelectedProduct(null)} />
          <div className="product-modal">
            <button className="modal-close-btn" onClick={() => setSelectedProduct(null)}>
              ✕
            </button>
            
            <div className="modal-content">
              <div className="modal-image-section">
                <img 
                  src={selectedProduct.thumbnail} 
                  alt={selectedProduct.title} 
                  className="modal-main-image" 
                />
                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <div className="modal-thumbnails">
                    {selectedProduct.images.map((img, idx) => (
                      <img key={idx} src={img} alt="thumb" className="modal-thumb" />
                    ))}
                  </div>
                )}
              </div>

              <div className="modal-info-section">
                <span className="modal-category">{selectedProduct.category}</span>
                <h2 className="modal-title">{selectedProduct.title}</h2>
                
                <div className="modal-rating">
                  <span className="rating-badge">
                    {selectedProduct.rating || "4.5"} ★
                  </span>
                  <span className="rating-count">
                    ({selectedProduct.stock} items left in stock)
                  </span>
                </div>

                <div className="modal-price-section">
                  <span className="modal-price">
                    ₹{(selectedProduct.price * EXCHANGE_RATE).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </span>
                  <span className="modal-discount">
                    {Math.round(selectedProduct.discountPercentage)}% OFF
                  </span>
                </div>

                <p className="modal-description">{selectedProduct.description}</p>

                <div className="modal-action-buttons">
                  <button 
                    className="modal-add-btn"
                    onClick={() => handleAddToCart(selectedProduct)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* CART SIDEBAR */}
      {isCartOpen && (
        <>
          <div className="overlay" onClick={() => setIsCartOpen(false)} />
          <div className="cart-panel">
            <div className="cart-header">
              <h2>Your Cart</h2>
              <button className="close-btn" onClick={() => setIsCartOpen(false)}>
                ✕
              </button>
            </div>

            {cartItems.length === 0 ? (
              <p style={{ color: "#888", marginTop: "20px" }}>
                Your cart is empty.
              </p>
            ) : (
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="cart-item-img"
                    />
                    
                    <div className="cart-item-info">
                      <p className="cart-item-title" title={item.title}>
                        {item.title}
                      </p>
                      
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "8px" }}>
                        <span className="cart-item-price">
                          ₹{(item.price * EXCHANGE_RATE).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                        </span>
                        
                        {/* Quantity Controls */}
                        <div style={{ display: "flex", alignItems: "center", background: "#333", borderRadius: "4px" }}>
                          <button 
                            onClick={() => handleDecreaseQuantity(item.id)}
                            style={{ padding: "2px 8px", background: "transparent", color: "#fff", border: "none", cursor: "pointer", fontSize: "16px" }}
                          >
                            -
                          </button>
                          <span style={{ fontSize: "13px", color: "#fff", padding: "0 4px", fontWeight: "bold" }}>
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => handleAddToCart(item)} 
                            style={{ padding: "2px 8px", background: "transparent", color: "#fff", border: "none", cursor: "pointer", fontSize: "16px" }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Red cross to remove entirely */}
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveFromCart(item.id)}
                      title="Remove item entirely"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* CART FOOTER (Continue Shopping) */}
            {cartItems.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total:</span>
                  <span>
                    ₹{totalPrice.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </span>
                </div>
                
                <button 
                  className="checkout-btn" 
                  onClick={() => setIsCartOpen(false)}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;