let padding = 50;
let width = 860 ; 
let height = 560; 

      const req= new XMLHttpRequest();
      
      req.open("GET",'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json',true);
      req.send();

      req.onload = function(){
        const data = JSON.parse(req.responseText);
       
    let tooltip=d3.select("#tooltip");
    var svg= d3
            .select("svg")
            .attr("width",width)
            .attr("height",height)
   
           d3.select("#title")
             .attr("x",210)
             .attr("y",70)
             
     let xScale= d3
        .scaleLinear()
        .domain([d3.min(data,function(d){ return d.Year;}) - 1,
                 d3.max(data,function(d){ return d.Year;}) + 1])  
        .range([padding,width-padding]); 
        
    let xAxis=d3.axisBottom(xScale).tickFormat(d3.format('d'));
   
        svg.append("g")
            .call(xAxis)
            .attr("id","x-axis")
            .attr("transform", "translate(0, " + (height-padding) + ")");      

     let yScale=  d3
        .scaleTime()
        .domain([d3.min(data,(item) => {return new Date(item['Seconds'] * 1000); }),
                d3.max(data,(item) => {return new Date(item['Seconds'] * 1000);}) ])
        .range([padding,height - padding]);

        let yAxis=d3.axisLeft(yScale).tickFormat(d3.timeFormat('%M:%S'));

        svg.append('g')
           .call(yAxis)
           .attr("id","y-axis")
           .attr("transform","translate(" + (padding) + ", 0)");

        const va=66;

        svg.selectAll("circle")
             .data(data)
             .enter()
             .append('circle') 
             .attr("class","dot")
             .attr("data-xvalue",(d) => { return d['Year'];})
             .attr("data-yvalue",(d) => { return new Date(d['Seconds'] * 1000)})
             .attr("r",5)
             .attr("cx",(d) => { return xScale(d.Year);})
             .attr("cy",(d) => { return yScale(new Date(d.Seconds * 1000))})
             .attr("fill", (d) => {

              if(d.URL){
                return "red";
              }
              else{
                return "green";
              }

             })
             .on("mouseover",(d,i) => {
                tooltip.transition().style("visibility","visible");
                if(d.URL != ''){
                document.getElementById("tooltip").innerHTML = "<p>accused of doping</p><p>Name : " + (d['Name']) +"</p>";
                tooltip.attr('data-year',d.Year);
                }
                else{
                document.getElementById("tooltip").innerHTML = "<p>not accused of doping</p><p>Name : " + (d['Name']) +"</p>";
                tooltip.attr('data-year',d.Year);
                }
              })
             .on("mouseout", ()=> { tooltip.transition().style('visibility','hidden')})

        let legend= d3.select("#legend");
        let legendLabel1=legend.append("g");
        let legendLabel2=legend.append("g");

        legendLabel1.append("rect")
                    .attr("width",18)
                    .attr("height",18)
                    .attr("x",790)
                    .attr("y",240)
                    .attr("fill","red")

        legendLabel1.append("text")
                    .text("contestants with doping allegations")            
                    .attr("x",565)
                    .attr("y",253)
                    .attr("style","font-size: 15px")
      
        legendLabel2.append("rect")
                    .attr("width",18)
                    .attr("height",18)
                    .attr("x",790)
                    .attr("y",263)
                    .attr("fill","green")

        legendLabel2.append("text")
                    .text("no doping allegations")            
                    .attr("x",646)
                    .attr("y",275)
                    .attr("style","font-size: 15px")

      };
