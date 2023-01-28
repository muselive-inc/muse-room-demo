import React, { Suspense, useEffect, useRef } from 'react';
import './App.css';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import RoomModel from './models/musician_room.glb';
import SampleAudio from './audio/audio.mp3';


function Room() {
  // const group = useRef();
  
  const { scene, animations } = useGLTF(RoomModel, true) as GLTF;
  const mixer = new THREE.AnimationMixer(scene);
  // const { ref, actions, mixer, clips } = useAnimations(animations, scene);

  useFrame((state, delta) => {
    mixer.update(delta);
  })

  useEffect(() => {
    animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.play();
    })
  }, [mixer]);

  return (
    <Suspense fallback={null}>
      <primitive animated={true} object={scene} />
    </Suspense>
  )
}

function App() {
  

  return (
    <div className="App">
      <audio src={SampleAudio} autoPlay={true} />
      <Canvas
        style={{
          height: '100vh'
        }}
        camera={{
          position: [10, 5, -10]
        }}
      >
      <directionalLight position={[130, 100, -100]} />
      <pointLight color="#f6f3ea" position={[2, 0, 2]} intensity={1} />
        <Room />
        <OrbitControls
          enableZoom={true}
          // enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.4}
        />
      </Canvas>
    </div>
  );
}

export default App;
