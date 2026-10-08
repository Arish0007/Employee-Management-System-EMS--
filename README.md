# Employee Management System

A React and Vite demo for managing employees and team assignments.

## Features

- Separate administrator and employee dashboards
- Create employee accounts, update employee details, pause/reactivate access, and remove accounts
- Create, edit, reassign, and remove tasks
- Employee task actions, rejection reasons, completion notes, and comments
- A simple team workload summary
- Persisted light/dark theme

## Run locally

```sh
npm install
npm run server
```

In a second terminal:

```sh
npm run dev
```

Use `npm run lint` for lint checks and `npm run build` for a production build.

## Storage and security

The app saves employee accounts and their tasks to `data/employees.json` through
the local API. That file is created the first time the app connects to the API
and is ignored by Git to avoid committing locally stored account data. The app
also keeps a browser `localStorage` copy. If the API is unavailable, browser
changes remain available locally and the app displays a warning.

Demo passwords are stored in plaintext, so do not use real employee credentials
or sensitive data. A production deployment needs authentication and access
controls.
