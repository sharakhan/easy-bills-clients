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
  const [isEnabled, setIsEnabled] = useState(false);

  const { user } = useContext(AuthContext);
  const instanceSecure = useAxiosSecure();

  // ==========================
  // FETCH BILL BY ID
  // ==========================
  useEffect(() => {
    const fetchBill = async () => {
      if (!id) {
        setError("Invalid bill ID");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/bill/${id}`
        );

        setBill(res.data || null);
      } catch (err) {
        console.error(err);
        setError("Failed to load bill details");
      } finally {
        setLoading(false);
      }
    };

    fetchBill();
  }, [id]);

  // ==========================
  // ENABLE PAY BUTTON (same month check)
  // ==========================
  useEffect(() => {
    if (!bill?.date) return;

    const billDate = new Date(bill.date);
    const today = new Date();

    const sameMonth =
      billDate.getMonth() === today.getMonth() &&
      billDate.getFullYear() === today.getFullYear();

    setIsEnabled(sameMonth);
  }, [bill]);

  const currentDate = new Date().toISOString().slice(0, 10);

  // ==========================
  // PAY BILL
  // ==========================
  const handlePayBill = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("User not logged in");
      return;
    }

    const billData = {
      email: user?.email,
      userName: user?.displayName,
      billId: id,
      amount: bill?.amount,
      address: e.target.address.value,
      phoneNumber: e.target.phoneNumber.value,
      date: currentDate,
    };

    try {
      const res = await instanceSecure.post(
        `/newPay?email=${user?.email}`,
        billData
      );

      if (res.data?.insertedId) {
        toast.success("Bill payment successful!");
        modalRef.current?.close();
      }
    } catch (err) {
      console.error(err);
      toast.error("Payment failed. Try again.");
    }
  };

  // ==========================
  // LOADING
  // ==========================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // ==========================
  // ERROR
  // ==========================
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <p className="text-red-500 mb-3">{error}</p>
          <button
            onClick={() => navigate("/bills")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  // ==========================
  // NO BILL
  // ==========================
  if (!bill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Bill not found
      </div>
    );
  }

  // ==========================
  // UI
  // ==========================
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <title>Bill Details</title>

      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">
        <button
          onClick={() => navigate("/bills")}
          className="mb-5 bg-gray-500 text-white px-4 py-2 rounded"
        >
          Back
        </button>

        <h1 className="text-3xl font-bold mb-4">{bill?.title}</h1>

        <img
          src={
            bill?.image ||
            "https://via.placeholder.com/400x250"
          }
          className="w-full h-64 object-cover rounded"
        />

        <div className="mt-5 space-y-2">
          <p>Category: {bill?.category}</p>
          <p>Location: {bill?.location}</p>
          <p>Amount: {bill?.amount}৳</p>
          <p>Date: {bill?.date}</p>
        </div>

        <button
          onClick={() => modalRef.current?.showModal()}
          disabled={!isEnabled}
          className={`mt-5 px-4 py-2 rounded text-white ${
            isEnabled ? "bg-green-500" : "bg-gray-400"
          }`}
        >
          Pay Bill
        </button>
      </div>

      {/* MODAL */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <form onSubmit={handlePayBill} className="space-y-3">

            <input className="input w-full" value={user?.email || ""} readOnly />
            <input className="input w-full" value={user?.displayName || ""} readOnly />
            <input className="input w-full" value={id} readOnly />
            <input className="input w-full" value={bill?.amount || ""} readOnly />

            <input name="address" className="input w-full" placeholder="Address" required />
            <input name="phoneNumber" className="input w-full" placeholder="Phone" required />

            <input className="input w-full" value={currentDate} readOnly />

            <button className="btn btn-success w-full text-white">
              Submit
            </button>
          </form>

          <button
            onClick={() => modalRef.current?.close()}
            className="btn mt-3"
          >
            Cancel
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default BillDetails;