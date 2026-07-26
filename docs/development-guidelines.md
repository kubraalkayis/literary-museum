# Literary Museum — Development Guidelines

**Document Version:** 1.0  
**Project Codename:** Literary Museum  
**Status:** Active

> This document defines the development conventions and workflow used throughout the Literary Museum project.

---

## 1. Purpose

These guidelines exist to keep the Literary Museum codebase consistent, understandable, secure, and maintainable as the project grows.

They define conventions for:

- Git and GitHub workflow
- Branch management
- Commit messages
- Issues and pull requests
- Code organization
- Naming conventions
- Documentation
- Testing
- Environment variables
- Security
- Code review

These rules may evolve as the project grows.

---

## 2. Project Language

English is the primary development language of the project.

English should be used for:

- Source code
- Variable names
- Function names
- Class names
- Database fields
- API endpoints
- Git branches
- Commit messages
- GitHub Issues
- Pull Requests
- Technical documentation
- Code comments

The application itself will initially support both English and Turkish.

User-facing translations should remain separate from source-code naming.

### Correct

```python
def create_magazine():
    pass
```

### Avoid

```python
def dergi_olustur():
    pass
```

---

## 3. Repository Structure

The project is planned as a full-stack application with separate frontend and backend areas.

```text
literary-museum/
│
├── backend/
├── frontend/
├── docs/
├── design/
├── assets/
│
├── .gitignore
└── README.md
```

Responsibilities should remain separated between these areas.

---

## 4. Git Workflow

The `main` branch represents the stable state of the project.

Significant development work should normally be performed on separate branches.

Basic workflow:

```text
GitHub Issue
      ↓
Create Branch
      ↓
Development
      ↓
Commit
      ↓
Push
      ↓
Pull Request
      ↓
Review / Testing
      ↓
Merge into main
```

During the early documentation phase, small documentation-only changes may be committed directly to `main`.

Once implementation begins, feature branches should become the default workflow.

---

## 5. Branch Naming

Branch names should clearly communicate their purpose.

### Features

```text
feature/user-authentication
feature/personal-museum
feature/magazine-editor
```

### Bug Fixes

```text
fix/login-validation
fix/magazine-permissions
```

### Documentation

```text
docs/database-design
docs/api-documentation
```

### Refactoring

```text
refactor/post-service
```

### Testing

```text
test/authentication-api
```

### Configuration / Maintenance

```text
chore/docker-setup
chore/update-dependencies
```

Branch names should:

- Use lowercase letters.
- Use hyphens between words.
- Be concise.
- Describe one primary purpose.

---

## 6. Commit Messages

Commit messages should be written in English and describe what changed.

The project will use a lightweight Conventional Commits style.

### Format

```text
type: short description
```

Common types:

| Type | Purpose |
| --- | --- |
| `feat` | New functionality |
| `fix` | Bug fix |
| `docs` | Documentation |
| `style` | Formatting without behavioral changes |
| `refactor` | Internal code restructuring |
| `test` | Tests |
| `chore` | Configuration or maintenance |
| `perf` | Performance improvement |

### Examples

```text
feat: add user registration endpoint
fix: enforce followers-only post visibility
docs: add database architecture
refactor: simplify magazine permission service
test: add post authorization tests
chore: configure environment variables
```

### Avoid

```text
update
changes
stuff
fixed
final
final2
working version
```

A commit should represent a meaningful and understandable change.

---

## 7. GitHub Issues

Development tasks should be tracked through GitHub Issues.

An issue should represent a clear piece of work.

Examples:

```text
Implement user registration
Design database schema
Create magazine detail page
Add permission request API
```

Broad categories such as `Backend` or `Documentation` should not normally be used as individual implementation tasks.

Issues may contain:

- Objective
- Requirements
- Acceptance criteria
- Technical notes
- Related user story
- Dependencies

---

## 8. Issue Labels

Issues should be categorized where useful.

Planned labels include:

```text
documentation
design
frontend
backend
database
infrastructure
testing
bug
feature
security
```

Additional labels may be introduced when the project requires them.

---

## 9. Project Board Workflow

The GitHub Project board uses three primary states:

```text
Todo
In Progress
Done
```

### Todo

The task is planned but active work has not started.

### In Progress

The task is currently being worked on.

### Done

The defined acceptance criteria have been completed.

Only tasks actively being worked on should normally remain in `In Progress`.

---

## 10. Pull Requests

Once implementation begins, significant changes should normally reach `main` through Pull Requests.

A Pull Request should explain:

- What was changed
- Why it was changed
- Related issue
- How it was tested
- Any important technical decisions

Example:

```markdown
## Summary

Adds the initial user registration API.

## Changes

- Add registration serializer
- Add registration endpoint
- Validate unique email addresses
- Add password validation

## Related Issue

Closes #42

## Testing

- Registration with valid credentials
- Duplicate email validation
- Invalid password validation
```

---

## 11. Code Review

Code should be reviewed before major changes are merged into `main`.

Even when the project has only one active developer, Pull Requests can be used to review:

- Unexpected changes
- Naming
- Architecture
- Security
- Tests
- Code readability

Self-review is still valuable.

---

## 12. Python & Django Conventions

Backend code should follow established Python conventions.

General principles:

- Follow PEP 8.
- Use meaningful names.
- Keep functions focused.
- Avoid unnecessary duplication.
- Separate business logic where appropriate.
- Keep views/controllers from becoming unnecessarily large.
- Validate external input.
- Use Django migrations for database schema changes.

### Naming

Variables and functions:

```python
create_post()
permission_request
magazine_owner
```

Classes:

```python
PermissionRequest
PersonalMuseum
MagazineIssue
```

