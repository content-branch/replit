import { useState } from "react";

export default function useModal() {
  const [isOpen, setisOpen] = useState(false);

  const toggleModal = () => {
    setisOpen(!isOpen);
  };

  return {
    isOpen,
    toggleModal
  };
}