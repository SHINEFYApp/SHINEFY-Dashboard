# Project Documentation

## Overview

SHINEFY Dashboard is a comprehensive React + TypeScript admin dashboard for managing a car service business. The application provides complete management capabilities for bookings, vehicles, users, staff, geographical regions, services, products, and orders. The dashboard features a multi-language interface (English/Arabic) with RTL support and includes advanced booking workflows, real-time data management, and extensive CRUD operations.

## Tech Stack

- **Frontend Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.7
- **Routing**: React Router DOM 7.9.5
- **State Management**: Redux Toolkit 2.9.2
- **Form Management**: Formik 2.4.8 with Yup 1.7.1 validation
- **HTTP Client**: Axios 1.13.2
- **Styling**: Tailwind CSS 4.1.16 with custom animations
- **UI Components**: Radix UI components, Lucide React icons
- **Internationalization**: i18next 25.6.0 with React i18next
- **Maps**: Leaflet 1.9.4 with Leaflet Draw
- **Charts**: Recharts 3.4.1
- **Date Handling**: date-fns 4.1.0, React Day Picker
- **Development**: ESLint, TypeScript 5.9.3

## Folder Structure

```
src/pages/
├── home.tsx                                    # Dashboard home page
├── logIn/
│   ├── logIn.tsx                              # Authentication page
│   └── logInStyle.css                         # Login-specific styles
├── bookings/
│   ├── CreateBookings.tsx                     # Multi-step booking creation
│   ├── bookingSteps.tsx                       # Booking step components logic
│   ├── bookings_slot/
│   │   ├── CreateBookingsSlot.tsx             # Time slot management
│   │   └── ManageSlots.tsx                    # Slot listing and management
│   └── manage_booking/
│       ├── ManageBooking.tsx                  # Booking list with filters
│       └── ManageBookingDetails.tsx           # Detailed booking view
├── vehicles/
│   ├── addVehicles.tsx                        # Vehicle registration form
│   └── ManageVehicles.tsx                     # Vehicle management with tabs
├── users&staff/
│   ├── ManageUsers.tsx                        # User management (placeholder)
│   ├── manageSubAdmin.tsx                     # Sub-admin listing
│   ├── addSubAdmin.tsx                        # Sub-admin creation form
│   ├── ManageServiceBoy.tsx                   # Service boy management
│   ├── AddServiceBoy.tsx                      # Service boy registration
│   ├── ServiceBoyDetails.tsx                  # Service boy profile view
│   └── userWallets.tsx                        # Wallet management system
├── Geography&Regions/
│   ├── manageCountries.tsx                    # Country management
│   ├── manageRegions.tsx                      # Region management
│   ├── manageAreas.tsx                        # Area management with tabs
│   └── subPagesAddAreas/
│       ├── addMainArea.tsx                    # Main area creation with map
│       └── addSubArea.tsx                     # Sub-area creation with map
├── services&extra/
│   ├── manageService/
│   │   ├── manageService.tsx                  # Service listing
│   │   └── addService.tsx                     # Service creation form
│   ├── manageExtraService/
│   │   ├── manageExtraService.tsx             # Extra service listing
│   │   └── addExtraService.tsx                # Extra service creation
│   └── manageCoupon/
│       ├── manageCoupon.tsx                   # Coupon management
│       └── addCoupon.tsx                      # Coupon creation form
└── productsAndOrders/
    ├── manageProducts.tsx                     # Product management wrapper
    ├── manageOrders.tsx                       # Order management
    ├── productAndgategoryTables/
    │   ├── productsTable.tsx                  # Product listing table
    │   └── categoryTable.tsx                  # Category listing table
    └── subPages/
        ├── addProducts.tsx                    # Product creation form
        └── addCategory.tsx                    # Category creation form
```

## Pages Details

### Authentication

#### Login Page (`src/pages/logIn/logIn.tsx`)
- **Route**: `/login`
- **Purpose**: User authentication interface
- **Components**: Custom Input, Label, Checkbox components from UI library
- **Features**: 
  - Email/password authentication form
  - Remember me functionality
  - Password visibility toggle
  - Forgot password link
  - Custom styling with CSS file
