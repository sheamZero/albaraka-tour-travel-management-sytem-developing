import { Link } from "react-router-dom";
import { XCircle, RotateCcw } from "lucide-react";

const FailedPayment = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 to-white px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">

        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-4 rounded-full">
            <XCircle className="text-red-600 w-10 h-10" />
          </div>
        </div>

        <h1 className="text-2xl flex items-center justify-center gap-2 font-bold text-gray-800">
          Payment Failed
          <XCircle className="text-red-500 w-5 h-5" />
        </h1>

        <p className="mt-3 text-gray-600 text-sm leading-relaxed">
          Something went wrong while processing your payment.
          Please try again or use a different payment method.
        </p>

        <div className="mt-6 flex flex-col gap-3">

          <Link
            to="/dashboard/user/my-bookings"
            className="flex items-center justify-center gap-2 bg-red-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-red-700 transition"
          >
            Try Again
            <RotateCcw size={16} />
          </Link>

          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-gray-700 transition"
          >
            Back to Home
          </Link>
        </div>

        <div className="mt-6 text-xs text-gray-400">
          If any amount was deducted, it will be refunded automatically.
        </div>

      </div>
    </div>
  );
};

export default FailedPayment;