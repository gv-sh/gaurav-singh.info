---
layout: base.njk
title: Map
description: Places I've visited
keywords: Gaurav Singh, personal website, map, Griffith University, Gold Coast, Australia, India, Bangalore, Srishti Manipal, Manipal, HCI, ML, AI, data visualisation, machine learning, human-computer interaction, design, embodied self-monitoring, motorbike commuting, bike area network, modular platform, personal informatics, cloud-based platform, interactive prototype, situated memory, self-efficacy, well-being, senior citizens, digital technology, real-time data visualization, posture tracking, in-situ evaluation, user experience design, community engagement, ethical technology, interdisciplinary studies, technology innovation, educational technology, algorithmic design, interactive media, Gold Coast, Tasmania, Hobart, Launceston, Cradle Mountain, Tamborine National Park, Lamington National Park, Springbrook National Park
sidebar: true
permalink: /map/
---

### Places I've visited

<div id="world-map"></div>

<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="https://d3js.org/topojson.v3.min.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    const parentWidth = document.getElementById('world-map').offsetWidth;
    const width = Math.max(parentWidth * 0.8, parentWidth);
    const height = width;

    const projection = d3.geoOrthographic()
      .scale(height / 2.1)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    const svg = d3.select("#world-map")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Create a group for the globe
    const globe = svg.append("g");

    // Add a circle for the globe background
    globe.append("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", projection.scale())
      .attr("fill", "#ffffff")
      .attr("stroke", "#000");

    let rotateX = 0;
    let rotateY = 0;
    let dragging = false;

    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json").then(function(world) {
      // Draw the land masses
      globe.append("g")
        .selectAll("path")
        .data(topojson.feature(world, world.objects.land).features)
        .enter().append("path")
        .attr("d", path)
        .attr("fill", "#cccccc");

      // Define the locations you've visited
      const visitedLocations = [
        { name: "Delhi", coordinates: [77.2, 28.6] },
        { name: "Mumbai", coordinates: [72.8, 19.1] },
        { name: "Bangalore", coordinates: [77.6, 12.9] },
        { name: "Hyderabad", coordinates: [78.5, 17.4] },
        { name: "Pune", coordinates: [73.8, 18.5] },
        { name: "Kolkata", coordinates: [88.0, 22.5] },
        { name: "Chennai", coordinates: [80.3, 13.1] },
        { name: "Bhopal", coordinates: [77.4, 23.2] },
        { name: "Tezpur", coordinates: [92.8, 26.3] },
        { name: "Coimbatore", coordinates: [76.9, 11.0] },
        { name: "Nashik", coordinates: [73.8, 20.0] },
        { name: "Utarlai", coordinates: [75.6, 26.5] },
        { name: "Lucknow", coordinates: [80.9, 26.8] },
        { name: "Kanpur", coordinates: [80.3, 26.4] },
        { name: "Gandhinagar", coordinates: [72.1, 23.2] },
        { name: "Munabao", coordinates: [72.1, 23.2] },
        { name: "Jaisalmer", coordinates: [70.9, 26.8] },
        { name: "Jodhpur", coordinates: [73.0, 26.3] },
        { name: "Sakleshpur", coordinates: [75.7, 12.9] },
        { name: "Vijayawada", coordinates: [80.6, 16.5] },
        { name: "Sydney", coordinates: [151.2, -33.9] },
        { name: "Melbourne", coordinates: [144.9, -37.8] },
        { name: "Brisbane", coordinates: [153.0, -27.5] },
        { name: "Gold Coast", coordinates: [153.4, -28.0] },
        { name: "Hobart", coordinates: [147.3, -42.9] },
        { name: "Launceston", coordinates: [147.1, -41.4] },
        { name: "Port Arthur", coordinates: [147.5, -42.9] },
        { name: "Cradle Mountain", coordinates: [146.6, -41.4] },
        { name: "Bruny Island", coordinates: [147.3, -42.9] },
        { name: "Lamington National Park", coordinates: [152.9, -28.1] },
        { name: "Tamborine National Park", coordinates: [152.9, -28.1] },
        { name: "Springbrook National Park", coordinates: [153.1, -28.1] },
        { name: "Tasman Peninsula", coordinates: [147.3, -42.9] }
      ];

      // Add pins for visited locations
      globe.selectAll("circle.location")
        .data(visitedLocations)
        .enter()
        .append("circle")
        .attr("class", "location")
        .attr("cx", d => projection(d.coordinates)[0])
        .attr("cy", d => projection(d.coordinates)[1])
        .attr("r", 2)
        .attr("fill", "red");

      function updateGlobe() {
        projection.rotate([rotateX, rotateY]);
        globe.selectAll("path").attr("d", path);
        globe.selectAll("circle.location")
          .attr("cx", d => projection(d.coordinates)[0])
          .attr("cy", d => projection(d.coordinates)[1])
          .attr("visibility", d => {
            const [x, y] = projection(d.coordinates);
            return x && y && x > 0 && y > 0 && x < width && y < height && d3.geoDistance([-rotateX, -rotateY], d.coordinates) < Math.PI / 2 ? "visible" : "hidden";
          });
      }

      svg.call(d3.drag()
        .on("start", function() {
          dragging = true;
        })
        .on("drag", function(event) {
          if (dragging) {
            const rotate = projection.rotate();
            rotateX = rotate[0] + event.dx * 0.5;
            rotateY = rotate[1] - event.dy * 0.5;
            rotateY = rotateY > 90 ? 90 : rotateY < -90 ? -90 : rotateY;
            updateGlobe();
          }
        })
        .on("end", function() {
          dragging = false;
        })
      );

      updateGlobe();
    });
  });
</script>