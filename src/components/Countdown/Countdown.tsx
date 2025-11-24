import React, {useState, useEffect, useCallback} from "react";
import styled from "styled-components";
import { InputTime } from "./InputTime";
import { Progress } from "./Progress";

const CountdownContaier = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    gap: 10px;
    min-width: 300px;
    box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    font-family: 'Roboto', sans-serif;
`

const ContainerButton = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
`;

export const Countdown: React.FC = () => {
    const [initialTime, setInitialTime] = useState (0);
    const [remainingTime, setRemainingTime] = useState(0);
    const [active, setActive] = useState(false);
    const [isReset, setIsReset] = useState(false);
    

    const correctTime = (time: number) => {
        const min = String(Math.floor(time/60)).padStart(2, '0');
        const sec = String(Math.floor(time%60)).padStart(2, '0');
        return `${min}:${sec}`;
    }

    useEffect(() => {
        if (active === true) {
            const interval = setInterval(() => {
                setRemainingTime((t) => {
                    if (t === 0) {
                        clearInterval(interval);
                        setActive(false);
                        setInitialTime(0);
                        setIsReset(true);
                        return 0;
                    }

                    return t - 1;
                })
            }, 1000)

            return () => {
                clearInterval(interval);
            }
        }
    }, [active])



    useEffect(() => {
        if (initialTime > 0 && remainingTime === 0) {
            const bmwSound = new Audio ('/timer-countdown/sounds/bmw.mp3');
            bmwSound.play();
        }
    }, [initialTime, remainingTime])
   
   

    const handleChangeStart = () => {
        setActive(!active);
    };

    const handleChangeReset = () => {
        setInitialTime(0);
        setRemainingTime(0);
        setActive(false);
        setIsReset(true);
    };

    const buttonText = !active && initialTime === remainingTime ? 'START' : active ? 'PAUSE' : 'RESUME';

    const totalTime = useCallback((totalSec: number) => {
            setInitialTime(totalSec);
            setRemainingTime(totalSec);
    }, []);


    return (
        <CountdownContaier>
            <div>Countdown</div>
            <div>{correctTime(remainingTime)}</div>
            <InputTime
            totalTime={totalTime}
            active={active}
            isReset={isReset}
            setIsReset={setIsReset}
            />      
            <Progress
            initialTime={initialTime}
            remaningTime={remainingTime}
            />    
            <ContainerButton>
                <button
                disabled={initialTime === 0}
                onClick={handleChangeStart}
                >{buttonText}</button>
                <button
                onClick={handleChangeReset}
                >RESET</button>
            </ContainerButton>
        </CountdownContaier>
    );
}
