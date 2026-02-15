import { getContent } from './src/services/contentService.js';

console.log("--- START TEST ---");

try {
    const params = { grade: 'Jr. KG', subject: 'English', method: 'reading', level: 'Easy' };
    console.log("Calling getContent with:", JSON.stringify(params));
    const jrKgReading = getContent(params);
    console.log("Jr. KG Result Type:", Array.isArray(jrKgReading) ? "Array" : typeof jrKgReading);
    console.log("Jr. KG Result Length:", jrKgReading ? jrKgReading.length : 'null');
    if (jrKgReading && jrKgReading.length > 0) {
        console.log("First Item:", JSON.stringify(jrKgReading[0]));
    } else {
        console.log("Jr. KG Result is empty or null");
    }

    const paramsG1 = { grade: 'Grade 1', subject: 'English', method: 'reading', level: 'Easy' };
    console.log("Calling getContent with:", JSON.stringify(paramsG1));
    const grade1Reading = getContent(paramsG1);
    console.log("Grade 1 Result Length:", grade1Reading ? grade1Reading.length : 'null');

} catch (e) {
    console.error("ERROR:", e);
}

console.log("--- END TEST ---");
