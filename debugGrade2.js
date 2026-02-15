import { getContent } from './src/services/contentService.js';

console.log("--- START DEBUG Grade 2 English ---");

const tests = [
    { grade: 'Grade 2', subject: 'English', method: 'reading', level: 'Hard' },
    { grade: 'Grade 2', subject: 'English', method: 'writing', level: 'Hard' },
    { grade: 'Grade 2', subject: 'English', method: 'activity', level: 'Medium' }
];

tests.forEach(params => {
    console.log(`Testing ${params.grade} ${params.method} ${params.level}...`);
    try {
        const result = getContent(params);
        if (Array.isArray(result) && result.length > 0) {
            console.log(`First item ID: ${result[0].id}`);
            console.log(`First item Title: ${JSON.stringify(result[0].title).substring(0, 50)}...`);
            if (result[0].options) console.log(`Options: ${result[0].options}`);
            if (result[0].count) console.log(`Writing lines: ${result[0].count}`);
        } else {
            console.log("No result or empty array");
        }
    } catch (e) {
        console.error(`ERROR: ${e.message}`);
    }
    console.log('---');
});

console.log("--- END DEBUG ---");
