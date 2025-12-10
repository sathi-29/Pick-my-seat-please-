const { useEffect } = React;

const AnimatedBackground = () => {
    useEffect(() => {
        const initThreeJS = () => {
            if (typeof THREE === 'undefined') {
                console.error('Three.js not loaded');
                return;
            }
            
            try {
                // Scene setup
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                const renderer = new THREE.WebGLRenderer({ 
                    alpha: true, 
                    antialias: true 
                });
                
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.setClearColor(0x000000, 0);
                
                const container = document.getElementById('particles-container');
                if (container) {
                    container.innerHTML = '';
                    container.appendChild(renderer.domElement);
                }
                
                // Particle System
                const particleCount = 1000;
                const particles = [];
                const particleVelocities = [];
                const particleGeometries = [
                    new THREE.SphereGeometry(0.2, 8, 8),
                    new THREE.BoxGeometry(0.3, 0.3, 0.3),
                    new THREE.ConeGeometry(0.2, 0.4, 8),
                    new THREE.TetrahedronGeometry(0.3),
                    new THREE.OctahedronGeometry(0.25),
                    new THREE.DodecahedronGeometry(0.25),
                    new THREE.IcosahedronGeometry(0.3),
                    new THREE.TorusGeometry(0.2, 0.1, 8, 16)
                ];
                
                // Create particles with different shapes
                for (let i = 0; i < particleCount; i++) {
                    const geometry = particleGeometries[i % particleGeometries.length];
                    const material = new THREE.MeshBasicMaterial({
                        color: new THREE.Color(
                            0.4 + Math.random() * 0.3,
                            0.4 + Math.random() * 0.3,
                            0.9 + Math.random() * 0.1
                        ),
                        transparent: true,
                        opacity: 0.7
                    });
                    
                    const particle = new THREE.Mesh(geometry, material);
                    
                    // Random starting position
                    particle.position.set(
                        (Math.random() - 0.5) * 100,
                        (Math.random() - 0.5) * 100,
                        (Math.random() - 0.5) * 50
                    );
                    
                    particle.originalPosition = particle.position.clone();
                    particle.velocity = new THREE.Vector3(
                        (Math.random() - 0.5) * 0.2,
                        (Math.random() - 0.5) * 0.2,
                        (Math.random() - 0.5) * 0.1
                    );
                    particle.scale.setScalar(0.5 + Math.random() * 1.5);
                    
                    scene.add(particle);
                    particles.push(particle);
                    particleVelocities.push(new THREE.Vector3());
                }
                
                // Create floating shapes
                const shapes = [];
                const shapeGeometries = [
                    { geo: new THREE.IcosahedronGeometry(3, 1), color: 0x6366f1 },
                    { geo: new THREE.OctahedronGeometry(2.5, 1), color: 0x8b5cf6 },
                    { geo: new THREE.TorusKnotGeometry(2, 0.5, 100, 16), color: 0x06b6d4 },
                    { geo: new THREE.TetrahedronGeometry(2, 0), color: 0x10b981 },
                    { geo: new THREE.DodecahedronGeometry(2.2, 0), color: 0xf59e0b },
                    { geo: new THREE.BoxGeometry(3, 3, 3), color: 0xec4899 }
                ];
                
                shapeGeometries.forEach((shape, i) => {
                    const wireframe = new THREE.LineSegments(
                        new THREE.EdgesGeometry(shape.geo),
                        new THREE.LineBasicMaterial({ 
                            color: shape.color, 
                            transparent: true,
                            opacity: 0.2
                        })
                    );
                    
                    wireframe.position.set(
                        (Math.random() - 0.5) * 60,
                        (Math.random() - 0.5) * 60,
                        (Math.random() - 0.5) * 30
                    );
                    
                    wireframe.rotation.set(
                        Math.random() * Math.PI,
                        Math.random() * Math.PI,
                        Math.random() * Math.PI
                    );
                    
                    wireframe.originalPosition = wireframe.position.clone();
                    shapes.push(wireframe);
                    scene.add(wireframe);
                });
                
                camera.position.z = 40;
                
                // Mouse interaction variables
                let mouseX = 0;
                let mouseY = 0;
                let mouseDown = false;
                let mouseMoveTime = 0;
                let mouseRepelRadius = 10;
                let mouseAttractRadius = 15;
                
                document.addEventListener('mousemove', (event) => {
                    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
                    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
                    mouseMoveTime = Date.now();
                });
                
                document.addEventListener('mousedown', () => {
                    mouseDown = true;
                    mouseAttractRadius = 20; // Increase attraction radius when clicking
                });
                
                document.addEventListener('mouseup', () => {
                    mouseDown = false;
                    mouseAttractRadius = 15;
                });
                
                // Get mouse position in 3D space
                const getMousePosition = () => {
                    const vector = new THREE.Vector3(mouseX, mouseY, 0.5);
                    vector.unproject(camera);
                    const dir = vector.sub(camera.position).normalize();
                    const distance = -camera.position.z / dir.z;
                    return camera.position.clone().add(dir.multiplyScalar(distance));
                };
                
                // Animation loop
                const animate = () => {
                    requestAnimationFrame(animate);
                    
                    const time = Date.now() * 0.001;
                    const mousePos = getMousePosition();
                    
                    // Update particles
                    particles.forEach((particle, i) => {
                        const distToMouse = particle.position.distanceTo(mousePos);
                        
                        if (mouseDown) {
                            // ATTRACTION MODE - Click and hold
                            if (distToMouse < mouseAttractRadius) {
                                const attractForce = mousePos.clone().sub(particle.position).normalize().multiplyScalar(0.15);
                                particle.velocity.add(attractForce);
                            }
                        } else {
                            // REPULSION MODE - Mouse movement only
                            if (Date.now() - mouseMoveTime < 100) { // Only repel if mouse recently moved
                                if (distToMouse < mouseRepelRadius) {
                                    const repelForce = particle.position.clone().sub(mousePos).normalize().multiplyScalar(0.3);
                                    particle.velocity.add(repelForce);
                                }
                            }
                        }
                        
                        // Natural floating motion
                        const floatX = Math.sin(time + i) * 0.05;
                        const floatY = Math.cos(time + i * 0.7) * 0.05;
                        const floatZ = Math.sin(time * 0.5 + i * 0.3) * 0.03;
                        
                        particle.velocity.x += floatX;
                        particle.velocity.y += floatY;
                        particle.velocity.z += floatZ;
                        
                        // Damping
                        particle.velocity.multiplyScalar(0.95);
                        
                        // Apply velocity
                        particle.position.add(particle.velocity);
                        
                        // Bounce off boundaries
                        const bounds = 50;
                        if (Math.abs(particle.position.x) > bounds) particle.velocity.x *= -0.5;
                        if (Math.abs(particle.position.y) > bounds) particle.velocity.y *= -0.5;
                        if (Math.abs(particle.position.z) > bounds) particle.velocity.z *= -0.5;
                        
                        // Rotate particles
                        particle.rotation.x += 0.01;
                        particle.rotation.y += 0.01;
                        
                        // Pulse animation
                        const pulse = Math.sin(time * 2 + i) * 0.1 + 1;
                        particle.scale.setScalar(pulse);
                    });
                    
                    // Update floating shapes
                    shapes.forEach((shape, i) => {
                        const distToMouse = shape.position.distanceTo(mousePos);
                        
                        if (mouseDown && distToMouse < mouseAttractRadius * 1.5) {
                            // Attract shapes to mouse
                            const attractForce = mousePos.clone().sub(shape.position).normalize().multiplyScalar(0.1);
                            shape.position.add(attractForce);
                        } else if (!mouseDown && Date.now() - mouseMoveTime < 100 && distToMouse < mouseRepelRadius * 1.5) {
                            // Repel shapes from mouse
                            const repelForce = shape.position.clone().sub(mousePos).normalize().multiplyScalar(0.2);
                            shape.position.add(repelForce);
                        }
                        
                        // Floating animation
                        shape.position.y += Math.sin(time + i) * 0.01;
                        shape.position.x += Math.cos(time * 0.7 + i) * 0.008;
                        
                        // Rotate shapes
                        shape.rotation.x += 0.002;
                        shape.rotation.y += 0.003;
                        shape.rotation.z += 0.001;
                        
                        // Keep shapes within bounds
                        shape.position.x = THREE.MathUtils.clamp(shape.position.x, -40, 40);
                        shape.position.y = THREE.MathUtils.clamp(shape.position.y, -40, 40);
                        shape.position.z = THREE.MathUtils.clamp(shape.position.z, -20, 20);
                    });
                    
                    // Camera follow mouse gently
                    camera.position.x += (mouseX * 10 - camera.position.x) * 0.03;
                    camera.position.y += (mouseY * 10 - camera.position.y) * 0.03;
                    camera.lookAt(scene.position);
                    
                    renderer.render(scene, camera);
                };
                
                animate();
                
                // Handle resize
                const handleResize = () => {
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(window.innerWidth, window.innerHeight);
                };
                
                window.addEventListener('resize', handleResize);
                
                return () => {
                    window.removeEventListener('resize', handleResize);
                    if (renderer.domElement.parentNode) {
                        renderer.domElement.parentNode.removeChild(renderer.domElement);
                    }
                };
                
            } catch (error) {
                console.error('Error in animated background:', error);
            }
        };
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initThreeJS);
        } else {
            initThreeJS();
        }
    }, []);
    
    return null;
};