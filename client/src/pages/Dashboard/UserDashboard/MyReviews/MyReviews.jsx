import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Star } from "lucide-react";

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: reviews = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/my-reviews");
      return data;
    },
  });

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    return (
      <div className="flex items-center gap-1 text-yellow-500">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={i} size={16} fill="currentColor" />
        ))}

        {hasHalf && (
          <Star size={16} className="opacity-50" fill="currentColor" />
        )}

        <span className="text-xs text-gray-600 ml-1">
          ({rating})
        </span>
      </div>
    );
  };


  if (isLoading) return <p className="px-4 py-6 text-text">Loading...</p>;

  if (isError) {
    return (
      <p className="text-red-500 px-4 py-6">
        Failed to load reviews: {error.message}
      </p>
    );
  }

  return (
    <section className="px-4 lg:px-10 py-6">
      {/* Header */}
      <div className="bg-primary/10 p-6 rounded-2xl shadow-sm border mb-6">
        <h2 className="text-2xl font-semibold text-secondary">
          My Reviews
        </h2>
        <p className="text-sm text-text">
          Total Reviews: {reviews.length}
        </p>
      </div>

      {/* Empty state */}
      {reviews.length === 0 ? (
        <div className="text-center py-10 text-text">
          You haven't written any reviews yet.
        </div>
      ) : (
        <div className="grid gap-5">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border border-secondary/20 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition"
            >
              {/* Top section */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={review.userImage}
                    alt={review.userName}
                    className="w-11 h-11 rounded-full object-cover border border-secondary/30"
                  />

                  <div>
                    <h3 className="font-semibold text-secondary">
                      {review.userName}
                    </h3>
                    <p className="text-sm text-text">
                      {review.title}
                    </p>
                  </div>
                </div>

                {/* Date badge */}
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                  {review.date?.split("T")[0]}
                </span>
              </div>

              {/* Review text */}
              <p className="mt-4 text-text leading-relaxed">
                {review.review}
              </p>

              {/* Bottom section */}
              <div className="mt-4 flex items-center justify-between">
                {renderStars(review.rating)}

                <span className="text-xs text-text">
                  Package: {review.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyReviews;