import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ExploreRelationships from './tabs/ExploreRelationships';
import HandleDuplicates from './tabs/HandleDuplicates';
import ViolinPlotDistribution from './tabs/ViolinPlotDistribution';
import HistogramDistribution from './tabs/HistogramDistribution';
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
                    <Tab label="Explore Relationships" />
                    <Tab label="View Duplicates" />
                    <Tab label="Histogram" />
                    <Tab label="Violin Plot" />
                    <Tab label="Correlations" />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <ExploreRelationships uploadedData={uploadedData} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <HandleDuplicates uploadedData={uploadedData} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <HistogramDistribution uploadedData={uploadedData} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <ViolinPlotDistribution uploadedData={uploadedData} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
                Correlations
            </CustomTabPanel>
        </Box>
    );
}
