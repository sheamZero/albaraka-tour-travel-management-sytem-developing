import { Star } from "lucide-react"

const Rating = ({ initialRating = 0 }) => {
    const rating = Math.round(initialRating);

    return (
        <div className="flex items-center gap-1">
            {[...Array(5)].map((_, idx) => (
                <Star
                    key={idx}
                    className={`w-4 h-4 ${idx < rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }`}
                />
            ))}
        </div>
    )
}

export default Rating