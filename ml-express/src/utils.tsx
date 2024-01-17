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