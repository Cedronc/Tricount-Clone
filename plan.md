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
  - [x] User profile management

### Business Logic
- [ ] **Split Service**
  - [ ] Equal/unequal split calculations
  - [ ] Rounding logic for splits
- [ ] **Repayment Service**
  - [x] Greedy algorithm for repayment suggestions
  - [ ] Conflict resolution for concurrent repayments
- [ ] **Currency Service**
  - [x] Fetch exchange rates (ExchangeRate-API)
  - [ ] Store rates with expenses

### Business Logic
- [ ] **Split Service**
  - [ ] Equal/unequal split calculations
  - [ ] Rounding logic for splits
- [ ] **Repayment Service**
  - [ ] Greedy algorithm for repayment suggestions
  - [ ] Conflict resolution for concurrent repayments
- [ ] **Currency Service**
  - [ ] Fetch exchange rates (ExchangeRate-API)
  - [ ] Store rates with expenses

### Infrastructure
- [x] **Clerk Auth**
  - [x] JWT validation middleware
  - [ ] User role management (admin/member)
- [ ] **Docker Compose**
  - [ ] PostgreSQL, backend, and frontend services
  - [ ] Health checks and environment variables
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
- [ ] **Tricount List**
  - [ ] Display tricounts with emoji/icons
  - [ ] Create/join/archive tricounts
- [ ] **Tricount Detail**
  - [ ] Expense list (chronological)
  - [ ] Balance view (net positions)
  - [ ] Add/edit expenses
- [ ] **Expense Form**
  - [ ] Description, amount, payer, participants
  - [ ] Equal/unequal split options
- [ ] **Repayment View**
  - [ ] Suggested repayments
  - [ ] Mark repayments as completed

### UI/UX
- [ ] **Responsive Design**
  - [ ] Mobile-first layout
  - [ ] Touch-friendly controls
- [ ] **Offline Support**
  - [ ] IndexedDB for queued actions
  - [ ] Sync status indicators
- [ ] **Multi-Currency**
  - [ ] Display amounts in original/group currency

### State Management
- [ ] **NgRx/Akita**
  - [ ] State for tricounts, expenses, repayments
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
- [ ] **Hosting**
  - [ ] Cloud provider (AWS/GCP) or self-hosted

---

## Next Steps
1. **Backend**: Implement `TricountController` (delegate to agent).
2. **Commit**: After each controller/service is complete.
3. **Frontend**: Scaffold Angular app (delegate to agent).