# SevenTwo Studio Handbook Expansion - Comprehensive Interview

This detailed interview will help document your practices for potential new handbook sections. Answer questions as thoroughly as possible, providing specific examples, tool names, and concrete practices.

**Legend:**
- 💡 **Suggestion**: Recommendations based on industry best practices
- ⚠️ **Warning**: Common pitfalls to avoid
- 📊 **Benchmark**: Industry standards and typical values
- ⚖️ **Trade-off**: Considerations when choosing between options
- 🎯 **Best Practice**: Proven approaches that work well
- 📝 **Example**: Real-world examples to illustrate concepts

---

## Section 1: Testing & QA Standards

### Testing Strategy & Philosophy

**1.1 What is your overall testing philosophy?**
- [ ] A. Test-Driven Development (TDD) - write tests before implementation
- [ ] B. Test after implementation but before PR
- [ ] C. Critical paths only - focus on high-risk areas
- [ ] D. Comprehensive coverage - aim for high percentage across all code
- [ ] E. Other (describe): _______________

💡 **Suggestion**: Your existing TypeScript standards mention "Practice Test-Driven Development (TDD) strictly" - consider if this applies across all languages or just specific contexts.

⚖️ **Trade-offs**:
- **TDD (A)**: Higher initial time investment, but catches bugs earlier and leads to better design. Works well for complex business logic and APIs.
- **Test-after (B)**: Faster initial development, but may result in less testable code. Risk of skipping tests under pressure.
- **Critical paths (C)**: Pragmatic for small teams, but requires discipline to define what's "critical." Can leave blind spots.
- **Comprehensive (D)**: Best quality assurance, but can slow velocity if taken to extremes (testing trivial code).

🎯 **Best Practice**: Most successful teams use TDD for business logic and bug fixes, test-after for UI components and straightforward CRUD, and skip tests only for truly trivial code (getters, simple formatters).

**1.2 What are your minimum test coverage requirements?**
- Unit test coverage: ___%
- Integration test coverage: ___%
- E2E test coverage: ___%
- Overall coverage threshold that blocks merges: ___%

💡 **Suggestion**: Your TypeScript standards specify "minimum 80% coverage." Consider if this applies uniformly or varies by project type.

📊 **Industry Benchmarks**:
- Unit tests: 70-90% is common for business logic
- Integration tests: 50-70% for API endpoints and critical flows
- E2E tests: 20-40% covering happy paths and critical user journeys
- Overall blocking threshold: 70-80% is typical (lower risks blind spots, higher creates busywork)

⚠️ **Warning**: Coverage percentages can be gamed. Focus on meaningful test cases over hitting arbitrary numbers. 100% coverage doesn't mean zero bugs.

🎯 **Best Practice**: Set different thresholds for different code types:
- Business logic / API endpoints: 90%+
- UI components: 70%+
- Utilities: 80%+
- Configuration / types: 50%+

**1.3 Where do you draw the line on what needs tests?**

💡 **Suggestions on what typically NEEDS tests**:
- All business logic (calculations, validations, workflows)
- API endpoints (request/response handling, status codes, error cases)
- Database queries (especially complex joins, aggregations)
- Authentication and authorization logic
- Data transformations and parsing
- Critical user flows (signup, checkout, data submission)
- Bug fixes (regression tests)

💡 **Suggestions on what typically DOESN'T need tests**:
- Simple getters/setters with no logic
- Pure type definitions or interfaces
- Trivial formatters (e.g., `toLowerCase()`)
- Framework boilerplate (if well-tested by framework)
- Constants and configuration objects

📝 **Example answer**: "All business logic, API endpoints, and database operations require tests with 90%+ coverage. UI components need tests for interactions and conditional rendering but not for styling. Simple utility functions and type definitions don't require tests unless they contain logic."

---

### Testing Tools & Frameworks

**2.1 Which testing frameworks do you use for each language/platform?**
- TypeScript/JavaScript: _________________ (Jest, Vitest, Bun test?)
- Python: _________________ (pytest, unittest?)
- Swift: _________________ (XCTest, Quick/Nimble?)
- Kotlin: _________________ (JUnit, Kotest?)
- Go: _________________ (testing package, testify?)
- Rust: _________________ (built-in test framework, other?)

💡 **Suggestions by language**:

**TypeScript/JavaScript**:
- **Jest**: Most popular, mature ecosystem, good for React. Slightly slower.
- **Vitest**: Modern, Vite-native, extremely fast. Great for new projects.
- **Bun test**: Fastest, but newest and less mature ecosystem. Good if already using Bun.

**Python**:
- **pytest**: Industry standard, excellent fixtures and plugins. Recommended.
- **unittest**: Built-in, verbose syntax. Only use if no external dependencies allowed.

**Swift**:
- **XCTest**: Apple's official framework, well-integrated with Xcode. Default choice.
- **Quick/Nimble**: BDD-style, more expressive. Use if team prefers BDD syntax.

**Kotlin**:
- **JUnit**: Standard for JVM, mature. Safe default.
- **Kotest**: Kotlin-native, more expressive. Better for new Kotlin projects.

**Go**:
- **testing package**: Built-in, sufficient for most needs. Start here.
- **testify**: Adds assertions and mocking. Add only if needed.

**Rust**:
- **Built-in**: Excellent built-in test framework. Use it.

🎯 **Best Practice**: Prefer language/ecosystem defaults unless you have specific needs. Consistency across projects matters more than marginal tool improvements.

**2.2 For frontend testing, which tools do you use?**
- Component testing: _________________ (React Testing Library, Testing Library?)
- E2E testing: _________________ (Playwright, Cypress, other?)
- Visual regression: _________________ (Percy, Chromatic, other, or none?)
- Accessibility testing: _________________ (axe, Pa11y, other, or none?)

💡 **Component Testing Suggestions**:
- **React Testing Library**: Industry standard for React. Tests user interactions, not implementation.
- **Testing Library (other variants)**: Vue Testing Library, Svelte Testing Library follow same philosophy.
- Avoid **Enzyme**: Outdated, tests implementation details rather than behavior.

💡 **E2E Testing Suggestions**:
- **Playwright**: Modern, fast, excellent debugging, cross-browser. Best choice for new projects.
- **Cypress**: Mature, great DX, but only Chromium in free tier. Good if already invested.

⚖️ **Trade-off - Visual Regression**:
- **Pros**: Catches unintended UI changes, great for design systems
- **Cons**: Can be flaky, expensive (paid tools), slower CI
- **Recommendation**: Use for design systems and critical UI. Skip for rapid prototypes.

💡 **Accessibility Testing**:
- **axe-core**: Most comprehensive, integrates with testing frameworks
- **Pa11y**: CLI-based, good for CI automation
- 🎯 **Best Practice**: Automated a11y testing catches ~40% of issues. Still need manual testing with screen readers.

**2.3 Do you use any test utilities or helpers?**
- Mocking library: _________________ (none preferred, Jest mocks, sinon?)
- Fixture/factory library: _________________ (Faker, factory-bot?)
- Test data builders: _________________ (custom, library?)

💡 **Mocking Suggestions**:
- If using Jest/Vitest: Built-in mocks are sufficient
- If need more control: MSW (Mock Service Worker) for API mocking

🎯 **Best Practice for Test Data**:
- **Faker**: Generate realistic random data (names, emails, addresses)
- **Factory libraries**: Create complex objects with sensible defaults
- **Custom builders**: For domain-specific test data with business rules

⚠️ **Warning**: Avoid random data in tests that can cause flakiness. Use seeded random or deterministic test data.

---

### Unit Testing Standards

**3.1 What structure do you follow for unit tests?**
- [ ] A. Arrange-Act-Assert (AAA)
- [ ] B. Given-When-Then
- [ ] C. Other: _______________

💡 **Suggestion**: Your existing standards mention "Follow Arrange-Act-Assert (AAA) pattern in all tests."

⚖️ **AAA vs Given-When-Then**:
- **AAA**: More common in code-centric tests, clearer structure for developers
- **Given-When-Then**: BDD-style, better for stakeholder communication, same structure different names
- They're effectively the same pattern with different terminology

🎯 **Best Practice**: Choose one and stick to it consistently. AAA is more common in code, Given-When-Then is better for specs shared with non-technical stakeholders.

**3.2 How do you handle mocking in unit tests?**

💡 **Mocking Philosophy Suggestions**:

**Option 1: Minimal Mocking** (Recommended)
- Mock only external dependencies (APIs, databases, file system)
- Use real implementations for internal code
- Results in more reliable tests that catch real bugs

**Option 2: Mock at Boundaries**
- Mock infrastructure layer (repos, HTTP clients)
- Keep business logic pure and testable without mocks
- Good separation of concerns

**Option 3: Liberal Mocking**
- Mock dependencies to isolate each unit
- Faster tests, but can miss integration issues
- Risk of tests passing but code failing in production

🎯 **Best Practice**: "Mock collaborators, stub queries" - Mock objects you send commands to, use real implementations for objects you query. Mock external services always.

📝 **Example answer**: "We mock at infrastructure boundaries: database calls, external API calls, and file system operations. Internal business logic uses real implementations. This catches integration issues while keeping tests fast."

⚠️ **Warning**: Over-mocking makes tests brittle. If you're mocking everything, your code might be too coupled. Consider refactoring instead.

**3.3 What's your naming convention for test files and test cases?**
- Test file naming: _________________ (*.test.ts, *_test.py, etc.)
- Test case naming: _________________ (descriptive sentences, snake_case, etc.)
- Test organization: _________________ (/tests directory, colocated with source, etc.)

💡 **File Naming Suggestions by Language**:
- TypeScript/JavaScript: `*.test.ts` or `*.spec.ts`
- Python: `test_*.py` or `*_test.py`
- Go: `*_test.go` (required by Go)
- Rust: Tests in same file or `tests/` directory
- Swift: `*Tests.swift`

💡 **Test Case Naming**:
- **Descriptive sentences**: `it('should return 404 when user not found')` - Clear what's being tested
- **snake_case**: `test_returns_404_when_user_not_found` - Python convention
- **methodName_condition_expectedResult**: `getUserById_userNotFound_returns404` - Java style

