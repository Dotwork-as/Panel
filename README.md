# Panel – Admin UI Template & Design System

🌐 **Live demo:** [https://dotwork-as.github.io/Panel/](https://dotwork-as.github.io/Panel/)

Modern Angular-based admin panel and UI platform built with **Angular 19**, **PrimeNG**, and **NgRx**, featuring a **fully themable design system**, **permission-based access control**, and a **reusable data table** suitable for enterprise dashboards and back-office applications.

---

## Overview

**Panel** is a front-end admin panel / UI shell designed as a **reusable base** for:

- Authenticated business dashboards (wallets, CRM, ticketing, etc.)
- Design-system–driven interfaces with runtime theme customization
- Modular, scalable admin apps requiring role-based permissions and localization

Key built-in features:

- Authentication flow (token-based guards, captcha-ready)
- Role and permission system with route guards
- Configurable layout (sidebar, navbar, dark mode, RTL/LTR)
- Reusable components: table, sidebar, navbar, breadcrumb
- Theme designer for runtime customization of colors, typography, and layout

---

## Tech Stack

- **Framework**: Angular 19 (standalone APIs, `ApplicationConfig`, functional providers)
- **State Management**: NgRx Store, Effects, Router Store
- **UI Library**: PrimeNG components with `@primeng/themes`
- **Theming**: Runtime theme designer using `ThemeService` and JSON-based config
- **Internationalization**: `@ngx-translate/core` reading `/i18n/*.json`
- **Charts**: `highcharts-angular` for dashboards
- **Icons & Assets**: `angular-svg-icon`, custom fonts, RTL/LTR support

---

## Features Summary

- **Authentication & Security**
  - Token-based guards, captcha support
  - Login -> fetch profile -> dashboard redirect

- **Authorization & Permissions**
  - Role-based access control
  - API calls gated by `PermissionService`
  - Route guards with `data.permission` checks

- **Layout & Navigation**
  - Responsive sidebar/navbar
  - Profile menu, notifications, breadcrumbs
  - Dark mode & RTL/LTR toggle

- **Reusable Table Component**
  - Configurable columns, pagination, filters
  - Server-side data, skeleton loading
  - Integrates with NgRx table state

- **API & Loading**
  - Central `ApiService` with loading flags
  - Permission-aware API calls

---

### Prerequisites

- Node.js (LTS recommended)
- npm or yarn

### Install dependencies

npm install
or
yarn install

### Development 
  - Application runs by default at http://localhost:4200/ with hot reload.

npm start
or
ng serve

### Build & Deploy

npm run build:dev     # development build
npm run build:prod    # production build
./build.sh            # SSR builder

### Contributing
  - This project is intended as a base panel / design system.
  - Feel free to fork for your own projects or propose improvements via pull requests.

## License
[MIT](LICENSE) © Dot Work

