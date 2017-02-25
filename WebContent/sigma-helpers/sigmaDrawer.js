function drawRandomGraph(networkName, nodeCount, edgeCount, nodeColor, edgeColor, nodeSize)
{var i,
    s,
    N = nodeCount,
    E = edgeCount,
    g = {
      nodes: [],
      edges: []
    };

// Generate a random graph:


for (i = 0; i < N; i++)
	{
	  var w = Math.random()*25;
	  var a = Math.sqrt(Math.random()*(w*w));
	  var b = Math.sqrt(w*w - a*a);
	  
	  b = (Math.random() > 0.5? -b : b);
	  a = (Math.random() > 0.5? -a : a);
  g.nodes.push({
    id: 'n' + i,
    x: a,
    y: b,
    size: 0.5,
    weight: w,
    color: nodeColor
  });
  w = Math.random()*25;
	}

for (i = 0; i < E; i++)
  g.edges.push({
    id: 'e' + i,
    source: 'n' + (Math.random() * N | 0),
    target: 'n' + (Math.random() * N | 0),
    size: 1.0,
    color: edgeColor,
  });

// Instantiate sigma:
s = new sigma({
  graph: g,
  container: networkName,
  settings:{minNodeSize: nodeSize, maxNodeSize: nodeSize, mouseEnabled: false}
});
}