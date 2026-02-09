# Tech Stack Setup Guide

## 🚀 Installed Technologies

### Core Stack

- ⚛️ **React 18** + **Vite** - Fast development setup
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🎯 **Shadcn/ui Pattern** - Beautiful, accessible UI components

### State Management

- 🐻 **Zustand** - Lightweight state management with persistence
- 🔄 **TanStack Query** - Powerful data fetching & caching

### Form Handling

- 📝 **React Hook Form** - Performant form library
- ✅ **Zod** - TypeScript-first schema validation

### Utilities

- 📡 **Axios** - HTTP client with interceptors
- 🎉 **React Toastify** - Beautiful notifications
- 📅 **date-fns** - Modern date utilities
- 🎨 **clsx + tailwind-merge** - Conditional classNames

## 📁 Project Structure

```
FE/
├── src/
│   ├── components/
│   │   └── ui/              # Reusable UI components (Button, Card, Input, Label)
│   ├── pages/               # Example pages
│   │   ├── LoginExample.jsx
│   │   ├── TasksExample.jsx
│   │   └── ProfileExample.jsx
│   ├── stores/              # Zustand stores
│   │   └── authStore.js     # Authentication state
│   ├── lib/
│   │   ├── api.js           # Axios instance with interceptors
│   │   ├── queryClient.js   # TanStack Query config
│   │   └── utils.js         # Utility functions (cn)
│   ├── App.jsx
│   ├── main.jsx             # Entry point with providers
│   └── index.css            # Tailwind + theme variables
├── .env.example             # Environment variables template
├── tailwind.config.js
└── package.json
```

## 🎯 Usage Examples

### 1. Using UI Components

```jsx
import { Button } from "./components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/Card";
import { Input } from "./components/ui/Input";
import { Label } from "./components/ui/Label";

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Enter name" />
        <Button variant="default">Submit</Button>
        <Button variant="outline">Cancel</Button>
      </CardContent>
    </Card>
  );
}
```

### 2. Form with Validation (React Hook Form + Zod)

```jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "At least 6 characters"),
});

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    toast.success("Form submitted!");
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <Input type="password" {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}

      <Button type="submit">Login</Button>
    </form>
  );
}
```

### 3. Data Fetching with TanStack Query

```jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "../lib/api";

function TasksList() {
  const queryClient = useQueryClient();

  // Fetch data
  const { data, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await api.get("/tasks");
      return res.data;
    },
  });

  // Mutation
  const createMutation = useMutation({
    mutationFn: (newTask) => api.post("/tasks", newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task created!");
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data?.map((task) => (
        <div key={task.id}>{task.title}</div>
      ))}
      <Button onClick={() => createMutation.mutate({ title: "New" })}>
        Add Task
      </Button>
    </div>
  );
}
```

### 4. Authentication State (Zustand)

```jsx
import { useAuthStore } from "../stores/authStore";

function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <header>
      {isAuthenticated ? (
        <>
          <span>Welcome, {user?.name}</span>
          <Button onClick={logout}>Logout</Button>
        </>
      ) : (
        <Button>Login</Button>
      )}
    </header>
  );
}
```

### 5. API Calls with Auto Token Refresh

```jsx
import api from "../lib/api";

// The api instance automatically:
// - Adds Bearer token to requests
// - Refreshes token on 401 errors
// - Redirects to login if refresh fails

async function fetchUserProfile() {
  const response = await api.get("/users/profile");
  return response.data;
}

async function updateTask(id, data) {
  const response = await api.put(`/tasks/${id}`, data);
  return response.data;
}
```

### 6. Toast Notifications

```jsx
import { toast } from "react-toastify";

// Success
toast.success("Operation successful!");

// Error
toast.error("Something went wrong!");

// Info
toast.info("Please note...");

// Warning
toast.warn("Be careful!");

// Custom
toast("Custom message", {
  position: "bottom-right",
  autoClose: 5000,
});
```

## 🎨 Tailwind Utilities

The `cn()` utility combines `clsx` and `tailwind-merge` for conditional classes:

```jsx
import { cn } from "../lib/utils";

function MyButton({ isActive, className }) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded",
        isActive && "bg-blue-500 text-white",
        !isActive && "bg-gray-200",
        className,
      )}
    >
      Click me
    </button>
  );
}
```

## ⚙️ Environment Setup

1. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

2. Update the API URL:

```env
VITE_API_URL=http://localhost:3000
```

## 🎯 Button Variants

```jsx
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

{/* Sizes */}
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">🔍</Button>
```

## 🌐 Example Pages

Check out these example pages in `src/pages/`:

- **LoginExample.jsx** - Login form with validation
- **TasksExample.jsx** - CRUD with TanStack Query
- **ProfileExample.jsx** - Auth state with Zustand

## 📦 Next Steps

1. **Add TypeScript** (optional but recommended):

   ```bash
   npm install -D typescript @types/react @types/react-dom
   ```

2. **Add more UI components** as needed (Badge, Dialog, DropdownMenu, etc.)

3. **Setup routing** with React Router DOM (already installed)

4. **Add dark mode toggle** using the CSS variables

5. **Create protected routes** using the auth store

## 🛠️ Development

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

Happy coding! 🚀
