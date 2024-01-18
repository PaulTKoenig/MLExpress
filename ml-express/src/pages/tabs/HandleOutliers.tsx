import React from 'react';
import { UploadedData } from "../../features/uploaded_data/uploadedDataSlice";
import { FeatureRangePlot } from "../../components/Plots/FeatureRangePlot";
import { FeatureRngePlot } from "../../components/Plots/FeatureRngePlot";


const DataExploration: React.FC<{ uploadedData: UploadedData }> = ({ uploadedData }) => {

    const { data, headers } = uploadedData;

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

    return (
        <div className='container p-16 pt-8'>
            <h2 className="text-3xl font-bold underline">Data Exploration</h2>
            <FeatureRngePlot data={getPlotData()} />
        </div>
    )
};

export default DataExploration;