import type { JSXNode, JSXOutput } from "@builder.io/qwik";
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import * as THREE from "three";

function capitalize(str: string) {
  const result = [...str]
    .map((char, index) => (index === 0 ? char.toUpperCase() : char))
    .join("");

  return result;
}

function addChildrens(
  dataObj: Record<string, {} | string | []>,
  elmTree: JSXNode<Element>
) {
  // console.log(dataObj, "dataObj");
  // console.log(elmTree, "elmTree");
  dataObj.childrens = [];
  const childrens = Array.isArray(elmTree.children)
    ? elmTree.children
    : [elmTree.children];
  // @ts-ignore
  childrens.forEach((chld: any) => {
    const elmObj = {
      type: chld.type,
      props: chld.props,
    };
    if (chld.children) {
      addChildrens(elmObj, chld);
    } else {
      // @ts-ignore
      elmObj.childrens = [];
    }
    //@ts-ignore
    dataObj.childrens.push(elmObj);
  });
}

const CanvasRenderer = component$(({ canvas }: { canvas: JSXOutput }) => {
  const outputRef = useSignal<HTMLCanvasElement>();
  const sceneEL = (canvas as JSXNode<Element>).children as JSXNode<Element>;

  console.log(sceneEL, "sceneEL");
  const sceneObj: Record<string, {} | string | []> = {};
  sceneObj.type = sceneEL.type;

  addChildrens(sceneObj, sceneEL);
  // console.log(sceneObj, "sceneObj");

  const canvasEls = useSignal(sceneObj);
  // console.log(canvasEls.value, "canvasEls");

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const sizes = {
      width: 800,
      height: 600,
    };

    // @ts-ignore
    if (canvasEls.value.type == "scene" && outputRef.value) {
      const sc = capitalize(canvasEls.value.type as string);
      // creating a scene
      // @ts-ignore
      const scene = new THREE[sc]();
      let camera = null;
      // @ts-ignore
      canvasEls.value.childrens.forEach((el: any) => {
        const elType = capitalize(el.type as string);
        const elChld: any = [];
        if (el.childrens.length > 0) {
          el.childrens.forEach((chld: any) => {
            const chldType = capitalize(chld.type as string);
            if (chldType.includes("Material")) {
              // @ts-ignore
              const material = new THREE[chldType]({
                color: chld.props.color,
              });
              elChld.push(material);
            } else {
              const { width, height, depth } = chld.props;
              // @ts-ignore
              const geometry = new THREE[chldType](width, height, depth);
              elChld.push(geometry);
            }
          });
        }
        if (elType.includes("Camera")) {
          elChld.push(el.props.fov);
          elChld.push(sizes.width / sizes.height);
        }
        if (elType.includes("Mesh")) {
          elChld.push(el.props.fov);
          elChld.push(sizes.width / sizes.height);
        }
        // @ts-ignore
        const newEL = new THREE[elType](...elChld);
        if (elType.includes("Camera")) {
          newEL.position.z = el.props.pos[2];
          camera = newEL;
        }
        // add to scene
        // @ts-ignore
        scene.add(newEL);
      });

      const canvas = outputRef.value;
      // renderer
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
      });

      // set size for the renderer
      renderer.setSize(sizes.width, sizes.height);

      // render the scene
      //@ts-ignore
      renderer.render(scene, camera);
    }
  });

  return <canvas class="webgl" ref={outputRef}></canvas>;
});

export default CanvasRenderer;
