import React from "react";

interface SliderTimeProps {
    totalTime: (sec: number) => void;
    updateTime: (min:number, sec: number) => void;
    active: boolean;
}

export const SliderTime: React.FC<SliderTimeProps> = ({totalTime, updateTime, active}) => {
    return (
        <input
        type="range"
        disabled={active}
        min={0}
        max={3600}
        step={15}
        onChange={(e) => {
            const value = Number(e.target.value);
            totalTime(value);
            updateTime(Math.floor(value/60), value%60)
        }}
        />
    );
}