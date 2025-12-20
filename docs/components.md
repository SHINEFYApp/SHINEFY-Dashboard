# Components Documentation

## Overview

The `src/components` folder contains all reusable and application-specific React components for the SHINEFY Dashboard project. This folder is organized into feature-based subdirectories and includes UI components, layout components, booking management components, vehicle management components, and specialized components like coupons and charts. All components are built using React functional components with TypeScript, following modern React patterns with hooks, Formik for form management, and Tailwind CSS for styling.

## Folder Structure

```
src/components/
├── booking/
│   ├── manageBooking/
│   │   ├── CompletedBookingChart.tsx
│   │   └── RatedReportsChart.tsx
│   ├── manageSlots/
│   │   ├── ManageDailySlot.tsx
│   │   └── ManageFreeBooking.tsx
│   ├── tabs/
│   │   └── services/
│   │       ├── steps/
│   │       │   ├── ServicesStep1.tsx
│   │       │   ├── ServicesStep2.tsx
│   │       │   ├── ServicesStep3.tsx
│   │       │   └── ServicesStep4.tsx
│   │       ├── SelectedVehicles.tsx
│   │       └── VehicleSelectionModal.tsx
│   ├── AnimatedTabs.tsx
│   ├── DetailRow.tsx
│   └── ProgressSteps.tsx
├── coupon/
│   └── coupon.tsx
├── layout/
│   ├── Layout.tsx
│   ├── Navbar.tsx
│   └── Sidebar.tsx
├── ui/
│   ├── button.tsx
│   ├── calendar.tsx
│   ├── checkbox.tsx
│   ├── dropdown-menu.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── popover.tsx
│   └── textarea.tsx
└── vehicles/
    ├── ManageCarCategory.tsx
    ├── ManageColor.tsx
    ├── ManageMake.tsx
    └── ManageModel.tsx
```

## Components Details

### UI Components (`src/components/ui/`)

#### Button (`src/components/ui/button.tsx`)
- **Type**: Functional component
- **Props Interface**: 
  - `className?: string`
  - `variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"`
  - `size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg"`
  - `asChild?: boolean`
  - All standard HTML button props
- **Default Values**: 
  - `variant: "default"`
  - `size: "default"`
  - `asChild: false`
- **Purpose**: Reusable button component with multiple variants and sizes using class-variance-authority
- **State Management**: None (stateless)
- **Technical Notes**: Uses Radix UI Slot for polymorphic behavior, CVA for variant management

#### Input (`src/components/ui/input.tsx`)
- **Type**: Functional component
- **Props Interface**: Standard HTML input props with `className?: string` and `type?: string`
- **Purpose**: Styled input component with consistent design system
- **State Management**: None (controlled by parent)
- **Technical Notes**: Includes focus states, validation states, and file input styling

#### Calendar (`src/components/ui/calendar.tsx`)
- **Type**: Functional component
- **Props Interface**: 
  - Extends `DayPicker` props
  - `buttonVariant?: React.ComponentProps<typeof Button>["variant"]`
- **Purpose**: Date picker component with custom styling
- **State Management**: Internal state for date selection
- **Side Effects**: Focus management with useEffect
- **Technical Notes**: Built on react-day-picker, includes RTL support, custom button variants

#### Checkbox (`src/components/ui/checkbox.tsx`)
- **Type**: Functional component
- **Props Interface**: Extends Radix UI CheckboxPrimitive.Root props
- **Purpose**: Styled checkbox component with check icon
- **State Management**: None (controlled by parent)
- **Technical Notes**: Uses Radix UI primitives for accessibility

#### Dropdown Menu (`src/components/ui/dropdown-menu.tsx`)
- **Type**: Multiple functional components (compound component pattern)
- **Components**: DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, etc.
- **Props Interface**: Various interfaces for each sub-component
- **Purpose**: Complete dropdown menu system with multiple item types
- **Technical Notes**: Built on Radix UI primitives, includes animations and keyboard navigation

#### Label (`src/components/ui/label.tsx`)
- **Type**: Functional component
- **Props Interface**: Extends Radix UI Label props
- **Purpose**: Accessible form label component
- **Technical Notes**: Includes disabled states and proper accessibility attributes

#### Popover (`src/components/ui/popover.tsx`)
- **Type**: Multiple functional components
- **Components**: Popover, PopoverTrigger, PopoverContent, PopoverAnchor
- **Purpose**: Popover system for tooltips and contextual content
- **Technical Notes**: Built on Radix UI with portal rendering

#### Textarea (`src/components/ui/textarea.tsx`)
- **Type**: Functional component
- **Props Interface**: Standard HTML textarea props
- **Purpose**: Styled textarea with consistent design system
- **Technical Notes**: Includes field-sizing-content for auto-resize

