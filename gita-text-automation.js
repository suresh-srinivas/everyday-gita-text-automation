const baseUrl = 'https://shlokam.org/bhagavad-gita/';


const chapterData = [
    { chapter: 1, name: 'Arjuna Vishada Yoga', verses: 47 },
    { chapter: 2, name: 'Sankhya Yoga', verses: 72 },
    { chapter: 3, name: 'Karma Yoga', verses: 43 },
    { chapter: 4, name: 'Gyana-Karma-Sanyasa Yoga', verses: 42 },
    { chapter: 5, name: 'Karma-Sanyasa Yoga', verses: 29 },
    { chapter: 6, name: 'Atma-Samyama Yoga', verses: 47 },
    { chapter: 7, name: 'gnana-Vignana Yoga', verses: 30 },
    { chapter: 8, name: 'Aksara-ParaBrahma Yoga', verses: 28 },
    { chapter: 9, name: 'Raja-Vidya-Raja-Guhya Yoga', verses: 34 },
    { chapter: 10, name: 'Vibhuti Yoga', verses: 42 },
    { chapter: 11, name: 'Vishwarupa-Darsana Yoga', verses: 55 },
    { chapter: 12, name: 'Bhakti Yoga', verses: 20 },
    { chapter: 13, name: 'Ksetra-Ksetrajna-Vibhaga Yoga', verses: 34 },
    { chapter: 14, name: 'Gunatraya-Vibhaga Yoga', verses: 27 },
    { chapter: 15, name: 'Purushottama Yoga', verses: 20 },
    { chapter: 16, name: 'Daivasura-Sampad-Vibhaga Yoga', verses: 24 },
    { chapter: 17, name: 'Shraddhatraya-Vibhaga Yoga', verses: 28 },
    { chapter: 18, name: 'Moksha-Sanyasa Yoga', verses: 78 }
];

let currentChapterIndex = chapterData.findIndex(ch => ch.chapter === 1); // Start with Chapter 12

let chapterVerses = [];
let verseIndex = 1;  // starting from verse 1
const batchSize = 10;

function extractVerseContent(document) {
    let paragraphs = document.querySelectorAll('p');
    let extractedText = '';
    for (let i = 0; i < 3 && i < paragraphs.length; i++) {
        extractedText += paragraphs[i].innerText + '\n\n';
    }
    return extractedText.trim() || null;
}

function downloadToFile(content, filename, contentType) {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });

    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();

    URL.revokeObjectURL(a.href);
}

function applyHeader(chapter, verseNum) {
    return "*" + "Chapter " + chapter + "-" + "Verse " + verseNum + "*" + "\n\n";
}

function fetchSingleVerse(chapter, verseNum) {
    return fetch(baseUrl + chapter + '-' + verseNum)
        .then(response => response.text())
        .then(text => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            return applyHeader(chapter, verseNum) + extractVerseContent(doc);
        });
}

function fetchVerse(verseNum) {
    const currentChapter = chapterData[currentChapterIndex];
    if (verseNum > currentChapter.verses) {
        console.log(`Extraction complete for Chapter ${currentChapter.chapter}.`);
        downloadToFile(chapterVerses.join('\n\n'), `Chapter_${currentChapter.chapter}_Verses.txt`, 'text/plain');

        // Reset chapterVerses and move to next chapter
        chapterVerses = [];
        currentChapterIndex++;
        if (currentChapterIndex < chapterData.length) {
            setTimeout(() => fetchVerse(1), 3000); // Wait 3 seconds before starting next chapter
        }
        return;
    }

    const fetchPromises = [];

    // Prepare a batch of fetch promises, but not exceeding the lastVerse of current chapter
    for (let i = 0; i < batchSize && (verseNum + i) <= currentChapter.verses; i++) {
        fetchPromises.push(fetchSingleVerse(currentChapter.chapter, verseNum + i));
    }

    Promise.all(fetchPromises)
        .then(verseContents => {
            verseContents.forEach((content, index) => {
                if (content) {
                    chapterVerses.push(content);
                    console.log(`Chapter ${currentChapter.chapter}, Verse ${verseNum + index} extracted.`);
                }
            });

            // Continue fetching the next batch after a slight delay.
            setTimeout(() => {
                fetchVerse(verseNum + batchSize);
            }, 2000); // 2-second delay. Adjust as needed.
        })
        .catch(error => {
            console.error(`Failed to fetch verses for Chapter ${currentChapter.chapter} starting from ${verseNum}.`, error);
        });
}

fetchVerse(verseIndex);


