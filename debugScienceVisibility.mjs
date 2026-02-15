
import { getContent } from './src/services/contentService.js';
import fs from 'fs';

const verify = () => {
    const grades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4'];
    const subjects = ['Science'];
    const methods = ['writing', 'activity'];
    let log = "--- START DEBUG VISIBILITY ---\n";

    grades.forEach(grade => {
        subjects.forEach(subject => {
            methods.forEach(method => {
                const params = { grade, subject, method, level: 'Easy' };
                try {
                    const result = getContent(params);
                    if (!result) {
                        log += `FAIL: ${grade} ${subject} ${method} returned ${result}\n`;
                    } else if (Array.isArray(result) && result.length === 0) {
                        log += `FAIL: ${grade} ${subject} ${method} returned EMPTY array\n`;
                    } else if (Array.isArray(result)) {
                        log += `PASS: ${grade} ${subject} ${method} returned ${result.length} items.\n`;
                        const first = result[0];
                        log += `   First Item: id=${first.id}, type=${first.type}, q=${first.question?.substring(0, 20)}...\n`;
                    } else {
                        log += `FAIL: ${grade} ${subject} ${method} returned unknown type: ${typeof result}\n`;
                    }
                } catch (e) {
                    log += `ERROR: ${grade} ${subject} ${method} threw error: ${e.message}\n`;
                }
            });
        });
    });
    log += "--- END DEBUG VISIBILITY ---\n";
    fs.writeFileSync('debug_results.log', log);
    console.log("Logged to debug_results.log");
};

verify();
