const { useEffect } = React;

const AnimatedBackground = () => {
    useEffect(() => {
        const initThreeJS = () => {
            // Check if Three.js is loaded
            if (typeof THREE === 'undefined') {
                console.error('Three.js not loaded');
                return;
            }
            
            try {
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
                
                // Create particles
                const particlesCount = 500;
                const positions = new Float32Array(particlesCount * 3);
                const colors = new Float32Array(particlesCount * 3);
                
                for(let i = 0; i < particlesCount * 3; i += 3) {
                    positions[i] = (Math.random() - 0.5) * 100;
                    positions[i + 1] = (Math.random() - 0.5) * 100;
                    positions[i + 2] = (Math.random() - 0.5) * 50;
                    
                    colors[i] = 0.39;     // R
                    colors[i + 1] = 0.40; // G
                    colors[i + 2] = 0.94; // B
                }
                
                const geometry = new THREE.BufferGeometry();
                geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
                geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
                
                const material = new THREE.PointsMaterial({
                    size: 0.2,
                    vertexColors: true,
                    transparent: true,
                    opacity: 0.6
                });
                
                const particles = new THREE.Points(geometry, material);
                scene.add(particles);
                
                camera.position.z = 30;
                
                // Add floating shapes
                const addShapes = () => {
                    const shapes = [];
                    const geometries = [
                        new THREE.IcosahedronGeometry(2, 0),
                        new THREE.OctahedronGeometry(1.5, 0),
                        new THREE.TetrahedronGeometry(1, 0)
                    ];
                    
                    const wireframeMaterial = new THREE.MeshBasicMaterial({ 
                        color: 0x8b5cf6,
                        wireframe: true,
                        transparent: true,
                        opacity: 0.2
                    });
                    
                    for(let i = 0; i < 3; i++) {
                        const shape = new THREE.Mesh(geometries[i], wireframeMaterial);
                        shape.position.x = (Math.random() - 0.5) * 40;
                        shape.position.y = (Math.random() - 0.5) * 40;
                        shape.position.z = (Math.random() - 0.5) * 20;
                        shapes.push(shape);
                        scene.add(shape);
                    }
                    return shapes;
                };
                
                const shapes = addShapes();
                
                // Mouse interaction
                let mouseX = 0;
                let mouseY = 0;
                
                document.addEventListener('mousemove', (event) => {
                    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
                    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
                });
                
                // Animation
                const animate = () => {
                    requestAnimationFrame(animate);
                    
                    particles.rotation.x += 0.001;
                    particles.rotation.y += 0.002;
                    
                    // Move shapes
                    shapes.forEach((shape, i) => {
                        shape.rotation.x += 0.005;
                        shape.rotation.y += 0.003;
                        shape.position.y += Math.sin(Date.now() * 0.001 + i) * 0.01;
                        shape.position.x += Math.cos(Date.now() * 0.001 + i) * 0.01;
                    });
                    
                    // Camera follow mouse
                    camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
                    camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
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
                
                // Cleanup
                return () => {
                    window.removeEventListener('resize', handleResize);
                    if (renderer.domElement.parentNode) {
                        renderer.domElement.parentNode.removeChild(renderer.domElement);
                    }
                };
                
            } catch (error) {
                console.error('Error initializing Three.js:', error);
            }
        };
        
        // Wait for page to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initThreeJS);
        } else {
            initThreeJS();
        }
    }, []);
    
    return null;
};