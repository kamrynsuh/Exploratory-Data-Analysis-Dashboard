function load_scatterplot(svg_name, data1){

    // General Variables
    let chart = d3.select(svg_name);
    let chart_width  = $(svg_name).width();
    let chart_height = $(svg_name).height();

    // x position scale
	let x = d3.scaleLinear()
        .domain([4, 8])
		.range([70 , chart_width - 160]);

	// y position scale
	let y = d3.scaleLinear()
        .domain([0, 7.5])
		.range([chart_height - 50, 70]);

    // x axis position
    xAxis = d3.axisBottom()
        .scale(x);
    var xAxisGroup = chart.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (chart_height - 45) + ")")
        .call(xAxis);  
    
    // y axis position
    yAxis = d3.axisLeft()
        .scale(y);
    var yAxisGroup = chart.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(60,0)")
        .call(yAxis);

    chart.append("text")
        .attr("class", "y label")
        .text("Sepal Length (in cm)")
        .attr("transform", "rotate(-90)")
        .attr("x", -200)
        .attr("y", 30)
        .style("font-size", "12px")
        .attr("font-weight", function(d, i) { return i * 500 + 500;})
        .style("text-anchor", "end")
        .style("fill", "#000000"); 

    chart.append("text")
        .attr("class", "y label")
        .text("Sepal Length vs Petal Length in 3 Iris Classes")
        .attr("x", 570)
        .attr("y", 30)
        .style("text-anchor", "end")
        .attr("font-weight", function(d, i) { return i * 500 + 500;})
        .style("text-decoration", "underline")
        .style("fill", "#000000");  

    chart.append("text")
        .attr("class", "x axis")
        .text("Petal Length (in cm)")
        .attr("x", 420)
        .attr("y", 485)
        .style("font-size", "12px")
        .attr("font-weight", function(d, i) { return i * 500 + 500;})
        .style("text-anchor", "middle")
        .style("fill", "#000000"); 
    
    // legend, reference: https://www.d3-graph-gallery.com/graph/custom_legend.html
    let color = d3.scaleOrdinal()
        .domain(["Iris-setosa", "Iris-versicolor", "Iris-virginica"])
        .range(["#ffa600", "#ff6361", "#bc5090"]);

    let countries = ["Iris-setosa", "Iris-versicolor", "Iris-virginica"]
    

    chart.selectAll("mydots")
        .data(countries)
        .enter()
        .append("circle")
        .attr("cx", 780)
        .attr("cy", function(d, i) { return 50 + i * 25})
        .attr("r", 7)
        .style("fill", function(d) { return color(d)})

    chart.selectAll("mylabels")
        .data(countries)
        .enter()
        .append("text")
        .attr("x", 800)
        .attr("y", function(d, i) { return 50 + i * 25})
        .style("fill", function(d) { return color(d)})
        .text(function(d) { return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")

    // chart for setosa
    var div = d3.select("body").append("div")
     .attr("class", "toolsip")
     .style("opacity", 0);

    var tooltip = d3.select("body").append("div").attr("class", "toolsip");
    let points = chart.selectAll("circle")
          .data(data1).enter()
            .append("circle")
            .attr("r", 4)
            .attr("fill-opacity", 0.85)
            .style("fill", function (d) { return color(d.class) })
            .attr("cx", function (d) { return x(d.sepalLength); } )
            .attr("cy", function (d) { return y(d.petalLength); } )  
            .on("mouseover", function(d) {
                d3.select(this)
                    .transition().duration(100)
                    .attr("fill", "#4a1535");
                tooltip
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 15) + "px")
                    .style("display", "inline-block")
                    .html("<b>Petal length: </b>" + d3.format(".2f")(d.sepalLength) + "<br/>" + "<b>Sepal length: </b>" + d3.format(".2f")(d.petalLength));
            })
            .on("mouseout", function(d, i) {
                d3.selectAll("rect")
                    .transition().duration(50).delay(100);
                tooltip.style("display", "none");    
                d3.select(this).attr("fill", function() {
                    return "" + color(d.class) + "";
                });
            })
   
	// return chart
	return {
		chart : chart,
		chart_width : chart_width,
		chart_height : chart_height,
		x_scale : x,
		y_scale : y,
		points : points
	}
}