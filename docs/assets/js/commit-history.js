import process from 'process';

const repos = ['gv-sh/gaurav-singh.info']; // Add all your repos here
const commitList = document.getElementById('commit-history');
const token = process.env.GH_TOKEN;
const cacheKey = 'commitHistoryCache';
const cacheExpiration = 30 * 60 * 1000; // 30 minutes in milliseconds

// Function to check if cache is valid
function isCacheValid(cachedData) {
  return cachedData && (Date.now() - cachedData.timestamp < cacheExpiration);
}

// Function to fetch and cache commits
async function fetchAndCacheCommits() {
  try {
    const allCommits = await Promise.all(repos.map(repo =>
      fetch(`https://api.github.com/repos/${repo}/commits`, {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => data.slice(0, 10))
    ));

    const cacheData = {
      commits: allCommits.flat(),
      timestamp: Date.now()
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    return cacheData.commits;
  } catch (error) {
    console.error('Error fetching commits:', error);
    throw error;
  }
}

// Main function to get commits
async function getCommits() {
  commitList.innerHTML = '<li>Loading...</li>';

  try {
    let commits;
    const cachedData = JSON.parse(localStorage.getItem(cacheKey));

    if (isCacheValid(cachedData)) {
      commits = cachedData.commits;
    } else {
      commits = await fetchAndCacheCommits();
    }

    if (!commits || commits.length === 0) {
      throw new Error('No commits found');
    }

    commitList.innerHTML = '';
    commits.forEach(commit => {
      if (!commit || !commit.commit || !commit.commit.author) {
        throw new Error('Invalid commit data');
      }
      const listItem = document.createElement('li');
      const repoLink = document.createElement('a');
      repoLink.href = `https://github.com/${repos[0]}`;
      repoLink.textContent = repos[0];
      repoLink.target = '_blank';
      const timestamp = new Date(commit.commit.author.date).toLocaleString();
      listItem.appendChild(repoLink);
      listItem.appendChild(document.createTextNode(` - ${commit.commit.message}; pushed on ${timestamp}`));
      commitList.appendChild(listItem);
    });
  } catch (error) {
    commitList.innerHTML = `<li>Error loading commits: ${error.message}</li>`;
    console.error('Error:', error);
  }
}

// Call the main function
getCommits();