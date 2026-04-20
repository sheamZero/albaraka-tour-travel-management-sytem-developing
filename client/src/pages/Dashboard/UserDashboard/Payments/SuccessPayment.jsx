import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, PartyPopper } from "lucide-react";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-white px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">


        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="text-green-600 w-10 h-10" />
          </div>
        </div>


        <h1 className="text-2xl flex items-center gap-2 justify-center font-bold text-gray-800">
          Payment Successful <PartyPopper className="text-yellow-500"/>
        </h1>

    
        <p className="mt-3 text-gray-600 text-sm leading-relaxed">
          Your booking has been successfully confirmed.  
          You can now view your booking details or continue exploring more tours.
        </p>

     
        <div className="mt-6 flex flex-col gap-3">

          <Link
            to="/dashboard/user/my-bookings"
            className="flex items-center justify-center gap-2 bg-green-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-green-700 transition"
          >
            Go to My Bookings
            <ArrowRight size={16} />
          </Link>

          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-gray-700 transition"
          >
            Continue Browsing
          </Link>
        </div>

        <div className="mt-6 text-xs text-gray-400">
          A confirmation has been processed successfully.
        </div>

      </div>
    </div>
  );
}