import { useEffect, type RefObject } from "react";

/**
 * Custom React Hook for handling click events outside a specified element reference.
 * When a click event occurs outside the referenced element, the provided handler function is called.
 * 
 * @param {React.RefObject<T>} ref - The React ref object representing the element to monitor for outside clicks
 * @param {Function} handler - The callback function to be executed when a click outside the element occurs.
 * @returns {void}
 */
function useClickOutside<T extends HTMLElement = HTMLElement>(ref: RefObject<T>, handler: () => void ): void {
    useEffect(() => {
        const listener = (event: Event) => {
            const el = ref?.current;
            
            if (!el || el.contains((event?.target as Node) || null)) {
                return;
            }
      
            handler();
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
    
        return () => {
          document.removeEventListener('mousedown', listener);
          document.removeEventListener('touchstart', listener);
        };

    }, [ref, handler]);

}

export default useClickOutside;