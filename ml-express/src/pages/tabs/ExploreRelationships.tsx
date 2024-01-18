import React, { useState } from 'react';
import { UploadedData } from "../../features/uploaded_data/uploadedDataSlice";
import { ScatterPlot } from "../../components/Plots/ScatterPlot";
import DropdownSelect from "../../components/DropdownSelect";


const ExploreRelationships: React.FC<{ uploadedData: UploadedData }> = ({ uploadedData }) => {

	const { data, headers } = uploadedData;

	const [xAxis, setXAxis] = useState<string>("");
	const [yAxis, setYAxis] = useState<string>("");

	const getPlotData = (xColumn: string, yColumn: string) => {
		let plotData: { x: number; y: number; }[] = data.map(function (value) {
			return {
				x: parseFloat(value[xColumn]),
				y: parseFloat(value[yColumn])
			};
		}).filter(entry => !isNaN(entry.x) && !isNaN(entry.y));
		return plotData;
	}

	const handleXAxisChange = (updatedSelection: string) => {
		setXAxis(updatedSelection);
	}

	const handleYAxisChange = (updatedSelection: string) => {
		setYAxis(updatedSelection);
	}

	const handleDomain = (column: string) => {
		if (column === "") {
			return { min: 0, max: 100 }
		}

		let columnValues: number[] = data.map(function (value) {
			return parseFloat(value[column])
		}).filter(entry => !isNaN(entry));

		return { min: Math.floor(Math.min(...columnValues)), max: Math.ceil(Math.max(...columnValues)) };
	}

	return (
		<div className='container p-16 pt-8'>
			<h2 className="text-3xl font-bold underline">Data Exploration</h2>
			<ScatterPlot data={getPlotData(xAxis, yAxis)} width={500} height={500} xDomain={handleDomain(xAxis)} yDomain={handleDomain(yAxis)} />
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