- **State Management**: Local form state
- **Styling**: Custom CSS with Tailwind classes

### Dashboard

#### Home Page (`src/pages/home.tsx`)
- **Route**: `/`
- **Purpose**: Main dashboard landing page
- **Current State**: Minimal implementation (placeholder)
- **Layout**: Wrapped in main Layout component

### Booking Management

#### Create Bookings (`src/pages/bookings/CreateBookings.tsx`)
- **Route**: `/bookings/create`
- **Purpose**: Multi-step booking creation workflow
- **Main Components**: AnimatedTabs, ProgressSteps, dynamic step components
- **State Management**: 
  - Complex form state with services/package tabs
  - Step validation and completion tracking
  - URL parameter management for tab state
- **Features**:
  - Two booking types: Services and Package
  - 4-step workflow with validation
  - Dynamic step skipping for package bookings
  - Vehicle management within booking flow
  - Form data persistence across steps
- **API Integration**: Form submission with console logging
- **Validation**: Step-by-step validation with async support

#### Booking Steps Logic (`src/pages/bookings/bookingSteps.tsx`)
- **Purpose**: Dynamic step component resolution
- **Functionality**: Maps step numbers to appropriate components based on booking type
- **Components**: ServicesStep1-4 components from booking/tabs/services/steps

#### Manage Bookings (`src/pages/bookings/manage_booking/ManageBooking.tsx`)
- **Route**: `/bookings/manage`
- **Purpose**: Booking list with search and filtering
- **Components**: CustomTable, FormInput, FormDatePicker, Charts
- **State Management**: Pagination state, filter form state
- **Features**:
  - Search by text and date
  - Pagination with 10 items per page
  - Action buttons (View Details)
  - Completed booking chart
  - Rated reports chart
- **API Integration**: Dummy data with console logging

#### Booking Details (`src/pages/bookings/manage_booking/ManageBookingDetails.tsx`)
- **Route**: `/bookings/manage/:id`
- **Purpose**: Detailed booking view with vehicle and service boy information
- **Components**: CustomTable, DetailRow components
- **Features**:
  - Booking information display
  - Vehicle details table with actions
  - Service boy details
  - Financial information
  - Update/Delete/Track actions
- **State Management**: Static data display

#### Manage Slots (`src/pages/bookings/bookings_slot/ManageSlots.tsx`)
- **Route**: `/bookings/slot`
- **Purpose**: Time slot management and listing
- **Components**: CustomTable, FormDropdown, FormDatePicker
- **State Management**: Pagination, filter form state
- **Features**:
  - Filter by type, status, and date
  - Export functionality
  - CRUD operations on slots
  - Add slot navigation

#### Create Booking Slot (`src/pages/bookings/bookings_slot/CreateBookingsSlot.tsx`)
- **Route**: `/bookings/slot/create`
- **Purpose**: Time slot creation interface
- **Components**: AnimatedTabs, ManageDailySlot, ManageFreeBooking
- **Features**: Tab-based slot management (Daily/Free booking)

### Vehicle Management

#### Add Vehicles (`src/pages/vehicles/addVehicles.tsx`)
- **Route**: `/vehicles/add`
- **Purpose**: Vehicle registration form
- **Components**: FormDropdown components with icons
- **State Management**: Formik with Yup validation
- **Form Fields**:
  - User selection
  - Category, Make, Model, Color dropdowns
- **Validation**: addVehicleSchema validation
- **API Integration**: Form submission with state update

#### Manage Vehicles (`src/pages/vehicles/ManageVehicles.tsx`)
- **Route**: `/vehicles/manage`
- **Purpose**: Vehicle management with tabbed interface
- **Components**: AnimatedTabs, vehicle management components
- **Features**: 
  - Manage Make, Model, Color, Car Category tabs
  - Tab-based navigation with state management

### User & Staff Management

#### Manage Users (`src/pages/users&staff/ManageUsers.tsx`)
- **Route**: `/users&staff/manage/users`
- **Purpose**: User management (currently placeholder)
- **Current State**: Minimal implementation

