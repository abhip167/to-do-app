# To-Do App by Abhishek Patel

# Deployed version

[**Live Demo Url** ](https://link-url-here.org)

# Features

![Application homepage!](/documentation/homepage.png)

This is a To-Do App project submitted to Delasie Torkornoo.
The To-Do app contains basic implementation with below features :

1. Read, Write and delete a task
2. Sorting task list alphabetically
3. Search a task
4. Input field validation
5. Persistent list with localStorage

# Developer Notes

## Installation

- Dependencies - Node.js

- Download the project zip
- Navigate into the project
- Open command prompt, we can use npm, yarn or pnpm
- Run below command to serve the project

  - `npm install`
  - `npm run dev`

- This will open serve the project and we can see the webpage url in commond prompt. eg: http://127.0.0.1:5173/

- To run the E2E test cases (code inside /cypress folder)

  - `npm run cypress:open` This will open cypress electron app and we can run tests in it.
  - `npm run test` to show output in command line

## Deploy build files

- We will generate build files in dist folder by running the command `npm run build`. Once done, we shall now see a dist folder with index.html file
- In order to deploy, we can deploy it on static file server by simply copying the contents of the dist folder in the root of the server.

![Application Flow Chart!](/documentation/github-action.png)

- We have deployed the current application on azure, with the help of github actions which builds the project on each commit and deploys it to a static file server.

## Build docker container

- To build the docker image, we create a configuration file.
- The file can be divided into two steps

  1. Build the Vuejs project
  2. Serve the project on NGINX

- There is already a Dockerfile created in the project root.
- We shall now build an image named To-Do-App-Vue with command

  - `docker build -t to-do-app-vue .`
  - (do not forget the dot at the end)

- To start the container, run
  - `docker run --rm -it -p 8080:80 to-do-app-vue`
  - Change the port available according to your system the format is **_HostPort:ContainerPort_**

## Tech Stack

![Application Flow Chart!](/documentation/flow-to-do.svg)

- **Vue.js** is choosen as a front-end framework and pinia as a state management library which is a recommeneded one for Vue3 composition API
- The state is made persistent with **local-storage**. Further, it can be consumed by a REST API in order to make it scalable.
- **PrimeVue** is a component library which offers good input elements and buttons in our case.
- **Vuelidate** is a validation library. Although, we can develop our own validators, vuelidate does a good job of handling button events like focus, blur and displaying error messages.

## Seaching and Sorting

![Snapshot!](/documentation/search-and-sort.png)

- The application contains a search bar which filters out contents based on the search.
- We can also sort the task alphabetically and in reverse manner through the sorting button.
- **Tri-State Button** - is a re-usable component which changes state on each click, as of now we have used it to sort alphabetically.

```js
const filteredList = computed(() => {
  const filtered =
    store.todoList.filter((el) =>
      el.content.toLowerCase().includes(nameFilter.value.toLowerCase())
    ) || null;

  return filterType.value ? filtered.sort(compare) : filtered;
});
```

## Running E2E tests with cypress UI

- We have used **Cypress** for end-to-end testing. We can run tests by executing below command once cypress is installed in our system.

  - `npm run cypress:open` - it might take a while depending upon system configuration

![Snapshot!](/documentation/cypress.png)

- Once it is openend, click on **E2E Testing** to see the tests

![Snapshot!](/documentation/tests.png)

- We can see the tests written for the project as shown in above image.

![Snapshot!](/documentation/cypress-ui.png)

- We can click on any test file and it shall execute as in the above image.

## Running E2E tests with cypress command line

- To run all the tests, execute the command, which should show the output as below
  - `npm run test`

```
====================================================================================================

  (Run Starting)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Cypress:        10.10.0                                                                        │
  │ Browser:        Electron 106 (headless)                                                        │
  │ Node Version:   v16.17.1 (C:\Program Files\nodejs\node.exe)                                    │
  │ Specs:          3 found (sort.cy.js, spec.cy.js, validation.cy.js)                             │
  │ Searched:       cypress/e2e/**/*.cy.{js,jsx,ts,tsx}                                            │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


────────────────────────────────────────────────────────────────────────────────────────────────────

  Running:  sort.cy.js                                                                      (1 of 3)


  Sort List
    √ Writes 4 new tasks (3085ms)
    √ Sort A->Z (192ms)
    √ Sort Z->A (153ms)


  3 passing (6s)


  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        3                                                                                │
  │ Passing:      3                                                                                │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        true                                                                             │
  │ Duration:     6 seconds                                                                        │
  │ Spec Ran:     sort.cy.js                                                                       │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
```

- If all tests are passed it should show result as below

```
====================================================================================================

  (Run Finished)


       Spec                                              Tests  Passing  Failing  Pending  Skipped
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ √  sort.cy.js                               00:05        3        3        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  spec.cy.js                               00:05        9        9        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  validation.cy.js                         00:02        1        1        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    √  All specs passed!                        00:14       13       13        -        -        -
```
