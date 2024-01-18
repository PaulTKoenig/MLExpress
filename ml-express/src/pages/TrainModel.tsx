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

export default function TrainModel() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [uploadedData, setUploadedData] = useState<UploadedData>({ headers: [], data: [], predictedFeature: "", columnsToPredict: [] });

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
                    <Tab label="Select Features" />
                    <Tab label="Feature Engineering" />
                    <Tab label="Compare Models" />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <SelectFeatures uploadedData={uploadedData} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Feature Engineering
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <Train uploadedData={uploadedData} />
            </CustomTabPanel>
        </Box>
    );
}
