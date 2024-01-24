import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import CanvasRenderer from "~/components/threeComponents/canvas";

export default component$(() => {
  return (
    <CanvasRenderer
      canvas={
        <canvas width="800" height="600">
          <scene hasOrbitControl={true}>
            <mesh>
              <boxGeometry width="1" height="1" depth="1" />
              <meshBasicMaterial color="red" wireframe={true} />
            </mesh>
            <perspectiveCamera fov="75" pos={[0, 0, 5]} />
          </scene>
        </canvas>
      }
    />
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
