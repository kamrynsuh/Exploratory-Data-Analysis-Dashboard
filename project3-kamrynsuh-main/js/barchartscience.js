function load_barchart(svg_name, data){

    // General Variables
    let chart = d3.select(svg_name);
    let chart_width  = $(svg_name).width();
    let chart_height = $(svg_name).height();

    // x position scale
	let x = d3.scaleBand()
        .domain(data.map(function(d) { return d.name; }))
        .padding(0.4)
		.range([70, chart_width - 130]);
    
	// y position scale
	let y = d3.scaleLinear()
        .domain([0, 15])
		.range([chart_height - 50, 70]);

    // x axis scale
    xAxis = d3.axisBottom()
        .scale(x);
    var xAxisGroup = chart.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (chart_height - 45) + ")")
        .call(xAxis);  
    
    // y axis scale
    yAxis = d3.axisLeft()
        .scale(y);
    var yAxisGroup = chart.append("g")
        .attr("class", "axis")
        .attr("transform","translate(60,0)")
        .call(yAxis);

    chart.append("text")
        .attr("class", "y label")
        .text("High-technology exports (% of manufactured exports)")
        .attr("transform", "rotate(-90)")
        .attr("x", -120)
        .attr("y", 25)
        .style("font-size", "12px")
        .attr("font-weight", function(d, i) {return i * 500 + 500;})
        .style("text-anchor", "end")
        .style("fill","#000000"); 

    chart.append("text")
        .attr("class", "y label")
        .text("High-technology exports (% of manufactured exports) by Countries (in year 2015)")
        .attr("x", 670)
        .attr("y", 30)
        .style("text-anchor", "end")
        .attr("font-weight", function(d, i) {return i * 500 + 500;})
        .style("text-decoration", "underline")
        .style("fill","#000000");  

    chart.append("text")
        .attr("class", "x axis")
        .text("Countries")
        .attr("x", 410)
        .attr("y", 485)
        .style("font-size", "12px")
        .attr("font-weight", function(d, i) {return i * 500 + 500;})
        .style("text-anchor", "middle")
        .style("fill","#000000"); 

    // legend, reference: https://www.d3-graph-gallery.com/graph/custom_legend.html
    let countries = ["Brazil", "Peru", "Chile", "Argentina", "Uruguay"]
    let color = d3.scaleOrdinal()
        .domain(["Brazil", "Peru", "Chile", "Argentina", "Uruguay"])
        .range(["#ffa600", "#ff6361", "#bc5090", "#58508d", "#003f5c"]);

        var highlight = function(data) {
    
            d3.selectAll("rect")
                .transition().duration(200)
                .style("stroke", "lightgrey")
                .style("opacity", "0.2")
            d3.select(this)
                .transition().duration(200)
                .style("fill", "black")
                .style("opacity", "1")
        }
    
        var unhighlight = function(d){
            d3.selectAll("rect")
                .transition().duration(200).delay(1000)
                .style("fill", function(d) { return (color(d.name))} )
                .style("opacity", "1")
        }
    
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
        .attr("y", function(d, i) { return 50 + i * 25})
        .style("fill", function(d) { return color(d)})
        .text(function(d) { return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")

    var tooltip = d3.select("body").append("div").attr("class", "toolwip");

    var highlighting = function(d) {
            d3.selectAll("rect")
                .transition().duration(200)
                .style("fill", "#d481a8")
                .style("opacity", "0.4")
            d3.select(this)
                .transition().duration(200)
                .style("fill", "#4a1535")
                .style("opacity", "1")
                tooltip
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 15) + "px")
                    .style("display", "inline-block")
                    .html("<b>Country: </b>" + (d.name) + "<br>" + "<b>Exports: </b>" + d3.format(".2f")(d.journal));
        }
    var nothighlighting = function(data) {
            d3.selectAll("rect")
                .transition().duration(200).delay(200)
                .style("fill", function(data) { return (color(data.name))})
                .style("opacity", "1")
                tooltip.style("display", "none"); 
    }   
    
	// generate bar graph
	let barGraph = chart.selectAll("bar")
		.data(data).enter()
		.append("rect")
		.attr("x", function(data) { return x(data.name); })
		.attr("y", function(data) { return y(data.journal); })
        .attr("height", function(data) { return 451 - y(data.journal); })
        .attr("width", x.bandwidth())
        .attr("fill", function(d, i) {
            return color(d.name);
        })
        .on("mouseover", highlighting)
        .on("mouseleave", nothighlighting)

	// return chart
	return {
		chart : chart,
		chart_width : chart_width,
		chart_height : chart_height,
		x_scale : x,
		y_scale : y,
		barGraph : barGraph
	}
}