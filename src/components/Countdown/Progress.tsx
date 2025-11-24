import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface ProgressProps{
    initialTime: number;
    remaningTime: number;
}

function CircularProgressWithLabel(
    props: {value: number}
) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
                variant="determinate"
                value={100}
                sx={{
                color: 'grey',
                opacity: 0.2,
                position: 'absolute',
                left: 0,
                }}
                size={60}
                thickness={4}
            />
            <CircularProgress
                variant="determinate"
                value={props.value}
                size={60}
                thickness={4}
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Typography
                    variant="caption"
                    component="div"
                    sx={{ color: 'white' }}
                >
                {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    )
}

export const Progress: React.FC<ProgressProps> = ({initialTime, remaningTime}) => {

    const progress = initialTime ? ((initialTime - remaningTime) / initialTime) * 100 : 0;

    return (
       <CircularProgressWithLabel value={progress}/>
    );
};