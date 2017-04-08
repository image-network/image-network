# Machine Learning Part
**Folder** contains
- `imageSim.py` script that uses the IBM Bluemix API.
- `jaccardSimilarity.py` generates the netgraph for sigma
- `img/` folder which contains images (needs to be populated with firebase info)
- `classified/` folder which contains text classifications of images
- `network.json` contains a weighted adjacency matrix between images
- `netgraph.json` is a json that can be rendered using sigma

# Todo
I am still working on our good version of forceatlas (or just some way to produce positions). The current algorithm does generate positions, but they
are not optimal. I need to change the `generate_positions` function or try
to minimize the squares of the differences between node distances and text
similarities.

I just put everything in a folder called PythonImageNetwork. You can run `imageSim.py` to classify images in an `img/` folder which I will later need to collate or update from each users profile in firebase. You can call `jaccardSimilarity.py` to generate the netgraph for sigma.