### Layout Components (`src/components/layout/`)

#### Layout (`src/components/layout/Layout.tsx`)
- **Type**: Functional component
- **Props Interface**: `LayoutProps { children: React.ReactNode }`
- **Purpose**: Main layout wrapper with sidebar and navbar
- **State Management**: 
  - Local state: `isCollapsed`, `isMobile`
- **Side Effects**: 
  - Window resize listener for responsive behavior
  - Cleanup on unmount
- **Event Handlers**: `toggleSidebar()`
- **Technical Notes**: Responsive design with mobile overlay, smooth transitions

#### Navbar (`src/components/layout/Navbar.tsx`)
- **Type**: Functional component
- **Props Interface**: 
  - `NavbarProps { isCollapsed: boolean; currentPath?: string; onMenuClick?: () => void }`
- **Purpose**: Top navigation bar with breadcrumbs and action buttons
- **State Management**: None (receives props from parent)
- **Side Effects**: `useMemo` for breadcrumb calculation based on route
- **Technical Notes**: Dynamic breadcrumb generation, dropdown menus for location selection

#### Sidebar (`src/components/layout/Sidebar.tsx`)
- **Type**: Functional component
- **Props Interface**: 
  - `SidebarProps { isCollapsed: boolean; onToggle: () => void; currentPath?: string }`
- **Purpose**: Navigation sidebar with collapsible menu items
- **State Management**: 
  - Local state: `expandedMenu`
- **Side Effects**: Route-based menu expansion on currentPath change
- **Event Handlers**: `toggleSubmenu()`, `handleMenuClick()`
- **Technical Notes**: Animated submenu with curved connectors, React Router integration

### Booking Components (`src/components/booking/`)

#### AnimatedTabs (`src/components/booking/AnimatedTabs.tsx`)
- **Type**: Functional component
- **Props Interface**: 
  - `AnimatedTabsProps { tabs: Tab[]; activeTab: string; onTabChange: (id: string) => void; className?: string }`
- **Purpose**: Animated tab navigation with underline indicator
- **State Management**: None (controlled by parent)
- **Event Handlers**: Tab click handling
- **Technical Notes**: CSS animations for tab transitions

#### DetailRow (`src/components/booking/DetailRow.tsx`)
- **Type**: Functional component
- **Props Interface**: 
  - `DetailRowProps { label: string; value: string; type?: "text" | "badge"; badgeColor?: string; actionButton?: ActionButton }`
- **Purpose**: Displays key-value pairs with optional badges and action buttons
- **State Management**: None
- **Technical Notes**: Responsive layout, multiple badge color variants

#### ProgressSteps (`src/components/booking/ProgressSteps.tsx`)
- **Type**: Functional component
- **Props Interface**: 
  - `ProgressStepsProps { steps: Step[]; currentStep: number; completedSteps?: number[]; validatedSteps?: number[]; onStepClick?: (step: number) => void; className?: string }`
- **Purpose**: Multi-step progress indicator with navigation
- **State Management**: None (controlled by parent)
- **Event Handlers**: Step click navigation
- **Technical Notes**: Animated progress line, conditional step accessibility

#### SelectedVehicles (`src/components/booking/tabs/services/SelectedVehicles.tsx`)
- **Type**: Functional component
- **Props Interface**: 
  - `SelectedVehiclesProps { vehicles: Vehicle[]; onAddClick: () => void; onRemoveVehicle?: (id: string) => void }`
- **Purpose**: Displays selected vehicles with add/remove functionality
- **State Management**: None (vehicles managed by parent)
- **Event Handlers**: Add vehicle, remove vehicle
- **Technical Notes**: Horizontal scrolling layout, hover effects for remove button

#### VehicleSelectionModal (`src/components/booking/tabs/services/VehicleSelectionModal.tsx`)
- **Type**: Functional component
- **Props Interface**: 
  - `VehicleSelectionModalProps { isOpen: boolean; onClose: () => void; onSelect: (vehicles: Vehicle[]) => void; selectedVehicles: Vehicle[] }`
- **Purpose**: Modal for selecting multiple vehicles
- **State Management**: 
  - Local state: `selected` (synced with props)
- **Side Effects**: Sync selection state when modal opens
- **Event Handlers**: Vehicle toggle, done/cancel actions
- **Technical Notes**: Portal rendering, backdrop click handling, grid layout

### Service Steps Components (`src/components/booking/tabs/services/steps/`)

#### ServicesStep1 (`src/components/booking/tabs/services/steps/ServicesStep1.tsx`)
- **Type**: Functional component with nested content component
- **Props Interface**: `ServicesStep1Props`
- **Purpose**: First step of service booking - basic reservation data
- **State Management**: 
  - Local state: `isModalOpen`
  - Formik form state
