var mainCamera = undefined;
var mainSigma = undefined;
var masterNodeCount=0;
function drawRandomGraph(networkName, nodeCount, edgeCount, nodeColor, edgeColor, nodeSizeMin, nodeSizeMax)
{var i,
    N = nodeCount,
    E = edgeCount,
    g = {
      nodes: [],
      edges: []
    };

i=0;
masterNodeCount = N;
var jL = 0;

// Generate a random graph:
var homeNodeX = 0;
var homeNodeY = 0;
do
	{
	  var w = Math.random()*12;
	  var a = Math.sqrt(Math.random()*(w*w));
	  var b = Math.sqrt(w*w - a*a);

	  b = (Math.random() > 0.5? -b : b);
	  a = (Math.random() > 0.5? -a : a);
	  
	  
	  if(i == 0)
	  {
		   homeNodeX = a;
		   homeNodeY = b;
	  }
	  
  g.nodes.push({
    id: 'n' + i,
    x: a,
    y: b,
    size: w,
    weight: w,
    color: nodeColor
  });
  
  /*network divider
  if(i >= 4)
  {
	  var j;
  for (j = i-1; j >= i - Math.random()*4; j--)
	  {
	  g.edges.push({
	    id: 'e' + jL,
	    source: 'n' + i,
	    target: 'n' + j,
	    color: edgeColor
	  });
	  jL++;
	  }
  }
  //end network divider*/
  
  i++;
	}
while(i < N);

/*
for (i = 0; i < E; i++)
	  g.edges.push({
	    id: 'e' + i,
	    source: 'n' + (Math.random() * N | 0),
	    target: 'n' + (Math.random() * N | 0),
	    size: Math.random(),
	    color: edgeColor
	  });
	  */

//Instantiate sigma:
mainSigma = new sigma({
  graph: g,
  settings:{
	  minNodeSize: nodeSizeMin, 
	  maxNodeSize: nodeSizeMax, 
	  mouseEnabled: false,
	  scalingMode: 'outside'
	  }
});
mainCamera = mainSigma.addCamera('main');
mainCamera.goTo(
{
	x: homeNodeX,
	y: homeNodeY,
	ratio: 0.3
});

var r = mainSigma.addRenderer(
{
	  container: document.getElementById(networkName),
	  type: 'canvas',
	  camera: 'main'
}
);
mainSigma.refresh();
mainSigma.startForceAtlas2({worker: true, barnesHutOptimize: false});
window.setTimeout(mainSigma.stopForceAtlas2, 1000);

}

function drawGraphStill(networkName, nodeCount, edgeCount, nodeColor, edgeColor, nodeSizeMin, nodeSizeMax)
{var i,
    N = nodeCount,
    E = edgeCount,
    g = {
      nodes: [],
      edges: []
    };

i=0;
masterNodeCount = N;
var jL = 0;

// Generate a random graph:
do
	{
	  var w = Math.random()*12;
	  var a = Math.sqrt(Math.random()*(w*w));
	  var b = Math.sqrt(w*w - a*a);
	  
	  b = (Math.random() > 0.5? -b : b);
	  a = (Math.random() > 0.5? -a : a);
  g.nodes.push({
    id: 'n' + i,
    x: a,
    y: b,
    size: w,
    weight: w,
    color: nodeColor
  });
  
  /*network divider
  if(i >= 4)
  {
	  var j;
  for (j = i-1; j >= i - Math.random()*4; j--)
	  {
	  g.edges.push({
	    id: 'e' + jL,
	    source: 'n' + i,
	    target: 'n' + j,
	    color: edgeColor
	  });
	  jL++;
	  }
  }
  //end network divider*/
  
  i++;
	}
while(i < N);

for (i = 0; i < E; i++)
	  g.edges.push({
	    id: 'e' + i,
	    source: 'n' + (Math.random() * N | 0),
	    target: 'n' + (Math.random() * N | 0),
	    size: Math.random(),
	    color: edgeColor,
	    type: 'tapered'
	  });

// Instantiate sigma:
mainSigma = new sigma({
  graph: g,
  settings:{
	  minNodeSize: nodeSizeMin, 
	  maxNodeSize: nodeSizeMax, 
	  mouseEnabled: false,
	  scalingMode: 'outside'
	  }
});
mainCamera = mainSigma.addCamera('main');
mainCamera.goTo(
{
	x: 0,
	y: 0,
	ratio: 0.1
});

var r = mainSigma.addRenderer(
{
	  container: document.getElementById(networkName),
	  type: 'canvas',
	  camera: 'main'
}
);
mainSigma.refresh();


}
function moveCamera(direction, steps)
{
	var stepsX=0;
	var stepsY=0;
	if(direction === "left") stepsX = -steps;
	else if(direction === "right") stepsX = steps;
	else if(direction === "up") stepsY = -steps;
	else if(direction === "down") stepsY = steps;
	
	if(mainCamera == undefined) return;
	sigma.misc.animation.camera (mainCamera,
			{
				x: mainCamera.x  + stepsX,
				y: mainCamera.y + stepsY,
				ratio: mainCamera.ratio
			}, 
			{duration: 200});
}
function zoomCamera(zoomRatio)
{
	
	if(mainCamera == undefined) return;
	sigma.misc.animation.camera (mainCamera,
			{
				ratio: mainCamera.ratio / zoomRatio
			}, 
			{duration: 200});
}
function restoreCamera(zoomRatio)
{
	
	if(mainCamera == undefined) return;
	sigma.misc.animation.camera (mainCamera,
			{
				ratio: zoomRatio
			}, 
			{duration: 200});
}
function nudgeNodes()
{
	if(mainSigma == undefined) return;
	mainSigma.graph.nodes().forEach(function(item)
	{
		item.x = item.x + Math.random()*0.001;
	}
	);
	mainSigma.refresh();
}