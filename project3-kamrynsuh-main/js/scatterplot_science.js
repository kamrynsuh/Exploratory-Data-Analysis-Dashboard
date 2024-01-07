function load_scatterplot(svg_name, data){
    // reference: https://uwdata.github.io/d3-tutorials/live/viewer.html
    // reference: https://medium.com/@kj_schmidt/hover-effects-for-your-scatter-plot-447df80ea116

    // General Variables
    let chart = d3.select(svg_name);
    let chart_width  = $(svg_name).width();
    let chart_height = $(svg_name).height();
    // x position scale
	  let x = d3.scaleLinear()
        .domain([1000, 2100])
		    .range([70, chart_width - 100]);

	// y position scale
	  let y = d3.scaleLinear()
        .domain([0,10])
		    .range([chart_height - 52, 70]);

    // r scale
    let r = d3.scaleLinear()
        .domain([0,d3.max(data,function(d){ return d.exports; })])
        .range([5,10]);

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
        .attr("transform", "translate(60, 0)")
        .call(yAxis);

    chart.append("text")
        .attr("class", "y label")
        .text("High-technology exports (% of manufactured exports)")
        .attr("transform", "rotate(-90)")
        .attr("x", -110)
        .attr("y", 30)
        .style("font-size", "12px")
        .attr("font-weight", function(d, i) { return i * 500 + 500;})
        .style("text-anchor", "end")
        .style("fill", "#000000"); 

    chart.append("text")
        .attr("class", "y label")
        .text("Researchers in R&D (per million people) vs High-tech exports (% of manufactured exports) in Bulgaria")
        .attr("x", 770)
        .attr("y", 30)
        .style("text-anchor", "end")
        .attr("font-weight", function(d, i) { return i * 500 + 500;})
        .style("text-decoration", "underline")
        .style("fill", "#000000");  

    chart.append("text")
        .attr("class", "x axis")
        .text("Researchers in R&D (per million people)")
        .attr("x", 420)
        .attr("y", 485)
        .style("font-size", "12px")
        .attr("font-weight", function(d, i) { return i * 500 + 500;})
        .style("text-anchor", "middle")
        .style("fill", "#000000"); 


  var div = d3.select("body").append("div")
     .attr("class", "tooltip")
     .style("opacity", 0);
    let points = chart.selectAll("circle")
    .data(data).enter()
    .append("circle")
    .attr("fill-opacity", 0.85)
    .attr("r", 5)
    .attr("stroke-width", "0px")
    .attr("cx",function(d) { return x(d.research); })
    .attr("cy",function(d) { return y(d.exports); })
    .style("fill", "#bc5090")
    .on('mouseover', function (d, i) {
      d3.select(this).transition()
          .duration('100')
          .style("fill", "#58508d")
          .attr("r", 7);
      div.transition()
          .duration(100)
          .style("opacity", 1);
      let html = "<b>Researchers: </b>" + d3.format(".2f")(d.research) + "<br/>" + "<b>Exports: </b>" + d3.format(".2f")(d.exports);
      div.html(html)
      .style("left", (d3.event.pageX + 10) + "px")
      .style("top", (d3.event.pageY - 15) + "px");
    })
    .on('mouseout', function (d, i) {
          d3.select(this).transition()
            .duration('200')
            .style("fill", "#bc5090")
            .attr("r", 5);
          div.transition()
            .duration('200')
            .style("opacity", 0);
    });

  
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