
import { getContent } from './src/services/contentService.js';

const verifyScienceContent = () => {
    const grades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4'];
    const methods = ['reading', 'writing', 'activity'];

    console.log("--- START DEBUG Science ---");

    grades.forEach(grade => {
        methods.forEach(method => {
            const params = { grade, subject: 'Science', method, level: 'Easy' };
            const result = getContent(params);

            console.log(`\nTesting ${grade} - Science - ${method}`);
            if (Array.isArray(result) && result.length > 0) {
                console.log(`Items count: ${result.length}`);
                console.log(`First item ID: ${result[0].id}`);
                console.log(`First item Q: ${result[0].question}`);
                console.log(`First item Type: ${result[0].type}`);
                if (method === 'reading') console.log(`First item Sentences: ${JSON.stringify(result[0].sentences)}`);
            } else {
                console.log("No result or empty array");
            }
        });
    });

    console.log("\n--- END DEBUG ---");
};

verifyScienceContent();
