# logistic-demo

demo for logistic proof and concepts


### env setup

1, after clone to local, install all dependencies, run
```bash
npm i
```

2, start the mock server for getting data, run
```bash
npm run serve-json
```

3, start the project, run
```bash
npm start
```




### Technology Stack

1. React - A JavaScript library for building user interfaces specifically for single-page applications.

2. React Router - Is the standard routing library for React

3. React-Redux - Let react components talk to the redux store, by using useSelector and useDispatch

4. React-toolkit - Wraps around the Redux core and provides API to simplify common Redux use cases, a toolset for speeding up development.

5. Ant Design - Is a React UI framework that contains easy-to-use components which are useful for building interactive user interfaces.

6. Axios - Axios is an HTTP client library that allows to make requests to a given endpoint.

7. Jspdf/antd-table-export - npm pacakage for for exporting PDF and excel

8. Webpack, babel, ES6 - Is Preconfigured and is internal through create-react-app

9. Customized Theme configuration changes

Scripts

1. npm start
   Runs the app in the development mode.
   Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

2. npm run serve-json
   Runs the JSON server so that the End points can be generated and available for data fetching through AXIOS
