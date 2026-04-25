import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

export default function ThreeFluidBackground({ zIndex = 0 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene Setup
    const scene = new THREE.Scene();
    // Use clear background instead of solid color to blend with CSS backgrounds
    // scene.background = new THREE.Color('#0a0a0c'); 
    scene.fog = new THREE.FogExp2('#0a0a0c', 0.015);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 25, 30);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

    // Dynamic Interaction Lights
    const pointLight = new THREE.PointLight(0xec4899, 8, 40); // Pinkish light
    pointLight.position.set(0, 5, 0);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x6366f1, 8, 40); // Indigo light
    pointLight2.position.set(0, 5, 0);
    scene.add(pointLight2);

    // Grid Parameters
    const gridX = 40;
    const gridZ = 40;
    const count = gridX * gridZ;
    const size = 1.0;
    const gap = 0.15;
    const spacing = size + gap;

    // Geometry & Material
    const geometry = new RoundedBoxGeometry(size, size, size, 4, 0.15);
    const material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.6,
        roughness: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
    });

    // Instanced Mesh
    const instancedMesh = new THREE.InstancedMesh(geometry, material, count);
    scene.add(instancedMesh);

    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    const baseColor = new THREE.Color('#16161e'); 
    const hoverColor = new THREE.Color('#a855f7'); 

    const instanceData = [];

    let i = 0;
    const halfX = gridX / 2;
    const halfZ = gridZ / 2;

    for(let x = 0; x < gridX; x++) {
        for(let z = 0; z < gridZ; z++) {
            const posX = (x - halfX) * spacing;
            const posZ = (z - halfZ) * spacing;

            dummy.position.set(posX, 0, posZ);
            dummy.updateMatrix();
            instancedMesh.setMatrixAt(i, dummy.matrix);
            instancedMesh.setColorAt(i, baseColor);

            instanceData.push({
                x: posX,
                z: posZ,
                targetY: 0,
                currentY: 0
            });
            i++;
        }
    }
    instancedMesh.instanceMatrix.needsUpdate = true;
    instancedMesh.instanceColor.needsUpdate = true;

    // Mouse Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1000, -1000);
    const targetMouseWorld = new THREE.Vector3(0, 0, 0);
    const currentMouseWorld = new THREE.Vector3(0, 0, 0);

    const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
    planeGeometry.rotateX(-Math.PI / 2);
    const invisiblePlane = new THREE.Mesh(planeGeometry, new THREE.MeshBasicMaterial({visible: false}));
    scene.add(invisiblePlane);

    const handleMouseMove = (e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleTouchMove = (e) => {
        if(e.touches.length > 0) {
            mouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
        }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    const clock = new THREE.Clock();
    let animationFrameId;

    function animate() {
        const elapsedTime = clock.getElapsedTime();

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(invisiblePlane);

        if(intersects.length > 0) {
            targetMouseWorld.copy(intersects[0].point);
        } else {
            targetMouseWorld.lerp(new THREE.Vector3(0, 0, 0), 0.01);
        }

        currentMouseWorld.lerp(targetMouseWorld, 0.1);

        pointLight.position.x = currentMouseWorld.x + 2;
        pointLight.position.z = currentMouseWorld.z + 2;
        pointLight2.position.x = currentMouseWorld.x - 2;
        pointLight2.position.z = currentMouseWorld.z - 2;

        let id = 0;
        for(let x = 0; x < gridX; x++) {
            for(let z = 0; z < gridZ; z++) {
                const data = instanceData[id];

                const dx = data.x - currentMouseWorld.x;
                const dz = data.z - currentMouseWorld.z;
                const dist = Math.sqrt(dx*dx + dz*dz);

                const maxRadius = 8;
                let hoverOffset = 0;
                if (dist < maxRadius) {
                    const effect = (Math.cos((dist / maxRadius) * Math.PI) + 1) / 2;
                    hoverOffset = effect * 3.0;
                }

                const waveOffset = Math.sin(data.x * 0.2 + elapsedTime * 1.5) * Math.cos(data.z * 0.2 + elapsedTime * 1.5) * 0.8;

                data.targetY = hoverOffset + waveOffset;
                data.currentY += (data.targetY - data.currentY) * 0.12;

                dummy.position.set(data.x, data.currentY, data.z);

                dummy.rotation.x = data.currentY * 0.15;
                dummy.rotation.z = -data.currentY * 0.15;
                dummy.rotation.y = data.currentY * 0.1;

                dummy.updateMatrix();
                instancedMesh.setMatrixAt(id, dummy.matrix);

                const intensity = Math.max(0, hoverOffset / 3.0);
                color.copy(baseColor).lerp(hoverColor, intensity + (data.currentY * 0.05));
                instancedMesh.setColorAt(id, color);

                id++;
            }
        }

        instancedMesh.instanceMatrix.needsUpdate = true;
        instancedMesh.instanceColor.needsUpdate = true;

        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
        
        if (mount.contains(renderer.domElement)) {
            mount.removeChild(renderer.domElement);
        }
        
        geometry.dispose();
        material.dispose();
        renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: zIndex,
        pointerEvents: 'none', // Allow clicks to pass through to UI
        overflow: 'hidden'
      }}
    />
  );
}
