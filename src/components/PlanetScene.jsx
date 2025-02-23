import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';


const PlanetScene = () => {
  const mountRef = useRef(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    // Handle resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(40, windowSize.width / windowSize.height, 0.1, 1000);
    camera.position.z = 8;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(windowSize.width, windowSize.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
   
    // HDRI Environment setup
    const hdriLoader = new RGBELoader();
    hdriLoader.load("https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/rogland_clear_night_2k.hdr", (hdriTexture) => {
      hdriTexture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = hdriTexture;
    });

    // Planet setup
    const radius = windowSize.width < 768 ? 1 : 1.5; // Smaller radius for mobile
    const widthSegments = 64;
    const heightSegments = 64;
    const orbitaRadius = windowSize.width < 768 ? 4 : 6; // Smaller orbit for mobile
    const spheres = new THREE.Group();
    const textures = ["/csilla/color.png","/earth/map.jpg","/venus/map.jpg","/volcanic/color.png"];

    // Create a large sphere for stars
    const starTexture = new THREE.TextureLoader().load("/stars.jpg");
    starTexture.colorSpace = THREE.SRGBColorSpace;
    const starGeometry = new THREE.SphereGeometry(50, 64, 64);
    const starMaterial = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: 0.7,
      map: starTexture,
      side: THREE.BackSide
    });
    const starShpere = new THREE.Mesh(starGeometry, starMaterial);
    scene.add(starShpere);
    
    for(let i = 0; i < 4; i++) {
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(textures[i]);
      texture.colorSpace = THREE.SRGBColorSpace;

      const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
      const material = new THREE.MeshStandardMaterial({map: texture});
      var planet = new THREE.Mesh(geometry, material);
      scene.add(planet);
     
      const angle = (i/4) * (Math.PI * 2);
      planet.position.x = orbitaRadius * Math.cos(angle);
      planet.position.z = orbitaRadius * Math.sin(angle);

      spheres.add(planet);
    }

    spheres.position.y = windowSize.width < 768 ? 0 : -0.5; // Adjust vertical position for mobile
    spheres.rotation.x = 0.2;
    scene.add(spheres);

    // Update on resize
    const handleSceneResize = () => {
      camera.aspect = windowSize.width / windowSize.height;
      camera.updateProjectionMatrix();
      renderer.setSize(windowSize.width, windowSize.height);
    };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Call resize handler when window size changes
    handleSceneResize();
    window.addEventListener('resize', handleSceneResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', handleSceneResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [windowSize]); // Re-run effect when window size changes

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100vh",
        maxWidth: "100vw",
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
        touchAction: "none"
      }}
    ></div>
  );
};

export default PlanetScene;
