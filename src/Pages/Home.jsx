// src/pages/Home.jsx  (অথবা যেখানে আছে)
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "../Components/Slider";
import CategoryCard from "../Components/CategoryCard";
import BillCard from "../Components/BillCard";
import { useAuth } from "../context/useAuth"; // ঠিক আছে



const Home = () => {
  const [bills, setBills] = useState([]);
  const {  loading } = useAuth(); // logout + loading
  

 

  // Fetch Recent Bills
  useEffect(() => {
    axios
      .get("http://localhost:3000/bill")
      .then((res) => {
        setBills(res.data.slice(0, 6));
      })
      .catch(() => {});
  }, []);

  // Categories Data
  const categories = [
    {
      name: "Electricity",
      icon: "Lightning",
      color: "from-yellow-400 to-orange-500",
    },
    { name: "Gas", icon: "Fire", color: "from-red-400 to-red-600" },
    { name: "Water", icon: "Droplet", color: "from-blue-400 to-cyan-500" },
    { name: "Internet", icon: "Globe", color: "from-purple-400 to-indigo-500" },
  ];

  // If still checking auth state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
    
      {/* ===== Hero Slider ===== */}
      <div className="mt-8">
        <Slider />
      </div>

      {/* ===== Categories Section ===== */}
      <section className="px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Bill Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {categories.map((cat, i) => (
            <CategoryCard
              key={i}
              icon={cat.icon}
              name={cat.name}
              color={cat.color}
            />
          ))}
        </div>
      </section>

      {/* ===== Recent Bills Section ===== */}
      <section className="px-6 pb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Recent Bills
        </h2>

        <div className="max-w-7xl mx-auto">
          {bills.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {bills.map((bill) => (
                <BillCard key={bill._id} bill={bill} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg">
              No bills found or loading...
            </p>
          )}

          {/* View All Bills Button */}
          <div className="flex justify-center mt-12">
            <Link
              to="/bills"
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-lg font-semibold rounded-full shadow-xl hover:scale-105 transition transform"
            >
              View All Bills →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
