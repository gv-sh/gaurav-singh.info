const fs = require('fs');

// Parse Right Ascension from HMS format to decimal hours
function parseRA(raStr) {
  const match = raStr.match(/(\d+)h\s*(\d+)m\s*([\d.]+)s/);
  if (!match) return 0;
  const hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const seconds = parseFloat(match[3]);
  return hours + minutes / 60 + seconds / 3600;
}

// Parse Declination from DMS format to decimal degrees
function parseDec(decStr) {
  const match = decStr.match(/([+-]?)(\d+)°\s*(\d+)′\s*([\d.]+)″/);
  if (!match) return 0;
  const sign = match[1] === '-' ? -1 : 1;
  const degrees = parseInt(match[2]);
  const minutes = parseInt(match[3]);
  const seconds = parseFloat(match[4]);
  return sign * (degrees + minutes / 60 + seconds / 3600);
}

// Convert celestial coordinates to 3D Cartesian
function celestialToCartesian(raHours, decDegrees, radius = 100) {
  const raRad = (raHours / 24) * 2 * Math.PI;
  const decRad = (decDegrees * Math.PI) / 180;

  const x = radius * Math.cos(decRad) * Math.cos(raRad);
  const y = radius * Math.sin(decRad);
  const z = radius * Math.cos(decRad) * Math.sin(raRad);

  return { x, y, z };
}

// Calculate Milky Way intensity boost
function calculateMilkyWayBoost(x, y, z) {
  // Galactic plane normal (approximate)
  const milkyWayNormal = { x: 0.4, y: 0.6, z: 0.7 };
  const len = Math.sqrt(milkyWayNormal.x ** 2 + milkyWayNormal.y ** 2 + milkyWayNormal.z ** 2);
  const normalizedNormal = {
    x: milkyWayNormal.x / len,
    y: milkyWayNormal.y / len,
    z: milkyWayNormal.z / len
  };

  // Normalize position vector
  const posLen = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  const normalizedPos = { x: x / posLen, y: y / posLen, z: z / posLen };

  // Dot product to find distance from galactic plane
  const dotProduct =
    normalizedPos.x * normalizedNormal.x +
    normalizedPos.y * normalizedNormal.y +
    normalizedPos.z * normalizedNormal.z;

  const distanceFromPlane = Math.abs(dotProduct);

  // Brightness boost (1.0 - 1.5x)
  return 1.0 + (1.0 - distanceFromPlane) * 0.5;
}

// Main processing function
function processStarCatalog(inputFile, outputFile, magnitudeLimit = 5.5) {
  console.log(`Reading ${inputFile}...`);
  const rawData = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));

  console.log(`Processing stars (magnitude < ${magnitudeLimit})...`);
  const processedStars = [];

  for (const star of rawData) {
    const mag = parseFloat(star.V);

    // Skip if no magnitude or too dim
    if (isNaN(mag) || mag >= magnitudeLimit) continue;

    // Parse coordinates
    const raHours = parseRA(star.RA);
    const decDegrees = parseDec(star.Dec);

    // Convert to Cartesian
    const { x, y, z } = celestialToCartesian(raHours, decDegrees);

    // Calculate Milky Way intensity
    const milkyWay = calculateMilkyWayBoost(x, y, z);

    // Round to 3 decimal places to reduce file size
    processedStars.push({
      id: parseInt(star.HR),
      x: Math.round(x * 1000) / 1000,
      y: Math.round(y * 1000) / 1000,
      z: Math.round(z * 1000) / 1000,
      mag: Math.round(mag * 100) / 100,
      milkyWay: Math.round(milkyWay * 1000) / 1000
    });
  }

  // Sort by magnitude (brightest first)
  processedStars.sort((a, b) => a.mag - b.mag);

  // Create output JSON
  const output = {
    metadata: {
      catalog: "Yale Bright Star Catalog (BSC5)",
      totalStars: processedStars.length,
      magnitudeRange: [
        processedStars[0].mag,
        processedStars[processedStars.length - 1].mag
      ],
      generated: new Date().toISOString().split('T')[0]
    },
    stars: processedStars
  };

  console.log(`Processed ${processedStars.length} stars`);
  console.log(`Magnitude range: ${output.metadata.magnitudeRange[0]} to ${output.metadata.magnitudeRange[1]}`);

  fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));
  console.log(`Saved to ${outputFile}`);

  // Also create compressed version (no pretty-print)
  const compactFile = outputFile.replace('.json', '-compact.json');
  fs.writeFileSync(compactFile, JSON.stringify(output));
  console.log(`Compact version saved to ${compactFile}`);
}

// Run the script
const inputFile = process.argv[2] || '/tmp/bsc5-short.json';
const outputFile = process.argv[3] || 'src/assets/data/stars.json';
const magnitudeLimit = parseFloat(process.argv[4]) || 5.5;

processStarCatalog(inputFile, outputFile, magnitudeLimit);
