// Function to fetch and process Markdown files
async function fetchMarkdownFiles() {
    // Fetch content from all HTML files
    const response = await fetch('/');
    if (!response.ok) {
        console.error('Failed to fetch HTML content:', response.statusText);
        return '';
    }
    const files = await response.json();
    let allText = '';

    for (const file of files) {
        const fileResponse = await fetch(file);
        const text = await fileResponse.text();
        allText += text + ' ';
    }

    return allText;
}

// Function to process text and create word frequency map
function processText(text) {
    const words = text.toLowerCase().match(/\b\w+\b/g);
    const wordFreq = {};
    words.forEach(word => {
        if (word.length > 3) {  // Ignore short words
            wordFreq[word] = (wordFreq[word] || 0) + 1;
        }
    });
    return wordFreq;
}

// Function to create and render the word cloud
function renderWordCloud(words) {
    const width = 800;
    const height = 400;

    const layout = d3.layout.cloud()
        .size([width, height])
        .words(words.map(d => ({ text: d[0], size: 10 + d[1] * 5 })))
        .padding(5)
        .rotate(() => ~~(Math.random() * 2) * 90)
        .font("Impact")
        .fontSize(d => d.size)
        .on("end", draw);

    layout.start();

    function draw(words) {
        d3.select("#wordcloud").append("svg")
            .attr("width", layout.size()[0])
            .attr("height", layout.size()[1])
            .append("g")
            .attr("transform", `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`)
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", d => `${d.size}px`)
            .style("font-family", "Impact")
            .style("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
            .attr("text-anchor", "middle")
            .attr("transform", d => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
            .text(d => d.text);
    }
}

// Main function to orchestrate the word cloud creation
async function createWordCloud() {
    const text = await fetchMarkdownFiles();
    const wordFreq = processText(text);
    const words = Object.entries(wordFreq).sort((a, b) => b[1] - a[1]).slice(0, 100);
    renderWordCloud(words);
}

// Call the main function when the DOM is loaded
document.addEventListener('DOMContentLoaded', createWordCloud);
