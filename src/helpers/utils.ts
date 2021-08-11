export function capitalizeKeys(objects: any[]) {
    const capsObjects: any[] = [];
    objects.forEach(meeting => {
        const entries = Object.entries(meeting);
        const capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
        capsObjects.push(Object.fromEntries(capsEntries));
    })
    return capsObjects;
}

export function decapitalizeKeys(capsObject: any) {
    const entries = Object.entries(capsObject);
    const capsEntries = entries.map((entry) => [entry[0][0].toLowerCase() + entry[0].slice(1), entry[1]]);
    return Object.fromEntries(capsEntries);
}
