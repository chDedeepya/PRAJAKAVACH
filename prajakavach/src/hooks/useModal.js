import { useState } from "react";

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  function openModal(item) {
    setSelectedItem(item);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setSelectedItem(null);
  }

  return {
    isOpen,
    selectedItem,
    openModal,
    closeModal,
  };
}
