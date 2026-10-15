# Tricount Clone - Remaining Tasks

## Backend (C# .NET 8)

### Core API ✅
- [x] **Tricount Controller**
  - [x] CRUD endpoints for tricounts (`GET /tricounts`, `POST /tricounts`, etc.)
  - [x] Add/remove users from tricounts (N:M relationship)
  - [x] Archive/unarchive tricounts
- [x] **Expense Controller**
  - [x] CRUD endpoints for expenses (`GET /expenses`, `POST /expenses`, etc.)
  - [x] Support for equal/unequal splits
  - [x] Multi-currency support (fetch exchange rates)
- [x] **Repayment Controller**
  - [x] Suggest repayments (minimize transactions)
  - [x] Mark repayments as completed
- [x] **User Controller**
  - [x] Clerk integration (validate JWT, sync users)
  - [x] User profile management (auth bypass in development)

### Business Logic
- [ ] **Split Service**
  - [ ] Equal/unequal split calculations
  - [ ] Rounding logic for splits
- [x] **Repayment Service**
  - [x] Greedy algorithm for repayment suggestions
  - [ ] Conflict resolution for concurrent repayments
- [x] **Currency Service**
  - [x] Fetch exchange rates (ExchangeRate-API)
  - [ ] Store rates with expenses

### Infrastructure ✅
- [x] **Clerk Auth**
  - [x] JWT validation middleware
  - [x] Development auth bypass (`BypassAuth: true`)
  - [ ] User role management (admin/member)
- [x] **Docker Compose**
  - [x] PostgreSQL + backend services
  - [x] Health checks and environment variables
  - [x] Runtime migrations (`dotnet ef database update`)
- [ ] **Offline Sync**
  - [ ] Queue actions when offline
  - [ ] Conflict resolution on reconnect

### Testing
- [ ] **Unit Tests**
  - [ ] xUnit for controllers/services
  - [ ] Moq for dependencies
- [ ] **Integration Tests**
  - [ ] Test API endpoints with test containers
- [ ] **E2E Tests**
  - [ ] Cypress for frontend-backend workflows

---

## Frontend (Angular)

### Core Features
- [x] **Tricount List**
  - [x] Display tricounts with emoji/icons
  - [x] Create/join/archive tricounts
- [x] **Tricount Detail**
  - [x] Expense list (chronological)
  - [ ] Balance view (net positions)
  - [x] Add/edit expenses
- [x] **Expense Form**
  - [x] Description, amount, payer, participants
  - [x] Equal/unequal split options
- [x] **Repayment View**
  - [x] Suggested repayments
  - [x] Mark repayments as completed

### UI/UX
- [x] **Responsive Design**
  - [x] Mobile-first layout
  - [x] Touch-friendly controls
- [ ] **Offline Support**
  - [ ] IndexedDB for queued actions
  - [ ] Sync status indicators
- [ ] **Multi-Currency**
  - [ ] Display amounts in original/group currency

### State Management
- [ ] **NgRx/Akita**
  - [x] State for tricounts, expenses, repayments
  - [ ] Optimistic updates

### Testing
- [ ] **Unit Tests**
  - [ ] Jest for components/services
- [ ] **E2E Tests**
  - [ ] Cypress for user journeys

---

## Deployment
- [ ] **Docker Compose**
  - [ ] Backend, frontend, PostgreSQL, Clerk
- [ ] **CI/CD**
  - [ ] GitHub Actions for build/test/deploy

---

## Next Steps
1. **Frontend**: Scaffold Angular app with Clerk integration.
2. **Testing**: Verify offline sync and conflict resolution.
3. **Deployment**: Configure production auth (Clerk) and hosting.
