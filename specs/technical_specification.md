# Technical Specification: SkateRVA (formerly Ashland Skateland) Website Redesign

**Project Version:** 1.6
**Status:** Approved for Development
**Brand Identity:** Transition from Ashland Skateland to **SkateRVA**

## 1. Overview & Goals

The goal is to replace the legacy Ashland Skateland website with a high-performance Next.js application for the new **SkateRVA** brand. The system will centralize scheduling, ticket sales, and facility rentals.

## 2. Technical Architecture

### Frontend (Next.js 14+ App Router)

- **Framework:** Next.js with TypeScript for type safety.
- **Styling:** Tailwind CSS using the SkateRVA brand palette.
- **Forms & Validation:** **Zod** schemas are mandatory for all API requests and form submissions.

### Backend (Next.js API Routes)

- **API Security:** All Square API calls must occur server-side.
- **Environment Variables:** Credentials must be stored in `.env` and never committed to Git.

## 3. Documentation & Visual Standards

- **Mermaid.js Diagrams:** Use Mermaid syntax within Markdown for flowcharts and sequence diagrams.
- **Excalidraw:** Use `.excalidraw` files for UI wireframes and architectural sketches.
- **TSDoc:** Mandatory for all exported functions and components.
- **Spell Checker:** The `code-spell-checker` extension must be used for all UI text.

## 4. Coding Conventions & Standards

- **Linting/Formatting:** ESLint and Prettier.
- **Standards:** 80 character line length, single quotes, and **mandatory semicolons**.
- **Git Workflow:**
  - **Branching:** No direct commits to `main`. Use `feature/` or `fix/` branches.
  - **PR Size:** Pull Requests must be kept to a reasonable size (ideally < 400 lines of code changed). Large features should be broken down into smaller, logical sub-tasks to facilitate thorough and timely reviews.
  - **Commit Messages:** Follow the Conventional Commits specification (`<type>(<scope>): <description>`)
    - _Types:_ `feat` (new feature), `fix` (bug fix), `docs` (documentation), `style` (formatting), `refactor` (code restructuring), `test` (tests), `chore` (maintenance)
    - _Examples:_
      - `feat(bookings): add party type selection`
      - `feat(bookings): add date picker`
      - `fix(payments): handle sandbox errors`
      - `chore(ci): update Playwright version`
- **Governance:** All PRs require approval from a member of the development team via the `CODEOWNERS` file.

## 5. Testing Suite

- **Unit Testing (Vitest):** Used for testing business logic (e.g., price calculations).
- **End-to-End Testing (Playwright):** Mandatory for:
  - The full **SkateRVA** "Birthday Party" booking flow.
  - Square Sandbox payment processing.
  - Responsive design checks across viewports.

## 6. Core Feature Specifications

### 6.1 Square Payment Integration

- **Flow:** Secure source ID generation -> Server-side processing -> Custom success UI.
- **Idempotency:** Every payment request must include a unique Idempotency Key.

### 6.2 Pre-ordering & Booking System

- **Logic:** Real-time availability checks for tickets, rentals, and snack bar bundles.

## 7. Deployment Strategy

- **CI/CD:** GitHub -> Vercel (Dev/QA).
- **Production:** Coolify VPS via Docker/Node.js deployment.

## 8. Acceptance Criteria

1. **Automated Tests:** All tests must pass in the CI/CD pipeline.
2. **TSDoc Coverage:** 100% of exported logic must be documented.
3. **Diagram Coverage:** Complex logic must have a corresponding Mermaid diagram.
4. **Review Approval:** Explicit approval from a Code Owner.
