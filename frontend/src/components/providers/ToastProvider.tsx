import type { ReactNode } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}

      <ToastContainer
        position="bottom-right"
        autoClose={3500}
        closeOnClick={false}
        pauseOnHover
        pauseOnFocusLoss
        newestOnTop
        draggable
        stacked
        theme="light"
        transition={Bounce}
        toastClassName={() =>
          [
            "group rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-xl",
            "dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100",
            "min-h-0 p-0 overflow-hidden",
          ].join(" ")
        }
        className={() => "m-0 p-0"}
        progressClassName={() => "bg-blue-500 dark:bg-blue-400"}
      />
    </>
  );
}
