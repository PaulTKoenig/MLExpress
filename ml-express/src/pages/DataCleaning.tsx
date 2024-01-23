import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import HandleDuplicates from './tabs/HandleDuplicates';
import HandleOutliers from './tabs/HandleOutliers';
import { useEffect, useState } from 'react';
import { useAppSelector } from "../hooks";
import { UploadedData, uploadedDataSelector } from "../features/uploaded_data/uploadedDataSlice";
import { CustomTabPanel } from '../components/CustomTabPanel';

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [uploadedData, setUploadedData] = useState<UploadedData>({ headers: [], headerTypes: [], data: [], predictedFeature: "", columnsToPredict: [] });

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
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="scrollable force tabs"
                >
                    <Tab label="Handle Duplicates" />
                    <Tab label="Handle Outliers" />
                    <Tab label="Handle Qualitative" />
                    <Tab label="Transform Features" />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <HandleDuplicates uploadedData={uploadedData} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <HandleOutliers uploadedData={uploadedData} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                Handle Qualitative Data
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                Transform Features
            </CustomTabPanel>
        </Box>
    );
}
