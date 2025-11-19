import { useNavigate } from "react-router-dom";

const BillCard = ({ bill }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden 
                 hover:shadow-2xl hover:-translate-y-5 transform transition-all duration-700 
                 w-full max-w-sm mx-auto group relative"
    >
      {/* Bill Image with Hover Zoom */}
      <div className="overflow-hidden relative">
        <img
          src={
            bill?.image ||
            "https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&w=800&q=80"
          }
          alt={bill?.title || "Bill Image"}
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-150 group-hover:brightness-90"
        />

        {/* Image Overlay Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
      </div>

      {/* Bill Info */}
      <div className="p-5 text-center">
        <h2 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors duration-400">
          📄 {bill?.title || "Untitled Bill"}
        </h2>

        <p className="text-sm text-blue-600 font-medium mb-2">
          🏷️{" "}
          <span className="inline-block bg-blue-100 px-3 py-1 rounded-full ml-1">
            {bill?.category || "N/A"}
          </span>
        </p>

        <p className="text-sm text-gray-600 mb-2">📍 {bill?.location || "N/A"}</p>

        <p className="font-semibold text-lg text-green-600 mb-4">
          💰 {bill?.amount ? `${bill.amount}৳` : "N/A"}
        </p>

        {/* See Details Button */}
        <button
          onClick={() => navigate(`/bill-details/${bill?._id}`)}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white 
                     px-5 py-3 rounded-xl font-medium shadow-md
                     hover:from-blue-600 hover:to-indigo-700 
                     hover:shadow-xl hover:-translate-y-0.5 
                     transition-all duration-300"
        >
          See Details
        </button>
      </div>
    </div>
  );
};

export default BillCard;
