const fs = require('fs');

const text = fs.readFileSync('scratch/publications_text.txt', 'utf8');

// Extract all numbers in brackets or parentheses at the start of a line
const textIds = [];
const lines = text.split('\n');
for (const line of lines) {
    const trimmed = line.trim();
    let match = trimmed.match(/^\[(\d+)\]/);
    if (!match) {
        match = trimmed.match(/^\((\d+)\)/);
    }
    if (match) {
        textIds.push(parseInt(match[1]));
    }
}

console.log(`Found ${textIds.length} IDs in text:`, textIds.join(', '));

const pubsJson = JSON.parse(fs.readFileSync('src/utils/publications_data.json', 'utf8'));
const confIds = pubsJson.publications.conferencepapers.map(p => p.id);
const journalIds = pubsJson.publications.journalpapers.map(p => p.id);

const patentsJson = JSON.parse(fs.readFileSync('src/utils/patents_data.json', 'utf8'));
const patentIds = patentsJson.patents.map(p => p.id);

const jsonIds = [...confIds, ...journalIds, ...patentIds].sort((a, b) => a - b);
console.log(`Found ${jsonIds.length} IDs in JSON:`, jsonIds.join(', '));

const missingFromJson = textIds.filter(id => !jsonIds.includes(id));
const missingFromText = jsonIds.filter(id => !textIds.includes(id));

console.log(`\nIDs missing from JSON:`, missingFromJson);
console.log(`IDs missing from Text:`, missingFromText);

// Print the content of missing items from text
if (missingFromJson.length > 0) {
    console.log('\n--- Missing Items Content ---');
    missingFromJson.forEach(id => {
        const regex = new RegExp(`^[\\[\\(]${id}[\\]\\)].*?(?=^[\\[\\(]|$)`, 'ms');
        const match = text.match(regex);
        if (match) {
            console.log(match[0].substring(0, 150).replace(/\n/g, ' ') + '...');
        }
    });
}
