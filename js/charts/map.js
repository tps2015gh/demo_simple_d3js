function drawMap(containerId) {
    const width = 450,
        height = 400;

    d3.select(`#${containerId}`).selectAll("*").remove();

    const svg = d3.select(`#${containerId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const projection = d3.geoMercator()
        .scale(70)
        .center([0, 20])
        .translate([width / 2, height / 2]);

    const path = d3.geoPath()
        .projection(projection);

    // Load external data and boot
    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function (data) {
        svg.append("g")
            .selectAll("path")
            .data(data.features)
            .join("path")
            .attr("fill", "#69b3a2")
            .attr("d", path)
            .style("stroke", "#fff")
            .style("stroke-width", 0.5);
    });
}
