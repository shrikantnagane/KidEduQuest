import { getContent } from './src/services/contentService.js';

console.log("--- START DEBUG Grade 3 & 4 ---");

const tests = [
    { grade: 'Grade 3', subject: 'English', method: 'reading', level: 'Hard' },
    { grade: 'Grade 3', subject: 'English', method: 'writing', level: 'Hard' },
    { grade: 'Grade 3', subject: 'English', method: 'activity', level: 'Medium' },
    { grade: 'Grade 4', subject: 'English', method: 'reading', level: 'Hard' },
    { grade: 'Grade 4', subject: 'English', method: 'writing', level: 'Hard' },
    { grade: 'Grade 4', subject: 'English', method: 'activity', level: 'Medium' }
];

tests.forEach(params => {
    console.log(`Testing ${params.grade} ${params.method} ${params.level}...`);
    try {
        const result = getContent(params);
        if (Array.isArray(result) && result.length > 0) {
            console.log(`Items count: ${result.length}`);
            console.log(`First item ID: ${result[0].id}`);
            console.log(`Type: ${result[0].type}`);
            if (result[0].count) console.log(`Count: ${result[0].count}`);

            // Check for creative activity
            const creative = result.find(i => i.type === 'creative');
            if (creative) console.log(`Found creative activity: ${creative.title}`);
        } else {
            console.log("No result or empty array");
        }
    } catch (e) {
        console.error(`ERROR: ${e.message}`);
    }
    console.log('---');
});

console.log("--- END DEBUG ---");
