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
                
                // Particle System - Increased to 500
                const particleCount = 500;
                const particles = [];
                const particleGeometries = [
                    new THREE.SphereGeometry(0.15, 8, 8),
                    new THREE.BoxGeometry(0.25, 0.25, 0.25),
                    new THREE.ConeGeometry(0.15, 0.3, 6),
                    new THREE.TetrahedronGeometry(0.2),
                    new THREE.OctahedronGeometry(0.2),
                    new THREE.DodecahedronGeometry(0.18),
                    new THREE.IcosahedronGeometry(0.22),
                    new THREE.TorusGeometry(0.15, 0.08, 8, 16),
                    new THREE.TorusKnotGeometry(0.12, 0.04, 64, 8),
                    new THREE.CylinderGeometry(0.12, 0.12, 0.3, 8)
                ];
                
                // Create particles with different shapes
                for (let i = 0; i < particleCount; i++) {
                    const geometry = particleGeometries[i % particleGeometries.length];
                    
                    // Create gradient colors
                    const hue = 0.6 + Math.random() * 0.2; // Blue-purple range
                    const material = new THREE.MeshBasicMaterial({
                        color: new THREE.Color().setHSL(hue, 0.8, 0.7),
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
                        (Math.random() - 0.5) * 0.15,
                        (Math.random() - 0.5) * 0.15,
                        (Math.random() - 0.5) * 0.08
                    );
                    particle.scale.setScalar(0.6 + Math.random() * 0.9);
                    
                    // Store properties for animation
                    particle.rotationSpeed = {
                        x: (Math.random() - 0.5) * 0.02,
                        y: (Math.random() - 0.5) * 0.02,
                        z: (Math.random() - 0.5) * 0.02
                    };
                    
                    scene.add(particle);
                    particles.push(particle);
                }
                
                // Create floating shapes - Increased to 10
                const shapes = [];
                const shapeGeometries = [
                    { geo: new THREE.IcosahedronGeometry(3.5, 1), color: 0x6366f1, wireframe: true },
                    { geo: new THREE.OctahedronGeometry(3, 1), color: 0x8b5cf6, wireframe: true },
                    { geo: new THREE.TorusKnotGeometry(2.5, 0.8, 100, 16), color: 0x06b6d4, wireframe: true },
                    { geo: new THREE.DodecahedronGeometry(3.2, 0), color: 0x10b981, wireframe: true },
                    { geo: new THREE.TetrahedronGeometry(2.8, 0), color: 0xf59e0b, wireframe: true },
                    { geo: new THREE.BoxGeometry(4, 4, 4), color: 0xec4899, wireframe: true },
                    { geo: new THREE.TorusGeometry(3, 1, 16, 100), color: 0x8b5cf6, wireframe: true },
                    { geo: new THREE.SphereGeometry(2.8, 32, 32), color: 0x3b82f6, wireframe: true },
                    { geo: new THREE.ConeGeometry(3, 5, 8), color: 0x84cc16, wireframe: true },
                    { geo: new THREE.CylinderGeometry(2, 2, 4, 8), color: 0xf97316, wireframe: true }
                ];
                
                shapeGeometries.forEach((shape, i) => {
                    let mesh;
                    
                    if (shape.wireframe) {
                        mesh = new THREE.LineSegments(
                            new THREE.EdgesGeometry(shape.geo),
                            new THREE.LineBasicMaterial({ 
                                color: shape.color, 
                                transparent: true,
                                opacity: 0.12,
                                linewidth: 1
                            })
                        );
                    } else {
                        mesh = new THREE.Mesh(
                            shape.geo,
                            new THREE.MeshBasicMaterial({
                                color: shape.color,
                                transparent: true,
                                opacity: 0.15,
                                wireframe: true
                            })
                        );
                    }
                    
                    // Position shapes in a sphere formation
                    const radius = 35;
                    const phi = Math.acos(-1 + (2 * i) / shapeGeometries.length);
                    const theta = Math.sqrt(shapeGeometries.length * Math.PI) * phi;
                    
                    mesh.position.set(
                        radius * Math.sin(phi) * Math.cos(theta),
                        radius * Math.sin(phi) * Math.sin(theta),
                        radius * Math.cos(phi)
                    );
                    
                    mesh.rotation.set(
                        Math.random() * Math.PI,
                        Math.random() * Math.PI,
                        Math.random() * Math.PI
                    );
                    
                    mesh.originalPosition = mesh.position.clone();
                    mesh.rotationSpeed = {
                        x: (Math.random() - 0.5) * 0.004,
                        y: (Math.random() - 0.5) * 0.005,
                        z: (Math.random() - 0.5) * 0.003
                    };
                    mesh.floatSpeed = Math.random() * 0.01 + 0.005;
                    
                    shapes.push(mesh);
                    scene.add(mesh);
                });
                
                camera.position.z = 45;
                
                // Mouse interaction variables
                let mouseX = 0;
                let mouseY = 0;
                let mouseDown = false;
                let mouseMoveTime = 0;
                let mouseRepelRadius = 10;
                let mouseAttractRadius = 18;
                let mouseRepelStrength = 0.25;
                let mouseAttractStrength = 0.2;
                let attachedParticles = [];
                
                document.addEventListener('mousemove', (event) => {
                    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
                    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
                    mouseMoveTime = Date.now();
                });
                
                document.addEventListener('mousedown', () => {
                    mouseDown = true;
                    mouseAttractRadius = 25;
                    mouseAttractStrength = 0.3;
                });
                
                document.addEventListener('mouseup', () => {
                    mouseDown = false;
                    mouseAttractRadius = 18;
                    mouseAttractStrength = 0.2;
                    
                    // Release attached particles with a gentle push
                    attachedParticles.forEach(particle => {
                        particle.velocity.x += (Math.random() - 0.5) * 0.2;
                        particle.velocity.y += (Math.random() - 0.5) * 0.2;
                        particle.velocity.z += (Math.random() - 0.5) * 0.1;
                    });
                    attachedParticles = [];
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
                                // Strong attraction force
                                const attractForce = mousePos.clone().sub(particle.position).normalize().multiplyScalar(mouseAttractStrength);
                                particle.velocity.add(attractForce);
                                
                                // If very close, attach to cursor
                                if (distToMouse < 3 && !attachedParticles.includes(particle)) {
                                    attachedParticles.push(particle);
                                }
                            }
                            
                            // For attached particles, follow cursor closely
                            if (attachedParticles.includes(particle)) {
                                const followForce = mousePos.clone().sub(particle.position).multiplyScalar(0.1);
                                particle.velocity.add(followForce);
                                particle.velocity.multiplyScalar(0.8); // Dampen for smooth following
                            }
                        } else {
                            // REPULSION MODE - Mouse movement only
                            if (Date.now() - mouseMoveTime < 150) { // Only repel if mouse recently moved
                                if (distToMouse < mouseRepelRadius) {
                                    const repelForce = particle.position.clone().sub(mousePos).normalize().multiplyScalar(mouseRepelStrength);
                                    particle.velocity.add(repelForce);
                                }
                            }
                        }
                        
                        // Natural floating motion
                        const floatX = Math.sin(time * 0.7 + i) * 0.02;
                        const floatY = Math.cos(time * 0.9 + i * 0.7) * 0.02;
                        const floatZ = Math.sin(time * 0.5 + i * 0.3) * 0.01;
                        
                        particle.velocity.x += floatX;
                        particle.velocity.y += floatY;
                        particle.velocity.z += floatZ;
                        
                        // Damping
                        particle.velocity.multiplyScalar(0.95);
                        
                        // Apply velocity
                        particle.position.add(particle.velocity);
                        
                        // Bounce off boundaries
                        const bounds = 50;
                        if (Math.abs(particle.position.x) > bounds) particle.velocity.x *= -0.4;
                        if (Math.abs(particle.position.y) > bounds) particle.velocity.y *= -0.4;
                        if (Math.abs(particle.position.z) > 25) particle.velocity.z *= -0.4;
                        
                        // Rotate particles
                        particle.rotation.x += particle.rotationSpeed.x;
                        particle.rotation.y += particle.rotationSpeed.y;
                        particle.rotation.z += particle.rotationSpeed.z;
                        
                        // Pulse animation
                        const pulse = Math.sin(time * 2 + i) * 0.12 + 0.9;
                        particle.scale.setScalar(pulse);
                    });
                    
                    // Update floating shapes
                    shapes.forEach((shape, i) => {
                        const distToMouse = shape.position.distanceTo(mousePos);
                        
                        if (mouseDown && distToMouse < mouseAttractRadius * 1.5) {
                            // Attract shapes to mouse
                            const attractForce = mousePos.clone().sub(shape.position).normalize().multiplyScalar(0.15);
                            shape.position.add(attractForce);
                        } else if (!mouseDown && Date.now() - mouseMoveTime < 150 && distToMouse < mouseRepelRadius * 1.5) {
                            // Repel shapes from mouse
                            const repelForce = shape.position.clone().sub(mousePos).normalize().multiplyScalar(0.2);
                            shape.position.add(repelForce);
                        } else {
                            // Return to original position slowly
                            const returnForce = shape.originalPosition.clone().sub(shape.position).multiplyScalar(0.01);
                            shape.position.add(returnForce);
                        }
                        
                        // Floating animation
                        shape.position.y += Math.sin(time * shape.floatSpeed + i) * 0.01;
                        shape.position.x += Math.cos(time * shape.floatSpeed * 0.7 + i) * 0.008;
                        
                        // Rotate shapes
                        shape.rotation.x += shape.rotationSpeed.x;
                        shape.rotation.y += shape.rotationSpeed.y;
                        shape.rotation.z += shape.rotationSpeed.z;
                        
                        // Keep shapes within bounds
                        shape.position.x = THREE.MathUtils.clamp(shape.position.x, -40, 40);
                        shape.position.y = THREE.MathUtils.clamp(shape.position.y, -40, 40);
                        shape.position.z = THREE.MathUtils.clamp(shape.position.z, -20, 20);
                    });
                    
                    // Camera follow mouse gently
                    camera.position.x += (mouseX * 12 - camera.position.x) * 0.025;
                    camera.position.y += (mouseY * 12 - camera.position.y) * 0.025;
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