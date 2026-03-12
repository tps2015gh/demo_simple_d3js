function drawPie(containerId) {
    const data = [
        { name: "A", value: 30 },
        { name: "B", value: 80 },
        { name: "C", value: 45 },
        { name: "D", value: 60 },
        { name: "E", value: 20 }
    ];

    const width = 450,
        height = 450,
        margin = 40;

    const radius = Math.min(width, height) / 2 - margin;

    d3.select(`#${containerId}`).selectAll("*").remove();

    const svg = d3.select(`#${containerId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.name))
        .range(d3.schemeCategory10);

    const pie = d3.pie()
        .value(d => d.value);

    const data_ready = pie(data);

    const arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    svg.selectAll('mySlices')
        .data(data_ready)
        .join('path')
        .attr('d', arcGenerator)
        .attr('fill', d => color(d.data.name))
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 0.7);

    svg.selectAll('mySlices')
        .data(data_ready)
        .join('text')
        .text(d => d.data.name + " (" + d.data.value + ")")
        .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
        .style("text-anchor", "middle")
        .style("font-size", 17);
}
