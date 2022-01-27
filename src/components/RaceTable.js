import { useContext, useState, useEffect, useCallback } from 'react';
import { RaceContext } from '../context/AllContexts';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function RaceTable() {
    const raceContext = useContext(RaceContext)
    const [filteredRaceData, setFilteredRaceData] = useState([]);
    const { raceData: { data }, categoriesData } = raceContext
    const [selectedCategory, setSelectedCategory] = useState(categoriesData[0]?.id);
    const [currentCount, setCount] = useState({});
    const timer = (id) => {
        const copyCount = { ...currentCount }
        if (copyCount[id]) {
            copyCount[id] = copyCount[id] - 1
            setCount(copyCount)
        }
    };

    const handleFilterByCat = (catId) => {
        if (catId) {
            let filteredArray = []
            let copyCurrentCount = {}
            data?.race_summaries && Object.entries(data?.race_summaries).map((key) => {
                if (key[1]?.category_id === catId) {
                    filteredArray.push(key[1])
                    copyCurrentCount[key[1]?.race_id] = parseInt(key[1]?.advertised_start?.seconds.toString().slice(-2))
                }
            })
            const sortedArray = filteredArray.sort(function (x, y) {
                return x?.advertised_start?.timestamp - y?.advertised_start?.timestamp;
            })
            setFilteredRaceData(sortedArray)
            setCount({ ...currentCount, ...copyCurrentCount })
        }
    }

    useEffect(() => {
        handleFilterByCat(selectedCategory)
    }, [selectedCategory, data]);


    useEffect(
        () => {
            const firstElementId = Object.entries(currentCount)[0]
            if (Array.isArray(firstElementId)) {
                if (currentCount[firstElementId[0]] <= 0) {
                    return;
                }
                const id = setInterval(() => { timer(firstElementId[0]) }, 1000);
                return () => clearInterval(id);
            }

        },
        [currentCount]
    );

    return (
        <>
            <Box sx={{
                width: "50%", marginTop: '30px'
            }}>
                <FormControl sx={{ minWidth: '90%', marginX: '20px' }}>
                    <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedCategory}
                        label="Age"
                        onChange={(e) => { setSelectedCategory(e.target.value) }}
                    >
                        {Array.isArray(categoriesData) && categoriesData.map((item) => (
                            <MenuItem key={item?.id} value={item?.id}>{item?.title}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            {Array.isArray(filteredRaceData) && filteredRaceData.map((itemData) => {
                return (
                    currentCount[itemData?.race_id] ? (
                        <Box key={itemData?.race_id} sx={{ paddingX: "20px", width: '50%', marginTop: '50px' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                                <Box>
                                    <Box sx={{ color: "#37AFEE", fontWeight: 'bold' }}>
                                        {itemData?.meeting_name}
                                    </Box>
                                </Box>
                                <Box sx={{ fontWeight: 'bold', opacity: "30%" }}>
                                    {currentCount[itemData?.race_id]}
                                </Box>
                            </Box>
                            <Box sx={{ width: '100%', height: '150px', border: '2px solid', borderColor: '#FF7800', marginTop: '10px', borderRadius: '5px', paddingX: '20px' }}>
                                <Box sx={{ display: 'flex', width: "100%", height: "150px", alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Box sx={{ width: '50%' }}>
                                        <Box sx={{ fontWeight: 'regular' }}>
                                            {itemData?.race_name}
                                        </Box>
                                    </Box>
                                    <Box sx={{}}>
                                        <Box sx={{ fontWeight: 'regular' }}>
                                            Race Number
                                        </Box>
                                        <Box sx={{ width: '100px', height: '50px', border: '2px solid', borderColor: '#FF7800', marginTop: '10px', borderRadius: '5px', display: ' flex', justifyContent: "center", flexDirection: 'column' }}>
                                            <Box sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                                                {itemData?.race_number}
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    ) : null
                )
            })}
        </>

    );
}