🎯 **Best Practice**: Test names should read like specifications. A failing test name should tell you exactly what broke.

💡 **Test Organization**:
- **Colocated** (`src/__tests__/` or `src/*.test.ts`): Easier to find, but mixes concerns
- **Separate directory** (`tests/` mirroring `src/`): Cleaner separation, your current standard
- **Hybrid**: Unit tests colocated, integration/E2E in separate directories

Your handbook specifies: "Tests live in a separate `/tests` directory"

**3.4 Do you have rules about test file length or number of tests per file?**

📊 **Industry Benchmarks**:
- One test file per source file is common
- 5-20 test cases per file typical
- Beyond 30 test cases, consider splitting by concern

💡 **Suggestion**: Similar to your 50-line function limit, consider limits like:
- One describe/context block per public method/function
- Maximum 5 test cases per method (happy path + edge cases + errors)
- Split test files >300 lines into multiple files grouped by concern

🎯 **Best Practice**: Group related tests together. Split when a file tests multiple unrelated concerns or becomes hard to navigate.

---

### Integration Testing Standards

**4.1 What qualifies as an integration test vs a unit test in your definitions?**

💡 **Clear Definitions**:

**Unit Test**:
- Tests single function/method in isolation
- All external dependencies mocked
- No I/O (no database, file system, network)
- Runs in milliseconds
- Hundreds/thousands of unit tests

**Integration Test**:
- Tests multiple components working together
- May use real database (in-memory or test DB)
- May make HTTP calls (to test APIs)
- Tests actual data flow
- Runs in seconds
- Fewer integration tests than unit tests

**E2E Test**:
- Tests complete user flows
- Full stack (frontend + backend + database)
- Uses real browsers or API clients
- Tests from user perspective
- Runs in minutes
- Fewest tests, highest value

📝 **Example answer**: "Unit tests verify individual functions with all dependencies mocked. Integration tests verify components working together with real database calls but mocked external APIs. E2E tests verify complete user workflows through the UI or API."

🎯 **Best Practice**: Follow the test pyramid: Many unit tests (70%), fewer integration tests (20%), fewest E2E tests (10%).

**4.2 How do you handle database state in integration tests?**
- [ ] A. In-memory database (SQLite, H2)
- [ ] B. Test database with transaction rollback per test
- [ ] C. Docker containers spun up per test run
- [ ] D. Shared test database reset before each run
- [ ] E. Other: _______________

⚖️ **Trade-offs**:

**A. In-memory database**:
- ✅ Fast, no setup needed, runs anywhere
- ❌ Not your production database (SQLite ≠ PostgreSQL)
- ❌ Can miss database-specific bugs, constraints
- 💡 Use for: Fast feedback, local development

**B. Transaction rollback per test**:
- ✅ Fast cleanup, isolated tests, uses real database
- ✅ Production parity, catches DB-specific issues
- ❌ Doesn't test transaction logic itself
- 🎯 **Recommended approach** for most integration tests

**C. Docker containers per test run**:
- ✅ Complete isolation, production parity
- ❌ Slower, requires Docker
- 💡 Use for: CI environments, complex setup

**D. Shared test database reset**:
- ✅ Simple setup
- ❌ Tests can interfere, slower, parallel tests difficult
- ⚠️ Avoid unless no other option

💡 **Suggestion**: Your handbook mentions "SQLite for local development" - consider using it for fast unit tests with DB, but real PostgreSQL with transaction rollback for integration tests.

🎯 **Best Practice**: Use transaction rollback (B) with test database for integration tests. Use in-memory (A) for fast unit tests that need a database.

**4.3 Do you test external API integrations?**
- [ ] A. Yes, with recorded HTTP interactions (VCR, nock, etc.)
- [ ] B. Yes, with mocked responses
- [ ] C. Yes, against sandbox/test environments
- [ ] D. Yes, with contract testing (Pact, etc.)
- [ ] E. No, external APIs are mocked in all tests
- [ ] F. Mix of approaches: _______________

⚖️ **Trade-offs**:

**A. Recorded interactions** (VCR, Polly, nock):
- ✅ Real API responses, no API calls in tests
- ✅ Fast, repeatable, works offline
- ❌ Recordings can get stale
- 🎯 Good for: APIs you don't control, stable APIs

**B. Mocked responses**:
- ✅ Complete control, fast
- ❌ Mocks can drift from real API
- ⚠️ Risk: API changes break production but tests still pass

**C. Sandbox environments**:
- ✅ Tests real integration
- ❌ Requires API credentials, internet, slower
- ❌ Tests can fail due to API downtime
- 💡 Use for: Critical integrations, pre-deployment verification

**D. Contract testing**:
- ✅ Catches breaking changes, best of both worlds
- ✅ Provider and consumer test compatibility
- ❌ Requires buy-in from API provider
- 🎯 Ideal for: APIs you control or partners who support it

🎯 **Recommended Mix**:
- Unit tests: Mocked responses (B)
- Integration tests: Recorded interactions (A)
- Pre-deployment: Sandbox environment tests (C)
- Partner APIs: Contract tests (D) if possible

**4.4 How do you handle authentication/authorization in integration tests?**

💡 **Common Approaches**:

**1. Test user accounts**:
- Create dedicated test users with different permission levels
- Tests use real auth flow
- 🎯 Most realistic testing

**2. JWT fixtures**:
- Pre-generated valid tokens for different roles
- Bypass login flow in tests
- ✅ Faster tests
- ⚠️ Doesn't test auth flow itself

**3. Auth bypass for tests**:
- Environment variable to disable auth in test mode
- ⚠️ **Dangerous**: Must never reach production
- Only use with extreme caution

**4. Separate auth tests**:
- Test auth flows separately with real auth
- Other tests bypass auth with fixtures
- 🎯 Good balance of speed and coverage

📝 **Example answer**: "We maintain test user accounts (admin@test.com, user@test.com, limited@test.com) with different roles. Integration tests authenticate as these users. For faster unit tests of business logic, we use pre-generated JWT fixtures."

---

### End-to-End Testing Standards

**5.1 What percentage of user flows have E2E test coverage?**
- [ ] A. All critical user flows (authentication, core features, checkout/payment)
- [ ] B. Most common user flows (top 20%)
- [ ] C. Selected high-risk flows only
- [ ] D. We don't have E2E tests yet
- [ ] E. Other: _______________

🎯 **Best Practice**: Start with critical flows (A), expand to common flows (B) as tests prove valuable.

💡 **Critical flows typically include**:
- User registration/signup
- Login/logout
- Password reset
- Core product feature (create, read, update, delete main entity)
- Checkout/payment (if applicable)
- Settings/profile updates

📊 **Benchmark**: Most teams cover 5-15 critical user flows with E2E tests. More than 20 flows often indicates tests that should be integration tests instead.

⚠️ **Warning**: E2E tests are expensive to maintain. Don't test everything E2E. Test critical happy paths and error cases with E2E, cover edge cases with unit/integration tests.

**5.2 If using Playwright or Cypress, what are your specific conventions?**
- Test file organization: _______________
- Use of page object pattern: [ ] Yes [ ] No
- Custom commands/fixtures: _______________
- Selectors strategy (test IDs, semantic selectors): _______________
- Parallelization strategy: _______________

💡 **Test Organization Suggestions**:
```
tests/e2e/
  auth/
    login.spec.ts
    signup.spec.ts
  products/
    create-product.spec.ts
    purchase-flow.spec.ts
  settings/
    profile.spec.ts
```

⚖️ **Page Object Pattern**:
- **Yes**: Reduces duplication, easier maintenance, cleaner tests
- **No**: Simpler, less abstraction, easier for beginners
- 🎯 **Recommended**: Use page objects for complex pages, inline selectors for simple flows

💡 **Selector Strategy**:
- **Test IDs** (`data-testid="submit-button"`): Most stable, explicit intent
- **Semantic selectors** (`button[type="submit"]`): Closer to user experience
- **Text content** (`getByText('Submit')`): Most user-like, but fragile to copy changes
- 🎯 **Best Practice**: Use test IDs for interactive elements, semantic/text for verification

📝 **Example conventions**:
```typescript
// Page objects for complex pages
class LoginPage {
  goto() { return cy.visit('/login'); }
  fillEmail(email) { return cy.get('[data-testid="email-input"]').type(email); }
  submit() { return cy.get('[data-testid="login-button"]').click(); }
}

// Test IDs for actions, text for assertions
test('login flow', async ({ page }) => {
  await page.getByTestId('email-input').fill('test@example.com');
  await page.getByTestId('login-button').click();
  await expect(page.getByText('Welcome back')).toBeVisible();
});
```

💡 **Parallelization**:
- Playwright: Built-in parallel execution (`--workers=4`)
- Cypress: Parallel mode requires paid Cloud plan or sharding setup
- 🎯 Aim for: E2E suite completes in <10 minutes with parallelization

**5.3 How do you handle E2E test data?**
- [ ] A. Seed database before test runs
- [ ] B. API calls to set up data per test
- [ ] C. Use production-like fixtures
- [ ] D. Tests create their own data through UI
- [ ] E. Mix of approaches: _______________

⚖️ **Trade-offs**:

**A. Seed database**:
- ✅ Fast setup, consistent state
- ❌ Tight coupling to database structure
- ❌ Doesn't test data creation flows

**B. API calls per test**:
- ✅ Fast, isolated tests
- ✅ Each test creates needed data
- ✅ Tests are independent
- 🎯 **Recommended approach**

**C. Production-like fixtures**:
- ✅ Realistic data
- ❌ Fixtures get stale
- ❌ Doesn't test creation flows

**D. Create through UI**:
- ✅ Tests full user flow
- ❌ Very slow
- ❌ Fragile (UI changes break many tests)

🎯 **Best Practice**: Use API calls (B) to set up test data, then test the specific flow. Example: Use API to create test user, then E2E test the login flow.

