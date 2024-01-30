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

export default function UploadDataset() {
    
    const [tabNumber, setTabNumber] = React.useState(0);
    const [isFirstRender, setIsFirstRender] = React.useState(true);

    useEffect(() => {
        if (!isFirstRender) {
            localStorage.setItem("Data Exploration", String(tabNumber));
        } else {
            setIsFirstRender(false);
        }
    }, [tabNumber])

    const handleChange = (event: React.SyntheticEvent | undefined, newValue: number) => {
        setTabNumber(newValue);
    };

    const [uploadedData, setUploadedData] = useState<UploadedData>({ headers: [], headerTypes: [], data: [], predictedFeature: "", columnsToPredict: [] });

	const selectedUploadedDatas = useAppSelector(uploadedDataSelector);

    useEffect(() => {
		setUploadedData(selectedUploadedDatas);
	}, [selectedUploadedDatas]);

	useEffect(() => {

        let localStorageUploadedData = localStorage.getItem("Uploaded Data");

        if (selectedUploadedDatas.data.length > 0)
		    setUploadedData(selectedUploadedDatas);
        else if (localStorageUploadedData !== null) 
            setUploadedData(JSON.parse(localStorageUploadedData));

	}, []);


    return (
        <Box sx={{ width: '100%' }}>
            <Box display="flex" justifyContent="center" width="100%" sx={{ bgcolor: 'background.paper' }}>
                <Tabs
                    value={tabNumber}
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
            <CustomTabPanel value={tabNumber} index={0}>
                <ImportFile handleChange={handleChange} />
            </CustomTabPanel>
            <CustomTabPanel value={tabNumber} index={1}>
                <PreviewFeatures uploadedData={uploadedData} />
            </CustomTabPanel>
            <CustomTabPanel value={tabNumber} index={2}>
                <ViewFullDataset uploadedData={uploadedData} />
            </CustomTabPanel>
        </Box>
    );
}
