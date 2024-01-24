# Qwik + ThreeJS ⚡️

---

## Why do this

Wanted to see if I could consume ThreeJs in Qwik in a component style fashion, similar to how we consume 'react-three-fiber
' in react. This is just a first iteration to see how that can be achieved, and it just rendering a red cube in the canvas.

```js
<CanvasRenderer
  canvas={
    <canvas width="800" height="600">
      <scene>
        <mesh wireFrame={true}>
          <boxGeometry width="1" height="1" depth="1" />
          <meshBasicMaterial color="red" />
        </mesh>
        <perspectiveCamera fov="75" pos={[0, 0, 5]} />
      </scene>
    </canvas>
  }
/>
```

## Project Structure

This project is using Qwik with [QwikCity](https://qwik.builder.io/qwikcity/overview/). QwikCity is just an extra set of tools on top of Qwik to make it easier to build a full site, including directory-based routing, layouts, and more.

Inside your project, you'll see the following directory structure:

```
├── public/
│   └── ...
└── src/
    ├── components/
    │   └── ...
    └── routes/
        └── ...
```

- `src/routes`: Provides the directory-based routing, which can include a hierarchy of `layout.tsx` layout files, and an `index.tsx` file as the page. Additionally, `index.ts` files are endpoints. Please see the [routing docs](https://qwik.builder.io/qwikcity/routing/overview/) for more info.

- `src/components`: Recommended directory for components.

- `public`: Any static assets, like images, can be placed in the public directory. Please see the [Vite public directory](https://vitejs.dev/guide/assets.html#the-public-directory) for more info.

## Development

Development mode uses [Vite's development server](https://vitejs.dev/). The `dev` command will server-side render (SSR) the output during development.

```shell
npm run dev # or `yarn dev`
```
