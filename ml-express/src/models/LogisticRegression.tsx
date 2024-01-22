import * as tf from '@tensorflow/tfjs';
import { Dispatch, SetStateAction } from 'react';

export class LogisticRegression {
  private model: tf.Sequential;
  private learningRate: number;
  private numEpochs: number;
  private setLoss: Dispatch<SetStateAction<{ x: number; y: number; }[]>>;
  private confusionMatrix: { tp: number, tn: number, fp: number, fn: number };
  public accuracy: number;
  public recall: number;
  public precision: number;
  public f1score: number;
  

  constructor(learningRate: number, numEpochs: number, numFeatures: number, setLoss: Dispatch<SetStateAction<{ x: number; y: number; }[]>>) {
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({ units: 1, inputShape: [numFeatures], activation: 'sigmoid' }));
    this.model.compile({ optimizer: tf.train.adam(learningRate), loss: 'binaryCrossentropy', metrics: ["accuracy"] });

    this.learningRate = learningRate;
    this.numEpochs = numEpochs;
    this.setLoss = setLoss;

    this.confusionMatrix = { tp: 0, tn: 0, fp: 0, fn: 0 };

    this.accuracy = 0;
    this.recall = 0;
    this.precision = 0;
    this.f1score = 0;
  }

  async train(features: number[][], labels: number[]): Promise<void> {

    let tensorFeatures: tf.Tensor2D = tf.tensor2d(features);
    let tensorLabels: tf.Tensor1D = tf.tensor1d(labels);

    await this.model.fit(tensorFeatures, tensorLabels, {
      epochs: this.numEpochs,
      batchSize: tensorFeatures.shape[0],
      shuffle: true,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          if (logs) {
            this.setLoss(prevLoss => [...prevLoss, { x: epoch+1, y: logs.loss }]);
            console.log(logs)
          }
        },
      },
    })
  }

  predict(input: number[][], labels: number[]) {
    const tensorInput = tf.tensor2d(input);
    const predictions = this.model.predict(tensorInput) as tf.Tensor;
    const values = predictions.dataSync();
    const results = Array.from(values);
    
    let confusionMatrix = { tp: 0, tn: 0, fp: 0, fn: 0 }

    results.forEach((predValue, idx) => {

      if (predValue >= 0.5) {
        if (labels[idx] >= 0.5) confusionMatrix.tp += 1
        else if (labels[idx] < 0.5) confusionMatrix.fp += 1
      } else if (predValue < 0.5) {
        if (labels[idx] >= 0.5) confusionMatrix.fn += 1
        else if (labels[idx] < 0.5) confusionMatrix.tp += 1
      }
    })

    this.confusionMatrix = confusionMatrix;

    this.accuracy = ((this.confusionMatrix.tp + this.confusionMatrix.tn) / (this.confusionMatrix.tp + this.confusionMatrix.tn + this.confusionMatrix.fp + this.confusionMatrix.fn));

    let recall = ((this.confusionMatrix.tp) / (this.confusionMatrix.tp + this.confusionMatrix.fn));
    this.recall = recall;
    
    let precision = ((this.confusionMatrix.tp) / (this.confusionMatrix.tp + this.confusionMatrix.fp));
    this.precision = precision;

    this.f1score = ((2 * precision * recall) / (precision + recall))
  }
}