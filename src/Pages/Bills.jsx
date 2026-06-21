import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Components/Loading";
import ErrorMessage from "../Components/ErrorMessage";
import BillCard from "../Components/BillCard";

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ==========================
  // Fetch ALL BILLS once → collect all categories
  // ==========================
  useEffect(() => {
    const loadAllCategories = async () => {
      try {
       const response = await axios.get(
  `${import.meta.env.VITE_API_URL}/bill`
);
        const allBills = response.data || [];

        const categories = [
          ...new Set(allBills.map((b) => b?.category).filter(Boolean)),
        ];

        setAllCategories(categories);
      } catch (err) {
        console.error("Category Error:", err);
      }
    };

    loadAllCategories();
  }, []);

  // ==========================
  // Fetch bills based on selected category
  // ==========================
  const fetchBills = async () => {
    setLoading(true);
    setError(null);

    try {
      const endpoint = selectedCategory
  ? `${import.meta.env.VITE_API_URL}/bill?category=${selectedCategory}`
  : `${import.meta.env.VITE_API_URL}/bill`;

      const res = await axios.get(endpoint);
      setBills(res.data || []);
    } catch (err) {
      setError("Failed to load bills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, [selectedCategory]);

  const seeDetails = (id) => navigate(`/bill-details/${id}`);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
        <title>Bills</title>
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          💼 Easy Bill Management
        </h1>

        {/* Category Filter */}
        <div className="mt-4">
          <label className="mr-2 text-gray-700 font-medium">
            Filter by Category:
          </label>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm"
          >
            <option value="">All Categories</option>

            {allCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Bills Section */}
      <main className="max-w-7xl mx-auto">
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage message={error} onRetry={fetchBills} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 justify-items-center">
            {bills.length === 0 ? (
              <p className="text-center text-gray-600 text-lg col-span-full">
                No bills found.
              </p>
            ) : (
              bills?.map((bill) => (
                <BillCard
                  key={bill._id}
                  bill={bill}
                  onViewDetails={seeDetails}
                />
              ))
            )}
          </div>
        )}
      </main>

    </div>
  );
};

export default Bills;
