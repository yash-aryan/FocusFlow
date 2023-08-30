# Overview

FocusFlow is a simple **To-Do List web-app** project that I **created using vanilla Javascript** when doing The Odin Project Course.

<h3><a href="https://yash-aryan.github.io/FocusFlow/" target="_blank">View Live Demo</a></h3>

-   This is the work-in-progress GUI version of the web-app.
-   **Utilized Webpack** for bundling together all the files used to create this project.
-   **Utilized Date-fns** as dev-dependency to format date from ISO format to a better human-readable format.
-   The output `index.html` & `bundle.js` are stored in the `dist/` directory.
-   All of my files used to create `bundle.js` are stored in the `src/` directory.
-   After every browser re-open/refresh, tasks objects are automatically added back to the todolist from the localStorage.

# Additional Details

-   `index.js` dictates the flow of events, as it applies eventListeners to certain DOM elements.
-   Other JavaScript files are seperated to be a module that performs one specific task. For example:
    -   `taskFactory.js` exports a factory function which inputs user selected 'task' data & outputs 'task' Objects.
    -   `domHandler.js` exports functions that deals with DOM manipulation, actually creating/modifying/removing nodes in the DOM.
    -   `todolistHandler.js` exports todolist function that deals with maintaing tasks for persistance & rapid modification.
        -   Has exclusive access to `storageFactory` function, which deal with & abstracts away any external storage API or methods. Currently only uses browser's localStorage.

# Project Status

-   [x] Create Basic GUI
-   [x] Create Function to Add New Tasks
-   [x] Create Function to Toggle Task Status
-   [x] Create Function to View All Tasks of Same Project
-   [x] Create Function to View Task Info
-   [x] Create Function to Edit Task
-   [x] Create Function to Delete Task
-   [ ] Update UI's Visual Design
