## Project File Structure Overview

A scalable and modular Next.js/React application structure, designed for maintainability and best practices.

---

## Directory Organization

### `src/assets`

- **Purpose**: Centralized provider for static media.
- **Sub folders**:
  - `icons/`: Global SVG/PNG icon assets
  - `images/[page-name]/`: Feature-specific images (e.g., `booking/`, `dashboard/`)

---

### `src/common`

- **Purpose**: Globally reusable UI components for consistency and DRY code.
- **Includes**:
  - Form inputs (text, number, email, tel)
  - Select dropdowns
  - Buttons, Modals, Cards, Badges

---

### `src/components`

- **Purpose**: Feature/page-specific components, organized for modularity.
- **Structure**:
  - `layout/`: Navbar, Sidebar, Footer
  - `booking/`: Booking steps, modals, vehicle selection
  - `[feature-name]/`: Other feature groups

---

### `src/constants`

- **Purpose**: Central store for static data/configuration.
- **Examples**:
  - API endpoints
  - Dropdown/menu options
  - Feature flags
  - Mock data

---

### `src/utils`

- **Purpose**: Standalone helper and utility functions for common logic.
- **Files**:
  - `api.js`: API wrappers/interceptors
  - `helpers.js`: Generic utilities
  - `validators.js`: Validation logic
  - `formatters.js`: Data formatters

---

### `src/pages`

- **Purpose**: Top-level routes composing layouts and major views.
- **Structure**:
  - One directory per primary route
  - Nested folders for sub-routes (e.g., `bookings/create`, `bookings/list`)

---

### `src/types`

- **Purpose**: Modular TypeScript definitions by feature/page.
- **Files**:
  - `booking.ts`: Types for booking features
  - `layout.ts`: Layout types
  - `user.ts`: User types
  - `api.ts`: API types

---

### Root Files

- `App.tsx`: Main application component—routing, layouts, global providers, guards.
- `main.tsx`: App entry—renders `App`, registers service workers.
- `index.css`: Global styles, Tailwind setup, resets/themes.
- `tailwind.config.js`: Tailwind theme and build configuration.

---

## Layout Architecture

### Main Layout Component (`layout/`)

- **Responsibilities**:
  - Wraps all authenticated pages
  - Responsive sidebar handling (toggle, collapse, expand)
  - Window resize and sidebar state management
- **Key State Variables**:
  - `isSidebarOpen`, `isMobile`, `isCollapsed`

#### Navbar Component

- **Responsibilities**:
  - Dynamic breadcrumbs (using `useMemo` for performance)
  - User profile, notifications, quick actions
- **Implementation**:
  - Memoized breadcrumb trail from route path
  - Prevents unnecessary re-renders

#### Sidebar Component

- **Structure**:
  - Direct links (Home, Dashboard)
  - Expandable sections (Bookings → Create, List, History)
- **Features**:
  - Active link highlighting
  - Collapsible sub-menus with smooth animations
  - Icon/text modes (expanded/collapsed)

---

## Tailwind CSS v4 Configuration

### Design Tokens & Theme Setup

#### Color System

- **Primary (Amber/Yellow)**: Main action/brand color, shades 50–900
- **Secondary (Gray)**: Neutral backgrounds, text, UI elements, shades 50–900
- **Accent**: Mirrors primary for future differentiation

#### Typography

- **Font Stack**: `--font-sans`, prioritizes "Inter", falls back to "Cairo" (Arabic)
- **Global Usage**: Ensures multi-language support and fast loading

#### Shadows & Elevation

- Custom shadow scale (`xs` to `2xl` + `inner`) for elevation levels

#### Animations

- **fade-in**
- **slide-down**
- **slide-up**
- **scale-up**
- All use transform/opacity for GPU acceleration

---

### Base Layer & Global Styles

- Applied via `@layer base` in CSS
- Default typography applies custom sans stack project-wide

---

### Build Configuration

#### PostCSS (`postcss.config.js`)

- Tailwind V4 processing
- Autoprefixer for browser support

#### Tailwind Config (`tailwind.config.js`)

- Content paths: `./index.html`, `./src/**/*.{js,ts,jsx,tsx}`
- Enables tree-shaking for minimal CSS bundle

---

## Example File/Folder Structure

```plaintext
src
|-- assets/
|   |-- icons/
|   |-- images/
|-- common/
|-- components/
|   |-- layout/
|   |-- booking/
|-- constants/
|-- utils/
|-- pages/
|-- types/
|-- App.tsx
|-- main.tsx
|-- index.css
|-- tailwind.config.js
```

---

Certainly! Here’s a Markdown documentation file summarizing the purpose, flow, and key logic of your `CreateBookings` React component for onboarding other developers.

---

## CreateBookings Component Overview

The `CreateBookings` component implements a multi-step, tab-based booking creation workflow for a service-oriented application. It manages form state, navigation, and URL synchronization using React and React Router, offering both "Services" and "Package" booking flows.

---

## Responsibilities

- Provide a tab-based interface for two booking types: "Services" and "Packages".
- Support multi-step form navigation within each booking type.
- Keep UI state (active tab) in sync with the URL query parameters.
- Maintain centralized form data state for all steps and tabs.
- Render appropriate step forms dynamically based on the tab and current step.

---

## Key Features

### 1. Tab Navigation with URL Sync

- Tabs for "Services Booking" and "Package Booking".
- Syncs the URL query parameter `tab` with the active tab for deep-linking and reload consistency.
- Supported tabs are validated against a whitelist.

**Implementation:**

- `useSearchParams` reads/writes the `tab` URL parameter.
- Changing the tab updates URL and UI, and resets the step to 1.

---

### 2. Multi-Step Form Handling

- Four steps with titles and descriptions:
  1. Enter customer data
  2. Enter service data
  3. Payment method
  4. Notes
- Each step is rendered based on the current tab and step number.
- For the Services tab, dedicated step components manage their respective step logic and data.

**Step Components Used:**

- `ServicesStep1` - Customer data entry
- `ServicesStep2` - Service data entry
- `ServicesStep3` - Payment method selection
- `ServicesStep4` - Add notes and submit

---

### 3. Centralized Form Data State

- All booking form information is managed in a single state object:
  - `formData.services`: Data for services booking steps
  - `formData.package`: Data for package booking steps (currently empty, can be extended)
- Child step components receive and update their relevant data by props.

---

### 4. UI Components and Feedback

- Uses `AnimatedTabs` for switching booking type visually.
- Uses `ProgressSteps` to show a clickable/visual step tracker.
- On successful submission, alerts the user and logs data for dev inspection.

---

## Code Flow Summary

```plaintext
[Tab selection or URL param] ──> Sets activeTab & syncs URL
         │
         ▼
  [Current step index] ──> Renders correct step component
         │
         ▼
   [Step form] ──> Receives props for formData and navigation events
         │
   onNext / onBack / onDataChange
         │
         ▼
 [Component updates formData, step number]
         │
         ▼
       [Submit] ──> Alerts & logs final formData
```

---

## Major Props & State

- **State**

  - `activeTab`: Current selected booking tab
  - `currentStep`: Current step in the booking process (1–4)
  - `formData`: Object holding all user-entered booking data

- **Functions**
  - `handleTabChange`, `handleNextStep`, `handlePreviousStep`
  - `updateFormData` (merges partial updates to form data)
  - `updateURL` (writes `tab` param)
  - `renderStepContent` (switches between step forms)

---
