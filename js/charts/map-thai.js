function drawMapThai(containerId) {
    const width = 450;
    const height = 400;

    d3.select(`#${containerId}`).selectAll("*").remove();

    const svg = d3.select(`#${containerId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Mercator projection for Thailand
    // Adjusted scale and center for better fit
    const projection = d3.geoMercator()
        .center([100, 13]) // Thailand's approximate center longitude, latitude
        .scale(3000)      // Adjust scale to fit Thailand well
        .translate([width / 2, height / 2]);

    const path = d3.geoPath()
        .projection(projection);

    // Load Thailand GeoJSON data (national level or combined provinces for outline)
    // Using the same provinces GeoJSON and just drawing all features
    d3.json("https://raw.githubusercontent.com/cvibhagool/thailand-map/master/thailand-provinces.geojson").then(function (geojson) {
        svg.selectAll("path")
            .data(geojson.features)
            .join("path")
            .attr("d", path)
            .attr("fill", "#69b3a2") // A single color for the whole country
            .attr("stroke", "#fff")
            .attr("stroke-width", 0.5);
    }).catch(error => {
        console.error("Error loading GeoJSON data for Thailand:", error);
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height / 2)
            .attr("text-anchor", "middle")
            .text("Error loading map data.");
    });
}
