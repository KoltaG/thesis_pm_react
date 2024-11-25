# Vite + React.js Project Setup Guide

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v20+)
- [Yarn](https://yarnpkg.com/)

## Steps to Set Up and Run the Project

1. Clone the repository and navigate into the project directory:

   ```bash
   git clone https://github.com/KoltaG/thesis_pm_react.git
   cd thesis_pm_react
   ```

2. Install dependencies using Yarn:

   ```bash
   yarn
   ```

3. Start the development server:

   ```bash
   yarn dev
   ```

4. Open your browser and navigate to the URL provided by Vite, typically:
   ```
   http://localhost:5173
   ```

## Additional Commands

### Build for Production

To create a production build of the project:

```bash
yarn build
```

The build output will be generated in the `dist` directory.

### Preview Production Build

To preview the production build locally:

```bash
yarn preview
```

This will serve the contents of the `dist` folder.

## Project Structure

- `src/`: Contains the main application code (components, hooks, etc.).
- `public/`: Static assets that are served as-is.
- `dist/`: Generated after building the project, contains the production-ready code.

## Notes

- Edit `vite.config.js` to configure the Vite development server and other build settings.
- Ensure that any environment variables are defined in a `.env` file.

---

For further assistance, check the [Vite Documentation](https://vitejs.dev/) or [React Documentation](https://reactjs.org/).
