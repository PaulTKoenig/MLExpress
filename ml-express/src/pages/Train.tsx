import React, { useEffect, useState } from 'react';
import { useAppSelector } from "../hooks";
import { UploadedData, uploadedDataSelector } from "../features/uploaded_data/uploadedDataSlice";
import { LogisticRegression } from '../models';
import Button from '@mui/material/Button';

const Train: React.FC = () => {

	const [uploadedData, setUploadedData] = useState<UploadedData>({ headers: [], data: [] });
	const [loss, setLoss] = useState<number[]>([]);

	const selectedUploadedDatas = useAppSelector(uploadedDataSelector);

	useEffect(() => {
		setUploadedData(selectedUploadedDatas);
	}, [selectedUploadedDatas]);


	let featureLabels = ['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age']
	let outputLabel = ['Outcome']

	const formatTrainingData = () => {
		const features: number[][] = [];
		const labels: number[] = [];

		uploadedData.data.forEach((dataRow: string[]) => {

			const results: number[] = [];

			for (const key in dataRow) {
				const value = parseFloat(dataRow[key]);

				if (featureLabels.includes(key)) {
					results.push(isNaN(value) ? NaN : value);
				} else if (outputLabel.includes(key)) {
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
		<div className='container m-16 ml-28'>
			<div className='mb-8 text-3xl font-bold'>Train Model</div>
			<div>
				<Button onClick={() => trainModel()} variant="outlined">Preview Data</Button>
				{loss.map(value => <div>{value}</div>)}
			</div>
		</div>
	);
}

export default Train;