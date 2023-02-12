
var force_graph_init = false;
var fGraph = null;
var hoverNode = null;

var fgdata = {
    nodes: [],
    links: []
};

function init_fgraph_network ()
{
    var elem_id = 'dashboard-network-area'

    fgdata = {
        nodes: [],
        links: []
    };

    // Nodes.
    fgdata.nodes.push({
        id: '0',
        color: 'blue',
        label: 'node 0'
    });

    fgdata.nodes.push({
        id: '1',
        color: 'yellow',
        label: 'node 1'
    });

    fgdata.nodes.push({
        id: '2',
        color: 'green',
        label: 'node 2'
    });

    // Connections.
    fgdata.links.push({
        id: 'fg-con-0',
        source: '0',
        target: '1',
        color: '#cdcdcd',
        rotation: 0,
        curvature: 0
    });

    fgdata.links.push({
        id: 'fg-con-1',
        source: '1',
        target: '2',
        color: '#cdcdcd',
        rotation: 0,
        curvature: 0
    });

    fgdata.links.push({
        id: 'fg-con-2',
        source: '2',
        target: '0',
        color: '#cdcdcd',
        rotation: 0,
        curvature: 0
    });

    // Configure connections rotation.
    for (var a=0; a<fgdata.links.length; a++) {
        var total_connections = 0;

        for (var b=0; b<fgdata.links.length; b++) {
            if (fgdata.links[a].source == fgdata.links[b].source &&
                fgdata.links[a].target == fgdata.links[b].target  )
            {
                total_connections++;
            }
        }

        if (total_connections > 1) {
            for (var b=0,c=false; b<fgdata.links.length; b++) {
                if (fgdata.links[a].source == fgdata.links[b].source &&
                    fgdata.links[a].target == fgdata.links[b].target  )
                {
                    if (c == false) {
                        c = true;
                        fgdata.links[b].curvature = b * 0.05;
                    } else {
                        c = false;
                        fgdata.links[b].curvature = b * -0.05;
                    }
                }
            }
        }
    }

    // Prepare data params.
    fgdata.links.forEach(link => {
        var a, b;

        for (var x=0; x<fgdata.nodes.length; x++) {
            if (fgdata.nodes[x].id == link.source) {
                a = fgdata.nodes[x];
                break;
            }
        }
        
        for (var x=0; x<fgdata.nodes.length; x++) {
            if (fgdata.nodes[x].id == link.target) {
                b = fgdata.nodes[x];
                break;
            }
        }
        
        if (!a.neighbors)
            a.neighbors = [];
        if (!b.neighbors)
            b.neighbors = [];
        
        a.neighbors.push(b);
        b.neighbors.push(a);

        !a.links && (a.links = []);
        !b.links && (b.links = []);
        
        a.links.push(link);
        b.links.push(link);
    });

    // Graph.
    if (force_graph_init == false) {
        force_graph_init = true;
        
        var width_area   = $('#'+ elem_id).width();
        var height_area  = $('#'+ elem_id).height();
        var elem         = document.getElementById(elem_id);

        const highlightNodes = new Set();
        const highlightLinks = new Set();

        fGraph = ForceGraph3D()(elem)
            .graphData(fgdata)
            // .width(width_area)
            // .height(height_area)
            .showNavInfo(false)
            .backgroundColor('#2c3034')
            .linkDirectionalArrowLength(9)
            .linkDirectionalArrowRelPos(1)
            .linkCurveRotation('rotation')
            .linkCurvature('curvature')
            .warmupTicks(1000).cooldownTicks(0) // Stop animation.
            .linkOpacity(1)
            .nodeOpacity(0.5)
            .nodeThreeObjectExtend(true)
            .enableNodeDrag(false)
            .enablePointerInteraction(true)

            .nodeThreeObject(node => {
                const sprite = new SpriteText(node.label);
                
                sprite.color = 'white';
                sprite.textHeight = 5;
                // sprite.position.set(20, 0, 0);
                // sprite.padding = [12, 1];

                return sprite;
            })

            .nodeColor(node => highlightNodes.has(node) ? node === hoverNode ? 'rgb(255,0,0)' : 'rgb(255,160,0)' : node.color)
            .linkWidth(link => highlightLinks.has(link) ? 2 : 1)
            .linkDirectionalParticles(link => highlightLinks.has(link) ? 4 : 0)
            .linkDirectionalParticleWidth(4)
            .linkColor(link => {
                return link.color;
            })
            
            .onNodeClick(node => {
                console.log('node left click:', node)
            })
            .onNodeRightClick(node => {
                console.log('node right click:', node)
            })

            .onNodeHover(node => {
                // no state change
                if ((!node && !highlightNodes.size) || (node && hoverNode === node)) return;
    
                highlightNodes.clear();
                highlightLinks.clear();

                if (node) {
                    highlightNodes.add(node);
                    
                    if (node.hasOwnProperty('neighbors'))
                        node.neighbors.forEach(neighbor => highlightNodes.add(neighbor));
                    
                    if (node.hasOwnProperty('links'))
                        node.links.forEach(link => highlightLinks.add(link));
                }
    
                hoverNode = node || null;
                updateHighlight();
            })
            
            .onLinkHover(link => {
                highlightNodes.clear();
                highlightLinks.clear();
    
                if (link) {
                    highlightLinks.add(link);
                    highlightNodes.add(link.source);
                    highlightNodes.add(link.target);
                }
    
                updateHighlight();
            })
            .onNodeRightClick(node => {
                // window.location.href = "#fg-id-node-"+ node.id;
                console.log("ID: #fg-id-node-"+ node.id);
            })

            var loader = new THREE.TextureLoader();
            var bgTexture = loader.load("images/wallpaper.jpg");
            scene.background = bgTexture;
        
    } else {
        fGraph.graphData(fgdata);
    }
}

function updateHighlight() {
    fGraph
        .nodeColor(fGraph.nodeColor())
        .linkWidth(fGraph.linkWidth())
        .linkDirectionalParticles(fGraph.linkDirectionalParticles());
}

init_fgraph_network()


