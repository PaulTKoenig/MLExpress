import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import HandleDuplicates from './tabs/HandleDuplicates';
import HandleOutliers from './tabs/HandleOutliers';
import TransformFeatures from './tabs/TransformFeatures';
import { useEffect, useState } from 'react';
import { useAppSelector } from "../hooks";
import { UploadedData, uploadedDataSelector } from "../features/uploaded_data/uploadedDataSlice";
import { CustomTabPanel } from '../components/CustomTabPanel';

export default function DataCleaning() {

    const [tabNumber, setTabNumber] = React.useState<number>(0);
    const [isFirstRender, setIsFirstRender] = React.useState(true);

    useEffect(() => {
        if (!isFirstRender) {
            localStorage.setItem("Data Exploration", String(tabNumber));
        } else {
            setIsFirstRender(false);
        }
    }, [tabNumber])

    useEffect(() => {
        const storedValue = localStorage.getItem("Data Cleaning");

        if (storedValue !== null) {
            let parsedValue = parseInt(storedValue, 10);
            setTabNumber(parsedValue);
        }
    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabNumber(newValue);
    };

    const [uploadedData, setUploadedData] = useState<UploadedData>({ headers: [], headerTypes: [], data: [], predictedFeature: "", columnsToPredict: [] });

    const selectedUploadedDatas = useAppSelector(uploadedDataSelector);

    useEffect(() => {
        setUploadedData(selectedUploadedDatas);
    }, [selectedUploadedDatas]);

    const localStorageUploadedData = localStorage.getItem("Uploaded Data");

    useEffect(() => {

        if (selectedUploadedDatas.data.length === 0 && localStorageUploadedData !== null)
            setUploadedData(JSON.parse(localStorageUploadedData));

	}, [localStorageUploadedData]);

    return (
        <Box sx={{ width: '100%' }}>
            <Box padding={1} display="flex" justifyContent="center" width="100%" sx={{ bgcolor: 'background.paper' }}>
                <Tabs
                    value={tabNumber}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="scrollable force tabs"
                >
                    <Tab label="Handle Duplicates" />
                    <Tab label="Handle Outliers" />
                    <Tab label="Transform Features" />
                </Tabs>
            </Box>
            <CustomTabPanel value={tabNumber} index={0}>
                <HandleDuplicates uploadedData={uploadedData} />
            </CustomTabPanel>
            <CustomTabPanel value={tabNumber} index={1}>
                <HandleOutliers uploadedData={uploadedData} />
            </CustomTabPanel>
            <CustomTabPanel value={tabNumber} index={2}>
                <TransformFeatures uploadedData={uploadedData} />
            </CustomTabPanel>
        </Box>
    );
}
