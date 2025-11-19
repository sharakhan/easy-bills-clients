import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is installed: npm install axios

const BillDetails = () => {
  const { id } = useParams(); // Get bill ID from URL params
  const [bill, setBill] = useState(null); // State for bill data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchBill = async () => {
      if (!id) {
        setError('Invalid bill ID.');
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:3000/bill/${id}`);
        setBill(response.data);
      } catch (err) {
        console.error('API Error:', err); // Log for debugging
        setError('Failed to load bill details. Please check your connection or try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchBill();
  }, [id]); // Dependency on id to refetch if it changes

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <p className="text-center text-gray-600 text-lg">Loading bill details...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Back to Bills
          </button>
        </div>
      </div>
    );
  }

  // No bill found
  if (!bill) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Bill not found.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Back to Bills
          </button>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <button
          onClick={() => navigate('/bills')}
          className="mb-6 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
        >
          ← Back to Bills
        </button>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center">
            <span className="mr-2">📄</span>{bill?.title || 'Untitled Bill'}
          </h1>
          <p className="text-xl text-gray-600">Subtitle: Detailed Information for Your Utility Bill</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={bill?.image || 'https://via.placeholder.com/400x256?text=No+Image'}
              alt={bill?.title || 'Bill Image'}
              className="w-full h-64 object-cover rounded-xl shadow-md"
            />
          </div>
          <div className="space-y-4">
            <p className="text-lg flex items-center">
              <span className="mr-2">🏷️</span><strong>Category:</strong> {bill?.category || 'N/A'}
            </p>
            <p className="text-lg flex items-center">
              <span className="mr-2">📍</span><strong>Location:</strong> {bill?.location || 'N/A'}
            </p>
            <p className="text-lg flex items-center">
              <span className="mr-2">📧</span><strong>Email:</strong> {bill?.email || 'N/A'}
            </p>
            <p className="text-lg flex items-center">
              <span className="mr-2">📅</span><strong>Date:</strong> {bill?.date || 'N/A'}
            </p>
            <p className="text-lg text-green-600 font-semibold flex items-center">
              <span className="mr-2">💰</span><strong>Amount:</strong> {bill?.amount ? `${bill.amount}৳` : 'N/A'}
            </p>
            <p className="text-lg flex items-center">
              <span className="mr-2">📝</span><strong>Description:</strong> {bill?.description || 'No description available.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillDetails;