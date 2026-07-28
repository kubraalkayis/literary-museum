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
---

# 5. Post

## Purpose

Represents every piece of content published by a User.

A Post is the core content entity of the platform and may represent literary works or other supported creative media.

Posts may later appear inside personal magazines, official magazines, or museums.

## Fields

| Field | Type | Description |
|--------|------|-------------|
| id | BigAutoField | Primary key |
| author | ForeignKey(User) | Creator of the post |
| title | CharField | Post title |
| body | TextField | Main content |
| content_type | ChoiceField | Type of content |
| language | ChoiceField | Original language |
| visibility | ChoiceField | Visibility level |
| comments_enabled | BooleanField | Whether comments are allowed |
| created_at | DateTimeField | Creation time |
| updated_at | DateTimeField | Last modification |

## Content Types

- Poem
- Story
- Essay
- Article
- Photography
- Illustration
- Digital Art
- Short Film
- Other

## Visibility

- Public
- Followers Only
- Private

## Relationships

- One User may create many Posts.
- One Post may contain multiple Media objects.
- One Post may receive many Likes.
- One Post may receive many Comments.
- One Post may appear in many Magazines.
- One Post may appear in many Museums.
- One Post may have multiple Permission Requests.

## Business Rules

- Every Post belongs to exactly one User.
- Ownership never changes.
- Visibility controls who can access the Post.
- Posts may be edited after publication.
- Posts may be deleted by their owner.

---

# 6. Media

## Purpose

Stores media attached to a Post.

Media is separated from Post to allow multiple files without duplicating Post information.

## Fields

| Field | Type | Description |
|--------|------|-------------|
| id | BigAutoField | Primary key |
| post | ForeignKey(Post) | Parent post |
| media_type | ChoiceField | Type of media |
| media_url | URLField | File location |
| alt_text | CharField | Accessibility description |
| display_order | PositiveIntegerField | Display order |
| created_at | DateTimeField | Upload time |

## Media Types

- Image
- Video
- Audio
- External Link

## Relationships

- One Post may contain zero or many Media objects.

## Business Rules

- Media cannot exist without a Post.
- Multiple media files are supported.
- Display order determines presentation order.

---

# 7. Follow

## Purpose

Represents follower relationships between Users.

This table implements the social graph of the platform.

## Fields

| Field | Type | Description |
|--------|------|-------------|
| id | BigAutoField | Primary key |
| follower | ForeignKey(User) | User initiating the follow |
| following | ForeignKey(User) | User being followed |
| created_at | DateTimeField | Follow date |

## Relationships

- One User may follow many Users.
- One User may have many Followers.

## Business Rules

- Users cannot follow themselves.
- Duplicate follow relationships are not allowed.
- The combination (follower, following) must be unique.

---

# 8. Like

## Purpose

Stores likes given by Users to Posts.

## Fields

| Field | Type | Description |
|--------|------|-------------|
| id | BigAutoField | Primary key |
| user | ForeignKey(User) | User giving the like |
| post | ForeignKey(Post) | Liked post |
| created_at | DateTimeField | Like date |

## Relationships

- One User may like many Posts.
- One Post may receive many Likes.

## Business Rules

- A User may like a Post only once.
- The combination (user, post) must be unique.

---

# 9. Comment

## Purpose

Represents comments written by Users.

Comments can currently be attached to Posts or Magazines.

## Fields

| Field | Type | Description |
|--------|------|-------------|
| id | BigAutoField | Primary key |
| author | ForeignKey(User) | Comment author |
| post | ForeignKey(Post, nullable) | Target post |
| magazine | ForeignKey(Magazine, nullable) | Target magazine |
| body | TextField | Comment text |
| created_at | DateTimeField | Creation time |
| updated_at | DateTimeField | Last modification |

## Relationships

- One User may write many Comments.
- One Post may receive many Comments.
- One Magazine may receive many Comments.

## Business Rules

- A Comment must belong to exactly one target.
- A Comment cannot reference both a Post and a Magazine.
- Empty comments are not allowed.
- Authors may edit or delete their own Comments.
---