Constants:

```python
MAX_UPLOAD_SIZE
DEFAULT_PAGE_SIZE
```

---

## 13. TypeScript & React Conventions

Frontend code should prioritize readability and reusable components.

General principles:

- Prefer TypeScript over plain JavaScript.
- Define types for important application data.
- Build reusable components where appropriate.
- Avoid excessively large components.
- Separate data fetching and presentation when useful.
- Keep accessibility in mind while building components.

Example component names:

```text
MagazineCard
UserProfile
MuseumGallery
PermissionRequestModal
```

---

## 14. Naming Principles

Names should describe intent rather than implementation details.

### Prefer

```text
requestFeaturePermission()
canViewPost()
publishMagazine()
```

### Avoid

```text
doThing()
handleData()
processStuff()
function1()
```

Clarity is more important than saving a few characters.

---

## 15. Comments

Comments should explain **why**, not repeat obvious code behavior.

### Useful

```python
# Permission is checked again on the backend because
# frontend visibility controls cannot provide authorization.
```

### Unnecessary

```python
# Increment count by one
count += 1
```

---

## 16. Environment Variables

Sensitive or environment-specific configuration must not be committed to the repository.

Examples include:

```text
SECRET_KEY
DATABASE_URL
API_KEYS
STORAGE_CREDENTIALS
EMAIL_PASSWORD
```

Local values should be stored in files such as:

```text
.env
```

Environment files containing real secrets must be included in `.gitignore`.

A safe template may be committed as:

```text
.env.example
```

Example:

```text
DJANGO_SECRET_KEY=
DATABASE_URL=
MEDIA_STORAGE_URL=
```

No real credentials should appear in `.env.example`.

---

## 17. Secrets & Security

The following must never be committed:

- Passwords
- API secrets
- Database credentials
- Authentication tokens
- Private keys
- Production environment files

If a secret is accidentally committed, deleting it from the latest file is not sufficient.

The credential should be considered compromised and rotated.

---

## 18. Database Changes

Database structure should be managed through Django migrations.

Developers should not manually modify production database structures.

Schema changes should follow:

```text
Model Change
    ↓
Migration
    ↓
Review
    ↓
Test
    ↓
Apply
```

Important schema decisions should also be reflected in the database documentation.

---

## 19. API Design

The backend API should follow consistent conventions.

General principles:

- Use predictable endpoint naming.
- Use appropriate HTTP methods.
- Validate input.
- Return consistent error structures.
- Enforce permissions on the backend.
- Use pagination for potentially large collections.
- Avoid exposing unnecessary internal information.

Example conceptual endpoints:

```text
GET    /api/posts/
POST   /api/posts/
GET    /api/posts/{id}/
PATCH  /api/posts/{id}/
DELETE /api/posts/{id}/
```

The final API structure will be defined in the API design documentation.

---

## 20. Testing

Critical business logic should be tested.

High-priority testing areas include:

- Authentication
- Authorization
- Privacy
- Permission requests
- Post ownership
- Magazine permissions
- Museum permissions
- Editor permissions
- Administrator permissions

A feature should not be considered complete solely because it works in one manual test.

---

## 21. Definition of Done

A development task may be moved to `Done` when applicable requirements are satisfied.

Depending on the task, this may include:

- Implementation is complete.
- Acceptance criteria are satisfied.
- Code is readable.
- Relevant tests pass.
- No known critical errors remain.
- Documentation is updated where necessary.
- Security and permissions have been considered.
- The change has been reviewed.
- The change has been merged into the appropriate branch.

Not every documentation or design task requires every criterion.

---

## 22. Documentation

Documentation should be updated when significant technical or product decisions change.

Planned documentation includes:

```text
docs/
├── project-vision.md
├── product-requirements.md
├── user-stories.md
├── roadmap.md
├── development-guidelines.md
├── database-design.md
├── system-architecture.md
├── api-design.md
└── ui-guidelines.md
```

Documentation should describe the current intended system rather than preserve known outdated assumptions without explanation.

---

## 23. Dependencies

New dependencies should not be added automatically simply because they make a small task easier.

Before adding a dependency, consider:

1. Is it actively maintained?
2. Is it necessary?
3. Can the requirement be solved reasonably without it?
4. Does it create security or maintenance concerns?
5. Is its bundle/runtime cost appropriate?

Dependencies should be periodically reviewed.

---

## 24. Accessibility

Accessibility should be considered during implementation rather than added only at the end.

Frontend development should consider:

- Semantic HTML
- Keyboard navigation
- Focus states
- Sufficient contrast
- Alternative text
- Screen readers
- Reduced motion preferences

This is especially important because Literary Museum plans to use animation and immersive visual experiences.

---

## 25. Performance

Visual complexity must not unnecessarily damage usability.

The project should prioritize:

- Optimized images
- Lazy loading where appropriate
- Pagination
- Efficient database queries
- Reasonable JavaScript bundle sizes
- Avoiding unnecessary network requests

Interactive museum and magazine effects should progressively enhance the experience rather than prevent basic access to content.

---

## 26. Development Philosophy

Literary Museum should prioritize maintainability and product value over unnecessary technical complexity.

The project should avoid:

- Premature optimization
- Unnecessary microservices
- Technology chosen only because it is fashionable
- Excessive abstraction
- Features without a defined user need
- Visual effects that compromise usability

Technical decisions should support the product rather than become the product.

---

## 27. Guideline Evolution

These guidelines are not permanent rules.

They may change as:

- The development team grows.
- New technologies are introduced.
- Deployment requirements become clearer.
- Better development practices are identified.

Significant changes should be documented through Git history.
