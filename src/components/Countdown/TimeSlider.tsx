import React from "react";

interface TimerSliderProps {
    value: number;
    onChange: (value: number) => void;
    disabled: boolean;
    
}

export const TimerSlider = ({ value, onChange, disabled }: TimerSliderProps) => {
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
};