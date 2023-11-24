import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductCatalogHeader = () => {
  return (
    <header className="bg-gray-300 text-gray-600 p-4 text-center">
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold font-fjalla-one">PRODUCT CATALOG</h1>
      <p className="text-sm text-2xl">Browse our amazing products</p>
    </div>
  </header>

  );
};

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        console.log('Fetched data:', response.data);
        if (response.data && response.data.products) {
          setProducts(response.data.products);
        } else {
          console.error('Invalid data structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortType === 'price') {
      return a.price - b.price;
    }
    if (sortType === 'name') {
      return a.title.localeCompare(b.title);
    }
    return b.popularity - a.popularity;
  });

  return (
    <div>
      <ProductCatalogHeader />
      <div className="container shadow mx-auto p-4">
        <div className="mb-4 flex justify-between items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name"
              className="pl-8 pr-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-2 top-2 text-gray-500">
              <svg
                xmlns="https://pngtree.com/so/search-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.828 15.657a8 8 0 111.415-1.414l5 5a1 1 0 01-1.414 1.414l-5-5z"
                />
              </svg>
            </span>
          </div>
          <select
            className="ml-4 p-2 border rounded focus:outline-none focus:border-blue-500"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="price">Price</option>
            <option value="name">Name</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-blue-200 p-2 rounded shadow aspect-w-1 aspect-h-1 text-center"
              >
                <div className="aspect-w-1 aspect-h-1 mb-4">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-64 h-32 object-cover rounded mx-auto my-2"
                  />
                </div>
                <h2 className="text-lg font-semibold mb-2 mx-auto text-blue-800">
                  {product.title}
                </h2>
                <p className="text-bold text-lg mb-2">${product.price}</p>
                <p className="text-bold text-gray-500">
                  {product.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">No products available.</div>
        )}
      </div>
    </div>
  );
}

export default App;

