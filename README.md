# Overview
FocusFlow is a simple To-Do List web-app project that I created using vanilla Javascript when doing The Odin Project Course.

- This is the console version of the web-app.
- Used Webpack for bundling together all the files used to create this project.
- The output `index.html` & `bundle.js` are stored in the `dist/` directory.
- Todolist is also saved locally in user's browser cache.
- GUI version soon!

# Additional Details
- A Named IIFE `todolist` is exposed globally which returns an object with bunch of useful functions, allowing me to test the core logic.
- Tasks can be created using `todolist.create(args)` with `args` being all properties of task as a string.
  - for example: `todolist.create("Attend the Event", "2023-08-01T05:10")`
- The duedate passed as an argument is formatted just how as the value stored by the `<input type="datetime-local">`
- After every browser re-open/refresh, tasks objects are automatically added back to the todolist from the localStorage.