📝 **Example**:
```typescript
test.beforeEach(async ({ request }) => {
  // Setup via API
  await request.post('/api/test/users', {
    data: { email: 'test@example.com', role: 'admin' }
  });
});

test('admin can manage users', async ({ page }) => {
  // Test the actual admin UI flow
  await page.goto('/admin/users');
  // ...
});
```

**5.4 Where do E2E tests run?**
- [ ] A. Locally during development
- [ ] B. In CI on every PR
- [ ] C. In CI on main branch only
- [ ] D. Scheduled runs against staging
- [ ] E. Multiple contexts: _______________

💡 **Recommended Multi-Context Approach**:
- **Locally**: Smoke tests only (1-2 critical flows), run on demand
- **CI on PR**: Subset of E2E tests (~5 minutes), critical flows only
- **CI on main**: Full E2E suite (~15-30 minutes)
- **Scheduled/Staging**: Full suite + extended tests, synthetic monitoring

⚖️ **Trade-off**: Running all E2E tests on every PR slows feedback. Running none on PRs risks merging broken code.

🎯 **Best Practice**:
- PR: Fast smoke tests (authentication, core happy path)
- Main: Full E2E suite
- Nightly: Full suite + performance/accessibility tests
- Production: Synthetic monitoring of critical flows

⚠️ **Warning**: E2E tests on CI must be stable. One flaky test that fails 10% of the time blocks 10% of PRs. Better to have fewer reliable tests than many flaky ones.

**5.5 How do you handle flaky E2E tests?**

💡 **Flakiness Prevention**:
- Use explicit waits, never arbitrary `sleep()`
- Wait for network requests to complete
- Ensure data is loaded before assertions
- Use test IDs, not timing-dependent selectors
- Avoid testing animations, timers
- Seed data properly between tests

🎯 **When Tests Become Flaky**:
1. **Immediate**: Retry failed tests (2-3 times) - Playwright/Cypress support this
2. **Short-term**: Quarantine flaky test, file bug
3. **Never**: Disable test and forget it

📝 **Flaky Test Policy Example**:
```
- Tests failing <1%: Investigate and fix within 1 week
- Tests failing 1-10%: Quarantine immediately, fix within 3 days
- Tests failing >10%: Disable immediately, fix before re-enabling
- Quarantined tests >1 week: Delete the test (write a better one)
```

⚠️ **Warning**: "Retry until it passes" masks flaky tests. Use retry as a temporary workaround, not a solution.

---

### Mobile Testing Standards

**6.1 For mobile apps (iOS/Android), what's your testing strategy?**
- Unit tests: [ ] Comprehensive [ ] Key logic only [ ] Not prioritized
- Integration tests: [ ] Comprehensive [ ] Key flows only [ ] Not prioritized
- UI tests: [ ] Comprehensive [ ] Critical flows only [ ] Not prioritized

💡 **Mobile Testing Pyramid**:
- **Unit tests (70%)**: Business logic, view models, utilities
- **Integration tests (20%)**: API integration, local database, navigation
- **UI tests (10%)**: Critical user flows only (very slow on mobile)

⚖️ **Mobile UI Testing Trade-offs**:
- ✅ Catches real issues users experience
- ❌ Extremely slow (30s - 2 min per test)
- ❌ Flaky on simulators/emulators
- ❌ Expensive (device farms cost money)

🎯 **Best Practice for Mobile**:
- **Comprehensive unit tests**: Fast, reliable, run on every build
- **Key integration tests**: API calls, database, navigation flows
- **Critical UI tests only**: Login, signup, main user flow (5-10 tests max)

📝 **Example Mobile Test Strategy**:
```
Unit: 300+ tests, <1 minute, local execution
Integration: 50 tests, ~5 minutes, local + CI
UI: 8 critical flows, ~15 minutes, CI only
```

**6.2 What tools do you use for mobile testing?**
- iOS: _________________ (XCTest, XCUITest, other?)
- Android: _________________ (Espresso, UI Automator, other?)
- Cross-platform (if using React Native/Expo/Flutter): _________________

💡 **Native Mobile Suggestions**:

**iOS**:
- **XCTest**: Unit tests, Apple's official, well-integrated
- **XCUITest**: UI tests, slow but reliable
- **Quick/Nimble**: BDD-style if preferred

**Android**:
- **JUnit**: Unit tests
- **Espresso**: UI tests (white-box, fast)
- **UI Automator**: UI tests (black-box, slower but more realistic)
- **Robolectric**: Run Android tests on JVM (faster than emulator)

**Cross-platform**:
- **Expo/React Native**: Jest + React Native Testing Library + Detox (E2E)
- **Flutter**: Built-in test framework (excellent), widget tests, integration tests
- **Maestro**: New, simpler E2E testing across platforms

🎯 **Best Practice**: Use platform defaults (XCTest, Espresso) unless you have specific needs.

**6.3 How do you test on real devices vs simulators/emulators?**

⚖️ **Simulators/Emulators**:
- ✅ Fast, free, automated, part of CI
- ❌ Don't catch device-specific bugs
- ❌ Different performance characteristics
- ❌ Can't test: camera, GPS, cellular, some sensors
- 💡 Use for: Most testing, fast feedback

⚖️ **Real Devices**:
- ✅ Catches real-world issues
- ✅ Accurate performance testing
- ✅ Tests hardware features
- ❌ Slower, expensive, harder to automate
- 💡 Use for: Critical flows, performance testing, pre-release validation

🎯 **Recommended Approach**:
- **Development**: Simulators/emulators only
- **CI**: Simulators/emulators
- **Pre-release**: Real device testing (manual or device farm)
- **Critical bugs**: Verify on real devices

💡 **Device Farm Options**:
- **BrowserStack** / **Sauce Labs**: Broad device coverage, expensive
- **AWS Device Farm**: AWS-integrated, pay-per-use
- **Firebase Test Lab**: Free tier, Android focus
- **Local device lab**: Buy 3-5 popular devices (cost-effective for small teams)

📝 **Typical Device Coverage**:
- iOS: iPhone 14/15 (current), iPhone SE (small/cheap), iPad
- Android: Samsung Galaxy (most popular), Google Pixel (pure Android), budget device

**6.4 Do you test platform-specific features (push notifications, deep links, etc.)?**

💡 **These features are tricky to automate**:
- **Push notifications**: Usually manual testing or smoke tests
- **Deep links**: Can be tested with URL schemes in E2E tests
- **Camera/Photo library**: Manual testing or mocked in unit tests
- **Location services**: Can be simulated in tests
- **Background processing**: Integration tests with mocked system

🎯 **Best Practice**:
- Unit test the logic triggered by these features
- Integration test with simulated inputs
- Manual test the actual hardware integration
- Smoke test critical paths in automation

📝 **Example**:
```swift
// Unit test - test the logic
func testNotificationHandler() {
  let notification = makeTestNotification()
  sut.handleNotification(notification)
  XCTAssertTrue(sut.navigationState.showsInbox)
}

// Manual test - verify iOS actually delivers notification
// and tapping it opens the correct screen
```

---

### Performance Testing

**7.1 Do you have performance testing as part of your standard testing?**
- [ ] A. Yes, automated performance tests in CI
- [ ] B. Yes, but manual/ad-hoc performance testing
- [ ] C. Only for specific high-performance components
- [ ] D. No formal performance testing

⚖️ **Automated vs Manual Performance Testing**:

**Automated (A)**:
- ✅ Catches performance regressions early
- ✅ Consistent, repeatable measurements
- ❌ Requires stable test environment
- ❌ Setup complexity
- 💡 Realistic for: API response times, bundle sizes

**Manual (B)**:
- ✅ Simpler setup
- ✅ More realistic testing (real devices, networks)
- ❌ Easy to skip under pressure
- ❌ Inconsistent measurements
- 💡 Use for: User experience testing, complex flows

🎯 **Recommended Approach**:
- **Automated in CI**: Bundle size checks, critical API endpoints
- **Manual before release**: Full performance audit
- **Monitoring in production**: Real user metrics (most important)

💡 **Suggestion**: Start with bundle size budgets and slow API alerts. Add more as needed.

**7.2 What performance metrics do you test?**
- [ ] Load time / Time to First Byte (TTFB)
- [ ] Core Web Vitals (LCP, FID, CLS)
- [ ] API response times
- [ ] Database query performance
- [ ] Mobile app startup time
- [ ] Other: _______________

💡 **Priority by Application Type**:

**Web Apps**:
1. **Core Web Vitals** (LCP, INP, CLS) - Google ranking factor, user experience
2. **Bundle size** - Directly impacts load time
3. **TTFB** - Server response time
4. **API response times** - Backend performance

**APIs**:
1. **Response time** (P50, P95, P99) - User experience
2. **Throughput** - Requests per second capacity
3. **Database query time** - Often the bottleneck
4. **Error rate** - Failures under load

**Mobile Apps**:
1. **App startup time** - First impression
2. **Frame rate** - Smoothness (target: 60fps)
3. **Memory usage** - Affects stability
4. **Battery impact** - User satisfaction
5. **App size** - Download conversion

🎯 **Best Practice**: Choose 3-5 key metrics for your app type. Measure them consistently. Set budgets that trigger alerts.

**7.3 What tools do you use for performance testing?**

💡 **By Testing Type**:

**Frontend Performance**:
- **Lighthouse CI**: Automated Core Web Vitals in CI
- **WebPageTest**: Detailed waterfall analysis
- **bundlesize**: Bundle size budgets in CI
- **Chrome DevTools**: Manual profiling

**API Load Testing**:
- **k6**: Modern, scriptable, good for CI
- **Artillery**: Simple, YAML-based
- **Gatling**: JVM-based, nice reports
- **wrk/ab**: Simple CLI tools

**Database Performance**:
- **EXPLAIN ANALYZE**: PostgreSQL query analysis
- **pg_stat_statements**: PostgreSQL slow query log
- Built-in database profiling tools

**Mobile Performance**:
- **Xcode Instruments**: iOS profiling
- **Android Profiler**: Android Studio built-in
- **Firebase Performance Monitoring**: Real user metrics

