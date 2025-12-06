import { useContext, useEffect, useRef, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MyPayBills = () => {
  const { user } = useContext(AuthContext);
  const instanceSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [paidBills, setPaidBills] = useState([]);
  const modalRef = useRef();
  const [updateBill, setUpdateBill] = useState(null);
  const [reFetch, setReFetch] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    instanceSecure.get(`/paidBills?email=${user.email}`).then((res) => {
      setPaidBills(res.data);
      setLoading(false);
    });
  }, [instanceSecure, user, reFetch]);

  // Open update modal
  const updateBtnClick = (id) => {
    const clickedBill = paidBills.find((bill) => bill._id === id);
    setUpdateBill(clickedBill);
    modalRef.current.showModal();
  };

  // Update bill
  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedBill = {
      amount: e.target.amount.value,
      address: e.target.address.value,
      phoneNumber: e.target.phoneNumber.value,
      date: e.target.date.value,
    };

    instanceSecure
      .put(
        `/updatePaidBill/${updateBill._id}?email=${user.email}`,
        updatedBill
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Bill updated successfully.");
          setReFetch(!reFetch);
        }
      })
      .finally(() => {
        setLoading(false);
        modalRef.current.close();
        e.target.reset();
        setUpdateBill(null);
      });
  };

  // Delete bill
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        instanceSecure
          .delete(`/deletePaidBill/${id}?email=${user.email}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your bill has been deleted.", "success");
              setReFetch(!reFetch);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }
    });
  };

  // Loading UI
  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <p className="text-center text-gray-600 text-lg">
          Loading bill details...
        </p>
      </div>
    );
  }

  return (
    <div className="sm:px-5">
        <title>MyPayBills</title>
      <h2 className="text-4xl font-bold text-center my-10">My Paid Bills</h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>NO</th>
              <th>User</th>
              <th>Address</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {paidBills.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              paidBills.map((bill, i) => (
                <tr key={bill._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="flex flex-col gap-1">
                      <span>{bill.userName}</span>
                      <span>{bill.email}</span>
                      <span>{bill.phoneNumber}</span>
                    </div>
                  </td>
                  <td>{bill.address}</td>
                  <td>{bill.amount}</td>
                  <td>{bill.date}</td>
                  <td>
                    <div className="flex gap-1">
                      <button
                        onClick={() => updateBtnClick(bill._id)}
                        className="btn btn-info"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(bill._id)}
                        className="btn btn-error"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      <dialog ref={modalRef} id="my_modal_1" className="modal">
        <div className="modal-box p-4">
          <form onSubmit={handleUpdate} className="space-y-3">
            <div className="flex flex-col gap-1">
              <label className="label">Amount:</label>
              <input
                type="text"
                required
                name="amount"
                defaultValue={updateBill?.amount}
                className="input w-full"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="label">Address:</label>
              <input
                type="text"
                required
                name="address"
                defaultValue={updateBill?.address}
                className="input w-full"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="label">Phone:</label>
              <input
                type="text"
                required
                name="phoneNumber"
                defaultValue={updateBill?.phoneNumber}
                className="input w-full"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="label">Date:</label>
              <input
                type="date"
                required
                name="date"
                defaultValue={updateBill?.date}
                className="input w-full"
              />
            </div>

            <button className="btn btn-success text-xl text-white w-full">
              Submit
            </button>
          </form>

          <button
            onClick={() => modalRef.current.close()}
            className="btn btn-neutral mt-5"
          >
            Cancel
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default MyPayBills;
