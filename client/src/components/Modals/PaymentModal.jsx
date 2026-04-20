import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const PaymentModal = ({ open, setOpen, booking, handlePaymentConfirm }) => {
  const [method, setMethod] = useState("sslcommerz");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[420px] p-6">

        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
          <DialogDescription>
            Review your booking details and choose a payment method to proceed.
          </DialogDescription>
        </DialogHeader>

        {/* Content */}
        <div className="space-y-4 mt-2">
          <div className="text-sm">
            Package: <strong>{booking?.title}</strong>
          </div>

          <div className="text-sm">
            Amount: <strong>${booking?.totalPrice}</strong>
          </div>

          {/* Payment Method */}
          <div>
            <p className="text-sm font-medium mb-2">
              Select Payment Method
            </p>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="sslcommerz"
                checked={method === "sslcommerz"}
                onChange={(e) => setMethod(e.target.value)}
              />
              SSLCommerz
            </label>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            onClick={() => handlePaymentConfirm(method)}
          >
            Pay Now
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;