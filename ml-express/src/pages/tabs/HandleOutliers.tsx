import React from 'react';
import { UploadedData } from "../../features/uploaded_data/uploadedDataSlice";
import { FeatureRangePlot } from "../../components/Plots/FeatureRangePlot";


const DataExploration: React.FC<{ uploadedData: UploadedData }> = ({ uploadedData }) => {

    const { data, headers } = uploadedData;

    const getPlotData = () => {
        let plotData: { x: string; y: number; }[] = data.flatMap(function (value) {
            return headers.map(function (header) {
                return {
                    x: header,
                    y: parseFloat(value[header])
                };
            });
        }).filter(entry => !isNaN(entry.y));
        return plotData;
    }

    return (
        <div className='container p-16 pt-8'>
            <h2 className="text-3xl font-bold underline">Data Exploration</h2>
            <div className=''>
                <FeatureRangePlot data={getPlotData()} width={500} height={500} />
            </div>
            Need to  make graph look better and allow user to limit ranges of columns
        </div>
    )
};

export default DataExploration;