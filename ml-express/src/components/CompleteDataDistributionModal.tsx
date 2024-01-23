import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { UploadedData } from "../features/uploaded_data/uploadedDataSlice";
import { FeatureRangePlot } from './Plots/FeatureRangePlot';

export const CompleteDataDistributionModal: React.FC<{ uploadedData: UploadedData }> = ({ uploadedData }) => {

    const { data, headers } = uploadedData;

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const getPlotData = () => {

        let uniqueEntries = new Set();
        let plotData = data.flatMap(function (value) {
            return headers.map(function (header) {
                const entry = {
                    x: header,
                    y: parseFloat(value[header])
                };

                // Check if the entry is already in the set
                if (!uniqueEntries.has(JSON.stringify(entry))) {
                    uniqueEntries.add(JSON.stringify(entry));
                    return entry;
                } else {
                    return null; // Skip duplicate entry
                }
            });
        }).filter((entry): entry is { x: string; y: number } => entry !== null);

        return plotData;
    };

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <div className='text-right p-8'>
                <Button onClick={handleOpen} variant="outlined">Preview Data</Button>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <FeatureRangePlot data={getPlotData()} />
                </Box>
            </Modal>
        </>
    )
};