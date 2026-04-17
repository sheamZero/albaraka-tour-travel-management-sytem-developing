import Rating from "../../Shared/Rating"

const CustomerReviews = ({ reviews = [] }) => {

    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>

            <div className="space-y-4">
                {
                    reviews?.map((review) => (
                        <div key={review._id} className="p-4 border border-primary rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="font-semibold">{review?.userName}</p>
                                    <Rating initialRating={review?.rating}></Rating>
                                </div>
                                <span className="text-sm text-gray-500">{review?.date}</span>
                            </div>

                            <p className="text-gray-600 text-sm">{review?.review}</p>
                        </div>
                    ))
                }
            </div>
        </div>

    )
}

export default CustomerReviews