function drawMapThaiProvinces(containerId) {
    const width = 450;
    const height = 400;

    d3.select(`#${containerId}`).selectAll("*").remove();

    const svg = d3.select(`#${containerId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const projection = d3.geoMercator()
        .center([100, 13]) // Thailand's approximate center longitude, latitude
        .scale(3000)      // Adjust scale to fit Thailand well
        .translate([width / 2, height / 2]);

    const path = d3.geoPath()
        .projection(projection);

    // Sample data for provinces (replace with real data as needed)
    // Keys should match NAME_1 property in GeoJSON features
    const provinceData = {
        "Amnat Charoen": 50, "Ang Thong": 70, "Bueng Kan": 30, "Buriram": 85,
        "Chachoengsao": 60, "Chai Nat": 45, "Chaiyaphum": 75, "Chanthaburi": 55,
        "Chiang Mai": 90, "Chiang Rai": 88, "Chon Buri": 95, "Chumphon": 40,
        "Kalasin": 65, "Kamphaeng Phet": 35, "Kanchanaburi": 80, "Khon Kaen": 70,
        "Krabi": 80, "Lampang": 60, "Lamphun": 50, "Loei": 40, "Lop Buri": 70,
        "Mae Hong Son": 92, "Maha Sarakham": 55, "Mukdahan": 48, "Nakhon Nayok": 62,
        "Nakhon Pathom": 78, "Nakhon Phanom": 53, "Nakhon Ratchasima": 88, "Nakhon Sawan": 68,
        "Nakhon Si Thammarat": 73, "Nan": 58, "Narathiwat": 30, "Nong Bua Lamphu": 42,
        "Nong Khai": 47, "Nonthaburi": 99, "Pathum Thani": 97, "Pattani": 25,
        "Phang Nga": 70, "Phatthalung": 38, "Phayao": 52, "Phetchabun": 67,
        "Phetchaburi": 72, "Phichit": 43, "Phitsanulok": 82, "Phra Nakhon Si Ayutthaya": 77,
        "Phrae": 57, "Phuket": 98, "Prachin Buri": 63, "Prachuap Khiri Khan": 83,
        "Ranong": 32, "Ratchaburi": 76, "Rayong": 89, "Roi Et": 66,
        "Sa Kaeo": 59, "Sakon Nakhon": 51, "Samut Prakan": 96, "Samut Sakhon": 94,
        "Samut Songkhram": 84, "Sara Buri": 79, "Satun": 28, "Sing Buri": 46,
        "Sisaket": 69, "Songkhla": 74, "Sukhothai": 54, "Suphan Buri": 61,
        "Surat Thani": 71, "Surin": 86, "Tak": 81, "Trang": 33,
        "Trat": 64, "Ubon Ratchathani": 87, "Udon Thani": 70, "Uthai Thani": 49,
        "Uttaradit": 56, "Yala": 20, "Yasothon": 44
    };

    const colorScale = d3.scaleQuantize()
        .domain([d3.min(Object.values(provinceData)), d3.max(Object.values(provinceData))])
        .range(d3.schemeBlues[7]); // Use a 7-step blue color scheme

    d3.json("https://raw.githubusercontent.com/cvibhagool/thailand-map/master/thailand-provinces.geojson").then(function (geojson) {
        svg.selectAll("path")
            .data(geojson.features)
            .join("path")
            .attr("d", path)
            .attr("fill", d => {
                const provinceName = d.properties.NAME_1;
                return colorScale(provinceData[provinceName] || 0); // Default to 0 if data missing
            })
            .attr("stroke", "#fff")
            .attr("stroke-width", 0.5);
        
        // Add legend
        const legend = svg.append("g")
            .attr("transform", `translate(${width - 120}, 20)`); // Position of the legend

        const legendScale = d3.scaleLinear()
            .domain(colorScale.domain())
            .range([0, 100]); // Length of the legend bar

        legend.selectAll("rect")
            .data(colorScale.range().map(d => {
                d = colorScale.invertExtent(d);
                if (d[0] == null) d[0] = legendScale.domain()[0];
                if (d[1] == null) d[1] = legendScale.domain()[1];
                return d;
            }))
            .join("rect")
            .attr("x", 0)
            .attr("y", (d, i) => i * 15)
            .attr("width", 15)
            .attr("height", 15)
            .attr("fill", d => colorScale(d[0]));

        legend.selectAll("text")
            .data(colorScale.range().map(d => {
                d = colorScale.invertExtent(d);
                if (d[0] == null) d[0] = legendScale.domain()[0];
                if (d[1] == null) d[1] = legendScale.domain()[1];
                return d;
            }))
            .join("text")
            .attr("x", 20)
            .attr("y", (d, i) => i * 15 + 12)
            .text(d => `${Math.round(d[0])} - ${Math.round(d[1])}`)
            .style("font-size", "10px");

    }).catch(error => {
        console.error("Error loading GeoJSON data for Thailand provinces:", error);
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height / 2)
            .attr("text-anchor", "middle")
            .text("Error loading map data.");
    });
}