- **Side Effects**: 
  - Validation registration with parent
  - Auto-save on value changes
  - Validation status notification
- **Event Handlers**: Vehicle selection, form submission
- **Technical Notes**: Formik integration, validation schema, modal management

#### ServicesStep2 (`src/components/booking/tabs/services/steps/ServicesStep2.tsx`)
- **Type**: Functional component
- **Props Interface**: `ServicesStep2Props`
- **Purpose**: Second step - service and package selection
- **State Management**: Formik form state
- **Event Handlers**: 
  - Quantity changes for extra services
  - Form submission
- **Technical Notes**: Dynamic service quantity management, conditional package display

#### ServicesStep3 (`src/components/booking/tabs/services/steps/ServicesStep3.tsx`)
- **Type**: Functional component
- **Props Interface**: `ServicesStep3Props`
- **Purpose**: Third step - payment method and coupon selection
- **State Management**: 
  - Local state: `selectedPayment`
  - Formik form state
- **Event Handlers**: Payment method selection, form submission
- **Technical Notes**: Payment method grid layout, disabled wallet input

#### ServicesStep4 (`src/components/booking/tabs/services/steps/ServicesStep4.tsx`)
- **Type**: Functional component
- **Props Interface**: `ServicesStep4Props`
- **Purpose**: Final step - notes and submission
- **State Management**: Formik form state
- **Event Handlers**: Note changes, final submission
- **Technical Notes**: Textarea inputs with auto-resize, final form submission

### Manage Slots Components (`src/components/booking/manageSlots/`)

#### ManageDailySlot (`src/components/booking/manageSlots/ManageDailySlot.tsx`)
- **Type**: Functional component with duration listener
- **Purpose**: Form for creating daily time slots
- **State Management**: 
  - Local state: `duration`
  - Formik form state
- **Side Effects**: Duration calculation based on start/end times
- **Technical Notes**: Real-time duration calculation, comprehensive form validation

#### ManageFreeBooking (`src/components/booking/manageSlots/ManageFreeBooking.tsx`)
- **Type**: Functional component with duration listener
- **Purpose**: Form for creating free booking slots
- **State Management**: 
  - Local state: `duration`
  - Formik form state
- **Side Effects**: Duration calculation based on start/end times
- **Technical Notes**: Similar to ManageDailySlot with different submission handling

### Manage Booking Components (`src/components/booking/manageBooking/`)

#### CompletedBookingChart (`src/components/booking/manageBooking/CompletedBookingChart.tsx`)
- **Type**: Functional component
- **Purpose**: Chart visualization for completed bookings with filters
- **State Management**: 
  - Local state: `selectedYear`, `selectedMonth`, `chartData`
  - Formik form state for filters
- **Event Handlers**: Filter changes, export actions
- **Technical Notes**: Recharts integration, responsive design, custom tooltip

#### RatedReportsChart (`src/components/booking/manageBooking/RatedReportsChart.tsx`)
- **Type**: Functional component
- **Purpose**: Chart visualization for rated reports with star rating display
- **State Management**: 
  - Local state: `selectedYear`, `selectedMonth`, `chartData`
  - Formik form state for filters
- **Event Handlers**: Filter changes, export actions
- **Technical Notes**: Similar to CompletedBookingChart with rating display

### Vehicle Management Components (`src/components/vehicles/`)

#### ManageCarCategory (`src/components/vehicles/ManageCarCategory.tsx`)
- **Type**: Functional component
- **Purpose**: CRUD interface for car categories
- **State Management**: 
  - Local state: `openWindowAddAmount`, `currentPage`
- **Event Handlers**: 
  - Search submission
  - Page changes
  - Modal open/close
  - Form submission
- **Technical Notes**: FilterHeader integration, CustomTable, GenericModal, FileUploader

#### ManageColor (`src/components/vehicles/ManageColor.tsx`)
- **Type**: Functional component
- **Purpose**: CRUD interface for vehicle colors
- **State Management**: 
  - Local state: `openWindowAddAmount`, `currentPage`
- **Event Handlers**: Similar to ManageCarCategory
- **Technical Notes**: Color code input field, similar structure to other manage components

#### ManageMake (`src/components/vehicles/ManageMake.tsx`)
- **Type**: Functional component
- **Purpose**: CRUD interface for vehicle makes/brands
- **State Management**: 
  - Local state: `openWindowAddAmount`, `currentPage`
- **Event Handlers**: Similar to other manage components
- **Technical Notes**: Image upload functionality, bilingual name support

#### ManageModel (`src/components/vehicles/ManageModel.tsx`)
- **Type**: Functional component
- **Purpose**: CRUD interface for vehicle models
- **State Management**: 
  - Local state: `openWindowAddAmount`, `currentPage`
