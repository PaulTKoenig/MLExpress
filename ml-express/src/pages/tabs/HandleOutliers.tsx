import React, { useState } from 'react';
import { UploadedData } from "../../features/uploaded_data/uploadedDataSlice";
import { SimpleBarChart } from "../../components/Plots/SimpleBarChart";
import DropdownSelect from "../../components/DropdownSelect";
import { CompleteDataDistributionModal } from "../../components/CompleteDataDistributionModal";
import * as d3 from "d3-array";
import { ViolinPlot } from '../../components/Plots/ViolinPlot';


const DataExploration: React.FC<{ uploadedData: UploadedData }> = ({ uploadedData }) => {

    const { data, headers, headerTypes } = uploadedData;

    const [selectedFeature, setSelectedFeature] = useState<string>(headers[0]);

    const handleFeatureChange = (updatedSelection: string) => {
        setSelectedFeature(updatedSelection);
    }

    function calculateOptimalBins(data: number[]) {
        // Ensure data is sorted
        const sortedData = data.slice().sort((a, b) => a - b);

        // Calculate interquartile range (IQR)
        const q1 = d3.quantile(sortedData, 0.25);
        const q3 = d3.quantile(sortedData, 0.75);

        if (q1 === undefined || q3 === undefined) {
            return 20;
        }

        const iqr = q3 - q1;

        // Calculate optimal number of bins using Freedman-Diaconis rule
        const binWidth = Math.ceil((2 * iqr) / Math.pow(sortedData.length, 1 / 3));

        return binWidth;
    }

    const formatHistogramData = (): { count: number; range: number; x0: number; x1: number; }[] => {

        let selectedFeatureType = headerTypes.find(obj => obj.columnName === selectedFeature);

        let numBins = 20;
        if (selectedFeatureType !== undefined) {
            //numBins = Math.round(Math.sqrt(selectedFeatureType.numDiffValues));
            let validValues = data.map(row => parseFloat(row[selectedFeature])).filter((value) => !isNaN(value));
            let binWidth = calculateOptimalBins(validValues);

            let max = Math.max(...validValues);
            if (max < 5) max = max * 10

            numBins = Math.round(max/binWidth);
        }

        if (selectedFeatureType !== undefined && selectedFeatureType.type === "categorical") {
            numBins = selectedFeatureType.numDiffValues;
        }

        let bins = d3.bin().thresholds(numBins);
        let dataBins = bins(data.map(row => parseFloat(row[selectedFeature])));

        let plotData = dataBins
            .map((bin) => {
                const rangeStart = bin.x0 !== undefined ? bin.x0 : 0;
                const rangeEnd = bin.x1 !== undefined ? bin.x1 : 0;


                return {
                    count: bin.length,
                    range: Math.round(rangeEnd - rangeStart * 100) / 100,
                    x0: Math.round(rangeStart * 100) / 100,
                    x1: rangeEnd,
                }
            })
        return plotData
    }

    const formatViolinData = () => {
        const result = data.flatMap((row) =>
            headers.map((header) => {
                const value = parseFloat(row[header]);
                return !isNaN(value) ? { name: header, value } : null;
            })
        ).filter(Boolean) as { name: string; value: number }[];
        return result;
    }

    return (
        <div className='container p-16 pt-8'>
            <h2 className="text-3xl font-bold underline">Handle Outliers</h2>
            <div className="grid grid-cols-12 pt-8 items-center">
                <div className="col-span-2 pb-4">
                    Distribution Feature:
                </div>
                <div className="col-span-2" >
                    <DropdownSelect options={headers} label={"Features"} selection={selectedFeature} handleChange={handleFeatureChange} />
                </div>
            </div>
            <div className="grid grid-cols-12">
                <div className="col-span-12">
                    <SimpleBarChart data={formatHistogramData()} />
                </div>
                <div className="col-span-12">
                    <ViolinPlot data={formatViolinData()} width={1000} height={400} />
                </div>
            </div>
            <CompleteDataDistributionModal uploadedData={uploadedData} />
        </div>
    )
};

export default DataExploration;