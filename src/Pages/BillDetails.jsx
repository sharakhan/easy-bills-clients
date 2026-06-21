import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const BillDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnabled, setIsEnabled] = useState(true);

  const { user } = useContext(AuthContext);
  const instanceSecure = useAxiosSecure();

  // Fetch bill by ID
  useEffect(() => {
    const fetchBill = async () => {
      if (!id) {
        setError("Invalid bill ID.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_CLIENT_URL}/bill/${id}`
        );
        setBill(response.data);
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to load bill details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBill();
  }, [id]);

  // Enable/disable Pay Bill button
  useEffect(() => {
    if (!bill) return;

    const billDate = new Date(bill.date);
    const today = new Date();

    const sameMonth =
      billDate.getMonth() === today.getMonth() &&
      billDate.getFullYear() === today.getFullYear();

    setIsEnabled(sameMonth);
  }, [bill]);

  const currentDate = new Date().toISOString().slice(0, 10);

  // Handle Pay Bill Submission
  const handlePayBill = (e) => {
    e.preventDefault();

    const billData = {
      email: user.email,
      userName: user.displayName,
      billId: id,
      amount: bill.amount,
      address: e.target.address.value,
      phoneNumber: e.target.phoneNumber.value,
      date: currentDate,
    };

    instanceSecure
      .post(`/newPay?email=${user?.email}`, billData)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Bill payment successful!");
          modalRef.current.close();
        }
      })
      .catch(() => {
        toast.error("Payment failed. Try again.");
      });
  };

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading bill details...</p>
      </div>
    );
  }

  // Error screen
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Back to Bills
          </button>
        </div>
      </div>
    );
  }

  // Bill not found
  if (!bill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Bill not found.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Back to Bills
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <title>Bill Details</title>
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <button
          onClick={() => navigate("/bills")}
          className="mb-6 bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          ← Back to Bills
        </button>

        {/* BILL HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📄 {bill.title}
          </h1>
          <p className="text-xl text-gray-600">Detailed Bill Information</p>
        </div>

        {/* BILL DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <img
            src={bill.image || "https://via.placeholder.com/400x256"}
            alt=""
            className="w-full h-64 rounded-xl object-cover shadow-md"
          />

          <div className="space-y-2 text-lg">
            <p>🏷️ <strong>Category:</strong> {bill.category}</p>
            <p>📍 <strong>Location:</strong> {bill.location}</p>
            <p>📧 <strong>Email:</strong> {bill.email}</p>
            <p>📅 <strong>Date:</strong> {bill.date}</p>
            <p className="text-green-600 font-bold">
              💰 <strong>Amount:</strong> {bill.amount}৳
            </p>
            <p>📝 <strong>Description:</strong> {bill.description}</p>

            <button
              onClick={() => modalRef.current.showModal()}
              disabled={!isEnabled}
              className={`btn w-full text-xl ${isEnabled ? "btn-success text-white" : "btn-disabled"
                }`}
            >
              Pay Bill
            </button>
          </div>
        </div>
      </div>

      {/* PAYMENT MODAL */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">

          <form onSubmit={handlePayBill} className="space-y-3">

            <div>
              <label>Email:</label>
              <input className="input w-full" value={user.email} readOnly />
            </div>

            <div>
              <label>Username:</label>
              <input className="input w-full" value={user.displayName} readOnly />
            </div>

            <div>
              <label>Bill ID:</label>
              <input className="input w-full" value={id} readOnly />
            </div>

            <div>
              <label>Amount:</label>
              <input className="input w-full" value={bill.amount} readOnly />
            </div>

            <div>
              <label>Address:</label>
              <input name="address" required className="input w-full" />
            </div>

            <div>
              <label>Phone:</label>
              <input name="phoneNumber" required className="input w-full" />
            </div>

            <div>
              <label>Date:</label>
              <input className="input w-full" value={currentDate} readOnly />
            </div>

            <button className="btn btn-success w-full text-white text-xl">
              Submit
            </button>
          </form>

          <button
            onClick={() => modalRef.current.close()}
            className="btn btn-neutral mt-4"
          >
            Cancel
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default BillDetails;