- **Event Handlers**: Similar to other manage components
- **Technical Notes**: Make selection dropdown, dependent field relationships

### Coupon Component (`src/components/coupon/`)

#### Coupon (`src/components/coupon/coupon.tsx`)
- **Type**: Functional component
- **Props Interface**: `{ color?: string }` (default: 'green')
- **Purpose**: Displays coupon cards with scalloped design
- **State Management**: None
- **Event Handlers**: View, update, delete actions (alert placeholders)
- **Technical Notes**: SVG-based scalloped design, conditional update button, custom styling

## Common Patterns

### Formik Integration
- **Consistent Usage**: All form components use Formik for form state management
- **Validation**: Yup schemas for validation rules
- **Initial Values**: Centralized initial value constants
- **Error Handling**: Built-in Formik error display
- **Auto-save**: Many forms implement auto-save on value changes

### Tailwind Styling Conventions
- **Responsive Design**: Consistent use of `md:`, `lg:` breakpoints
- **Color System**: Primary color scheme with consistent naming
- **Spacing**: Standardized padding/margin classes
- **Animations**: Custom animations like `animate-fade-in`, `animate-scale-up`
- **Hover Effects**: Consistent hover states with `hover:` variants

### Modal Patterns
- **Backdrop**: Semi-transparent overlay with click-to-close
- **Portal Rendering**: Modals rendered outside normal DOM flow
- **Animation**: Fade-in/scale-up animations for smooth transitions
- **Accessibility**: Proper focus management and keyboard navigation
- **State Management**: Modal open/close state managed by parent components

### Table / List Rendering
- **CustomTable**: Centralized table component with pagination
- **FilterHeader**: Consistent search and filter interface
- **Pagination**: Built-in pagination with page size controls
- **Actions**: Standardized action buttons (view, edit, delete)

### Chart Integrations
- **Recharts**: Used for all chart visualizations
- **Responsive**: Charts adapt to container size
- **Custom Tooltips**: Branded tooltip styling
- **Interactive**: Hover states and click handlers
- **Data Formatting**: Consistent data transformation patterns

## Usage Examples

### Basic Button Usage
```tsx
import { Button } from '../ui/button';

// Primary button
<Button variant="default" size="lg">
  Submit
</Button>

// Outline button with icon
<Button variant="outline" className="gap-2">
  <Icon className="w-4 h-4" />
  Cancel
</Button>
```

### Form with Formik
```tsx
import { Formik, Form } from 'formik';
import { FormInput } from '../common/FormInput';

<Formik
  initialValues={{ name: '', email: '' }}
  validationSchema={schema}
  onSubmit={handleSubmit}
>
  <Form>
    <FormInput name="name" label="Name" />
    <FormInput name="email" label="Email" type="email" />
    <Button type="submit">Submit</Button>
  </Form>
</Formik>
```

### Modal Implementation
```tsx
import { GenericModal } from '../common/GenericModal';

<GenericModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Add Item"
>
  <FormContent />
</GenericModal>
```

### Progress Steps
```tsx
import { ProgressSteps } from '../booking/ProgressSteps';

<ProgressSteps
  steps={steps}
  currentStep={currentStep}
  completedSteps={[1, 2]}
  onStepClick={handleStepClick}
/>
```

## Best Practices

### TypeScript Types
- **Strict Typing**: All components use proper TypeScript interfaces
- **Props Interfaces**: Dedicated interfaces for component props
- **Generic Types**: Proper use of generics for reusable components
- **Type Safety**: No `any` types except where necessary for Formik integration

### State Management
- **Local State**: useState for component-specific state
- **Form State**: Formik for all form-related state
- **Prop Drilling**: Minimal prop drilling with proper component composition
- **State Lifting**: State lifted to appropriate parent components

### Styling
- **Tailwind Classes**: Consistent use of Tailwind utility classes
- **Component Variants**: CVA (class-variance-authority) for component variants
- **Responsive Design**: Mobile-first responsive design approach
- **Custom Properties**: CSS custom properties for dynamic styling

### Reusability
- **Compound Components**: Complex components broken into smaller, reusable parts
- **Prop Interfaces**: Flexible prop interfaces for customization
- **Default Props**: Sensible defaults for optional props
- **Composition**: Favor composition over inheritance

### Performance
- **Memoization**: useMemo for expensive calculations
- **Effect Dependencies**: Proper dependency arrays for useEffect
- **Event Handlers**: Stable event handler references
- **Lazy Loading**: Components loaded as needed

### Accessibility
- **ARIA Labels**: Proper ARIA attributes for screen readers
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Proper focus handling in modals and forms
- **Semantic HTML**: Use of semantic HTML elements where appropriate