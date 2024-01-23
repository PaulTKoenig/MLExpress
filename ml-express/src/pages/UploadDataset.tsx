import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ImportFile from './tabs/ImportFile';
import PreviewFeatures from './tabs/PreviewFeatures';
import ViewFullDataset from './tabs/ViewFullDataset';
import { useAppSelector } from "../hooks";
import { UploadedData, uploadedDataSelector } from "../features/uploaded_data/uploadedDataSlice";
import { useEffect, useState } from 'react';
import { CustomTabPanel } from '../components/CustomTabPanel';

export default function BasicTabs() {
    
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent | undefined, newValue: number) => {
        setValue(newValue);
    };

    const [uploadedData, setUploadedData] = useState<UploadedData>({ headers: [], headerTypes: [], data: [], predictedFeature: "", columnsToPredict: [] });

	const selectedUploadedDatas = useAppSelector(uploadedDataSelector);

	useEffect(() => {
		setUploadedData(selectedUploadedDatas);
	}, [selectedUploadedDatas]);


    return (
        <Box sx={{ width: '100%' }}>
            <Box display="flex" justifyContent="center" width="100%" sx={{ bgcolor: 'background.paper' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="scrollable force tabs"
                >
                    <Tab label="Import File" />
                    <Tab label="Preview Features" disabled={uploadedData.data.length === 0} />
                    <Tab label="View Full Dataset" disabled={uploadedData.data.length === 0} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <ImportFile handleChange={handleChange} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <PreviewFeatures uploadedData={uploadedData} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <ViewFullDataset uploadedData={uploadedData} />
            </CustomTabPanel>
        </Box>
    );
}
