import * as tf from '@tensorflow/tfjs';
import { Dispatch, SetStateAction } from 'react';

export class LogisticRegression {
  private model: tf.Sequential;
  private learningRate: number;
  private numEpochs: number;
  private setLoss: Dispatch<SetStateAction<number[]>>;

  constructor(learningRate: number, numEpochs: number, numFeatures: number, setLoss: Dispatch<SetStateAction<number[]>>) {
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({ units: 1, inputShape: [numFeatures], activation: 'sigmoid' }));
    this.model.compile({ optimizer: tf.train.adam(learningRate), loss: 'binaryCrossentropy' });

    this.learningRate = learningRate;
    this.numEpochs = numEpochs;
    this.setLoss = setLoss;
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
            console.log(`Epoch ${epoch + 1}, Loss: ${logs.loss}`);
            this.setLoss(prevLoss => [...prevLoss, logs.loss]);
          }
        },
      },
    })
  }

  predict(input: number[][]): tf.Tensor {
    const tensorInput = tf.tensor2d(input);
    const predictions = this.model.predict(tensorInput) as tf.Tensor;
    return predictions;
  }
}