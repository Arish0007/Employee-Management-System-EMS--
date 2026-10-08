import { readUpdatedEmployees, saveUpdatedEmployeesLocally } from './UpdatedLocalStorage'

const employees = [
  {
    id: 1,
    firstName: "Rajesh",
    email: "e@e.com",
    password: "123",

    taskNumber: {
      active: 2,
      newTask: 7,
      completed: 1,
      failed: 1
    },

    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Build Login Page",
        taskDescription: "Create the login page UI with email and password fields.",
        taskDate: "2026-09-18",
        category: "Development"
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Create Navbar",
        taskDescription: "Create a responsive navbar for the employee dashboard.",
        taskDate: "2026-09-17",
        category: "Development"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Setup React Project",
        taskDescription: "Create and configure the React project using Vite.",
        taskDate: "2026-09-15",
        category: "Setup"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Fix API Error",
        taskDescription: "Find and fix the API request error in the dashboard.",
        taskDate: "2026-09-14",
        category: "Bug Fix"
      }
    ]
  },

  {
    id: 2,
    firstName: "Rahul",
    email: "employee2@gmail.com",
    password: "123",

    taskNumber: {
      active: 2,
      newTask: 1,
      completed: 2,
      failed: 1
    },

    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Design Dashboard",
        taskDescription: "Design the main employee dashboard layout.",
        taskDate: "2026-09-18",
        category: "Design"
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Create Task Cards",
        taskDescription: "Create reusable cards to display employee tasks.",
        taskDate: "2026-09-17",
        category: "Development"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Create Footer",
        taskDescription: "Add a footer section to the application.",
        taskDate: "2026-09-16",
        category: "Development"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Install Tailwind",
        taskDescription: "Install and configure Tailwind CSS in the project.",
        taskDate: "2026-09-15",
        category: "Setup"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Fix Mobile Layout",
        taskDescription: "Fix responsive layout issues on mobile screens.",
        taskDate: "2026-09-13",
        category: "Bug Fix"
      }
    ]
  },

  {
    id: 3,
    firstName: "Suman",
    email: "employee3@gmail.com",
    password: "123",

    taskNumber: {
      active: 2,
      newTask: 1,
      completed: 3,
      failed: 1
    },

    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Create Employee Page",
        taskDescription: "Build the employee profile and task page.",
        taskDate: "2026-09-18",
        category: "Development"
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Add Task Filter",
        taskDescription: "Add filters to display tasks based on their status.",
        taskDate: "2026-09-17",
        category: "Development"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Create Login Form",
        taskDescription: "Create a login form for employees and admin.",
        taskDate: "2026-09-16",
        category: "Development"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Create Data File",
        taskDescription: "Create employee and admin data for the application.",
        taskDate: "2026-09-15",
        category: "Setup"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Fix Routing",
        taskDescription: "Fix the routing issues in the dashboard.",
        taskDate: "2026-09-14",
        category: "Bug Fix"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Create 404 Page",
        taskDescription: "Create a page to handle invalid routes.",
        taskDate: "2026-09-12",
        category: "Development"
      }
    ]
  },

  {
    id: 4,
    firstName: "Bibek",
    email: "employee4@gmail.com",
    password: "123",

    taskNumber: {
      active: 2,
      newTask: 1,
      completed: 1,
      failed: 0
    },

    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Create Admin Dashboard",
        taskDescription: "Build the main dashboard for the administrator.",
        taskDate: "2026-09-18",
        category: "Development"
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Add Employee List",
        taskDescription: "Display all employees in the admin dashboard.",
        taskDate: "2026-09-17",
        category: "Development"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Create Sidebar",
        taskDescription: "Create a sidebar for dashboard navigation.",
        taskDate: "2026-09-16",
        category: "Design"
      }
    ]
  },

  {
    id: 5,
    firstName: "Nischal",
    email: "employee5@gmail.com",
    password: "123",

    taskNumber: {
      active: 2,
      newTask: 1,
      completed: 2,
      failed: 1
    },

    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Connect API",
        taskDescription: "Connect the frontend application with the backend API.",
        taskDate: "2026-09-18",
        category: "Development"
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Fetch Employee Data",
        taskDescription: "Fetch employee information from the API.",
        taskDate: "2026-09-17",
        category: "API"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Create API Service",
        taskDescription: "Create a reusable API service for fetching data.",
        taskDate: "2026-09-16",
        category: "API"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Fix Fetch Request",
        taskDescription: "Resolve the failed request and handle API errors.",
        taskDate: "2026-09-15",
        category: "Bug Fix"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Test API",
        taskDescription: "Test the API endpoints and verify the response.",
        taskDate: "2026-09-13",
        category: "Testing"
      }
    ]
  }
];
const admin = [
  {
    id: 1,
    firstName: "Arish",
    email: "admin@gmail.com",
    password: "123"
  }
];

export const setLocalStorage = () => {
  const normalizedEmployees = normalizeEmployees(employees)
  saveUpdatedEmployeesLocally(normalizedEmployees)
  localStorage.setItem('admin', JSON.stringify(admin))
}

export const getLocalStorage = () => {
  const storedEmployees = readUpdatedEmployees(employees)
  const storedAdmin = readStoredArray('admin', admin)
  const normalizedEmployees = normalizeEmployees(storedEmployees)

  saveUpdatedEmployeesLocally(normalizedEmployees)
  localStorage.setItem('admin', JSON.stringify(storedAdmin))
  return {
    employees: normalizedEmployees,
    admin: storedAdmin
  }
}

const readStoredArray = (key, fallback) => {
  const storedValue = localStorage.getItem(key)

  if (!storedValue) {
    return fallback
  }

  let parsedValue
  try {
    parsedValue = JSON.parse(storedValue)
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`Saved ${key} data is not valid JSON. Clear that localStorage entry and reload.`, { cause: error })
    }
    throw error
  }

  if (!Array.isArray(parsedValue)) {
    throw new Error(`Saved ${key} data must be an array. Clear that localStorage entry and reload.`)
  }

  return parsedValue
}

const normalizeEmployees = (employeeData) => {
  if (!Array.isArray(employeeData)) {
    throw new Error('Saved employee data must be an array.')
  }

  return employeeData.map((employee) => {
    if (!employee || !Array.isArray(employee.tasks)) {
      throw new Error('Saved employee data contains an invalid employee or task list.')
    }

    const tasks = employee.tasks.map((task, taskIndex) => {
      if (!task || typeof task !== 'object') {
        throw new Error('Saved employee data contains an invalid task.')
      }

      const status = ['active', 'newTask', 'completed', 'failed'].find((key) => task[key]) || 'newTask'

      return {
        ...task,
        id: task.id || `legacy-${employee.id}-${taskIndex}`,
        comments: Array.isArray(task.comments) ? task.comments : [],
        completionNote: typeof task.completionNote === 'string' ? task.completionNote : '',
        active: status === 'active',
        newTask: status === 'newTask',
        completed: status === 'completed',
        failed: status === 'failed'
      }
    })

    const taskNumber = tasks.reduce(
      (counts, task) => {
        if (task.active) counts.active += 1
        else if (task.newTask) counts.newTask += 1
        else if (task.completed) counts.completed += 1
        else if (task.failed) counts.failed += 1
        return counts
      },
      { active: 0, newTask: 0, completed: 0, failed: 0 }
    )

    return { ...employee, active: employee.active !== false, tasks, taskNumber }
  })
}