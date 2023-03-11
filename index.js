let padding = 50;
let width = 920 ; 
let height = 630; 

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
             .attr("x",200)
             .attr("y",100)
             
     let xScale= d3
        .scaleLinear()
        .domain([d3.min(data,function(d){ return d.year;}),
                 d3.max(data,function(d){ return d.year;})])  
        .range([padding,width-padding]); 
        
    let xAxis=d3.axisBottom(xScale);

    console.log(height-padding)
   
        svg.append("g")
            .call(xAxis)
            .attr("id","x-axis")
            .attr("transform", "translate(0, " + (height-padding) + ")");      

     let yScale=  d3
        .scaleTime() 
        .domain(d3.extent(data,function(d){ return d.Time;}))
        .range([height,0]);

      };
