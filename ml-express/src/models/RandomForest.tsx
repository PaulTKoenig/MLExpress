import { RandomForestClassifier as RFClassifier } from 'ml-random-forest';

export class RandomForest {
  private model: RFClassifier;
  private confusionMatrix: { tp: number, tn: number, fp: number, fn: number };
  public accuracy: number;
  public recall: number;
  public precision: number;
  public f1score: number;

  constructor() {

    // Create a RandomForest classifier
    const options = {
      seed: 3,
      maxFeatures: 0.8,
      replacement: true,
      nEstimators: 25
    };

    this.model = new RFClassifier(options);
    this.confusionMatrix = { tp: 0, tn: 0, fp: 0, fn: 0 };

    this.accuracy = 0;
    this.recall = 0;
    this.precision = 0;
    this.f1score = 0;
  }

  async train(features: number[][], labels: number[]): Promise<void> {

    this.model.train(features, labels);
  }

  predict(input: number[][], labels: number[]) {
    const results = this.model.predict(input);

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