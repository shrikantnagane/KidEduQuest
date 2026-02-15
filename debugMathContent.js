import { getContent } from './src/services/contentService.js';

console.log("--- START DEBUG Math ---");

const tests = [
    { grade: 'Grade 1', subject: 'Mathematics', method: 'reading', level: 'Easy' },
    { grade: 'Grade 1', subject: 'Mathematics', method: 'writing', level: 'Easy' },
    { grade: 'Grade 1', subject: 'Mathematics', method: 'activity', level: 'Easy' },

    { grade: 'Grade 2', subject: 'Mathematics', method: 'reading', level: 'Medium' },
    { grade: 'Grade 2', subject: 'Mathematics', method: 'writing', level: 'Hard' },

    { grade: 'Grade 3', subject: 'Mathematics', method: 'reading', level: 'Hard' },
    { grade: 'Grade 3', subject: 'Mathematics', method: 'activity', level: 'Medium' },

    { grade: 'Grade 4', subject: 'Mathematics', method: 'reading', level: 'Hard' },
    { grade: 'Grade 4', subject: 'Mathematics', method: 'writing', level: 'Hard' },
    { grade: 'Grade 4', subject: 'Mathematics', method: 'activity', level: 'Hard' }
];

tests.forEach(params => {
    console.log(`Testing ${params.grade} ${params.subject} ${params.method}...`);
    try {
        const result = getContent(params);
        if (Array.isArray(result) && result.length > 0) {
            console.log(`Items count: ${result.length}`);
            console.log(`First item ID: ${result[0].id}`);
            console.log(`First item Q: ${result[0].question}`);
            console.log(`First item Type: ${result[0].type}`);
            if (params.method === 'reading') console.log(`First item Sentences: ${JSON.stringify(result[0].sentences)}`);
        } else {
            console.log("No result or empty array");
        }
    } catch (e) {
        console.error(`ERROR: ${e.message}`);
    }
    console.log('---');
});

console.log("--- END DEBUG ---");
