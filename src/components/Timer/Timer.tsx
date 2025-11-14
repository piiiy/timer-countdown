import React, {useCallback, useState, useEffect, useMemo} from 'react';
import styled from 'styled-components';


const TimerContainer = styled.div`
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


const TimerContainerButton = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
`;


export const Timer = React.memo( () => {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const formattedTime = useMemo(() => {
        const minute = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const millisec = Math.floor((time % 1000) / 10);

        const formattedMinute = String(minute).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        const formateedMillisec  = String(millisec).padStart(2, '0');

        return `${formattedMinute}:${formattedSeconds}:${formateedMillisec}`;
    }, [time]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive === true) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 100)
            }, 100);
        }

        return () => {
            if (interval) { 
                clearInterval(interval);
            }
        }
    }, [isActive]);
    

    const handleStartPause = useCallback(() => {
        if (!isActive) {
            setIsActive(true);
        }

        if (isActive) {
            setIsActive(false);
        }

        
    }, [isActive]);

    const handleReset = useCallback(() => {
        if ( time !== 0) {
             setIsActive(false);
             setTime(0);
        }

    }, [time]);

    const buttonText = time === 0 && !isActive ? 'START' : 
                       isActive ? 'PAUSE' : 'RESUME'; 


    return (
            <TimerContainer>
                <header> TIMER </header>
                <div>{formattedTime}</div>
                <TimerContainerButton>
                    <button  onClick={handleStartPause}>{buttonText}</button>
                    <button onClick={handleReset}
                            disabled={time === 0}
                    >
                        RESET
                    </button>
                </TimerContainerButton>
            </TimerContainer>
    );
});