# 10. Magazine

## Purpose

Represents a collection of literary works published by either a User or the Editorial Team.

Magazines are the primary feature of the Literary Museum platform.

A magazine may contain works created by different authors, provided that the necessary permissions have been granted.

## Fields

| Field | Type | Description |
|--------|------|-------------|
| id | BigAutoField | Primary key |
| owner | ForeignKey(User) | Creator or owner of the magazine |
| title | CharField | Magazine title |
| description | TextField | Magazine description |
| cover_image | ImageField | Cover image |
| type | ChoiceField | Magazine type |
| visibility | ChoiceField | Visibility level |
| status | ChoiceField | Publication status |
| comments_enabled | BooleanField | Whether comments are allowed |
| published_at | DateTimeField | Publication date |
| created_at | DateTimeField | Creation time |
| updated_at | DateTimeField | Last modification |

## Magazine Types

- User Magazine
- Official Magazine

## Status

- Draft
- Published
- Archived

## Visibility

- Public
- Followers Only
- Private

## Relationships

- One User may own many Magazines.
- One Magazine may contain many Posts through MagazineItem.
- One Magazine may receive many Comments.

## Business Rules

- Every Magazine belongs to one User.
- Official Magazines are managed by Editors.
- Draft Magazines are not publicly visible.
- Published Magazines may be archived later.

---

# 11. MagazineItem

## Purpose

Represents the relationship between Posts and Magazines.

This entity allows a single Post to appear in multiple Magazines without duplicating content.

## Fields

| Field | Type | Description |
|--------|------|-------------|
| id | BigAutoField | Primary key |
| magazine | ForeignKey(Magazine) | Target magazine |
| post | ForeignKey(Post) | Included post |
| added_by | ForeignKey(User) | User who added the post |
| permission_request | ForeignKey(PermissionRequest, nullable) | Permission reference |
| section_title | CharField | Optional section heading |
| display_order | PositiveIntegerField | Order inside the magazine |
| created_at | DateTimeField | Creation time |

## Relationships

- One Magazine contains many MagazineItems.
- One Post may appear in many Magazines.

## Business Rules

- A Post cannot appear twice in the same Magazine.
- Another creator's Post requires an accepted PermissionRequest.
- A creator may freely add their own Posts.

---

# 12. Museum

## Purpose

Represents a curated exhibition of creative works.

The museum feature complements the magazine system but is not the primary focus of the platform.

## Fields

| Field | Type | Description |
|--------|------|-------------|
| id | BigAutoField | Primary key |
| owner | ForeignKey(User) | Museum owner |
| title | CharField | Museum title |
| description | TextField | Museum description |
| cover_image | ImageField | Cover image |
| type | ChoiceField | Museum type |
| visibility | ChoiceField | Visibility |
| created_at | DateTimeField | Creation time |
| updated_at | DateTimeField | Last modification |

## Museum Types

- Personal Museum
- Editorial Museum

## Relationships

- One User may own zero or one Personal Museum.
- One Museum may contain many MuseumItems.

## Business Rules

- Creating a Personal Museum is optional.
- A User may own at most one Personal Museum.
- Personal Museums may be edited after creation.
- Editorial Museums are managed by Editors.

---

# 13. MuseumItem

## Purpose

Represents the relationship between Posts and Museums.

## Fields

| Field | Type | Description |
|--------|------|-------------|
| id | BigAutoField | Primary key |
| museum | ForeignKey(Museum) | Target museum |
| post | ForeignKey(Post) | Displayed work |
| added_by | ForeignKey(User) | Curator |
| permission_request | ForeignKey(PermissionRequest, nullable) | Permission reference |
| exhibition_note | TextField | Optional curator note |
| display_order | PositiveIntegerField | Exhibition order |
| created_at | DateTimeField | Creation time |

## Relationships

- One Museum contains many MuseumItems.
- One Post may appear in many Museums.

## Business Rules

- A Post cannot appear twice in the same Museum.
- Another creator's Post requires an accepted PermissionRequest.
- A creator may freely exhibit their own Posts.
