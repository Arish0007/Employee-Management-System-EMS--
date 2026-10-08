# Employee Management System

A React and Vite demo for managing employees and team assignments.

## Features

- Separate administrator and employee dashboards
- Create employee accounts, update employee details, pause/reactivate access, and remove accounts
- Create, edit, reassign, and remove tasks
- Employee task actions, rejection reasons, completion notes, and comments
- A simple team workload summary
- Profile photos and persisted light/dark themes

## Run locally

```sh
npm install
npm run dev
```

Use `npm run lint` for lint checks and `npm run build` for a production build.

## Storage and security

This is a browser-only demo. Employee accounts, tasks, comments, and profile photos are stored in the browser's `localStorage`; they are not synchronized between users or devices. Demo passwords are stored in plaintext, so do not use real employee credentials or sensitive data. A production deployment needs server-side authentication, authorization, and persistent database storage.

Removing an employee permanently removes their assigned tasks and employee profile photo.
