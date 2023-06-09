AFRAME.registerComponent("balls", {
    init: function (){
        this.boll();
    },
    boll: function() {
        window.addEventListener("keydown", (e) => {
          if(e.key === "z"){
            var ball = document.createElement("a-entity")

            ball.setAttribute("geometry", {
                primitive:"sphere",
                radius:0.5
            });

            ball.setAttribute("material","color","black");

            var cam = document.querySelector("#camera");

            pos = cam.getAttribute("position");

            ball.setAttribute("position", {
                x:pos.x , y:pos.y , z:pos.z
            })

            var camera = document.querySelector("#camera").object3D;

            var direction = new THREE.Vector3();
            camera.getWorldDirection(direction);

            ball.setAttribute("velocity", direction.multiplyScalar(-10))

            const scene = document.querySelector("#scene")
            ball.setAttribute("dynamic-body", {
              shape:"sphere" ,
              mass:"0"
            })
            //add the collide event listener to the bullet
            ball.addEventListener("collide", this.removeBall)
            scene.appendChild(ball);
          }
        });
    },
    removeBall: function (e) {
        console.log(e.detail.target.el);
    
        console.log(e.detail.body.el);
    
        var element = e.detail.target.el
    
        var elementHit = e.detail.body.el
    
        if (elementHit.id.includes("pin")) 
          {
            elementHit.setAttribute("material",{opacity:1, transparent:true})
    
            //impulse and point vector
            var impulse = new CANNON.Vec3(-2 , 2, 1)
            var pos = new CANNON.Vec3().copy(elementHit.getAttribute("position"))
            elementHit.body.applyImpulse(impulse,pos)
            //remove event listener
            element.removeEventListener("collide", this.boll)
            
            //remove the bullets from the scene
            var scene = document.querySelector("#scene");
            scene.removeChild(element);
          
        }
    },
});