#### Manage Sub Admin (`src/pages/users&staff/manageSubAdmin.tsx`)
- **Route**: `/users&staff/manage/subAdmin`
- **Purpose**: Sub-administrator management
- **Components**: CustomTable, FormInput, FormDropdown
- **Features**:
  - Search and franchise filtering
  - Export functionality
  - CRUD operations (View, Update, Delete, Deactivate)
  - Add Sub Admin navigation
- **State Management**: Pagination, search form state

#### Add Sub Admin (`src/pages/users&staff/addSubAdmin.tsx`)
- **Route**: `/users&staff/manage/subAdmin/addSubAdmin`
- **Purpose**: Sub-administrator creation form
- **Components**: FormInput, FormDropdown, profile image management
- **State Management**: 
  - Formik with validation
  - SMS status management
  - Profile image handling
- **Form Fields**:
  - Personal information (name, phone, email)
  - Password fields
  - Privileges selection
  - Profile image upload
- **Features**: SMS notification toggle

#### Manage Service Boy (`src/pages/users&staff/ManageServiceBoy.tsx`)
- **Route**: `/users&staff/manage/serviceBoy`
- **Purpose**: Service boy management with advanced filtering
- **Components**: FilterHeader, CustomTable, FormDropdown, FormDatePicker
- **Features**:
  - Advanced filter modal
  - Status and franchise filtering
  - Export functionality
  - Add Service Boy navigation
- **State Management**: Pagination, search and filter states

#### Add Service Boy (`src/pages/users&staff/AddServiceBoy.tsx`)
- **Route**: `/users&staff/manage/serviceBoy/addServiceBoy`
- **Purpose**: Service boy registration form
- **Components**: FormInput, FormTimePicker, FormDatePicker, CustomFileUpload
- **Features**:
  - Personal information form
  - Working hours configuration
  - Document upload (driving license, ID card)
  - Profile image management
- **State Management**: Formik with comprehensive validation
- **File Handling**: Custom file upload component with validation

#### Service Boy Details (`src/pages/users&staff/ServiceBoyDetails.tsx`)
- **Route**: `/users&staff/manage/serviceBoy/:id`
- **Purpose**: Service boy profile view
- **Current State**: Basic implementation with ID parameter

#### User Wallets (`src/pages/users&staff/userWallets.tsx`)
- **Route**: `/users&staff/manage/usersWallet`
- **Purpose**: Wallet management system
- **Components**: CustomTable, FormInput, FormDropdown, Modal
- **Features**:
  - Wallet transaction listing
  - Add wallet amount modal
  - Credit/Debit selection
  - Export functionality
- **State Management**: 
  - Modal visibility state
  - Payment method selection
  - Form data management
- **Modal**: Custom popup for adding wallet amounts

### Geography & Regions

#### Manage Countries (`src/pages/Geography&Regions/manageCountries.tsx`)
- **Route**: `/geography&regions/manage/countries`
- **Purpose**: Country management with flag upload
- **Components**: CustomTable, FormInput, FileUploader, Modal
- **Features**:
  - Country listing with flags
  - Add country modal with flag upload
  - Search functionality
  - Export options
  - CRUD operations
- **State Management**: Modal state, form validation
- **File Upload**: Flag image upload functionality

#### Manage Regions (`src/pages/Geography&Regions/manageRegions.tsx`)
- **Route**: `/geography&regions/manage/regions`
- **Purpose**: Region management linked to countries
- **Components**: CustomTable, FormInput, FormDropdown, TextArea, Modal
- **Features**:
  - Region listing by country
  - Add region modal with description
  - Country selection dropdown
  - Search and export functionality
- **State Management**: Modal state, form validation

#### Manage Areas (`src/pages/Geography&Regions/manageAreas.tsx`)
- **Route**: `/geography&regions/manage/area`
- **Purpose**: Area management with main/sub area tabs
- **Components**: AnimatedTabs, CustomTable, FormInput
- **Features**:
  - Tab-based view (Main Area/Sub Area)
  - URL parameter management for tabs
  - Navigation to add area pages
  - Different table columns per tab
- **State Management**: Tab state with URL synchronization

