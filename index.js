let padding = 50;
let width = 700 ; 
let height = 450; 

      const req= new XMLHttpRequest();
      
      req.open("GET",'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json',true);
      req.send();

      req.onload = function(){
        const data = JSON.parse(req.responseText);
       
    var svg= d3
            .select("svg")
            .attr("width",width)
            .attr("height",height)
   
           d3.select("#title")
             .attr("x",210)
             .attr("y",70)
             
     let xScale= d3
        .scaleLinear()
        .domain([d3.min(data,function(d){ return d.Year;}),
                 d3.max(data,function(d){ return d.Year;})])  
        .range([padding,width-padding]); 
        
    let xAxis=d3.axisBottom(xScale);
   
        svg.append("g")
            .call(xAxis)
            .attr("id","x-axis")
            .attr("transform", "translate(0, " + (height-padding) + ")");      

     let yScale=  d3
        .scaleTime() 
        .range([padding,height - padding]);

        let yAxis=d3.axisLeft(yScale);

        svg.append('g')
           .call(yAxis)
           .attr("id","y-axis")
           .attr("transform","translate(" + (padding) + ", 0)");

          svg.selectAll("circle")
             .data(data)
             .enter()
             .append('circle') 
             .attr("class","dot")
             .attr("data-xvalue",(d) => { return d['Year'];})
             .attr("data-yvalue",(d) => { return new Date(d['Seconds'] * 1000)})
             .attr("r",5)
             .attr("cx",(d) => { return xScale(d.Year);})
             .attr("cy", 50)


      };
