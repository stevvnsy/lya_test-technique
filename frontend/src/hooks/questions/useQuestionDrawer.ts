import { useState } from "react";

export function useQuestionDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [initialCategoryId, setInitialCategoryId] = useState<number | "">("");

  const open = (categoryId?: number | "") => {
    setInitialCategoryId(categoryId ?? "");
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    initialCategoryId,
    open,
    close,
  };
}
