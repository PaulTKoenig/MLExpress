import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SelectFeatures from './tabs/SelectFeatures';
import Train from './tabs/Train';
import { useAppSelector } from "../hooks";
import { UploadedData, uploadedDataSelector } from "../features/uploaded_data/uploadedDataSlice";
import { useEffect, useState } from 'react';
import { CustomTabPanel } from '../components/CustomTabPanel';

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [uploadedData, setUploadedData] = useState<UploadedData>({ headers: [], data: [] });

	const selectedUploadedDatas = useAppSelector(uploadedDataSelector);

	useEffect(() => {
		setUploadedData(selectedUploadedDatas);
	}, [selectedUploadedDatas]);

    return (
        <Box sx={{ width: '100%' }}>
            <Box padding={1} display="flex" justifyContent="center" width="100%" sx={{ bgcolor: 'background.paper' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    centered
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="scrollable force tabs"
                >
                    <Tab label="Select Features" />
                    <Tab label="Feature Engineering" />
                    <Tab label="Choose Model" />
                    <Tab label="Train" />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <SelectFeatures data={uploadedData.data} headers={uploadedData.headers} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Item Two
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                Item Three
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <Train data={uploadedData.data} headers={uploadedData.headers} />
            </CustomTabPanel>
        </Box>
    );
}
