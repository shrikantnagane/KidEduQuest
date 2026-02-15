/**
 * Advanced Content Service for KidEduQuest
 * Nursery Reading Curriculum Expansion with 100+ Variations
 */

const getSeededRandom = (seed) => {
    return () => {
        let t = (seed += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
};

const randomInt = (min, max, randFunc = Math.random) =>
    Math.floor(randFunc() * (max - min + 1)) + min;

const sample = (arr, randFunc = Math.random) => arr[Math.floor(randFunc() * arr.length)];

// --- NURSERY READING CURRICULUM ---

const generateNurseryReading = (level, count = 100) => {
    const content = [];
    const seedBase = `nursery-reading-${level}`;

    if (level === 'Easy') {
        const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        const associations = {
            'A': { word: 'Apple', emoji: '🍎' },
            'B': { word: 'Ball', emoji: '⚽' },
            'C': { word: 'Cat', emoji: '🐱' },
            'D': { word: 'Dog', emoji: '🐶' },
            'E': { word: 'Elephant', emoji: '🐘' },
            'F': { word: 'Fish', emoji: '🐟' },
            'G': { word: 'Goat', emoji: '🐐' },
            'H': { word: 'Hat', emoji: '🎩' },
            'I': { word: 'Igloo', emoji: '🛖' },
            'J': { word: 'Jam', emoji: '🍯' },
            'K': { word: 'Kite', emoji: '🪁' },
            'L': { word: 'Lion', emoji: '🦁' },
            'M': { word: 'Monkey', emoji: '🐒' },
            'N': { word: 'Nose', emoji: '👃' },
            'O': { word: 'Orange', emoji: '🍊' },
            'P': { word: 'Parrot', emoji: '🦜' },
            'Q': { word: 'Queen', emoji: '👸' },
            'R': { word: 'Rabbit', emoji: '🐇' },
            'S': { word: 'Sun', emoji: '☀️' },
            'T': { word: 'Tiger', emoji: '🐅' },
            'U': { word: 'Umbrella', emoji: '☂️' },
            'V': { word: 'Van', emoji: '🚐' },
            'W': { word: 'Watch', emoji: '⌚' },
            'X': { word: 'Xylophone', emoji: '🎹' },
            'Y': { word: 'Yo-yo', emoji: '🪀' },
            'Z': { word: 'Zebra', emoji: '🦓' }
        };

        for (let i = 0; i < count; i++) {
            const char = alphabets[i % alphabets.length];
            const assoc = associations[char] || { word: char, emoji: '✨' };
            content.push({
                id: `read-nursery-easy-${i}`,
                title: `Alphabet: ${char}`,
                sentences: [`${char} is for ${assoc.word} ${assoc.emoji}`],
                type: 'sentence',
                desc: `Master the letter ${char}!`
            });
        }
    } else if (level === 'Medium') {
        const wordPool = [
            { word: 'Cat', sentence: 'The cat is fat.' },
            { word: 'Dog', sentence: 'The dog can run.' },
            { word: 'Fan', sentence: 'The fan is fast.' },
            { word: 'Hat', sentence: 'He has a hat.' },
            { word: 'Sun', sentence: 'The sun is hot.' },
            { word: 'Pig', sentence: 'The pig is big.' },
            { word: 'Rat', sentence: 'A rat sat on a mat.' },
            { word: 'Bat', sentence: 'I have a bat.' },
            { word: 'Net', sentence: 'The net is red.' },
            { word: 'Pot', sentence: 'The pot is on the box.' }
        ];

        for (let i = 0; i < count; i++) {
            const rand = getSeededRandom(i + 1000);
            const choice = wordPool[i % wordPool.length];
            content.push({
                id: `read-nursery-med-${i}`,
                title: `Reading: ${choice.word}`,
                sentences: [`${choice.word}`, `${choice.sentence}`],
                type: 'sentence',
                desc: `Level up your reading skills!`
            });
        }
    } else {
        // HARD: 100 MCQs based on provided benchmarks
        const benchmarks = [
            {
                type: 'mcq-picture',
                category: 'Picture-Based MCQs',
                title: 'What is the boy playing with?',
                imageUrl: 'https://cdn.vectorstock.com/i/1000v/67/63/cute-cartoon-boy-with-red-ball-vector-38566763.jpg',
                options: ['Car', 'Ball', 'Kite'],
                answer: 'Ball',
                activity: 'Circle the correct answer. Color the object mentioned.'
            },
            {
                type: 'mcq-picture',
                category: 'Picture-Based MCQs',
                title: 'Where is the cat?',
                imageUrl: 'https://png.pngtree.com/png-clipart/20220121/ourlarge/pngtree-hand-drawn-cartoon-design-elements-cat-under-the-table-png-image_4279570.png',
                options: ['Under the table', 'On the tree', 'In the car'],
                answer: 'Under the table',
                activity: 'Count and write the number of animals you see.'
            },
            {
                type: 'mcq-picture',
                category: 'Picture-Based MCQs',
                title: 'What is the girl holding?',
                imageUrl: 'https://previews.123rf.com/images/nataliia2910/nataliia29102210/nataliia2910221000009/193203771-cute-little-kid-reading-book-vector-illustration-cartoon-isolated-happy-curious-preschool-girl.jpg',
                options: ['Book', 'Apple', 'Doll'],
                answer: 'Book',
                activity: 'Color the object mentioned in the question.'
            },
            {
                type: 'mcq-picture',
                category: 'Picture-Based MCQs',
                title: 'Where are they playing?',
                imageUrl: 'https://media3.colourbox.com/VXn1Udq0P5HgSDJEFcZjB4yM1zhO5QxspG3bfV8iZb8/resize%3Afit%3A800%3A800%3A1/q%3A70/aHR0cHM6Ly9tZWRpYS5jb2xvdXJib3guY29tL0dLZTFDSnhtSWYzT29FdjhEVGhJN1JSVDBWbDJhbkNVYzJBYm5uNTlKc2cvcmVzaXplOmZpdDoxNjAwOjE2MDA6MS9wbGFpbi9teXMzL2NvbG91cmJveC5wbG92cGVubmluZy5wcmV2aWV3LzE2MDBweF9DT0xPVVJCT1g0ODMxNDU4OC5qcGc%3D',
                options: ['Park', 'School', 'Kitchen'],
                answer: 'Park',
                activity: 'Count the number of trees in the park!'
            },
            {
                type: 'mcq-yesno',
                category: 'Yes / No MCQs',
                title: 'Is the apple red?',
                imageUrl: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80',
                options: ['Yes', 'No'],
                answer: 'Yes',
                activity: 'Show thumbs up 👍 for Yes'
            },
            {
                type: 'mcq-yesno',
                category: 'Yes / No MCQs',
                title: 'Is the sun green?',
                imageUrl: 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4c5?auto=format&fit=crop&w=400&q=80',
                options: ['Yes', 'No'],
                answer: 'No',
                activity: 'Show thumbs down 👎 for No'
            },
            {
                type: 'mcq-wh',
                category: 'Wh- Question MCQs',
                title: 'Who has a cat?',
                passage: 'Riya has a small cat. The cat is white. It is playing with a ball.',
                options: ['Riya', 'Amit', 'Tina'],
                answer: 'Riya',
                activity: 'Draw Riya and her cat.'
            },
            {
                type: 'mcq-wh',
                category: 'Wh- Question MCQs',
                title: 'What color is the cat?',
                passage: 'Riya has a small cat. The cat is white. It is playing with a ball.',
                options: ['Black', 'White', 'Brown'],
                answer: 'White',
                activity: 'Color the cat white.'
            },
            {
                type: 'mcq-action',
                category: 'Action Word MCQs',
                title: 'The boy is ______.',
                imageUrl: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=400&q=80',
                options: ['Sleeping', 'Running', 'Crying'],
                answer: 'Sleeping',
                activity: 'Act like the action word.'
            },
            {
                type: 'mcq-feeling',
                category: 'Feeling MCQs',
                title: 'The girl is smiling. She is ______.',
                options: ['Happy', 'Sad', 'Angry'],
                answer: 'Happy',
                activity: 'Draw happy, sad, and angry faces.'
            }
        ];

        for (let i = 0; i < count; i++) {
            const rand = getSeededRandom(i + 5000);
            const b = benchmarks[i % benchmarks.length];
            content.push({
                ...b,
                id: `read-nursery-hard-${i}`,
                desc: b.category
            });
        }
    }
    return content;
};

const generateNurseryMathReading = (level, count = 100) => {
    const mathPool = [
        // A. Counting
        { q: "Count 1 to 10.", a: "1, 2, 3, 4, 5, 6, 7, 8, 9, 10", cat: "Counting", diff: "Easy" },
        { q: "Count 1 to 20.", a: "1..20", cat: "Counting", diff: "Easy" },
        { q: "Count 5 apples. 🍎🍎🍎🍎🍎", a: "5", cat: "Counting", diff: "Easy" },
        { q: "Count 3 balls. ⚽⚽⚽", a: "3", cat: "Counting", diff: "Easy" },
        { q: "Count 7 stars. ⭐⭐⭐⭐⭐⭐⭐", a: "7", cat: "Counting", diff: "Easy" },
        { q: "Count 2 cats. 🐱🐱", a: "2", cat: "Counting", diff: "Easy" },
        { q: "Count 9 flowers. 🌸🌸🌸🌸🌸🌸🌸🌸", a: "9", cat: "Counting", diff: "Easy" },
        { q: "Count 4 birds. 🐦🐦🐦🐦", a: "4", cat: "Counting", diff: "Easy" },
        { q: "Count 6 pencils. ✏️✏️✏️✏️✏️✏️", a: "6", cat: "Counting", diff: "Easy" },
        { q: "Count 8 ducks. 🦆🦆🦆🦆🦆🦆🦆🦆", a: "8", cat: "Counting", diff: "Easy" },
        { q: "How many fingers do you have on one hand?", a: "5", cat: "Counting", diff: "Easy" },
        { q: "How many eyes do you have?", a: "2", cat: "Counting", diff: "Easy" },
        { q: "Count 10 toes.", a: "10", cat: "Counting", diff: "Easy" },
        { q: "Count 1 to 15.", a: "1..15", cat: "Counting", diff: "Easy" },
        { q: "Count 11 to 20.", a: "11..20", cat: "Counting", diff: "Easy" },
        { q: "Count 2 to 10.", a: "2, 3, 4, 5, 6, 7, 8, 9, 10", cat: "Counting", diff: "Easy" },
        { q: "Count backwards 10 to 1.", a: "10, 9, 8, 7, 6, 5, 4, 3, 2, 1", cat: "Counting", diff: "Easy" },
        { q: "Count 12 mangoes. 🥭", a: "12", cat: "Counting", diff: "Easy" },
        { q: "Count 14 stars. ⭐", a: "14", cat: "Counting", diff: "Easy" },
        { q: "Count 20 objects in the classroom.", a: "20", cat: "Counting", diff: "Easy" },

        // B. Number Recognition
        { q: "Write number 1.", a: "1", cat: "Recognition", diff: "Easy" },
        { q: "Write number 5.", a: "5", cat: "Recognition", diff: "Easy" },
        { q: "Write number 10.", a: "10", cat: "Recognition", diff: "Easy" },
        { q: "Circle number 3.", a: "3", cat: "Recognition", diff: "Easy" },
        { q: "Circle number 7.", a: "7", cat: "Recognition", diff: "Easy" },
        { q: "What comes after 4?", a: "5", cat: "Recognition", diff: "Easy" },
        { q: "What comes after 8?", a: "9", cat: "Recognition", diff: "Easy" },
        { q: "What comes before 6?", a: "5", cat: "Recognition", diff: "Easy" },
        { q: "What comes before 9?", a: "8", cat: "Recognition", diff: "Easy" },
        { q: "What comes between 2 and 4?", a: "3", cat: "Recognition", diff: "Easy" },
        { q: "What comes between 7 and 9?", a: "8", cat: "Recognition", diff: "Easy" },
        { q: "Show number 6 using fingers.", a: "6", cat: "Recognition", diff: "Easy" },
        { q: "Show number 9 using fingers.", a: "9", cat: "Recognition", diff: "Easy" },
        { q: "Which is bigger: 3 or 5?", a: "5", cat: "Recognition", diff: "Easy" },
        { q: "Which is smaller: 2 or 8?", a: "2", cat: "Recognition", diff: "Easy" },
        { q: "Write numbers 1 to 10.", a: "1..10", cat: "Recognition", diff: "Easy" },
        { q: "Write numbers 11 to 20.", a: "11..20", cat: "Recognition", diff: "Easy" },
        { q: "Match number 4 with four dots.", a: "4", cat: "Recognition", diff: "Easy" },
        { q: "Match number 8 with eight stars.", a: "8", cat: "Recognition", diff: "Easy" },
        { q: "Trace number 5.", a: "5", cat: "Recognition", diff: "Easy" },

        // C. Simple Addition
        { q: "1 + 1 = ___", a: "2", cat: "Addition", diff: "Medium" },
        { q: "2 + 1 = ___", a: "3", cat: "Addition", diff: "Medium" },
        { q: "3 + 1 = ___", a: "4", cat: "Addition", diff: "Medium" },
        { q: "2 + 2 = ___", a: "4", cat: "Addition", diff: "Medium" },
        { q: "4 + 1 = ___", a: "5", cat: "Addition", diff: "Medium" },
        { q: "5 + 1 = ___", a: "6", cat: "Addition", diff: "Medium" },
        { q: "3 + 2 = ___", a: "5", cat: "Addition", diff: "Medium" },
        { q: "6 + 1 = ___", a: "7", cat: "Addition", diff: "Medium" },
        { q: "7 + 1 = ___", a: "8", cat: "Addition", diff: "Medium" },
        { q: "4 + 2 = ___", a: "6", cat: "Addition", diff: "Medium" },
        { q: "5 + 2 = ___", a: "7", cat: "Addition", diff: "Medium" },
        { q: "3 + 3 = ___", a: "6", cat: "Addition", diff: "Medium" },
        { q: "6 + 2 = ___", a: "8", cat: "Addition", diff: "Medium" },
        { q: "8 + 1 = ___", a: "9", cat: "Addition", diff: "Medium" },
        { q: "9 + 1 = ___", a: "10", cat: "Addition", diff: "Medium" },

        // D. Simple Subtraction
        { q: "2 – 1 = ___", a: "1", cat: "Subtraction", diff: "Hard" },
        { q: "3 – 1 = ___", a: "2", cat: "Subtraction", diff: "Hard" },
        { q: "4 – 1 = ___", a: "3", cat: "Subtraction", diff: "Hard" },
        { q: "5 – 1 = ___", a: "4", cat: "Subtraction", diff: "Hard" },
        { q: "6 – 1 = ___", a: "5", cat: "Subtraction", diff: "Hard" },
        { q: "5 – 2 = ___", a: "3", cat: "Subtraction", diff: "Hard" },
        { q: "7 – 1 = ___", a: "6", cat: "Subtraction", diff: "Hard" },
        { q: "8 – 2 = ___", a: "6", cat: "Subtraction", diff: "Hard" },
        { q: "9 – 1 = ___", a: "8", cat: "Subtraction", diff: "Hard" },
        { q: "10 – 1 = ___", a: "9", cat: "Subtraction", diff: "Hard" },

        // E. Shapes
        { q: "Name this shape: ⭕", a: "Circle", cat: "Shapes", diff: "Easy" },
        { q: "Name this shape: ⬜", a: "Square", cat: "Shapes", diff: "Easy" },
        { q: "Name this shape: 🔺", a: "Triangle", cat: "Shapes", diff: "Easy" },
        { q: "Name this shape: ⭐", a: "Star", cat: "Shapes", diff: "Easy" },
        { q: "Draw a circle.", a: "⭕", cat: "Shapes", diff: "Easy" },
        { q: "Draw a square.", a: "⬜", cat: "Shapes", diff: "Easy" },
        { q: "Draw a triangle.", a: "🔺", cat: "Shapes", diff: "Easy" },
        { q: "Find a circle in the classroom.", a: "⭕", cat: "Shapes", diff: "Easy" },
        { q: "How many sides does a triangle have?", a: "3", cat: "Shapes", diff: "Easy" },
        { q: "How many sides does a square have?", a: "4", cat: "Shapes", diff: "Easy" },

        // F. Big & Small
        { q: "Which is big: Elephant 🐘 or Ant 🐜?", a: "Elephant 🐘", cat: "Comparison", diff: "Medium" },
        { q: "Which is small: Sun ☀️ or Star ⭐?", a: "Star ⭐", cat: "Comparison", diff: "Medium" },
        { q: "Tall or short? (Look at two pictures)", a: "Look closely!", cat: "Comparison", diff: "Medium" },
        { q: "Heavy or light? (Stone vs Feather)", a: "Stone (Heavy)", cat: "Comparison", diff: "Medium" },
        { q: "Long or short? (Pencil vs Eraser)", a: "Pencil (Long)", cat: "Comparison", diff: "Medium" },

        // G. Patterns
        { q: "Complete the pattern: 🔴🔵🔴🔵 ___", a: "🔴", cat: "Patterns", diff: "Medium" },
        { q: "1, 2, 1, 2, ___", a: "1", cat: "Patterns", diff: "Medium" },
        { q: "⭐⭐🌙⭐⭐🌙 ___", a: "⭐", cat: "Patterns", diff: "Medium" },
        { q: "3, 4, 3, 4, ___", a: "3", cat: "Patterns", diff: "Medium" },
        { q: "🔺⭕🔺⭕ ___", a: "🔺", cat: "Patterns", diff: "Medium" },

        // H. Color & Sorting
        { q: "Color 3 apples red.", a: "Done! 🍎🍎🍎", cat: "Color", diff: "Easy" },
        { q: "Color 2 balls blue.", a: "Done! 🔵🔵", cat: "Color", diff: "Easy" },
        { q: "Count red flowers. 🌹🌹🌹", a: "3", cat: "Color", diff: "Easy" },
        { q: "Circle the yellow sun. ☀️", a: "Done! ☀️", cat: "Color", diff: "Easy" },
        { q: "Sort big and small objects.", a: "Great Job!", cat: "Color", diff: "Easy" },

        // I. Word Problems
        { q: "You have 1 apple. Mom gives 1 more. How many apples?", a: "2", cat: "Word Problems", diff: "Hard" },
        { q: "There are 3 birds. 1 flies away. How many left?", a: "2", cat: "Word Problems", diff: "Hard" },
        { q: "You have 2 candies. You get 2 more. How many?", a: "4", cat: "Word Problems", diff: "Hard" },
        { q: "5 balloons. 1 bursts. How many left?", a: "4", cat: "Word Problems", diff: "Hard" },
        { q: "4 cats are playing. 1 sleeps. How many playing?", a: "3", cat: "Word Problems", diff: "Hard" },

        // J. Daily Life
        { q: "How many days in a week?", a: "7", cat: "Daily Life", diff: "Hard" },
        { q: "How many months in a year?", a: "12", cat: "Daily Life", diff: "Hard" },
        { q: "How many legs does a dog have?", a: "4", cat: "Daily Life", diff: "Hard" },
        { q: "How many wheels does a bicycle have?", a: "2", cat: "Daily Life", diff: "Hard" },
        { q: "How many sides does a rectangle have?", a: "4", cat: "Daily Life", diff: "Hard" }
    ];

    const content = [];
    const seedBase = `nursery-math-reading-${level}`;

    // Custom shuffle logic based on level
    let filteredPool = [];
    if (level === 'Easy') {
        filteredPool = mathPool.filter(q => q.diff === 'Easy' || q.cat === 'Counting' || q.cat === 'Recognition');
        count = 50;
    } else if (level === 'Medium') {
        filteredPool = mathPool.filter(q => q.diff === 'Medium' || q.cat === 'Addition' || q.cat === 'Patterns');
        count = 25;
    } else {
        filteredPool = mathPool.filter(q => q.diff === 'Hard' || q.cat === 'Subtraction' || q.cat === 'Word Problems');
        count = 25;
    }

    // Sort to ensure variety while keeping enough items
    const finalPool = (filteredPool.length > 0 ? filteredPool : mathPool).slice(0, count);

    for (let i = 0; i < finalPool.length; i++) {
        const item = finalPool[i];
        content.push({
            id: `math-read-nursery-${level.toLowerCase()}-${i}`,
            title: `Quest: ${item.cat}`,
            category: 'Mathematics',
            sentences: [item.q, `✨ Answer: ${item.a} ✨`],
            type: 'sentence',
            activity: 'Try answering before looking at the next page!',
            desc: `Master ${item.cat} skills!`
        });
    }

    return content;
};

// --- MAIN EXPORT ---

export const getContent = (params) => {
    const { grade, subject, level, method } = params;
    // Route by Method First (Reading, Writing, Activity, Games)
    if (method === 'reading') {
        if (grade === 'Nursery') {
            if (subject === 'Mathematics') return generateNurseryMathReading(level);
            if (subject === 'Science') return generateNurseryScienceReading(level);
            return generateNurseryReading(level);
        }
        if (grade === 'Jr. KG') {
            if (subject === 'English') return generateJrKgEnglishReading(level);
            if (subject === 'Science') return generateJrKgScienceReading(level);
            if (subject === 'Mathematics') return generateJrKgMathReading(level);
        }
        if (grade === 'Sr. KG') {
            if (subject === 'English') return generateSrKgEnglishReading(level);
            if (subject === 'Science') return generateSrKgScienceReading(level);
            if (subject === 'Mathematics') return generateSrKgMathReading(level);
        }

        if (grade === 'Grade 1') {
            if (subject === 'English') return generateGrade1EnglishReading(level);
            if (subject === 'Mathematics') return generateGrade1MathReading(level);
            if (subject === 'Science') return generateGrade1ScienceReading(level);
        }
        if (grade === 'Grade 2') {
            if (subject === 'English') return generateGrade2EnglishReading(level);
            if (subject === 'Mathematics') return generateGrade2MathReading(level);
            if (subject === 'Science') return generateGrade2ScienceReading(level);
        }
        if (grade === 'Grade 3') {
            if (subject === 'English') return generateGrade3EnglishReading(level);
            if (subject === 'Mathematics') return generateGrade3MathReading(level);
            if (subject === 'Science') return generateGrade3ScienceReading(level);
        }
        if (grade === 'Grade 4') {
            if (subject === 'English') return generateGrade4EnglishReading(level);
            if (subject === 'Mathematics') return generateGrade4MathReading(level);
            if (subject === 'Science') return generateGrade4ScienceReading(level);
        }

        return generateGradeReading(grade, level);
    }

    if (method === 'writing') {
        if (grade === 'Nursery') {
            if (subject === 'Mathematics') return generateNurseryMathWriting(level);
            if (subject === 'Science') return generateNurseryScienceWriting(level);
            return generateNurseryWriting(level);
        }
        if (grade === 'Jr. KG') {
            if (subject === 'English') return generateJrKgEnglishWriting(level);
            if (subject === 'Science') return generateJrKgScienceWriting(level);
            if (subject === 'Mathematics') return generateJrKgMathWriting(level);
        }
        if (grade === 'Sr. KG') {
            if (subject === 'English') return generateSrKgEnglishWriting(level);
            if (subject === 'Science') return generateSrKgScienceWriting(level);
            if (subject === 'Mathematics') return generateSrKgMathWriting(level);
        }
        if (grade === 'Grade 1') {
            if (subject === 'English') return generateGrade1EnglishWriting(level);
            if (subject === 'Mathematics') return generateGrade1MathWriting(level);
            if (subject === 'Science') return generateGrade1ScienceWriting(level);
        }
        if (grade === 'Grade 2') {
            if (subject === 'English') return generateGrade2EnglishWriting(level);
            if (subject === 'Mathematics') return generateGrade2MathWriting(level);
            if (subject === 'Science') return generateGrade2ScienceWriting(level);
        }
        if (grade === 'Grade 3') {
            if (subject === 'English') return generateGrade3EnglishWriting(level);
            if (subject === 'Mathematics') return generateGrade3MathWriting(level);
            if (subject === 'Science') return generateGrade3ScienceWriting(level);
        }
        if (grade === 'Grade 4') {
            if (subject === 'English') return generateGrade4EnglishWriting(level);
            if (subject === 'Mathematics') return generateGrade4MathWriting(level);
            if (subject === 'Science') return generateGrade4ScienceWriting(level);
        }

        return generateWritingContent(grade, level);
    }

    if (method === 'activity') {
        if (grade === 'Nursery') {
            if (subject === 'Mathematics') return generateNurseryMathActivity(level);
            return generateNurseryActivity(level);
        }
        if (grade === 'Jr. KG') {
            if (subject === 'English') return generateJrKgEnglishActivity(level);
            if (subject === 'Science') return generateJrKgScienceActivity(level);
            if (subject === 'Mathematics') return generateJrKgMathActivity(level);
        }
        if (grade === 'Grade 1') {
            if (subject === 'English') return generateGrade1EnglishActivity(level);
            if (subject === 'Mathematics') return generateGrade1MathActivity(level);
            if (subject === 'Science') return generateGrade1ScienceActivity(level);
        }
        if (grade === 'Grade 2') {
            if (subject === 'English') return generateGrade2EnglishActivity(level);
            if (subject === 'Mathematics') return generateGrade2MathActivity(level);
            if (subject === 'Science') return generateGrade2ScienceActivity(level);
        }
        if (grade === 'Grade 3') {
            if (subject === 'English') return generateGrade3EnglishActivity(level);
            if (subject === 'Mathematics') return generateGrade3MathActivity(level);
            if (subject === 'Science') return generateGrade3ScienceActivity(level);
        }
        if (grade === 'Grade 4') {
            if (subject === 'English') return generateGrade4EnglishActivity(level);
            if (subject === 'Mathematics') return generateGrade4MathActivity(level);
            if (subject === 'Science') return generateGrade4ScienceActivity(level);
        }
        if (grade === 'Sr. KG') {
            if (subject === 'English') return generateSrKgEnglishActivity(level);
            if (subject === 'Science') return generateSrKgScienceActivity(level);
            if (subject === 'Mathematics') return generateSrKgMathActivity(level);
        }

    }

    if (method === 'games') {
        if (grade === 'Nursery') {
            if (subject === 'Mathematics') return generateNurseryMathGames(level);
        }
        return generateGamesContent(grade, level);
    }

    // Grade-Subject Based Fallbacks
    if (subject === 'Mathematics') return generateMathContent(grade, level);
    if (subject === 'Science') return generateScienceContent(grade, level);
    if (subject === 'Coding') return generateCodingContent(grade, level);

    return [{ id: 'null', title: 'Start Quest!', desc: 'Begin your journey...', sentences: ['Welcome to KidEduQuest!'] }];
};

// --- OTHER GENERATORS ---

const generateGradeReading = (grade, level) => {
    return [{ id: `read-${grade}-${level}`, title: `${grade} Reading`, sentences: [`A nice story for ${grade}.`] }];
};

const generateNurseryMathWriting = (level, count = 100) => {
    const mathPool = [
        // A. Number Writing (1–20)
        { q: "Write number 1.", a: "1", cat: "Writing", diff: "Easy" },
        { q: "Write number 2.", a: "2", cat: "Writing", diff: "Easy" },
        { q: "Write number 3.", a: "3", cat: "Writing", diff: "Easy" },
        { q: "Write number 4.", a: "4", cat: "Writing", diff: "Easy" },
        { q: "Write number 5.", a: "5", cat: "Writing", diff: "Easy" },
        { q: "Write number 6.", a: "6", cat: "Writing", diff: "Easy" },
        { q: "Write number 7.", a: "7", cat: "Writing", diff: "Easy" },
        { q: "Write number 8.", a: "8", cat: "Writing", diff: "Easy" },
        { q: "Write number 9.", a: "9", cat: "Writing", diff: "Easy" },
        { q: "Write number 10.", a: "10", cat: "Writing", diff: "Easy" },
        { q: "Write numbers 1 to 5.", a: "1,2,3,4,5", cat: "Writing", diff: "Easy" },
        { q: "Write numbers 1 to 10.", a: "1,2,3,4,5,6,7,8,9,10", cat: "Writing", diff: "Easy" },
        { q: "Write numbers 5 to 10.", a: "5,6,7,8,9,10", cat: "Writing", diff: "Easy" },
        { q: "Write numbers 10 to 1.", a: "10,9,8,7,6,5,4,3,2,1", cat: "Writing", diff: "Easy" },
        { q: "Write numbers 11 to 15.", a: "11,12,13,14,15", cat: "Writing", diff: "Easy" },
        { q: "Write numbers 16 to 20.", a: "16,17,18,19,20", cat: "Writing", diff: "Easy" },
        { q: "Write numbers 1 to 20.", a: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20", cat: "Writing", diff: "Easy" },
        { q: "Write number after 4.", a: "5", cat: "Writing", diff: "Easy" },
        { q: "Write number after 9.", a: "10", cat: "Writing", diff: "Easy" },
        { q: "Write number before 6.", a: "5", cat: "Writing", diff: "Easy" },

        // B. Missing Numbers
        { q: "1, __, 3", a: "2", cat: "Missing", diff: "Easy" },
        { q: "2, 3, __", a: "4", cat: "Missing", diff: "Easy" },
        { q: "__, 5, 6", a: "4", cat: "Missing", diff: "Easy" },
        { q: "7, __, 9", a: "8", cat: "Missing", diff: "Easy" },
        { q: "8, 9, __", a: "10", cat: "Missing", diff: "Easy" },
        { q: "10, __, 12", a: "11", cat: "Missing", diff: "Easy" },
        { q: "__, 14, 15", a: "13", cat: "Missing", diff: "Easy" },
        { q: "16, __, 18", a: "17", cat: "Missing", diff: "Easy" },
        { q: "__, 19, 20", a: "18", cat: "Missing", diff: "Easy" },
        { q: "4, __, 6", a: "5", cat: "Missing", diff: "Easy" },

        // C. Simple Addition
        { q: "1 + 1 = ___", a: "2", cat: "Addition", diff: "Medium" },
        { q: "2 + 1 = ___", a: "3", cat: "Addition", diff: "Medium" },
        { q: "3 + 1 = ___", a: "4", cat: "Addition", diff: "Medium" },
        { q: "2 + 2 = ___", a: "4", cat: "Addition", diff: "Medium" },
        { q: "4 + 1 = ___", a: "5", cat: "Addition", diff: "Medium" },
        { q: "5 + 1 = ___", a: "6", cat: "Addition", diff: "Medium" },
        { q: "3 + 2 = ___", a: "5", cat: "Addition", diff: "Medium" },
        { q: "6 + 1 = ___", a: "7", cat: "Addition", diff: "Medium" },
        { q: "4 + 2 = ___", a: "6", cat: "Addition", diff: "Medium" },
        { q: "5 + 2 = ___", a: "7", cat: "Addition", diff: "Medium" },
        { q: "6 + 2 = ___", a: "8", cat: "Addition", diff: "Medium" },
        { q: "7 + 1 = ___", a: "8", cat: "Addition", diff: "Medium" },
        { q: "8 + 1 = ___", a: "9", cat: "Addition", diff: "Medium" },
        { q: "9 + 1 = ___", a: "10", cat: "Addition", diff: "Medium" },
        { q: "3 + 3 = ___", a: "6", cat: "Addition", diff: "Medium" },

        // D. Simple Subtraction
        { q: "2 – 1 = ___", a: "1", cat: "Subtraction", diff: "Hard" },
        { q: "3 – 1 = ___", a: "2", cat: "Subtraction", diff: "Hard" },
        { q: "4 – 1 = ___", a: "3", cat: "Subtraction", diff: "Hard" },
        { q: "5 – 1 = ___", a: "4", cat: "Subtraction", diff: "Hard" },
        { q: "6 – 1 = ___", a: "5", cat: "Subtraction", diff: "Hard" },
        { q: "5 – 2 = ___", a: "3", cat: "Subtraction", diff: "Hard" },
        { q: "7 – 1 = ___", a: "6", cat: "Subtraction", diff: "Hard" },
        { q: "8 – 2 = ___", a: "6", cat: "Subtraction", diff: "Hard" },
        { q: "9 – 1 = ___", a: "8", cat: "Subtraction", diff: "Hard" },
        { q: "10 – 1 = ___", a: "9", cat: "Subtraction", diff: "Hard" },

        // E. Shapes Writing
        { q: "Write the name of this shape: ⭕", a: "Circle", cat: "Shapes", diff: "Easy" },
        { q: "Write the name of this shape: ⬜", a: "Square", cat: "Shapes", diff: "Easy" },
        { q: "Write the name of this shape: 🔺", a: "Triangle", cat: "Shapes", diff: "Easy" },
        { q: "Draw a circle.", a: "Done", cat: "Shapes", diff: "Easy" },
        { q: "Draw a square.", a: "Done", cat: "Shapes", diff: "Easy" },
        { q: "Draw a triangle.", a: "Done", cat: "Shapes", diff: "Easy" },
        { q: "How many sides in a triangle?", a: "3", cat: "Shapes", diff: "Easy" },
        { q: "How many sides in a square?", a: "4", cat: "Shapes", diff: "Easy" },
        { q: "Draw a rectangle.", a: "Done", cat: "Shapes", diff: "Easy" },
        { q: "Write the name of shape with 4 sides.", a: "Square", cat: "Shapes", diff: "Easy" },

        // F. Big & Small
        { q: "Which is big: Elephant or Cat?", a: "Elephant", cat: "Comparison", diff: "Medium" },
        { q: "Which is small: Ant or Dog?", a: "Ant", cat: "Comparison", diff: "Medium" },
        { q: "Which number is bigger: 3 or 5?", a: "5", cat: "Comparison", diff: "Medium" },
        { q: "Which number is smaller: 2 or 8?", a: "2", cat: "Comparison", diff: "Medium" },
        { q: "Write big or small (Ball / Marble).", a: "Big", cat: "Comparison", diff: "Medium" },
        { q: "Write tall or short (Tree / Bush).", a: "Tall", cat: "Comparison", diff: "Medium" },
        { q: "Write heavy or light (Stone / Feather).", a: "Heavy", cat: "Comparison", diff: "Medium" },
        { q: "Write long or short (Pencil / Eraser).", a: "Long", cat: "Comparison", diff: "Medium" },
        { q: "Which has more: 5 or 2?", a: "5", cat: "Comparison", diff: "Medium" },
        { q: "Which has less: 1 or 7?", a: "1", cat: "Comparison", diff: "Medium" },

        // G. Patterns
        { q: "1, 2, 1, 2, ___", a: "1", cat: "Patterns", diff: "Medium" },
        { q: "3, 4, 3, 4, ___", a: "3", cat: "Patterns", diff: "Medium" },
        { q: "5, 6, 5, 6, ___", a: "5", cat: "Patterns", diff: "Medium" },
        { q: "7, 8, 7, 8, ___", a: "7", cat: "Patterns", diff: "Medium" },
        { q: "9, 10, 9, 10, ___", a: "9", cat: "Patterns", diff: "Medium" },

        // H. Counting & Writing
        { q: "Count 3 apples and write the number. 🍎🍎🍎", a: "3", cat: "Counting", diff: "Easy" },
        { q: "Count 5 stars and write the number. ⭐⭐⭐⭐⭐", a: "5", cat: "Counting", diff: "Easy" },
        { q: "Count 7 balls and write the number. ⚽⚽⚽⚽⚽⚽⚽", a: "7", cat: "Counting", diff: "Easy" },
        { q: "Count 2 birds and write the number. 🐦🐦", a: "2", cat: "Counting", diff: "Easy" },
        { q: "Count 9 flowers and write the number. 🌸🌸🌸🌸🌸🌸🌸🌸🌸", a: "9", cat: "Counting", diff: "Easy" },
        { q: "Draw 4 dots.", a: "Done", cat: "Counting", diff: "Easy" },
        { q: "Draw 6 stars.", a: "Done", cat: "Counting", diff: "Easy" },
        { q: "Draw 1 sun.", a: "Done", cat: "Counting", diff: "Easy" },
        { q: "Draw 8 circles.", a: "Done", cat: "Counting", diff: "Easy" },
        { q: "Draw 5 squares.", a: "Done", cat: "Counting", diff: "Easy" },

        // I. Simple Word Problems
        { q: "You have 1 apple. You get 1 more. How many apples?", a: "2", cat: "Word Problems", diff: "Hard" },
        { q: "3 birds are sitting. 1 flies away. How many left?", a: "2", cat: "Word Problems", diff: "Hard" },
        { q: "You have 2 candies. You get 2 more. How many?", a: "4", cat: "Word Problems", diff: "Hard" },
        { q: "5 balloons. 1 bursts. How many left?", a: "4", cat: "Word Problems", diff: "Hard" },
        { q: "4 cats are playing. 1 goes away. How many left?", a: "3", cat: "Word Problems", diff: "Hard" },

        // J. Daily Math Writing
        { q: "How many days in a week?", a: "7", cat: "Daily Life", diff: "Hard" },
        { q: "How many months in a year?", a: "12", cat: "Daily Life", diff: "Hard" },
        { q: "How many legs does a dog have?", a: "4", cat: "Daily Life", diff: "Hard" },
        { q: "How many wheels does a bicycle have?", a: "2", cat: "Daily Life", diff: "Hard" },
        { q: "How many sides does a rectangle have?", a: "4", cat: "Daily Life", diff: "Hard" }
    ];

    const content = [];
    const seedBase = `nursery-math-writing-${level}`;

    let filteredPool = [];
    if (level === 'Easy') {
        filteredPool = mathPool.filter(q => q.diff === 'Easy' || q.cat === 'Writing' || q.cat === 'Missing');
        count = 50;
    } else if (level === 'Medium') {
        filteredPool = mathPool.filter(q => q.diff === 'Medium' || q.cat === 'Addition' || q.cat === 'Patterns');
        count = 25;
    } else {
        filteredPool = mathPool.filter(q => q.diff === 'Hard' || q.cat === 'Subtraction' || q.cat === 'Word Problems');
        count = 25;
    }

    const finalPool = filteredPool.slice(0, count);

    for (let i = 0; i < finalPool.length; i++) {
        const item = finalPool[i];
        content.push({
            id: `math-write-nursery-${level.toLowerCase()}-${i}`,
            title: item.cat,
            type: 'math-writing',
            question: item.q,
            answer: item.a,
            target: item.a,
            desc: `Write the correct number or word!`
        });
    }

    return content;
};

// --- NURSERY WRITING CURRICULUM ---

const generateNurseryWriting = (level, count = 100) => {
    const content = [];
    const seedBase = `nursery-writing-${level}`;
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    if (level === 'Easy') {
        const wordPool = ['CAT', 'DOG', 'SUN', 'BAT', 'FAN', 'HAT', 'PIG', 'BUS', 'CUP', 'BED'];
        for (let i = 0; i < count; i++) {
            const rand = getSeededRandom(i + 10000);
            const type = randomInt(0, 2, rand); // 0: missing letter, 1: sequence, 2: missing alpha

            if (type === 0) {
                const word = sample(wordPool, rand);
                const idx = randomInt(0, word.length - 1, rand);
                const display = word.split('').map((c, j) => j === idx ? '_' : c).join(' ');
                content.push({
                    id: `write-nursery-easy-${i}`,
                    type: 'missing-letter',
                    title: 'Write Missing Letter',
                    question: display,
                    answer: word[idx],
                    target: word[idx],
                    desc: 'Fill in the blank!'
                });
            } else if (type === 1) {
                const startIdx = randomInt(0, alphabets.length - 4, rand);
                const seq = alphabets.slice(startIdx, startIdx + 4);
                const missingIdx = randomInt(0, 3, rand);
                const ans = seq[missingIdx];
                seq[missingIdx] = '_';
                content.push({
                    id: `write-nursery-easy-${i}`,
                    type: 'alphabet-sequence',
                    title: 'Alphabet Sequence',
                    question: seq.join(' '),
                    answer: ans,
                    target: ans,
                    desc: 'What comes in the line?'
                });
            } else {
                const char = alphabets[randomInt(0, alphabets.length - 1, rand)];
                content.push({
                    id: `write-nursery-easy-${i}`,
                    type: 'alpha-identification',
                    title: 'Write the Letter',
                    question: `Write the letter '${char}'`,
                    answer: char,
                    target: char,
                    desc: 'Copy the letter!'
                });
            }
        }
    } else if (level === 'Medium') {
        const assets = [
            { word: 'APPLE', img: '🍎' }, { word: 'BALL', img: '⚽' }, { word: 'CAT', img: '🐱' },
            { word: 'DOG', img: '🐶' }, { word: 'EGG', img: '🥚' }, { word: 'FISH', img: '🐟' },
            { word: 'GIRL', img: '👧' }, { word: 'HAT', img: '🎩' }, { word: 'ICE', img: '🧊' },
            { word: 'JAM', img: '🍯' }
        ];
        const sentences = ['The sun is up.', 'The cat is fat.', 'I like cake.', 'A red ball.'];

        for (let i = 0; i < count; i++) {
            const rand = getSeededRandom(i + 20000);
            const type = randomInt(0, 1, rand); // 0: first letter, 1: transcription

            if (type === 0) {
                const item = sample(assets, rand);
                content.push({
                    id: `write-nursery-med-${i}`,
                    type: 'first-letter',
                    title: 'First Letter',
                    emoji: item.img,
                    wordEnd: item.word.slice(1).toLowerCase(),
                    answer: item.word[0],
                    target: item.word[0],
                    desc: `What is the first letter of ${item.word}?`
                });
            } else {
                const s = sample(sentences, rand);
                content.push({
                    id: `write-nursery-med-${i}`,
                    type: 'transcription',
                    title: 'Copy the Sentence',
                    question: s,
                    answer: s,
                    target: s,
                    desc: 'Type exactly what you see!'
                });
            }
        }
    } else {
        // HARD: 100 questions including the specific benchmarks
        const wordPool = ['CAT', 'DOG', 'SUN', 'BAT', 'FISH'];
        const matchingAssets = [
            { word: 'apple', img: 'https://i.etsystatic.com/31569800/r/il/083b30/6359074842/il_1080xN.6359074842_2x8i.jpg' },
            { word: 'dog', img: 'https://i.pinimg.com/736x/0b/bf/1e/0bbf1e360a88449bbccc98c3f12fe375.jpg' },
            { word: 'ball', img: 'https://i.pinimg.com/736x/65/d0/ca/65d0cae6085b7048071964c50e33809e.jpg' },
            { word: 'sun', img: 'https://png.pngtree.com/png-clipart/20240314/original/pngtree-cartoon-yellow-sun-png-image_14582566.png' },
            { word: 'fish', img: 'https://png.pngtree.com/png-vector/20250307/ourlarge/pngtree-bright-yellow-sun-with-a-smiley-face-for-kids-and-weather-png-image_15746046.png' }
        ];

        for (let i = 0; i < count; i++) {
            const rand = getSeededRandom(i + 30000);
            const type = randomInt(0, 4, rand); // benchmark types

            if (type === 0) { // Missing letters list
                content.push({
                    id: `write-nursery-hard-${i}`,
                    type: 'multi-missing',
                    title: 'Write Missing Letters',
                    items: wordPool.map(w => {
                        const idx = randomInt(0, w.length - 1, rand);
                        return { display: w.split('').map((c, j) => j === idx ? '_' : c).join(' '), ans: w[idx], full: w };
                    }),
                    desc: 'Complete the words!'
                });
            } else if (type === 1) { // Match word to picture
                const item = sample(matchingAssets, rand);
                content.push({
                    id: `write-nursery-hard-${i}`,
                    type: 'match-word',
                    title: 'Match the Picture',
                    imageUrl: item.img,
                    answer: item.word,
                    target: item.word,
                    desc: 'Write the correct word!'
                });
            } else if (type === 2) { // First letter list
                content.push({
                    id: `write-nursery-hard-${i}`,
                    type: 'multi-first',
                    title: 'Write First Letters',
                    items: matchingAssets.map(a => ({ display: `___ ${a.word.slice(1)}`, ans: a.word[0].toUpperCase() })),
                    desc: 'Fill in the first letters!'
                });
            } else if (type === 3) { // Circle correct word
                const item = sample(matchingAssets, rand);
                const distractors = ['cat', 'moon', 'bird', 'mango'];
                const dist = distractors[randomInt(0, distractors.length - 1, rand)];
                content.push({
                    id: `write-nursery-hard-${i}`,
                    type: 'choose-word',
                    title: 'Choose the Word',
                    imageUrl: item.img,
                    options: [item.word, dist].sort(() => 0.5 - rand()),
                    answer: item.word,
                    target: item.word,
                    desc: 'Which word matches the picture?'
                });
            } else { // Write 3 words
                content.push({
                    id: `write-nursery-hard-${i}`,
                    type: 'free-write',
                    title: 'Write 3 Words',
                    answer: '3WORDS',
                    target: '3WORDS',
                    desc: 'Write any three words you know!'
                });
            }
        }
    }
    return content;
};

const generateNurseryActivity = (level, count = 100) => {
    const content = [];
    const seedBase = `nursery-activity-${level}`;

    const alphabetHuntAssets = [
        { letter: 'A', emoji: '🍎', prompt: 'Find the letter A for Apple!' },
        { letter: 'B', emoji: '🎈', prompt: 'Where is the letter B for Balloons?' },
        { letter: 'C', emoji: '🐱', prompt: 'Can you spot the letter C for Cat?' },
        { letter: 'D', emoji: '🐶', prompt: 'Find the letter D for Dog!' },
        { letter: 'E', emoji: '🐘', prompt: 'Where is the letter E for Elephant?' },
        { letter: 'F', emoji: '🐟', prompt: 'Can you see the letter F for Fish?' },
        { letter: 'G', emoji: '🦒', prompt: 'Find the letter G for Giraffe!' },
        { letter: 'H', emoji: '🏠', prompt: 'Where is the letter H for House?' },
        { letter: 'I', emoji: '🍦', prompt: 'Can you find the letter I for Ice Cream?' },
        { letter: 'J', emoji: '🍯', prompt: 'Find the letter J for Jam!' },
        { letter: 'K', emoji: '🪁', prompt: 'Where is the letter K for Kite?' },
        { letter: 'L', emoji: '🦁', prompt: 'Can you see the letter L for Lion?' },
        { letter: 'M', emoji: '🐵', prompt: 'Find the letter M for Monkey!' },
        { letter: 'N', emoji: '👃', prompt: 'Where is the letter N for Nose?' },
        { letter: 'O', emoji: '🍊', prompt: 'Can you spot the letter O for Orange?' },
        { letter: 'P', emoji: '🐼', prompt: 'Find the letter P for Panda!' },
        { letter: 'Q', emoji: '👸', prompt: 'Where is the letter Q for Queen?' },
        { letter: 'R', emoji: '🚀', prompt: 'Can you find the letter R for Rocket?' },
        { letter: 'S', emoji: '☀️', prompt: 'Find the letter S for Sun!' },
        { letter: 'T', emoji: '🐯', prompt: 'Where is the letter T for Tiger?' },
        { letter: 'U', emoji: '☂️', prompt: 'Can you see the letter U for Umbrella?' },
        { letter: 'V', emoji: '🎻', prompt: 'Find the letter V for Violin!' },
        { letter: 'W', emoji: '⌚', prompt: 'Where is the letter W for Watch?' },
        { letter: 'X', emoji: '🪗', prompt: 'Can you spot the letter X for Xylophone?' },
        { letter: 'Y', emoji: '🪀', prompt: 'Find the letter Y for Yo-yo!' },
        { letter: 'Z', emoji: '🦓', prompt: 'Where is the letter Z for Zebra?' }
    ];

    const phonicsAssets = [
        { sound: 'A', emoji: '🍎', word: 'Apple' },
        { sound: 'B', emoji: '🐻', word: 'Bear' },
        { sound: 'C', emoji: '🐱', word: 'Cat' },
        { sound: 'D', emoji: '🐶', word: 'Dog' },
        { sound: 'E', emoji: '🐘', word: 'Elephant' },
        { sound: 'F', emoji: '🐟', word: 'Fish' },
        { sound: 'G', emoji: '🦒', word: 'Giraffe' },
        { sound: 'H', emoji: '🏠', word: 'House' },
        { sound: 'I', emoji: '🍦', word: 'Ice Cream' },
        { sound: 'J', emoji: '🎴', word: 'Joker' },
        { sound: 'K', emoji: '🪁', word: 'Kite' },
        { sound: 'L', emoji: '🦁', word: 'Lion' },
        { sound: 'M', emoji: '🐵', word: 'Monkey' },
        { sound: 'N', emoji: '👃', word: 'Nose' },
        { sound: 'O', emoji: '🍊', word: 'Orange' },
        { sound: 'P', emoji: '🍎', word: 'Pear' }, // Using Peach/Pear similar
        { sound: 'P', emoji: '🍐', word: 'Pear' },
        { sound: 'Q', emoji: '👸', word: 'Queen' },
        { sound: 'R', emoji: '🚀', word: 'Rocket' },
        { sound: 'S', emoji: '☀️', word: 'Sun' },
        { sound: 'T', emoji: '🐯', word: 'Tiger' },
        { sound: 'U', emoji: '☂️', word: 'Umbrella' },
        { sound: 'V', emoji: '🎻', word: 'Violin' },
        { sound: 'W', emoji: '⌚', word: 'Watch' },
        { sound: 'X', emoji: '🪗', word: 'Xylophone' },
        { sound: 'Y', emoji: '🪀', word: 'Yo-yo' },
        { sound: 'Z', emoji: '🦓', word: 'Zebra' }
    ];

    const storyImages = [
        'https://i.pinimg.com/736x/43/33/31/4333318f8a8e4e1a8a8e4f1a8a8e4f1a.jpg',
        'https://www.nurseryworld.co.uk/media/rhvliiet/storytelling-5.jpg?bgcolor=White&height=668&v=1da4dc6714176f0&width=1002',
        'https://us.images.westend61.de/0000950927pw/young-children-sitting-on-carpet-in-classroom-listening-to-teacher-at-front-of-class-ISF03218.jpg',
        'https://cdn.vectorstock.com/i/1000v/39/08/kids-listening-to-teacher-vector-26673908.jpg'
    ];

    const rhymes = [
        { title: 'Twinkle Twinkle', line: 'Twinkle, twinkle, little star,\nHow I wonder what you are!\nUp above the world so high,\nLike a diamond in the sky.' },
        { title: 'ABC Song', line: 'A B C D E F G,\nH I J K L M N O P,\nQ R S, T U V,\nW X, Y and Z.' },
        { title: 'Baa Baa Black Sheep', line: 'Baa, baa, black sheep,\nHave you any wool?\nYes sir, yes sir,\nThree bags full.' },
        { title: 'Humpty Dumpty', line: 'Humpty Dumpty sat on a wall,\nHumpty Dumpty had a great fall.\nAll the king\'s horses and all the king\'s men,\nCouldn\'t put Humpty together again.' },
        { title: 'London Bridge', line: 'London Bridge is falling down,\nFalling down, falling down.\nLondon Bridge is falling down,\nMy fair lady.' },
        { title: 'Mary Had a Little Lamb', line: 'Mary had a little lamb,\nIts fleece was white as snow.\nAnd everywhere that Mary went,\nThe lamb was sure to go.' },
        { title: 'Old MacDonald', line: 'Old MacDonald had a farm, E-I-E-I-O!\nAnd on his farm he had a cow, E-I-E-I-O!\nWith a moo-moo here and a moo-moo there,\nEverywhere a moo-moo!' },
        { title: 'Row Your Boat', line: 'Row, row, row your boat,\nGently down the stream.\nMerrily, merrily, merrily, merrily,\nLife is but a dream.' },
        { title: 'Itsy Bitsy Spider', line: 'The itsy bitsy spider\nClimbed up the waterspout.\nDown came the rain\nAnd washed the spider out.' },
        { title: 'Rain Rain Go Away', line: 'Rain, rain, go away,\nCome again another day.\nLittle Johnny wants to play,\nRain, rain, go away.' },
        { title: 'Happy and You Know It', line: 'If you\'re happy and you know it, clap your hands!\nIf you\'re happy and you know it, clap your hands!\nIf you\'re happy and you know it, and you really want to show it,\nIf you\'re happy and you know it, clap your hands!' },
        { title: 'Wheels on the Bus', line: 'The wheels on the bus go round and round,\nRound and round, round and round.\nThe wheels on the bus go round and round,\nAll day long.' },
        { title: 'Five Little Ducks', line: 'Five little ducks went out one day,\nOver the hill and far away.\nMother duck said, "Quack, quack, quack, quack,"\nBut only four little ducks came back.' },
        { title: 'Hickory Dickory Dock', line: 'Hickory, dickory, dock,\nThe mouse ran up the clock.\nThe clock struck one, the mouse ran down,\nHickory, dickory, dock.' },
        { title: 'Jack and Jill', line: 'Jack and Jill went up the hill\nTo fetch a pail of water.\nJack fell down and broke his crown,\nAnd Jill came tumbling after.' }
    ];

    // SCALE CATEGORIES BY DIFFICULTY
    let availableCategories = [];
    if (level === 'Easy') {
        availableCategories = [
            { name: 'Alphabet Fun', type: 'alpha-fun', prompts: ['Air Writing', 'Alphabet Hunt', 'Trace the Letter'] },
            { name: 'Action Game', type: 'action', prompts: ['Jump High!', 'Clap your hands!', 'Run in place!'] },
            { name: 'Rhyme Time', type: 'rhyme', prompts: ['Sing-along with teacher'] }
        ];
    } else if (level === 'Medium') {
        availableCategories = [
            { name: 'Phonics Sound', type: 'phonics', prompts: ['Beginning Sound', 'Match picture to letter'] },
            { name: 'Matching Fun', type: 'matching', prompts: ['Match Word to Picture', 'Color the object'] },
            { name: 'Alphabet Fun', type: 'alpha-fun', prompts: ['Find all letter As'] }
        ];
    } else {
        availableCategories = [
            { name: 'Story Time', type: 'story', prompts: ['Listen & Answer Who?', 'What happened?', 'Act like character'] },
            { name: 'Opposites', type: 'opposite', prompts: ['Big vs Small', 'Hot vs Cold', 'Up vs Down', 'Happy vs Sad'] },
            { name: 'Rhyme Time', type: 'rhyme', prompts: ['Fill the missing word'] },
            { name: 'Phonics Sound', type: 'phonics', prompts: ['Sound Basket Game'] }
        ];
    }

    for (let i = 0; i < count; i++) {
        const rand = getSeededRandom(i + (level === 'Easy' ? 40000 : level === 'Medium' ? 50000 : 60000));
        const cat = sample(availableCategories, rand);
        const item = {
            id: `act-nursery-${level.toLowerCase()}-${i}`,
            title: cat.name,
            type: cat.type,
            category: cat.name,
            activity: sample(cat.prompts, rand),
            desc: sample(cat.prompts, rand)
        };

        if (cat.type === 'alpha-fun') {
            const asset = sample(alphabetHuntAssets, rand);
            item.emoji = asset.emoji; // Use stabilized emoji
            item.target = asset.letter;
            item.activity = asset.prompt;
            item.desc = asset.prompt;
        } else if (cat.type === 'phonics') {
            const asset = sample(phonicsAssets, rand);
            item.emoji = asset.emoji; // Use emoji as primary visual
            item.target = asset.sound;
            item.question = `What sound does "${asset.word}" start with?`;
            item.options = [asset.sound, ...sample(['S', 'T', 'M', 'P', 'D', 'G', 'B'].filter(l => l !== asset.sound), rand).slice(0, 2)].sort();
            if (level === 'Hard') item.desc = "Identify the starting sound in the basket!";
        } else if (cat.type === 'story') {
            item.imageUrl = sample(storyImages, rand);
            const questions = ['Who is in the story?', 'What are they doing?', 'How do they feel?', 'What is the teacher holding?'];
            item.question = sample(questions, rand);
        } else if (cat.type === 'rhyme') {
            const r = sample(rhymes, rand);
            item.question = r.line;
            item.title = r.title;
            item.target = "Done"; // Neutral target for win condition
        } else if (cat.type === 'opposite') {
            const pairs = [['Big', 'Small'], ['🐘', '🐜'], ['🔥', '❄️'], ['🆙', '⬇️'], ['😄', '😢'], ['🐇', '🐢']];
            const p = sample(pairs, rand);
            item.question = `Which emoji is the opposite of ${p[0]}?`;
            item.answer = p[1];
            item.target = p[1];
        } else if (cat.type === 'action') {
            const actions = ['Jump 🦘', 'Clap 👏', 'Run 🏃', 'Sit 🪑', 'Touch your toes 🦶', 'Spin around 🌀'];
            item.question = 'Perform the action: ' + sample(actions, rand);
        } else if (cat.type === 'matching') {
            const assets = [
                { word: 'Apple', emoji: '🍎' },
                { word: 'Dog', emoji: '🐶' },
                { word: 'Ball', emoji: '⚽' },
                { word: 'Sun', emoji: '☀️' },
                { word: 'Car', emoji: '🚗' },
                { word: 'Flower', emoji: '🌸' }
            ];
            const m = sample(assets, rand);
            item.emoji = m.emoji;
            item.target = m.word;
            item.options = [m.word, sample(['Hat', 'Cup', 'Box', 'Pen', 'Book'], rand)].sort(() => 0.5 - rand());
            item.question = 'Which word matches the emoji?';
        }

        content.push(item);
    }
    return content;
};

const generateNurseryMathActivity = (level, count = 100) => {
    const activityPool = [
        // 1. Counting (Easy - 5)
        { q: "Count the apples. How many are there? 🍎🍎🍎", a: "3", cat: "Counting", diff: "Easy" },
        { q: "Count the stars. How many are there? ⭐⭐⭐⭐⭐", a: "5", cat: "Counting", diff: "Easy" },
        { q: "Count the balls. How many are there? ⚽⚽", a: "2", cat: "Counting", diff: "Easy" },
        { q: "Count the flowers. How many are there? 🌸🌸🌸🌸", a: "4", cat: "Counting", diff: "Easy" },
        { q: "Count your fingers on one hand. How many? 🖐️", a: "5", cat: "Counting", diff: "Easy" },

        // 2. Addition (Medium - 10)
        { q: "Take 2 blocks 🧱🧱. Add 1 more 🧱. How many now?", a: "3", cat: "Addition", diff: "Medium" },
        { q: "Draw 3 circles 🔴🔴🔴. Add 2 more 🔴🔴. How many?", a: "5", cat: "Addition", diff: "Medium" },
        { q: "1 apple 🍎 + 1 apple 🍎 = ?", a: "2", cat: "Addition", diff: "Medium" },
        { q: "4 balloons 🎈🎈🎈🎈 + 1 balloon 🎈 = ?", a: "5", cat: "Addition", diff: "Medium" },
        { q: "Show 5 fingers 🖐️ + 1 finger ☝️. How many?", a: "6", cat: "Addition", diff: "Medium" },
        { q: "3 ducks 🦆🦆🦆 + 3 ducks 🦆🦆🦆 = ?", a: "6", cat: "Addition", diff: "Medium" },
        { q: "2 cars 🚗🚗 + 2 cars 🚗🚗 = ?", a: "4", cat: "Addition", diff: "Medium" },
        { q: "1 cat 🐱 + 3 cats 🐱🐱🐱 = ?", a: "4", cat: "Addition", diff: "Medium" },
        { q: "5 stars ⭐⭐⭐⭐⭐ + 2 stars ⭐⭐ = ?", a: "7", cat: "Addition", diff: "Medium" },
        { q: "4 bees 🐝🐝🐝🐝 + 2 bees 🐝🐝 = ?", a: "6", cat: "Addition", diff: "Medium" },

        // 3. Subtraction (Hard - 5)
        { q: "3 candies 🍬🍬🍬. Eat 1 🍬. How many left?", a: "2", cat: "Subtraction", diff: "Hard" },
        { q: "5 birds 🐦🐦🐦🐦🐦. 1 flies away. How many left?", a: "4", cat: "Subtraction", diff: "Hard" },
        { q: "6 toys 🧸🧸🧸🧸🧸🧸. Remove 2. How many?", a: "4", cat: "Subtraction", diff: "Hard" },
        { q: "4 stars ⭐⭐⭐⭐. Cross 1. How many remain?", a: "3", cat: "Subtraction", diff: "Hard" },
        { q: "2 balls ⚽⚽. Take away 1. How many left?", a: "1", cat: "Subtraction", diff: "Hard" },

        // 4. Shapes (Easy - 5)
        { q: "Is this shape a circle? ⭕ (Type Yes/No)", a: "Yes", cat: "Shapes", diff: "Easy" },
        { q: "How many sides does a triangle have? 🔺", a: "3", cat: "Shapes", diff: "Easy" },
        { q: "How many corners does a square have? ⬛", a: "4", cat: "Shapes", diff: "Easy" },
        { q: "What shape is this? 🟦 (Square or Circle)", a: "Square", cat: "Shapes", diff: "Easy" },
        { q: "Which shape has no corners? 🔺 or ⭕", a: "Circle", cat: "Shapes", diff: "Easy" },

        // 5. Comparison (Easy - 5)
        { q: "Which is big: Elephant 🐘 or Ant 🐜?", a: "Elephant", cat: "Comparison", diff: "Easy" },
        { q: "Which is small: Mouse 🐭 or Lion 🦁?", a: "Mouse", cat: "Comparison", diff: "Easy" },
        { q: "Which number is bigger: 3 or 6?", a: "6", cat: "Comparison", diff: "Easy" },
        { q: "Which number is smaller: 2 or 9?", a: "2", cat: "Comparison", diff: "Easy" },
        { q: "Is a giraffe 🦒 tall or short?", a: "Tall", cat: "Comparison", diff: "Easy" },

        // 6. Patterns (Medium - 10)
        { q: "Complete: 🍎🔵🍎🔵 ___", a: "🍎", cat: "Patterns", diff: "Medium" },
        { q: "1, 2, 1, 2, ___", a: "1", cat: "Patterns", diff: "Medium" },
        { q: "⭐🌙⭐🌙 ___", a: "⭐", cat: "Patterns", diff: "Medium" },
        { q: "3, 4, 3, 4, ___", a: "3", cat: "Patterns", diff: "Medium" },
        { q: "Complete: 🐱🐶🐱🐶 ___", a: "🐱", cat: "Patterns", diff: "Medium" },
        { q: "A, B, A, B, ___", a: "A", cat: "Patterns", diff: "Medium" },
        { q: "🔴🟡🔴🟡 ___", a: "🔴", cat: "Patterns", diff: "Medium" },
        { q: "5, 6, 5, 6, ___", a: "5", cat: "Patterns", diff: "Medium" },
        { q: "Up, Down, Up, Down, ___", a: "Up", cat: "Patterns", diff: "Medium" },
        { q: "Happy, Sad, Happy, Sad, ___", a: "Happy", cat: "Patterns", diff: "Medium" },

        // 7. Sorting (Easy - 5)
        { q: "Should an 🍎 go with Fruits or Toys?", a: "Fruits", cat: "Sorting", diff: "Easy" },
        { q: "Is a 🧸 a Toy or a Snack?", a: "Toy", cat: "Sorting", diff: "Easy" },
        { q: "Put 3 apples 🍎🍎🍎 in a group. How many apples?", a: "3", cat: "Sorting", diff: "Easy" },
        { q: "Group A: 🍎🍎, Group B: 🍎. Which has more?", a: "Group A", cat: "Sorting", diff: "Easy" },
        { q: "Group A: ⭐, Group B: ⭐⭐. Which has less?", a: "Group A", cat: "Sorting", diff: "Easy" },

        // 8. Word Problems (Hard - 5)
        { q: "You have 1 mango. Mom gives 1 more. How many? 🥭", a: "2", cat: "Word Problems", diff: "Hard" },
        { q: "4 cats are playing. 1 sleeps. How many playing? 🐱", a: "3", cat: "Word Problems", diff: "Hard" },
        { q: "2 birds on a tree. 2 more come. How many? 🐦", a: "4", cat: "Word Problems", diff: "Hard" },
        { q: "5 balloons. 2 burst 💥. How many left? 🎈", a: "3", cat: "Word Problems", diff: "Hard" },
        { q: "3 pencils. Add 1 more. How many? ✏️", a: "4", cat: "Word Problems", diff: "Hard" }
    ];

    const content = [];

    let filteredPool = [];
    if (level === 'Easy') {
        filteredPool = activityPool.filter(q => q.diff === 'Easy');
        count = 20;
    } else if (level === 'Medium') {
        filteredPool = activityPool.filter(q => q.diff === 'Medium');
        count = 20;
    } else {
        filteredPool = activityPool.filter(q => q.diff === 'Hard');
        count = 10;
    }

    const finalPool = filteredPool.slice(0, count);

    for (let i = 0; i < finalPool.length; i++) {
        const item = finalPool[i];
        content.push({
            id: `math-act-nursery-${level.toLowerCase()}-${i}`,
            title: `Activity: ${item.cat}`,
            type: 'activity-quest',
            category: 'Mathematics',
            question: item.q,
            answer: item.a,
            target: item.a,
            desc: `Type your answer below! ✨`
        });
    }

    return content;
};

const generateNurseryMathGames = (level, count = 10) => {
    const content = [];
    for (let i = 0; i < count; i++) {
        const rand = Math.random();
        if (rand < 0.5) {
            // Balloon Counting Game
            const initial = Math.floor(Math.random() * 5) + 1;
            const change = Math.floor(Math.random() * 3) + 1;
            const isAdd = Math.random() > 0.5;
            const total = isAdd ? (initial + change) : Math.max(1, initial - change);

            content.push({
                id: `math-game-balloons-${i}`,
                type: 'math-balloon-count',
                title: 'Balloon Counting',
                initialCount: initial,
                changeCount: change,
                operation: isAdd ? 'add' : 'remove',
                target: total.toString(),
                desc: isAdd ? `We have ${initial} 🎈. Let's add ${change} 🎈!` : `We have ${initial} 🎈. One popped! Let's remove ${change} 🎈!`,
                question: `How many balloons are there now?`
            });
        } else {
            // Color Counting Game
            const colors = [
                { name: 'Red', emoji: '🔴', code: '#FF6B6B' },
                { name: 'Blue', emoji: '🔵', code: '#4ECDC4' },
                { name: 'Yellow', emoji: '🟡', code: '#FFE66D' }
            ];
            const targetColor = colors[Math.floor(Math.random() * colors.length)];
            const otherColors = colors.filter(c => c.name !== targetColor.name);

            const targetCount = Math.floor(Math.random() * 5) + 2;
            const distractionCount = Math.floor(Math.random() * 4) + 1;

            const dots = [];
            for (let j = 0; j < targetCount; j++) dots.push(targetColor);
            for (let j = 0; j < distractionCount; j++) dots.push(otherColors[Math.floor(Math.random() * otherColors.length)]);

            content.push({
                id: `math-game-colors-${i}`,
                type: 'math-color-count',
                title: 'Color Counting',
                dots: dots.sort(() => Math.random() - 0.5),
                targetColor: targetColor.name,
                targetEmoji: targetColor.emoji,
                target: targetCount.toString(),
                desc: `Can you find all the ${targetColor.name} dots?`,
                question: `Count the ${targetColor.emoji} dots and write the number!`
            });
        }
    }
    return content;
};

const generateActivityContent = (grade, level) => {
    return [{ id: `act-${grade}-${level}`, title: 'Fun Activity', type: 'pattern', sequence: ['🍎', '🍌', '🍎'], target: '🍌' }];
};

const generateGamesContent = (grade, level) => {
    return [{ id: `game-${grade}-${level}`, title: 'Mini Game' }];
};

const generateMathContent = (grade, level) => {
    return [{ id: 'math-1', title: 'Math Fun', question: '5 + 5 = ?', answer: '10', target: '10', hideAnswerInWriting: true }];
};

const generateScienceContent = (grade, level) => {
    return [{ id: 'sci-1', title: 'Science Fact', sentences: ['Water is wet.'] }];
};

const generateCodingContent = (grade, level, count = 100) => {
    const goals = [
        { label: 'the Star', emoji: '⭐', difficulty: 1 },
        { label: 'the Apple', emoji: '🍎', difficulty: 1 },
        { label: 'the House', emoji: '🏠', difficulty: 2 },
        { label: 'the Park', emoji: '🌳', difficulty: 2 },
        { label: 'the Barn', emoji: '🛖', difficulty: 3 }
    ];

    const content = [];
    for (let i = 0; i < count; i++) {
        const goal = goals[i % goals.length];
        content.push({
            id: `code-nursery-${level.toLowerCase()}-${i}`,
            title: `Quest for ${goal.label}`,
            type: 'character-move',
            target: goal.label,
            targetEmoji: goal.emoji,
            difficulty: goal.difficulty,
            desc: `Help your character reach ${goal.label}!`
        });
    }
    return content;
};

// --- NURSERY SCIENCE CONTENT ---

const generateNurseryScienceReading = (level, count = 100) => {
    // 50 Questions from user request
    const questionPool = [
        // A. Living & Non-Living
        { q: "Is a dog living or non-living?", a: "Living 🐶", cat: "Living/Non-Living", diff: "Easy" },
        { q: "Is a chair living or non-living?", a: "Non-living 🪑", cat: "Living/Non-Living", diff: "Easy" },
        { q: "Is a tree living or non-living?", a: "Living 🌳", cat: "Living/Non-Living", diff: "Easy" },
        { q: "Is a car living or non-living?", a: "Non-living 🚗", cat: "Living/Non-Living", diff: "Easy" },
        { q: "Is a bird living or non-living?", a: "Living 🐦", cat: "Living/Non-Living", diff: "Easy" },
        { q: "Do plants grow?", a: "Yes 🌱", cat: "Living/Non-Living", diff: "Medium" },
        { q: "Do stones grow?", a: "No 🪨", cat: "Living/Non-Living", diff: "Medium" },
        { q: "Can animals move?", a: "Yes 🐆", cat: "Living/Non-Living", diff: "Medium" },
        { q: "Can tables walk?", a: "No 🚫", cat: "Living/Non-Living", diff: "Medium" },
        { q: "Do living things need water?", a: "Yes 💧", cat: "Living/Non-Living", diff: "Medium" },

        // B. Plants
        { q: "What do plants need to grow?", a: "Water & Sun ☀️💧", cat: "Plants", diff: "Hard" },
        { q: "Which part of plant is green?", a: "Leaves 🍃", cat: "Plants", diff: "Hard" },
        { q: "Which part of plant grows under soil?", a: "Roots 🥕", cat: "Plants", diff: "Hard" },
        { q: "What do we get from plants?", a: "Fruits & Veggies 🍎🥦", cat: "Plants", diff: "Medium" },
        { q: "Do plants need sunlight?", a: "Yes ☀️", cat: "Plants", diff: "Easy" },
        { q: "Name a flower.", a: "Rose 🌹", cat: "Plants", diff: "Easy" },
        { q: "Name a fruit.", a: "Apple 🍎", cat: "Plants", diff: "Easy" },
        { q: "Are leaves green?", a: "Yes 🍃", cat: "Plants", diff: "Easy" },
        { q: "Do plants need air?", a: "Yes 🌬️", cat: "Plants", diff: "Medium" },
        { q: "Which part of plant gives us fruits?", a: "Flower 🌸", cat: "Plants", diff: "Hard" },

        // C. Animals
        { q: "Name a pet animal.", a: "Dog 🐶", cat: "Animals", diff: "Easy" },
        { q: "Name a wild animal.", a: "Lion 🦁", cat: "Animals", diff: "Easy" },
        { q: "Which animal says “meow”?", a: "Cat 🐱", cat: "Animals", diff: "Easy" },
        { q: "Which animal says “moo”?", a: "Cow 🐮", cat: "Animals", diff: "Easy" },
        { q: "Which animal gives us milk?", a: "Cow 🐮", cat: "Animals", diff: "Medium" },
        { q: "Can birds fly?", a: "Yes 🦅", cat: "Animals", diff: "Easy" },
        { q: "Do fish swim?", a: "Yes 🐟", cat: "Animals", diff: "Easy" },
        { q: "Where does a dog live?", a: "Kennel 🏠", cat: "Animals", diff: "Hard" },
        { q: "Where does a lion live?", a: "Den 🦁", cat: "Animals", diff: "Hard" },
        { q: "Which animal has a long trunk?", a: "Elephant 🐘", cat: "Animals", diff: "Medium" },

        // D. Weather
        { q: "When do we use an umbrella?", a: "Rainy Season ☔", cat: "Weather", diff: "Medium" },
        { q: "Is the sun hot or cold?", a: "Hot 🔥", cat: "Weather", diff: "Easy" },
        { q: "What do we wear in winter?", a: "Sweater 🧥", cat: "Weather", diff: "Hard" },
        { q: "What do we wear in summer?", a: "Cotton Clothes 👕", cat: "Weather", diff: "Hard" },
        { q: "Do we see clouds in the sky?", a: "Yes ☁️", cat: "Weather", diff: "Easy" },
        { q: "What comes after rain?", a: "Rainbow 🌈", cat: "Weather", diff: "Medium" },
        { q: "Is snow cold?", a: "Yes ❄️", cat: "Weather", diff: "Easy" },
        { q: "Do we feel hot in summer?", a: "Yes ☀️", cat: "Weather", diff: "Easy" },
        { q: "Do we feel cold in winter?", a: "Yes 🥶", cat: "Weather", diff: "Easy" },
        { q: "What shines in the day?", a: "Sun ☀️", cat: "Weather", diff: "Easy" },

        // E. Body Parts & Senses
        { q: "How many eyes do you have?", a: "Two 👀", cat: "Body Parts", diff: "Easy" },
        { q: "Which body part helps you see?", a: "Eyes 👀", cat: "Body Parts", diff: "Medium" },
        { q: "Which body part helps you hear?", a: "Ears 👂", cat: "Body Parts", diff: "Medium" },
        { q: "Which body part helps you smell?", a: "Nose 👃", cat: "Body Parts", diff: "Medium" },
        { q: "Which body part helps you taste?", a: "Tongue 👅", cat: "Body Parts", diff: "Medium" },
        { q: "How many hands do you have?", a: "Two 👐", cat: "Body Parts", diff: "Easy" },
        { q: "How many legs do you have?", a: "Two 🦵", cat: "Body Parts", diff: "Easy" },
        { q: "What do you use to walk?", a: "Legs 🚶", cat: "Body Parts", diff: "Easy" },
        { q: "What do you use to eat?", a: "Hands/Mouth 👄", cat: "Body Parts", diff: "Easy" },
        { q: "Do we need food to grow?", a: "Yes 🥗", cat: "Body Parts", diff: "Medium" }
    ];


    let filteredPool = [];
    if (level === 'Easy') {
        filteredPool = questionPool.filter(q => q.diff === 'Easy' || q.cat === 'Animals');
        count = 50;
    } else if (level === 'Medium') {
        filteredPool = questionPool.filter(q => q.diff === 'Medium' || q.cat === 'Weather' || q.cat === 'Living/Non-Living');
        count = 25;
    } else {
        filteredPool = questionPool.filter(q => q.diff === 'Hard' || q.cat === 'Plants' || q.cat === 'Body Parts');
        count = 25;
    }

    const content = [];
    // Ensure we have enough questions by cycling if needed, or just taking what we have
    const finalPool = (filteredPool.length > 0 ? filteredPool : questionPool); // Fallback to full pool if empty

    // Shuffle the pool for variety
    const shuffled = finalPool.sort(() => Math.random() - 0.5);

    for (let i = 0; i < Math.min(count, shuffled.length); i++) {
        const item = shuffled[i];
        content.push({
            id: `sci-read-nursery-${level.toLowerCase()}-${i}`,
            title: `Science: ${item.cat}`,
            category: 'Science',
            sentences: [item.q, `✨ Answer: ${item.a}`],
            type: 'sentence', // Uses standard reading module display
            desc: `Learn about ${item.cat}!`
        });
    }
    return content;
};

const generateNurseryScienceWriting = (level, count = 100) => {
    const questionPool = [
        // A. Fill in the Blanks
        { q: "A dog is a ______ animal.", a: "pet", cat: "Fill in Blanks", diff: "Easy", type: "science-writing" },
        { q: "A lion is a ______ animal.", a: "wild", cat: "Fill in Blanks", diff: "Easy", type: "science-writing" },
        { q: "Plants need ______ to grow.", a: "water", cat: "Fill in Blanks", diff: "Medium", type: "science-writing" },
        { q: "The sun is ______.", a: "hot", cat: "Fill in Blanks", diff: "Easy", type: "science-writing" },
        { q: "We use eyes to ______.", a: "see", cat: "Fill in Blanks", diff: "Medium", type: "science-writing" },
        { q: "We use ears to ______.", a: "hear", cat: "Fill in Blanks", diff: "Medium", type: "science-writing" },
        { q: "Fish can ______.", a: "swim", cat: "Fill in Blanks", diff: "Medium", type: "science-writing" },
        { q: "Birds can ______.", a: "fly", cat: "Fill in Blanks", diff: "Medium", type: "science-writing" },
        { q: "We wear woollen clothes in ______.", a: "winter", cat: "Fill in Blanks", diff: "Hard", type: "science-writing" },
        { q: "We use an umbrella when it ______.", a: "rains", cat: "Fill in Blanks", diff: "Hard", type: "science-writing" },

        // B. Write One Word Answers
        { q: "Write one pet animal.", a: "dog", cat: "One Word", diff: "Easy", type: "science-writing" },
        { q: "Write one wild animal.", a: "lion", cat: "One Word", diff: "Easy", type: "science-writing" },
        { q: "Write one fruit.", a: "apple", cat: "One Word", diff: "Easy", type: "science-writing" },
        { q: "Write one flower.", a: "rose", cat: "One Word", diff: "Easy", type: "science-writing" },
        { q: "Write one body part.", a: "eye", cat: "One Word", diff: "Easy", type: "science-writing" },
        { q: "Write one season name.", a: "summer", cat: "One Word", diff: "Medium", type: "science-writing" },
        { q: "Write one vegetable.", a: "carrot", cat: "One Word", diff: "Medium", type: "science-writing" },
        { q: "Write one water animal.", a: "fish", cat: "One Word", diff: "Medium", type: "science-writing" },
        { q: "Write one flying animal.", a: "bird", cat: "One Word", diff: "Medium", type: "science-writing" },
        { q: "Write one living thing.", a: "tree", cat: "One Word", diff: "Medium", type: "science-writing" },

        // C. Match & Write (Using science-writing for text input)
        { q: "Sun - (Hot / Cold)", a: "Hot", cat: "Match & Write", diff: "Medium", type: "science-writing" },
        { q: "Ice - (Hot / Cold)", a: "Cold", cat: "Match & Write", diff: "Medium", type: "science-writing" },
        { q: "Dog - (Pet / Wild)", a: "Pet", cat: "Match & Write", diff: "Medium", type: "science-writing" },
        { q: "Tiger - (Pet / Wild)", a: "Wild", cat: "Match & Write", diff: "Medium", type: "science-writing" },
        { q: "Fish - (Swim / Fly)", a: "Swim", cat: "Match & Write", diff: "Medium", type: "science-writing" },
        { q: "Bird - (Swim / Fly)", a: "Fly", cat: "Match & Write", diff: "Medium", type: "science-writing" },
        { q: "Eyes - (See / Smell)", a: "See", cat: "Match & Write", diff: "Medium", type: "science-writing" },
        { q: "Nose - (Hear / Smell)", a: "Smell", cat: "Match & Write", diff: "Medium", type: "science-writing" },
        { q: "Winter - (Cold / Hot)", a: "Cold", cat: "Match & Write", diff: "Medium", type: "science-writing" },
        { q: "Summer - (Cold / Hot)", a: "Hot", cat: "Match & Write", diff: "Medium", type: "science-writing" },

        // D. Short Answer Writing (Name 2...) -> Free Write
        { q: "Name 2 fruits.", a: "2FRUITS", cat: "Short Answer", diff: "Hard", type: "free-write", count: 2 },
        { q: "Name 2 vegetables.", a: "2VEG", cat: "Short Answer", diff: "Hard", type: "free-write", count: 2 },
        { q: "Name 2 body parts.", a: "2PARTS", cat: "Short Answer", diff: "Hard", type: "free-write", count: 2 },
        { q: "Name 2 animals.", a: "2ANIMALS", cat: "Short Answer", diff: "Hard", type: "free-write", count: 2 },
        { q: "Name 2 seasons.", a: "2SEASONS", cat: "Short Answer", diff: "Hard", type: "free-write", count: 2 },
        { q: "Write 2 things we get from plants.", a: "2THINGS", cat: "Short Answer", diff: "Hard", type: "free-write", count: 2 },
        { q: "Write 2 living things.", a: "2LIVING", cat: "Short Answer", diff: "Hard", type: "free-write", count: 2 },
        { q: "Write 2 non-living things.", a: "2NONLIVING", cat: "Short Answer", diff: "Hard", type: "free-write", count: 2 },
        { q: "Write 2 water animals.", a: "2WATER", cat: "Short Answer", diff: "Hard", type: "free-write", count: 2 },
        { q: "Write 2 birds.", a: "2BIRDS", cat: "Short Answer", diff: "Hard", type: "free-write", count: 2 },

        // E. Simple Science Writing
        { q: "How many eyes do you have?", a: "two", cat: "Simple Science", diff: "Easy", type: "science-writing" },
        { q: "How many ears do you have?", a: "two", cat: "Simple Science", diff: "Easy", type: "science-writing" },
        { q: "Which part of plant is under soil?", a: "root", cat: "Simple Science", diff: "Hard", type: "science-writing" },
        { q: "What do we drink when we are thirsty?", a: "water", cat: "Simple Science", diff: "Medium", type: "science-writing" },
        { q: "What gives us light in the day?", a: "sun", cat: "Simple Science", diff: "Easy", type: "science-writing" },
        { q: "What do cows give us?", a: "milk", cat: "Simple Science", diff: "Medium", type: "science-writing" },
        { q: "Where do fish live?", a: "water", cat: "Simple Science", diff: "Medium", type: "science-writing" },
        { q: "What do plants need to grow?", a: "water", cat: "Simple Science", diff: "Hard", type: "science-writing" },
        { q: "What season is very hot?", a: "summer", cat: "Simple Science", diff: "Medium", type: "science-writing" },
        { q: "What season is very cold?", a: "winter", cat: "Simple Science", diff: "Medium", type: "science-writing" }
    ];

    let filteredPool = [];
    if (level === 'Easy') {
        filteredPool = questionPool.filter(q => q.diff === 'Easy' || q.cat === 'One Word');
        count = 50;
    } else if (level === 'Medium') {
        filteredPool = questionPool.filter(q => q.diff === 'Medium' || q.cat === 'Match & Write');
        count = 25;
    } else {
        filteredPool = questionPool.filter(q => q.diff === 'Hard' || q.cat === 'Short Answer');
        count = 25;
    }

    const content = [];
    const finalPool = (filteredPool.length > 0 ? filteredPool : questionPool);
    const shuffled = finalPool.sort(() => Math.random() - 0.5);

    for (let i = 0; i < Math.min(count, shuffled.length); i++) {
        const item = shuffled[i];

        let quest = {
            id: `sci-write-nursery-${level.toLowerCase()}-${i}`,
            title: item.cat,
            type: item.type,
            desc: "Answer the question!",
            question: item.q,
            answer: item.a, // For validation
            target: item.a
        };

        if (item.type === 'choose-word') {
            quest.options = item.options;
            quest.desc = "Select the correct option!";
            quest.imageUrl = "https://cdn-icons-png.flaticon.com/512/3062/3062634.png"; // Generic science icon
        } else if (item.type === 'free-write') {
            quest.count = item.count; // Pass count for input boxes
            quest.desc = `Write ${item.count} answers!`;
        }

        content.push(quest);
    }
    return content;
};

// --- JR. KG ENGLISH CURRICULUM ---

const generateJrKgEnglishReading = (level, count = 100) => {
    const questionPool = [
        // A. Alphabet & Phonics (1–20)
        { q: "Say the letter A.", a: "A", cat: "Alphabet", diff: "Easy" },
        { q: "Say the letter M.", a: "M", cat: "Alphabet", diff: "Easy" },
        { q: "Say the letter Z.", a: "Z", cat: "Alphabet", diff: "Easy" },
        { q: "Say the vowel letters.", a: "A, E, I, O, U", cat: "Alphabet", diff: "Easy" },
        { q: "What sound does B make?", a: "b-b-b", cat: "Phonics", diff: "Easy" },
        { q: "What sound does C make?", a: "k-k-k", cat: "Phonics", diff: "Easy" },
        { q: "What sound does D make?", a: "d-d-d", cat: "Phonics", diff: "Easy" },
        { q: "What sound does F make?", a: "f-f-f", cat: "Phonics", diff: "Easy" },
        { q: "What sound does L make?", a: "l-l-l", cat: "Phonics", diff: "Easy" },
        { q: "What sound does S make?", a: "s-s-s", cat: "Phonics", diff: "Easy" },
        { q: "Which letter comes after T?", a: "U", cat: "Alphabet", diff: "Medium" },
        { q: "Which letter comes before H?", a: "G", cat: "Alphabet", diff: "Medium" },
        { q: "What comes between P and R?", a: "Q", cat: "Alphabet", diff: "Medium" },
        { q: "Say 5 consonants.", a: "B, C, D, F, G...", cat: "Alphabet", diff: "Medium" },
        { q: "Say 5 vowels.", a: "A, E, I, O, U", cat: "Alphabet", diff: "Medium" },
        { q: "Read: sh", a: "shhh", cat: "Phonics", diff: "Hard" },
        { q: "Read: ch", a: "ch-ch", cat: "Phonics", diff: "Hard" },
        { q: "Read: th", a: "th-th", cat: "Phonics", diff: "Hard" },
        { q: "Read: ee", a: "eee", cat: "Phonics", diff: "Hard" },
        { q: "Read: oo", a: "ooo", cat: "Phonics", diff: "Hard" },

        // B. Word Reading (21–60)
        { q: "Read: cat", a: "cat 🐱", cat: "Words", diff: "Easy" },
        { q: "Read: bat", a: "bat 🦇", cat: "Words", diff: "Easy" },
        { q: "Read: mat", a: "mat 🧘", cat: "Words", diff: "Easy" },
        { q: "Read: hat", a: "hat 🎩", cat: "Words", diff: "Easy" },
        { q: "Read: rat", a: "rat 🐀", cat: "Words", diff: "Easy" },
        { q: "Read: sun", a: "sun ☀️", cat: "Words", diff: "Easy" },
        { q: "Read: cup", a: "cup ☕", cat: "Words", diff: "Easy" },
        { q: "Read: bus", a: "bus 🚌", cat: "Words", diff: "Easy" },
        { q: "Read: fan", a: "fan 🌀", cat: "Words", diff: "Easy" },
        { q: "Read: pen", a: "pen 🖊️", cat: "Words", diff: "Easy" },
        { q: "Read: red", a: "red 🔴", cat: "Words", diff: "Easy" },
        { q: "Read: box", a: "box 📦", cat: "Words", diff: "Easy" },
        { q: "Read: dog", a: "dog 🐶", cat: "Words", diff: "Easy" },
        { q: "Read: fox", a: "fox 🦊", cat: "Words", diff: "Easy" },
        { q: "Read: pig", a: "pig 🐷", cat: "Words", diff: "Easy" },
        { q: "Read: hen", a: "hen 🐔", cat: "Words", diff: "Easy" },
        { q: "Read: jam", a: "jam 🍯", cat: "Words", diff: "Easy" },
        { q: "Read: van", a: "van 🚐", cat: "Words", diff: "Easy" },
        { q: "Read: milk", a: "milk 🥛", cat: "Words", diff: "Easy" },
        { q: "Read: book", a: "book 📖", cat: "Words", diff: "Easy" },
        { q: "Read: fish", a: "fish 🐟", cat: "Words", diff: "Medium" },
        { q: "Read: tree", a: "tree 🌳", cat: "Words", diff: "Medium" },
        { q: "Read: frog", a: "frog 🐸", cat: "Words", diff: "Medium" },
        { q: "Read: star", a: "star ⭐", cat: "Words", diff: "Medium" },
        { q: "Read: flag", a: "flag 🏳️", cat: "Words", diff: "Medium" },
        { q: "Read: clap", a: "clap 👏", cat: "Words", diff: "Medium" },
        { q: "Read: drum", a: "drum 🥁", cat: "Words", diff: "Medium" },
        { q: "Read: ship", a: "ship 🚢", cat: "Words", diff: "Medium" },
        { q: "Read: shop", a: "shop 🏪", cat: "Words", diff: "Medium" },
        { q: "Read: chat", a: "chat 💬", cat: "Words", diff: "Medium" },
        { q: "Read: that", a: "that 👉", cat: "Words", diff: "Medium" },
        { q: "Read: feet", a: "feet 🦶", cat: "Words", diff: "Medium" },
        { q: "Read: moon", a: "moon 🌙", cat: "Words", diff: "Medium" },
        { q: "Read: rain", a: "rain 🌧️", cat: "Words", diff: "Medium" },
        { q: "Read: goat", a: "goat 🐐", cat: "Words", diff: "Medium" },
        { q: "Read: boat", a: "boat ⛵", cat: "Words", diff: "Medium" },
        { q: "Read: car", a: "car 🚗", cat: "Words", diff: "Medium" },
        { q: "Read: train", a: "train 🚆", cat: "Words", diff: "Medium" },
        { q: "Read: house", a: "house 🏠", cat: "Words", diff: "Medium" },
        { q: "Read: school", a: "school 🏫", cat: "Words", diff: "Medium" },

        // C. Sentence Reading (61–100)
        { q: "This is a cat.", a: "Great Job! 🐱", cat: "Sentences", diff: "Medium" },
        { q: "I have a dog.", a: "Great Job! 🐶", cat: "Sentences", diff: "Medium" },
        { q: "The sun is hot.", a: "Great Job! ☀️", cat: "Sentences", diff: "Medium" },
        { q: "The moon is bright.", a: "Great Job! 🌙", cat: "Sentences", diff: "Medium" },
        { q: "I like milk.", a: "Great Job! 🥛", cat: "Sentences", diff: "Medium" },
        { q: "She has a doll.", a: "Great Job! 🎎", cat: "Sentences", diff: "Medium" },
        { q: "He is my friend.", a: "Great Job! 🤝", cat: "Sentences", diff: "Medium" },
        { q: "The bird can fly.", a: "Great Job! 🐦", cat: "Sentences", diff: "Medium" },
        { q: "The fish can swim.", a: "Great Job! 🐟", cat: "Sentences", diff: "Medium" },
        { q: "I go to school.", a: "Great Job! 🏫", cat: "Sentences", diff: "Medium" },
        { q: "This is my bag.", a: "Great Job! 🎒", cat: "Sentences", diff: "Medium" },
        { q: "I see a red ball.", a: "Great Job! 🔴", cat: "Sentences", diff: "Medium" },
        { q: "The boy is running.", a: "Great Job! 🏃", cat: "Sentences", diff: "Medium" },
        { q: "The girl is singing.", a: "Great Job! 🎤", cat: "Sentences", diff: "Medium" },
        { q: "The baby is crying.", a: "Great Job! 👶", cat: "Sentences", diff: "Medium" },
        { q: "The dog is barking.", a: "Great Job! 🐕", cat: "Sentences", diff: "Medium" },
        { q: "The frog can jump.", a: "Great Job! 🐸", cat: "Sentences", diff: "Medium" },
        { q: "The cow gives milk.", a: "Great Job! 🐮", cat: "Sentences", diff: "Medium" },
        { q: "I love my mother.", a: "Great Job! ❤️", cat: "Sentences", diff: "Hard" },
        { q: "I love my father.", a: "Great Job! ❤️", cat: "Sentences", diff: "Hard" },
        { q: "We play in the park.", a: "Great Job! 🛝", cat: "Sentences", diff: "Hard" },
        { q: "The sky is blue.", a: "Great Job! ☁️", cat: "Sentences", diff: "Hard" },
        { q: "It is raining today.", a: "Great Job! 🌧️", cat: "Sentences", diff: "Hard" },
        { q: "I have two pencils.", a: "Great Job! ✏️", cat: "Sentences", diff: "Hard" },
        { q: "She is reading a book.", a: "Great Job! 📖", cat: "Sentences", diff: "Hard" },
        { q: "The cat is on the mat.", a: "Great Job! 🐈", cat: "Sentences", diff: "Hard" },
        { q: "The sun rises in the east.", a: "Great Job! 🌅", cat: "Sentences", diff: "Hard" },
        { q: "Birds live in nests.", a: "Great Job! 🪹", cat: "Sentences", diff: "Hard" },
        { q: "We eat healthy food.", a: "Great Job! 🥗", cat: "Sentences", diff: "Hard" },
        { q: "I wash my hands.", a: "Great Job! 🧼", cat: "Sentences", diff: "Hard" },
        { q: "This is my classroom.", a: "Great Job! 🏫", cat: "Sentences", diff: "Hard" },
        { q: "The teacher is kind.", a: "Great Job! 👩‍🏫", cat: "Sentences", diff: "Hard" },
        { q: "I brush my teeth.", a: "Great Job! 🪥", cat: "Sentences", diff: "Hard" },
        { q: "I drink water daily.", a: "Great Job! 💧", cat: "Sentences", diff: "Hard" },
        { q: "The lion is strong.", a: "Great Job! 🦁", cat: "Sentences", diff: "Hard" },
        { q: "The elephant is big.", a: "Great Job! 🐘", cat: "Sentences", diff: "Hard" },
        { q: "The ant is small.", a: "Great Job! 🐜", cat: "Sentences", diff: "Hard" },
        { q: "I can read well.", a: "Great Job! 📚", cat: "Sentences", diff: "Hard" },
        { q: "I can write well.", a: "Great Job! ✍️", cat: "Sentences", diff: "Hard" },
        { q: "English is fun.", a: "Great Job! 🎉", cat: "Sentences", diff: "Hard" }
    ];

    let filteredPool = [];
    if (level === 'Easy') {
        filteredPool = questionPool.filter(q => q.diff === 'Easy' || q.cat === 'Alphabet');
        count = 50;
    } else if (level === 'Medium') {
        filteredPool = questionPool.filter(q => q.diff === 'Medium' || q.cat === 'Words');
        count = 25;
    } else {
        filteredPool = questionPool.filter(q => q.diff === 'Hard' || q.cat === 'Sentences');
        count = 25;
    }

    const content = [];
    const finalPool = (filteredPool.length > 0 ? filteredPool : questionPool);
    const shuffled = finalPool.sort(() => Math.random() - 0.5);

    for (let i = 0; i < Math.min(count, shuffled.length); i++) {
        const item = shuffled[i];
        content.push({
            id: `eng-read-jrkg-${level.toLowerCase()}-${i}`,
            title: `Reading: ${item.cat}`,
            category: 'English',
            sentences: [item.q, `✨ Answer: ${item.a}`],
            type: 'sentence',
            desc: `Read aloud: ${item.q}`
        });
    }
    return content;
};

const generateJrKgEnglishWriting = (level, count = 100) => {
    const questionPool = [
        // A. Alphabet & Phonics Writing (1–20)
        { q: "Write A to Z.", a: "A-Z", cat: "Alphabet", diff: "Easy", type: "free-write", count: 1 },
        { q: "Write a to z.", a: "a-z", cat: "Alphabet", diff: "Easy", type: "free-write", count: 1 },
        { q: "Write vowels.", a: "a,e,i,o,u", cat: "Alphabet", diff: "Easy", type: "science-writing" },
        { q: "Write 5 consonants.", a: "b,c,d,f,g", cat: "Alphabet", diff: "Easy", type: "free-write", count: 5 },
        { q: "Write the letter after M.", a: "N", cat: "Alphabet", diff: "Easy", type: "science-writing" },
        { q: "Write the letter before T.", a: "S", cat: "Alphabet", diff: "Easy", type: "science-writing" },
        { q: "Write the letter between D and F.", a: "E", cat: "Alphabet", diff: "Easy", type: "science-writing" },
        { q: "Write 3 words starting with B.", a: "ball,bat,bus", cat: "Words", diff: "Medium", type: "free-write", count: 3 },
        { q: "Write 3 words starting with S.", a: "sun,star,ship", cat: "Words", diff: "Medium", type: "free-write", count: 3 },
        { q: "Write 3 words starting with T.", a: "tree,top,tap", cat: "Words", diff: "Medium", type: "free-write", count: 3 },
        { q: "Write sh words (2).", a: "ship,shop", cat: "Phonics", diff: "Hard", type: "free-write", count: 2 },
        { q: "Write ch words (2).", a: "chat,chin", cat: "Phonics", diff: "Hard", type: "free-write", count: 2 },
        { q: "Write th words (2).", a: "that,this", cat: "Phonics", diff: "Hard", type: "free-write", count: 2 },
        { q: "Write ee words (2).", a: "tree,bee", cat: "Phonics", diff: "Hard", type: "free-write", count: 2 },
        { q: "Write oo words (2).", a: "moon,book", cat: "Phonics", diff: "Hard", type: "free-write", count: 2 },
        { q: "Write capital letters of: a, b, c.", a: "A,B,C", cat: "Alphabet", diff: "Easy", type: "science-writing" },
        { q: "Write small letters of: D, E, F.", a: "d,e,f", cat: "Alphabet", diff: "Easy", type: "science-writing" },
        { q: "Write first 10 letters.", a: "a..j", cat: "Alphabet", diff: "Easy", type: "free-write", count: 10 },
        { q: "Write last 10 letters.", a: "q..z", cat: "Alphabet", diff: "Easy", type: "free-write", count: 10 },
        { q: "Write vowels in order.", a: "a,e,i,o,u", cat: "Alphabet", diff: "Easy", type: "science-writing" },

        // B. Fill in the Blanks (21–50)
        { q: "C _ T", a: "A", cat: "Missing", diff: "Easy", type: "science-writing" },
        { q: "D O _", a: "G", cat: "Missing", diff: "Easy", type: "science-writing" },
        { q: "F I _ H", a: "S", cat: "Missing", diff: "Easy", type: "science-writing" },
        { q: "S U _", a: "N", cat: "Missing", diff: "Easy", type: "science-writing" },
        { q: "B _ T", a: "A", cat: "Missing", diff: "Easy", type: "science-writing" },
        { q: "H A _", a: "T", cat: "Missing", diff: "Easy", type: "science-writing" },
        { q: "M A _", a: "T", cat: "Missing", diff: "Easy", type: "science-writing" },
        { q: "R E _", a: "D", cat: "Missing", diff: "Easy", type: "science-writing" },
        { q: "B O O _", a: "K", cat: "Missing", diff: "Medium", type: "science-writing" },
        { q: "T R E _", a: "E", cat: "Missing", diff: "Medium", type: "science-writing" },
        { q: "F R O _", a: "G", cat: "Missing", diff: "Medium", type: "science-writing" },
        { q: "G O A _", a: "T", cat: "Missing", diff: "Medium", type: "science-writing" },
        { q: "B O A _", a: "T", cat: "Missing", diff: "Medium", type: "science-writing" },
        { q: "S H I _", a: "P", cat: "Missing", diff: "Medium", type: "science-writing" },
        { q: "C H A _", a: "T", cat: "Missing", diff: "Medium", type: "science-writing" },
        { q: "T R A I _", a: "N", cat: "Missing", diff: "Hard", type: "science-writing" },
        { q: "H O U _ E", a: "S", cat: "Missing", diff: "Hard", type: "science-writing" },
        { q: "S C H O O _", a: "L", cat: "Missing", diff: "Hard", type: "science-writing" },
        { q: "F L A _", a: "G", cat: "Missing", diff: "Medium", type: "science-writing" },
        { q: "D R U _", a: "M", cat: "Missing", diff: "Medium", type: "science-writing" },
        { q: "R A I _", a: "N", cat: "Missing", diff: "Medium", type: "science-writing" },
        { q: "M O O _", a: "N", cat: "Missing", diff: "Medium", type: "science-writing" },
        { q: "F E E _", a: "T", cat: "Missing", diff: "Medium", type: "science-writing" },
        { q: "P E _", a: "N", cat: "Missing", diff: "Easy", type: "science-writing" },
        { q: "C U _", a: "P", cat: "Missing", diff: "Easy", type: "science-writing" },
        { q: "B U _", a: "S", cat: "Missing", diff: "Easy", type: "science-writing" },
        { q: "P I _", a: "G", cat: "Missing", diff: "Easy", type: "science-writing" },
        { q: "H E _", a: "N", cat: "Missing", diff: "Easy", type: "science-writing" },
        { q: "J A _", a: "M", cat: "Missing", diff: "Easy", type: "science-writing" },
        { q: "F A _", a: "N", cat: "Missing", diff: "Easy", type: "science-writing" },

        // C. Word & Sentence Writing (51–80)
        { q: "Write 5 animal names.", a: "cat,dog...", cat: "Lists", diff: "Medium", type: "free-write", count: 5 },
        { q: "Write 5 fruit names.", a: "apple,mango...", cat: "Lists", diff: "Medium", type: "free-write", count: 5 },
        { q: "Write 5 color names.", a: "red,blue...", cat: "Lists", diff: "Medium", type: "free-write", count: 5 },
        { q: "Write 5 body parts.", a: "eyes,nose...", cat: "Lists", diff: "Medium", type: "free-write", count: 5 },
        { q: "Write 5 action words.", a: "run,jump...", cat: "Lists", diff: "Medium", type: "free-write", count: 5 },
        { q: "Write a sentence about your mother.", a: "My mother...", cat: "Sentences", diff: "Hard", type: "science-writing" },
        { q: "Write a sentence about your father.", a: "My father...", cat: "Sentences", diff: "Hard", type: "science-writing" },
        { q: "Write a sentence about your school.", a: "My school...", cat: "Sentences", diff: "Hard", type: "science-writing" },
        { q: "Write a sentence about your teacher.", a: "My teacher...", cat: "Sentences", diff: "Hard", type: "science-writing" },
        { q: "Write a sentence about your friend.", a: "My friend...", cat: "Sentences", diff: "Hard", type: "science-writing" },
        { q: "Write: This is a cat.", a: "This is a cat.", cat: "Copying", diff: "Medium", type: "science-writing" },
        { q: "Write: I have a dog.", a: "I have a dog.", cat: "Copying", diff: "Medium", type: "science-writing" },
        { q: "Write: The sun is hot.", a: "The sun is hot.", cat: "Copying", diff: "Medium", type: "science-writing" },
        { q: "Write: The sky is blue.", a: "The sky is blue.", cat: "Copying", diff: "Medium", type: "science-writing" },
        { q: "Write: I love my family.", a: "I love my family.", cat: "Copying", diff: "Medium", type: "science-writing" },
        { q: "Write: I go to school.", a: "I go to school.", cat: "Copying", diff: "Medium", type: "science-writing" },
        { q: "Write: The bird can fly.", a: "The bird can fly.", cat: "Copying", diff: "Medium", type: "science-writing" },
        { q: "Write: The fish can swim.", a: "The fish can swim.", cat: "Copying", diff: "Medium", type: "science-writing" },
        { q: "Write: I like fruits.", a: "I like fruits.", cat: "Copying", diff: "Medium", type: "science-writing" },
        { q: "Write: I drink milk.", a: "I drink milk.", cat: "Copying", diff: "Medium", type: "science-writing" },
        { q: "Make a sentence with “ball.”", a: "ball", cat: "Sentences", diff: "Hard", type: "science-writing" },
        { q: "Make a sentence with “book.”", a: "book", cat: "Sentences", diff: "Hard", type: "science-writing" },
        { q: "Make a sentence with “tree.”", a: "tree", cat: "Sentences", diff: "Hard", type: "science-writing" },
        { q: "Make a sentence with “car.”", a: "car", cat: "Sentences", diff: "Hard", type: "science-writing" },
        { q: "Make a sentence with “sun.”", a: "sun", cat: "Sentences", diff: "Hard", type: "science-writing" },
        { q: "Write 3 rhyming words of cat.", a: "bat,mat,rat", cat: "Rhymes", diff: "Medium", type: "free-write", count: 3 },
        { q: "Write 3 rhyming words of sun.", a: "bun,run,fun", cat: "Rhymes", diff: "Medium", type: "free-write", count: 3 },
        { q: "Write 3 rhyming words of pen.", a: "den,ten,men", cat: "Rhymes", diff: "Medium", type: "free-write", count: 3 },
        { q: "Write opposites: big – ______", a: "small", cat: "Opposites", diff: "Medium", type: "science-writing" },
        { q: "Write opposites: hot – ______", a: "cold", cat: "Opposites", diff: "Medium", type: "science-writing" },

        // D. Paragraph & Creative Writing (81–100)
        { q: "Write 3 lines about yourself.", a: "Myself...", cat: "Creative", diff: "Hard", type: "free-write", count: 3 },
        { q: "Write 3 lines about your school.", a: "My School...", cat: "Creative", diff: "Hard", type: "free-write", count: 3 },
        { q: "Write 3 lines about your family.", a: "My Family...", cat: "Creative", diff: "Hard", type: "free-write", count: 3 },
        { q: "Write 3 lines about your favorite animal.", a: "Animal...", cat: "Creative", diff: "Hard", type: "free-write", count: 3 },
        { q: "Write 3 lines about your favorite fruit.", a: "Fruit...", cat: "Creative", diff: "Hard", type: "free-write", count: 3 },
        { q: "Write 3 lines about your teacher.", a: "Teacher...", cat: "Creative", diff: "Hard", type: "free-write", count: 3 },
        { q: "Write 3 lines about your best friend.", a: "Friend...", cat: "Creative", diff: "Hard", type: "free-write", count: 3 },
        { q: "Write 3 lines about summer season.", a: "Summer...", cat: "Creative", diff: "Hard", type: "free-write", count: 3 },
        { q: "Write 3 lines about your winter season.", a: "Winter...", cat: "Creative", diff: "Hard", type: "free-write", count: 3 },
        { q: "Write 3 lines about rain.", a: "Rain...", cat: "Creative", diff: "Hard", type: "free-write", count: 3 },
        { q: "Write 5 simple sentences.", a: "Sentences...", cat: "Creative", diff: "Hard", type: "free-write", count: 5 },
        { q: "Write 5 action words.", a: "Actions...", cat: "Creative", diff: "Medium", type: "free-write", count: 5 },
        { q: "Write 5 naming words.", a: "Names...", cat: "Creative", diff: "Medium", type: "free-write", count: 5 },
        { q: "Write 5 describing words.", a: "Describing...", cat: "Creative", diff: "Medium", type: "free-write", count: 5 },
        { q: "Write 5 school things.", a: "School...", cat: "Creative", diff: "Medium", type: "free-write", count: 5 },
        { q: "Write 5 things you see in the sky.", a: "Sky...", cat: "Creative", diff: "Medium", type: "free-write", count: 5 },
        { q: "Write 5 things in your classroom.", a: "Classroom...", cat: "Creative", diff: "Medium", type: "free-write", count: 5 },
        { q: "Write 5 fruits and vegetables.", a: "Food...", cat: "Creative", diff: "Medium", type: "free-write", count: 5 },
        { q: "Write your full name.", a: "Name", cat: "Personal", diff: "Easy", type: "science-writing" },
        { q: "Write today’s date in words.", a: "Date", cat: "Personal", diff: "Medium", type: "science-writing" }
    ];

    let filteredPool = [];
    if (level === 'Easy') {
        filteredPool = questionPool.filter(q => q.diff === 'Easy' || q.cat === 'Alphabet');
        count = 50;
    } else if (level === 'Medium') {
        filteredPool = questionPool.filter(q => q.diff === 'Medium' || q.cat === 'Words' || q.cat === 'Lists');
        count = 25;
    } else {
        filteredPool = questionPool.filter(q => q.diff === 'Hard' || q.cat === 'Creative' || q.cat === 'Sentences');
        count = 25;
    }

    const content = [];
    const finalPool = (filteredPool.length > 0 ? filteredPool : questionPool);
    const shuffled = finalPool.sort(() => Math.random() - 0.5);

    for (let i = 0; i < Math.min(count, shuffled.length); i++) {
        const item = shuffled[i];

        let quest = {
            id: `eng-write-jrkg-${level.toLowerCase()}-${i}`,
            title: item.cat,
            type: item.type,
            desc: item.q, // Description often holds the instruction
            question: item.q,
            answer: item.a, // For validation
            target: item.a
        };

        if (item.type === 'free-write') {
            quest.count = item.count; // Pass count for input boxes
            quest.desc = item.q;
        }

        content.push(quest);
    }
    return content;
};

const generateJrKgEnglishActivity = (level, count = 100) => {
    // 1. THEME: FRUITS 🍎
    const fruitsImages = [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/240px-Red_Apple.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapus_Mango.jpg/320px-Hapus_Mango.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Bananas_white_background_DS.jpg/320px-Bananas_white_background_DS.jpg"
    ];
    const fruitsActivities = [
        { q: "Name a red fruit.", a: "Apple", type: "activity-quest", cat: "Fruits 🍎", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/240px-Red_Apple.jpg" },
        { q: "Name a yellow fruit.", a: "Mango", type: "activity-quest", cat: "Fruits 🍎", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapus_Mango.jpg/320px-Hapus_Mango.jpg" },
        { q: "A for...?", a: "Apple", type: "matching", options: ["Apple", "Bat", "Cat"], cat: "Fruits 🍎", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/240px-Red_Apple.jpg" },
        { q: "B for...?", a: "Banana", type: "matching", options: ["Banana", "Dog", "Egg"], cat: "Fruits 🍎", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Bananas_white_background_DS.jpg/320px-Bananas_white_background_DS.jpg" },
        { q: "First sound of Mango?", a: "M", type: "phonics", cat: "Fruits 🍎", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapus_Mango.jpg/320px-Hapus_Mango.jpg" },
        { q: "Match Fruit to Color: Apple", a: "Red", type: "matching", options: ["Red", "Blue", "Green"], cat: "Fruits 🍎", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/240px-Red_Apple.jpg" },
        { q: "Write: apple", a: "apple", type: "activity-quest", cat: "Fruits 🍎", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/240px-Red_Apple.jpg" },
        { q: "Write: mango", a: "mango", type: "activity-quest", cat: "Fruits 🍎", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapus_Mango.jpg/320px-Hapus_Mango.jpg" },
        { q: "Write: I like apple.", a: "I like apple.", type: "activity-quest", cat: "Fruits 🍎", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/240px-Red_Apple.jpg" },
        { q: "Role Play: Pretend to eat a fruit!", a: "Yum!", type: "action", cat: "Fruits 🍎", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Culinary_fruits_front_view.jpg/320px-Culinary_fruits_front_view.jpg" },
        { q: "Color your favorite fruit (Mental)", a: "Done", type: "action", cat: "Fruits 🍎", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Culinary_fruits_front_view.jpg/320px-Culinary_fruits_front_view.jpg" }
    ];

    // 2. THEME: ANIMALS 🐶
    const animalsImages = [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Dog.svg/320px-Dog.svg.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Lion_clipart.svg/600px-Lion_clipart.svg.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/320px-Cat03.jpg"
    ];
    const animalsActivities = [
        { q: "Name a pet animal.", a: "Dog", type: "activity-quest", cat: "Animals 🐶", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Dog.svg/320px-Dog.svg.png" },
        { q: "Name a wild animal.", a: "Lion", type: "activity-quest", cat: "Animals 🐶", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Lion_clipart.svg/600px-Lion_clipart.svg.png" },
        { q: "Dog says...?", a: "Woof", type: "phonics", options: ["Woof", "Meow", "Moo"], cat: "Animals 🐶", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Dog.svg/320px-Dog.svg.png" },
        { q: "Cat says...?", a: "Meow", type: "phonics", options: ["Meow", "Woof", "Quack"], cat: "Animals 🐶", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/320px-Cat03.jpg" },
        { q: "Cow says...?", a: "Moo", type: "phonics", options: ["Moo", "Roar", "Hiss"], cat: "Animals 🐶", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Cow_female_black_white.jpg/320px-Cow_female_black_white.jpg" },
        { q: "Act: Walk like an elephant!", a: "Stomp", type: "action", cat: "Animals 🐶", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/320px-African_Bush_Elephant.jpg" },
        { q: "Act: Jump like a frog!", a: "Hop", type: "action", cat: "Animals 🐶", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Atelopus_zeteki1.jpg/320px-Atelopus_zeteki1.jpg" },
        { q: "Write: dog", a: "dog", type: "activity-quest", cat: "Animals 🐶", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Dog.svg/320px-Dog.svg.png" },
        { q: "Write: lion", a: "lion", type: "activity-quest", cat: "Animals 🐶", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Lion_clipart.svg/600px-Lion_clipart.svg.png" },
        { q: "Write: The cat is small.", a: "The cat is small.", type: "activity-quest", cat: "Animals 🐶", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/320px-Cat03.jpg" },
        { q: "Where does a dog live?", a: "Kennel", type: "matching", options: ["Kennel", "Den", "Nest"], cat: "Animals 🐶", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Doghouse_icon.svg/480px-Doghouse_icon.svg.png" }
    ];

    // 3. THEME: MY FAMILY 👨‍👩‍👧
    const familyImages = [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Family_icon.svg/512px-Family_icon.svg.png"
    ];
    const familyActivities = [
        { q: "Who cooks food?", a: "Mother", type: "matching", options: ["Mother", "Baby", "Pet"], cat: "Family 👨‍👩‍👧", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Mother_with_daughter.svg/320px-Mother_with_daughter.svg.png" },
        { q: "Say: This is my mother.", a: "Done", type: "action", cat: "Family 👨‍👩‍👧", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Mother_with_daughter.svg/320px-Mother_with_daughter.svg.png" },
        { q: "Spell: M_THER", a: "O", type: "activity-quest", cat: "Family 👨‍👩‍👧", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Mother_with_daughter.svg/320px-Mother_with_daughter.svg.png" },
        { q: "Spell: F_THER", a: "A", type: "activity-quest", cat: "Family 👨‍👩‍👧", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Father_and_son_smiling.svg/320px-Father_and_son_smiling.svg.png" },
        { q: "Write: I love my mom.", a: "I love my mom.", type: "activity-quest", cat: "Family 👨‍👩‍👧", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Mother_with_daughter.svg/320px-Mother_with_daughter.svg.png" },
        { q: "Draw your family (Mental)", a: "Done", type: "action", cat: "Family 👨‍👩‍👧", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Family_icon.svg/512px-Family_icon.svg.png" }
    ];

    // 4. THEME: WEATHER 🌦
    const weatherImages = [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Sun_-_symbol.svg/800px-Sun_-_symbol.svg.png"
    ];
    const weatherActivities = [
        { q: "What gives us light?", a: "Sun", type: "matching", options: ["Sun", "Moon", "Star"], cat: "Weather 🌦", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Sun_-_symbol.svg/800px-Sun_-_symbol.svg.png" },
        { q: "When do we use an umbrella?", a: "Rain", type: "matching", options: ["Rain", "Summer", "Winter"], cat: "Weather 🌦", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Weather-showers-scattered.svg/600px-Weather-showers-scattered.svg.png" },
        { q: "Is the sun hot or cold?", a: "Hot", type: "matching", options: ["Hot", "Cold"], cat: "Weather 🌦", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Sun_-_symbol.svg/800px-Sun_-_symbol.svg.png" },
        { q: "Write: The sun is hot.", a: "The sun is hot.", type: "activity-quest", cat: "Weather 🌦", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Sun_-_symbol.svg/800px-Sun_-_symbol.svg.png" },
        { q: "Write: It is raining.", a: "It is raining.", type: "activity-quest", cat: "Weather 🌦", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Weather-showers-scattered.svg/600px-Weather-showers-scattered.svg.png" },
        { q: "Act: Shiver like it's cold!", a: "Brrr", type: "action", cat: "Weather 🌦", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Snow_crystal.svg/320px-Snow_crystal.svg.png" },
        { q: "Act: Blow like the wind!", a: "Whoosh", type: "action", cat: "Weather 🌦", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Weather-windy.svg/320px-Weather-windy.svg.png" }
    ];

    // 5. THEME: MY SCHOOL 🎒
    const schoolImages = [
        "https://upload.wikimedia.org/wikipedia/commons/e/e3/School-bag_icon.png"
    ];
    const schoolActivities = [
        { q: "What do we write with?", a: "Pencil", type: "matching", options: ["Pencil", "Spoon", "Comb"], cat: "School 🎒", img: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Pencil_icon.png" },
        { q: "Who teaches us?", a: "Teacher", type: "matching", options: ["Teacher", "Doctor", "Pilot"], cat: "School 🎒", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Cartoon_teacher_at_blackboard.svg/320px-Cartoon_teacher_at_blackboard.svg.png" },
        { q: "Say: This is my bag.", a: "Done", type: "action", cat: "School 🎒", img: "https://upload.wikimedia.org/wikipedia/commons/e/e3/School-bag_icon.png" },
        { q: "Write: book", a: "book", type: "activity-quest", cat: "School 🎒", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Closed_Book_Icon.svg/320px-Closed_Book_Icon.svg.png" },
        { q: "Write: I love my school.", a: "I love my school.", type: "activity-quest", cat: "School 🎒", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Cartoon_teacher_at_blackboard.svg/320px-Cartoon_teacher_at_blackboard.svg.png" },
        { q: "Match: Black Board", a: "Chalk", type: "matching", options: ["Chalk", "Pen", "Sand"], cat: "School 🎒", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Cartoon_teacher_at_blackboard.svg/320px-Cartoon_teacher_at_blackboard.svg.png" }
    ];

    // Combine all
    let allActivities = [
        ...fruitsActivities.map(a => ({ ...a, imgs: fruitsImages })),
        ...animalsActivities.map(a => ({ ...a, imgs: animalsImages })),
        ...familyActivities.map(a => ({ ...a, imgs: familyImages })),
        ...weatherActivities.map(a => ({ ...a, imgs: weatherImages })),
        ...schoolActivities.map(a => ({ ...a, imgs: schoolImages }))
    ];

    // Shuffle
    const shuffled = allActivities.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);

    return selected.map((item, i) => ({
        id: `jrkg-eng-act-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        target: item.a,
        answer: item.a,
        options: item.options,
        // Use specific img if available, else pick random image from the theme's set
        imageUrl: item.img || item.imgs[Math.floor(Math.random() * item.imgs.length)],
        desc: "Complete the activity!",
        activity: "English Activity"
    }));
};

const generateSrKgEnglishReading = (level, count = 100) => {
    const questionPool = [
        // A. Digraphs & Blends (1–30)
        { q: "Read: Sheep", a: "Sheep 🐑", cat: "Digraphs", diff: "Easy" },
        { q: "Read: Chair", a: "Chair 🪑", cat: "Digraphs", diff: "Easy" },
        { q: "Read: Thumb", a: "Thumb 👍", cat: "Digraphs", diff: "Easy" },
        { q: "Read: Whale", a: "Whale 🐳", cat: "Digraphs", diff: "Easy" },
        { q: "Read: Phone", a: "Phone 📞", cat: "Digraphs", diff: "Easy" },
        { q: "Read: Brush", a: "Brush 🖌️", cat: "Blends", diff: "Easy" },
        { q: "Read: Clock", a: "Clock ⏰", cat: "Blends", diff: "Easy" },
        { q: "Read: Star", a: "Star ⭐️", cat: "Blends", diff: "Easy" },
        { q: "Read: Truck", a: "Truck 🚛", cat: "Blends", diff: "Easy" },
        { q: "Read: Globe", a: "Globe 🌍", cat: "Blends", diff: "Easy" },
        { q: "Read: The sheep is white.", a: "The sheep is white.", cat: "Sentences", diff: "Medium" },
        { q: "Read: I sit on a chair.", a: "I sit on a chair.", cat: "Sentences", diff: "Medium" },
        { q: "Read: The whale is big.", a: "The whale is big.", cat: "Sentences", diff: "Medium" },
        { q: "Read: The clock goes tick-tock.", a: "Tick-tock.", cat: "Sentences", diff: "Medium" },
        { q: "Read: The star shines at night.", a: "Shines at night.", cat: "Sentences", diff: "Medium" },
        { q: "Read: Cheese", a: "Cheese 🧀", cat: "Digraphs", diff: "Easy" },
        { q: "Read: Shark", a: "Shark 🦈", cat: "Digraphs", diff: "Easy" },
        { q: "Read: Earth", a: "Earth 🌍", cat: "Digraphs", diff: "Easy" },
        { q: "Read: Photo", a: "Photo 📷", cat: "Digraphs", diff: "Easy" },
        { q: "Read: Block", a: "Block 🧱", cat: "Blends", diff: "Easy" },
        { q: "Read: Flag", a: "Flag 🚩", cat: "Blends", diff: "Easy" },
        { q: "Read: Plane", a: "Plane ✈️", cat: "Blends", diff: "Easy" },
        { q: "Read: Spoon", a: "Spoon 🥄", cat: "Blends", diff: "Easy" },
        { q: "Read: The shark swims fast.", a: "Swims fast.", cat: "Sentences", diff: "Medium" },
        { q: "Read: I eat cheese and bread.", a: "Cheese and bread.", cat: "Sentences", diff: "Medium" },
        { q: "Read: The plane flies high.", a: "Flies high.", cat: "Sentences", diff: "Medium" },
        { q: "Read: Raise your left hand.", a: "Left hand.", cat: "Sentences", diff: "Medium" },
        { q: "Read: Wash your hands with soap.", a: "With soap.", cat: "Sentences", diff: "Medium" },
        { q: "Read: Brush your teeth daily.", a: "Daily.", cat: "Sentences", diff: "Medium" },
        { q: "Read: The flag is red and blue.", a: "Red and blue.", cat: "Sentences", diff: "Medium" },

        // B. Long Vowels (31–60)
        { q: "Read: Cake", a: "Cake 🎂", cat: "Long Vowels", diff: "Easy" },
        { q: "Read: Kite", a: "Kite 🪁", cat: "Long Vowels", diff: "Easy" },
        { q: "Read: Bone", a: "Bone 🦴", cat: "Long Vowels", diff: "Easy" },
        { q: "Read: Tube", a: "Tube 🧪", cat: "Long Vowels", diff: "Easy" },
        { q: "Read: Rain", a: "Rain 🌧️", cat: "Long Vowels", diff: "Easy" },
        { q: "Read: Boat", a: "Boat ⛵️", cat: "Long Vowels", diff: "Easy" },
        { q: "Read: Leaf", a: "Leaf 🍃", cat: "Long Vowels", diff: "Easy" },
        { q: "Read: Pie", a: "Pie 🥧", cat: "Long Vowels", diff: "Easy" },
        { q: "Read: Blue", a: "Blue 🔵", cat: "Long Vowels", diff: "Easy" },
        { q: "Read: Fruit", a: "Fruit 🍎", cat: "Long Vowels", diff: "Easy" },
        { q: "Read: I like to eat cake.", a: "Eat cake.", cat: "Sentences", diff: "Medium" },
        { q: "Read: The kite flies in the sky.", a: "In the sky.", cat: "Sentences", diff: "Medium" },
        { q: "Read: The dog wants a bone.", a: "Wants a bone.", cat: "Sentences", diff: "Medium" },
        { q: "Read: We sail in a boat.", a: "In a boat.", cat: "Sentences", diff: "Medium" },
        { q: "Read: The leaf is green.", a: "Is green.", cat: "Sentences", diff: "Medium" },
        { q: "Read: Bike", a: "Bike 🚲", cat: "Long Vowels", diff: "Easy" },
        { q: "Read: Rose", a: "Rose 🌹", cat: "Long Vowels", diff: "Easy" },
        { q: "Read: Cube", a: "Cube 🧊", cat: "Long Vowels", diff: "Easy" },
        { q: "Read: Train", a: "Train 🚂", cat: "Long Vowels", diff: "Easy" },
        { q: "Read: Goat", a: "Goat 🐐", cat: "Long Vowels", diff: "Easy" },
        { q: "Read: Seal", a: "Seal 🦭", cat: "Long Vowels", diff: "Easy" },
        { q: "Read: Tie", a: "Tie 👔", cat: "Long Vowels", diff: "Easy" },
        { q: "Read: Glue", a: "Glue 🧴", cat: "Long Vowels", diff: "Easy" },
        { q: "Read: Key", a: "Key 🔑", cat: "Long Vowels", diff: "Easy" },
        { q: "Read: Night", a: "Night 🌙", cat: "Long Vowels", diff: "Easy" },
        { q: "Read: I ride my bike fast.", a: "Bike fast.", cat: "Sentences", diff: "Medium" },
        { q: "Read: The rose smells good.", a: "Smells good.", cat: "Sentences", diff: "Medium" },
        { q: "Read: The train is long.", a: "Train is long.", cat: "Sentences", diff: "Medium" },
        { q: "Read: I see a goat on the hill.", a: "On the hill.", cat: "Sentences", diff: "Medium" },
        { q: "Read: The moon shines at night.", a: "Shines at night.", cat: "Sentences", diff: "Medium" },

        // C. Short Stories & Sight Words (61–100)
        { q: "Read: Once upon a time.", a: "Classic start.", cat: "Stories", diff: "Hard" },
        { q: "Read: There was a little cat.", a: "Little cat.", cat: "Stories", diff: "Hard" },
        { q: "Read: She liked to play ball.", a: "Play ball.", cat: "Stories", diff: "Hard" },
        { q: "Read: One day, she found a hat.", a: "Found a hat.", cat: "Stories", diff: "Hard" },
        { q: "Read: It was a magic hat!", a: "Magic hat!", cat: "Stories", diff: "Hard" },
        { q: "Read: The sun is hot today. I will wear a hat.", a: "Wear a hat.", cat: "Stories", diff: "Hard" },
        { q: "Read: It is raining. Put on your boots.", a: "Put on boots.", cat: "Stories", diff: "Hard" },
        { q: "Read: We go to the park. We play on the slide.", a: "Play on slide.", cat: "Stories", diff: "Hard" },
        { q: "Read: I have a red car. It goes very fast.", a: "Goes fast.", cat: "Stories", diff: "Hard" },
        { q: "Read: My mom bakes a cake. It smells yummy.", a: "Smells yummy.", cat: "Stories", diff: "Hard" },
        { q: "Read Sight Words: the, and, a, to.", a: "the, and, a, to", cat: "Sight Words", diff: "Easy" },
        { q: "Read Sight Words: in, is, you, that.", a: "in, is, you, that", cat: "Sight Words", diff: "Easy" },
        { q: "Read Sight Words: it, he, was, for.", a: "it, he, was, for", cat: "Sight Words", diff: "Easy" },
        { q: "Read Sight Words: on, are, as, with.", a: "on, are, as, with", cat: "Sight Words", diff: "Easy" },
        { q: "Read Sight Words: his, they, I, at.", a: "his, they, I, at", cat: "Sight Words", diff: "Easy" },
        { q: "Read: Can you see the big bus?", a: "See the big bus?", cat: "Questions", diff: "Medium" },
        { q: "Read: Where is my blue pen?", a: "Where is pen?", cat: "Questions", diff: "Medium" },
        { q: "Read: Do you like to eat pizza?", a: "Like pizza?", cat: "Questions", diff: "Medium" },
        { q: "Read: Who is your best friend?", a: "Best friend?", cat: "Questions", diff: "Medium" },
        { q: "Read: What time is it now?", a: "Time is it?", cat: "Questions", diff: "Medium" },
        { q: "Read: Please open the door.", a: "Open door.", cat: "Commands", diff: "Medium" },
        { q: "Read: Sit down and listen.", a: "Sit and listen.", cat: "Commands", diff: "Medium" },
        { q: "Read: Wash your hands.", a: "Wash hands.", cat: "Commands", diff: "Medium" },
        { q: "Read: Clean your room.", a: "Clean room.", cat: "Commands", diff: "Medium" },
        { q: "Read: Do your homework.", a: "Do homework.", cat: "Commands", diff: "Medium" },
        { q: "Read: Happy Birthday to you!", a: "Happy Birthday!", cat: "Phrases", diff: "Easy" },
        { q: "Read: Good Morning everyone.", a: "Good Morning.", cat: "Phrases", diff: "Easy" },
        { q: "Read: Have a nice day.", a: "Nice day.", cat: "Phrases", diff: "Easy" },
        { q: "Read: Thank you very much.", a: "Thank you.", cat: "Phrases", diff: "Easy" },
        { q: "Read: See you tomorrow.", a: "See you.", cat: "Phrases", diff: "Easy" }
    ];

    let filteredPool = [];
    if (level === 'Easy') {
        filteredPool = questionPool.filter(q => q.diff === 'Easy' || q.cat === 'Digraphs' || q.cat === 'Blends');
        count = 50;
    } else if (level === 'Medium') {
        filteredPool = questionPool.filter(q => q.diff === 'Medium' || q.cat === 'Long Vowels');
        count = 25;
    } else {
        filteredPool = questionPool.filter(q => q.diff === 'Hard' || q.cat === 'Stories');
        count = 25;
    }

    const content = [];
    const finalPool = (filteredPool.length > 0 ? filteredPool : questionPool);
    const shuffled = finalPool.sort(() => Math.random() - 0.5);

    for (let i = 0; i < Math.min(count, shuffled.length); i++) {
        const item = shuffled[i];
        content.push({
            id: `eng-read-srkg-${level.toLowerCase()}-${i}`,
            title: `Reading: ${item.cat}`,
            category: 'English',
            sentences: [item.q, `✨ Answer: ${item.a}`],
            type: 'sentence',
            desc: `Read aloud: ${item.q}`
        });
    }
    return content;
};

const generateSrKgEnglishWriting = (level, count = 100) => {
    const questionPool = [
        // A. Sentence Writing (1–30)
        { q: "Write a sentence with: Happy", a: "I am happy.", cat: "Sentences", diff: "Easy", type: "science-writing" },
        { q: "Write a sentence with: Play", a: "I like to play.", cat: "Sentences", diff: "Easy", type: "science-writing" },
        { q: "Write a sentence with: School", a: "I go to school.", cat: "Sentences", diff: "Easy", type: "science-writing" },
        { q: "Write a sentence with: Friend", a: "He is my friend.", cat: "Sentences", diff: "Easy", type: "science-writing" },
        { q: "Write a sentence with: House", a: "My house is big.", cat: "Sentences", diff: "Easy", type: "science-writing" },
        { q: "Write a sentence with: Park", a: "We play in park.", cat: "Sentences", diff: "Easy", type: "science-writing" },
        { q: "Write a sentence with: Book", a: "I read a book.", cat: "Sentences", diff: "Easy", type: "science-writing" },
        { q: "Write a sentence with: Tree", a: "The tree is green.", cat: "Sentences", diff: "Easy", type: "science-writing" },
        { q: "Write a sentence with: Water", a: "I drink water.", cat: "Sentences", diff: "Easy", type: "science-writing" },
        { q: "Write a sentence with: Food", a: "The food is hot.", cat: "Sentences", diff: "Easy", type: "science-writing" },
        { q: "Fix the sentence: cat The fat is.", a: "The cat is fat.", cat: "Jumbled", diff: "Medium", type: "science-writing" },
        { q: "Fix the sentence: run dog The can.", a: "The dog can run.", cat: "Jumbled", diff: "Medium", type: "science-writing" },
        { q: "Fix the sentence: is sun The hot.", a: "The sun is hot.", cat: "Jumbled", diff: "Medium", type: "science-writing" },
        { q: "Fix the sentence: blue is sky The.", a: "The sky is blue.", cat: "Jumbled", diff: "Medium", type: "science-writing" },
        { q: "Fix the sentence: love I mom my.", a: "I love my mom.", cat: "Jumbled", diff: "Medium", type: "science-writing" },
        { q: "Fix the sentence: boy A plays.", a: "A boy plays.", cat: "Jumbled", diff: "Medium", type: "science-writing" },
        { q: "Fix the sentence: girl A sings.", a: "A girl sings.", cat: "Jumbled", diff: "Medium", type: "science-writing" },
        { q: "Fix the sentence: apple red is The.", a: "The apple is red.", cat: "Jumbled", diff: "Medium", type: "science-writing" },
        { q: "Fix the sentence: milk white is The.", a: "The milk is white.", cat: "Jumbled", diff: "Medium", type: "science-writing" },
        { q: "Fix the sentence: bird The flies.", a: "The bird flies.", cat: "Jumbled", diff: "Medium", type: "science-writing" },
        { q: "Write 2 sentences about: My Dog", a: "My dog...", cat: "Creative", diff: "Medium", type: "free-write", count: 2 },
        { q: "Write 2 sentences about: My Cat", a: "My cat...", cat: "Creative", diff: "Medium", type: "free-write", count: 2 },
        { q: "Write 2 sentences about: My Car", a: "My car...", cat: "Creative", diff: "Medium", type: "free-write", count: 2 },
        { q: "Write 2 sentences about: My Bag", a: "My bag...", cat: "Creative", diff: "Medium", type: "free-write", count: 2 },
        { q: "Write 2 sentences about: Rain", a: "Rain...", cat: "Creative", diff: "Medium", type: "free-write", count: 2 },
        { q: "Write 2 sentences about: Sun", a: "Sun...", cat: "Creative", diff: "Medium", type: "free-write", count: 2 },
        { q: "Write 2 sentences about: Park", a: "Park...", cat: "Creative", diff: "Medium", type: "free-write", count: 2 },
        { q: "Write 2 sentences about: Zoo", a: "Zoo...", cat: "Creative", diff: "Medium", type: "free-write", count: 2 },
        { q: "Write 2 sentences about: Beach", a: "Beach...", cat: "Creative", diff: "Medium", type: "free-write", count: 2 },
        { q: "Write 2 sentences about: Cake", a: "Cake...", cat: "Creative", diff: "Medium", type: "free-write", count: 2 },

        // B. Paragraph & Comprehension (31–60)
        { q: "Read: 'Tim has a cat. The cat is fat.' Q: What does Tim have?", a: "A cat", cat: "Comprehension", diff: "Hard", type: "science-writing" },
        { q: "Read: 'Tim has a cat. The cat is fat.' Q: How is the cat?", a: "Fat", cat: "Comprehension", diff: "Hard", type: "science-writing" },
        { q: "Read: 'The sun is hot. Use a hat.' Q: What is hot?", a: "The sun", cat: "Comprehension", diff: "Hard", type: "science-writing" },
        { q: "Read: 'The sun is hot. Use a hat.' Q: What should you use?", a: "A hat", cat: "Comprehension", diff: "Hard", type: "science-writing" },
        { q: "Read: 'Look at the fish. It can swim.' Q: What can swim?", a: "The fish", cat: "Comprehension", diff: "Hard", type: "science-writing" },
        { q: "Read: 'Look at the fish. It can swim.' Q: What do we look at?", a: "The fish", cat: "Comprehension", diff: "Hard", type: "science-writing" },
        { q: "Read: 'Sam has a red bag. He goes to school.' Q: What follows Sam?", a: "Red bag", cat: "Comprehension", diff: "Hard", type: "science-writing" },
        { q: "Read: 'Sam has a red bag. He goes to school.' Q: Where does he go?", a: "School", cat: "Comprehension", diff: "Hard", type: "science-writing" },
        { q: "Read: 'The bird is blue. It sits on a tree.' Q: What color is the bird?", a: "Blue", cat: "Comprehension", diff: "Hard", type: "science-writing" },
        { q: "Read: 'The bird is blue. It sits on a tree.' Q: Where does it sit?", a: "On a tree", cat: "Comprehension", diff: "Hard", type: "science-writing" },
        { q: "Write 5 lines on: My School", a: "Myself...", cat: "Creative", diff: "Hard", type: "free-write", count: 5 },
        { q: "Write 5 lines on: My Family", a: "Family...", cat: "Creative", diff: "Hard", type: "free-write", count: 5 },
        { q: "Write 5 lines on: My Pet", a: "Pet...", cat: "Creative", diff: "Hard", type: "free-write", count: 5 },
        { q: "Write 5 lines on: My Teacher", a: "Teacher...", cat: "Creative", diff: "Hard", type: "free-write", count: 5 },
        { q: "Write 5 lines on: Summer Vacation", a: "Summer...", cat: "Creative", diff: "Hard", type: "free-write", count: 5 },
        { q: "Write 5 lines on: My Garden", a: "Garden...", cat: "Creative", diff: "Hard", type: "free-write", count: 5 },
        { q: "Write 5 lines on: My Favorite Toy", a: "Toy...", cat: "Creative", diff: "Hard", type: "free-write", count: 5 },
        { q: "Write 5 lines on: My Birthday", a: "Birthday...", cat: "Creative", diff: "Hard", type: "free-write", count: 5 },
        { q: "Write 5 lines on: The Zoo", a: "Zoo...", cat: "Creative", diff: "Hard", type: "free-write", count: 5 },
        { q: "Write 5 lines on: A Rainy Day", a: "Rain...", cat: "Creative", diff: "Hard", type: "free-write", count: 5 },
        { q: "Write: 5 Vegetables", a: "Carrot...", cat: "Lists", diff: "Medium", type: "free-write", count: 5 },
        { q: "Write: 5 Wild Animals", a: "Lion...", cat: "Lists", diff: "Medium", type: "free-write", count: 5 },
        { q: "Write: 5 Transport Vehicles", a: "Car...", cat: "Lists", diff: "Medium", type: "free-write", count: 5 },
        { q: "Write: 5 Colors", a: "Red...", cat: "Lists", diff: "Medium", type: "free-write", count: 5 },
        { q: "Write: 5 Shapes", a: "Circle...", cat: "Lists", diff: "Medium", type: "free-write", count: 5 },
        { q: "Write: 5 Days of Week", a: "Monday...", cat: "Lists", diff: "Medium", type: "free-write", count: 5 },
        { q: "Write: 5 Months", a: "January...", cat: "Lists", diff: "Medium", type: "free-write", count: 5 },
        { q: "Write: 5 Helpers", a: "Doctor...", cat: "Lists", diff: "Medium", type: "free-write", count: 5 },
        { q: "Write: 5 Clothes", a: "Shirt...", cat: "Lists", diff: "Medium", type: "free-write", count: 5 },
        { q: "Write: 5 Games", a: "Ludo...", cat: "Lists", diff: "Medium", type: "free-write", count: 5 }
    ];

    let filteredPool = [];
    if (level === 'Easy') {
        filteredPool = questionPool.filter(q => q.diff === 'Easy' || q.cat === 'Sentences');
        count = 50;
    } else if (level === 'Medium') {
        filteredPool = questionPool.filter(q => q.diff === 'Medium' || q.cat === 'Lists');
        count = 25;
    } else {
        filteredPool = questionPool.filter(q => q.diff === 'Hard' || q.cat === 'Creative' || q.cat === 'Comprehension');
        count = 25;
    }

    const content = [];
    const finalPool = (filteredPool.length > 0 ? filteredPool : questionPool);
    const shuffled = finalPool.sort(() => Math.random() - 0.5);

    for (let i = 0; i < Math.min(count, shuffled.length); i++) {
        const item = shuffled[i];
        let quest = {
            id: `eng-write-srkg-${level.toLowerCase()}-${i}`,
            title: item.cat,
            type: item.type,
            desc: item.q,
            question: item.q,
            answer: item.a,
            target: item.a
        };
        if (item.type === 'free-write') {
            quest.count = item.count;
            quest.desc = item.q;
        }
        content.push(quest);
    }
    return content;
};

const generateSrKgEnglishActivity = (level, count = 100) => {
    // Reusing high-quality images from Jr KG, but with harder questions

    // 1. THEME: FRUITS 🍎 (Advanced)
    const fruitsImages = [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/240px-Red_Apple.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapus_Mango.jpg/320px-Hapus_Mango.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Bananas_white_background_DS.jpg/320px-Bananas_white_background_DS.jpg"
    ];
    const fruitsActivities = [
        { q: "Which fruit has seeds inside?", a: "Apple", type: "activity-quest", cat: "Fruits 🍎", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/240px-Red_Apple.jpg" },
        { q: "Which fruit is called King of Fruits?", a: "Mango", type: "activity-quest", cat: "Fruits 🍎", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapus_Mango.jpg/320px-Hapus_Mango.jpg" },
        { q: "Name a fruit that is long and yellow.", a: "Banana", type: "activity-quest", cat: "Fruits 🍎", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Bananas_white_background_DS.jpg/320px-Bananas_white_background_DS.jpg" },
        { q: "Describe taste of Apple.", a: "Sweet", type: "matching", options: ["Sweet", "Salty", "Spicy"], cat: "Fruits 🍎", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/240px-Red_Apple.jpg" },
        { q: "Write 1 sentence about Mango.", a: "It is sweet.", type: "activity-quest", cat: "Fruits 🍎", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapus_Mango.jpg/320px-Hapus_Mango.jpg" },
        { q: "Do we eat Banana peel?", a: "No", type: "matching", options: ["No", "Yes"], cat: "Fruits 🍎", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Bananas_white_background_DS.jpg/320px-Bananas_white_background_DS.jpg" }
    ];

    // 2. THEME: ANIMALS 🐶 (Advanced)
    const animalsImages = [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Dog.svg/320px-Dog.svg.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Lion_clipart.svg/600px-Lion_clipart.svg.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/320px-African_Bush_Elephant.jpg"
    ];
    const animalsActivities = [
        { q: "Which animal guards our house?", a: "Dog", type: "activity-quest", cat: "Animals 🐶", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Dog.svg/320px-Dog.svg.png" },
        { q: "Who is the King of Jungle?", a: "Lion", type: "activity-quest", cat: "Animals 🐶", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Lion_clipart.svg/600px-Lion_clipart.svg.png" },
        { q: "Which animal has a trunk?", a: "Elephant", type: "activity-quest", cat: "Animals 🐶", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/320px-African_Bush_Elephant.jpg" },
        { q: "Is a Lion a pet or wild?", a: "Wild", type: "matching", options: ["Wild", "Pet"], cat: "Animals 🐶", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Lion_clipart.svg/600px-Lion_clipart.svg.png" },
        { q: "Baby of Dog is called?", a: "Puppy", type: "activity-quest", cat: "Animals 🐶", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Dog.svg/320px-Dog.svg.png" },
        { q: "Write 1 use of Dog.", a: "Guards house.", type: "activity-quest", cat: "Animals 🐶", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Dog.svg/320px-Dog.svg.png" }
    ];

    // 3. THEME: MY FAMILY 👨‍👩‍👧 (Advanced)
    const familyImages = [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Family_icon.svg/512px-Family_icon.svg.png"
    ];
    const familyActivities = [
        { q: "Father's father is called?", a: "Grandfather", type: "activity-quest", cat: "Family 👨‍👩‍👧", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Family_icon.svg/512px-Family_icon.svg.png" },
        { q: "Who helps you with homework?", a: "Mother", type: "matching", options: ["Mother", "Baby", "Pet"], cat: "Family 👨‍👩‍👧", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Mother_with_daughter.svg/320px-Mother_with_daughter.svg.png" },
        { q: "How many members in your family?", a: "4", type: "activity-quest", cat: "Family 👨‍👩‍👧", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Family_icon.svg/512px-Family_icon.svg.png" },
        { q: "Write surname of your family.", a: "Surname", type: "activity-quest", cat: "Family 👨‍👩‍👧", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Family_icon.svg/512px-Family_icon.svg.png" },
        { q: "Do you help your mother?", a: "Yes", type: "matching", options: ["Yes", "No"], cat: "Family 👨‍👩‍👧", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Mother_with_daughter.svg/320px-Mother_with_daughter.svg.png" }
    ];

    // 4. THEME: WEATHER 🌦 (Advanced)
    const weatherImages = [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Sun_-_symbol.svg/800px-Sun_-_symbol.svg.png"
    ];
    const weatherActivities = [
        { q: "Which season is hot?", a: "Summer", type: "activity-quest", cat: "Weather 🌦", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Sun_-_symbol.svg/800px-Sun_-_symbol.svg.png" },
        { q: "When do we wear sweaters?", a: "Winter", type: "matching", options: ["Winter", "Summer", "Rainy"], cat: "Weather 🌦", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Snow_crystal.svg/320px-Snow_crystal.svg.png" },
        { q: "What comes from clouds?", a: "Rain", type: "activity-quest", cat: "Weather 🌦", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Weather-showers-scattered.svg/600px-Weather-showers-scattered.svg.png" },
        { q: "We eat ice-cream in?", a: "Summer", type: "matching", options: ["Summer", "Winter"], cat: "Weather 🌦", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Sun_-_symbol.svg/800px-Sun_-_symbol.svg.png" },
        { q: "Write 1 thing you do in Rain.", a: "Use umbrella.", type: "activity-quest", cat: "Weather 🌦", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Weather-showers-scattered.svg/600px-Weather-showers-scattered.svg.png" }
    ];

    // 5. THEME: MY SCHOOL 🎒 (Advanced)
    const schoolImages = [
        "https://upload.wikimedia.org/wikipedia/commons/e/e3/School-bag_icon.png"
    ];
    const schoolActivities = [
        { q: "Where do we throw trash?", a: "Dustbin", type: "activity-quest", cat: "School 🎒", img: "https://upload.wikimedia.org/wikipedia/commons/e/e3/School-bag_icon.png" },
        { q: "Who drives the school bus?", a: "Driver", type: "activity-quest", cat: "School 🎒", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Cartoon_teacher_at_blackboard.svg/320px-Cartoon_teacher_at_blackboard.svg.png" },
        { q: "We read books in...?", a: "Library", type: "matching", options: ["Library", "Canteen", "Playground"], cat: "School 🎒", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Closed_Book_Icon.svg/320px-Closed_Book_Icon.svg.png" },
        { q: "Write name of your school.", a: "School Name", type: "activity-quest", cat: "School 🎒", img: "https://upload.wikimedia.org/wikipedia/commons/e/e3/School-bag_icon.png" },
        { q: "Opposite of 'Sit' is?", a: "Stand", type: "matching", options: ["Stand", "Run", "Sleep"], cat: "School 🎒", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Cartoon_teacher_at_blackboard.svg/320px-Cartoon_teacher_at_blackboard.svg.png" }
    ];

    // Combine all
    let allActivities = [
        ...fruitsActivities,
        ...animalsActivities,
        ...familyActivities,
        ...weatherActivities,
        ...schoolActivities
    ];

    // Shuffle
    const shuffled = allActivities.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);

    return selected.map((item, i) => ({
        id: `srkg-eng-act-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        target: item.a,
        answer: item.a,
        options: item.options,
        imageUrl: item.img,
        desc: "Complete the activity!",
        activity: "English Activity"
    }));
};

const generateJrKgScienceReading = (level, count = 100) => {
    const questionPool = [
        // A. Living & Non-Living (1–20)
        { q: "Is a dog living or non-living?", a: "Living", cat: "Living/Non-Living", diff: "Easy" },
        { q: "Is a chair living or non-living?", a: "Non-living", cat: "Living/Non-Living", diff: "Easy" },
        { q: "Is a tree living or non-living?", a: "Living", cat: "Living/Non-Living", diff: "Easy" },
        { q: "Is a car living or non-living?", a: "Non-living", cat: "Living/Non-Living", diff: "Easy" },
        { q: "Is a bird living or non-living?", a: "Living", cat: "Living/Non-Living", diff: "Easy" },
        { q: "Do plants grow? (Yes/No)", a: "Yes", cat: "Living/Non-Living", diff: "Easy" },
        { q: "Do stones grow? (Yes/No)", a: "No", cat: "Living/Non-Living", diff: "Easy" },
        { q: "Can animals move?", a: "Yes", cat: "Living/Non-Living", diff: "Easy" },
        { q: "Can tables walk?", a: "No", cat: "Living/Non-Living", diff: "Easy" },
        { q: "Do living things need water?", a: "Yes", cat: "Living/Non-Living", diff: "Easy" },
        { q: "Is a flower living?", a: "Yes", cat: "Living/Non-Living", diff: "Easy" },
        { q: "Is a toy car living?", a: "No", cat: "Living/Non-Living", diff: "Easy" },
        { q: "Do plants need sunlight?", a: "Yes", cat: "Living/Non-Living", diff: "Easy" },
        { q: "Do we need food to grow?", a: "Yes", cat: "Living/Non-Living", diff: "Easy" },
        { q: "Is a mountain living?", a: "No", cat: "Living/Non-Living", diff: "Easy" },
        { q: "Can fish swim?", a: "Yes", cat: "Living/Non-Living", diff: "Easy" },
        { q: "Can birds fly?", a: "Yes", cat: "Living/Non-Living", diff: "Easy" },
        { q: "Do living things breathe?", a: "Yes", cat: "Living/Non-Living", diff: "Easy" },
        { q: "Is a bus living?", a: "No", cat: "Living/Non-Living", diff: "Easy" },
        { q: "Is a cow living?", a: "Yes", cat: "Living/Non-Living", diff: "Easy" },

        // B. Plants (21–35)
        { q: "What color are most leaves?", a: "Green", cat: "Plants", diff: "Easy" },
        { q: "What do plants need to grow?", a: "Water/Sun", cat: "Plants", diff: "Medium" },
        { q: "Which part of plant grows under soil?", a: "Roots", cat: "Plants", diff: "Medium" },
        { q: "Which part of plant gives us fruits?", a: "Flower", cat: "Plants", diff: "Medium" },
        { q: "Name one fruit.", a: "Apple (etc)", cat: "Plants", diff: "Easy" },
        { q: "Name one vegetable.", a: "Carrot (etc)", cat: "Plants", diff: "Easy" },
        { q: "Do plants need water?", a: "Yes", cat: "Plants", diff: "Easy" },
        { q: "Do plants need air?", a: "Yes", cat: "Plants", diff: "Easy" },
        { q: "Can we eat carrots?", a: "Yes", cat: "Plants", diff: "Easy" },
        { q: "Can we eat leaves?", a: "Yes (Spinach)", cat: "Plants", diff: "Medium" },
        { q: "What do we get from plants?", a: "Food/Wood", cat: "Plants", diff: "Medium" },
        { q: "Are flowers colorful?", a: "Yes", cat: "Plants", diff: "Easy" },
        { q: "Do trees give shade?", a: "Yes", cat: "Plants", diff: "Easy" },
        { q: "Do plants grow from seeds?", a: "Yes", cat: "Plants", diff: "Medium" },
        { q: "Is mango a fruit?", a: "Yes", cat: "Plants", diff: "Easy" },

        // C. Animals (36–60)
        { q: "Name one pet animal.", a: "Dog", cat: "Animals", diff: "Easy" },
        { q: "Name one wild animal.", a: "Lion", cat: "Animals", diff: "Easy" },
        { q: "Which animal says “meow”?", a: "Cat", cat: "Animals", diff: "Easy" },
        { q: "Which animal says “moo”?", a: "Cow", cat: "Animals", diff: "Easy" },
        { q: "Which animal barks?", a: "Dog", cat: "Animals", diff: "Easy" },
        { q: "Which animal gives milk?", a: "Cow/Goat", cat: "Animals", diff: "Easy" },
        { q: "Where does a dog live?", a: "Kennel", cat: "Animals", diff: "Medium" },
        { q: "Where does a lion live?", a: "Den", cat: "Animals", diff: "Medium" },
        { q: "Which animal has a trunk?", a: "Elephant", cat: "Animals", diff: "Easy" },
        { q: "Which animal is called king of jungle?", a: "Lion", cat: "Animals", diff: "Easy" },
        { q: "Do fish live in water?", a: "Yes", cat: "Animals", diff: "Easy" },
        { q: "Do camels live in desert?", a: "Yes", cat: "Animals", diff: "Medium" },
        { q: "Can monkeys climb trees?", a: "Yes", cat: "Animals", diff: "Easy" },
        { q: "Can cows fly?", a: "No", cat: "Animals", diff: "Easy" },
        { q: "Do birds lay eggs?", a: "Yes", cat: "Animals", diff: "Medium" },
        { q: "Do hens lay eggs?", a: "Yes", cat: "Animals", diff: "Easy" },
        { q: "Can ducks swim?", a: "Yes", cat: "Animals", diff: "Easy" },
        { q: "Which animal is very big: elephant or ant?", a: "Elephant", cat: "Animals", diff: "Easy" },
        { q: "Which animal is small: ant or elephant?", a: "Ant", cat: "Animals", diff: "Easy" },
        { q: "Name one water animal.", a: "Fish", cat: "Animals", diff: "Easy" },
        { q: "Name one bird.", a: "Parrot", cat: "Animals", diff: "Easy" },
        { q: "Name one farm animal.", a: "Cow", cat: "Animals", diff: "Easy" },
        { q: "Do animals need food?", a: "Yes", cat: "Animals", diff: "Easy" },
        { q: "Do animals need water?", a: "Yes", cat: "Animals", diff: "Easy" },
        { q: "Do animals move?", a: "Yes", cat: "Animals", diff: "Easy" },

        // D. Weather & Seasons (61–75)
        { q: "Is the sun hot?", a: "Yes", cat: "Weather", diff: "Easy" },
        { q: "When do we use an umbrella?", a: "Rainy Season", cat: "Weather", diff: "Easy" },
        { q: "What do we wear in winter?", a: "Sweater", cat: "Weather", diff: "Medium" },
        { q: "What do we wear in summer?", a: "Cotton clothes", cat: "Weather", diff: "Medium" },
        { q: "Is snow cold?", a: "Yes", cat: "Weather", diff: "Easy" },
        { q: "Do we see clouds in the sky?", a: "Yes", cat: "Weather", diff: "Easy" },
        { q: "Does it rain in rainy season?", a: "Yes", cat: "Weather", diff: "Easy" },
        { q: "What shines in the day?", a: "Sun", cat: "Weather", diff: "Easy" },
        { q: "What shines at night?", a: "Moon/Stars", cat: "Weather", diff: "Easy" },
        { q: "Is winter cold?", a: "Yes", cat: "Weather", diff: "Easy" },
        { q: "Is summer hot?", a: "Yes", cat: "Weather", diff: "Easy" },
        { q: "Do we feel hot in summer?", a: "Yes", cat: "Weather", diff: "Easy" },
        { q: "Do we feel cold in winter?", a: "Yes", cat: "Weather", diff: "Easy" },
        { q: "Do we use fan in summer?", a: "Yes", cat: "Weather", diff: "Easy" },
        { q: "Do we use sweater in winter?", a: "Yes", cat: "Weather", diff: "Easy" },

        // E. Body Parts & Senses (76–100)
        { q: "How many eyes do you have?", a: "Two", cat: "Body Parts", diff: "Easy" },
        { q: "How many ears do you have?", a: "Two", cat: "Body Parts", diff: "Easy" },
        { q: "Which body part helps you see?", a: "Eyes", cat: "Body Parts", diff: "Medium" },
        { q: "Which body part helps you hear?", a: "Ears", cat: "Body Parts", diff: "Medium" },
        { q: "Which body part helps you smell?", a: "Nose", cat: "Body Parts", diff: "Medium" },
        { q: "Which body part helps you taste?", a: "Tongue", cat: "Body Parts", diff: "Medium" },
        { q: "Which body part helps you walk?", a: "Legs", cat: "Body Parts", diff: "Medium" },
        { q: "Which body part helps you write?", a: "Hands", cat: "Body Parts", diff: "Medium" },
        { q: "Do we have two hands?", a: "Yes", cat: "Body Parts", diff: "Easy" },
        { q: "Do we have two legs?", a: "Yes", cat: "Body Parts", diff: "Easy" },
        { q: "How many nose do you have?", a: "One", cat: "Body Parts", diff: "Easy" },
        { q: "What do we use to eat?", a: "Mouth/Hands", cat: "Body Parts", diff: "Medium" },
        { q: "What do we use to talk?", a: "Mouth", cat: "Body Parts", diff: "Medium" },
        { q: "What do we use to clap?", a: "Hands", cat: "Body Parts", diff: "Medium" },
        { q: "What do we use to kick a ball?", a: "Legs/Feet", cat: "Body Parts", diff: "Medium" },
        { q: "Do we need water to live?", a: "Yes", cat: "Body Parts", diff: "Easy" },
        { q: "Do we need air to live?", a: "Yes", cat: "Body Parts", diff: "Easy" },
        { q: "Do we need food to live?", a: "Yes", cat: "Body Parts", diff: "Easy" },
        { q: "Can we see with eyes?", a: "Yes", cat: "Body Parts", diff: "Easy" },
        { q: "Can we hear with ears?", a: "Yes", cat: "Body Parts", diff: "Easy" },
        { q: "Can we smell with nose?", a: "Yes", cat: "Body Parts", diff: "Easy" },
        { q: "Can we taste with tongue?", a: "Yes", cat: "Body Parts", diff: "Easy" },
        { q: "Do we brush our teeth daily?", a: "Yes", cat: "Body Parts", diff: "Easy" },
        { q: "Do we wash hands before eating?", a: "Yes", cat: "Body Parts", diff: "Easy" },
        { q: "Should we keep our body clean?", a: "Yes", cat: "Body Parts", diff: "Easy" },

        // F. Planet System (101-110)
        { q: "What planet do we live on?", a: "Earth", cat: "Planet System", diff: "Medium" },
        { q: "Is the Sun a star?", a: "Yes", cat: "Planet System", diff: "Hard" },
        { q: "Does the Earth go around the Sun?", a: "Yes", cat: "Planet System", diff: "Hard" },
        { q: "Is the Moon a planet?", a: "No", cat: "Planet System", diff: "Hard" },
        { q: "Do we see the Sun in the day?", a: "Yes", cat: "Planet System", diff: "Easy" },
        { q: "Do we see the Moon at night?", a: "Yes", cat: "Planet System", diff: "Easy" },
        { q: "Is the Sun hot?", a: "Yes", cat: "Planet System", diff: "Easy" },
        { q: "Is the Earth round?", a: "Yes", cat: "Planet System", diff: "Medium" },
        { q: "Are there many planets in space?", a: "Yes", cat: "Planet System", diff: "Medium" },
        { q: "Does the Moon shine at night?", a: "Yes", cat: "Planet System", diff: "Easy" },

        // G. Good Habits (111-120)
        { q: "Should we brush our teeth daily?", a: "Yes", cat: "Good Habits", diff: "Easy" },
        { q: "Should we wash hands before eating?", a: "Yes", cat: "Good Habits", diff: "Easy" },
        { q: "Should we say thank you?", a: "Yes", cat: "Good Habits", diff: "Easy" },
        { q: "Should we keep our classroom clean?", a: "Yes", cat: "Good Habits", diff: "Easy" },
        { q: "Should we help our parents?", a: "Yes", cat: "Good Habits", diff: "Easy" },
        { q: "Should we throw garbage on the road?", a: "No", cat: "Good Habits", diff: "Easy" },
        { q: "Should we drink clean water?", a: "Yes", cat: "Good Habits", diff: "Easy" },
        { q: "Should we respect our teachers?", a: "Yes", cat: "Good Habits", diff: "Easy" },
        { q: "Should we wake up early?", a: "Yes", cat: "Good Habits", diff: "Easy" },
        { q: "Should we share our toys?", a: "Yes", cat: "Good Habits", diff: "Easy" }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);

    return selected.map((item, i) => ({
        id: `jrkg-sci-read-${i}`,
        title: item.cat,
        category: 'Science',
        sentences: [item.q, `✨ Answer: ${item.a}`],
        type: 'sentence',
        desc: `Read: ${item.q}`
    }));
};

const generateJrKgScienceWriting = (level, count = 100) => {
    const questionPool = [
        // A. Fill in the Blanks (1–25)
        { q: "A dog is a ______ animal.", a: "pet", cat: "Fill Blanks", diff: "Easy", type: "science-writing" },
        { q: "A lion is a ______ animal.", a: "wild", cat: "Fill Blanks", diff: "Easy", type: "science-writing" },
        { q: "Plants need ______ to grow.", a: "water", cat: "Fill Blanks", diff: "Easy", type: "science-writing" },
        { q: "The sun is ______.", a: "hot", cat: "Fill Blanks", diff: "Easy", type: "science-writing" },
        { q: "We use eyes to ______.", a: "see", cat: "Fill Blanks", diff: "Easy", type: "science-writing" },
        { q: "We use ears to ______.", a: "hear", cat: "Fill Blanks", diff: "Easy", type: "science-writing" },
        { q: "Fish can ______.", a: "swim", cat: "Fill Blanks", diff: "Easy", type: "science-writing" },
        { q: "Birds can ______.", a: "fly", cat: "Fill Blanks", diff: "Easy", type: "science-writing" },
        { q: "We wear woollen clothes in ______.", a: "winter", cat: "Fill Blanks", diff: "Medium", type: "science-writing" },
        { q: "We use umbrella when it ______.", a: "rains", cat: "Fill Blanks", diff: "Medium", type: "science-writing" },
        { q: "Leaves are ______ in color.", a: "green", cat: "Fill Blanks", diff: "Easy", type: "science-writing" },
        { q: "Mango is a ______.", a: "fruit", cat: "Fill Blanks", diff: "Easy", type: "science-writing" },
        { q: "Carrot is a ______.", a: "vegetable", cat: "Fill Blanks", diff: "Medium", type: "science-writing" },
        { q: "A cow gives us ______.", a: "milk", cat: "Fill Blanks", diff: "Easy", type: "science-writing" },
        { q: "A hen lays ______.", a: "eggs", cat: "Fill Blanks", diff: "Easy", type: "science-writing" },
        { q: "We use nose to ______.", a: "smell", cat: "Fill Blanks", diff: "Easy", type: "science-writing" },
        { q: "We use tongue to ______.", a: "taste", cat: "Fill Blanks", diff: "Easy", type: "science-writing" },
        { q: "The moon shines at ______.", a: "night", cat: "Fill Blanks", diff: "Easy", type: "science-writing" },
        { q: "We use fan in ______.", a: "summer", cat: "Fill Blanks", diff: "Easy", type: "science-writing" },
        { q: "We use sweater in ______.", a: "winter", cat: "Fill Blanks", diff: "Easy", type: "science-writing" },
        { q: "A camel lives in ______.", a: "desert", cat: "Fill Blanks", diff: "Hard", type: "science-writing" },
        { q: "Fish live in ______.", a: "water", cat: "Fill Blanks", diff: "Easy", type: "science-writing" },
        { q: "A dog lives in a ______.", a: "kennel", cat: "Fill Blanks", diff: "Hard", type: "science-writing" },
        { q: "A lion lives in a ______.", a: "den", cat: "Fill Blanks", diff: "Hard", type: "science-writing" },
        { q: "We need ______ to drink.", a: "water", cat: "Fill Blanks", diff: "Easy", type: "science-writing" },

        // B. Write One Word Answers (26–50)
        { q: "Write one fruit name.", a: "Apple", cat: "One Word", diff: "Easy", type: "science-writing" },
        { q: "Write one vegetable name.", a: "Carrot", cat: "One Word", diff: "Easy", type: "science-writing" },
        { q: "Write one pet animal.", a: "Dog", cat: "One Word", diff: "Easy", type: "science-writing" },
        { q: "Write one wild animal.", a: "Lion", cat: "One Word", diff: "Easy", type: "science-writing" },
        { q: "Write one water animal.", a: "Fish", cat: "One Word", diff: "Easy", type: "science-writing" },
        { q: "Write one bird name.", a: "Parrot", cat: "One Word", diff: "Easy", type: "science-writing" },
        { q: "Write one body part.", a: "Nose", cat: "One Word", diff: "Easy", type: "science-writing" },
        { q: "Write one season name.", a: "Summer", cat: "One Word", diff: "Medium", type: "science-writing" },
        { q: "Write one farm animal.", a: "Cow", cat: "One Word", diff: "Medium", type: "science-writing" },
        { q: "Write one living thing.", a: "Tree", cat: "One Word", diff: "Medium", type: "science-writing" },
        { q: "Write one non-living thing.", a: "Table", cat: "One Word", diff: "Medium", type: "science-writing" },
        { q: "Write one rainy season thing.", a: "Umbrella", cat: "One Word", diff: "Medium", type: "science-writing" },
        { q: "Write one summer thing.", a: "Fan", cat: "One Word", diff: "Medium", type: "science-writing" },
        { q: "Write one winter thing.", a: "Sweater", cat: "One Word", diff: "Medium", type: "science-writing" },
        { q: "Write one plant part.", a: "Leaf", cat: "One Word", diff: "Hard", type: "science-writing" },
        { q: "Write one sense organ.", a: "Eye", cat: "One Word", diff: "Hard", type: "science-writing" },
        { q: "Write one desert animal.", a: "Camel", cat: "One Word", diff: "Hard", type: "science-writing" },
        { q: "Write one jungle animal.", a: "Tiger", cat: "One Word", diff: "Medium", type: "science-writing" },
        { q: "Write one healthy habit.", a: "Brush", cat: "One Word", diff: "Medium", type: "science-writing" },
        { q: "Write one color of flower.", a: "Red", cat: "One Word", diff: "Easy", type: "science-writing" },
        { q: "Write one thing we get from plants.", a: "Fruit", cat: "One Word", diff: "Medium", type: "science-writing" },
        { q: "Write one big animal.", a: "Elephant", cat: "One Word", diff: "Medium", type: "science-writing" },
        { q: "Write one small animal.", a: "Ant", cat: "One Word", diff: "Medium", type: "science-writing" },
        { q: "Write one clean habit.", a: "Bath", cat: "One Word", diff: "Medium", type: "science-writing" },
        { q: "Write one food item.", a: "Rice", cat: "One Word", diff: "Easy", type: "science-writing" },

        // C. Short Answer Writing (51–75)
        { q: "Name 2 fruits.", a: "Apple, Mango", cat: "Lists", diff: "Medium", type: "free-write", count: 2 },
        { q: "Name 2 vegetables.", a: "Potato, Carrot", cat: "Lists", diff: "Medium", type: "free-write", count: 2 },
        { q: "Name 2 pet animals.", a: "Dog, Cat", cat: "Lists", diff: "Medium", type: "free-write", count: 2 },
        { q: "Name 2 wild animals.", a: "Lion, Tiger", cat: "Lists", diff: "Medium", type: "free-write", count: 2 },
        { q: "Name 2 body parts.", a: "Hand, Leg", cat: "Lists", diff: "Medium", type: "free-write", count: 2 },
        { q: "Name 2 birds.", a: "Crow, Parrot", cat: "Lists", diff: "Medium", type: "free-write", count: 2 },
        { q: "Name 2 seasons.", a: "Summer, Winter", cat: "Lists", diff: "Medium", type: "free-write", count: 2 },
        { q: "Write 2 things we get from plants.", a: "Fruit, Wood", cat: "Lists", diff: "Hard", type: "free-write", count: 2 },
        { q: "Write 2 living things.", a: "Boy, Dog", cat: "Lists", diff: "Hard", type: "free-write", count: 2 },
        { q: "Write 2 non-living things.", a: "Car, Pen", cat: "Lists", diff: "Hard", type: "free-write", count: 2 },
        { q: "Write 2 water animals.", a: "Fish, Shark", cat: "Lists", diff: "Medium", type: "free-write", count: 2 },
        { q: "Write 2 farm animals.", a: "Cow, Sheep", cat: "Lists", diff: "Medium", type: "free-write", count: 2 },
        { q: "Write 2 winter clothes.", a: "Cap, Coat", cat: "Lists", diff: "Hard", type: "free-write", count: 2 },
        { q: "Write 2 summer things.", a: "Ice cream, Fan", cat: "Lists", diff: "Hard", type: "free-write", count: 2 },
        { q: "Write 2 rainy season things.", a: "Raincoat, Umbrella", cat: "Lists", diff: "Hard", type: "free-write", count: 2 },
        { q: "Write 2 clean habits.", a: "Brush, Bath", cat: "Lists", diff: "Hard", type: "free-write", count: 2 },
        { q: "Write 2 healthy foods.", a: "Milk, Egg", cat: "Lists", diff: "Hard", type: "free-write", count: 2 },
        { q: "Write 2 plant parts.", a: "Root, Leaf", cat: "Lists", diff: "Hard", type: "free-write", count: 2 },
        { q: "Write 2 sense organs.", a: "Eyes, Ears", cat: "Lists", diff: "Hard", type: "free-write", count: 2 },
        { q: "Write 2 animals that lay eggs.", a: "Hen, Duck", cat: "Lists", diff: "Hard", type: "free-write", count: 2 },
        { q: "Write 2 animals that give milk.", a: "Cow, Goat", cat: "Lists", diff: "Hard", type: "free-write", count: 2 },
        { q: "Write 2 big animals.", a: "Elephant, Camel", cat: "Lists", diff: "Medium", type: "free-write", count: 2 },
        { q: "Write 2 small animals.", a: "Ant, Fly", cat: "Lists", diff: "Medium", type: "free-write", count: 2 },
        { q: "Write 2 things we drink.", a: "Water, Milk", cat: "Lists", diff: "Medium", type: "free-write", count: 2 },
        { q: "Write 2 things we eat.", a: "Rice, Bread", cat: "Lists", diff: "Medium", type: "free-write", count: 2 },

        // D. Simple Sentence Writing (76–100)
        { q: "Write: The sun is hot.", a: "The sun is hot.", cat: "Sentences", diff: "Medium", type: "science-writing" },
        { q: "Write: Plants need water.", a: "Plants need water.", cat: "Sentences", diff: "Medium", type: "science-writing" },
        { q: "Write: Birds can fly.", a: "Birds can fly.", cat: "Sentences", diff: "Medium", type: "science-writing" },
        { q: "Write: Fish can swim.", a: "Fish can swim.", cat: "Sentences", diff: "Medium", type: "science-writing" },
        { q: "Write: I have two eyes.", a: "I have two eyes.", cat: "Sentences", diff: "Medium", type: "science-writing" },
        { q: "Write: I have two ears.", a: "I have two ears.", cat: "Sentences", diff: "Medium", type: "science-writing" },
        { q: "Write: We need food.", a: "We need food.", cat: "Sentences", diff: "Medium", type: "science-writing" },
        { q: "Write: We need water.", a: "We need water.", cat: "Sentences", diff: "Medium", type: "science-writing" },
        { q: "Write: The cow gives milk.", a: "The cow gives milk.", cat: "Sentences", diff: "Medium", type: "science-writing" },
        { q: "Write: Mango is a fruit.", a: "Mango is a fruit.", cat: "Sentences", diff: "Medium", type: "science-writing" },
        { q: "Write: Carrot is a vegetable.", a: "Carrot is a vegetable.", cat: "Sentences", diff: "Medium", type: "science-writing" },
        { q: "Write: The lion is strong.", a: "The lion is strong.", cat: "Sentences", diff: "Medium", type: "science-writing" },
        { q: "Write: The ant is small.", a: "The ant is small.", cat: "Sentences", diff: "Medium", type: "science-writing" },
        { q: "Write: Winter is cold.", a: "Winter is cold.", cat: "Sentences", diff: "Medium", type: "science-writing" },
        { q: "Write: Summer is hot.", a: "Summer is hot.", cat: "Sentences", diff: "Medium", type: "science-writing" },
        { q: "Write: Rainy season has rain.", a: "Rainy season has rain.", cat: "Sentences", diff: "Medium", type: "science-writing" },
        { q: "Write: I brush my teeth.", a: "I brush my teeth.", cat: "Sentences", diff: "Medium", type: "science-writing" },
        { q: "Write: I wash my hands.", a: "I wash my hands.", cat: "Sentences", diff: "Medium", type: "science-writing" },
        { q: "Write: I keep my body clean.", a: "I keep my body clean.", cat: "Sentences", diff: "Medium", type: "science-writing" },
        { q: "Write: We breathe air.", a: "We breathe air.", cat: "Sentences", diff: "Medium", type: "science-writing" },
        { q: "Write: Trees give us oxygen.", a: "Trees give us oxygen.", cat: "Sentences", diff: "Medium", type: "science-writing" },
        { q: "Write: Flowers are beautiful.", a: "Flowers are beautiful.", cat: "Sentences", diff: "Medium", type: "science-writing" },
        { q: "Write: Dogs are friendly.", a: "Dogs are friendly.", cat: "Sentences", diff: "Medium", type: "science-writing" },
        { q: "Write: I love nature.", a: "I love nature.", cat: "Sentences", diff: "Medium", type: "science-writing" },
        { q: "Write 3 lines about plants.", a: "Plants give food...", cat: "Creative", diff: "Hard", type: "free-write", count: 3 },

        // E. Planet System Writing (101-110)
        { q: "Write the name of our planet.", a: "Earth", cat: "Planet System", diff: "Medium", type: "science-writing" },
        { q: "Write the name of the star in our solar system.", a: "Sun", cat: "Planet System", diff: "Medium", type: "science-writing" },
        { q: "Write: The Earth goes around the Sun.", a: "The Earth goes around the Sun.", cat: "Planet System", diff: "Hard", type: "science-writing" },
        { q: "Write: The Sun is hot.", a: "The Sun is hot.", cat: "Planet System", diff: "Easy", type: "science-writing" },
        { q: "Write: The Moon shines at night.", a: "The Moon shines at night.", cat: "Planet System", diff: "Medium", type: "science-writing" },
        { q: "Fill in the blank: We live on ______.", a: "Earth", cat: "Planet System", diff: "Medium", type: "science-writing" },
        { q: "Fill in the blank: The ______ gives us light.", a: "Sun", cat: "Planet System", diff: "Easy", type: "science-writing" },
        { q: "Write one thing you see in the sky at night.", a: "Moon", cat: "Planet System", diff: "Easy", type: "science-writing" },
        { q: "Write one thing you see in the sky in the day.", a: "Sun", cat: "Planet System", diff: "Easy", type: "science-writing" },
        { q: "Draw and write the name of the Earth.", a: "Earth", cat: "Planet System", diff: "Medium", type: "science-writing" },

        // F. Good Habits Writing (111-120)
        { q: "Write: I brush my teeth daily.", a: "I brush my teeth daily.", cat: "Good Habits", diff: "Medium", type: "science-writing" },
        { q: "Write: I wash my hands before eating.", a: "I wash my hands.", cat: "Good Habits", diff: "Medium", type: "science-writing" },
        { q: "Write: I keep my classroom clean.", a: "I keep my classroom clean.", cat: "Good Habits", diff: "Medium", type: "science-writing" },
        { q: "Write: I say thank you.", a: "I say thank you.", cat: "Good Habits", diff: "Medium", type: "science-writing" },
        { q: "Write: I help my parents.", a: "I help my parents.", cat: "Good Habits", diff: "Medium", type: "science-writing" },
        { q: "Fill in the blank: We should keep our body ______.", a: "Clean", cat: "Good Habits", diff: "Easy", type: "science-writing" },
        { q: "Fill in the blank: We should drink ______ water.", a: "Clean", cat: "Good Habits", diff: "Easy", type: "science-writing" },
        { q: "Write two good habits.", a: "Brush, Bath", cat: "Good Habits", diff: "Hard", type: "free-write", count: 2 },
        { q: "Write one clean habit.", a: "Bath", cat: "Good Habits", diff: "Medium", type: "science-writing" },
        { q: "Write three lines about good habits.", a: "Good habits...", cat: "Good Habits", diff: "Hard", type: "free-write", count: 3 }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);

    return selected.map((item, i) => ({
        id: `jrkg-sci-write-${i}`,
        title: item.cat,
        type: item.type,
        desc: item.q,
        question: item.q,
        answer: item.a,
        target: item.a,
        ...(item.count && { count: item.count })
    }));
};

const generateJrKgScienceActivity = (level, count = 100) => {
    // 1. BODY PARTS (Pick & Place -> Action/Matching)
    const bodyParts = [
        { q: "Touch your eyes! 👀", a: "Done", type: "action", cat: "Body Parts", desc: "Pick the eyes and paste on the face (Pretend!)" },
        { q: "Touch your nose! 👃", a: "Done", type: "action", cat: "Body Parts", desc: "Pick the nose and paste correctly." },
        { q: "Touch your ears! 👂", a: "Done", type: "action", cat: "Body Parts", desc: "Pick the ears and paste correctly." },
        { q: "Open your mouth! 👄", a: "Done", type: "action", cat: "Body Parts", desc: "Pick the mouth and paste it." },
        { q: "Clap your hands! 👏", a: "Done", type: "action", cat: "Body Parts", desc: "Pick the hands and paste correctly." },
        { q: "Stomp your legs! 🦵", a: "Done", type: "action", cat: "Body Parts", desc: "Pick the legs and paste correctly." },
        { q: "Wiggle your feet! 🦶", a: "Done", type: "action", cat: "Body Parts", desc: "Pick the feet and paste correctly." },
        { q: "Touch your hair! 💇", a: "Done", type: "action", cat: "Body Parts", desc: "Pick the hair and paste on head." },
        { q: "Touch your tongue! 👅", a: "Done", type: "action", cat: "Body Parts", desc: "Place the tongue inside the mouth." },
        { q: "Touch your eyebrows! 🤨", a: "Done", type: "action", cat: "Body Parts", desc: "Place eyebrows above eyes." },

        { q: "Which part helps you see?", a: "Eyes", type: "matching", options: ["Eyes", "Nose", "Ears"], cat: "Sense Organs", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Eye_iris_brown.jpg/320px-Eye_iris_brown.jpg" },
        { q: "Which part helps you hear?", a: "Ears", type: "matching", options: ["Ears", "Eyes", "Skin"], cat: "Sense Organs" },
        { q: "Which part helps you smell?", a: "Nose", type: "matching", options: ["Nose", "Tongue", "Hand"], cat: "Sense Organs" },
        { q: "Which part helps you taste?", a: "Tongue", type: "matching", options: ["Tongue", "Nose", "Ear"], cat: "Sense Organs" },
        { q: "Which part helps you touch?", a: "Skin", type: "matching", options: ["Skin", "Eye", "Hair"], cat: "Sense Organs" },

        { q: "Touch your nose.", a: "Done", type: "action", cat: "Action Activity" },
        { q: "Clap your hands.", a: "Done", type: "action", cat: "Action Activity" },
        { q: "Stamp your feet.", a: "Done", type: "action", cat: "Action Activity" },
        { q: "Blink your eyes.", a: "Done", type: "action", cat: "Action Activity" },
        { q: "Show two hands.", a: "Done", type: "action", cat: "Action Activity" }
    ];

    // 2. SOLAR SYSTEM (Arrange -> Order/Matching)
    const solarSystem = [
        { q: "Place the Sun in the center.", a: "Done", type: "action", cat: "Solar System", desc: "Imagine placing the Sun!" },
        { q: "Which planet is 1st from Sun?", a: "Mercury", type: "matching", options: ["Mercury", "Earth", "Mars"], cat: "Solar System" },
        { q: "Place Mercury after Sun.", a: "Done", type: "action", cat: "Solar System" },
        { q: "Which planet is 2nd?", a: "Venus", type: "matching", options: ["Venus", "Mars", "Jupiter"], cat: "Solar System" },
        { q: "Place Venus correctly.", a: "Done", type: "action", cat: "Solar System" },
        { q: "Which planet do we live on?", a: "Earth", type: "matching", options: ["Earth", "Mars", "Venus"], cat: "Solar System", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/320px-The_Earth_seen_from_Apollo_17.jpg" },
        { q: "Which planet is after Earth?", a: "Mars", type: "matching", options: ["Mars", "Jupiter", "Saturn"], cat: "Solar System" },
        { q: "Place Mars in correct position.", a: "Done", type: "action", cat: "Solar System" },
        { q: "Which planet is biggest?", a: "Jupiter", type: "matching", options: ["Jupiter", "Earth", "Mars"], cat: "Solar System" },
        { q: "Place Jupiter correctly.", a: "Done", type: "action", cat: "Solar System" },
        { q: "Which planet has rings?", a: "Saturn", type: "matching", options: ["Saturn", "Mars", "Venus"], cat: "Solar System" },
        { q: "Place Saturn correctly.", a: "Done", type: "action", cat: "Solar System" },
        { q: "Arranging all 8 planets...", a: "Done", type: "action", cat: "Solar System", desc: "Pretend to line them up!" },
        { q: "Color Earth blue and green.", a: "Done", type: "action", cat: "Solar System" },
        { q: "Show the Moon near Earth.", a: "Done", type: "action", cat: "Solar System" }
    ];

    // 3. ANIMALS & HOMES (Match)
    const animalHomes = [
        { q: "Where does a Dog live?", a: "Kennel", type: "matching", options: ["Kennel", "Den", "Nest"], cat: "Animals & Homes", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Dog.svg/320px-Dog.svg.png" },
        { q: "Where does a Lion live?", a: "Den", type: "matching", options: ["Den", "Shed", "Coop"], cat: "Animals & Homes", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Lion_clipart.svg/600px-Lion_clipart.svg.png" },
        { q: "Where does a Bird live?", a: "Nest", type: "matching", options: ["Nest", "Water", "Stable"], cat: "Animals & Homes" },
        { q: "Where does a Cow live?", a: "Shed", type: "matching", options: ["Shed", "Web", "Hive"], cat: "Animals & Homes" },
        { q: "Where does a Horse live?", a: "Stable", type: "matching", options: ["Stable", "Burrow", "Kennel"], cat: "Animals & Homes" },
        { q: "Where does a Bee live?", a: "Hive", type: "matching", options: ["Hive", "Nest", "Den"], cat: "Animals & Homes" },
        { q: "Where does a Spider live?", a: "Web", type: "matching", options: ["Web", "Coop", "Shed"], cat: "Animals & Homes" },
        { q: "Where does a Rabbit live?", a: "Burrow", type: "matching", options: ["Burrow", "Web", "Water"], cat: "Animals & Homes" },
        { q: "Where does a Hen live?", a: "Coop", type: "matching", options: ["Coop", "Stable", "Hive"], cat: "Animals & Homes" },
        { q: "Where does a Fish live?", a: "Water", type: "matching", options: ["Water", "Nest", "Den"], cat: "Animals & Homes" },

        { q: "Sort: Is a Dog a Pet?", a: "Yes", type: "matching", options: ["Yes", "No"], cat: "Sorting Animals" },
        { q: "Sort: Is a Lion Wild?", a: "Yes", type: "matching", options: ["Yes", "No"], cat: "Sorting Animals" },
        { q: "Sort: Is a Cow a Farm Animal?", a: "Yes", type: "matching", options: ["Yes", "No"], cat: "Sorting Animals" },
        { q: "Is Fish a water animal?", a: "Yes", type: "matching", options: ["Yes", "No"], cat: "Sorting Animals" },
        { q: "Is Elephant a land animal?", a: "Yes", type: "matching", options: ["Yes", "No"], cat: "Sorting Animals" },

        { q: "Dog says...", a: "Woof", type: "matching", options: ["Woof", "Meow", "Moo"], cat: "Sound Match" },
        { q: "Cow says...", a: "Moo", type: "matching", options: ["Moo", "Quack", "Roar"], cat: "Sound Match" },
        { q: "Cat says...", a: "Meow", type: "matching", options: ["Meow", "Woof", "Baa"], cat: "Sound Match" },
        { q: "Duck says...", a: "Quack", type: "matching", options: ["Quack", "Moo", "Meow"], cat: "Sound Match" },
        { q: "Lion says...", a: "Roar", type: "matching", options: ["Roar", "Quack", "Woof"], cat: "Sound Match" }
    ];

    // 4. PLANTS (Labeling -> Action/Quest)
    const plants = [
        { q: "Where do roots go?", a: "Under soil", type: "matching", options: ["Under soil", "On top", "In sky"], cat: "Plants & Parts" },
        { q: "Place stem in middle.", a: "Done", type: "action", cat: "Plants & Parts" },
        { q: "Place leaves on stem.", a: "Done", type: "action", cat: "Plants & Parts" },
        { q: "Place flower on top.", a: "Done", type: "action", cat: "Plants & Parts" },
        { q: "Circle the fruit.", a: "Done", type: "action", cat: "Plants & Parts", desc: "Find the fruit on the plant!" },

        { q: "What do plants need?", a: "Water", type: "matching", options: ["Water", "Cola", "Juice"], cat: "Plants Questions" },
        { q: "Do plants need sunlight?", a: "Yes", type: "matching", options: ["Yes", "No"], cat: "Plants Questions" },
        { q: "Do plants need water?", a: "Yes", type: "matching", options: ["Yes", "No"], cat: "Plants Questions" },
        { q: "What grows under soil?", a: "Roots", type: "matching", options: ["Roots", "Flower", "Leaves"], cat: "Plants Questions" },
        { q: "What makes food for plant?", a: "Leaves", type: "matching", options: ["Leaves", "Roots", "Stem"], cat: "Plants Questions" },
        { q: "What do we get from plants?", a: "Fruits", type: "matching", options: ["Fruits", "Plastic", "Glass"], cat: "Plants Questions" },
        { q: "Name a fruit.", a: "Apple", type: "activity-quest", cat: "Plants Questions" },
        { q: "Name a vegetable.", a: "Carrot", type: "activity-quest", cat: "Plants Questions" },
        { q: "Color the leaves green.", a: "Done", type: "action", cat: "Plants Activity" },
        { q: "Plant a seed!", a: "Done", type: "action", cat: "Plants Activity" }
    ];

    // 5. WEATHER (Match)
    const weather = [
        { q: "Match: Winter wears...", a: "Sweater", type: "matching", options: ["Sweater", "Cap", "Raincoat"], cat: "Weather", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Snow_crystal.svg/320px-Snow_crystal.svg.png" },
        { q: "Match: Summer wears...", a: "Cap", type: "matching", options: ["Cap", "Sweater", "Raincoat"], cat: "Weather" },
        { q: "Match: Rainy wears...", a: "Umbrella", type: "matching", options: ["Umbrella", "Sweater", "None"], cat: "Weather" },
        { q: "Show Sun in day.", a: "Done", type: "action", cat: "Weather" },
        { q: "Show Moon at night.", a: "Done", type: "action", cat: "Weather" },

        { q: "Is summer hot or cold?", a: "Hot", type: "matching", options: ["Hot", "Cold"], cat: "Weather Questions" },
        { q: "Is winter hot or cold?", a: "Cold", type: "matching", options: ["Cold", "Hot"], cat: "Weather Questions" },
        { q: "When use raincoat?", a: "Rainy", type: "matching", options: ["Rainy", "Summer", "Winter"], cat: "Weather Questions" },
        { q: "Do we see clouds?", a: "Yes", type: "matching", options: ["Yes", "No"], cat: "Weather Questions" },
        { q: "Is snow cold?", a: "Yes", type: "matching", options: ["Yes", "No"], cat: "Weather Questions" },
        { q: "Draw a rainbow.", a: "Done", type: "action", cat: "Weather Activity" },
        { q: "Which is hot?", a: "Sun", type: "matching", options: ["Sun", "Ice"], cat: "Weather Activity" },
        { q: "Which is cold?", a: "Ice", type: "matching", options: ["Ice", "Fire"], cat: "Weather Activity" },
        { q: "Fan is for...", a: "Summer", type: "matching", options: ["Summer", "Winter"], cat: "Weather Activity" },
        { q: "Woollen is for...", a: "Winter", type: "matching", options: ["Winter", "Summer"], cat: "Weather Activity" }
    ];

    // 6. GOOD HABITS (Tick/Cross -> Yes/No)
    const habits = [
        { q: "Brushing teeth daily?", a: "Good", type: "matching", options: ["Good", "Bad"], cat: "Habits" },
        { q: "Throwing garbage on road?", a: "Bad", type: "matching", options: ["Bad", "Good"], cat: "Habits" },
        { q: "Washing hands before eating?", a: "Good", type: "matching", options: ["Good", "Bad"], cat: "Habits" },
        { q: "Not taking bath?", a: "Bad", type: "matching", options: ["Bad", "Good"], cat: "Habits" },
        { q: "Drinking clean water?", a: "Good", type: "matching", options: ["Good", "Bad"], cat: "Habits" },

        { q: "Should we say Thank You?", a: "Yes", type: "matching", options: ["Yes", "No"], cat: "Habits Questions" },
        { q: "Should we respect elders?", a: "Yes", type: "matching", options: ["Yes", "No"], cat: "Habits Questions" },
        { q: "Keep classroom clean?", a: "Yes", type: "matching", options: ["Yes", "No"], cat: "Habits Questions" },
        { q: "Eat healthy food?", a: "Yes", type: "matching", options: ["Yes", "No"], cat: "Habits Questions" },
        { q: "Share toys?", a: "Yes", type: "matching", options: ["Yes", "No"], cat: "Habits Questions" },
        { q: "Show how to wash hands.", a: "Done", type: "action", cat: "Habits Activity" },
        { q: "Show how to brush teeth.", a: "Done", type: "action", cat: "Habits Activity" },
        { q: "Name a healthy food.", a: "Apple", type: "activity-quest", cat: "Habits Activity" },
        { q: "Name a clean habit.", a: "Bath", type: "activity-quest", cat: "Habits Activity" },
        { q: "Draw a healthy child.", a: "Done", type: "action", cat: "Habits Activity" }
    ];

    const all = [
        ...bodyParts,
        ...solarSystem,
        ...animalHomes,
        ...plants,
        ...weather,
        ...habits
    ];

    const shuffled = all.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);

    return selected.map((item, i) => ({
        id: `jrkg-sci-act-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        target: item.a,
        answer: item.a,
        options: item.options,
        imageUrl: item.img,
        desc: item.desc || "Complete the activity!",
        activity: "Science Activity"
    }));
};

const generateSrKgScienceActivity = (level, count = 100) => {
    // 1. BODY PARTS & ORGANS (Internal/Functions)
    const bodyParts = [
        { q: "Which organ pumps blood?", a: "Heart", type: "matching", options: ["Heart", "Lungs", "Brain"], cat: "Internal Organs", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Diagram_of_the_human_heart_%28cropped%29.svg/320px-Diagram_of_the_human_heart_%28cropped%29.svg.png" },
        { q: "Which organ helps us think?", a: "Brain", type: "matching", options: ["Brain", "Stomach", "Heart"], cat: "Internal Organs", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Encephalon.svg/320px-Encephalon.svg.png" },
        { q: "Which organ digests food?", a: "Stomach", type: "matching", options: ["Stomach", "Lungs", "Brain"], cat: "Internal Organs" },
        { q: "Which organ helps us breathe?", a: "Lungs", type: "matching", options: ["Lungs", "Heart", "Liver"], cat: "Internal Organs" },
        { q: "What covers our whole body?", a: "Skin", type: "matching", options: ["Skin", "Bones", "Hair"], cat: "Internal Organs" },
        { q: "The skeleton is made of?", a: "Bones", type: "matching", options: ["Bones", "Muscles", "Skin"], cat: "Internal Organs" },
        { q: "Where is the brain located?", a: "Head", type: "matching", options: ["Head", "Chest", "Stomach"], cat: "Internal Organs" },
        { q: "Touch your chest (Heart/Lungs)!", a: "Done", type: "action", cat: "Body Activity" },
        { q: "Take a deep breath (Lungs)!", a: "Done", type: "action", cat: "Body Activity" },
        { q: "Flex your muscles!", a: "Done", type: "action", cat: "Body Activity" },

        { q: "We have ___ sense organs.", a: "5", type: "matching", options: ["5", "4", "3"], cat: "Senses Advanced" },
        { q: "Ears help us to...", a: "Hear", type: "matching", options: ["Hear", "See", "Smell"], cat: "Senses Advanced" },
        { q: "Tongue helps us to...", a: "Taste", type: "matching", options: ["Taste", "Touch", "Hear"], cat: "Senses Advanced" },
        { q: "Skin helps us to...", a: "Feel", type: "matching", options: ["Feel", "See", "Taste"], cat: "Senses Advanced" },
        { q: "Nose helps us to...", a: "Smell", type: "matching", options: ["Smell", "Taste", "Hear"], cat: "Senses Advanced" }
    ];

    // 2. SOLAR SYSTEM (Facts & Details)
    const solarSystem = [
        { q: "The Sun is a...", a: "Star", type: "matching", options: ["Star", "Planet", "Moon"], cat: "Solar System Facts" },
        { q: "We live on...", a: "Earth", type: "matching", options: ["Earth", "Mars", "Venus"], cat: "Solar System Facts" },
        { q: "The Red Planet is...", a: "Mars", type: "matching", options: ["Mars", "Jupiter", "Saturn"], cat: "Solar System Facts" },
        { q: "The biggest planet is...", a: "Jupiter", type: "matching", options: ["Jupiter", "Earth", "Mars"], cat: "Solar System Facts" },
        { q: "Planet with rings?", a: "Saturn", type: "matching", options: ["Saturn", "Neptune", "Mars"], cat: "Solar System Facts" },
        { q: "Closest planet to Sun?", a: "Mercury", type: "matching", options: ["Mercury", "Venus", "Earth"], cat: "Solar System Facts" },
        { q: "Hottest planet?", a: "Venus", type: "matching", options: ["Venus", "Mars", "Earth"], cat: "Solar System Facts" },
        { q: "Natural satellite of Earth?", a: "Moon", type: "matching", options: ["Moon", "Sun", "Star"], cat: "Solar System Facts" },
        { q: "Solar System has ___ planets.", a: "8", type: "matching", options: ["8", "9", "7"], cat: "Solar System Facts" },
        { q: "Draw the Solar System!", a: "Done", type: "action", cat: "Space Activity" },
        { q: "Act like an astronaut!", a: "Done", type: "action", cat: "Space Activity" },
        { q: "Show how Earth spins.", a: "Done", type: "action", cat: "Space Activity" },
        { q: "Name the Blue Planet.", a: "Earth", type: "activity-quest", cat: "Space Activity" },
        { q: "Name a Gas Giant.", a: "Jupiter", type: "activity-quest", cat: "Space Activity" }
    ];

    // 3. ANIMALS (Classification)
    const animals = [
        { q: "Cow is a ____.", a: "Herbivore", type: "matching", options: ["Herbivore", "Carnivore", "Omnivore"], cat: "Animal Diet" },
        { q: "Lion is a ____.", a: "Carnivore", type: "matching", options: ["Carnivore", "Herbivore", "Omnivore"], cat: "Animal Diet" },
        { q: "Bear is an ____.", a: "Omnivore", type: "matching", options: ["Omnivore", "Herbivore", "Carnivore"], cat: "Animal Diet" },
        { q: "Animals that eat plants?", a: "Herbivore", type: "matching", options: ["Herbivore", "Carnivore"], cat: "Animal Diet" },
        { q: "Animals that eat meat?", a: "Carnivore", type: "matching", options: ["Carnivore", "Herbivore"], cat: "Animal Diet" },

        { q: "Fish live in...", a: "Water", type: "matching", options: ["Water", "Land", "Trees"], cat: "Animal Habitat" },
        { q: "Monkeys live on...", a: "Trees", type: "matching", options: ["Trees", "Water", "Caves"], cat: "Animal Habitat" },
        { q: "Camels live in...", a: "Desert", type: "matching", options: ["Desert", "Forest", "Water"], cat: "Animal Habitat" },
        { q: "Polar Bears live in...", a: "Snow", type: "matching", options: ["Snow", "Desert", "Forest"], cat: "Animal Habitat" },
        { q: "Frogs can live on...", a: "Both", type: "matching", options: ["Both", "Land", "Water"], cat: "Animal Habitat" },

        { q: "A baby dog is a...", a: "Puppy", type: "matching", options: ["Puppy", "Kitten", "Calf"], cat: "Young Ones" },
        { q: "A baby cat is a...", a: "Kitten", type: "matching", options: ["Kitten", "Puppy", "Cub"], cat: "Young Ones" },
        { q: "A baby cow is a...", a: "Calf", type: "matching", options: ["Calf", "Foal", "Lamb"], cat: "Young Ones" },
        { q: "A baby lion is a...", a: "Cub", type: "matching", options: ["Cub", "Kitten", "Calf"], cat: "Young Ones" },
        { q: "A baby sheep is a...", a: "Lamb", type: "matching", options: ["Lamb", "Kid", "Calf"], cat: "Young Ones" }
    ];

    // 4. PLANTS (Processes)
    const plants = [
        { q: "Plants need sunlight, air and...", a: "Water", type: "matching", options: ["Water", "Sand", "Milk"], cat: "Plant Life" },
        { q: "Process of making food?", a: "Photosynthesis", type: "matching", options: ["Photosynthesis", "Digestion"], cat: "Plant Life" },
        { q: "Which part makes food?", a: "Leaf", type: "matching", options: ["Leaf", "Root", "Stem"], cat: "Plant Life" },
        { q: "Which part absorbs water?", a: "Root", type: "matching", options: ["Root", "Leaf", "Flower"], cat: "Plant Life" },
        { q: "Which part becomes fruit?", a: "Flower", type: "matching", options: ["Flower", "Leaf", "Stem"], cat: "Plant Life" },

        { q: "A seed grows into a...", a: "Plant", type: "matching", options: ["Plant", "Rock", "Water"], cat: "Plant Life" },
        { q: "Big plants are called...", a: "Trees", type: "matching", options: ["Trees", "Herbs", "Shrubs"], cat: "Plant Life" },
        { q: "Small bushy plants?", a: "Shrubs", type: "matching", options: ["Shrubs", "Trees"], cat: "Plant Life" },
        { q: "Very small green plants?", a: "Herbs", type: "matching", options: ["Herbs", "Trees"], cat: "Plant Life" },
        { q: "Plants give us...", a: "Oxygen", type: "matching", options: ["Oxygen", "Carbon Dioxide"], cat: "Plant Life" },

        { q: "Name a root vegetable.", a: "Carrot", type: "activity-quest", cat: "Plant Activity" },
        { q: "Name a leafy vegetable.", a: "Spinach", type: "activity-quest", cat: "Plant Activity" },
        { q: "Draw a tree.", a: "Done", type: "action", cat: "Plant Activity" },
        { q: "Show how a seed grows.", a: "Done", type: "action", cat: "Plant Activity" }
    ];

    // 5. WEATHER & SEASONS (Science)
    const weather = [
        { q: "Water turns to vapor by...", a: "Heat", type: "matching", options: ["Heat", "Cold", "Wind"], cat: "Water Cycle" },
        { q: "Vapor turns to clouds by...", a: "Cooling", type: "matching", options: ["Cooling", "Heating"], cat: "Water Cycle" },
        { q: "Water falling from clouds?", a: "Rain", type: "matching", options: ["Rain", "Smoke", "Wind"], cat: "Water Cycle" },
        { q: "We measure heat with a...", a: "Thermometer", type: "matching", options: ["Thermometer", "Ruler"], cat: "Weather Science" },
        { q: "Moving air is called...", a: "Wind", type: "matching", options: ["Wind", "Rain", "Snow"], cat: "Weather Science" },

        { q: "Which season is hottest?", a: "Summer", type: "matching", options: ["Summer", "Winter", "Monsoon"], cat: "Seasons" },
        { q: "Which season is coldest?", a: "Winter", type: "matching", options: ["Winter", "Summer", "Autumn"], cat: "Seasons" },
        { q: "Trees shed leaves in...", a: "Autumn", type: "matching", options: ["Autumn", "Spring"], cat: "Seasons" },
        { q: "New flowers bloom in...", a: "Spring", type: "matching", options: ["Spring", "Autumn"], cat: "Seasons" },
        { q: "We use AC in...", a: "Summer", type: "matching", options: ["Summer", "Winter"], cat: "Seasons" },

        { q: "Name a summer fruit.", a: "Mango", type: "activity-quest", cat: "Weather Activity" },
        { q: "Name a winter veggie.", a: "Carrot", type: "activity-quest", cat: "Weather Activity" },
        { q: "Draw the water cycle.", a: "Done", type: "action", cat: "Weather Activity" },
        { q: "Act like a storm!", a: "Done", type: "action", cat: "Weather Activity" }
    ];

    // 6. GOOD HABITS & ENVIRONMENT
    const habits = [
        { q: "Throwing plastic in river is...", a: "Bad", type: "matching", options: ["Bad", "Good"], cat: "Environment" },
        { q: "We should recycle...", a: "Paper", type: "matching", options: ["Paper", "Food", "Water"], cat: "Environment" },
        { q: "Smoke makes air...", a: "Dirty", type: "matching", options: ["Dirty", "Clean"], cat: "Environment" },
        { q: "We should plant...", a: "Trees", type: "matching", options: ["Trees", "Plastic"], cat: "Environment" },
        { q: "Save water?", a: "Yes", type: "matching", options: ["Yes", "No"], cat: "Environment" },

        { q: "Eating junk food is...", a: "Unhealthy", type: "matching", options: ["Unhealthy", "Healthy"], cat: "Health" },
        { q: "Playing sports is...", a: "Healthy", type: "matching", options: ["Healthy", "Unhealthy"], cat: "Health" },
        { q: "Sleeping late is...", a: "Unhealthy", type: "matching", options: ["Unhealthy", "Healthy"], cat: "Health" },
        { q: "Washing hands kills...", a: "Germs", type: "matching", options: ["Germs", "Soap"], cat: "Health" },
        { q: "We need ___ hours of sleep.", a: "8", type: "matching", options: ["8", "2", "20"], cat: "Health" },

        { q: "Name a junk food.", a: "Burger", type: "activity-quest", cat: "Health Activity" },
        { q: "Name a healthy fruit.", a: "Apple", type: "activity-quest", cat: "Health Activity" },
        { q: "Show how to recycle.", a: "Done", type: "action", cat: "Health Activity" },
        { q: "Exercise for 1 min!", a: "Done", type: "action", cat: "Health Activity" }
    ];

    const all = [
        ...bodyParts,
        ...solarSystem,
        ...animals,
        ...plants,
        ...weather,
        ...habits
    ];

    const shuffled = all.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);

    return selected.map((item, i) => ({
        id: `srkg-sci-act-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        target: item.a,
        answer: item.a,
        options: item.options,
        imageUrl: item.img,
        desc: item.desc || "Complete the challenge!",
        activity: "Science Activity"
    }));
};

// --- JR. KG MATH CURRICULUM ---

const generateJrKgMathReading = (level, count = 100) => {
    const questionPool = [
        { q: "Read: 1", a: "One", cat: "Numbers", diff: "Easy" },
        { q: "Read: 2", a: "Two", cat: "Numbers", diff: "Easy" },
        { q: "Read: 3", a: "Three", cat: "Numbers", diff: "Easy" },
        { q: "Read: 4", a: "Four", cat: "Numbers", diff: "Easy" },
        { q: "Read: 5", a: "Five", cat: "Numbers", diff: "Easy" },
        { q: "Read: 10", a: "Ten", cat: "Numbers", diff: "Medium" },
        { q: "Read: Circle", a: "Circle ⚪", cat: "Shapes", diff: "Easy" },
        { q: "Read: Star", a: "Star ⭐", cat: "Shapes", diff: "Easy" },
        { q: "Read: 1 + 1 = 2", a: "One plus one is two", cat: "Equations", diff: "Hard" }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `math-read-jrkg-${i}`,
        title: `Reading: ${item.cat}`,
        category: 'Mathematics',
        sentences: [item.q, `✨ Answer: ${item.a}`],
        type: 'sentence',
        desc: `Read aloud: ${item.q}`
    }));
};

const generateJrKgMathWriting = (level, count = 100) => {
    const questionPool = [
        { q: "Write number 1.", a: "1", cat: "Numbers", diff: "Easy", type: "science-writing" },
        { q: "Write number 2.", a: "2", cat: "Numbers", diff: "Easy", type: "science-writing" },
        { q: "Write number 3.", a: "3", cat: "Numbers", diff: "Easy", type: "science-writing" },
        { q: "Write number 5.", a: "5", cat: "Numbers", diff: "Easy", type: "science-writing" },
        { q: "Write number 10.", a: "10", cat: "Numbers", diff: "Medium", type: "science-writing" },
        { q: "Count your eyes.", a: "2", cat: "Counting", diff: "Easy", type: "science-writing" }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `math-write-jrkg-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        answer: item.a,
        target: item.a
    }));
};

const generateJrKgMathActivity = (level, count = 100) => {
    const questionPool = [
        { q: "Count: 🍎🍎", a: "2", type: "activity-quest", cat: "Counting", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/240px-Red_Apple.jpg" },
        { q: "Match: 1", a: "One", type: "matching", options: ["One", "Two"], cat: "Numbers", img: "" },
        { q: "Shape of Sun?", a: "Circle", type: "matching", options: ["Circle", "Square"], cat: "Shapes", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Sun_-_symbol.svg/800px-Sun_-_symbol.svg.png" },
        { q: "Which is Red?", a: "Apple", type: "matching", options: ["Apple", "Leaf"], cat: "Colors", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/240px-Red_Apple.jpg" }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `math-act-jrkg-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        target: item.a,
        answer: item.a,
        options: item.options,
        imageUrl: item.img,
        desc: "Play with Math!",
        activity: "Math Activity"
    }));
};

// --- GRADE 1 ENGLISH CURRICULUM ---

const generateGrade1EnglishReading = (level, count = 100) => {
    const questionPool = [
        // A. Phonics & Word Reading (1–30)
        { q: "Read: cat", a: "cat", cat: "Phonics", diff: "Easy" },
        { q: "Read: bat", a: "bat", cat: "Phonics", diff: "Easy" },
        { q: "Read: ship", a: "ship", cat: "Phonics", diff: "Easy" },
        { q: "Read: shop", a: "shop", cat: "Phonics", diff: "Easy" },
        { q: "Read: thin", a: "thin", cat: "Phonics", diff: "Easy" },
        { q: "Read: this", a: "this", cat: "Phonics", diff: "Easy" },
        { q: "Read: chair", a: "chair", cat: "Phonics", diff: "Easy" },
        { q: "Read: cheese", a: "cheese", cat: "Phonics", diff: "Easy" },
        { q: "Read: tree", a: "tree", cat: "Phonics", diff: "Easy" },
        { q: "Read: three", a: "three", cat: "Phonics", diff: "Easy" },
        { q: "Read: goat", a: "goat", cat: "Phonics", diff: "Easy" },
        { q: "Read: boat", a: "boat", cat: "Phonics", diff: "Easy" },
        { q: "Read: rain", a: "rain", cat: "Phonics", diff: "Easy" },
        { q: "Read: train", a: "train", cat: "Phonics", diff: "Easy" },
        { q: "Read: star", a: "star", cat: "Phonics", diff: "Medium" },
        { q: "Read: frog", a: "frog", cat: "Phonics", diff: "Medium" },
        { q: "Read: flag", a: "flag", cat: "Phonics", diff: "Medium" },
        { q: "Read: drum", a: "drum", cat: "Phonics", diff: "Medium" },
        { q: "Read: green", a: "green", cat: "Phonics", diff: "Medium" },
        { q: "Read: black", a: "black", cat: "Phonics", diff: "Medium" },
        { q: "Read: yellow", a: "yellow", cat: "Phonics", diff: "Medium" },
        { q: "Read: flower", a: "flower", cat: "Phonics", diff: "Medium" },
        { q: "Read: school", a: "school", cat: "Phonics", diff: "Medium" },
        { q: "Read: teacher", a: "teacher", cat: "Phonics", diff: "Medium" },
        { q: "Read: garden", a: "garden", cat: "Phonics", diff: "Medium" },
        { q: "Read: happy", a: "happy", cat: "Phonics", diff: "Medium" },
        { q: "Read: little", a: "little", cat: "Phonics", diff: "Medium" },
        { q: "Read: jump", a: "jump", cat: "Phonics", diff: "Medium" },
        { q: "Read: running", a: "running", cat: "Phonics", diff: "Medium" },
        { q: "Read: playing", a: "playing", cat: "Phonics", diff: "Medium" },

        // B. Sentence Reading (31–60)
        { q: "The cat is on the mat.", a: "Great!", cat: "Sentences", diff: "Medium" },
        { q: "I have a red ball.", a: "Great!", cat: "Sentences", diff: "Medium" },
        { q: "The sun rises in the east.", a: "Great!", cat: "Sentences", diff: "Medium" },
        { q: "She is reading a book.", a: "Great!", cat: "Sentences", diff: "Medium" },
        { q: "The dog is barking loudly.", a: "Great!", cat: "Sentences", diff: "Medium" },
        { q: "We play in the park.", a: "Great!", cat: "Sentences", diff: "Medium" },
        { q: "The sky is blue today.", a: "Great!", cat: "Sentences", diff: "Medium" },
        { q: "I drink milk every day.", a: "Great!", cat: "Sentences", diff: "Medium" },
        { q: "The bird can fly high.", a: "Great!", cat: "Sentences", diff: "Medium" },
        { q: "The fish swims in water.", a: "Great!", cat: "Sentences", diff: "Medium" },
        { q: "My mother cooks food.", a: "Great!", cat: "Sentences", diff: "Medium" },
        { q: "My father goes to work.", a: "Great!", cat: "Sentences", diff: "Medium" },
        { q: "The baby is sleeping.", a: "Great!", cat: "Sentences", diff: "Medium" },
        { q: "It is raining outside.", a: "Great!", cat: "Sentences", diff: "Medium" },
        { q: "I brush my teeth daily.", a: "Great!", cat: "Sentences", diff: "Medium" },
        { q: "The elephant is very big.", a: "Great!", cat: "Sentences", diff: "Hard" },
        { q: "The ant is very small.", a: "Great!", cat: "Sentences", diff: "Hard" },
        { q: "I go to school by bus.", a: "Great!", cat: "Sentences", diff: "Hard" },
        { q: "The boy is happy.", a: "Great!", cat: "Sentences", diff: "Hard" },
        { q: "The girl is singing.", a: "Great!", cat: "Sentences", diff: "Hard" },
        { q: "We should keep our classroom clean.", a: "Great!", cat: "Sentences", diff: "Hard" },
        { q: "I have two pencils.", a: "Great!", cat: "Sentences", diff: "Hard" },
        { q: "The farmer grows crops.", a: "Great!", cat: "Sentences", diff: "Hard" },
        { q: "The moon shines at night.", a: "Great!", cat: "Sentences", diff: "Hard" },
        { q: "The stars twinkle in the sky.", a: "Great!", cat: "Sentences", diff: "Hard" },
        { q: "The rabbit runs fast.", a: "Great!", cat: "Sentences", diff: "Hard" },
        { q: "I love my family.", a: "Great!", cat: "Sentences", diff: "Hard" },
        { q: "She has a blue dress.", a: "Great!", cat: "Sentences", diff: "Hard" },
        { q: "He is my best friend.", a: "Great!", cat: "Sentences", diff: "Hard" },
        { q: "We celebrate Independence Day.", a: "Great!", cat: "Sentences", diff: "Hard" },

        // C. Short Comprehension (61–100) -> Structured as MCQ
        // Passage 1
        { q: "Who has a dog?", a: "Tom", options: ["Tom", "Sam"], cat: "Comprehension", diff: "Hard", passage: "Tom has a dog. The dog is brown. It likes to play." },
        { q: "What color is the dog?", a: "Brown", options: ["Brown", "Black"], cat: "Comprehension", diff: "Hard", passage: "Tom has a dog. The dog is brown. It likes to play." },
        { q: "What does the dog like to do?", a: "Play", options: ["Play", "Sleep"], cat: "Comprehension", diff: "Hard", passage: "Tom has a dog. The dog is brown. It likes to play." },

        // Passage 2
        { q: "What does Rita have?", a: "A red ball", options: ["A red ball", "A doll"], cat: "Comprehension", diff: "Hard", passage: "Rita has a red ball. She plays in the park." },
        { q: "What color is the ball?", a: "Red", options: ["Red", "Blue"], cat: "Comprehension", diff: "Hard", passage: "Rita has a red ball. She plays in the park." },
        { q: "Where does she play?", a: "Park", options: ["Park", "School"], cat: "Comprehension", diff: "Hard", passage: "Rita has a red ball. She plays in the park." },

        // Passage 3
        { q: "What is bright?", a: "Sun", options: ["Sun", "Moon"], cat: "Comprehension", diff: "Hard", passage: "The sun is bright. It gives us light and heat." },
        { q: "What does the sun give us?", a: "Light & Heat", options: ["Light & Heat", "Water"], cat: "Comprehension", diff: "Hard", passage: "The sun is bright. It gives us light and heat." },

        // Passage 4
        { q: "Who grows rice?", a: "Farmer", options: ["Farmer", "Doctor"], cat: "Comprehension", diff: "Hard", passage: "A farmer grows rice and wheat in the field." },
        { q: "Where does he grow crops?", a: "Field", options: ["Field", "Home"], cat: "Comprehension", diff: "Hard", passage: "A farmer grows rice and wheat in the field." },

        // Passage 5
        { q: "How many cats does Mina have?", a: "Two", options: ["Two", "One"], cat: "Comprehension", diff: "Hard", passage: "Mina has two cats. They drink milk." },
        { q: "What do they drink?", a: "Milk", options: ["Milk", "Water"], cat: "Comprehension", diff: "Hard", passage: "Mina has two cats. They drink milk." },

        // Passage 6
        { q: "Which season is it?", a: "Winter", options: ["Winter", "Summer"], cat: "Comprehension", diff: "Hard", passage: "It is winter. We wear warm clothes." },
        { q: "What do we wear in winter?", a: "Warm clothes", options: ["Warm clothes", "Cotton clothes"], cat: "Comprehension", diff: "Hard", passage: "It is winter. We wear warm clothes." },

        // Passage 7
        { q: "Where does the lion live?", a: "Jungle", options: ["Jungle", "House"], cat: "Comprehension", diff: "Hard", passage: "The lion lives in the jungle. It is strong." },
        { q: "Is the lion weak or strong?", a: "Strong", options: ["Strong", "Weak"], cat: "Comprehension", diff: "Hard", passage: "The lion lives in the jungle. It is strong." },

        // Passage 8
        { q: "Who builds a nest?", a: "Bird", options: ["Bird", "Rat"], cat: "Comprehension", diff: "Hard", passage: "The bird builds a nest on the tree." },
        { q: "Where is the nest?", a: "On the tree", options: ["On the tree", "In water"], cat: "Comprehension", diff: "Hard", passage: "The bird builds a nest on the tree." },

        // Passage 9
        { q: "Who likes milk?", a: "Brother", options: ["Brother", "Sister"], cat: "Comprehension", diff: "Hard", passage: "I have a little brother. He likes milk." },
        { q: "Do I have a sister or brother?", a: "Brother", options: ["Brother", "Sister"], cat: "Comprehension", diff: "Hard", passage: "I have a little brother. He likes milk." },

        // Passage 10
        { q: "What runs on tracks?", a: "Train", options: ["Train", "Bus"], cat: "Comprehension", diff: "Hard", passage: "The train runs on tracks. It is very long." },
        { q: "Is the train short or long?", a: "Long", options: ["Long", "Short"], cat: "Comprehension", diff: "Hard", passage: "The train runs on tracks. It is very long." },

        // Extra Reading (83-100)
        { q: "What do we use to write?", a: "Pencil", options: ["Pencil", "Spoon"], cat: "General", diff: "Medium" },
        { q: "What shines at night?", a: "Moon", options: ["Moon", "Sun"], cat: "General", diff: "Medium" },
        { q: "Which animal gives us milk?", a: "Cow", options: ["Cow", "Dog"], cat: "General", diff: "Medium" },
        { q: "Where do fish live?", a: "Water", options: ["Water", "Land"], cat: "General", diff: "Medium" },
        { q: "What do we wear in summer?", a: "Cotton clothes", options: ["Cotton clothes", "Woollen clothes"], cat: "General", diff: "Medium" },
        { q: "Which festival do we celebrate with lights?", a: "Diwali", options: ["Diwali", "Holi"], cat: "General", diff: "Medium" },
        { q: "How many days are there in a week?", a: "7", options: ["7", "10"], cat: "General", diff: "Medium" },
        { q: "Name a fruit that is red.", a: "Apple", options: ["Apple", "Banana"], cat: "General", diff: "Medium" },
        { q: "Name a wild animal.", a: "Lion", options: ["Lion", "Cow"], cat: "General", diff: "Medium" },
        { q: "Name a pet animal.", a: "Dog", options: ["Dog", "Tiger"], cat: "General", diff: "Medium" },
        { q: "What do bees make?", a: "Honey", options: ["Honey", "Milk"], cat: "General", diff: "Medium" },
        { q: "What do plants need to grow?", a: "Water", options: ["Water", "Oil"], cat: "General", diff: "Medium" },
        { q: "Which body part helps us see?", a: "Eyes", options: ["Eyes", "Ears"], cat: "General", diff: "Medium" },
        { q: "Which body part helps us hear?", a: "Ears", options: ["Ears", "Nose"], cat: "General", diff: "Medium" },
        { q: "What do we drink when thirsty?", a: "Water", options: ["Water", "Juice"], cat: "General", diff: "Medium" },
        { q: "Which season is very hot?", a: "Summer", options: ["Summer", "Winter"], cat: "General", diff: "Medium" },
        { q: "What do we use to cut paper?", a: "Scissors", options: ["Scissors", "Knife"], cat: "General", diff: "Medium" },
        { q: "What do we use to erase pencil marks?", a: "Eraser", options: ["Eraser", "Pen"], cat: "General", diff: "Medium" }
    ];

    let filteredPool = [];
    if (level === 'Easy') {
        filteredPool = questionPool.filter(q => q.diff === 'Easy' || q.cat === 'Phonics');
        count = 50;
    } else if (level === 'Medium') {
        filteredPool = questionPool.filter(q => q.diff === 'Medium' || q.cat === 'Sentences' || q.cat === 'General');
        count = 25;
    } else {
        filteredPool = questionPool.filter(q => q.diff === 'Hard' || q.cat === 'Comprehension');
        count = 25;
    }

    const content = [];
    const finalPool = (filteredPool.length > 0 ? filteredPool : questionPool);
    const shuffled = finalPool.sort(() => Math.random() - 0.5);

    for (let i = 0; i < Math.min(count, shuffled.length); i++) {
        const item = shuffled[i];
        let quest = {
            id: `read-grade1-${level.toLowerCase()}-${i}`,
            title: item.cat === 'Comprehension' ? 'Comprehension' : `Reading: ${item.cat}`,
            category: 'English',
            sentences: [item.q],
            passage: item.passage,
            type: 'sentence',
            desc: `Read aloud: ${item.q}`
        };

        if (item.options) {
            quest.options = item.options;
            quest.answer = item.a;
            quest.title = item.q; // Question becomes title for MCQ
            quest.desc = "Choose the correct answer";
        }

        content.push(quest);
    }
    return content;
};
const generateGrade1EnglishActivity = (level, count = 100) => {
    // Reuse reading content for simple matching activities
    const questionPool = [
        { q: "Match: cat", a: "cat", type: "matching", options: ["cat", "bat"], cat: "Phonics", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/240px-Cat03.jpg" },
        { q: "Match: bat", a: "bat", type: "matching", options: ["bat", "rat"], cat: "Phonics", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Bat_Canaan_Valley_NWR_%288863649666%29.jpg/240px-Bat_Canaan_Valley_NWR_%288863649666%29.jpg" },
        { q: "Match: sun", a: "sun", type: "matching", options: ["sun", "bun"], cat: "Phonics", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/240px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg" },
        { q: "Match: ball", a: "ball", type: "matching", options: ["ball", "wall"], cat: "Phonics", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Soccer_ball.svg/240px-Soccer_ball.svg.png" },
        { q: "Match: tree", a: "tree", type: "matching", options: ["tree", "three"], cat: "Phonics", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg/240px-Ash_Tree_-_geograph.org.uk_-_590710.jpg" }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `act-grade1-${level.toLowerCase()}-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        target: item.a,
        answer: item.a,
        options: item.options,
        imageUrl: item.img,
        desc: "Match the correct word!",
        activity: "English Activity"
    }));
};

// --- GRADE 1 WRITING ---
const generateGrade1EnglishWriting = (level, count = 100) => {
    const questionPool = [
        // A. Fill in the Blanks (1–25)
        { q: "The sun is ______.", a: "hot", cat: "Fill Blanks", diff: "Easy", type: "science-writing", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/240px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg" },
        { q: "The sky is ______.", a: "blue", cat: "Fill Blanks", diff: "Easy", type: "science-writing", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Nuvola_apps_kweather.svg/240px-Nuvola_apps_kweather.svg.png" },
        { q: "A cow gives us ______.", a: "milk", cat: "Fill Blanks", diff: "Easy", type: "science-writing", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Cow_female_black_white.jpg/240px-Cow_female_black_white.jpg" },
        { q: "A dog lives in a ______.", a: "kennel", cat: "Fill Blanks", diff: "Easy", type: "science-writing", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Collage_of_Nine_Dogs.jpg/240px-Collage_of_Nine_Dogs.jpg" },
        { q: "Fish live in ______.", a: "water", cat: "Fill Blanks", diff: "Easy", type: "science-writing", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Clown_fish_in_the_Andaman_Coral_Reef.jpg/240px-Clown_fish_in_the_Andaman_Coral_Reef.jpg" },

        // B. Grammar Practice (26–50)
        { q: "Write plural of cat.", a: "cats", cat: "Grammar", diff: "Medium", type: "science-writing" },
        { q: "Write plural of book.", a: "books", cat: "Grammar", diff: "Medium", type: "science-writing" },
        { q: "Write opposite of big.", a: "small", cat: "Grammar", diff: "Medium", type: "science-writing" },
        { q: "Write opposite of hot.", a: "cold", cat: "Grammar", diff: "Medium", type: "science-writing" },
        { q: "Change to capital: dog", a: "DOG", cat: "Grammar", diff: "Medium", type: "science-writing" },
        { q: "Add full stop: I like milk", a: "I like milk.", cat: "Grammar", diff: "Medium", type: "science-writing" },
        { q: "Write 3 naming words.", a: "Naming", cat: "Grammar", diff: "Medium", type: "free-write", count: 3 },
        { q: "Write 3 action words.", a: "Action", cat: "Grammar", diff: "Medium", type: "free-write", count: 3 },
        { q: "Write 3 describing words.", a: "Describing", cat: "Grammar", diff: "Medium", type: "free-write", count: 3 },

        // C. Sentence & Paragraph Writing (51–100)
        { q: "Write 5 lines about yourself.", a: "Yourself...", cat: "Composition", diff: "Hard", type: "free-write", count: 5 },
        { q: "Write 5 lines about your school.", a: "School...", cat: "Composition", diff: "Hard", type: "free-write", count: 5 },
        { q: "Write 5 lines about your family.", a: "Family...", cat: "Composition", diff: "Hard", type: "free-write", count: 5 },
        { q: "Write 5 lines about the Sun (Look at picture).", a: "Sun...", cat: "Composition", diff: "Hard", type: "free-write", count: 5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/240px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg" },
        { q: "Write 5 lines about the Dog.", a: "Dog...", cat: "Composition", diff: "Hard", type: "free-write", count: 5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Collage_of_Nine_Dogs.jpg/240px-Collage_of_Nine_Dogs.jpg" },
        { q: "Write 5 lines about the Park.", a: "Park...", cat: "Composition", diff: "Hard", type: "free-write", count: 5 },
        { q: "Write 10 simple sentences of your own.", a: "Sentences...", cat: "Composition", diff: "Hard", type: "free-write", count: 10 },

        { q: "Make a sentence using: sun", a: "sun", cat: "Composition", diff: "Hard", type: "science-writing" },
        { q: "Make a sentence using: moon", a: "moon", cat: "Composition", diff: "Hard", type: "science-writing" },
        { q: "Make a sentence using: car", a: "car", cat: "Composition", diff: "Hard", type: "science-writing" },
        { q: "Write a rhyming pair for: cat", a: "hat", cat: "Composition", diff: "Hard", type: "science-writing" },
        { q: "Write a rhyming pair for: pen", a: "hen", cat: "Composition", diff: "Hard", type: "science-writing" },

        { q: "Write a short paragraph on: My Favorite Toy", a: "Toy...", cat: "Composition", diff: "Hard", type: "free-write", count: 6 },
        { q: "Write a short paragraph on: Summer Vacation", a: "Summer...", cat: "Composition", diff: "Hard", type: "free-write", count: 6 }
    ];

    let filteredPool = [];
    if (level === 'Easy') {
        filteredPool = questionPool.filter(q => q.diff === 'Easy' || q.cat === 'Fill Blanks');
        count = 50;
    } else if (level === 'Medium') {
        filteredPool = questionPool.filter(q => q.diff === 'Medium' || q.cat === 'Grammar');
        count = 25;
    } else {
        filteredPool = questionPool.filter(q => q.diff === 'Hard' || q.cat === 'Composition');
        count = 25;
    }

    const content = [];
    const finalPool = (filteredPool.length > 0 ? filteredPool : questionPool);
    const shuffled = finalPool.sort(() => Math.random() - 0.5);

    for (let i = 0; i < Math.min(count, shuffled.length); i++) {
        const item = shuffled[i];

        let quest = {
            id: `write-grade1-${level.toLowerCase()}-${i}`,
            title: item.cat,
            type: item.type,
            desc: item.q,
            question: item.q,
            answer: item.a,
            target: item.a,
            imageUrl: item.img
        };

        if (item.type === 'free-write') {
            quest.count = item.count;
            quest.desc = item.q;
        }

        content.push(quest);
    }
    return content;
};

// --- SR. KG SCIENCE CURRICULUM ---

const generateSrKgScienceReading = (level, count = 100) => {
    const questionPool = [
        { q: "The sun gives us light.", a: "Sun", cat: "Nature", diff: "Easy" },
        { q: "Trees escape blue sky.", a: "Trees", cat: "Nature", diff: "Easy" },
        { q: "We see with our eyes.", a: "Eyes", cat: "Body Parts", diff: "Easy" },
        { q: "We hear with our ears.", a: "Ears", cat: "Body Parts", diff: "Easy" },
        { q: "A car is non-living.", a: "Non-living", cat: "Living/Non-living", diff: "Medium" },
        { q: "A tree is living.", a: "Living", cat: "Living/Non-living", diff: "Medium" },
        { q: "Fish live in water.", a: "Water", cat: "Animals", diff: "Medium" },
        { q: "Birds fly in the sky.", a: "Sky", cat: "Animals", diff: "Medium" },
        { q: "We must brush teeth.", a: "Habits", cat: "Healthy Habits", diff: "Hard" },
        { q: "Wash hands before eating.", a: "Habits", cat: "Healthy Habits", diff: "Hard" }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `sci-read-srkg-${i}`,
        title: `Science: ${item.cat}`,
        category: 'Science',
        sentences: [item.q],
        type: 'sentence',
        desc: `Read aloud: ${item.q}`
    }));
};

const generateSrKgScienceWriting = (level, count = 100) => {
    const questionPool = [
        { q: "We see with our ______.", a: "eyes", cat: "Body Parts", diff: "Easy", type: "science-writing" },
        { q: "We hear with our ______.", a: "ears", cat: "Body Parts", diff: "Easy", type: "science-writing" },
        { q: "A car is ______ (living/non-living).", a: "non-living", cat: "Living/Non-living", diff: "Medium", type: "science-writing" },
        { q: "A plant is ______ (living/non-living).", a: "living", cat: "Living/Non-living", diff: "Medium", type: "science-writing" },
        { q: "Fish swim in ______.", a: "water", cat: "Animals", diff: "Medium", type: "science-writing" },
        { q: "Birds have ______.", a: "wings", cat: "Animals", diff: "Medium", type: "science-writing" },
        { q: "The sun is ______.", a: "hot", cat: "Nature", diff: "Easy", type: "science-writing" },
        { q: "Ice is ______.", a: "cold", cat: "Nature", diff: "Easy", type: "science-writing" }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `sci-write-srkg-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        answer: item.a,
        target: item.a
    }));
};

// --- SR. KG MATH CURRICULUM ---

const generateSrKgMathReading = (level, count = 100) => {
    const questionPool = [
        { q: "Read: 10", a: "Ten", cat: "Numbers", diff: "Easy" },
        { q: "Read: 20", a: "Twenty", cat: "Numbers", diff: "Easy" },
        { q: "Read: 50", a: "Fifty", cat: "Numbers", diff: "Easy" },
        { q: "Read: 100", a: "One Hundred", cat: "Numbers", diff: "Medium" },
        { q: "Read: Circle", a: "Circle ⚪", cat: "Shapes", diff: "Easy" },
        { q: "Read: Square", a: "Square ⬜", cat: "Shapes", diff: "Easy" },
        { q: "Read: Triangle", a: "Triangle 🔺", cat: "Shapes", diff: "Easy" },
        { q: "Read: 2 + 2 = 4", a: "Two plus two is four", cat: "Equations", diff: "Medium" },
        { q: "Read: 5 + 5 = 10", a: "Five plus five is ten", cat: "Equations", diff: "Medium" },
        { q: "Read: 10 - 2 = 8", a: "Ten minus two is eight", cat: "Equations", diff: "Hard" }
    ];

    // Simple randomization
    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `math-read-srkg-${i}`,
        title: `Reading: ${item.cat}`,
        category: 'Mathematics',
        sentences: [item.q, `✨ Answer: ${item.a}`],
        type: 'sentence',
        desc: `Read aloud: ${item.q}`
    }));
};

const generateSrKgMathWriting = (level, count = 100) => {
    const questionPool = [
        { q: "Write number 10.", a: "10", cat: "Numbers", diff: "Easy", type: "science-writing" },
        { q: "Write number 20.", a: "20", cat: "Numbers", diff: "Easy", type: "science-writing" },
        { q: "Write number 50.", a: "50", cat: "Numbers", diff: "Medium", type: "science-writing" },
        { q: "Write number 100.", a: "100", cat: "Numbers", diff: "Hard", type: "science-writing" },
        { q: "Solve: 2 + 2 = ?", a: "4", cat: "Addition", diff: "Medium", type: "science-writing" },
        { q: "Solve: 5 + 3 = ?", a: "8", cat: "Addition", diff: "Medium", type: "science-writing" },
        { q: "Solve: 10 - 5 = ?", a: "5", cat: "Subtraction", diff: "Hard", type: "science-writing" },
        { q: "Count fingers on one hand.", a: "5", cat: "Counting", diff: "Easy", type: "science-writing" }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `math-write-srkg-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        answer: item.a,
        target: item.a
    }));
};

const generateSrKgMathActivity = (level, count = 100) => {
    const questionPool = [
        { q: "Count: ⭐⭐⭐", a: "3", type: "activity-quest", cat: "Counting", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Gold_Star.svg/1200px-Gold_Star.svg.png" },
        { q: "Shape of a ball?", a: "Circle", type: "matching", options: ["Circle", "Square"], cat: "Shapes", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Soccer_ball.svg/800px-Soccer_ball.svg.png" },
        { q: "2 + 2 = ?", a: "4", type: "activity-quest", cat: "Addition", img: "" },
        { q: "Which is bigger?", a: "Elephant", type: "matching", options: ["Elephant", "Ant"], cat: "Comparison", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/320px-African_Bush_Elephant.jpg" },
        { q: "Complete pattern: 🔴 🔵 🔴 ...", a: "🔵", type: "matching", options: ["🔵", "🟢"], cat: "Patterns", img: "" }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `math-act-srkg-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        target: item.a,
        answer: item.a,
        options: item.options,
        imageUrl: item.img,
        desc: "Solve the math problem!",
        activity: "Math Activity"
    }));
};

// --- GRADE 2 ENGLISH CURRICULUM ---

const generateGrade2EnglishReading = (level, count = 100) => {
    const questionPool = [
        // A. Advanced Phonics & Blends
        { q: "Read: splash", a: "splash", cat: "Phonics", diff: "Easy", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Splashing_water_drop.jpg/240px-Splashing_water_drop.jpg" },
        { q: "Read: bridge", a: "bridge", cat: "Phonics", diff: "Easy", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Golden_Gate_Bridge_during_a_partly_cloudy_weather.jpg/240px-Golden_Gate_Bridge_during_a_partly_cloudy_weather.jpg" },
        { q: "Read: scratch", a: "scratch", cat: "Phonics", diff: "Easy", img: "" },
        { q: "Read: throne", a: "throne", cat: "Phonics", diff: "Easy", img: "" },
        { q: "Read: sprint", a: "sprint", cat: "Phonics", diff: "Easy", img: "" },

        // B. Complex Sentences
        { q: "The quick brown fox jumps over the lazy dog.", a: "Great!", cat: "Sentences", diff: "Medium", img: "" },
        { q: "She went to the market to buy some fresh fruit.", a: "Great!", cat: "Sentences", diff: "Medium", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/240px-Red_Apple.jpg" },
        { q: "The stars twinkle brightly in the night sky.", a: "Great!", cat: "Sentences", diff: "Medium", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Nuvola_apps_kweather.svg/240px-Nuvola_apps_kweather.svg.png" },
        { q: "We should always wash our hands before eating dinner.", a: "Great!", cat: "Sentences", diff: "Medium", img: "" },
        { q: "My friend and I played football in the park yesterday.", a: "Great!", cat: "Sentences", diff: "Medium", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Soccer_ball.svg/240px-Soccer_ball.svg.png" },

        // C. Comprehension (Longer Passages & Inference)
        { q: "Why was Tim happy?", a: "He got a gift", options: ["He got a gift", "It was raining"], cat: "Comprehension", diff: "Hard", passage: "It was Tim's birthday. His mom gave him a big box. Inside was a new toy car. Tim smiled and hugged his mom." },
        { q: "What was inside the box?", a: "Toy car", options: ["Toy car", "A puppy"], cat: "Comprehension", diff: "Hard", passage: "It was Tim's birthday. His mom gave him a big box. Inside was a new toy car. Tim smiled and hugged his mom." },
        { q: "Where did the bird build its nest?", a: "In the oak tree", options: ["In the oak tree", "On the ground"], cat: "Comprehension", diff: "Hard", passage: "A little blue bird found some twigs. It flew to the tall oak tree. It built a cozy nest high up on a branch." },
        { q: "What did the bird use?", a: "Twigs", options: ["Twigs", "Leaves"], cat: "Comprehension", diff: "Hard", passage: "A little blue bird found some twigs. It flew to the tall oak tree. It built a cozy nest high up on a branch." },
        { q: "How did Sarah feel?", a: "Sad", options: ["Sad", "Happy"], cat: "Comprehension", diff: "Hard", passage: "Sarah lost her favorite doll. She looked under the bed. It was not there. A tear rolled down her cheek." },
        { q: "Did she find the doll?", a: "No", options: ["No", "Yes"], cat: "Comprehension", diff: "Hard", passage: "Sarah lost her favorite doll. She looked under the bed. It was not there. A tear rolled down her cheek." }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => {
        let quest = {
            id: `read-grade2-${level.toLowerCase()}-${i}`,
            title: item.cat === 'Comprehension' ? 'Comprehension' : `Reading: ${item.cat}`,
            category: 'English',
            sentences: [item.q],
            passage: item.passage,
            imageUrl: item.img,
            type: 'sentence',
            desc: `Read aloud: ${item.q}`
        };

        if (item.options) {
            quest.options = item.options;
            quest.answer = item.a;
            quest.title = item.q;
            quest.desc = "Choose the correct answer";
        }
        return quest;
    });
};

const generateGrade2EnglishWriting = (level, count = 100) => {
    const questionPool = [
        // A. Advanced Fill in Blanks (Adjectives, Verbs, Past Tense)
        { q: "The cheetah runs very ______.", a: "fast", cat: "Grammar", diff: "Easy", type: "science-writing" },
        { q: "The turtle moves ______.", a: "slowly", cat: "Grammar", diff: "Easy", type: "science-writing" },
        { q: "Identify the Adjective: The red car.", a: "Red", cat: "Grammar", diff: "Medium", type: "science-writing" },
        { q: "Identify the Verb: She dances well.", a: "Dances", cat: "Grammar", diff: "Medium", type: "science-writing" },
        { q: "Past tense of 'Run'", a: "Ran", cat: "Grammar", diff: "Medium", type: "science-writing" },
        { q: "Past tense of 'Eat'", a: "Ate", cat: "Grammar", diff: "Medium", type: "science-writing" },
        { q: "Past tense of 'Go'", a: "Went", cat: "Grammar", diff: "Medium", type: "science-writing" },
        { q: "Opposite of 'Difficult'", a: "Easy", cat: "Grammar", diff: "Medium", type: "science-writing" },
        { q: "Opposite of 'Strong'", a: "Weak", cat: "Grammar", diff: "Medium", type: "science-writing" },

        // B. Creative Writing (10-15 lines)
        { q: "Write 10 lines about: If I could fly...", a: "Flying...", cat: "Composition", diff: "Hard", type: "free-write", count: 10, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Golden_Gate_Bridge_during_a_partly_cloudy_weather.jpg/240px-Golden_Gate_Bridge_during_a_partly_cloudy_weather.jpg" },
        { q: "Write 10 lines about: My Dream House", a: "House...", cat: "Composition", diff: "Hard", type: "free-write", count: 10 },
        { q: "Write 10 lines about: A visit to the Zoo", a: "Zoo...", cat: "Composition", diff: "Hard", type: "free-write", count: 10 },
        { q: "Write 15 lines about: My Best Birthday Party", a: "Party...", cat: "Composition", diff: "Hard", type: "free-write", count: 15 },
        { q: "Write 15 lines about: The Robot I built", a: "Robot...", cat: "Composition", diff: "Hard", type: "free-write", count: 15 },

        // C. Sentence Construction
        { q: "Make a sentence with 'Beautiful'", a: "Beautiful...", cat: "Composition", diff: "Hard", type: "science-writing" },
        { q: "Make a sentence with 'Excited'", a: "Excited...", cat: "Composition", diff: "Hard", type: "science-writing" },
        { q: "Make a sentence with 'Suddenly'", a: "Suddenly...", cat: "Composition", diff: "Hard", type: "science-writing" }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => {
        let quest = {
            id: `write-grade2-${level.toLowerCase()}-${i}`,
            title: item.cat,
            type: item.type,
            desc: item.q,
            question: item.q,
            answer: item.a,
            target: item.a,
            imageUrl: item.img
        };

        if (item.type === 'free-write') {
            quest.count = item.count;
            quest.desc = item.q;
        }
        return quest;
    });
};

const generateGrade2EnglishActivity = (level, count = 100) => {
    const questionPool = [
        { q: "Match: Angry", a: "Mad", type: "matching", options: ["Mad", "Happy"], cat: "Synonyms" },
        { q: "Match: Happy", a: "Glad", type: "matching", options: ["Glad", "Sad"], cat: "Synonyms" },
        { q: "Match: Small", a: "Tiny", type: "matching", options: ["Tiny", "Big"], cat: "Synonyms" },
        { q: "Match: Run", a: "Sprint", type: "matching", options: ["Sprint", "Walk"], cat: "Synonyms" },
        { q: "Match: Big", a: "Huge", type: "matching", options: ["Huge", "Small"], cat: "Synonyms" },
        { q: "Noun or Verb: 'Jump'", a: "Verb", type: "matching", options: ["Verb", "Noun"], cat: "Parts of Speech" },
        { q: "Noun or Verb: 'Table'", a: "Noun", type: "matching", options: ["Noun", "Verb"], cat: "Parts of Speech" },
        { q: "Past of 'See'", a: "Saw", type: "matching", options: ["Saw", "Seeed"], cat: "Tenses" },
        { q: "Past of 'Go'", a: "Went", type: "matching", options: ["Went", "Goed"], cat: "Tenses" }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `act-grade2-${level.toLowerCase()}-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        target: item.a,
        answer: item.a,
        options: item.options,
        desc: "Choose the correct match!",
        activity: "English Activity"
    }));
};

const generateWritingContent = (grade, level) => {
    return [{ id: `write-${grade}-${level}`, title: `${grade} Writing`, type: 'science-writing', question: 'Write something.', answer: 'something' }];
};

// --- GRADE 3 ENGLISH CURRICULUM ---

const generateGrade3EnglishReading = (level, count = 100) => {
    const questionPool = [
        // A. Passage 1: Arjun and the Bird
        { q: "Who found the bird?", a: "Arjun", options: ["Arjun", "Rohan"], cat: "Comprehension", diff: "Easy", passage: "Arjun found a small injured bird near his house. Instead of ignoring it, he carefully placed it in a box and gave it food and water. After a few days, the bird became strong and flew away. Arjun felt proud of helping a helpless creature." },
        { q: "Where did he find it?", a: "Near his house", options: ["Near his house", "In the park"], cat: "Comprehension", diff: "Easy", passage: "Arjun found a small injured bird near his house. Instead of ignoring it, he carefully placed it in a box and gave it food and water. After a few days, the bird became strong and flew away. Arjun felt proud of helping a helpless creature." },
        { q: "What was wrong with the bird?", a: "It was injured", options: ["It was injured", "It was sleeping"], cat: "Comprehension", diff: "Medium", passage: "Arjun found a small injured bird near his house. Instead of ignoring it, he carefully placed it in a box and gave it food and water. After a few days, the bird became strong and flew away. Arjun felt proud of helping a helpless creature." },
        { q: "How did he care for the bird?", a: "Gave food and water", options: ["Gave food and water", "Played with it"], cat: "Comprehension", diff: "Medium", passage: "Arjun found a small injured bird near his house. Instead of ignoring it, he carefully placed it in a box and gave it food and water. After a few days, the bird became strong and flew away. Arjun felt proud of helping a helpless creature." },
        { q: "What happened after a few days?", a: "It flew away", options: ["It flew away", "It stayed"], cat: "Comprehension", diff: "Medium", passage: "Arjun found a small injured bird near his house. Instead of ignoring it, he carefully placed it in a box and gave it food and water. After a few days, the bird became strong and flew away. Arjun felt proud of helping a helpless creature." },
        { q: "Why did he feel proud?", a: "Helped a creature", options: ["Helped a creature", "Won a prize"], cat: "Comprehension", diff: "Hard", passage: "Arjun found a small injured bird near his house. Instead of ignoring it, he carefully placed it in a box and gave it food and water. After a few days, the bird became strong and flew away. Arjun felt proud of helping a helpless creature." },
        { q: "Find a word meaning 'hurt'.", a: "Injured", options: ["Injured", "Strong"], cat: "Vocabulary", diff: "Hard", passage: "Arjun found a small injured bird near his house. Instead of ignoring it, he carefully placed it in a box and gave it food and water. After a few days, the bird became strong and flew away. Arjun felt proud of helping a helpless creature." },

        // B. Passage 2: The Moon
        { q: "Does the moon produce light?", a: "No", options: ["No", "Yes"], cat: "Comprehension", diff: "Easy", passage: "The moon does not produce its own light. It reflects sunlight. Sometimes we see a full moon, and sometimes only a small part of it. These changes are called phases of the moon." },
        { q: "What does it reflect?", a: "Sunlight", options: ["Sunlight", "Starlight"], cat: "Comprehension", diff: "Easy", passage: "The moon does not produce its own light. It reflects sunlight. Sometimes we see a full moon, and sometimes only a small part of it. These changes are called phases of the moon." },
        { q: "What are moon phases?", a: "Changes in shape", options: ["Changes in shape", "Colors of moon"], cat: "Comprehension", diff: "Medium", passage: "The moon does not produce its own light. It reflects sunlight. Sometimes we see a full moon, and sometimes only a small part of it. These changes are called phases of the moon." },
        { q: "Meaning of 'reflect'?", a: "Throw back light", options: ["Throw back light", "Absorb light"], cat: "Vocabulary", diff: "Hard", passage: "The moon does not produce its own light. It reflects sunlight. Sometimes we see a full moon, and sometimes only a small part of it. These changes are called phases of the moon." },

        // C. Vocabulary & Inference
        { q: "Synonym of 'brave'", a: "Courageous", options: ["Courageous", "Scared"], cat: "Vocabulary", diff: "Medium" },
        { q: "Antonym of 'ancient'", a: "Modern", options: ["Modern", "Old"], cat: "Vocabulary", diff: "Medium" },
        { q: "Meaning of 'enormous'", a: "Very big", options: ["Very big", "Tiny"], cat: "Vocabulary", diff: "Medium" },
        { q: "Identify noun: The tall tree swayed.", a: "Tree", options: ["Tree", "Swayed"], cat: "Grammar", diff: "Easy" },
        { q: "Identify verb: She whispered softly.", a: "Whispered", options: ["Whispered", "She"], cat: "Grammar", diff: "Easy" },
        { q: "Identify adjective: Bright stars shine.", a: "Bright", options: ["Bright", "Stars"], cat: "Grammar", diff: "Easy" },
        { q: "Make a sentence with 'suddenly'.", a: "Judge based on input", cat: "Creative", diff: "Hard" } // Manual check type
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => {
        let quest = {
            id: `read-grade3-${level.toLowerCase()}-${i}`,
            title: item.cat === 'Comprehension' ? 'Comprehension' : `Reading: ${item.cat}`,
            category: 'English',
            sentences: [item.q],
            passage: item.passage,
            type: 'sentence',
            desc: `Read and Answer: ${item.q}`
        };

        if (item.options) {
            quest.options = item.options;
            quest.answer = item.a;
            quest.title = item.q;
            quest.desc = "Choose the correct answer";
        }
        return quest;
    });
};

const generateGrade3EnglishWriting = (level, count = 100) => {
    const questionPool = [
        // A. Grammar
        { q: "Change to past tense: run", a: "ran", cat: "Grammar", diff: "Easy", type: "science-writing" },
        { q: "Change to future tense: eat", a: "will eat", cat: "Grammar", diff: "Easy", type: "science-writing" },
        { q: "Plural of knife", a: "knives", cat: "Grammar", diff: "Medium", type: "science-writing" },
        { q: "Plural of mouse", a: "mice", cat: "Grammar", diff: "Medium", type: "science-writing" },
        { q: "Correct: She don’t like apples.", a: "She doesn't like apples.", cat: "Grammar", diff: "Medium", type: "science-writing" },
        { q: "Write 5 collective nouns.", a: "Nouns...", cat: "Grammar", diff: "Hard", type: "free-write", count: 5 },

        // B. Creative Writing
        { q: "Write 8 lines on 'Courage'.", a: "Courage...", cat: "Composition", diff: "Hard", type: "free-write", count: 8, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Golden_Gate_Bridge_during_a_partly_cloudy_weather.jpg/240px-Golden_Gate_Bridge_during_a_partly_cloudy_weather.jpg" }, // Reuse image
        { q: "Write 8 lines on 'Importance of Trees'.", a: "Trees...", cat: "Composition", diff: "Hard", type: "free-write", count: 8, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg/240px-Ash_Tree_-_geograph.org.uk_-_590710.jpg" },
        { q: "Write a diary entry about a surprising day.", a: "Diary...", cat: "Composition", diff: "Hard", type: "free-write", count: 10 },
        { q: "Write a story with moral (100 words).", a: "Story...", cat: "Composition", diff: "Hard", type: "free-write", count: 15 },
        { q: "Write letter to your friend inviting to birthday.", a: "Letter...", cat: "Composition", diff: "Hard", type: "free-write", count: 10 },
        { q: "Write descriptive paragraph about a stormy night.", a: "Storm...", cat: "Composition", diff: "Hard", type: "free-write", count: 10, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Nuvola_apps_kweather.svg/240px-Nuvola_apps_kweather.svg.png" }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => {
        let quest = {
            id: `write-grade3-${level.toLowerCase()}-${i}`,
            title: item.cat,
            type: item.type,
            desc: item.q,
            question: item.q,
            answer: item.a,
            target: item.a,
            imageUrl: item.img
        };

        if (item.type === 'free-write') {
            quest.count = item.count;
            quest.desc = item.q;
        }
        return quest;
    });
};

const generateGrade3EnglishActivity = (level, count = 100) => {
    const questionPool = [
        { q: "Jumbled: is / She / happy", a: "She is happy.", type: "activity-quest", cat: "Sentence Order" },
        { q: "Make Noun from: Happy", a: "Happiness", type: "activity-quest", cat: "Word Formation" },
        { q: "Acrostic Poem for FRIEND", a: "F...", type: "creative", cat: "Creative" },
        { q: "Debate: Homework is necessary (For/Against)", a: "Opinion...", type: "creative", cat: "Debate" },
        { q: "Dialogue: Teacher & Student", a: "Dialogue...", type: "creative", cat: "Creative" },
        { q: "Create Ad for Eco-Bag", a: "Ad...", type: "creative", cat: "Creative", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/240px-Red_Apple.jpg" } // Reuse image
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => {
        let quest = {
            id: `act-grade3-${level.toLowerCase()}-${i}`,
            title: item.cat,
            type: item.type,
            question: item.q,
            target: item.a,
            answer: item.a,
            imageUrl: item.img,
            desc: "Complete the activity!",
            activity: "English Activity"
        };
        return quest;
    });
};

// --- GRADE 4 ENGLISH CURRICULUM ---

const generateGrade4EnglishReading = (level, count = 100) => {
    const questionPool = [
        // A. Passage 1: Technology
        { q: "What has changed communication?", a: "Technology", options: ["Technology", "Books"], cat: "Comprehension", diff: "Easy", passage: "Technology has changed the way we communicate. Earlier, people wrote letters, but today we send emails and messages instantly. While technology saves time, it also reduces face-to-face conversations." },
        { q: "How did people communicate earlier?", a: "Written letters", options: ["Written letters", "Emails"], cat: "Comprehension", diff: "Easy", passage: "Technology has changed the way we communicate. Earlier, people wrote letters, but today we send emails and messages instantly. While technology saves time, it also reduces face-to-face conversations." },
        { q: "What does 'instantly' mean?", a: "Immediately", options: ["Immediately", "Slowly"], cat: "Vocabulary", diff: "Medium", passage: "Technology has changed the way we communicate. Earlier, people wrote letters, but today we send emails and messages instantly. While technology saves time, it also reduces face-to-face conversations." },
        { q: "Find antonym of 'earlier'.", a: "Later", options: ["Later", "Today"], cat: "Vocabulary", diff: "Medium", passage: "Technology has changed the way we communicate. Earlier, people wrote letters, but today we send emails and messages instantly. While technology saves time, it also reduces face-to-face conversations." },

        // B. Passage 2: Forests
        { q: "Why are forests called lungs of Earth?", a: "Provide oxygen", options: ["Provide oxygen", "Provide wood"], cat: "Comprehension", diff: "Easy", passage: "Forests are called the lungs of the Earth because they provide oxygen. They are home to countless species. Deforestation leads to climate imbalance and loss of wildlife." },
        { q: "What does 'countless' mean?", a: "Many", options: ["Many", "Few"], cat: "Vocabulary", diff: "Medium", passage: "Forests are called the lungs of the Earth because they provide oxygen. They are home to countless species. Deforestation leads to climate imbalance and loss of wildlife." },
        { q: "What causes climate imbalance?", a: "Deforestation", options: ["Deforestation", "Planting"], cat: "Comprehension", diff: "Medium", passage: "Forests are called the lungs of the Earth because they provide oxygen. They are home to countless species. Deforestation leads to climate imbalance and loss of wildlife." },

        // C. Advanced Reading
        { q: "Identify figurative language: 'Time flies.'", a: "Metaphor", options: ["Metaphor", "Simile"], cat: "Literary", diff: "Hard" },
        { q: "Theme of 'The Tortoise and the Hare'?", a: "Slow and steady", options: ["Slow and steady", "Fast wins"], cat: "Literary", diff: "Hard" },
        { q: "Fact/Opinion: 'Blue is the best color.'", a: "Opinion", options: ["Opinion", "Fact"], cat: "Analytical", diff: "Medium" }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => {
        let quest = {
            id: `read-grade4-${level.toLowerCase()}-${i}`,
            title: item.cat === 'Comprehension' ? 'Comprehension' : `Reading: ${item.cat}`,
            category: 'English',
            sentences: [item.q],
            passage: item.passage,
            type: 'sentence',
            desc: `Read and Answer: ${item.q}`
        };

        if (item.options) {
            quest.options = item.options;
            quest.answer = item.a;
            quest.title = item.q;
            quest.desc = "Choose the correct answer";
        }
        return quest;
    });
};

const generateGrade4EnglishWriting = (level, count = 100) => {
    const questionPool = [
        // A. Grammar
        { q: "Active to Passive: 'She eats an apple.'", a: "An apple is eaten by her.", cat: "Grammar", diff: "Hard", type: "science-writing" },
        { q: "Direct to Indirect: He said, 'I am happy.'", a: "He said that he was happy.", cat: "Grammar", diff: "Hard", type: "science-writing" },
        { q: "Identify Conjunction: Bread and butter.", a: "and", cat: "Grammar", diff: "Medium", type: "science-writing" },
        { q: "Write a complex sentence.", a: "Sentence...", cat: "Grammar", diff: "Hard", type: "free-write", count: 2 },

        // B. Creative & Formal Writing
        { q: "Essay: 'Role of Technology' (150 words)", a: "Essay...", cat: "Composition", diff: "Hard", type: "free-write", count: 15, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/240px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg" }, // Reuse image
        { q: "Essay: 'Save Environment'", a: "Essay...", cat: "Composition", diff: "Hard", type: "free-write", count: 15, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg/240px-Ash_Tree_-_geograph.org.uk_-_590710.jpg" },
        { q: "Formal Letter to Principal", a: "Letter...", cat: "Composition", diff: "Hard", type: "free-write", count: 12 },
        { q: "Informal Letter to Cousin", a: "Letter...", cat: "Composition", diff: "Hard", type: "free-write", count: 12 },
        { q: "Story with unexpected ending", a: "Story...", cat: "Composition", diff: "Hard", type: "free-write", count: 15 },
        { q: "Article: 'Healthy Lifestyle'", a: "Article...", cat: "Composition", diff: "Hard", type: "free-write", count: 15 }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => {
        let quest = {
            id: `write-grade4-${level.toLowerCase()}-${i}`,
            title: item.cat,
            type: item.type,
            desc: item.q,
            question: item.q,
            answer: item.a,
            target: item.a,
            imageUrl: item.img
        };

        if (item.type === 'free-write') {
            quest.count = item.count;
            quest.desc = item.q;
        }
        return quest;
    });
};

const generateGrade4EnglishActivity = (level, count = 100) => {
    const questionPool = [
        { q: "Debate: 'Books vs Internet'", a: "Opinion...", type: "creative", cat: "Debate" },
        { q: "Speech Writing Topic", a: "Speech...", type: "creative", cat: "Speech" },
        { q: "Poster: Save Water", a: "Poster...", type: "creative", cat: "Poster", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Splashing_water_drop.jpg/240px-Splashing_water_drop.jpg" }, // Reuse image
        { q: "Role Play: News Reporter", a: "Reporting...", type: "creative", cat: "Role Play" },
        { q: "Create Newspaper Headline", a: "Headline...", type: "creative", cat: "Creative" },
        { q: "Compare & Contrast: 2 Characters", a: "Comparison...", type: "creative", cat: "Analytical" }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => {
        let quest = {
            id: `act-grade4-${level.toLowerCase()}-${i}`,
            title: item.cat,
            type: item.type,
            question: item.q,
            target: item.a,
            answer: item.a,
            imageUrl: item.img,
            desc: "Complete the activity!",
            activity: "English Activity"
        };
        return quest;
    });
};

// --- GRADE 1 MATHEMATICS CURRICULUM ---

const generateGrade1MathReading = (level, count = 100) => {
    const questionPool = [
        // Easy
        { q: "Read number: 5", a: "F-I-V-E", cat: "Number Recognition", diff: "Easy", type: "flashcard", emoji: "5️⃣" },
        { q: "Read number: 12", a: "Twelve", cat: "Number Recognition", diff: "Easy", type: "flashcard", emoji: "1️⃣2️⃣" },
        { q: "What comes after 7?", a: "8", cat: "Ordering", diff: "Easy", type: "flashcard" },
        { q: "What comes before 10?", a: "9", cat: "Ordering", diff: "Easy", type: "flashcard" },
        { q: "Which is bigger: 8 or 3?", a: "8", cat: "Comparison", diff: "Easy", type: "flashcard", options: ["8", "3"] },
        { q: "4 + 1 = ?", a: "5", cat: "Addition", diff: "Easy", type: "flashcard" },
        { q: "6 - 2 = ?", a: "4", cat: "Subtraction", diff: "Easy", type: "flashcard" },
        { q: "Identify Shape", a: "Circle", cat: "Geometry", diff: "Easy", type: "flashcard", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Circle_-_black_simple.svg/240px-Circle_-_black_simple.svg.png" },

        // Medium
        { q: "8 + 4 = ?", a: "12", cat: "Addition", diff: "Medium", type: "flashcard" },
        { q: "15 - 5 = ?", a: "10", cat: "Subtraction", diff: "Medium", type: "flashcard" },
        { q: "Greater: 16 or 19?", a: "19", cat: "Comparison", diff: "Medium", type: "flashcard", options: ["16", "19"] },
        { q: "Count by 2s: 2, 4, 6...?", a: "8", cat: "Patterns", diff: "Medium", type: "flashcard" },
        { q: "How many tens in 20?", a: "2", cat: "Place Value", diff: "Medium", type: "flashcard" },

        // Hard
        { q: "14 + 6 = ?", a: "20", cat: "Addition", diff: "Hard", type: "flashcard" },
        { q: "20 - 9 = ?", a: "11", cat: "Subtraction", diff: "Hard", type: "flashcard" },
        { q: "Number between 18 and 20?", a: "19", cat: "Ordering", diff: "Hard", type: "flashcard" },
        { q: "5 apples + 7 apples = ?", a: "12", cat: "Word Problems", diff: "Hard", type: "flashcard" }
    ];

    // Generate random additions for volume
    for (let i = 0; i < 20; i++) {
        const n1 = Math.floor(Math.random() * 20);
        const n2 = Math.floor(Math.random() * 10);
        questionPool.push({
            q: `${n1} + ${n2} = ?`,
            a: (n1 + n2).toString(),
            cat: "Addition",
            diff: n1 + n2 > 15 ? "Hard" : "Medium",
            type: "flashcard"
        });
    }

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20); // Select 20 per session for variety

    return selected.map((item, i) => ({
        id: `read-grade1-math-${level.toLowerCase()}-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        answer: item.a,
        options: item.options,
        sentences: [item.q], // ADDED: Required for ReadingModule
        imageUrl: item.img,
        emoji: item.emoji,
        desc: "Read and Solve",
        category: "Mathematics"
    }));
};

const generateGrade1MathWriting = (level, count = 100) => {
    const questionPool = [
        // Easy
        { q: "Write number 5", a: "5", cat: "Writing Numbers", diff: "Easy", type: "activity-quest" },
        { q: "Write 'Ten'", a: "Ten", cat: "Number Names", diff: "Easy", type: "activity-quest" },
        { q: "3 + 2 = ?", a: "5", cat: "Addition", diff: "Easy", type: "activity-quest" },
        { q: "6 - 3 = ?", a: "3", cat: "Subtraction", diff: "Easy", type: "activity-quest" },

        // Medium
        { q: "Write number 25", a: "25", cat: "Writing Numbers", diff: "Medium", type: "activity-quest" },
        { q: "18 + 2 = ?", a: "20", cat: "Addition", diff: "Medium", type: "activity-quest" },
        { q: "20 - 7 = ?", a: "13", cat: "Subtraction", diff: "Medium", type: "activity-quest" },

        // Hard
        { q: "16 + 4 = ?", a: "20", cat: "Addition", diff: "Hard", type: "activity-quest" },
        { q: "19 - 8 = ?", a: "11", cat: "Subtraction", diff: "Hard", type: "activity-quest" },
        { q: "Write: Twelve", a: "12", cat: "Number Names", diff: "Hard", type: "activity-quest" }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `write-grade1-math-${level.toLowerCase()}-${i}`,
        title: item.cat,
        type: item.type, // reusing activity-quest for simple inputs
        question: item.q,
        target: item.a,
        answer: item.a,
        desc: "Write the answer",
        category: "Mathematics"
    }));
};

const generateGrade1MathActivity = (level, count = 100) => {
    const questionPool = [
        { q: "Count the apples: 🍎🍎🍎", a: "3", type: "activity-quest", cat: "Counting" },
        { q: "Which is biggest?", a: "9", type: "matching", options: ["2", "9"], cat: "Comparison" },
        { q: "Draw 5 stars", a: "manual", type: "creative", cat: "Drawing" }, // Uses creative input
        { q: "Sort: Circle vs Square", a: "Square", type: "matching", options: ["Circle", "Square"], cat: "Geometry", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Square_-_black_simple.svg/240px-Square_-_black_simple.svg.png" }, // Square image for matching
        { q: "Arrange: 2, 5, 1", a: "1, 2, 5", type: "activity-quest", cat: "Ordering" }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `act-grade1-math-${level.toLowerCase()}-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        target: item.a,
        answer: item.a,
        imageUrl: item.img,
        options: item.options,
        desc: "Complete the activity",
        activity: "Math Activity"
    }));
};

// --- GRADE 2 MATHEMATICS CURRICULUM ---

const generateGrade2MathReading = (level, count = 100) => {
    const questionPool = [
        // Easy
        { q: "Read number: 45", a: "Forty-five", cat: "Number Recognition", diff: "Easy", type: "flashcard" },
        { q: "What comes after 99?", a: "100", cat: "Ordering", diff: "Easy", type: "flashcard" },
        { q: "5 + 6 = ?", a: "11", cat: "Addition", diff: "Easy", type: "flashcard" },
        { q: "Double of 4?", a: "8", cat: "Multiplication", diff: "Easy", type: "flashcard" },
        { q: "Days in February?", a: "28", cat: "Time", diff: "Easy", type: "flashcard" },

        // Medium
        { q: "24 + 15 = ?", a: "39", cat: "Addition", diff: "Medium", type: "flashcard" },
        { q: "56 - 23 = ?", a: "33", cat: "Subtraction", diff: "Medium", type: "flashcard" },
        { q: "5 x 2 = ?", a: "10", cat: "Multiplication", diff: "Medium", type: "flashcard" },
        { q: "Place value of 7 in 78?", a: "Tens", cat: "Place Value", diff: "Medium", type: "flashcard", options: ["Tens", "Ones"] },

        // Hard
        { q: "78 + 46 = ?", a: "124", cat: "Addition", diff: "Hard", type: "flashcard" },
        { q: "92 - 38 = ?", a: "54", cat: "Subtraction", diff: "Hard", type: "flashcard" },
        { q: "6 x 4 = ?", a: "24", cat: "Multiplication", diff: "Hard", type: "flashcard" },
        { q: "5 x ? = 35", a: "7", cat: "Missing Number", diff: "Hard", type: "flashcard" }
    ];

    // Generate random calculations
    for (let i = 0; i < 20; i++) {
        const n1 = Math.floor(Math.random() * 50) + 10;
        const n2 = Math.floor(Math.random() * 40) + 10;
        questionPool.push({
            q: `${n1} + ${n2} = ?`,
            a: (n1 + n2).toString(),
            cat: "Addition",
            diff: "Hard",
            type: "flashcard"
        });
    }

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `read-grade2-math-${level.toLowerCase()}-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        answer: item.a,
        options: item.options,
        sentences: [item.q], // ADDED: Required for ReadingModule
        desc: "Solve the problem",
        category: "Mathematics"
    }));
};

const generateGrade2MathWriting = (level, count = 100) => {
    const questionPool = [
        // Easy
        { q: "Write number 34", a: "34", cat: "Writing", diff: "Easy", type: "activity-quest" },
        { q: "Expanded form of 45", a: "40 + 5", cat: "Expanded Form", diff: "Easy", type: "activity-quest" },
        { q: "14 + 5 = ?", a: "19", cat: "Addition", diff: "Easy", type: "activity-quest" },

        // Medium
        { q: "56 + 37 = ?", a: "93", cat: "Addition", diff: "Medium", type: "activity-quest" },
        { q: "82 - 19 = ?", a: "63", cat: "Subtraction", diff: "Medium", type: "activity-quest" },
        { q: "7 x 8 = ?", a: "56", cat: "Multiplication", diff: "Medium", type: "activity-quest" },

        // Hard
        { q: "Write subtraction: 50 - 25", a: "25", cat: "Word Problem", diff: "Hard", type: "activity-quest" }, // Changed to single input
        { q: "Create a multiplication story for 5 x 3", a: "Story...", cat: "Creative Math", diff: "Hard", type: "free-write", count: 5 }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `write-grade2-math-${level.toLowerCase()}-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        target: item.a,
        answer: item.a,
        desc: item.q,
        category: "Mathematics"
    }));
};

const generateGrade2MathActivity = (level, count = 100) => {
    const questionPool = [
        { q: "Circle even numbers: 2, 5, 8", a: "2, 8", type: "activity-quest", cat: "Identification" },
        { q: "Make groups of 10 sticks", a: "Action", type: "creative", cat: "Grouping" },
        { q: "Shopkeeper: Buying candy for 20", a: "20", type: "activity-quest", cat: "Money" },
        { q: "Measure desk (cm)", a: "Number", type: "activity-quest", cat: "Measurement" },
        { q: "Sudoku Pattern: 1, 2, ?, 4", a: "3", type: "activity-quest", cat: "Puzzle" }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `act-grade2-math-${level.toLowerCase()}-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        target: item.a,
        answer: item.a,
        desc: "Math Activity Time!",
        category: "Mathematics"
    }));
};

// --- GRADE 3 MATHEMATICS CURRICULUM ---

const generateGrade3MathReading = (level, count = 100) => {
    const questionPool = [
        // Easy
        { q: "Read number: 345", a: "Three hundred forty-five", cat: "Number Recognition", diff: "Easy", type: "flashcard" },
        { q: "Place value of 5 in 356?", a: "Tens", cat: "Place Value", diff: "Easy", type: "flashcard" },
        { q: "25 + 34 = ?", a: "59", cat: "Addition", diff: "Easy", type: "flashcard" },
        { q: "6 x 4 = ?", a: "24", cat: "Multiplication", diff: "Easy", type: "flashcard" },
        { q: "Fraction for half?", a: "1/2", cat: "Fractions", diff: "Easy", type: "flashcard", emoji: "🍰" },

        // Medium
        { q: "356 + 278 = ?", a: "634", cat: "Addition", diff: "Medium", type: "flashcard" },
        { q: "905 - 478 = ?", a: "427", cat: "Subtraction", diff: "Medium", type: "flashcard" },
        { q: "45 x 6 = ?", a: "270", cat: "Multiplication", diff: "Medium", type: "flashcard" },
        { q: "96 / 8 = ?", a: "12", cat: "Division", diff: "Medium", type: "flashcard" },
        { q: "Perimeter of square (side 5)?", a: "20", cat: "Geometry", diff: "Medium", type: "flashcard" },

        // Hard
        { q: "456 + 789 - 234 = ?", a: "1011", cat: "Mixed Ops", diff: "Hard", type: "flashcard" },
        { q: "125 x 8 = ?", a: "1000", cat: "Multiplication", diff: "Hard", type: "flashcard" },
        { q: "LCM of 4 & 6?", a: "12", cat: "LCM/HCF", diff: "Hard", type: "flashcard" },
        { q: "Improper to mixed: 7/3", a: "2 1/3", cat: "Fractions", diff: "Hard", type: "flashcard" }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `read-grade3-math-${level.toLowerCase()}-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        answer: item.a,
        sentences: [item.q], // ADDED
        desc: "Calculate",
        category: "Mathematics"
    }));
};

const generateGrade3MathWriting = (level, count = 100) => {
    const questionPool = [
        // Easy
        { q: "Write expanded form: 345", a: "300 + 40 + 5", cat: "Expanded Form", diff: "Easy", type: "activity-quest" },
        { q: "245 + 123 = ?", a: "368", cat: "Addition", diff: "Easy", type: "activity-quest" },

        // Medium
        { q: "Convert 5m to cm", a: "500", cat: "Conversion", diff: "Medium", type: "activity-quest" },
        { q: "Write a word problem for 15 / 3", a: "Problem...", cat: "Creative Math", diff: "Medium", type: "free-write", count: 4 },

        // Hard
        { q: "Create 5 challenging word problems", a: "Problems...", cat: "Creative Math", diff: "Hard", type: "free-write", count: 10 },
        { q: "Explain how to find area of rectangle", a: "Explanation...", cat: "Geometry", diff: "Hard", type: "free-write", count: 5 }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `write-grade3-math-${level.toLowerCase()}-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        target: item.a,
        answer: item.a,
        desc: item.q,
        category: "Mathematics"
    }));
};

const generateGrade3MathActivity = (level, count = 100) => {
    const questionPool = [
        { q: "Budget: Spend 100 on toys", a: "List...", type: "creative", cat: "Money" },
        { q: "Measure classroom objects", a: "List...", type: "creative", cat: "Measurement" },
        { q: "Make fraction pizza model", a: "Draw...", type: "creative", cat: "Fractions" },
        { q: "Multiplication relay race", a: "Run...", type: "creative", cat: "Game" }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `act-grade3-math-${level.toLowerCase()}-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        target: item.a,
        answer: item.a,
        desc: "Activity Time",
        category: "Mathematics"
    }));
};

// --- GRADE 4 MATHEMATICS CURRICULUM ---

const generateGrade4MathReading = (level, count = 100) => {
    const questionPool = [
        // Easy
        { q: "Read: 4,567", a: "Four thousand...", cat: "Number Recognition", diff: "Easy", type: "flashcard" },
        { q: "Place value of 6 in 6,542", a: "Thousands", cat: "Place Value", diff: "Easy", type: "flashcard" },
        { q: "234 + 567 = ?", a: "801", cat: "Addition", diff: "Easy", type: "flashcard" },
        { q: "7 x 8 = ?", a: "56", cat: "Multiplication", diff: "Easy", type: "flashcard" },
        { q: "Factors of 12?", a: "1, 2, 3, 4, 6, 12", cat: "Factors", diff: "Easy", type: "flashcard" },

        // Medium
        { q: "3,456 + 2,789 = ?", a: "6245", cat: "Addition", diff: "Medium", type: "flashcard" },
        { q: "125 x 24 = ?", a: "3000", cat: "Multiplication", diff: "Medium", type: "flashcard" },
        { q: "Convert 3/4 to decimal", a: "0.75", cat: "Decimals", diff: "Medium", type: "flashcard" },
        { q: "Area of square (side 9)?", a: "81", cat: "Geometry", diff: "Medium", type: "flashcard" },

        // Hard
        { q: "324 x 45 = ?", a: "14580", cat: "Multiplication", diff: "Hard", type: "flashcard" },
        { q: "LCM of 8 & 12?", a: "24", cat: "LCM/HCF", diff: "Hard", type: "flashcard" },
        { q: "Average of 10, 20, 30, 40?", a: "25", cat: "Average", diff: "Hard", type: "flashcard" }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `read-grade4-math-${level.toLowerCase()}-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        answer: item.a,
        sentences: [item.q], // ADDED
        desc: "Solve",
        category: "Mathematics"
    }));
};

const generateGrade4MathWriting = (level, count = 100) => {
    const questionPool = [
        // Easy
        { q: "Write expanded form: 7,905", a: "7000 + 900 + 5", cat: "Expanded Form", diff: "Easy", type: "activity-quest" },

        // Medium
        { q: "Write 3 long division problems", a: "Problems...", cat: "Creative Math", diff: "Medium", type: "free-write", count: 5 },
        { q: "Convert 5km to m", a: "5000", cat: "Conversion", diff: "Medium", type: "activity-quest" },

        // Hard
        { q: "Design a mini math test (10 q)", a: "Test...", cat: "Project", diff: "Hard", type: "free-write", count: 12 },
        { q: "Create a budget for a school trip", a: "Budget...", cat: "Project", diff: "Hard", type: "free-write", count: 10 }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `write-grade4-math-${level.toLowerCase()}-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        target: item.a,
        answer: item.a,
        desc: item.q,
        category: "Mathematics"
    }));
};

const generateGrade4MathActivity = (level, count = 100) => {
    const questionPool = [
        { q: "Make fraction pizza model", a: "Draw...", type: "creative", cat: "Fractions" },
        { q: "Create pie chart from class data", a: "Chart...", type: "creative", cat: "Data" },
        { q: "Plan a trip budget", a: "Plan...", type: "creative", cat: "Project" },
        { q: "Advanced Sudoku", a: "Solve...", type: "creative", cat: "Puzzle" }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `act-grade4-math-${level.toLowerCase()}-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        target: item.a,
        answer: item.a,
        desc: "Activity Challenge",
        category: "Mathematics"
    }));
};

// --- GRADE 1 SCIENCE CURRICULUM ---

const generateGrade1ScienceReading = (level, count = 100) => {
    const questionPool = [
        // Easy
        { q: "Is a dog a living thing?", a: "Yes", cat: "Living Things", diff: "Easy", type: "flashcard", emoji: "🐶" },
        { q: "Do plants need water?", a: "Yes", cat: "Plants", diff: "Easy", type: "flashcard", emoji: "🌱" },
        { q: "Do we breathe air?", a: "Yes", cat: "Human Body", diff: "Easy", type: "flashcard" },
        { q: "Which body part helps you see?", a: "Eyes", cat: "Human Body", diff: "Easy", type: "flashcard", emoji: "👀" },
        { q: "Is the sun hot?", a: "Yes", cat: "Nature", diff: "Easy", type: "flashcard", emoji: "☀️" },

        // Medium
        { q: "Why do plants need sunlight?", a: "To make food", cat: "Plants", diff: "Medium", type: "flashcard" },
        { q: "What do cows give us?", a: "Milk", cat: "Animals", diff: "Medium", type: "flashcard", emoji: "🐄" },
        { q: "Which season is cold?", a: "Winter", cat: "Seasons", diff: "Medium", type: "flashcard", emoji: "❄️" },
        { q: "Why should we wash hands?", a: "To remove germs", cat: "Hygiene", diff: "Medium", type: "flashcard" },

        // Hard
        { q: "Why are trees important?", a: "They give oxygen", cat: "Environment", diff: "Hard", type: "flashcard" },
        { q: "Why do animals need shelter?", a: "To stay safe", cat: "Animals", diff: "Hard", type: "flashcard" },
        { q: "How can we keep environment clean?", a: "Throw trash in bin", cat: "Environment", diff: "Hard", type: "flashcard" }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `read-grade1-science-${level.toLowerCase()}-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        answer: item.a,
        sentences: [item.q], // REQUIRED
        emoji: item.emoji,
        desc: "Read and Learn",
        category: "Science"
    }));
};

const generateGrade1ScienceWriting = (level, count = 100) => {
    const questionPool = [
        // Easy
        { q: "Write 3 living things", a: "Dog, Cat, Tree", cat: "Living Things", diff: "Easy", type: "science-writing" },
        { q: "Plants need ___ to grow", a: "Water", cat: "Plants", diff: "Easy", type: "science-writing" },
        { q: "The sun is ___", a: "Hot", cat: "Nature", diff: "Easy", type: "science-writing" },

        // Medium
        { q: "Write 5 lines about plants", a: "Plants need water...", cat: "Plants", diff: "Medium", type: "free-write", count: 5 },
        { q: "Write about animals", a: "Animals live in...", cat: "Animals", diff: "Medium", type: "free-write", count: 3 },

        // Hard
        { q: "Write about Importance of Trees", a: "Trees give oxygen...", cat: "Environment", diff: "Hard", type: "free-write", count: 5 },
        { q: "Write about water conservation", a: "Save water by...", cat: "Environment", diff: "Hard", type: "free-write", count: 5 }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `write-grade1-science-${level.toLowerCase()}-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        target: item.a,
        answer: item.a,
        desc: item.q,
        category: "Science"
    }));
};

const generateGrade1ScienceActivity = (level, count = 100) => {
    const questionPool = [
        { q: "Circle living things", a: "Circle...", type: "activity-quest", cat: "Living Things" },
        { q: "Match animals to homes", a: "Match...", type: "matching", options: ["Dog-Kennel", "Bird-Nest"], cat: "Animals" },
        { q: "Draw sun and moon", a: "Draw...", type: "creative", cat: "Nature" },
        { q: "Sort: Pet vs Wild", a: "Sort...", type: "matching", options: ["Dog", "Lion"], cat: "Animals" }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `act-grade1-science-${level.toLowerCase()}-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        target: item.a,
        answer: item.a,
        options: item.options,
        desc: "Science Activity",
        category: "Science"
    }));
};

// --- GRADE 2 SCIENCE CURRICULUM ---

const generateGrade2ScienceReading = (level, count = 100) => {
    const questionPool = [
        // Easy
        { q: "What are living things?", a: "Things that grow", cat: "Living Things", diff: "Easy", type: "flashcard" },
        { q: "Do plants make their own food?", a: "Yes", cat: "Plants", diff: "Easy", type: "flashcard" },
        { q: "Which organ helps us breathe?", a: "Lungs", cat: "Human Body", diff: "Easy", type: "flashcard", emoji: "🫁" },
        { q: "Name one herbivore animal", a: "Cow", cat: "Animals", diff: "Easy", type: "flashcard", emoji: "🐄" },

        // Medium
        { q: "Why are plants important?", a: "Give food and oxygen", cat: "Plants", diff: "Medium", type: "flashcard" },
        { q: "What is photosynthesis?", a: "Plants making food", cat: "Plants", diff: "Medium", type: "flashcard" },
        { q: "What are mammals?", a: "Give birth to babies", cat: "Animals", diff: "Medium", type: "flashcard" },
        { q: "What causes day and night?", a: "Earth rotation", cat: "Space", diff: "Medium", type: "flashcard" },

        // Hard
        { q: "Explain food chain", a: "Grass -> Deer -> Lion", cat: "Ecosystem", diff: "Hard", type: "flashcard" },
        { q: "Why do animals adapt?", a: "To survive", cat: "Animals", diff: "Hard", type: "flashcard" },
        { q: "Difference: Renewable vs Non-renewable", a: "Sun vs Coal", cat: "Resources", diff: "Hard", type: "flashcard" }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `read-grade2-science-${level.toLowerCase()}-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        answer: item.a,
        sentences: [item.q], // REQUIRED
        emoji: item.emoji,
        desc: "Read and Learn",
        category: "Science"
    }));
};

const generateGrade2ScienceWriting = (level, count = 100) => {
    const questionPool = [
        // Easy
        { q: "Write 5 living things", a: "Dog, Cat...", cat: "Living Things", diff: "Easy", type: "science-writing" }, // Single input checks
        { q: "The sun is a ___", a: "Star", cat: "Space", diff: "Easy", type: "science-writing" },

        // Medium
        { q: "Write 5 lines on plants", a: "Plants grow...", cat: "Plants", diff: "Medium", type: "free-write", count: 5 },
        { q: "Write about seasons", a: "Summer is hot...", cat: "Seasons", diff: "Medium", type: "free-write", count: 4 },

        // Hard
        { q: "Write paragraph on Save Water", a: "Water is life...", cat: "Environment", diff: "Hard", type: "free-write", count: 6 },
        { q: "Causes of pollution", a: "Smoke, trash...", cat: "Pollution", diff: "Hard", type: "free-write", count: 5 }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `write-grade2-science-${level.toLowerCase()}-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        target: item.a,
        answer: item.a,
        desc: item.q,
        category: "Science"
    }));
};

const generateGrade2ScienceActivity = (level, count = 100) => {
    const questionPool = [
        { q: "Match animals to habitats", a: "Match...", type: "matching", options: ["Camel-Desert", "Fish-Water"], cat: "Habitats" },
        { q: "Draw water cycle", a: "Draw...", type: "creative", cat: "Water" },
        { q: "Sort Healthy vs Junk food", a: "Sort...", type: "matching", options: ["Apple", "Burger"], cat: "Health" },
        { q: "Make food chain chart", a: "Chart...", type: "creative", cat: "Ecosystem" }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `act-grade2-science-${level.toLowerCase()}-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        target: item.a,
        answer: item.a,
        options: item.options,
        desc: "Science Activity",
        category: "Science"
    }));
};

// --- GRADE 3 SCIENCE CURRICULUM ---

const generateGrade3ScienceReading = (level, count = 100) => {
    const questionPool = [
        // Easy
        { q: "Name two characteristics of living things", a: "Grow, Breathe", cat: "Living Things", diff: "Easy", type: "flashcard" },
        { q: "Function of roots?", a: "Absorb water", cat: "Plants", diff: "Easy", type: "flashcard" },
        { q: "What are herbivores?", a: "Eat plants", cat: "Animals", diff: "Easy", type: "flashcard" },
        { q: "What is solar system?", a: "Sun and planets", cat: "Space", diff: "Easy", type: "flashcard" },

        // Medium
        { q: "Explain photosynthesis", a: "Sunlight to food", cat: "Plants", diff: "Medium", type: "flashcard" },
        { q: "What is a food chain?", a: "Energy flow", cat: "Ecosystem", diff: "Medium", type: "flashcard" },
        { q: "What is evaporation?", a: "Water to vapor", cat: "Water Cycle", diff: "Medium", type: "flashcard" },
        { q: "Why conserve water?", a: "Limited supply", cat: "Conservation", diff: "Medium", type: "flashcard" },

        // Hard
        { q: "What if no decomposers?", a: "Waste piles up", cat: "Ecosystem", diff: "Hard", type: "flashcard" },
        { q: "Compare renewable vs non-renewable", a: "Infinite vs Limited", cat: "Resources", diff: "Hard", type: "flashcard" },
        { q: "How do animals adapt to desert?", a: "Store water", cat: "Adaptation", diff: "Hard", type: "flashcard" }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `read-grade3-science-${level.toLowerCase()}-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        answer: item.a,
        sentences: [item.q], // REQUIRED
        desc: "Read and Learn",
        category: "Science"
    }));
};

const generateGrade3ScienceWriting = (level, count = 100) => {
    const questionPool = [
        // Easy
        { q: "Write 3 herbivores", a: "Cow, Goat, Deer", cat: "Animals", diff: "Easy", type: "science-writing" },
        { q: "Write 4 plant parts", a: "Root, Stem, Leaf, Flower", cat: "Plants", diff: "Easy", type: "science-writing" },

        // Medium
        { q: "Write 5 lines on water cycle", a: "Evaporation...", cat: "Water Cycle", diff: "Medium", type: "free-write", count: 5 },
        { q: "Write 5 lines on pollution", a: "Make air dirty...", cat: "Pollution", diff: "Medium", type: "free-write", count: 5 },

        // Hard
        { q: "Write paragraph on Save Environment", a: "Reduce reuse recycle...", cat: "Environment", diff: "Hard", type: "free-write", count: 8 },
        { q: "Explain life cycle of butterfly", a: "Egg -> Larva...", cat: "Life Cycle", diff: "Hard", type: "free-write", count: 4 }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `write-grade3-science-${level.toLowerCase()}-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        target: item.a,
        answer: item.a,
        desc: item.q,
        category: "Science"
    }));
};

const generateGrade3ScienceActivity = (level, count = 100) => {
    const questionPool = [
        { q: "Label parts of plant", a: "Label...", type: "creative", cat: "Plants" },
        { q: "Draw food chain diagram", a: "Draw...", type: "creative", cat: "Ecosystem" },
        { q: "Conduct evaporation experiment", a: "Do...", type: "creative", cat: "Water Cycle" },
        { q: "Create habitat poster", a: "Poster...", type: "creative", cat: "Adaptation" }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `act-grade3-science-${level.toLowerCase()}-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        target: item.a,
        answer: item.a,
        desc: "Science Activity",
        category: "Science"
    }));
};

// --- GRADE 4 SCIENCE CURRICULUM ---

const generateGrade4ScienceReading = (level, count = 100) => {
    const questionPool = [
        // Easy
        { q: "What are producers?", a: "Plants", cat: "Food Chain", diff: "Easy", type: "flashcard" },
        { q: "What is evaporation?", a: "Liquid to gas", cat: "Water Cycle", diff: "Easy", type: "flashcard" },
        { q: "Function of skeleton?", a: "Support body", cat: "Human Body", diff: "Easy", type: "flashcard" },
        { q: "Name two renewable resources", a: "Sun, Wind", cat: "Resources", diff: "Easy", type: "flashcard" },

        // Medium
        { q: "Explain water cycle steps", a: "Evap, Cond, Precip", cat: "Water Cycle", diff: "Medium", type: "flashcard" },
        { q: "What is friction?", a: "Force opposing motion", cat: "Force", diff: "Medium", type: "flashcard" },
        { q: "Why are forests important?", a: "Oxygen, Habitat", cat: "Environment", diff: "Medium", type: "flashcard" },
        { q: "Explain digestive system", a: "Breaks down food", cat: "Human Body", diff: "Medium", type: "flashcard" },

        // Hard
        { q: "Differentiate food chain & food web", a: "Single vs Network", cat: "Ecosystem", diff: "Hard", type: "flashcard" },
        { q: "How pollution affects climate?", a: "Global warming", cat: "Pollution", diff: "Hard", type: "flashcard" },
        { q: "What if friction didn't exist?", a: "Cannot walk", cat: "Force", diff: "Hard", type: "flashcard" }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `read-grade4-science-${level.toLowerCase()}-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        answer: item.a,
        sentences: [item.q], // REQUIRED
        desc: "Read and Learn",
        category: "Science"
    }));
};

const generateGrade4ScienceWriting = (level, count = 100) => {
    const questionPool = [
        // Easy
        { q: "Write 3 states of matter", a: "Solid, Liquid, Gas", cat: "Matter", diff: "Easy", type: "science-writing" },
        { q: "Write 3 types of forces", a: "Gravity, Friction, Magnetic", cat: "Force", diff: "Easy", type: "science-writing" },

        // Medium
        { q: "Write 5 lines on food web", a: "Interconnected chains...", cat: "Ecosystem", diff: "Medium", type: "free-write", count: 5 },
        { q: "Write 5 lines on energy conservation", a: "Save lights...", cat: "Energy", diff: "Medium", type: "free-write", count: 5 },

        // Hard
        { q: "Write paragraph on Climate Change", a: "Earth getting warmer...", cat: "Environment", diff: "Hard", type: "free-write", count: 8 },
        { q: "Explain digestive system steps", a: "Mouth -> Esophagus...", cat: "Human Body", diff: "Hard", type: "free-write", count: 6 }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `write-grade4-science-${level.toLowerCase()}-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        target: item.a,
        answer: item.a,
        desc: item.q,
        category: "Science"
    }));
};

const generateGrade4ScienceActivity = (level, count = 100) => {
    const questionPool = [
        { q: "Draw labeled digestive system", a: "Draw...", type: "creative", cat: "Human Body" },
        { q: "Make working model of water cycle", a: "Model...", type: "creative", cat: "Water Cycle" },
        { q: "Survey energy usage at home", a: "Survey...", type: "creative", cat: "Energy" },
        { q: "Design climate awareness campaign", a: "Plan...", type: "creative", cat: "Environment" }
    ];

    const shuffled = questionPool.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);

    return selected.map((item, i) => ({
        id: `act-grade4-science-${level.toLowerCase()}-${i}`,
        title: item.cat,
        type: item.type,
        question: item.q,
        target: item.a,
        answer: item.a,
        desc: "Science Activity",
        category: "Science"
    }));
};



