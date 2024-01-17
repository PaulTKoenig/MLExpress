import React, { useEffect, useState } from 'react';
import { useAppSelector } from "../hooks";
import { UploadedData, uploadedDataSelector } from "../features/uploaded_data/uploadedDataSlice";
import { FeatureRangePlot } from "../components/Plots/FeatureRangePlot";


const DataExploration: React.FC = () => {

    const [csvData, setCsvData] = useState<UploadedData>({ headers: [], data: [] });

    const selectedUploadedDatas = useAppSelector(uploadedDataSelector);

    useEffect(() => {
        setCsvData(selectedUploadedDatas);
    }, [selectedUploadedDatas]);

    const getPlotData = () => {
        let plotData: { x: string; y: number; }[] = csvData.data.flatMap(function (value) {
            return csvData.headers.map(function (header) {
                return {
                    x: header,
                    y: parseFloat(value[header])
                };
            });
        }).filter(entry => !isNaN(entry.y));
        return plotData;
    }

    return (
        <div className='container m-16 ml-28'>
            <h2 className="text-3xl font-bold underline">Data Exploration</h2>
            <div className=''>
                <FeatureRangePlot data={getPlotData()} width={500} height={500} />
            </div>
            Need to  make graph look better and allow user to limit ranges of columns
        </div>
    )
};

export default DataExploration;