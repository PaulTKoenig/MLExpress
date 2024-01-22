export function convertStringToType(input: string): number | boolean | string {

    const convertedFloat = parseFloat(input);
    const convertedInteger = parseInt(input, 10);
    const convertedBoolean = input.toLowerCase() === 'true' ? true : input.toLowerCase() === 'false' ? false : null;

    if (!isNaN(convertedFloat)) {
        return convertedFloat;
    } else if (!isNaN(convertedInteger)) {
        return convertedInteger;
    } else if (convertedBoolean !== null) {
        return convertedBoolean;
    }

    // If no conversion is possible, return the original string
    return input;
}

export function getRandomExampleValue(values: any[]): any {
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex];
}

export function removeDuplicates(array: any[]) {
    const seen = new Set();
    return array.filter((obj) => {
        const stringifiedObj = JSON.stringify(obj);
        if (!seen.has(stringifiedObj)) {
            seen.add(stringifiedObj);
            return true;
        }
        return false;
    });
};

export function randomSplit(
    features: number[][],
    labels: number[],
    splitRatio: number = 0.8
): { train: { features: number[][]; labels: number[] }; test: { features: number[][]; labels: number[] } } {
    const totalSamples = features.length;
    const trainSize = Math.floor(totalSamples * splitRatio);

    // Create an array of indices representing the samples
    const indices = Array.from({ length: totalSamples }, (_, index) => index);

    // Shuffle the array of indices randomly
    for (let i = totalSamples - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    // Split the shuffled indices into training and testing indices
    const trainIndices = indices.slice(0, trainSize);
    const testIndices = indices.slice(trainSize);

    // Create training and testing sets based on the selected indices
    const trainFeatures = trainIndices.map(index => features[index]);
    const trainLabels = trainIndices.map(index => labels[index]);

    const testFeatures = testIndices.map(index => features[index]);
    const testLabels = testIndices.map(index => labels[index]);

    return {
        train: { features: trainFeatures, labels: trainLabels },
        test: { features: testFeatures, labels: testLabels },
    };
}