import React, {useEffect, useState, useCallback, useMemo} from "react";
import styled from "styled-components";
import { TimeInput } from "./TimeInput";
import { ProgressBar } from "./ProgressBar";

const ContainerCountdown = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    gap: 10px;
    min-width: 300px;
    box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    font-family: 'Roboto', sans-serif;
`;

const ContainerButton = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
`;

export const Countdown = React.memo(() => {
    const [initialTime, setInitialTime] = useState(300);
    const [remainingTime, setRemaingTime] = useState(300);
    const [isActive, setIsActive] = useState(false);
    
    const FormattedTime = useMemo((): string => {
       const minute = Math.floor(remainingTime / 60);
        const seconds = Math.floor(remainingTime % 60);
        const formattedMinute = String(minute).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        return `${formattedMinute}:${formattedSeconds}`;
    }, [remainingTime]);


    useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
        interval = setInterval(() => {
            setRemaingTime(prevTime => {
                if (prevTime <= 0) {
                    setIsActive(false);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    }

    return () => {
        if (interval) {
            clearInterval(interval);
        }
    };
    }, [isActive]);

    useEffect(() => {
        if (remainingTime === 0 && initialTime > 0) {
            const audio = new Audio('/sounds/poezd.mp3');
            audio.play();
        }
    }, [remainingTime, initialTime]);


    const handleStartPause = useCallback(() => {
        setIsActive(!isActive);
    }, [isActive]);

    const handleReset = useCallback(() => {
        setIsActive(false);
        setRemaingTime(initialTime);
    }, [initialTime]);

    const buttonText = !isActive && remainingTime === initialTime ? 'START' : 
                   isActive ? 'PAUSE' : 'RESUME';

    const handleTimeChange = (totalSeconds: number) => {
        setInitialTime(totalSeconds);
        setRemaingTime(totalSeconds);
    };
    

    return (
        <ContainerCountdown>
            <h1>Countdown</h1>
            <TimeInput
             onTimeChange={handleTimeChange}
             isActive={isActive}/>
            <div>{FormattedTime}</div>
            <ProgressBar 
                currentTime={remainingTime}
                initialTime={initialTime}
            />
            <ContainerButton>
                <button onClick={handleStartPause}>{buttonText}</button>
                <button onClick={handleReset}>RESET</button>
            </ContainerButton>

        </ContainerCountdown>
    );
    
});