🎯 **Recommendation**: Start with free/built-in tools:
- Lighthouse CI for web
- EXPLAIN for database
- Platform tools for mobile
- Add k6 if you need load testing

---

### Visual Regression & Accessibility

**8.1 Do you do visual regression testing?**
- [ ] A. Yes, automated visual regression in CI (tool: _________)
- [ ] B. Manual visual QA on preview deployments
- [ ] C. No visual regression testing
- [ ] D. Only for critical UI components

⚖️ **Visual Regression Trade-offs**:

**Pros**:
- Catches unintended UI changes (CSS bugs, layout breaks)
- Great for design systems and component libraries
- Prevents "looks fine to me" merges

**Cons**:
- Can be flaky (font rendering, timing issues)
- Expensive (paid tools) or slow (self-hosted)
- Screenshot diffs on every PR can be noisy
- Intentional changes require updating baselines

💡 **When to Use**:
- ✅ Design system / component library
- ✅ Marketing website (consistency critical)
- ✅ Apps with complex layouts
- ❌ Rapid prototypes / early stage products
- ❌ Apps where UI changes frequently

🎯 **Recommended Approach**: Start with manual QA on preview deployments (B). Add automated visual regression (A) only for design systems or when visual bugs become frequent.

💡 **Tools**:
- **Chromatic**: Best DX, integrates with Storybook, paid
- **Percy**: Established player, paid
- **Playwright screenshots**: Free, more setup
- **BackstopJS**: Free, self-hosted

**8.2 What are your accessibility testing standards?**
- [ ] A. Automated accessibility tests in CI (tool: _________)
- [ ] B. Manual accessibility audits periodically
- [ ] C. Accessibility linting during development (tool: _________)
- [ ] D. WCAG compliance level: _______ (A, AA, AAA)
- [ ] E. No formal accessibility testing yet

💡 **Multi-Layer Accessibility Strategy**:

**1. Linting (Development)**:
- **eslint-plugin-jsx-a11y**: Catches obvious issues while coding
- **axe-linter**: Editor integration
- ✅ Free, fast feedback
- Catches: Missing alt text, label associations, color contrast

**2. Automated Testing (CI)**:
- **axe-core**: Industry standard, comprehensive rules
- **jest-axe** / **Playwright-axe**: Test integration
- ✅ Catches ~40% of accessibility issues
- Can't catch: Logical tab order, screen reader UX, keyboard navigation quality

**3. Manual Testing (Pre-release)**:
- Test with actual screen readers (NVDA, JAWS, VoiceOver)
- Keyboard-only navigation testing
- Color blindness simulation
- ✅ Catches the 60% automated tests miss

🎯 **Best Practice**:
- **All projects**: Accessibility linting (C)
- **User-facing apps**: Automated tests in CI (A) + Manual audits quarterly (B)
- **Target**: WCAG 2.1 Level AA (D) - legally required in many jurisdictions

📊 **WCAG Levels**:
- **Level A**: Basic accessibility (minimum)
- **Level AA**: Standard compliance (recommended, legally required)
- **Level AAA**: Enhanced accessibility (difficult to achieve fully)

⚠️ **Warning**: Automated testing gives false confidence. ~60% of accessibility issues require human testing. Budget for manual accessibility audits.

**8.3 If you test accessibility, what specific things do you check?**
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Color contrast ratios
- [ ] ARIA labels and semantic HTML
- [ ] Focus management
- [ ] Other: _______________

💡 **Accessibility Checklist by Priority**:

**Critical** (Must-have):
- ✅ Keyboard navigation (all interactive elements reachable)
- ✅ Color contrast (4.5:1 for text, 3:1 for UI components)
- ✅ Form labels and error messages
- ✅ Alt text for images
- ✅ Semantic HTML (headings, landmarks, lists)

**Important** (Should-have):
- ✅ Focus indicators visible
- ✅ Skip navigation links
- ✅ ARIA labels where semantic HTML insufficient
- ✅ Screen reader testing (announcement quality)
- ✅ No keyboard traps

**Nice-to-have**:
- ✅ Reduced motion support (prefers-reduced-motion)
- ✅ High contrast mode
- ✅ Text resizing (up to 200%)
- ✅ ARIA live regions for dynamic content

📝 **Example Keyboard Testing**:
```
Test: Navigate entire app using only Tab, Shift+Tab, Enter, and Arrow keys
- Can reach all buttons, links, form fields?
- Can activate all interactive elements?
- Is focus order logical?
- Can see what's focused?
- Can escape from modals/dialogs?
```

🎯 **Quick Manual Test**: Navigate your app with keyboard only. If you get stuck or can't see where you are, you have an accessibility issue.

---

### Test Data Management

**9.1 How do you manage test data across different test types?**

💡 **Test Data Strategies by Test Type**:

**Unit Tests**:
- **Inline fixtures**: Small, simple objects defined in test
- **Factory functions**: For complex objects with defaults
- **Test builders**: Fluent API for building test data
```typescript
// Inline
const user = { id: 1, email: 'test@example.com' };

// Factory
const user = createTestUser({ role: 'admin' });

// Builder
const user = new UserBuilder().withRole('admin').build();
```

**Integration Tests**:
- **Database seeds**: Consistent starting state
- **Factories with database**: Create real DB records
- **Transactional cleanup**: Each test in a transaction

**E2E Tests**:
- **API setup**: Use backend API to create test data
- **Fixtures**: Pre-created data for specific scenarios
- **Cleanup**: Delete data after test runs

🎯 **Best Practices**:
- **Deterministic**: Same input = same output. Avoid random data in tests.
- **Minimal**: Create only data needed for that specific test
- **Isolated**: Tests don't share data, don't depend on order
- **Realistic**: Data should resemble production (types, relationships, constraints)

⚠️ **Warning**: Shared test data causes flaky tests. Each test should set up its own data or use read-only shared fixtures.

📝 **Example Factory Pattern**:
```typescript
// Factory with sensible defaults
function createTestUser(overrides = {}) {
  return {
    id: uuid(),
    email: `test-${Date.now()}@example.com`,
    role: 'user',
    createdAt: new Date(),
    ...overrides
  };
}

// Usage in tests
test('admin can delete users', () => {
  const admin = createTestUser({ role: 'admin' });
  const target = createTestUser({ role: 'user' });
  // ...
});
```

**9.2 Do you have any rules about using production data in tests?**

⚠️ **Critical Rules**:

**NEVER use production data directly**:
- Privacy violations (GDPR, CCPA)
- Security risk (exposing PII, credentials)
- Unpredictable (data changes)
- Potentially large (slow tests)

💡 **If you must use production-like data**:

**Option 1: Synthetic data generation**
- Generate realistic fake data (Faker library)
- Maintains data distribution and patterns
- No privacy concerns
- 🎯 Recommended for most cases

**Option 2: Anonymization**
- Take production data, strip PII
- Hash emails, names, addresses
- Keep IDs and relationships
- ⚠️ Still risky, hard to do correctly

**Option 3: Production subset**
- Use production as read-only data source
- Only for performance/load testing
- Never modify production data
- ⚠️ Requires strict controls

🎯 **Best Practice**: Create realistic synthetic test data. Use production data only for debugging specific production issues (with proper safeguards).

📝 **Example Policy**:
```
- Unit/Integration tests: Synthetic data only
- E2E tests: Synthetic data in dedicated test environment
- Load testing: Anonymized production data or synthetic at scale
- Debugging: Production data access requires approval, temporary, audit logged
- Production database: Never connect tests to production DB
```

---

### CI/CD Integration

**10.1 Which tests run on every PR vs main branch vs scheduled?**
- Every PR: _______________
- Main branch only: _______________
- Scheduled (nightly, etc.): _______________
- Before deployment: _______________

🎯 **Recommended Test Distribution**:

**Every PR** (Fast feedback: < 5 minutes):
- All unit tests
- Linting and formatting
- Type checking
- Critical integration tests (database, core APIs)
- Smoke E2E tests (1-2 critical flows)
- Bundle size checks

**Main branch** (Comprehensive: < 15 minutes):
- All unit tests (again)
- All integration tests
- Full E2E test suite
- Security scans
- Performance benchmarks

**Scheduled/Nightly** (Extended: 30+ minutes):
- Full test suite (all combinations)
- Extended E2E tests
- Performance/load tests
- Visual regression (if applicable)
- Accessibility audits
- Dependency vulnerability scans

**Before Deployment** (Gate):
- All main branch tests must pass
- Smoke tests against staging
- Database migration tests

⚖️ **Trade-off**: Faster PR feedback vs comprehensive testing
- Too slow: Developers context-switch, productivity drops
- Too fast: Miss bugs, production incidents

💡 **Optimization Tips**:
- Run tests in parallel
- Split slow test suites
- Cache dependencies
- Use faster test environments (in-memory DB for unit tests)

📝 **Example PR Test Strategy**:
```yaml
PR Tests (must pass to merge):
  Unit: 300 tests, 45 seconds
  Integration: 50 critical tests, 2 minutes
  E2E: 5 smoke tests, 3 minutes
  Linting: 10 seconds
  Total: ~6 minutes

Main Branch (blocks deployment):
  All PR tests +
  Integration: remaining 150 tests, 5 minutes
  E2E: full suite 30 tests, 15 minutes
  Total: ~26 minutes
```

**10.2 What test failures block merges?**

💡 **Should Block Merges**:
- ✅ Any unit test failure
- ✅ Critical integration test failures
- ✅ E2E smoke test failures
- ✅ Linting errors
- ✅ Type errors
- ✅ Security vulnerabilities (high/critical)
- ✅ Coverage drops below threshold

💡 **Should Warn but Not Block**:
- ⚠️ Documentation build failures
- ⚠️ Visual regression changes (requires review)
- ⚠️ Performance degradation (requires discussion)
- ⚠️ Low-severity security issues

💡 **Should Not Block**:
- ℹ️ Flaky E2E tests (quarantine them instead)
- ℹ️ Optional quality checks
- ℹ️ Informational reports

