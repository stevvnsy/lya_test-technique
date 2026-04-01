import type { ReactNode } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastProviderProps {
  children: ReactNode;
}

const contextClass = {
  success:
    "border border-emerald-200 bg-white text-slate-900 dark:border-emerald-900 dark:bg-slate-900 dark:text-slate-100",
  error:
    "border border-red-200 bg-white text-slate-900 dark:border-red-900 dark:bg-slate-900 dark:text-slate-100",
  info: "border border-blue-200 bg-white text-slate-900 dark:border-blue-900 dark:bg-slate-900 dark:text-slate-100",
  warning:
    "border border-orange-200 bg-white text-slate-900 dark:border-orange-900 dark:bg-slate-900 dark:text-slate-100",
  default:
    "border border-slate-200 bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100",
  dark: "border border-slate-200 bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100",
};

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}

      <ToastContainer
        position="bottom-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        style={{ zIndex: 9999 }}
        toastClassName={(context) =>
          [
            contextClass[context?.type || "default"],
            "relative flex min-h-10 min-w-[280px] max-w-[420px] cursor-pointer justify-between rounded-xl p-3 shadow-lg",
          ].join(" ")
        }
      />
    </>
  );
}
