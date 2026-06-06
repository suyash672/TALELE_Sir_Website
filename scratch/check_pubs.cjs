const fs = require('fs');

const text = fs.readFileSync('scratch/publications_text.txt', 'utf8');

const lines = text.split('\n').filter(l => l.trim() !== '');

let currentType = 'Conference Paper';
const items = [];

let currentItem = '';

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('●\tJournal Publications') || line.startsWith('● Journal Publications')) {
        currentType = 'Journal Paper';
    } else if (line.startsWith('●\tConference Publications') || line.startsWith('● Conference Publications')) {
        currentType = 'Conference Paper';
    } else if (line.startsWith('●\tPatent') || line.startsWith('● Patent')) {
        currentType = 'Patent';
    } else if (line.match(/^\[\d+\]/) || line.match(/^\(\d+\)/)) {
        if (currentItem !== '') {
            items.push({ type: currentType, content: currentItem });
        }
        currentItem = line;
    } else if (currentItem !== '' && !line.startsWith('⮚')) {
        currentItem += '\n' + line;
    }
}
if (currentItem !== '') {
    items.push({ type: currentType, content: currentItem });
}

console.log(`Total items parsed: ${items.length}`);

const uniqueItems = [];
const duplicates = [];

items.forEach(item => {
    // Basic deduplication based on normalized content (ignoring the number prefix, extra spaces and case)
    let contentNormalized = item.content.replace(/^\[\d+\]\s*/, '').replace(/^\(\d+\)\s*/, '');
    contentNormalized = contentNormalized.replace(/\s+/g, ' ').trim().toLowerCase();
    
    // Find if already exists
    const existing = uniqueItems.find(u => {
        let uContentNormalized = u.content.replace(/^\[\d+\]\s*/, '').replace(/^\(\d+\)\s*/, '');
        uContentNormalized = uContentNormalized.replace(/\s+/g, ' ').trim().toLowerCase();
        
        // Also check if titles match closely
        // Extract title assuming it's in quotes or the second segment
        const matchTitle = (text1, text2) => {
            const getTitle = (t) => {
                const match = t.match(/[“"](.*?)[”"]/);
                return match ? match[1] : null;
            };
            const title1 = getTitle(text1);
            const title2 = getTitle(text2);
            if (title1 && title2 && title1 === title2) return true;
            
            // For patents
            if (text1.includes('patent title:') && text2.includes('patent title:')) {
                const pTitle1 = text1.split('applicant')[0];
                const pTitle2 = text2.split('applicant')[0];
                if (pTitle1 === pTitle2) return true;
            }
            return false;
        };

        return uContentNormalized === contentNormalized || matchTitle(contentNormalized, uContentNormalized);
    });

    if (existing) {
        duplicates.push({ original: existing.content, duplicate: item.content });
    } else {
        uniqueItems.push(item);
    }
});

console.log(`Unique items: ${uniqueItems.length}`);
console.log(`Duplicates found: ${duplicates.length}`);

if (duplicates.length > 0) {
    console.log('\n--- Duplicates ---');
    duplicates.forEach(d => {
        console.log(`Original: ${d.original.split('\n')[0].substring(0, 50)}...`);
        console.log(`Duplicate: ${d.duplicate.split('\n')[0].substring(0, 50)}...`);
        console.log('---');
    });
}

// Compare with existing JSON
const pubsJson = JSON.parse(fs.readFileSync('src/utils/publications_data.json', 'utf8'));
const confCount = pubsJson.publications.conferencepapers.length;
const journalCount = pubsJson.publications.journalpapers.length;
console.log(`\nCurrent JSON has ${confCount} conference papers and ${journalCount} journal papers.`);
console.log(`Total in JSON: ${confCount + journalCount}`);

const patentsJson = JSON.parse(fs.readFileSync('src/utils/patents_data.json', 'utf8'));
console.log(`Current Patents JSON has ${patentsJson.patents.length} patents.`);

const textConf = uniqueItems.filter(i => i.type === 'Conference Paper').length;
const textJournal = uniqueItems.filter(i => i.type === 'Journal Paper').length;
const textPatent = uniqueItems.filter(i => i.type === 'Patent').length;

console.log(`\nText has ${textConf} conference papers, ${textJournal} journal papers, ${textPatent} patents (unique).`);

