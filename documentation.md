# Project Documentation

## Overview

This project is a React-based dashboard application built with Vite, TypeScript, and Tailwind CSS. It features a comprehensive authentication system, dynamic form handling, and a modular component architecture.

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Redux Toolkit
- **Form Handling**: Formik + Yup
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: React Icons, Lucide React

## Folder Structure

```
src/
├── api/            # API integration (hooks & services)
├── assets/         # Static assets (images, icons)
├── common/         # Reusable form & UI components
├── components/     # Application-specific components
├── constants/      # Static data & validation schemas
├── hooks/          # Custom React hooks
├── lib/            # Utilities (e.g., storage)
├── pages/          # Page components (routes)
├── redux/          # Redux store & slices
├── types/          # TypeScript definitions
└── utils/          # Helper functions
```

## Tailwind Configuration & Theming

The project uses Tailwind CSS v4. The design system is defined in `src/index.css` using CSS variables.

### Colors

- **Primary**: Amber/Yellow (`--color-primary`)
- **Secondary**: Gray (`--color-secondary`)
- **Accent**: Same as Primary (`--color-accent`)

### Animations

- `animate-fade-in`
- `animate-slide-down`
- `animate-slide-up`
- `animate-scale-up`

### Usage

You can use these variables in your Tailwind classes or arbitrary values:

```html
<div className="bg-primary text-white animate-fade-in">Content</div>
```

## Common Components (`src/common`)

These components are designed to be reusable across the application and are integrated with Formik where applicable.

### `CustomTable`

A dynamic table component with pagination support, custom cell rendering, and loading states.

- **Props**: `columns`, `data`, `isLoading`, `pagination props...`
- **Features**: Custom cell rendering via `render` function in columns, responsive design, empty state handling.

### `FilterHeader`

A comprehensive header component for management pages.

- **Features**:
  - Search input with debounce support
  - Filter button to open a filter modal
  - Action buttons (e.g., "Add New")
  - Export dropdown
- **Usage**: Used at the top of management pages to provide search and filtering capabilities.

### `FormInput`

A wrapper around HTML input that integrates with Formik.

- **Props**: `name`, `label`, `type`, `placeholder`, `icon`, `checkmark`, `receiveSms`
- **Features**:
  - Automatic error display
  - Success checkmark animation
  - Optional SMS toggle for specific use cases
  - Icon support

### `FormDropdown`

A Formik-integrated select dropdown.

- **Props**: `name`, `label`, `options`, `icon`
- **Features**: Supports both string arrays and object arrays for options.

### `FormDatePicker`

A date picker component integrated with Formik.

- **Props**: `name`, `label`, `placeholder`
- **Features**: Uses `date-fns` for formatting and a calendar popup for selection.

### `FormTimePicker`

A time picker input integrated with Formik.

- **Props**: `name`, `label`, `icon`
- **Features**: Native time input styling with Formik state management.

### `TextArea`

A textarea component integrated with Formik.

- **Props**: `name`, `label`, `placeholder`, `icon`
- **Features**: Similar styling to `FormInput` but for multi-line text.

### `FileUploader`

A drag-and-drop file upload component.

- **Props**: `name`, `title`
- **Features**:
  - Drag and drop support
  - File preview (name)
  - Validation error display
  - Formik integration

### `GenericModal`

A general-purpose modal component.

- **Props**: `isOpen`, `onClose`, `title`, `subtitle`, `children`
- **Features**: customizable content, backdrop blur, and animation.

### `GenericFilterModal`

A specialized modal for filtering options.

- **Props**: `isOpen`, `onClose`, `onSubmit`, `initialValues`
- **Features**: Includes "Apply Filters" and "Reset" buttons automatically.

### `Pagination`

A reusable pagination component.

- **Props**: `currentPage`, `totalPages`, `onPageChange`
- **Features**: Smart page number generation with ellipsis for large page counts.

### `DrawMap`

A Leaflet-based map component for drawing shapes.

- **Props**: `name`
- **Features**:
  - Draws polygons/shapes on a map
  - Saves coordinates to Formik state
  - Requires `leaflet` and `leaflet-draw`

## API Layer (`src/api`)

The project uses a custom hook-based architecture for API interactions, built on top of Axios.

### Service Layer

- **`axios.ts`**: Configured Axios instance with interceptors for token injection and auto-refresh logic.
- **`service-requests.ts`**: Generic wrappers for GET, POST, PUT, PATCH, DELETE methods.

### Custom Hooks

- **`useGetData`**: Fetches data with support for caching, pagination, and auto-refetching.
- **`usePostData`**: Handles POST requests with loading and error states.
- **`usePutData`**: Handles PUT requests.
- **`usePatchData`**: Handles PATCH requests.
- **`useDeleteData`**: Handles DELETE requests.

**Example Usage**:

```tsx
const { data, loading } = useGetData({
  route: "/users",
  params: { page: 1 },
});

const { postData } = usePostData();
const handleSubmit = async (values) => {
  await postData("/users", values);
};
```

## Authentication & Storage (`src/lib`)

Authentication state is managed via Redux and persisted using `sessionStorage` (handled in `src/lib/cookies.ts`).

### `authStorage`

A utility object to manage auth data.

- `setToken(token)` / `getToken()`
- `setRefreshToken(token)` / `getRefreshToken()`
- `setUser(user)` / `getUser()`
- `clearAuth()`

## Hooks (`src/hooks`)

### `useMultistepForm`

A hook to manage multi-step form wizard logic.

- **Returns**: `step`, `isFirstStep`, `isLastStep`, `goTo`, `next`, `back`.

## Best Practices

1. **Forms**: Always use `Formik` for form handling and `Yup` for validation. Use components from `src/common` for inputs.
2. **API**: Use the provided API hooks (`useGetData`, etc.) instead of raw Axios calls in components.
3. **Styling**: Use Tailwind utility classes. Avoid inline styles.
4. **Types**: Define interfaces in `src/types` and import them.