🎯 **Best Practice**: If a test is important enough to run in CI, it should block merges. If it's not important enough to block merges, question whether it should run on every PR.

⚠️ **Warning**: Too many blocking checks slow velocity. Too few let bugs reach production. Find the balance for your team.

📝 **Example Policy**:
```
Blocking (cannot merge):
- All tests pass (unit, integration, smoke E2E)
- Code coverage ≥ 80%
- No linting errors
- No type errors
- No high/critical security vulnerabilities

Non-blocking (requires discussion):
- Performance regression >10%
- Bundle size increase >5%
- Accessibility violations (warn, don't block)
- Visual changes (reviewable)
```

**10.3 How long do your test suites take to run?**
- Unit tests: _______ minutes
- Integration tests: _______ minutes
- E2E tests: _______ minutes
- Total test time acceptable before optimization needed: _______ minutes

📊 **Industry Benchmarks**:

**Unit Tests**:
- Good: < 1 minute
- Acceptable: 1-3 minutes
- Needs optimization: > 5 minutes

**Integration Tests**:
- Good: < 3 minutes
- Acceptable: 3-10 minutes
- Needs optimization: > 15 minutes

**E2E Tests**:
- Good: < 5 minutes
- Acceptable: 5-15 minutes
- Needs optimization: > 30 minutes

**Total PR Test Time**:
- Excellent: < 5 minutes (developers wait)
- Good: 5-10 minutes (developers switch tasks)
- Acceptable: 10-20 minutes (plan for context switching)
- Poor: > 20 minutes (developers will skip running tests locally)

💡 **Optimization Strategies When Tests Are Slow**:
1. **Parallelize**: Run tests concurrently
2. **Split**: Separate fast (PR) and slow (main branch) tests
3. **Optimize**: Use in-memory DB, mock external services
4. **Delete**: Remove redundant or low-value tests
5. **Cache**: Cache dependencies, build artifacts

🎯 **Target**: PR tests < 10 minutes. Developers should get feedback before they switch tasks.

⚠️ **Warning**: Tests slower than 15 minutes on PR will be skipped by developers or cause productivity loss.

---

### Testing Culture

**11.1 Do you practice Test-Driven Development (TDD)?**
- [ ] A. Always - red/green/refactor for all new code
- [ ] B. For critical features and bug fixes
- [ ] C. Developers choose based on context
- [ ] D. Rarely - tests written after implementation
- [ ] E. Other: _______________

💡 **Suggestion**: Your TypeScript standards state "Practice Test-Driven Development (TDD) strictly."

⚖️ **TDD Trade-offs**:

**Pros**:
- Better test coverage (tests are never skipped)
- Better design (writing tests first exposes coupling)
- Faster debugging (tests define correct behavior)
- Fewer bugs reach production

**Cons**:
- Slower initial development (feels like more work up front)
- Learning curve (different mindset)
- Not suitable for all scenarios (exploratory coding, prototypes)

💡 **When TDD Works Best**:
- ✅ Business logic and algorithms
- ✅ Bug fixes (write failing test, then fix)
- ✅ APIs and backend services
- ✅ Well-understood requirements

