import { Link } from "react-router-dom";
import { AlertCircle, ArrowLeft } from "lucide-react";

const CancelPayment = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-yellow-50 to-white px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">

        <div className="flex justify-center mb-4">
          <div className="bg-yellow-100 p-4 rounded-full">
            <AlertCircle className="text-yellow-600 w-10 h-10" />
          </div>
        </div>

        <h1 className="text-2xl flex items-center justify-center gap-2 font-bold text-gray-800">
          Payment Cancelled
          <AlertCircle className="text-yellow-500 w-5 h-5" />
        </h1>
        <p className="mt-3 text-gray-600 text-sm leading-relaxed">
          You have cancelled the payment process.  
          No charges were made to your account.
        </p>

        <div className="mt-6 flex flex-col gap-3">

          <Link
            to="/dashboard/user/my-bookings"
            className="flex items-center justify-center gap-2 bg-yellow-500 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-yellow-600 transition"
          >
            Back to Bookings
            <ArrowLeft size={16} />
          </Link>

          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-gray-700 transition"
          >
            Continue Browsing
          </Link>
        </div>

        <div className="mt-6 text-xs text-gray-400">
          You can retry the payment anytime from your bookings page.
        </div>

      </div>
    </div>
  );
};

export default CancelPayment;