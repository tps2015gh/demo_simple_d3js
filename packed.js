// REF FROM https://spalinux.com/2013/12/basic-using-d3-js-to-create-svg-circle-and-rect
// REF FROM https://www.dashingd3js.com/binding-data-to-dom-elements
print1() ; 
circle_and_rect(); 
backcolor1();

 
add_simple_circle( "orange" ); 
add_simple_circle( "lightblue" ); 
add_simple_circle( "green"); 
//var p = get_input();
//console.log("get_input = " + p );

add_circle();
add_circle2();
draw_line_interpolation();
 


// === PRINT === 
function print1(){
var dataset = [ 5, 10, 15, 20, 25 ];
                    d3.select("body").selectAll("p")
                    .data(dataset)
                    .enter()
                    .append("p")
                    .text(function(d) { // <-- Note tender embrace at left
                          return "I can count up to " + d;
                     });
}

//===========================
function circle_and_rect() {
  // create svg
  var svg = d3.select("body").append("svg");

  svg.attr("width", 500)
    .attr("height", 200);

  // create circle
  var circle = svg.append("circle");

  circle.attr("cx", 80)
    .attr("cy", 40)
    .attr("r", 20);

  // create rect
  var rect = svg.append("rect");
  rect.attr("x", 140)
    .attr("y", 90)
    .attr("width", 70)
    .attr("height", 30);
}

function backcolor1(){
  d3.select("body").transition()
    .style("background-color", "lightyellow");
}

/* color eg. orange, blue ,green */
function add_simple_circle(color){
    d3.select("body")
      .append("svg")
      .attr("width", 50)
      .attr("height", 50)
      .append("circle")
      .attr("cx", 25)
      .attr("cy", 25)
      .attr("r", 25)
      .style("fill", color);
}

// function get_input(){
// var theData = [ 1, 2, 3 ];
// var p = d3.select("body").selectAll("p")
//         .data(theData)
//         .enter()  
//     return p ;
// }
 
function add_circle(){
  //var circleRadii = [40, 20, 10];
//  var spaceCircles = [30, 70, 110];
  var svgContainer = d3.select("body").append("svg")
                                      .attr("width", 200)
                                      .attr("height", 200)
                                       .style("border", "1px solid black");
  var circleSelection = svgContainer.append("circle")
                                    .attr("cx", 25)
                                    .attr("cy", 25)
                                    .attr("r", 25)
                                    .style("fill", "purple");                                     
}
function add_circle2(){
var jsonCircles = [
      {
       "x_axis": 30,
       "y_axis": 30,
       "radius": 20,
       "color" : "green"
      }, {
       "x_axis": 70,
       "y_axis": 35,
       "radius": 10,
       "color" : "purple"
      }, {
       "x_axis": 200,
       "y_axis": 45,
       "radius": 15,
       "color" : "red"
    }];  
 
  var svgContainer = d3.select("body").append("svg")
                                      .attr("width", 250)
                                      .attr("height", 200)
                                       .style("border", "1px solid black")
                                       .style("background-color","lightblue");

  var circles = svgContainer.selectAll("circle")
                            .data(jsonCircles)
                            .enter()
                            .append("circle");
  console.log("circles=" ,circles);
  var circleAttributes = circles
                       .attr("cx", function (d) { return d.x_axis; })
                       .attr("cy", function (d) { return d.y_axis; })
                       .attr("r", function (d) { return d.radius; })
                       .style("fill", function(d) { return d.color; });

  // ADD RECTANGLE 
  var rect1 = svgContainer.append("rect")
                        .attr("x",150)
                        .attr("y",120)
                        .attr("width", 50)
                        .attr("height", 40)
                        .style("fill","white");

   // ADD ELIPSE 
  var ellipse1 = svgContainer.append("ellipse")
                          .attr("cx", 50)
                          .attr("cy", 150)
                         .attr("rx", 25)
                           .attr("ry", 10)
                           .style("fill","red");;                        

//Draw the line
  var line1 = svgContainer.append("line")
                           .attr("x1", 5 + 80)
                           .attr("y1", 5 + 80)
                           .attr("x2", 50+ 80)
                           .attr("y2", 50+ 80)
                           .attr("stroke-width", 2)
                           .attr("stroke", "black");
                                                            
}

/* DURING DEV 
    REF :  https://www.dashingd3js.com/svg-paths-and-d3js
*/
function draw_line_interpolation(){
    console.log('under construction');
}


console.info("OK JS Loaded");