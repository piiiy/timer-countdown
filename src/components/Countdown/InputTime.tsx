import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { SliderTime } from "./SliderTime";

interface InputTimeProps {
    totalTime: (totalSec: number) => void;
    active: boolean;
    isReset: boolean;
    setIsReset: (isReset: boolean) => void;
}

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    width: 100%;
`;


export const InputTime: React.FC<InputTimeProps> = ({totalTime, active, isReset, setIsReset}) => {
    const [sec, setSec] = useState(0);
    const [min, setMin] = useState(0);

    const updateTime = (minutes:number, seconds:number) => {
        setSec(seconds);
        setMin(minutes);
        totalTime(minutes * 60 + seconds);
    }

    useEffect(() => {
        if (isReset === true) {
            setSec(0)
            setMin(0)
            totalTime(0)
            setIsReset(false)

        }
    }, [isReset])
    
    return (
        <InputContainer>
           <label> min <input 
           type="number"
           disabled={active}
           value={min}
           onChange={(e) => {
            const value = Math.min(720, Math.max(0, Number(e.target.value)))
            updateTime(value, sec)
           }}
           /></label>
           <label> sec <input 
           type="number"
           disabled={active}
           value={sec}
           onChange={(e) => {
            const value = Math.min(59, Math.max(0, Number(e.target.value)))
            updateTime(min, value);
           }}
           /></label>
           <SliderTime
           totalTime={totalTime}
           updateTime={updateTime}
           active={active} 
           />
        </InputContainer>
    );
};