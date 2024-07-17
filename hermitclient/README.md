# Gamer Rater Client with Vite+Tailwind CSS

This project was created with a tool named Vite. The React code is exactly like the code that you learned how to write. The only difference is that your files will have the extension of **_.jsx_** instead of **_.js_**.

## How This Was Generated

For convience sake, most of the setup was copied from another project, including this readme.

To use Vite+Tailwind in any future project, here are the steps you can follow.

1. `mkdir rock-client && cd rock-client`
2. `npm create vite@latest . -- --template react`
3. `npm install -D tailwindcss postcss autoprefixer react-router-dom`
4. `npx tailwindcss init -p`
5. Replace the contents of `tailwind.config.js` with the following.
   ```js
   /** @type {import('tailwindcss').Config} */
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```
6. Replace the contents of `index.css`
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
7. Run with `npm run dev`

## Reference Links

- [Getting Started with Vite](https://vitejs.dev/guide/)
- [Install Tailwind CSS with Vite](https://tailwindcss.com/docs/guides/vite)
