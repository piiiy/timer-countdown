import styled from "@emotion/styled";
import React from "react";

const ProgressContainer = styled.div`
    width: 100%;
    height: 20px;
    background: #e0e0e0;
    border-radius: 10px;
    overflow: hidden;
`;

const ProgressFill = styled.div<{ $color: string }>`
    height: 100%;
    transition: width 0.3s ease;
    background: ${props => props.$color};
`;

interface ProgressBarProps {
    currentTime: number;
    initialTime: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = React.memo(({ currentTime, initialTime }) => {
    const progress = (currentTime / initialTime) * 100;
    
    return (
        <ProgressContainer>
            <ProgressFill style={{ width: `${progress}%`}} 
                          $color="#18609b"/>
        </ProgressContainer>
    );
});