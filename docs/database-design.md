# Literary Museum — Database Design

**Document Version:** 1.0  
**Status:** In Progress

---

# 1. Overview

This document defines the relational database design for the Literary Museum platform.

The goal of this design is to provide a scalable, maintainable, and normalized database structure for the application before implementation begins.

The database is designed for Django ORM and PostgreSQL.

The schema focuses on:

- user management
- literary content
- magazines
- museums
- permissions
- moderation
- social interactions

The magazine system is the primary feature of the platform.

The museum system is designed as an optional complementary feature rather than the core experience.

---

# 2. Design Principles

The database follows several design principles.

## Normalization

The schema is normalized to reduce duplicated data whenever practical.

## Scalability

Relationships are designed to support future expansion without major structural changes.

## Flexibility

Most social features are implemented through relational tables instead of storing repeated values.

## Content Ownership

Creators always remain the owners of their own works.

Publishing a work inside another user's magazine or museum never transfers ownership.

## Permission Based Sharing

Works belonging to another creator require explicit permission before appearing inside magazines or museums.

Permissions are destination-specific.

## Separation of Responsibilities

Each table has a single responsibility.

Examples:

- User stores authentication information.
- Profile stores public profile information.
- Post stores literary works.
- Magazine stores collections.
- PermissionRequest stores sharing permissions.

---

# 3. User

## Purpose

Represents every registered account in the system.

Authentication and authorization are based on this entity.

A custom Django User model will be used.

## Fields

| Field | Type | Description |
|--------|------|-------------|
| id | BigAutoField | Primary key |
| username | CharField | Unique username |
| email | EmailField | Unique email address |
| password | CharField | Encrypted password |
| role | ChoiceField | User role |
| preferred_language | ChoiceField | Preferred interface language |
| is_active | BooleanField | Active account status |
| date_joined | DateTimeField | Registration date |

## Relationships

- One User has one Profile.
- One User may create many Posts.
- One User may own many Magazines.
- One User may own zero or one Personal Museum.
- One User may submit many Reports.
- One User may send many Permission Requests.

## Business Rules

- Usernames must be unique.
- Email addresses must be unique.
- Passwords are never stored in plain text.
- A User may have only one account.

---

# 4. Profile

## Purpose

Stores public profile information separately from authentication data.

This separation keeps authentication independent from profile customization.

## Fields

| Field | Type | Description |
|--------|------|-------------|
| id | BigAutoField | Primary key |
| user | OneToOneField(User) | Owner |
| display_name | CharField | Public display name |
| bio | TextField | Biography |
| profile_image | ImageField | Profile picture |
| created_at | DateTimeField | Creation time |
| updated_at | DateTimeField | Last update |

## Relationships

- Every Profile belongs to exactly one User.

## Business Rules

- Every User automatically receives a Profile.
- Display names may be changed.
- A Profile cannot exist without a User.
