# 🛒 Mini Store - React E-Commerce App

A modern, responsive, and fully functional e-commerce frontend built with **React**. This project fetches product data from a live API and provides a seamless shopping experience, including searching, filtering, detailed product views, and a dynamic shopping cart.

## 🚀 Live Demo

[View Live Demo](https://your-live-link-here.com)

*(Replace the link above after deploying to Vercel or Netlify.)*

## ✨ Features

- **Product Catalog:** Fetches 100+ products from the DummyJSON API.
- **Search with Debounce:** Real-time search that waits for the user to stop typing before hitting the API, preventing unnecessary network requests.
- **Advanced Filtering & Sorting:**
  - Filter products by dynamically generated categories.
  - Sort products by price (Low to High / High to Low).
- **Product Details Modal:** Click any product to view a Flipkart/Amazon-style detailed view with a larger image, full description, stock status, and discount percentage.
- **Dynamic Shopping Cart:**
  - Slide-out cart sidebar.
  - Add, remove, and adjust item quantities directly inside the cart.
  - Real-time total price calculation.
- **INR Currency Formatting:** All prices are converted from USD to INR and formatted using the Indian numbering system (e.g., ₹1,09,999 instead of 109,999).
- **Modern UI/UX:**
  - Sleek dark mode design.
  - Smooth CSS animations (hover effects, slide-in cart, modal pop-ups).
  - Fully responsive layout for desktop and mobile.

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React (Vite) |
| Styling | Pure CSS (Custom properties, Flexbox, CSS Animations) |
| Icons/Assets | Emojis & API images |
| API | [DummyJSON](https://dummyjson.com/) |

## 📂 Project Structure

```text
mini-store/
├── public/
├── src/
│   ├── App.jsx          # Main application logic, state management, and layout
│   ├── App.css          # Global styles, layout, and animations
│   ├── ProductCard.jsx  # Individual product card component
│   ├── ProductCard.css  # Styles specific to the product card
│   └── main.jsx         # Application entry point
├── index.html
├── package.json
└── vite.config.js
```

## ⚙️ How to Run Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- npm (comes with Node.js)

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/mini-store.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd mini-store
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Open your browser:**

   Go to `http://localhost:5173` to see the app in action.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates an optimized production build |
| `npm run preview` | Previews the production build locally |

## 🧠 Key Learnings & Architecture

- **State Management:** Used React `useState` and `useEffect` for complex state flows (cart state, modal visibility, search terms).
- **Performance Optimization:** Used `useMemo` to avoid recalculating the filtered and sorted product lists on every render. Implemented a debounce mechanism on the search bar to limit API calls.
- **Event Handling:** Handled event bubbling properly (e.g., `e.stopPropagation()`) so clicking "Add to Cart" doesn't trigger the product details modal.
- **Data Formatting:** Used JavaScript's `Intl.NumberFormat` / `toLocaleString` for accurate currency localization.

## 🔮 Future Improvements

- Persist the cart using `localStorage`
- Add user authentication
- Add a checkout flow and order summary page
- Add wishlist functionality
- Add pagination or infinite scrolling
- Add a light/dark theme toggle

## 🤝 Contributing

Contributions are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m "Add some AmazingFeature"`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 👤 Author

**Your Name**

- GitHub: [@your-username](https://github.com/your-username)

---

⭐ If you found this project helpful, consider giving it a star!