import React, { useState } from 'react';
import { UploadedData } from "../../features/uploaded_data/uploadedDataSlice";
import { LogisticRegression } from '../../models';
import Button from '@mui/material/Button';

const Train: React.FC<{ uploadedData: UploadedData }> = ({ uploadedData }) => {

	const { data, predictedFeature, columnsToPredict } = uploadedData;

	const [loss, setLoss] = useState<number[]>([]);

	const formatTrainingData = () => {
		const features: number[][] = [];
		const labels: number[] = [];

		data.forEach((dataRow: string[]) => {

			const results: number[] = [];

			for (const key in dataRow) {
				const value = parseFloat(dataRow[key]);

				if (columnsToPredict.includes(key)) {
					results.push(isNaN(value) ? NaN : value);
				} else if ([predictedFeature].includes(key)) {
					labels.push(isNaN(value) ? NaN : value);
				}
			}

			if (!results.includes(NaN)) {
				features.push(results);
			}
		})

		return { features: features, labels: labels };
	}

	const trainModel = () => {
		let { features, labels } = formatTrainingData();

		let learningRate = 0.01;
		let numEpochs = 100;
		let numFeatures = features[0].length;

		const logisticRegression = new LogisticRegression(learningRate, numEpochs, numFeatures, setLoss);
		// Create and train the logistic regression model
		logisticRegression.train(features, labels).then(() => {
		  console.log("DONE");
		  // // Make predictions using the trained model
		  // const inputForPrediction = [[4, 2]];
		  // const predictions = logisticRegression.predict(inputForPrediction).arraySync();
		  // console.log(`Prediction for input ${inputForPrediction}: ${predictions}`);
		
		});
	}

	return (
		<div className='container p-16 pt-8'>
			<div className='mb-8 text-3xl font-bold'>Train Model</div>
			<div>
				<Button onClick={() => trainModel()} variant="outlined">Train Model</Button>
				{loss.map(value => <div>{value}</div>)}
			</div>
		</div>
	);
}

export default Train;