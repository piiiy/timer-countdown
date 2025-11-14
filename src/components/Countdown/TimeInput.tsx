import React, {useState} from "react";
import styled from "styled-components";
import { TimerSlider } from "./TimeSlider";

interface TimeInputProps {
    onTimeChange: (totalSeconds: number) => void;
    isActive: boolean;
}

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    width: 100%;
`;

const InputGroup = styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: flex-end;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;

const StyledLabel = styled.label`
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
`;

const StyledInput = styled.input`
    font-size: 18px;
    padding: 10px 12px;
    width: 90px;
    text-align: center;
    border: 2px solid #e1e5e9;
    border-radius: 8px;
    background: white;
    transition: all 0.2s ease;
    
    &:focus {
        border-color: #18609b;
        outline: none;
        box-shadow: 0 0 0 3px rgba(24, 96, 155, 0.1);
    }
    
    &:disabled {
        background-color: #f5f5f5;
        color: #999;
        cursor: not-allowed;
    }
`;

const SliderContainer = styled.div`
    width: 100%;
    max-width: 400px;
    padding: 0 10px;
`;

export const TimeInput: React.FC<TimeInputProps> = React.memo(({ onTimeChange, isActive }) => {
    const [seconds, setSeconds] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);

    const updateTime = (newMinutes: number, newSeconds: number) => {
        setMinutes(newMinutes);
        setSeconds(newSeconds);
        onTimeChange(newMinutes * 60 + newSeconds);
    };

    return (
        <InputContainer>
            <InputGroup>
                <InputWrapper>
                    <StyledLabel htmlFor="minutes-input">Минуты</StyledLabel>
                    <StyledInput
                        disabled={isActive}
                        id='minutes-input' 
                        type="number"
                        value={minutes}           
                        onChange={(e) => {
                            const value = Math.min(720, Math.max(0, Number(e.target.value)));
                            updateTime(value, seconds);
                        }}
                    />
                </InputWrapper>
                
                <InputWrapper>
                    <StyledLabel htmlFor="seconds-input">Секунды</StyledLabel>
                    <StyledInput
                        disabled={isActive}
                        id="seconds-input"
                        type="number"
                        value={seconds}           
                        onChange={(e) => {
                            const value = Math.min(59, Math.max(0, Number(e.target.value)));
                            updateTime(minutes, value);
                        }}
                    />
                </InputWrapper>
            </InputGroup>

            <SliderContainer>
                <TimerSlider 
                    disabled={isActive}
                    value={minutes * 60 + seconds}
                    onChange={(value) => {
                        updateTime(Math.floor(value / 60), value % 60);
                    }}
                />
            </SliderContainer>
        </InputContainer>
    );
});