function load_piechart(svg_name, data) {

    // General Variables
    let chart = d3.select(svg_name);
    let chart_width  = $(svg_name).width();
    let chart_height = $(svg_name).height();
    let radius = Math.min(chart_width, chart_height) / 2 - 40;

    let g = chart.append("g")
        .attr("transform", "translate(" + chart_width / 2 + "," + chart_height / 2 + ")");

    let colorScale = d3.scaleOrdinal()
        .domain(data)
        .range(['#ffa600', '#ff6361', '#bc5090']);
        
    // legend, reference: https://www.d3-graph-gallery.com/graph/custom_legend.html
    let color = d3.scaleOrdinal(["#ffa600", "#ff6361", "#bc5090"]);
    let countries = ["Iris-virginica", "Iris-setosa", "Iris-versicolor", ]
    
    chart.selectAll("mydots")
        .data(countries)
        .enter()
        .append("circle")
        .attr("cx", 750)
        .attr("cy", function(d, i) { return 50 + i * 25})
        .attr("r", 7)
        .style("fill", function(d) { return color(d)})

    chart.selectAll("mylabels")
        .data(countries)
        .enter()
        .append("text")
        .attr("x", 770)
        .attr("y", function(d, i) { return 50 + i * 25})
        .style("fill", function(d) { return color(d)})
        .text(function(d) { return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
    
    chart.append("text")
        .attr("class", "y label")
        .text("Average(%) of Petal Length (in cm) by classes of Iris")
        .attr("x", 320)
        .attr("y", 30)
        .style("text-anchor", "end")
        .attr("font-weight", function(d, i) {return i * 500 + 500;})
        .style("text-decoration", "underline")
        .style("font-size", 13)
        .style("fill","#000000");  
    
    // pie, reference https://www.educative.io/edpresso/how-to-create-a-pie-chart-using-d3
    var tooltip = d3.select("body").append("div").attr("class", "toolwip");
    
    let pie = d3.pie().value(function(d) { 
        return d.petal; 
    });

    let arc = g.selectAll("arc")
        .data(pie(data))
        .enter();

    let path = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);

    arc.append("path")
        .attr("d", path)
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
        .attr("fill", function(d) { return colorScale(d.data.iris1); })
        .on("mouseover",function(d){
            d3.select(this)
                .transition().duration(100)
            	.attr("fill", "#fff1c4");
            tooltip
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 15) + "px")
                .style("display", "inline-block")
                .html("<b>Class: </b>" + (d.data.iris1) + "<br>" + "<b>Average: </b>" + d3.format(".2f")(d.data.petal) + "%");
          })
          .on("mouseout",function(d){
            d3.selectAll("dot")
                .transition().duration(50).delay(100);
            tooltip.style("display", "none");    
            d3.select(this).attr("fill", function() {
                return "" + color(d.data.iris1) + "";
            })
        });
            
    let label = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);
 
    arc.append("text")
        .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
        .text(function(d) { return d.data.petal + "%"; })
        .style("text-anchor", "middle")
        .style("font-size", 14);
}