#### Add Main Area (`src/pages/Geography&Regions/subPagesAddAreas/addMainArea.tsx`)
- **Route**: `/geography&regions/manage/area/add/mainArea`
- **Purpose**: Main area creation with map integration
- **Components**: FormDropdown, FormInput, DrawMap, Button
- **Features**:
  - Interactive map for area selection
  - Country and region selection
  - Area name input
  - Map-based area definition
- **State Management**: Formik with area validation

#### Add Sub Area (`src/pages/Geography&Regions/subPagesAddAreas/addSubArea.tsx`)
- **Route**: `/geography&regions/manage/area/add/subArea`
- **Purpose**: Sub-area creation with map integration
- **Components**: FormDropdown, FormInput, DrawMap, Button
- **Features**:
  - Interactive map for sub-area selection
  - Main area and sub-area name inputs
  - Hierarchical area management
- **State Management**: Formik with area validation

### Services & Extra Services

#### Manage Service (`src/pages/services&extra/manageService/manageService.tsx`)
- **Route**: `/services&extra/manage/Service`
- **Purpose**: Service listing and management
- **Components**: CustomTable, FormInput, FormDropdown
- **Features**:
  - Service listing with images
  - Bilingual service names (English/Arabic)
  - Price and time information
  - Extra service indicators
  - CRUD operations (View, Update, Delete)
- **State Management**: Pagination, search functionality

#### Add Service (`src/pages/services&extra/manageService/addService.tsx`)
- **Route**: `/services&extra/manage/Service/addService`
- **Purpose**: Service creation form
- **Components**: FormInput, TextArea, FormDatePicker, FormTimePicker
- **Features**:
  - Bilingual service information
  - Service pricing and timing
  - Service image upload
  - Service description in both languages
  - Extra service application toggle
  - Creation date and time
- **State Management**: Complex form state with multiple sections

#### Manage Extra Service (`src/pages/services&extra/manageExtraService/manageExtraService.tsx`)
- **Route**: `/services&extra/manage/ExtreService`
- **Purpose**: Extra service listing and management
- **Components**: CustomTable, FormInput, FormDropdown
- **Features**:
  - Extra service listing with images
  - Bilingual extra service names
  - Price and time information
  - CRUD operations
- **State Management**: Pagination, search functionality

#### Add Extra Service (`src/pages/services&extra/manageExtraService/addExtraService.tsx`)
- **Route**: `/services&extra/manage/extreService/addExtraService`
- **Purpose**: Extra service creation form
- **Components**: FormInput, TextArea, FormDatePicker, FormTimePicker
- **Features**:
  - Bilingual extra service information
  - Pricing and discount management
  - Service image upload
  - Time estimation
  - Creation date and time tracking
- **State Management**: Formik with validation

#### Manage Coupon (`src/pages/services&extra/manageCoupon/manageCoupon.tsx`)
- **Route**: `/services&extra/manage/coupon`
- **Purpose**: Coupon management with visual cards
- **Components**: Coupon component, FormInput, FormDropdown
- **Features**:
  - Grid-based coupon display
  - Color-coded coupon status
  - Search functionality
  - Add coupon navigation
- **State Management**: Search form state

#### Add Coupon (`src/pages/services&extra/manageCoupon/addCoupon.tsx`)
- **Route**: `/services&extra/manage/coupon/addCoupon`
- **Purpose**: Coupon creation form
- **Components**: FormInput, FormDropdown, FormDatePicker, FormTimePicker
- **Features**:
  - User-specific coupons
  - Coupon code generation
  - Discount amount setting
  - Service-specific coupons
  - Usage limits
  - Validity period with start/end dates and times
- **State Management**: Formik with comprehensive validation

### Products & Orders

#### Manage Products (`src/pages/productsAndOrders/manageProducts.tsx`)
- **Route**: `/products&orders/manage/Products`
- **Purpose**: Product management wrapper
- **Components**: ProductsTable, CategoryTable
- **Features**: Displays both product and category tables

#### Products Table (`src/pages/productsAndOrders/productAndgategoryTables/productsTable.tsx`)
- **Purpose**: Product listing with management features
- **Components**: CustomTable, FormInput, FormDropdown
- **Features**:
  - Product listing with bilingual names
  - Category association
  - Price and status information
  - CRUD operations
  - Add product navigation
