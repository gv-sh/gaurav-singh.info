function createTimeline(data, container) {
  const margin = {top: 40, right: 20, bottom: 40, left: 20};
  const containerWidth = d3.select(container).node().getBoundingClientRect().width;
  const width = containerWidth - margin.left - margin.right;
  const height = 150 - margin.top - margin.bottom;

  // Clear any existing SVG
  d3.select(container).selectAll("svg").remove();

  const svg = d3.select(container)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleTime()
    .domain(d3.extent(data, d => d.date))
    .range([0, width]);

  const y = d3.scaleLinear()
    .domain([0, 1])
    .range([height, 0]);

  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).ticks(3).tickFormat(d3.timeFormat("%Y")));

  const tooltip = d3.select(container)
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  const eventGroups = svg.selectAll(".event-group")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "event-group")
    .attr("transform", d => `translate(${x(d.date)},${height/2})`);

  eventGroups.append("circle")
    .attr("r", 5)
    .attr("fill", "steelblue");

  eventGroups.append("text")
    .attr("class", "event-text")
    .attr("y", -15)
    .attr("text-anchor", "middle")
    .text(d => d3.timeFormat("%Y")(d.date))
    .style("font-size", "12px");

  eventGroups
    .on("mouseover", function(event, d) {
      tooltip.transition()
        .duration(200)
        .style("opacity", .9);
      tooltip.html(d.event)
        .style("left", (event.pageX) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
      tooltip.transition()
        .duration(500)
        .style("opacity", 0);
    });

  // Add resize listener
  window.addEventListener('resize', () => createTimeline(data, container));
}

// Function to wrap text
function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy") || 0),
        tspan = text.text(null).append("tspan").attr("x", function() { return text.attr("x"); }).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", function() { return text.attr("x"); }).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}

// Example usage remains the same