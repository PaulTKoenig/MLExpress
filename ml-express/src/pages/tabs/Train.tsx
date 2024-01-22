import React, { useEffect, useState } from 'react';
import { UploadedData } from "../../features/uploaded_data/uploadedDataSlice";
import { LogisticRegression } from '../../models/LogisticRegression';
import Button from '@mui/material/Button';
import { ScatterPlot } from "../../components/Plots/ScatterPlot";
import { HyperparameterAccordian } from "../../components/HyperparameterAccordian";
import DropdownSelect from "../../components/DropdownSelect";
import { randomSplit } from '../../utils';
import { RandomForest } from '../../models/RandomForest';


interface TrainModelProps {
	features: number[][];
	labels: number[];
	modelType: string;
}

const TrainModel: React.FC<TrainModelProps> = ({ features, labels, modelType }) => {

	const [loss, setLoss] = useState<{ x: number; y: number; }[]>([]);
	const [modelResults, setModelResults] = useState<{ accuracy: number, recall: number, precision: number, f1score: number }>({ accuracy: 0, recall: 0, precision: 0, f1score: 0 });

	let learningRate = 0.01;
	let numEpochs = 100;
	let numFeatures = features[0].length;

	const { train, test } = randomSplit(features, labels, 0.8);

	useEffect(() => {

		if (modelType === "Logistic Regression") {

			const model = new LogisticRegression(learningRate, numEpochs, numFeatures, setLoss);

			model.train(features, labels)
				.then(() => {
					model.predict(features, labels);

					setModelResults({ accuracy: model.accuracy, 
									   recall: model.recall, 
									   precision: model.precision, 
									   f1score: model.f1score });
				})
				.catch(error => {
					console.error("Error during training:", error);
				});
		} else if (modelType === "Random Forest") {
			const model = new RandomForest();

			model.train(train.features, train.labels);

			model.predict(test.features, test.labels);

			setModelResults({ accuracy: model.accuracy, 
				recall: model.recall, 
				precision: model.precision, 
				f1score: model.f1score });
		}

	}, []);

	return (
		<>
			<div className='col-start-2 col-span-2 text-xl'>{modelType}</div>
			<div className='col-span-6'>
				<ScatterPlot data={loss} height={200} />
			</div>
			{ (modelResults.accuracy !== 0 && modelResults.recall !== 0 && modelResults.precision !== 0 && modelResults.f1score !== 0) &&
				<div className='col-span-3'>
					<div>Accuracy: {modelResults.accuracy}</div>
					<div>Recall: {modelResults.recall}</div>
					<div>Precision: {modelResults.precision}</div>
					<div>F1 Score: {modelResults.f1score}</div>
				</div>
			}
		</>
	)
}

const Train: React.FC<{ uploadedData: UploadedData }> = ({ uploadedData }) => {

	const { data, predictedFeature, columnsToPredict } = uploadedData;

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

	const [trainedModels, setTrainedModels] = useState<string[]>([]);

	const trainModel = () => {
		let numModels = trainedModels.length;
		setTrainedModels(prevModels => [...prevModels, model]);
	}

	const modelChoices: string[] = ['Logistic Regression', 'Random Forest'];
	const [model, setModel] = useState<string>(modelChoices[0]);
	const handleModelChange = (updatedSelection: string) => {
		setModel(updatedSelection);
	}

	return (
		<div className='container p-16 pt-8'>
			<div className='mb-8 text-3xl font-bold'>Train Model</div>
			<div>
				<div className='flex items-center'>
					<div className='p-8 pb-0'>
						<DropdownSelect options={modelChoices} label={"Models"} selection={model} handleChange={handleModelChange} />
					</div>
					<div className='p-8 pb-0'>
						<Button onClick={() => trainModel()} variant="outlined">Train Model</Button>
					</div>
				</div>
				<div className='p-8'>
					<HyperparameterAccordian />
				</div>
			</div>
			<div className="grid grid-cols-12 items-center">
				{trainedModels.map((modelType) => {
					let { features, labels } = formatTrainingData();
					return (
						<TrainModel features={features} labels={labels} modelType={modelType} />
					)
				})
				}
			</div>
		</div>
	);
}

export default Train;