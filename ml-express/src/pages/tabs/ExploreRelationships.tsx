import React, { useEffect, useMemo, useState } from 'react';
import { UploadedData } from "../../features/uploaded_data/uploadedDataSlice";
import { ScatterPlot } from "../../components/Plots/ScatterPlot";
import DropdownSelect from "../../components/DropdownSelect";
import { CompleteDataDistributionModal } from "../../components/CompleteDataDistributionModal";


const ExploreRelationships: React.FC<{ uploadedData: UploadedData }> = ({ uploadedData }) => {

	const { data, headers } = uploadedData;

	const [xAxis, setXAxis] = useState<string>("");
	const [yAxis, setYAxis] = useState<string>("");

	useEffect(() => {
		if (headers.length > 0 && xAxis === "" && yAxis === "") {
        	setXAxis(headers[0])
			setYAxis(headers[0])
		}
    }, [headers])

	useEffect(() => {
        if (xAxis !== "" && xAxis !== undefined)
            localStorage.setItem("Explore Relationships Selected xAxis", xAxis);
    }, [xAxis])

	useEffect(() => {
        if (yAxis !== "" && yAxis !== undefined)
            localStorage.setItem("Explore Relationships Selected yAxis", yAxis);
    }, [yAxis])

    useEffect(() => {
		const storedXValue = localStorage.getItem("Explore Relationships Selected xAxis");

        if (storedXValue !== null) {
			console.log(storedXValue)
            setXAxis(storedXValue);
		}

        const storedYValue = localStorage.getItem("Explore Relationships Selected yAxis");

        if (storedYValue !== null)
            setYAxis(storedYValue);
    }, []);

	const memoizedResult = useMemo(() => {
		const uniqueData = new Set<string>();
		const plotData: { x: number; y: number; }[] = [];

		data.forEach(function (value) {
			const x = parseFloat(value[xAxis]);
			const y = parseFloat(value[yAxis]);

			if (!isNaN(x) && !isNaN(y)) {
				const entryKey = `${x}-${y}`;
				if (!uniqueData.has(entryKey)) {
					uniqueData.add(entryKey);
					plotData.push({ x, y });
				}
			}
		});

		return plotData;
	  }, [xAxis, yAxis]);

	const handleXAxisChange = (updatedSelection: string) => {
		setXAxis(updatedSelection);
	}

	const handleYAxisChange = (updatedSelection: string) => {
		setYAxis(updatedSelection);
	}

	return (
		<div className='container p-16 pt-8'>
			<h2 className="text-3xl font-bold">Explore Relationships</h2>

			<ScatterPlot data={memoizedResult} height={400} />
			
			<div className='w-1/4'>
				<div className=''>
					<DropdownSelect options={headers} label={"X Axis"} selection={xAxis} handleChange={handleXAxisChange} />
				</div>
				<div className='mt-5'>
					<DropdownSelect options={headers} label={"Y Axis"} selection={yAxis} handleChange={handleYAxisChange} />
				</div>
			</div>
			<CompleteDataDistributionModal uploadedData={uploadedData} />
		</div>
	)
};

export default ExploreRelationships;