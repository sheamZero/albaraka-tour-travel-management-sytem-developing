import React, { useMemo, useState } from 'react';
import { useGetSpecificUserPayment } from '../../../../hooks/usePayment';
import PaymentDetailModal from '../../../../components/Modals/PaymentDetailModal';
import { Eye } from 'lucide-react';

const PaymentHistory = () => {
    const { data, isLoading } = useGetSpecificUserPayment();
    const payments = data?.data || [];

    const [selectedPayment, setSelectedPayment] = useState(null);

    const formattedPayments = useMemo(() => {
        return payments.map((p, index) => ({
            ...p,
            index: index + 1,
            formattedAmount: `${p.currency || 'BDT'} ${parseFloat(p.amount || 0).toFixed(2)}`,
        }));
    }, [payments]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="px-4 lg:px-10 py-6">

            {/* HEADER */}
            <div className="bg-primary/10 text-secondary p-5 rounded-xl shadow text-left">
                <h2 className="text-xl font-bold">Payment History</h2>
                <p className="text-sm opacity-80 mt-1">
                    Total Transactions: {payments.length}
                </p>
            </div>

            {/* TABLE */}
            <div className="block mt-6 bg-secondary overflow-x-auto text-white rounded-xl shadow overflow-hidden">

                <table className="w-full text-sm">

                    <thead>
                        <tr className="text-left">
                            <th className="p-4">#</th>
                            <th className="p-4">Title</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Method</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white">

                        {formattedPayments.map((p) => (
                            <tr key={p._id} className="border-t hover:bg-secondary/10">

                                {/* INDEX COLUMN */}
                                <td className="p-4 font-semibold text-text">
                                    {p.index}
                                </td>

                                {/* TITLE */}
                                <td className="p-4 text-text">
                                    {p.title || 'N/A'}
                                </td>

                                {/* AMOUNT */}
                                <td className="p-4 font-semibold text-primary">
                                    {p.formattedAmount || 'N/A'}
                                </td>

                                {/* STATUS */}
                                <td className="p-4">
                                    <span
                                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border
                                        ${
                                            p.status === "paid"
                                                ? "bg-green-50 text-green-700 border-green-200"
                                                : p.status === "pending"
                                                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                                : p.status === "failed"
                                                ? "bg-red-50 text-red-700 border-red-200"
                                                : "bg-gray-50 text-gray-600 border-gray-200"
                                        }`}
                                    >
                                        {p.status?.toUpperCase() || 'N/A'}
                                    </span>
                                </td>

                                {/* METHOD */}
                                <td className="p-4 text-text">
                                    {p.card_brand || 'N/A'}
                                </td>

                                {/* ACTION */}
                                <td className="p-4">
                                    <button
                                        onClick={() => setSelectedPayment(p)}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary/90 transition shadow-sm"
                                    >
                                        <Eye size={14} />
                                        View
                                    </button>
                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>
            </div>

            {/* MODAL */}
            <PaymentDetailModal
                open={!!selectedPayment}
                onClose={() => setSelectedPayment(null)}
                payment={selectedPayment}
            />

        </div>
    );
};

export default PaymentHistory;