import { useState } from 'react';

/**
 * Custom React Hook for managing toggleable states, ideal for controlling
 * visibility of components such as modals, popups, tooltips, and more.
 * 
 * @param {boolean} [defaultValue=false] - The initial state value for the toggle.
 * @returns {[boolean, function]} A tuple containing the current boolean state,
 * and a function to toggle the state.
 */
const useToggle = (defaultValue?: boolean): [boolean, (v?:boolean) => void ] => {
    const [value, setValue] = useState<boolean>(!!defaultValue);

    const toggleValue = (value?: boolean) => {
        setValue(currentValue => typeof value === 'boolean' ? value: !currentValue);
    };

    return [value, toggleValue];
};

export default useToggle;
