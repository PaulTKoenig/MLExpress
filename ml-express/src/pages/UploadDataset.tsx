import React, { useEffect, useState } from 'react';
import CsvUploader from '../components/CsvUploader';
import CsvTablePreview from '../components/CsvTablePreview';
import CsvTableDetails from '../components/CsvTableDetails';
import { useAppDispatch, useAppSelector } from "../hooks";
import { UploadedData, setUploadedData, uploadedDataSelector } from "../features/uploaded_data/uploadedDataSlice";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const UploadDataset: React.FC = () => {

	const [csvData, setCsvData] = useState<UploadedData>([]);
	const [headers, setHeaders] = useState<string[]>([]);

	const selectedUploadedData = useAppSelector(uploadedDataSelector);
	const dispatch = useAppDispatch();

	useEffect(() => {
		setCsvData(selectedUploadedData);
		setHeaders(headers);
	}, [selectedUploadedData]);

	const handleUploadedData = (data: UploadedData) => {
		dispatch(setUploadedData(data));
	}

	const handleUpload = (data: UploadedData, headers: string[]) => {
		setCsvData(data);
		setHeaders(headers);
		handleUploadedData(data);
	};

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const style = {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 'auto',
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
	};

	const displayPreview = () => {
		if (csvData.length > 0) {
			return (
				<>
					<CsvTableDetails headers={headers} data={csvData} />
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
							<CsvTablePreview data={csvData} />
						</Box>
					</Modal>
				</>
			)
		}
	}

	return (
		<>
			<div className='container m-16 ml-28'>
				<div className='text-3xl font-bold'>Upload Dataset</div>
				<div className='p-16 justify-center'>
					{csvData.length > 0 ? (
						<>
							<CsvTableDetails headers={headers} data={csvData} />
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
									<CsvTablePreview data={csvData} />
								</Box>
							</Modal>
						</>
					) : null}
					<div className='translate-x-1/2 w-1/2'>
						<CsvUploader onUpload={handleUpload} />
					</div>
				</div>
			</div>
		</>
	);
}

export default UploadDataset;