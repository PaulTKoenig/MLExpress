import React, { useState } from 'react';
import { UploadedData } from "../../features/uploaded_data/uploadedDataSlice";
import { SimpleBarChart } from "../../components/Plots/SimpleBarChart";
import DropdownSelect from "../../components/DropdownSelect";
import { CompleteDataDistributionModal } from "../../components/CompleteDataDistributionModal";
import TextField from '@mui/material/TextField';
import * as d3 from "d3-array";


const DataExploration: React.FC<{ uploadedData: UploadedData }> = ({ uploadedData }) => {

    const { data, headers, headerTypes } = uploadedData;

    const [selectedFeature, setSelectedFeature] = useState<string>(headers[0]);

    const handleFeatureChange = (updatedSelection: string) => {
        setSelectedFeature(updatedSelection);
    }

    const formatHistogramData = (): { count: number; range: number; x0: number; x1: number; }[] => {

        let selectedFeatureType = headerTypes.find(obj => obj.columnName === selectedFeature);

        let numBins = 20;
        if (selectedFeatureType !== undefined)
            numBins = Math.round(Math.sqrt(selectedFeatureType.numDiffValues));

        if (selectedFeatureType !== undefined && selectedFeatureType.type === "categorical") {
            numBins = selectedFeatureType.numDiffValues;
        }

        let minValue = Math.min(...data.map((row) => row[selectedFeature]));
        let maxValue = Math.max(...data.map((row) => row[selectedFeature]));

        let binWidth = (maxValue - minValue) / numBins;
        let thresholds = Array.from({ length: numBins + 1 }, (_, index) => minValue + index * binWidth);


        let bins = d3.bin().thresholds(numBins);
        let dataBins = bins(data.map(row => parseFloat(row[selectedFeature])));

        let plotData = dataBins
            .map((bin) => {
                const rangeStart = bin.x0 !== undefined ? bin.x0 : 0;
                const rangeEnd = bin.x1 !== undefined ? bin.x1 : 0;

                console.log(bin)

                return {
                    count: bin.length,
                    range: Math.round(rangeEnd - rangeStart * 100) / 100,
                    x0: Math.round(rangeStart * 100) / 100,
                    x1: rangeEnd,
                }
            })
        console.log(plotData)
        return plotData
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
                {
                    //<div className="col-start-6 col-span-2" >
                    //    <TextField
                    //        id="outlined-basic"
                    //        label="Number of Bins"
                    //        variant="outlined"
                    //        value={numBins}
                    //        onChange={handleNumBinsInput}
                    //        inputProps={{ inputMode: 'numeric' }}
                    //    />
                    //</div>
                }
            </div>
            <div className="grid grid-cols-12">
                <div className="col-span-12">
                    <SimpleBarChart data={formatHistogramData()} />
                </div>
            </div>
            <CompleteDataDistributionModal uploadedData={uploadedData} />
        </div>
    )
};

export default DataExploration;