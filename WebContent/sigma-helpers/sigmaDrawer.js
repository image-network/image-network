//global references to the sigma graph, primary camera,
//node count, and current node
var mainCamera = undefined;
var mainSigma = undefined;
var masterNodeCount=0;
var currentUser = "Valjean";
var conductorName=currentUser;
var mainColor = '#000000';
//forceAtlas2 documentation: http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0098679

/* DrawRandomGraph - generates a random set of nodes, then applies the FA2 algorithm to their positions.
 * PRE:
 * 	divId - takes in the container to render the sigma to
 * 	nodeCount - number of nodes
 * 	edgeCount - number of edges
 *  nodeColor - uniform color of all nodes
 *  edgeColor - uniform color of all edges
 *  nodeSizeMin - minimum render size of nodes
 *  nodeSizeMax - maximum render size of nodes
 * POST:
 *  returns void
 */
function drawRandomGraph(divId, nodeCount, edgeCount, nodeColor, edgeColor, nodeSizeMin, nodeSizeMax)
{var i,
    N = nodeCount,
    E = edgeCount,
    g = {
      nodes: [],
      edges: []
    };
	mainColor = edgeColor;

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
	  container: document.getElementById(divId),
	  type: 'canvas',
	  camera: 'main'
}
);
mainSigma.refresh();
mainSigma.startForceAtlas2({worker: true, barnesHutOptimize: false});
setTimeout(function(){mainSigma.stopForceAtlas2();}, 3000);

}
/* DrawGraphStill - aesthetic:
 * generates a random complete sigma and displays a portion of it
 * 
 * PRE:
 * 	divId - takes in the container to render the sigma to
 * 	nodeCount - number of nodes
 * 	edgeCount - number of edges
 *  nodeColor - uniform color of all nodes
 *  edgeColor - uniform color of all edges
 *  nodeSizeMin - minimum render size of nodes
 *  nodeSizeMax - maximum render size of nodes
 * POST:
 *  returns void
 */
function drawGraphStill(divId, nodeCount, edgeCount, nodeColor, edgeColor, nodeSizeMin, nodeSizeMax)
{var i,
    N = nodeCount,
    E = edgeCount,
    g = {
      nodes: [],
      edges: []
    };
	mainColor = edgeColor;
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
	  container: document.getElementById(divId),
	  type: 'canvas',
	  camera: 'main'
}
);
mainSigma.refresh();


}

/* DrawFromJSON - renders a JSON
 * IMPORTS:
 * 
 * ***requires plugins/sigma.parsers.json.min.js***
 * 
 * PRE: 
 * 	divId - takes in the container to render the sigma to
 * 	nodeCount - number of nodes
 * 	edgeCount - number of edges
 *  nodeColor - uniform color of all nodes
 *  edgeColor - uniform color of all edges
 *  nodeSizeMin - minimum render size of nodes
 *  nodeSizeMax - maximum render size of nodes
 * POST:
 *  returns void
 */
function drawFromJSON(filepath,divId, nodeColor, edgeColor, nodeSizeMin, nodeSizeMax)
{
	mainColor = edgeColor;
	// Instantiate sigma:
	mainSigma = new sigma({
		  settings:{
			  minNodeSize: nodeSizeMin, 
			  maxNodeSize: nodeSizeMax, 
			  mouseEnabled: false,
			  scalingMode: 'outside',
			  defaultNodeColor: nodeColor
			  }
		});
		mainCamera = mainSigma.addCamera('main');
		mainCamera.goTo(
		{
			x: 0,
			y: 0,
			ratio: 1.0
		});

		var r = mainSigma.addRenderer(
		{
			  container: document.getElementById(divId),
			  type: 'canvas',
			  camera: 'main'
		}
		);
		sigma.parsers.json(filepath,mainSigma, function(s)
				{
					s.refresh();
				});
		
}
/* DrawFromGEXF - renders a GEXF
 * IMPORTS:
 * 
 * ***requires plugins/sigma.parsers.json.min.js***
 * 
 * PRE: 
 * 	divId - takes in the container to render the sigma to
 * 	nodeCount - number of nodes
 * 	edgeCount - number of edges
 *  nodeColor - uniform color of all nodes
 *  edgeColor - uniform color of all edges
 *  nodeSizeMin - minimum render size of nodes
 *  nodeSizeMax - maximum render size of nodes
 * POST:
 *  returns void
 */
