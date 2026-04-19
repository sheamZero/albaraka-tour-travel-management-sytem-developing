import { useForm } from "react-hook-form";
import BasicInfo from "../../../../components/Dashboard/AddPackage/BasicInfo";
import IncludedExcluded from "../../../../components/Dashboard/AddPackage/IncludedExcluded";
import ItineraryCard from "../../../../components/Dashboard/AddPackage/ItineraryCard";
import AvailableDates from "../../../../components/Dashboard/AddPackage/AvailableDates";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { uploadImage } from "../../../../utils/imageUpload";
import { successAction } from "../../../../utils/swal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddPackage = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [isAddingPckg, setIsAddingPckg] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      included: [{ value: "" }],
      excluded: [{ value: "" }],
      itinerary: [
        {
          day: 1,
          title: "",
          description: "",
        },
      ],
      startDate: "",
      endDate: "",
    },
  });

  const onSubmit = async (data) => {
    setIsAddingPckg(true);
    console.log("Form Data:", data);
    const imageFile = data.image[0];

    const imageUrl = await uploadImage(imageFile);

    const packageData = {
      ...data,
      image: imageUrl,
      included: data.included.map(i => i.value),
      excluded: data.excluded.map(e => e.value)
    };

    console.log("final data ", packageData);

    const response = await axiosSecure.post("/package", packageData)
    console.log("package data response", response);
    if (response.data?.insertedId) {
      setIsAddingPckg(false)
      reset();
      successAction("Package Upload Successfully!")
      navigate("/packages");
    }
  };

  return (
    <div className="max-w-7xl py-6 px-6 lg:px-20">
      <div className="space-y-2">
        <h2 className="text-5xl font-semibold text-secondary">Add a New Package</h2>
        <p className="text-text text-xl">Create an exciting travel package for your customers</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>

        <BasicInfo
          register={register}
          watch={watch}
          setValue={setValue}
          errors={errors}
        />

        <IncludedExcluded
          register={register}
          control={control}
          errors={errors}
        />


        <ItineraryCard
          register={register}
          control={control}
          errors={errors}
        />

        <AvailableDates
          register={register}
          watch={watch}
          setValue={setValue}
          errors={errors}
        />

        <div className="sticky bottom-0 bg-white border-t border-gray-200 mt-4 p-4 shadow-lg">
          <div className="max-w-5xl mx-auto flex justify-end gap-3">

            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isAddingPckg}
              className="px-6 py-2 bg-primary text-white rounded-lg flex items-center gap-2 disabled:opacity-50"
            >
              {/* {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Adding...
                </>
              ) : */}

              {isAddingPckg ? "Adding..." : "Add Package"}

            </button>

          </div>
        </div>

      </form>
    </div>
  );
};

export default AddPackage;