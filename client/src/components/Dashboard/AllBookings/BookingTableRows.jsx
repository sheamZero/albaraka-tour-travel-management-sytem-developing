import { Check, X, Trash2, User, MapPin, CalendarDays, CreditCard, CheckCheck, } from "lucide-react";

const BookingTableRows = ({
    item,
    index,
    handleApproveBooking,
    handleRejectBooking,
    handleDeleteBooking,
    handleCompleteBooking,
    isDeletePending,
    isUpdatingStatus
}) => {

    const { paymentStatus, status } = item;

    return (
        <tr className="hover:bg-primary/5 transition">

            {/* index */}
            <td className="p-4 text-secondary/70">
                {index + 1}
            </td>

            {/* user */}
            <td className="p-4">
                <div className="flex items-center gap-2">
                    <User size={16} className="text-primary" />
                    <div>
                        <p className="font-medium text-secondary">
                            {item.userName}
                        </p>
                        <p className="text-xs text-secondary/60">
                            {item.userEmail}
                        </p>
                    </div>
                </div>
            </td>

            {/* package */}
            <td className="p-4">
                <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-primary" />
                    <div>
                        <p className="font-medium text-secondary">
                            {item.title}
                        </p>
                        <p className="text-xs text-secondary/60">
                            {item.location}
                        </p>
                    </div>
                </div>
            </td>

            {/* dates */}
            <td className="p-4">
                <div className="flex items-center gap-2 text-secondary/70">
                    <CalendarDays size={16} className="text-primary" />
                    <div>
                        <p>{item.startDate}</p>
                        <p className="text-xs text-secondary/50">
                            {item.endDate}
                        </p>
                    </div>
                </div>
            </td>

            {/* price */}
            <td className="p-4 font-semibold text-primary">
                ${item.totalPrice}
            </td>

            {/* payment */}
            <td className="p-4">
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${item.paymentStatus === "paid"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                        }`}
                >
                    <CreditCard size={12} />
                    {item.paymentStatus}
                </span>
            </td>

            {/* status */}
            <td className="p-4">
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === "approved"
                        ? "bg-primary/10 text-primary"
                        : item.status === "rejected"
                            ? "bg-red-100 text-red-600"
                            : "bg-secondary/10 text-secondary"
                        }`}
                >
                    {item.status}
                </span>
            </td>

            {/* actions */}
            <td className="p-4">
                <div className="flex justify-center gap-2">

                    {/* COMPLETE (only when paid + approved) */}
                    {
                        paymentStatus === "paid" && (status === "approved" || "completed") ? (
                            <button
                                onClick={() => handleCompleteBooking(item._id)}
                                title="Complete"
                                disabled={isUpdatingStatus}
                                className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition disabled:opacity-50"
                            >
                                <CheckCheck size={16} />
                            </button>
                        ) : (
                            <>
                                {/* Approve */}
                                <button
                                    onClick={() => handleApproveBooking(item._id)}
                                    title="Approve"
                                    disabled={isUpdatingStatus}
                                    className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition disabled:opacity-50"
                                >
                                    <Check size={16} />
                                </button>

                                {/* Reject */}
                                <button
                                    onClick={() => handleRejectBooking(item._id)}
                                    title="Reject"
                                    disabled={isUpdatingStatus}
                                    className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition disabled:opacity-50"
                                >
                                    <X size={16} />
                                </button>
                            </>
                        )
                    }

                    {/* DELETE (always visible) */}
                    <button
                        onClick={() => handleDeleteBooking(item._id)}
                        disabled={isDeletePending}
                        title="Delete"
                        className="p-2 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary hover:text-white transition disabled:opacity-50"
                    >
                        <Trash2 size={16} />
                    </button>

                </div>
            </td>
        </tr >
    );
};

export default BookingTableRows;