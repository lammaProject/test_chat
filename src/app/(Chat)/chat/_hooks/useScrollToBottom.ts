import { useEffect, useRef } from "react";

const useScrollToBottom = (dependencies: any[]) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, dependencies);

  return elementRef;
};

export default useScrollToBottom;
