import React from "react";
import { useEffect } from "react";

export const useClickOutside= (ref: React.RefObject<HTMLElement | null>, onClickOutside: () => void) =>{
  useEffect(() => {
    /**
     * Invoke Function onClick outside of element
     */
    function handleClickOutside(event:MouseEvent) {
      if (event && event.target && ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    }
    // Bind
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // dispose
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
}