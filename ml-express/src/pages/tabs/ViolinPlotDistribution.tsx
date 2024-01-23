import React from 'react';
import { UploadedData } from "../../features/uploaded_data/uploadedDataSlice";
import { ViolinPlot } from '../../components/Plots/ViolinPlot';


const ViolinPlotDistribution: React.FC<{ uploadedData: UploadedData }> = ({ uploadedData }) => {

    const { data, headers } = uploadedData;


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
            <h2 className="text-3xl font-bold underline">Violin Plot</h2>
            <div className="grid grid-cols-12">
                <div className="col-span-12">
                    <ViolinPlot data={formatViolinData()} width={1000} height={400} />
                </div>
            </div>
        </div>
    )
};

export default ViolinPlotDistribution;