function drawFromGEXF(filepath,divId, nodeColor, edgeColor, nodeSizeMin, nodeSizeMax)
{
	mainColor = edgeColor;
	// Instantiate sigma:
	mainSigma = new sigma({
		  settings:{
			  minNodeSize: nodeSizeMin, 
			  maxNodeSize: nodeSizeMax, 
			  mouseEnabled: true,
			  scalingMode: 'outside',
			  defaultNodeColor: edgeColor,
			  defaultLabelColor: nodeColor,
			  defaultEdgeType: 'tapered'
			  }
		});
		mainCamera = mainSigma.addCamera('main');
		mainCamera.goTo(
		{
			x: 0,
			y: 0,
			ratio: 0.6
		});

		var r = mainSigma.addRenderer(
		{
			  container: document.getElementById(divId),
			  type: 'canvas',
			  camera: 'main'
		}
		);
		sigma.parsers.gexf(filepath,mainSigma, function(s)
				{
					s.refresh();
					/*
					s.startForceAtlas2({worker: true, barnesHutOptimize: false, slowDown: 10.0, edgeWeightInfluence: 0.0});
					setTimeout(function(){s.stopForceAtlas2();}, 5000);
					*/
				});

}


//navigation helpers (sigma must be initialized)
function moveCamera(direction, steps)
{
	if(direction=='down' || direction=='up')
	{
	if(direction=='up') steps = -steps;
	
	if(mainCamera == undefined) return;
	sigma.misc.animation.camera (mainCamera,
			{
				x: mainCamera.x + steps * Math.cos(mainCamera.angle + (3.14159 / 2)),
				y: mainCamera.y + steps * Math.sin(mainCamera.angle + (3.14159 / 2)),
				ratio: mainCamera.ratio
			}, 
			{duration: 200});
	}
	if(direction=='left' || direction=='right')
	{
		if(direction == 'left') steps = -steps;
		if(mainCamera == undefined) return;
		sigma.misc.animation.camera (mainCamera,
				{
					x: mainCamera.x + steps * Math.cos(mainCamera.angle),
					y: mainCamera.y + steps * (Math.sin(mainCamera.angle)),
					ratio: mainCamera.ratio
				}, 
				{duration: 200});
		}
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

function rotateCamera(rot)
{
	if(mainCamera == undefined) return;
	sigma.misc.animation.camera (mainCamera,
			{
				angle: (mainCamera.angle + rot)
			}, 
			{duration: 400});
}
function restoreCamera(zoomRatio)
{
	
	if(mainCamera == undefined) return;
	sigma.misc.animation.camera (mainCamera,
			{
				x: 0,
				y: 0,
				ratio: zoomRatio,
				angle: 0
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
//helper - returns a node given a name
function findNode(nodeName)
{
	if(mainSigma == undefined) return;
	if(mainCamera== undefined) return;
	
	var nodes = mainSigma.graph.nodes();
	function matchesLabel(element)
	{
		return element.label == nodeName;
	}
	
	return nodes.find(matchesLabel);
}
function findNodeId(nodeId)
{
	if(mainSigma == undefined) return;
	if(mainCamera== undefined) return;
	
	var nodes = mainSigma.graph.nodes();
	function matchesId(element)
	{
		return element.id == nodeId;
	}
	
	return nodes.find(matchesId);
}

function selectNode(nodeName)
{
	findNode(conductorName).color = mainColor;
	var node = findNode(nodeName);
	if(node == undefined) return;

	if(mainCamera == undefined) return;
	sigma.misc.animation.camera (mainCamera,
			{
				x: node[mainCamera.readPrefix+"x"],
				y: node[mainCamera.readPrefix+"y"],
				ratio: 0.3
			}, 
			{duration: 1000});
	
	node.color = '#ffffff';
	conductorName = nodeName;
	
	
	mainSigma.refresh();
}
setTimeout(function(){selectNode(conductorName)},100);

window.onload = function()
{
mainSigma.bind('clickNode', function(e) {selectNode(e.data.node.label)});
mainSigma.refresh();
}
/*
sigma.classes.graph.addMethod('neighbors', function(nodeId) {
    var k,
        neighbors = {},
        index = this.allNeighborsIndex[nodeId] || {};

    for (k in index)
      neighbors[k] = this.nodesIndex[k];

    return neighbors;
  });

var currentNeighbor=0;

function moveToNeighborOf(nodeName, dir)
{
	var node = findNode(nodeName);
	var nodes = mainSigma.graph.neighbors(node.id);
	var lxl = node.x, lxr = node.x, lyu=node.y, lyd=node.y;
	var nl, nr, nu, nd;
	
	for(var k in nodes)
		{
			var cn = findNodeId(k);
			if(cn.x <  lxl){nl = cn; lxl = cn.x}
			if(cn.x >  lxr){nr = cn; lxr = cn.x}
			if(cn.y <  lyu){nu = cn; lyu = cn.y}
			if(cn.y >  lyd){nd = cn; lyd = cn.y}
			
		}
	var target;
	if(dir == "left")target=nl;
	if(dir == "right")target=nr;
	if(dir == "up")target=nu;
	if(dir == "down")target=nd;
	
	selectNode(target.label);
	conductorName = target.label;
}
*/
