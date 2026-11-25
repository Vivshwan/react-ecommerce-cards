import React from "react";
import "./ProductCard.css";

const EXCHANGE_RATE = 83.5; 

export default function ProductCard({ product, onAddToCart, onViewDetails }) {
  const imageUrl = product.thumbnail || product.images?.[0];

  return (
    <div className="card" onClick={() => onViewDetails(product)}>
      <div className="image-container">
        <img src={imageUrl} alt={product.title} />
      </div>
      <span className="category">{product.category}</span>
      <h3 className="title" title={product.title}>
        {product.title}
      </h3>
      <p className="price">
        ₹{(product.price * EXCHANGE_RATE).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
      </p>
      
      {/* Stop propagation so clicking the button doesn't trigger the card's onClick */}
      <button 
        className="add-btn" 
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart(product);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}