💡 **When TDD Is Challenging**:
- ❌ Exploratory UI development
- ❌ Unclear requirements (need to prototype)
- ❌ Third-party integration (don't know the API yet)

🎯 **Pragmatic Approach**:
- **Always TDD**: Bug fixes (regression test)
- **Usually TDD**: Business logic, APIs
- **Sometimes TDD**: UI components, utilities
- **Rarely TDD**: Prototypes, spikes, learning new tech

📝 **TDD Process** (Red-Green-Refactor):
```
1. Red: Write failing test for desired behavior
2. Green: Write minimal code to pass the test
3. Refactor: Improve code quality, tests stay green
4. Repeat
```

**11.2 How do you handle legacy code without tests?**
- [ ] A. Add tests before making changes
- [ ] B. Add tests for changed portions only
- [ ] C. Gradually add tests when touching the code
- [ ] D. Rewrite with tests when significant changes needed
- [ ] E. Other: _______________

🎯 **Recommended Strategy: "Boy Scout Rule"**

Leave the code better than you found it. Each time you touch legacy code:
1. Add tests for the area you're modifying
2. Refactor to make it more testable (if needed)
3. Make your change with tests
4. Don't aim for 100% coverage, aim for gradual improvement

⚖️ **Options Analysis**:

**A. Add tests before any changes**:
- ✅ Safest approach
- ❌ Can be very time-consuming
- 💡 Use for: Critical code, large refactors

**B. Test changed portions only**:
- ✅ Balanced approach
- ✅ Tests accumulate over time
- 🎯 **Recommended for most cases**

**C. Gradually add tests**:
- ✅ Same as B, but more explicit strategy
- ✅ Builds test coverage sustainably

**D. Rewrite with tests**:
- ✅ Best outcome (clean code + tests)
- ❌ High risk, long timelines
- 💡 Use for: Completely unmaintainable code, major feature changes

⚠️ **Warning**: Don't let "we need 100% coverage" block progress. 60% coverage with tests for new code is better than 10% coverage and fear of changing anything.

📝 **Example Policy**:
```
When modifying legacy code:
1. Write characterization tests (capture current behavior)
2. Add unit tests for functions you're changing
3. Ensure your changes have test coverage
4. Don't worry about testing unchanged code

Exception: If changing critical systems (auth, payments),
add comprehensive tests first, even if time-consuming.
```

**11.3 Who is responsible for writing tests?**
- [ ] Developer who writes the code
- [ ] Separate QA team
- [ ] Paired writing (developer + QA)
- [ ] Other: _______________

🎯 **Best Practice**: Developer who writes the code (A)

💡 **Modern Testing Philosophy**:
- ✅ **Developer writes tests**: Unit, integration, and automated tests
- ✅ **QA team does**: Manual testing, exploratory testing, test strategy, test tooling
- ✅ **Paired approach**: QA helps define test cases, developers implement automation

⚠️ **Anti-pattern**: "Throw it over the wall to QA"
- Slow feedback loop (find bugs late)
- Developers don't learn from mistakes
- QA becomes bottleneck
- Manual testing doesn't scale

🎯 **Recommended Division of Labor**:

**Developers responsible for**:
- Unit tests
- Integration tests
- API tests
- Component tests
- Maintaining test infrastructure

**QA responsible for**:
- Test strategy and planning
- Exploratory testing
- User acceptance testing
- Test case design
- Testing tools and frameworks
- Performance and security testing
- Manual testing of hard-to-automate flows

**Shared responsibility**:
- E2E tests (QA designs, developers implement)
- Test coverage monitoring
- Bug triaging and prioritization

📝 **Example**: "Developers write all automated tests (unit, integration, E2E). QA team performs exploratory testing, designs test scenarios, and maintains E2E test infrastructure. For critical releases, QA does manual acceptance testing."

---

### Current Pain Points

**12.1 What are your biggest testing challenges or pain points right now?**

💡 **Common challenges to consider**:
- Slow test execution (> 10 min on PR)
- Flaky E2E tests (randomly failing)
- Low test coverage in legacy code
- Developers skipping tests under pressure
- Hard-to-test code (tight coupling, side effects)
- Expensive test infrastructure (device farms, browsers)
- Tests that break with every refactor (brittle tests)
- Lack of testing documentation/standards
- Difficulty testing edge cases
- No clear definition of test scope (unit vs integration)

📝 **Be specific**: Instead of "slow tests," specify "E2E test suite takes 45 minutes, blocking deployments."

**12.2 What testing practices would you like to improve or standardize?**

💡 **Areas commonly needing standardization**:
- Consistent test file organization
- Shared test utilities and factories
- Mocking strategy (what to mock, when)
- Test data management (fixtures, seeds, cleanup)
- E2E test selectors and page objects
- Performance test thresholds
- Accessibility testing process
- Mobile device testing coverage
- Definition of "done" (when are tests sufficient?)
- Onboarding documentation for testing practices

🎯 **Prioritization**: Choose 1-3 pain points to address. Don't try to fix everything at once.

---

## Section 2: API Design Standards

### API Architecture

**1.1 What types of APIs do you build?**
- [ ] REST APIs
- [ ] tRPC APIs
- [ ] GraphQL APIs
- [ ] gRPC APIs
- [ ] WebSocket/real-time APIs
- [ ] Other: _______________

💡 **When to use each**:

**REST**:
- ✅ Public APIs (standard, widely understood)
- ✅ CRUD operations
- ✅ Mobile apps (HTTP clients everywhere)
- ✅ Third-party integrations
- 📊 Most common choice (~70% of APIs)

**tRPC**:
- ✅ TypeScript monorepo (full type safety)
- ✅ Internal APIs (frontend + backend in same repo)
- ✅ Rapid development (no manual typing)
- ❌ TypeScript only (not language-agnostic)
- 💡 Your Hono API guide mentions tRPC support

**GraphQL**:
- ✅ Complex data requirements
- ✅ Multiple clients with different needs
- ✅ Reducing over-fetching
- ❌ More complex (schemas, resolvers, caching)
- ⚖️ Consider: Adds significant complexity, use only if benefits are clear

**gRPC**:
- ✅ Microservice communication (efficient, fast)
- ✅ Streaming data
- ❌ Not browser-friendly (needs grpc-web)
- 💡 Use for: Backend-to-backend only

**WebSocket**:
- ✅ Real-time features (chat, live updates, gaming)
- ✅ Bi-directional communication
- ❌ More complex (connection management, reconnection)
- ⚖️ Consider: HTTP/2 SSE for server-to-client only

🎯 **Best Practice**: Start with REST (or tRPC if TypeScript monorepo). Add others only when you have a specific need they address.

**1.2 For REST APIs, what conventions do you follow?**
- HTTP methods: [ ] Full CRUD (GET/POST/PUT/PATCH/DELETE) [ ] Subset only [ ] Other
- Resource naming: [ ] Plural nouns [ ] Singular nouns [ ] Mixed
- URL casing: [ ] kebab-case [ ] snake_case [ ] camelCase
- Nested resources: [ ] Yes, up to N levels [ ] Flat structure only

💡 **REST Best Practices**:

**HTTP Methods**:
- GET: Retrieve resources (safe, idempotent)
- POST: Create resources
- PUT: Replace entire resource (idempotent)
- PATCH: Partially update resource
- DELETE: Remove resource (idempotent)
- 🎯 Use all five for full CRUD expressiveness

**Resource Naming**:
- ✅ **Plural nouns**: `/users`, `/posts`, `/comments` (Recommended)
- Consistent, predictable
- `/users/123` reads naturally: "users, specifically user 123"

**URL Casing**:
- ✅ **kebab-case**: `/user-profiles`, `/order-history` (Recommended)
- URLs are case-insensitive in many systems
- Most readable in URLs
- 💡 Your Hono guide specifies kebab-case

**Nested Resources**:
```
✅ Good: 1-2 levels
  /users/123/posts
  /organizations/456/teams/789/members

❌ Too deep: 3+ levels
  /orgs/1/teams/2/projects/3/tasks/4/comments (hard to use)

🎯 Alternative: Query parameters
  /comments?task_id=4
```

📝 **Example RESTful API**:
```
GET    /api/v1/users           # List users
POST   /api/v1/users           # Create user
GET    /api/v1/users/123       # Get user
PUT    /api/v1/users/123       # Replace user
PATCH  /api/v1/users/123       # Update user
DELETE /api/v1/users/123       # Delete user
GET    /api/v1/users/123/posts # User's posts
```

**1.3 What's your stance on REST vs tRPC?**

⚖️ **REST vs tRPC Decision Matrix**:

**Choose REST when**:
- ✅ Public API (third-party developers)
- ✅ Multi-language clients (mobile, web, external)
- ✅ Standard HTTP clients (curl, Postman, Insomnia)
- ✅ API versioning important
- ✅ Large team (REST is universally understood)

**Choose tRPC when**:
- ✅ TypeScript monorepo (frontend + backend)
- ✅ Internal API only (not public)
- ✅ Small team (1-5 developers)
- ✅ Want end-to-end type safety
- ✅ Rapid development velocity matters

**Use both**:
- Public-facing REST API for external consumers
- Internal tRPC for your own frontend
- 💡 Example: Stripe has public REST API but uses internal RPC

🎯 **Recommendation for SevenTwo Studio**:
Given your product studio nature and developer tools focus:
- **Developer tools / APIs**: REST (needs to be language-agnostic)
- **Internal tools / dashboards**: tRPC (TypeScript, faster development)
- **Consumer apps**: REST (mobile clients) or tRPC (if Expo/web only)

---

### Request/Response Format

**2.1 What format do your APIs use?**
- Request body: [ ] JSON [ ] Other: _______
- Response body: [ ] JSON [ ] Other: _______
- Date format: _________________ (ISO 8601, Unix timestamp, etc.)
- Enum format: [ ] Strings [ ] Numbers [ ] Other: _______

💡 **Standard Recommendations**:

**Body Format**:
- ✅ **JSON**: Universal, human-readable, supported everywhere
- Use **JSON** for 99% of cases
- Alternatives only for: File uploads (multipart/form-data), streaming (SSE, binary)

**Date Format**:
- ✅ **ISO 8601**: `2024-01-15T14:30:00Z` (Recommended)
  - Human readable
  - Includes timezone
  - Sortable as string
  - Standard library support

- ⚠️ **Unix timestamp**: `1705329000`
  - Compact
  - Hard to read/debug
  - Loses precision in some languages
  - Use only for performance-critical cases

🎯 **Best Practice**: ISO 8601 with UTC timezone. Always include timezone info.

**Enum Format**:
- ✅ **Strings**: `"status": "active"` (Recommended)
  - Self-documenting
  - API evolution-friendly
  - Debuggable

- ❌ **Numbers**: `"status": 1`
  - Requires documentation
  - Breaks when adding values in middle
  - Harder to debug

📝 **Example**:
```json
{
  "id": "123",
  "email": "user@example.com",
  "status": "active",
  "role": "admin",
  "createdAt": "2024-01-15T14:30:00Z",
  "lastLoginAt": "2024-01-15T14:30:00Z"
}
```

**2.2 Do you have a standard response structure?**

🎯 **Best Practice**: Consistent response structure across all endpoints

💡 **Option 1: Flat Response** (Simpler, for small APIs)
```json
// Success
{
  "id": 123,
  "name": "Example"
}

// List
{
  "users": [...],
  "total": 100
}

// Error
{
  "error": "User not found",
  "code": "USER_NOT_FOUND"
}
```

💡 **Option 2: Envelope Response** (More structured, for complex APIs)
```json
// Success
{
  "success": true,
  "data": {
    "id": 123,
    "name": "Example"
  }
}

// Error
{
  "success": false,
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "User not found",
    "details": {}
  }
}
```

⚖️ **Trade-offs**:
- **Flat**: Simpler, less nesting, standard REST approach
- **Envelope**: Consistent structure, easier client parsing, can add metadata

🎯 **Recommendation**: Start with flat responses (Option 1). Use envelope only if you need metadata on every response.

**2.3 How do you handle response metadata (pagination, counts, etc.)?**

💡 **Option 1: In Response Body** (Most common)
```json
{
  "users": [...],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

💡 **Option 2: In HTTP Headers** (RESTful)
```
Link: </users?page=2>; rel="next"
X-Total-Count: 100
X-Page: 1
X-Per-Page: 20
```

💡 **Option 3: Mixed** (Body for data, headers for cache/metadata)
```json
// Body
{
  "users": [...],
  "nextCursor": "eyJpZCI6MTIzfQ=="
}

// Headers
X-Total-Count: 100
Cache-Control: max-age=60
```

⚖️ **Trade-offs**:
- **Body**: Easier for clients, all info in one place, obvious
- **Headers**: Cleaner JSON, RESTful, but clients must read headers
- **Mixed**: Best of both, but more complex

🎯 **Recommendation**: Put pagination in response body (Option 1). Use headers for caching and rate limiting only.

---

### HTTP Status Codes

**3.1 Which HTTP status codes do you use and when?**

💡 **Essential Status Codes** (Use these):

**Success (2xx)**:
- **200 OK**: GET requests, successful updates
- **201 Created**: POST requests that create resources (include Location header)
- **204 No Content**: DELETE successful, PUT with no response body

**Client Errors (4xx)**:
- **400 Bad Request**: Malformed request (syntax error)
- **401 Unauthorized**: Authentication missing or invalid
- **403 Forbidden**: Authenticated but lacking permission
- **404 Not Found**: Resource doesn't exist
- **422 Unprocessable Entity**: Validation failed (semantic error)
- **429 Too Many Requests**: Rate limit exceeded

**Server Errors (5xx)**:
- **500 Internal Server Error**: Unhandled exception
- **502 Bad Gateway**: Upstream service error
- **503 Service Unavailable**: Temporary downtime, maintenance

🎯 **Most Used**: 200, 201, 400, 401, 403, 404, 422, 500

⚠️ **Don't Overuse**: Using 20+ status codes creates confusion. Stick to common ones.

**3.2 How do you distinguish between 401 and 403?**

💡 **Clear Distinction**:

**401 Unauthorized** = "Who are you?"
- No authentication provided
- Invalid credentials
- Expired token
- **Action**: Client should authenticate
- **Response**: Include `WWW-Authenticate` header

```json
// 401 Response
{
  "error": "Authentication required",
  "code": "UNAUTHENTICATED"
}
```

**403 Forbidden** = "I know who you are, but you can't do that"
- Valid authentication
- Insufficient permissions
- Account suspended
- **Action**: Client cannot retry with same credentials
- **Response**: Explain what permission is missing

```json
// 403 Response
{
  "error": "Insufficient permissions. Admin role required.",
  "code": "FORBIDDEN",
  "requiredRole": "admin"
}
```

📝 **Examples**:
```
GET /admin/users
No Authorization header -> 401 (Who are you?)
Authorization: Bearer <valid-user-token> -> 403 (You're a user, not admin)
Authorization: Bearer <valid-admin-token> -> 200 (Success)
```

🎯 **Simple Rule**:
- No auth or invalid auth = 401
- Valid auth, wrong permissions = 403

**3.3 How do you distinguish between 400 and 422?**

💡 **Clear Distinction**:

**400 Bad Request** = "I can't parse this"
- Malformed JSON
- Missing required header
- Invalid content type
- Wrong HTTP method
- Syntax errors

```json
// 400 Response
{
  "error": "Invalid JSON syntax",
  "code": "INVALID_REQUEST"
}
```

**422 Unprocessable Entity** = "I understand the request, but the data is wrong"
- Validation errors
- Business rule violations
- Invalid email format
- Password too weak
- Semantic errors

```json
// 422 Response
{
  "error": "Validation failed",
  "code": "VALIDATION_ERROR",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    },
    {
      "field": "password",
      "message": "Password must be at least 8 characters"
    }
  ]
}
```

📝 **Examples**:
```
POST /users
Body: "{"email": invalid json" -> 400 (Can't parse JSON)
Body: {} -> 422 (Missing required fields)
Body: {"email": "not-an-email"} -> 422 (Invalid email format)
```

🎯 **Simple Rule**:
- Can't parse the request = 400
- Parsed, but validation failed = 422

---

### Error Handling

**4.1 What's your standard error response format?**

🎯 **Recommended Error Format**:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "fields": [
        {
          "field": "email",
          "message": "Invalid email format",
          "value": "not-an-email"
        }
      ]
    },
    "requestId": "req_1234567890",
    "timestamp": "2024-01-15T14:30:00Z"
  }
}
```

💡 **Essential Error Fields**:
- ✅ **code**: Machine-readable error code (UPPERCASE_SNAKE_CASE)
- ✅ **message**: Human-readable description
- ✅ **requestId**: For support/debugging
- ⚠️ **timestamp**: When error occurred (ISO 8601)

💡 **Optional Error Fields**:
- **details**: Additional context (validation errors, affected resources)
- **stackTrace**: Only in development, never production
- **documentation**: Link to error documentation
- **retryable**: Boolean indicating if client should retry

⚠️ **Security**: Never expose:
- Stack traces (production)
- Database errors
- File paths
- Internal service names
- Sensitive data

**4.2 Do you use error codes beyond HTTP status codes?**
- [ ] Yes, application-specific error codes (example: _________)
- [ ] No, HTTP status codes are sufficient
- [ ] Depends on the API type

💡 **Why Application Error Codes**:

**Benefits**:
- ✅ More specific than HTTP codes (`EMAIL_ALREADY_EXISTS` vs generic 422)
- ✅ Client can handle errors programmatically
- ✅ Stable (HTTP code might change, app code stays)
- ✅ Helps with i18n (map code to translated message)
- ✅ Better logging and monitoring

**Example codes**:
```
AUTH_INVALID_CREDENTIALS
AUTH_TOKEN_EXPIRED
USER_NOT_FOUND
EMAIL_ALREADY_EXISTS
INSUFFICIENT_PERMISSIONS
RATE_LIMIT_EXCEEDED
PAYMENT_FAILED
EXTERNAL_SERVICE_UNAVAILABLE
```

🎯 **Best Practice**: Use both HTTP status codes (transport layer) and application error codes (business layer).

📝 **Example**:
```typescript
// HTTP 422 + specific error code
{
  "error": {
    "code": "EMAIL_ALREADY_EXISTS",
    "message": "An account with this email already exists",
    "field": "email"
  }
}

// Client can handle specifically
if (error.code === 'EMAIL_ALREADY_EXISTS') {
  showLoginPrompt();
}
```

**4.3 How detailed are your error messages?**
- [ ] A. Generic messages for security ("An error occurred")
- [ ] B. Descriptive messages but no internal details
- [ ] C. Very specific with field-level validation errors
- [ ] D. Different detail levels for dev vs production
- [ ] E. Other: _______________

🎯 **Recommended: Different detail by environment (D)**

💡 **Development Environment**:
```json
{
  "error": {
    "code": "DATABASE_ERROR",
    "message": "Failed to query database",
    "details": {
      "query": "SELECT * FROM users WHERE id = $1",
      "error": "relation \"users\" does not exist",
      "stackTrace": "Error: relation \"users\" does not exist\n    at Query.parseError (/app/node_modules/pg/lib/query.js:245:25)"
    }
  }
}
```

💡 **Production Environment**:
```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An internal error occurred. Please try again or contact support.",
    "requestId": "req_1234567890"
  }
}
```

⚖️ **Balance**:
- **Too generic**: Developers can't debug, users frustrated
- **Too detailed**: Security risk, exposes implementation
- **Just right**: Helpful for users/developers, safe for production

🎯 **Best Practice Error Messages**:
- ✅ Validation errors: Specific field-level details
- ✅ Business logic errors: Clear explanation
- ✅ Auth errors: Generic ("Invalid credentials" not "User not found")
- ✅ Server errors: Generic message, detailed logs

⚠️ **Security**: Your handbook mentions "Error messages are generic for users but detailed in logs."

**4.4 For validation errors, how do you structure field-level errors?**

🎯 **Recommended Field Error Format**:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed for 2 fields",
    "errors": [
      {
        "field": "email",
        "code": "INVALID_FORMAT",
        "message": "Must be a valid email address",
        "value": "not-an-email"
      },
      {
        "field": "password",
        "code": "TOO_SHORT",
        "message": "Must be at least 8 characters",
        "constraints": {
          "minLength": 8,
          "actualLength": 5
        }
      },
      {
        "field": "age",
        "code": "OUT_OF_RANGE",
        "message": "Must be between 18 and 120",
        "constraints": {
          "min": 18,
          "max": 120
        }
      }
    ]
  }
}
```

💡 **Field Error Fields**:
- ✅ **field**: JSON path to the field (`email`, `address.zipCode`)
- ✅ **code**: Machine-readable error code
- ✅ **message**: Human-readable message
- Optional: **value** (for debugging, but be careful with sensitive data)
- Optional: **constraints** (min/max, regex, allowed values)

📝 **Example with nested fields**:
```json
{
  "errors": [
    {
      "field": "billingAddress.postalCode",
      "code": "INVALID_FORMAT",
      "message": "Postal code must be 5 digits"
    }
  ]
}
```

🎯 **Best Practice**: Match error format to your validation library's output (Zod, class-validator, etc.) for easy mapping.

**4.5 How do you handle errors in production vs development?**

💡 **Your existing standards mention**: "Development environments show detailed errors for debugging. Production environments show generic errors to users while logging detailed information for developers."

📝 **Example Implementation**:

```typescript
// Error Handler Middleware
app.use((error, req, res, next) => {
  // Always log full details
  logger.error({
    error: error.message,
    stack: error.stack,
    requestId: req.id,
    url: req.url,
    userId: req.user?.id
  });

  // Response depends on environment
  if (process.env.NODE_ENV === 'development') {
    return res.status(500).json({
      error: {
        code: error.code || 'INTERNAL_ERROR',
        message: error.message,
        stack: error.stack,
        details: error.details
      }
    });
  }

  // Production: sanitized error
  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An internal error occurred',
      requestId: req.id
    }
  });
});
```

---

### API Versioning

**5.1 Do you version your APIs?**
- [ ] A. Yes, URL path versioning (/v1/, /v2/)
- [ ] B. Yes, header versioning (Accept: application/vnd.api.v1+json)
- [ ] C. Yes, query parameter versioning (?version=1)
- [ ] D. No, we maintain backward compatibility
- [ ] E. Other: _______________

💡 **Your Hono guide specifies**: "Version APIs using URL path versioning with the format `/v1/resource`"

⚖️ **Versioning Strategy Trade-offs**:

**A. URL Path** `/api/v1/users`:
- ✅ Most common, simple, explicit
- ✅ Easy to route, cache, debug
- ✅ Visible in logs, URLs shareable
- ❌ URL changes per version
- 🎯 **Recommended** for most APIs

**B. Header** `Accept: application/vnd.api.v1+json`:
- ✅ RESTful (content negotiation)
- ✅ URL stays same across versions
- ❌ Harder to test (Postman/curl)
- ❌ Less visible, harder to debug
- 💡 Use for: Mature APIs with stable URLs

**C. Query Parameter** `/users?version=1`:
- ✅ Simple, easy to test
- ❌ Pollutes query params
- ❌ Caching issues
- ⚠️ Avoid: Not standard practice

**D. No versioning**:
- ✅ Simple URLs
- ✅ Forces backward compatibility
- ❌ Breaking changes require workarounds
- 💡 Use for: Internal APIs only, small teams

🎯 **Best Practice**: URL path versioning (A) for public APIs. No versioning (D) for internal tRPC APIs.

**5.2 What's your versioning strategy?**

💡 **Questions to answer**:

**When to bump versions?**
- ✅ Breaking changes (removing fields, changing types)
- ✅ Changed behavior (same endpoint, different result)
- ❌ Adding new fields (backward compatible)
- ❌ New endpoints (backward compatible)
- ❌ Bug fixes (not a version change)

**How many versions to maintain?**
- 📊 **Typical**: Current + 1 previous version (v2 + v1)
- 📊 **Conservative**: Current + 2 previous versions
- ⚠️ **Warning**: Each version multiplies maintenance burden

**Deprecation timeline?**
- 📊 **Common**: 6-12 months notice before removing version
- 💡 Steps:
  1. Announce deprecation (v1 deprecated, v2 available)
  2. Warning period (v1 returns deprecation headers)
  3. Sunset date announced (v1 will stop working on DATE)
  4. Remove v1

📝 **Example Strategy**:
```
API Version Policy:
- URL path versioning (/v1/, /v2/)
- Breaking changes trigger major version bump
- Maintain current + 1 previous version
- 6 month deprecation notice before sunset
- Old version returns Deprecation header
- Sunset date in API documentation
```

**5.3 How do you communicate breaking changes to API consumers?**

💡 **Multi-Channel Communication**:

**1. Deprecation Headers** (Automated):
```
Deprecation: true
Sunset: Sat, 31 Dec 2024 23:59:59 GMT
Link: <https://api.example.com/docs/v2>; rel="successor-version"
```

**2. API Response Warnings**:
```json
{
  "data": {...},
  "warnings": [
    {
      "code": "DEPRECATED_VERSION",
      "message": "API v1 will be sunset on 2024-12-31. Migrate to v2.",
      "link": "https://docs.example.com/migration/v1-to-v2"
    }
  ]
}
```

**3. Documentation**:
- ✅ Prominent deprecation notices in API docs
- ✅ Migration guide (what changed, how to upgrade)
- ✅ Code examples for v1 -> v2 migration
- ✅ Changelog with breaking changes highlighted

**4. Direct Communication**:
- ✅ Email to registered API users
- ✅ Dashboard notifications
- ✅ Blog post announcement
- ✅ Monthly reminders as sunset approaches

**5. Monitoring**:
- Track who's still using deprecated versions
- Reach out to high-volume users personally
- Offer migration assistance to key customers

🎯 **Timeline Example**:
```
T-0: V2 released, v1 marked deprecated
T+1 week: Email announcement to all API users
T+1 month: Deprecation headers added to v1
T+3 months: Dashboard warnings for v1 users
T+5 months: Final warning emails
T+6 months: V1 sunset, returns 410 Gone
```

**5.4 What's your deprecation policy?**

📝 **Example Deprecation Policy**:

```markdown
## API Deprecation Policy

