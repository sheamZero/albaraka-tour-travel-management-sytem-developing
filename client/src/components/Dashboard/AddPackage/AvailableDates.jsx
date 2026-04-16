import { Calendar } from "lucide-react";
import { format, isAfter } from "date-fns";

const AvailableDates = ({ register, watch, setValue, errors }) => {

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const handleStartChange = (e) => {
    const value = e.target.value;
    if (value) {
      const formatted = format(new Date(value), "yyyy-MM-dd");
      setValue("startDate", formatted);
    }
  };

  const handleEndChange = (e) => {
    const value = e.target.value;

    if (value) {
      const formatted = format(new Date(value), "yyyy-MM-dd");

      if (startDate && isAfter(new Date(startDate), new Date(formatted))) {
        alert("End date must be after start date");
        return;
      }

      setValue("endDate", formatted);
    }
  };

  return (
    <div className="mt-10">

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-primary/5 to-transparent border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Available Date Range
          </h3>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Start Date */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Start Date
            </label>

            <input
              type="date"
              {...register("startDate", {
                required: "Start date is required",
              })}
              value={startDate || ""}
              onChange={handleStartChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />

            {errors?.startDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.startDate.message}
              </p>
            )}
          </div>

          {/* End Date */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              End Date
            </label>

            <input
              type="date"
              {...register("endDate", {
                required: "End date is required",
              })}
              value={endDate || ""}
              onChange={handleEndChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />

            {errors?.endDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.endDate.message}
              </p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

export default AvailableDates;