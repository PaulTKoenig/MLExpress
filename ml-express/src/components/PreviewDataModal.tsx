import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CsvTablePreview from './Tables/CsvTablePreview';
import Button from '@mui/material/Button';

interface CsvTableProps {
    data: any[];
}

const PreviewDataModal: React.FC<CsvTableProps> = ({ data }) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                    <CsvTablePreview data={data} />
                </Box>
            </Modal>
        </>
    )
};

export default PreviewDataModal;