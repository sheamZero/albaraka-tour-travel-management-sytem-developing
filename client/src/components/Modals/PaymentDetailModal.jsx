import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { BadgeCheck } from "lucide-react";

const PaymentDetailModal = ({ open, onClose, payment }) => {
    if (!payment) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg p-8 rounded-2xl text-text">

                {/* HEADER */}
                <DialogHeader className="text-center space-y-2">

                    <div className="flex justify-center">
                        <div className="bg-primary/10 p-3 rounded-full">
                            <BadgeCheck className="text-primary w-7 h-7" />
                        </div>
                    </div>

                    <DialogTitle className="text-xl font-bold text-primary">
                        Payment Details
                    </DialogTitle>

                    <p className="text-sm text-gray-500">
                        Full transaction information for your booking payment
                    </p>

                </DialogHeader>

                {/* CONTENT */}
                <div className="mt-6 space-y-4 text-sm">

                    <DetailItem label="Title" value={payment.title} />
                    <DetailItem label="Transaction ID" value={payment.tran_id} />
                    <DetailItem label="Amount" value={`${payment.currency || 'BDT'} ${payment.amount}`} />
                    <DetailItem label="Status" value={payment.status} />
                    <DetailItem label="Card Brand" value={payment.card_brand} />
                    <DetailItem label="Issuer" value={payment.card_issuer} />
                    <DetailItem label="Country" value={payment.card_issuer_country} />
                    <DetailItem
                        label="Paid At"
                        value={new Date(payment.paidAt || payment.createdAt).toLocaleString()}
                    />
                    <DetailItem label="Booking ID" value={payment.bookingId} />
                    <DetailItem label="User Email" value={payment.userEmail} />
                    <DetailItem label="User Name" value={payment.userName} />

                </div>

            </DialogContent>
        </Dialog>
    );
};

// reusable item UI
const DetailItem = ({ label, value }) => (
    <div className="flex justify-between items-start gap-4  border-b border-gray-100">

        <span className="text-gray-500 text-xs uppercase tracking-wide">
            {label}
        </span>

        <span className="font-medium text-gray-800 text-right break-all max-w-[60%]">
            {value || 'N/A'}
        </span>

    </div>
);

export default PaymentDetailModal;