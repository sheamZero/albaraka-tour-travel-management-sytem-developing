import { Calendar, MapPin, Users, CreditCard, Clock, ChevronRight, DollarSign } from "lucide-react";
import { format } from "date-fns";
import getDuration from "../../../utils/getTourDuration";
import { useNavigate } from "react-router-dom";

const BookingCard = ({ booking, handleRateUs, handlePay }) => {
  const navigate = useNavigate();
  // console.log("booking in card", booking)
  // Format dates for better display
  const formatDate = (dateString) => {
    if (!dateString) return "TBD";
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  // Get status styles
  const getStatusStyles = (status) => {
    const styles = {
      pending: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
      confirmed: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
      cancelled: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
      completed: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
    };
    return styles[status] || styles.pending;
  };

  // Get payment status styles
  const getPaymentStyles = (paymentStatus) => {
    return paymentStatus === "paid"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : "bg-rose-50 text-rose-700 border-rose-200";
  };

  const statusStyle = getStatusStyles(booking.status);
  const paymentStyle = getPaymentStyles(booking.paymentStatus);

  // Calculate duration in days
  const duration = getDuration(booking.startDate, booking.endDate)


  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary/20">

      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden h-52">
        <img
          src={booking.image}
          alt={booking.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-secondary/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full capitalize">
            {booking.category}
          </span>
        </div>

        {/* Price Badge */}
        {/* <div className="absolute bottom-3 right-3 bg-linear-to-r from-primary to-primary/80 text-white px-3 py-1.5 rounded-lg shadow-lg">
          <span className="text-xs font-medium">${booking.totalPrice}</span>
          <span className="text-[10px] opacity-90 ml-1">total</span>
        </div> */}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title & Location */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-secondary line-clamp-1 mb-1">
            {booking.title}
          </h3>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <MapPin className="w-3.5 h-3.5" />
            <span className="line-clamp-1">{booking.location}</span>
          </div>
        </div>

        {/* Key Info Grid */}
        <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-100">
          {/* duration */}
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-primary" />
            <p>{duration}</p>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <DollarSign className="w-4 h-4 text-primary" />
            <p>{booking.totalPrice}</p>
          </div>

          {/* People */}
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-primary" />
            <p className="text-sm font-medium text-gray-700">
              {booking.numberOfPeople} {booking.numberOfPeople === 1 ? 'person' : 'people'}
            </p>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex gap-2 mb-3">
          {/* Booking Status */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
            <span className="capitalize">{booking.status}</span>
          </div>

          {/* Payment Status */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${paymentStyle}`}>
            <CreditCard className="w-3 h-3" />
            <span className="capitalize">{booking.paymentStatus}</span>
          </div>
        </div>

        {/* Inclusions Preview */}
        {
          booking.included && booking.included.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-600 mb-1">Includes:</p>
              <div className="flex flex-wrap gap-1.5">
                {booking.included.slice(0, 2).map((item, idx) => (
                  <span key={idx} className="text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded-full">
                    {item}
                  </span>
                ))}
                {booking.included.length > 2 && (
                  <span className="text-xs text-primary font-medium">
                    +{booking.included.length - 2} more
                  </span>
                )}
              </div>
            </div>
          )
        }

        {/* Action Buttons */}
        <div className="flex gap-4">

          <button
            onClick={() => navigate(`/packageDetails/${booking.packageId}`)}
            className="flex-1 bg-gray-50 border border-primary hover:bg-primary hover:text-white text-gray-700 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1 group/btn">
            <span>View Details</span>
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>

          {
            booking.paymentStatus === "unpaid" ? (
              <button
                onClick={() => handlePay(booking)}
                className="flex-1 bg-primary text-white py-2.5 rounded-xl text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Pay ${booking.totalPrice}
              </button>
            ) : (
              <button
  disabled={booking.status !== "completed"}
  onClick={() => handleRateUs(booking)}
  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 shadow-md
    ${booking.status !== "completed"
      ? "bg-primary/50 cursor-not-allowed"
      : "bg-primary text-white hover:shadow-lg"
    }`}
>
  Rate Us
</button>
            )
          }
        </div>

        {/* Booking Reference (optional) */}
        {booking.bookingDate && (
          <div className="mt-2 pt-2 border-t border-gray-50">
            <p className="text-[11px] text-gray-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Booked on: {formatDate(booking.bookingDate)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCard;