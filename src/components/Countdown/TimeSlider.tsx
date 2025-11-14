import React from "react";

interface TimerSliderProps {
    value: number;
    onChange: (value: number) => void;
    disabled: boolean;
    
}

export const TimerSlider: React.FC<TimerSliderProps> = React.memo(({ value, onChange, disabled }) => {
    return (
        <input
            type="range"
            min={0}
            max={7200}
            step={15}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            disabled={disabled} 
        />
    );
});