### Versioning
- Major versions for breaking changes (/v1/, /v2/)
- Minor versions backward compatible (no URL change)

### Support Timeline
- Current version: Fully supported
- Previous version: Deprecated, supported for 6 months
- Older versions: Removed

### Breaking Changes
Breaking changes include:
- Removing fields
- Renaming fields
- Changing field types
- Changing authentication
- Removing endpoints
- Changing behavior significantly

### Deprecation Process
1. **Announcement** (T-6 months):
   - Email to all API users
   - Documentation updated
   - Blog post published

2. **Warning Period** (T-6 to T-1 month):
   - Deprecation headers on all responses
   - Dashboard warnings
   - Monthly email reminders

3. **Final Warning** (T-1 month):
   - Final email with exact sunset date
   - Personal outreach to high-volume users

4. **Sunset** (T-day):
   - Deprecated version returns 410 Gone
   - Response includes migration link

### Exception Process
Critical security vulnerabilities may be fixed without
6-month notice. Users will be notified immediately.
```

⚠️ **Important**: Document and stick to your policy. Breaking it damages trust.

---

### Authentication & Authorization

**6.1 What authentication methods do you support?**
- [ ] JWT (Bearer tokens)
- [ ] API keys
- [ ] OAuth 2.0
- [ ] Session-based (cookies)
- [ ] Basic Auth
- [ ] Passkeys/WebAuthn
- [ ] Other: _______________

💡 **Your existing Security Standards mention**: JWT, Session-based, OAuth 2.0, Passkeys/WebAuthn

⚖️ **When to use each**:

**JWT (Bearer tokens)**:
- ✅ Stateless APIs, microservices
- ✅ Mobile apps, SPAs
- ✅ Cross-domain requests
- ⚠️ Cannot invalidate (until expiry)
- 🎯 Most common for modern APIs

**API Keys**:
- ✅ Server-to-server
- ✅ Simple, no expiration
- ⚠️ Less secure (no expiry, hard to rotate)
- 💡 Use for: Internal services, developer access

**OAuth 2.0**:
- ✅ Third-party access
- ✅ "Sign in with Google/GitHub"
- ✅ Granular scopes
- ❌ Complex to implement
- 🎯 Use for: Third-party integrations

**Session-based (cookies)**:
- ✅ Traditional web apps (SSR)
- ✅ Can invalidate sessions
- ❌ Stateful (needs session store)
- ❌ CSRF concerns
- 💡 Use for: Server-rendered apps

**Basic Auth**:
- ✅ Simple, built into HTTP
- ⚠️ Sends credentials on every request
- ⚠️ Only use over HTTPS
- 💡 Use for: Development, simple webhooks

**Passkeys/WebAuthn**:
- ✅ Most secure, phishing-resistant
- ✅ Great UX (biometrics)
- ❌ Newer, less universal support
- 🎯 Use for: High-security apps, consumer apps

📝 **Typical Setup**:
```
Public REST API: JWT + API keys
Web app: Session-based + OAuth (social login)
Mobile app: JWT + OAuth
Internal services: API keys
High-security features: Passkeys
```

**6.2 How do you structure your JWT tokens (if using)?**

🎯 **Recommended JWT Payload**:

```json
{
  // Standard claims (RFC 7519)
  "iss": "https://api.example.com",
  "sub": "user_123",
  "aud": "https://app.example.com",
  "exp": 1705329000,
  "iat": 1705328400,
  "jti": "unique-token-id",

  // Custom claims
  "userId": "user_123",
  "email": "user@example.com",
  "role": "admin",
  "permissions": ["users:read", "users:write"],
  "tenantId": "org_456"
}
```

💡 **JWT Claims Explained**:
- **iss** (issuer): Who created the token
- **sub** (subject): User identifier
- **aud** (audience): Who should accept this token
- **exp** (expiration): Unix timestamp when token expires
- **iat** (issued at): When token was created
- **jti** (JWT ID): Unique identifier (for revocation)

⚠️ **What NOT to put in JWT**:
- ❌ Passwords (JWTs are not encrypted, just encoded)
- ❌ Sensitive personal data (SSN, payment info)
- ❌ Large data (keeps JWTs small, sent on every request)

🎯 **Best Practices**:
- Keep JWTs small (<1KB)
- Use short expiration (15-60 minutes)
- Use refresh tokens for long-lived sessions
- Include only data needed for authorization

📝 **Example JWT Strategy**:
```
Access Token (JWT):
- Short-lived (15 minutes)
- Contains: userId, role, permissions
- Sent on every API request