- **State Management**: Pagination, search functionality

#### Category Table (`src/pages/productsAndOrders/productAndgategoryTables/categoryTable.tsx`)
- **Purpose**: Category listing with management features
- **Components**: CustomTable, FormInput, FormDropdown
- **Features**:
  - Category listing with bilingual names
  - Status management
  - CRUD operations
  - Add category navigation
- **State Management**: Pagination, search functionality

#### Add Products (`src/pages/productsAndOrders/subPages/addProducts.tsx`)
- **Route**: `/products&orders/manage/Products/addProduct`
- **Purpose**: Product creation form
- **Components**: FormInput, FormDropdown, TextArea
- **Features**:
  - Category selection
  - Bilingual product information
  - Product descriptions
  - Price setting
  - Active/inactive status toggle
- **State Management**: Formik with validation, active status management

#### Add Category (`src/pages/productsAndOrders/subPages/addCategory.tsx`)
- **Route**: `/products&orders/manage/Products/addGategory`
- **Purpose**: Category creation form
- **Components**: FormInput
- **Features**:
  - Bilingual category names
  - Active/inactive status toggle
- **State Management**: Formik with validation, active status management

#### Manage Orders (`src/pages/productsAndOrders/manageOrders.tsx`)
- **Route**: `/products&orders/manage/Orders`
- **Purpose**: Order management and tracking
- **Components**: CustomTable, FormInput, FormDropdown
- **Features**:
  - Order listing with IDs
  - Item count and total amount
  - Order status tracking
  - CRUD operations (View, Update, Delete)
  - Export functionality
- **State Management**: Pagination, search functionality

## Tailwind Configuration & Theming

The project uses Tailwind CSS 4.1.16 with:
- **Dark Mode**: Class-based dark mode support
- **Custom Colors**: Primary color scheme with yellow accent (#FFC107)
- **Animations**: Custom fade-in animations and transitions
- **Responsive Design**: Mobile-first approach with breakpoint utilities
- **RTL Support**: Right-to-left layout support for Arabic language

## Common Components

### Form Components
- **FormInput**: Text input with validation, icons, and SMS toggle
- **FormDropdown**: Select dropdown with search and validation
- **FormDatePicker**: Date selection with calendar popup
- **FormTimePicker**: Time selection component
- **TextArea**: Multi-line text input with validation

### Data Display
- **CustomTable**: Advanced table with pagination, sorting, and actions
- **FilterHeader**: Reusable filter interface with search and modal
- **Pagination**: Page navigation component

### UI Components
- **AnimatedTabs**: Tab navigation with smooth transitions
- **ProgressSteps**: Multi-step workflow indicator
- **DetailRow**: Key-value pair display component
- **GenericModal**: Reusable modal component
- **FileUploader**: File upload with validation

### Specialized Components
- **DrawMap**: Leaflet map integration for area selection
- **Coupon**: Visual coupon card component

## API Layer

The application uses custom hooks for API operations:
- **useGetData**: GET requests
- **usePostData**: POST requests  
- **usePutData**: PUT requests
- **usePatchData**: PATCH requests
- **useDeleteData**: DELETE requests

All API calls currently use console logging for development purposes.

## Authentication & Storage

- **Authentication**: Form-based login with email/password
- **Route Protection**: Layout-based route protection
- **Session Management**: Basic authentication state management
- **Storage**: Local state management with potential for Redux integration

## Best Practices

### Forms
- Formik integration with Yup validation schemas
- Consistent form field components
- Real-time validation feedback
- Multi-step form support with state persistence

### API Usage
- Custom hooks for consistent API patterns
- Error handling preparation
- Loading state management
- Data transformation utilities

### Styling
- Consistent Tailwind utility usage
- Component-based styling approach
- Responsive design patterns
- Accessibility considerations

### TypeScript Types
- Comprehensive type definitions for forms
- Interface definitions for data structures
- Generic type support for reusable components
- Strict type checking enabled

The application demonstrates a well-structured, scalable architecture suitable for complex business management requirements with room for future enhancements and API integration.