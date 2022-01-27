import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import { useApiRequest } from '../../hooks/useApiRequest';
import { RaceContext } from '../AllContexts';

const categoriesData = [
    { title: 'Greyhound racing', id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61' },
    { title: 'Harness racing', id: '161d9be2-e909-4326-8c2c-35ed71fb460b' },
    { title: 'Horse racing', id: '4a2788f8-e825-4d36-9894-efd4baf1cfae' }
]

const RaceProvider = ({ children }) => {
    const { data, error, isLoaded } = useApiRequest(
        "https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=5"
    );

    const value = { raceData: data, categoriesData }
    return (
        <RaceContext.Provider value={value}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '100%' }}>
                <Box sx={{ backgroundColor: '#30363A', width: '100%', height: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center" }}>
                    <Box sx={{ color: 'white', fontWeight: 'bold' }}>Next to Go</Box>
                </Box>

                {children}
            </Box >
        </RaceContext.Provider >
    );
}

export default RaceProvider;