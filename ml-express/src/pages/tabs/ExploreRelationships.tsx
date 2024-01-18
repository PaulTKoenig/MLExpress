import React, { useEffect, useState } from 'react';
import { UploadedData } from "../../features/uploaded_data/uploadedDataSlice";
import { ScatterPlot } from "../../components/Plots/ScatterPlot";
import DropdownSelect from "../../components/DropdownSelect";


const ExploreRelationships: React.FC<{ uploadedData: UploadedData }> = ({ uploadedData }) => {

	const { data, headers } = uploadedData;

	const [xAxis, setXAxis] = useState<string>("");
	const [yAxis, setYAxis] = useState<string>("");

	useEffect(() => {
		setXAxis(headers[0]);
		setYAxis(headers[0]);
	}, [headers]);

	const getPlotData = (xColumn: string, yColumn: string) => {
		const uniqueData = new Set<string>();
		const plotData: { x: number; y: number; }[] = [];

		data.forEach(function (value) {
			const x = parseFloat(value[xColumn]);
			const y = parseFloat(value[yColumn]);

			if (!isNaN(x) && !isNaN(y)) {
				const entryKey = `${x}-${y}`;
				if (!uniqueData.has(entryKey)) {
					uniqueData.add(entryKey);
					plotData.push({ x, y });
				}
			}
		});

		return plotData;
	}

	const handleXAxisChange = (updatedSelection: string) => {
		setXAxis(updatedSelection);
	}

	const handleYAxisChange = (updatedSelection: string) => {
		setYAxis(updatedSelection);
	}

	return (
		<div className='container p-16 pt-8'>
			<h2 className="text-3xl font-bold underline">Data Exploration</h2>
			<ScatterPlot data={getPlotData(xAxis, yAxis)} />
			<div className='w-1/4'>
				<div className=''>
					<DropdownSelect options={headers} label={"X Axis"} selection={xAxis} handleChange={handleXAxisChange} />
				</div>
				<div className='mt-5'>
					<DropdownSelect options={headers} label={"Y Axis"} selection={yAxis} handleChange={handleYAxisChange} />
				</div>
			</div>
		</div>
	)
};

export default ExploreRelationships;