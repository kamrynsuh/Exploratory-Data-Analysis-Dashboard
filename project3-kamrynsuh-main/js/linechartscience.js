function load_linechart(svg_name, data1, data2, data3, data4, data5){
    // Global variable
    // General Variables
    let chart = d3.select(svg_name);
    let chart_width  = $(svg_name).width();
    let chart_height = $(svg_name).height();

    // x position scale for time
	let x = d3.scaleLinear()
        //.domain[(0, 2020)]
        .domain([1989, 2016])
    	//.domain(d3.extent(data1, function(d) { return d.year1; }))
		.range([70, chart_width - 160]);

    // domain for y scale
    let peruExtent = d3.extent(data2,function(d){ return d.exports1; })
    let peruBottom = d3.min(peruExtent)
    let brazilExtent = d3.extent(data1,function(d){ return d.exports1; })
    let brazilTop = d3.max(brazilExtent)

	// y position scale for country
	let y = d3.scaleLinear()
		//.domain(d3.extent(data1,function(d){ return d.exports1; }))
        .domain([1, 19])
        //.domain([peruBottom, brazilTop])
		.range([chart_height - 52, 70]);

    // x position axis
    xAxis = d3.axisBottom()
        .scale(x)
        .tickFormat(d3.format("d"));
    var xAxisGroup = chart.append("g")
        .attr("class","axis")
        .attr("transform","translate(0," + ( chart_height - 45 ) + ")")
        .call(xAxis);  
    
    // y position axis
    yAxis = d3.axisLeft()
        .scale(y);
    var yAxisGroup = chart.append("g")
        .attr("class","axis")
        .attr("transform","translate(60,0)")
        .call(yAxis);

    // legend, reference: https://www.d3-graph-gallery.com/graph/custom_legend.html
    let color = d3.scaleOrdinal(["#ffa600", "#ff6361", "#bc5090", "#58508d", "#003f5c"]);

    let countries = ["Brazil", "Peru", "Chile", "Argentina", "Uruguay"]
    
    chart.selectAll("mydots")
        .data(countries)
        .enter()
        .append("circle")
        .attr("cx", 790)
        .attr("cy", function(d, i) { return 50 + i * 25}) 
        .attr("r", 7)
        .style("fill", function(d) { return color(d)})

    chart.selectAll("mylabels")
        .data(countries)
        .enter()
        .append("text")
        .attr("x", 810)
        .attr("y", function(d , i) { return 50 + i * 25}) 
        .style("fill", function(d) { return color(d)})
        .text(function(d) { return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")

    chart.append("text")
        .attr("class", "y label")
        .text("High-technology exports (% of manufactured exports)")
        .attr("transform", "rotate(-90)")
        .attr("x", -120)
        .attr("y", 30)
        .style("font-size", "12px")
        .attr("font-weight",function(d, i) {return i * 500 + 500;})
        .style("text-anchor", "end")
        .style("fill","#000000"); 

    chart.append("text")
        .attr("class", "y label")
        .text("High-technology exports (% of manufactured exports) trends by Year")
        .attr("x", 650)
        .attr("y", 30)
        .style("text-anchor", "end")
        .style("text-decoration", "underline")
        .attr("font-weight",function(d, i) {return i * 500 + 500;})
        .style("fill","#000000");  

    chart.append("text")
        .attr("class", "x axis")
        .text("Year")
        .attr("x", 435)
        .attr("y", 485)
        .style("font-size", "12px")
        .attr("font-weight",function(d, i) {return i * 500 + 500;})
        .style("text-anchor", "middle")
        .style("fill","#000000"); 
    
    // brazil line
    chart.append("path")
        .datum(data1)
        .attr("fill", "none")
        .attr("stroke", "#ffa600")
        .attr("stroke-width", 2)
        .attr("d", d3.line()
        .x(function(data) { return x(data.year1) })
        .y(function(data) { return y(data.exports1) })
    )

    // peru line
    chart.append("path")
        .datum(data2)
        .attr("fill", "none")
        .attr("stroke", "#ff6361")
        .attr("stroke-width", 2)
        .attr("d", d3.line()
        .x(function(data) { return x(data.year1) })
        .y(function(data) { return y(data.exports1) })
    )

    // chile line
    chart.append("path")
        .datum(data3)
        .attr("fill", "none")
        .attr("stroke", "#bc5090")
        .attr("stroke-width", 2)
        .attr("d", d3.line()
        .x(function(data) { return x(data.year1) })
        .y(function(data) { return y(data.exports1) })
    )

    // argentina line
    chart.append("path")
        .datum(data4)
        .attr("fill", "none")
        .attr("stroke", "#58508d")
        .attr("stroke-width", 2)
        .attr("d", d3.line()
        .x(function(d) { return x(d.year1) })
        .y(function(d) { return y(d.exports1) })
    )

    // uruguay line
    chart.append("path")
        .datum(data5)
        .attr("fill", "none")
        .attr("stroke", "#003f5c")
        .attr("stroke-width", 2)
        .attr("d", d3.line()
        .x(function(d) { return x(d.year1) })
        .y(function(d) { return y(d.exports1) })
    )  
        
	// return chart
	return {
		chart : chart,
		chart_width : chart_width,
		chart_height : chart_height,
		x_scale : x,
		y_scale : y,
		//points : points
	}
}