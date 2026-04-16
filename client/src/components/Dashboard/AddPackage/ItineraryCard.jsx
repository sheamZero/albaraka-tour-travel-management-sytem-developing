import { useFieldArray } from "react-hook-form";
import { Plus, Trash2, Calendar } from "lucide-react";

const ItineraryCard = ({ register, control, errors }) => {

  const { fields, append, remove } = useFieldArray({
    control,
    name: "itinerary",
  });

  const addDay = () => {
    append({
      day: fields.length + 1,
      title: "",
      description: "",
    });
  };

  return (
    <div className="mt-10">

      {/* Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

        {/* Header */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Trip Itinerary
          </h3>
        </div>

        <div className="p-6 space-y-5">

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition"
            >

              {/* Day Header */}
              <div className="flex justify-between items-center mb-3">

                <h4 className="font-semibold text-green-600">
                  Day {index + 1}
                </h4>

                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

              </div>

              {/* Title */}
              <input
                {...register(`itinerary.${index}.title`, {
                  required: "Title is required",
                })}
                placeholder="Day title (e.g., Arrival & Welcome)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-primary focus:border-transparent"
              />

              {errors?.itinerary?.[index]?.title && (
                <p className="text-red-500 text-sm mb-2">
                  {errors.itinerary[index].title.message}
                </p>
              )}

              {/* Description */}
              <textarea
                {...register(`itinerary.${index}.description`, {
                  required: "Description is required",
                })}
                placeholder="Day description and activities..."
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />

              {errors?.itinerary?.[index]?.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.itinerary[index].description.message}
                </p>
              )}

            </div>
          ))}

          {/* Add Day Button */}
          <button
            type="button"
            onClick={addDay}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-green-600 hover:border-green-600 hover:bg-green-50 transition flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Another Day
          </button>

        </div>

      </div>

    </div>
  );
};

export default ItineraryCard;