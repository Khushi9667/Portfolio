import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

export default function Butterfly(props) {
  const group = useRef();
  const { nodes, materials, animations, scene } = useGLTF("/scene.gltf");
  const { actions } = useAnimations(animations, group);
  const butterflyColor = "#f9dd90";

  useEffect(() => {
    let flapAction = null;
    if (actions && Object.keys(actions).length > 0) {
      const flapAnimation = Object.keys(actions)[0];
      flapAction = actions[flapAnimation];
      flapAction.reset(); 
      flapAction.setLoop(THREE.LoopRepeat, Infinity); 
      flapAction.timeScale = 0.65; 
      flapAction.play();
    }

    if (scene) {
      scene.traverse((object) => {
        if (object.isMesh && object.material) {
          object.material.color = new THREE.Color(butterflyColor);
          object.material.roughness = 0.1;
          object.material.metalness = 0.2; 
          object.material.needsUpdate = true;
        }
      });
    }  

    group.current.position.set(-6.5, -2.5, 1);

    gsap.to(scene.position, {
      y: "random(-0.5, 0.5)", 
      x: "random(-0.2, 0.2)",
      duration: 2, 
      repeat: -1, 
      yoyo: true, 
      ease: "sine.inOut" 
    });

    const tl = gsap.timeline(); 
    const rotTl = gsap.timeline();

    tl.to(group.current.position, { x: -5, y: -2.5, z: 1, duration: 4, ease: "power1.inOut" })
    .to(group.current.position, { x: -3, y: -3, z: 0.75, duration: 4, ease: "none" })
    .to(group.current.position, { x: -1, y: -2, z: 1, duration: 6, ease: "none" })
    .to(group.current.position, { x: 1, y: -1, z: 1, duration: 4, ease: "none" })
    .to(group.current.position, { x: 2, y: -1.5, z: 1, duration: 4, ease: "none" })
    .to(group.current.position, { x: 4, y: -2.5, z: 1, duration: 4, ease:"none"})
    .to(group.current.position, { x: 6, y: -2, z: 1.5, duration: 4, ease: "none" })
    .to(group.current.rotation, { y: Math.PI, z: 0.4, duration: 4, ease: "none" }, ">") 
    .to(group.current.position, { x: 4, y: -2, z: 1, duration: 6, ease: "none" })
    .to(group.current.position, { x: 2, y: -1.75, z: 1, duration: 6, ease: "none" })
    .to(group.current.position, { x: 0, y: -2, z: 1, duration: 6, ease: "none" })
    .to(group.current.position, { x: -2, y: -2.2, z: 1, duration: 6, ease: "none" })
    .to(group.current.position, { x: -4, y: -2.4, z: 1, duration: 6, ease: "none" })
    .to(group.current.position, { x: -5, y: -2.6, z: 1, duration: 4, ease: "none" })
    .to(group.current.position, { x: -6, y: -2.5, z: 1, duration: 6, ease: "power2.out" })
    .to(group.current.rotation, { y: Math.PI / 2, z: 0.2, duration: 4, ease: "none" })
    .to(group.current.rotation, { x: 0, y: 0, z: 0, duration: 4, ease: "power2.out" });

    return () => {
      tl.kill();
      rotTl.kill();
    };
  }, [actions, scene, butterflyColor]); 

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} rotation={[0, -Math.PI / 2, 0]}/>
    </group>
  );
}

useGLTF.preload("/scene.gltf");