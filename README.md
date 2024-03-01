# Overview

FocusFlow is a simple **To-Do List web-app** project that I **created using vanilla Javascript** when doing The Odin Project Course.

### [View Live Demo](https://yash-aryan.github.io/FocusFlow/)

-   This is the GUI version of the FocusFlow web-app.
-   **Utilized Webpack** for bundling together all the files used to create this project.
-   **Utilized Date-fns** as dev-dependency to format date from ISO format to a better human-readable format.
-   The output `index.html` & `bundle.js` are stored in the `dist/` directory.
-   All of my files used to create `bundle.js` are stored in the `src/` directory.
-   After every browser re-open/refresh, tasks objects are automatically added back to the todolist from the localStorage.
-   I have tried giving more emphasis to decouple the code.

## Additional Details

-   `index.js` deals with event handeling, and dictates the flow of events.
-   Modules contained inside `dom-handlers/` directory deals with DOM manipulation of their own specific elements.
-   `todolistHandler.js` deals with persistance & modification of todolist and it's contained tasks. It also has exclusive access to:
    -   `storageFactory` function, which deals with the storage implementation that has been applied. Current storage implementation is just the browser's localStorage.
    -   `taskFactory` function to create task objects.

## Project Status

-   [x] Create Basic GUI
-   [x] Create Function to Add New Tasks
-   [x] Create Function to Toggle Task Status
-   [x] Create Function to View All Tasks of Same Project
-   [x] Create Function to View Task Info
-   [x] Create Function to Edit Task
-   [x] Create Function to Delete Task
-   [x] Update UI's Visual Design
-   [ ] Responsive UI
