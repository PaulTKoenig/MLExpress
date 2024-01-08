import React, { useEffect, useState } from 'react';
import { useAppSelector } from "../hooks";
import { UploadedData, uploadedDataSelector } from "../features/uploaded_data/uploadedDataSlice";
import { ScatterPlot } from "../components/Plots/ScatterPlot";
import DropdownSelect from "../components/DropdownSelect";


const DataExploration: React.FC = () => {

	const [csvData, setCsvData] = useState<UploadedData>({ headers: [], data: [] });
	const [xAxis, setXAxis] = useState<string>("");
	const [yAxis, setYAxis] = useState<string>("");

	const selectedUploadedDatas = useAppSelector(uploadedDataSelector);

	useEffect(() => {
		setCsvData(selectedUploadedDatas);
	}, [selectedUploadedDatas]);

	const getPlotData = (xColumn: string, yColumn: string) => {
		let plotData: { x: number; y: number; }[] = csvData.data.map(function (value) {
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

		let columnValues: number[] = csvData.data.map(function (value) {
			return parseFloat(value[column])
		}).filter(entry => !isNaN(entry));

		return { min: Math.floor(Math.min(...columnValues)), max: Math.ceil(Math.max(...columnValues)) };
	}

	return (
		<div>
			<h2 className="text-3xl font-bold underline">Data Exploration</h2>
			<ScatterPlot data={getPlotData(xAxis, yAxis)} width={500} height={500} xDomain={handleDomain(xAxis)} yDomain={handleDomain(yAxis)} />
			<DropdownSelect options={csvData.headers} label={"X Axis"} selection={xAxis} handleChange={handleXAxisChange} />
			<DropdownSelect options={csvData.headers} label={"Y Axis"} selection={yAxis} handleChange={handleYAxisChange} />
		</div>
	)
};

export default DataExploration;