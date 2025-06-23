import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import gsap from "gsap";

const PlanetScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
    // Camera position is set dynamically in handleResize

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);
   
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
     
    const spheresMesh = [];
    const spheres = new THREE.Group();
    const textures = ["/earth/map.jpg", "/csilla/color.png", "/venus/map.jpg", "/volcanic/color.png"];
    
    const textureLoader = new THREE.TextureLoader();
    const widthSegments = 64;
    const heightSegments = 64;

    for(let i = 0; i < textures.length ; i++) {
      const texture = textureLoader.load(textures[i]);
      texture.colorSpace = THREE.SRGBColorSpace;

      // Create with a base radius of 1, will be scaled in handleResize
      const geometry = new THREE.SphereGeometry(1, widthSegments, heightSegments);
      const material = new THREE.MeshStandardMaterial({map: texture});
      const planet = new THREE.Mesh(geometry, material);

      spheresMesh.push(planet);
      spheres.add(planet);
    }

    spheres.rotation.x = 0.19;
    scene.add(spheres);

    // Scroll event handling
    let lastScrollTime = 0;
    const scrollThrottleDelay = 1500;
    let scrollCount = 0;

    // Touch event variables
    let touchStartY = null;
    let touchEndY = null;

    const triggerScroll = (direction) => {
      const currentTime = Date.now();
      if (currentTime - lastScrollTime < scrollThrottleDelay) return;

      const isAnimating = gsap.isTweening(spheres.rotation) || gsap.isTweening(".heading");
      if (isAnimating) return;

      lastScrollTime = currentTime;
      const nextScrollCount = scrollCount + direction;

      if (nextScrollCount < 0 || nextScrollCount >= textures.length) {
        return;
      }

      scrollCount = nextScrollCount;

      const headings = document.querySelectorAll(".heading");

      gsap.to(headings, {
        duration: 1,
        y: `${scrollCount * -120}%`,
        ease: "power2.inout"
      });

      gsap.to(spheres.rotation, {
        duration: 1.5,
        y: scrollCount * -(Math.PI / 2),
        ease: "power2.inOut"
      });
    };

    const handleWheel = (event) => {
      const direction = event.deltaY > 0 ? 1 : -1;
      triggerScroll(direction);
    };

    // Touch event handlers for mobile
    const handleTouchStart = (event) => {
      if (event.touches && event.touches.length === 1) {
        touchStartY = event.touches[0].clientY;
      }
    };

    const handleTouchEnd = (event) => {
      if (touchStartY === null) return;
      // Use changedTouches for touchend
      const endY = (event.changedTouches && event.changedTouches[0].clientY) || null;
      if (endY === null) return;
      touchEndY = endY;
      const deltaY = touchEndY - touchStartY;
      if (Math.abs(deltaY) > 40) { // Minimum swipe distance
        const direction = deltaY > 0 ? -1 : 1; // Swipe up = next, down = previous
        triggerScroll(direction);
      }
      touchStartY = null;
      touchEndY = null;
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth;
      let radius, orbitaRadius;

      if (width < 768) { // Mobile
        radius = 1.7;
        orbitaRadius = 4;
        camera.position.z = 12;
        camera.position.y = 2;
        spheres.position.y = 0;
      } else if (width < 1024) { // Tablet
        radius = 1.5;
        orbitaRadius = 5;
        camera.position.z = 10;
        camera.position.y = 1;
        spheres.position.y = -0.2;
      } else { // Desktop
        radius = 1.5;
        orbitaRadius = 5.7;
        camera.position.z = 8;
        camera.position.y = 0;
        spheres.position.y = -0.5;
      }

      // Update planet scale and position
      spheresMesh.forEach((planet, i) => {
        planet.scale.set(radius, radius, radius);
        const angle = (i / 4) * (Math.PI * 2);
        planet.position.x = orbitaRadius * Math.cos(angle);
        planet.position.z = orbitaRadius * Math.sin(angle);
      });

      // Update camera
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call to set responsive values

    const clock = new THREE.Clock();
    let animationFrameId;
    // Animation loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      for(let i = 0; i < spheresMesh.length; i++){
        const sphere = spheresMesh[i];
        sphere.rotation.y  = elapsedTime * 0.05;
      }
      renderer.render(scene, camera);
    };
    animate();
 
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      
      cancelAnimationFrame(animationFrameId);
      currentMount.removeChild(renderer.domElement);
      renderer.dispose();

      scene.traverse(object => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, []); // Run effect only once on mount

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%",
        // maxWidth: "100vw",
        // position: "fixed",
        zIndex:0,
        top: 0,
        left: 0,
        // touchAction: "none"
      }}
    ></div>
  );
};

export default PlanetScene;