Refresh Token:
- Long-lived (7-30 days)
- Opaque token (not JWT)
- Stored in HTTP-only cookie
- Used to get new access token
```

**6.3 What are your token expiration policies?**

📊 **Industry Standards**:

**Access Tokens (JWT)**:
- **Very Secure**: 5-15 minutes
- **Balanced**: 15-60 minutes
- **Convenient**: 1-24 hours
- 🎯 **Recommended**: 15-30 minutes

**Refresh Tokens**:
- **Short-lived**: 24 hours - 7 days
- **Balanced**: 7-30 days
- **Long-lived**: 30-90 days
- 🎯 **Recommended**: 7-30 days with rotation

**API Keys**:
- **Never expire** (can be revoked)
- Or: **90 days** (forced rotation)

⚖️ **Trade-offs**:
- **Shorter expiration**: More secure, but more token refreshes (UX impact)
- **Longer expiration**: Better UX, but stolen tokens valid longer

💡 **Your Security Standards mention**: "JWT tokens have appropriate expiration times and are validated thoroughly on each request. We use refresh tokens for long-lived sessions without exposing long-lived access tokens."

📝 **Example Token Strategy**:
```
Access Token:
- Expiration: 15 minutes
- Storage: Memory (SPA) or secure variable (mobile)
- Sent via: Authorization: Bearer header

Refresh Token:
- Expiration: 30 days
- Storage: HTTP-only cookie (web) or secure storage (mobile)
- Rotation: New refresh token on each use
- Sent via: Cookie or dedicated endpoint

Logout:
- Clear access token
- Revoke refresh token (blacklist or delete from DB)
```

**6.4 How do you handle authorization (permissions/roles)?**
- [ ] A. Role-based access control (RBAC)
- [ ] B. Permission-based access control
- [ ] C. Attribute-based access control (ABAC)
- [ ] D. Resource ownership (user can only access own resources)
- [ ] E. Mix of approaches: _______________

⚖️ **Authorization Models**:

**A. Role-Based Access Control (RBAC)**:
```
Roles: admin, editor, viewer
admin -> all permissions
editor -> create, read, update
viewer -> read only
```
- ✅ Simple, easy to understand
- ✅ Scales to medium complexity
- ❌ Rigid (can't customize per user)
- 🎯 Use for: Most applications

**B. Permission-Based**:
```
Permissions: users:read, users:write, posts:delete
User has explicit permissions list
```
- ✅ Fine-grained control
- ✅ Flexible
- ❌ More complex to manage
- 🎯 Use for: Admin panels, complex access needs

**C. Attribute-Based (ABAC)**:
```
Rules:
- If user.role === 'manager' AND user.department === resource.department
- If user.age >= 18 AND resource.type === 'adult-content'
```
- ✅ Most flexible
- ✅ Context-aware
- ❌ Complex to implement and debug
- 🎯 Use for: Enterprise apps with complex rules

**D. Resource Ownership**:
```
User can only access/modify their own resources
```
- ✅ Simple, secure by default
- ✅ Good for multi-tenant
- ❌ Doesn't cover shared resources
- 🎯 Use with: Other models

🎯 **Recommended: RBAC + Resource Ownership (Mix)**

📝 **Example Authorization Strategy**:
```typescript
// RBAC for general permissions
const roles = {
  admin: ['*'],
  editor: ['posts:*', 'comments:read'],
  user: ['posts:read', 'comments:read']
};

// + Resource ownership
function canEditPost(user, post) {
  // Admin can edit any post
  if (user.role === 'admin') return true;

  // Editor can edit any post
  if (user.role === 'editor') return true;

  // User can edit their own posts
  if (post.authorId === user.id) return true;

  return false;
}
```

**6.5 Where do you implement authorization checks?**
- [ ] A. Middleware applied to routes
- [ ] B. Within route handlers
- [ ] C. Service layer functions
- [ ] D. Database row-level security
- [ ] E. Multiple layers: _______________

🎯 **Recommended: Multiple Layers (Defense in Depth)**

💡 **Authorization Layers**:

**1. Route Middleware** (Coarse-grained):
```typescript
app.get('/admin/*', requireRole('admin'), adminRoutes);
app.post('/posts', requireAuth, createPost);
```
- ✅ Prevents unauthorized access early
- ✅ Clear declaration of requirements
- ❌ Can't check resource ownership

**2. Handler/Controller** (Business logic):
```typescript
async function updatePost(req, res) {
  const post = await getPost(req.params.id);

  if (!canEditPost(req.user, post)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Update logic
}
```
- ✅ Can check resource ownership
- ✅ Business context available

**3. Service Layer** (Encapsulated):
```typescript
class PostService {
  async updatePost(userId, postId, data) {
    const post = await this.getPost(postId);

    if (post.authorId !== userId) {
      throw new ForbiddenError();
    }

    return this.db.posts.update(postId, data);
  }
}
```
- ✅ Authorization logic reusable
- ✅ Can't be bypassed by calling service directly

**4. Database Row-Level Security** (Ultimate defense):
```sql
-- PostgreSQL RLS example
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY posts_user_policy ON posts
  USING (author_id = current_user_id());
```
- ✅ Cannot be bypassed in code
- ✅ Works even with SQL injection
- ❌ More complex, database-specific

🎯 **Recommended Approach**:
1. **Middleware**: Require authentication, broad role checks
2. **Handler**: Fine-grained authorization (resource ownership)
3. **Service (optional)**: When logic is reused
4. **Database RLS (optional)**: For very sensitive data

⚠️ **Common Mistake**: Only checking authorization in frontend. Always validate on backend.

---

(Continuing in next part due to length...)

**Would you like me to continue with the remaining sections? The interview is quite comprehensive and I'm about halfway through adding detailed guidance. I can continue with:**

- Input Validation (detailed Zod guidance)
- Pagination (cursor vs offset comparisons)
- Filtering, Sorting & Searching
- Rate Limiting (strategies and tools)
- API Documentation (OpenAPI best practices)
- And all remaining sections...

Let me know if you'd like me to complete the rest!
