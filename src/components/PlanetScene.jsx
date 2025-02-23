import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import gsap from "gsap";

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
    hdriLoader.load("https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/moonless_golf_2k.hdr", (hdriTexture) => {
      hdriTexture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = hdriTexture;
      
      // Add ambient light for overall scene brightness
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);

      // Add directional light for highlights
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(10, 10, 10);
      scene.add(directionalLight);
    });

    const spheresMesh = [];

    // Planet setup
    const radius = windowSize.width < 768 ? 1 : 1.5; // Smaller radius for mobile
    const widthSegments = 64;
    const heightSegments = 64;
    const orbitaRadius = windowSize.width < 768 ? 4 : 5.7; // Smaller orbit for mobile
    const spheres = new THREE.Group();
    const textures = ["/csilla/color.png","/earth/map.jpg","/venus/map.jpg","/volcanic/color.png"];

    // Create a large sphere for stars
    const starTexture = new THREE.TextureLoader().load("/stars.jpg");
    starTexture.colorSpace = THREE.SRGBColorSpace;
    const starGeometry = new THREE.SphereGeometry(50, 64, 64);
    const starMaterial = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: 0.9,
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

      spheresMesh.push(planet);
     
      const angle = (i/4) * (Math.PI * 2);
      planet.position.x = orbitaRadius * Math.cos(angle);
      planet.position.z = orbitaRadius * Math.sin(angle);
    
      spheres.add(planet);
    }

    spheres.position.y = windowSize.width < 768 ? 0 : -0.5; // Adjust vertical position for mobile
    spheres.rotation.x = 0.19;
    scene.add(spheres);


       // Throttle function to limit scroll event handling
   let lastScrollTime = 0;
   const scrollThrottleDelay = 2000; // Adjust this value to control throttle delay
   let scrollCount = 0;

   const handleWheel = (event) => {
     const currentTime = Date.now();
     if (currentTime - lastScrollTime >= scrollThrottleDelay) {
       // Your scroll handling logic here
       const direction = event.deltaY > 0 ? "down" : "up";
       scrollCount = (scrollCount + 1) % 4;

       console.log(direction)
       lastScrollTime = currentTime;
       
       const headings = document.querySelectorAll(".heading");
      
        gsap.to(headings, {
          duration: 1,
          y: `-=${100}%`,
          ease: "power2.inout"
         })
       
          gsap.to(spheres.rotation, {
            duration: 1,
            y: `-=${Math.PI/2}`,
            ease: "power2.inOut"
          })

       if(scrollCount === 0){
        gsap.to(headings, {
          duration: 1,
          y: `0`,
          ease: "power2.inout"
        })
        
      
       }
     }
   };

   window.addEventListener('wheel', handleWheel);
   window.addEventListener('scroll', handleWheel);

    // Update on resize
    const handleSceneResize = () => {
      camera.aspect = windowSize.width / windowSize.height;
      camera.updateProjectionMatrix();
      renderer.setSize(windowSize.width, windowSize.height);
    };

    const clock = new THREE.Clock();
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      for(let i = 0; i < spheresMesh.length; i++){
        const sphere = spheresMesh[i];
        sphere.rotation.y  = clock.getElapsedTime() * 0.02;
      }
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
