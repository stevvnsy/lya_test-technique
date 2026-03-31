import { type Id, toast, type ToastOptions } from "react-toastify";

const baseOptions: ToastOptions = {
  closeOnClick: false,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
};

export const appToast = {
  success(message: string, options?: ToastOptions) {
    return toast.success(message, {
      ...baseOptions,
      ...options,
    });
  },

  error(message: string, options?: ToastOptions) {
    return toast.error(message, {
      ...baseOptions,
      autoClose: 5000,
      ...options,
    });
  },

  info(message: string, options?: ToastOptions) {
    return toast.info(message, {
      ...baseOptions,
      ...options,
    });
  },

  loading(message: string, options?: ToastOptions): Id {
    return toast.loading(message, {
      ...baseOptions,
      closeOnClick: false,
      ...options,
    });
  },

  updateSuccess(toastId: Id, message: string, options?: ToastOptions) {
    toast.update(toastId, {
      render: message,
      type: "success",
      isLoading: false,
      autoClose: 3000,
      ...options,
    });
  },

  updateError(toastId: Id, message: string, options?: ToastOptions) {
    toast.update(toastId, {
      render: message,
      type: "error",
      isLoading: false,
      autoClose: 5000,
      ...options,
    });
  },
};
