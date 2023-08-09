# Overview

FocusFlow is a simple **To-Do List web-app** project that I **created using vanilla Javascript** when doing The Odin Project Course.

<h3><a href="https://yash-aryan.github.io/FocusFlow/" target="_blank">View Live Demo</a></h3>

- This is the work-in-progress GUI version of the web-app.
- **Utilized Webpack** for bundling together all the files used to create this project.
- The output `index.html` & `bundle.js` are stored in the `dist/` directory.
- All of my files used to create `bundle.js` are stored in the `src/` directory.
- Todolist is also saved locally in user's browser cache.

# Additional Details

- `index.js` dictates the flow of events, as it applies eventListeners to concerning DOM elements.
- Other JavaScript files are seperated to be a module that performs one specific task. For example:
  - `domHandler.js` exports functions that deals with DOM manipulation.
  - `taskFactory.js` exports a factory function that creates task objects.
  - `storageHandler.js` exports useful functions to deal with specified storage implementation (Currently only localStorage).
  - `todolistHandler.js` exports todolist function that maintains tasks in a main array, which can be filtered & looped over.
- Tasks can be created via the "Add New Task" Button, which opens up a form that gets the inputs.
- After every browser re-open/refresh, tasks objects are automatically added back to the todolist from the localStorage.

# Project Status

- [x] Create Basic GUI
- [x] Create Function to Add New Tasks
- [x] Create Function to Toggle Task Status
- [x] Create Function to View All Tasks of Same Project
- [x] Create Function to View Task Info
- [ ] Create Function to Edit Task
- [ ] Create Function to Delete Task
