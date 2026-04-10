import Swal from "sweetalert2";

export const confirmAction = async (options = {}) => {
    const {
        title = "Are you sure?",
        text = "You won't be able to revert this!",
        confirmText = "Yes, confirm",
    } = options;

    const result = await Swal.fire({
        title,
        text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: confirmText,
    });
    return result.isConfirmed;
};


export const successAction = async (text = "") => {
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Success",
        text,
        timer: 1500
    })
}


export const errorAction = async (text = "") => {
    Swal.fire({
        icon: "error",
        title: "Error",
        text
    })
}