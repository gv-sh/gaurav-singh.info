// Function to fetch commit data from GitHub API
async function fetchCommitData(username) {
    const cacheKey = `commit-data-${username}`;
    const cachedData = localStorage.getItem(cacheKey);
    
    if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        const oneDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds
        if (Date.now() - timestamp < oneDay) {
            return data;
        }
    }

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const fromDate = oneYearAgo.toISOString().split('T')[0];

    // Remove the hardcoded token for security reasons
    const token = ''; // You should use environment variables or a secure method to store tokens
    let allCommits = [];
    let page = 1;
    let hasMorePages = true;

    while (hasMorePages) {
        try {
            // Use unauthenticated request if token is not available
            const headers = token ? {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.cloak-preview'
            } : {
                'Accept': 'application/vnd.github.cloak-preview'
            };

            const response = await fetch(`https://api.github.com/search/commits?q=author:${username}+committer-date:>${fromDate}&sort=committer-date&order=desc&per_page=100&page=${page}`, {
                headers: headers
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.items && data.items.length > 0) {
                allCommits = allCommits.concat(data.items);
                page++;
            } else {
                hasMorePages = false;
            }

            // Check if we've reached the rate limit or if there are no more pages
            if (data.incomplete_results || data.items.length < 100) {
                hasMorePages = false;
            }
        } catch (error) {
            console.error('Error fetching commit data:', error);
            hasMorePages = false;
        }
    }

    // Cache the fetched data
    localStorage.setItem(cacheKey, JSON.stringify({
        data: allCommits,
        timestamp: Date.now()
    }));

    return allCommits;
}

// Function to create the commit matrix using D3
function createCommitMatrix(commitData) {
    const width = 800;
    const height = 150;
    const cellSize = 10;
    const cellGap = 2;

    const svg = d3.select('#github-commit-matrix')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    const container = svg.append('g')
        .attr('transform', 'translate(30, 20)');

    const today = new Date();
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate() + 1);

    const commitMap = d3.rollup(commitData,
        v => v.length,
        d => d3.timeDay.floor(new Date(d.commit.committer.date))
    );

    const colorScale = d3.scaleQuantize()
        .domain([0, d3.max(commitMap.values())])
        .range(['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']);

    container.selectAll('rect')
        .data(d3.timeDays(oneYearAgo, today))
        .enter().append('rect')
        .attr('width', cellSize - cellGap)
        .attr('height', cellSize - cellGap)
        .attr('x', d => d3.timeWeek.count(oneYearAgo, d) * cellSize)
        .attr('y', d => d.getDay() * cellSize)
        .attr('fill', d => colorScale(commitMap.get(d) || 0))
        .append('title')
        .text(d => `${d.toDateString()}: ${commitMap.get(d) || 0} contributions`);

    // Add month labels
    const months = d3.timeMonths(oneYearAgo, today);
    container.selectAll('.month')
        .data(months)
        .enter().append('text')
        .attr('class', 'month')
        .attr('x', d => d3.timeWeek.count(oneYearAgo, d) * cellSize)
        .attr('y', -5)
        .attr('font-size', '8px')
        .text(d => d3.timeFormat('%b')(d));

    // Add day labels
    const dayLabels = ['Mon', 'Wed', 'Fri'];
    container.selectAll('.day')
        .data(dayLabels)
        .enter().append('text')
        .attr('class', 'day')
        .attr('x', -25)
        .attr('y', (d, i) => (i * 2 + 1) * cellSize)
        .attr('font-size', '10px')
        .attr('text-anchor', 'end')
        .text(d => d);

    // Add contribution summary
    const totalContributions = d3.sum(commitMap.values());
    svg.append('text')
        .attr('x', 30)
        .attr('y', 15)
        .attr('font-size', '14px')
        .text(`${totalContributions} contributions in the last year`);
}

// Main function to render the commit matrix
async function renderCommitMatrix() {
    const username = 'gv-sh'; // Replace with your GitHub username
    const container = document.getElementById('github-commit-matrix');
    if (!container) {
        console.error('Container element not found');
        return;
    }

    container.innerHTML = 'Loading...';

    try {
        const commitData = await fetchCommitData(username);
        container.innerHTML = '';
        createCommitMatrix(commitData);
    } catch (error) {
        console.error('Error rendering commit matrix:', error);
        container.innerHTML = 'Error loading commit data';
    }
}

// Call the render function when the page loads
window.addEventListener('load', renderCommitMatrix);