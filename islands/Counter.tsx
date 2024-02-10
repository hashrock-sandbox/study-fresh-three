import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";

import * as THREE from "three";
import { useEffect, useRef, useState } from "preact/hooks";

interface CounterProps {
  count: Signal<number>;
}

export default function Counter(props: CounterProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const [zoom, setZoom] = useState(5);

  useEffect(() => {
    const scene = new THREE.Scene();
    const window = globalThis.window;
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    cameraRef.current = camera;
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    }

    animate();
  }, []);

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.z = zoom;
      console.log("cameraRef.current.position.z", cameraRef.current.position.z);
    }
  }, [zoom]);

  return (
    <div class="flex gap-8 py-6">
      <Button onClick={() => setZoom((zoom) => zoom - 1)}>-</Button>
      <p class="text-3xl tabular-nums">Z = {zoom}</p>
      <Button onClick={() => setZoom((zoom) => zoom + 1)}>+</Button>
    </div>
  );
}
