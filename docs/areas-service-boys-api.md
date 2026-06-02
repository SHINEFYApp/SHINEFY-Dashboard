# Areas → Service Boys API — Frontend Documentation

**Base URL:** `/api`
**Authentication:** JWT token (same as all dashboard endpoints)

## Table of Contents
1. [Endpoint](#1-endpoint)
2. [Response Format](#2-response-format)
3. [Error Responses](#3-error-responses)
4. [Frontend Usage](#4-frontend-usage)
5. [Workflow Example](#5-workflow-example)
6. [Related Endpoints](#6-related-endpoints)

---

## 1. Endpoint

### GET `/api/areas/{areaId}/service-boys`

Returns all service boys assigned to a specific sub area (area).

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `areaId` | int | **yes** (path) | Sub area ID from the `areas` table |

**Example request:**
```
GET /api/areas/5/service-boys
Authorization: Bearer <jwt_token>
```

---

## 2. Response Format

### Success (200)

```json
{
  "status": "success",
  "data": {
    "area_id": 5,
    "area_name": "Nasr City",
    "service_boys": [
      {
        "user_id": 12,
        "name": "Ahmed Ali",
        "image_url": "https://.../images/abc123.jpg",
        "phone_number": "01001234567",
        "phone_number_display": "+2001001234567",
        "registered_at": "12-Mar-25 10:30 AM",
        "status": "Activated",
        "active_flag": 1
      },
      {
        "user_id": 18,
        "name": "Mohamed Saad",
        "image_url": "https://.../placeholder.jpg",
        "phone_number": "01007654321",
        "phone_number_display": "+2001007654321",
        "registered_at": "05-Jan-26 02:15 PM",
        "status": "Deactivated",
        "active_flag": 0
      }
    ]
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `area_id` | int | Sub area ID |
| `area_name` | string | Sub area name |
| `service_boys` | array | List of assigned service boys (may be empty `[]`) |
| `service_boys[].user_id` | int | Service boy user ID |
| `service_boys[].name` | string | Full name |
| `service_boys[].image_url` | string | Profile image URL (placeholder if none) |
| `service_boys[].phone_number` | string | Raw phone number |
| `service_boys[].phone_number_display` | string | Formatted with country code |
| `service_boys[].registered_at` | string | Registration date (format: `d-M-y h:i A`) |
| `service_boys[].status` | string | `"Activated"` or `"Deactivated"` |
| `service_boys[].active_flag` | int | `1` = active, `0` = inactive |

### Empty area (200 — no service boys assigned)

```json
{
  "status": "success",
  "data": {
    "area_id": 99,
    "area_name": "New Cairo",
    "service_boys": []
  }
}
```

---

## 3. Error Responses

### Area not found (404)

```json
{
  "status": "fail",
  "data": ["Area not found"]
}
```

### Invalid area ID (422)

```json
{
  "status": "fail",
  "data": ["Invalid area_id"]
}
```

### Server error (500)

```json
{
  "status": "error",
  "message": "Server error message",
  "code": 500,
  "data": null
}
```

---

## 4. Frontend Usage

### Axios call (from `resources/js/app.js` or any inline script)

```js
import axios from 'axios';

async function getServiceBoysByArea(areaId) {
  try {
    const response = await axios.get(`/api/areas/${areaId}/service-boys`);
    if (response.data.status === 'success') {
      return response.data.data;
    }
    throw new Error(response.data.data?.join(', '));
  } catch (error) {
    console.error('Failed to fetch service boys:', error);
    throw error;
  }
}
```

### Usage in a Blade view (example)

```blade
{{-- resources/views/dashboard/areas/service-boys.blade.php --}}
@extends('layout.mainlayout')
@section('content')
<div class="card">
  <div class="card-header">
    <h4>Service Boys in <span id="area-name">--</span></h4>
  </div>
  <div class="card-body">
    <table id="service-boys-table" class="table table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Status</th>
          <th>Registered</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
</div>
@endsection
@push('scripts')
<script>
$(document).ready(function () {
  const areaId = {{ $areaId }};
  $.ajax({
    url: `/api/areas/${areaId}/service-boys`,
    method: 'GET',
    headers: { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` },
    success: function (res) {
      if (res.status !== 'success') return;
      const data = res.data;
      $('#area-name').text(data.area_name);
      const $tbody = $('#service-boys-table tbody');
      data.service_boys.forEach(function (boy) {
        $tbody.append(`
          <tr>
            <td>
              <img src="${boy.image_url}" width="32" height="32" class="rounded-circle" alt="">
              ${boy.name}
            </td>
            <td>${boy.phone_number_display}</td>
            <td><span class="badge ${boy.active_flag ? 'bg-success' : 'bg-danger'}">${boy.status}</span></td>
            <td>${boy.registered_at}</td>
          </tr>
        `);
      });
    }
  });
});
</script>
@endpush
```

---

## 5. Workflow Example

### Selecting an area → viewing its service boys

```
[Manage Areas Page]
        │
        │ (click "View Service Boys" on a sub area row)
        ▼
[GET /api/areas/{areaId}/service-boys]
        │
        ├── Area found ──► Display area name + service boy table
        │
        ├── No service boys ──► Show "No service boys assigned" message
        │
        └── Area not found ──► Show 404 error
```

### Typical integration steps

1. On the **Manage Sub Areas** page (`/dash/area/selection`), add a column with a "Service Boys" button per row
2. Button passes the `area.id` to a detail page or opens a modal
3. Detail page/modal calls `GET /api/areas/{areaId}/service-boys`
4. Renders the service boy list with name, phone, status badge, and registration date
5. Clicking a service boy can link to `/manage_serviceboy` or `/api/service-boys/{id}` detail

---

## 6. Related Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/service-boys/{id}/areas` | Get areas assigned to a specific service boy |
| `PUT` | `/api/service-boys/{id}/areas` | Update areas assigned to a service boy |
| `GET` | `/api/service-boys/{id}` | Get service boy details |
| `GET` | `/api/areas/sub` | List all sub areas |
| `GET` | `/api/areas/main` | List all main areas |
