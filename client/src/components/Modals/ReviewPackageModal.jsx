import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useAddRateAndReview } from "../../hooks/useReview";
import Swal from "sweetalert2";

const ReviewPackageModal = ({ open, setOpen, booking }) => {
    const { mutate: addReview, isPending } = useAddRateAndReview();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [review, setReview] = useState("");

    useEffect(() => {
        if (!open) return;
        setRating(0);
        setReview("");
        setHover(0);
    }, [open]);

    const handleSubmit = () => {
        const reviewData = {
            bookingId: booking?._id,
            packageId: booking?.packageId,

            title: booking?.title,
            location: booking?.location,

            rating,
            review,
            date: new Date().toISOString(),
        };

        console.log("FINAL REVIEW DATA 👉", reviewData);

        addReview(reviewData, {
            onSuccess: (data) => {
                console.log("Review added:", data);
                Swal.fire("Success!", "Review submitted!", "success");
                setRating(0);
                setReview("");
                setHover(0);

                setOpen(false);
            },

            onError: (error) => {
                console.error("Review failed:", error);
                Swal.fire("Error!", "Failed to submit review", "error");
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Rate Your Experience</DialogTitle>
                    <DialogDescription>
                        Share your experience about this package.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-3">
                    <label className="font-medium">Rating</label>

                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <div
                                key={star}
                                className="relative cursor-pointer"
                                onMouseLeave={() => setHover(0)}
                            >
                                <button
                                    type="button"
                                    className="absolute left-0 top-0 w-1/2 h-full z-10"
                                    onClick={() => setRating(star - 0.5)}
                                    onMouseEnter={() => setHover(star - 0.5)}
                                />

                                <button
                                    type="button"
                                    className="absolute right-0 top-0 w-1/2 h-full z-10"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHover(star)}
                                />

                                {/* STAR UI */}
                                <Star
                                    className={`w-8 h-8 transition ${(hover || rating) >= star
                                        ? "text-yellow-400 fill-yellow-400 scale-110"
                                        : (hover || rating) >= star - 0.5
                                            ? "text-yellow-400 fill-yellow-200"
                                            : "text-gray-300"
                                        }`}
                                />
                            </div>
                        ))}
                    </div>

                    <p className="text-sm text-gray-500">
                        Selected Rating: {hover || rating}
                    </p>
                </div>

                {/* ✍️ Review */}
                <div className="space-y-2 mt-4">
                    <label className="font-medium">Your Review</label>
                    <textarea
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={4}
                        placeholder="Write your experience..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                </div>

                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        disabled={isPending || !rating || !review}
                        onClick={handleSubmit}
                    >
                        Submit Review
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ReviewPackageModal;