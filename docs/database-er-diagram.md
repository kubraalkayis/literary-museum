# Literary Museum — Database ER Diagram

**Document Version:** 0.1  
**Status:** In Progress

---

## 1. Purpose

This document visualizes the current relational database design for the Literary Museum project.

The diagram is based on the entities and relationships defined in:

```text
docs/database-design.md
```

The schema is still under review and may change before Django model implementation begins.

---

## 2. Entity Relationship Diagram

```mermaid
erDiagram

    USER {
        bigint id PK
        string username UK
        string email UK
        string password
        string role
        string preferred_language
        boolean is_active
        datetime date_joined
    }

    PROFILE {
        bigint id PK
        bigint user_id FK, UK
        string display_name
        text bio
        string profile_image
        datetime created_at
        datetime updated_at
    }

    POST {
        bigint id PK
        bigint author_id FK
        string title
        text body
        string content_type
        string language
        string visibility
        boolean comments_enabled
        datetime created_at
        datetime updated_at
    }

    MEDIA {
        bigint id PK
        bigint post_id FK
        string media_type
        string media_url
        string alt_text
        int display_order
        datetime created_at
    }

    FOLLOW {
        bigint id PK
        bigint follower_id FK
        bigint following_id FK
        datetime created_at
    }

    LIKE {
        bigint id PK
        bigint user_id FK
        bigint post_id FK
        datetime created_at
    }

    COMMENT {
        bigint id PK
        bigint author_id FK
        bigint post_id FK
        bigint magazine_id FK
        text body
        datetime created_at
        datetime updated_at
    }

    MAGAZINE {
        bigint id PK
        bigint owner_id FK
        string title
        text description
        string cover_image
        string type
        string visibility
        boolean comments_enabled
        string status
        datetime published_at
        datetime created_at
        datetime updated_at
    }

    MAGAZINE_ITEM {
        bigint id PK
        bigint magazine_id FK
        bigint post_id FK
        bigint added_by_id FK
        bigint permission_request_id FK
        string section_title
        int display_order
        datetime created_at
    }

    MUSEUM {
        bigint id PK
        bigint owner_id FK
        string title
        text description
        string cover_image
        string type
        string visibility
        datetime created_at
        datetime updated_at
    }

    MUSEUM_ITEM {
        bigint id PK
        bigint museum_id FK
        bigint post_id FK
        bigint added_by_id FK
        bigint permission_request_id FK
        int display_order
        text exhibition_note
        datetime created_at
    }

    PERMISSION_REQUEST {
        bigint id PK
        bigint requester_id FK
        bigint creator_id FK
        bigint post_id FK
        string destination_type
        bigint magazine_id FK
        bigint museum_id FK
        string status
        text message
        datetime created_at
        datetime responded_at
    }

    REPORT {
        bigint id PK
        bigint reporter_id FK
        string target_type
        bigint post_id FK
        bigint comment_id FK
        bigint magazine_id FK
        bigint museum_id FK
        bigint profile_id FK
        string reason
        text description
        string status
        bigint reviewed_by_id FK
        datetime created_at
        datetime reviewed_at
    }

    USER ||--|| PROFILE : has

    USER ||--o{ POST : creates
    POST ||--o{ MEDIA : contains

    USER ||--o{ FOLLOW : follows_as_follower
    USER ||--o{ FOLLOW : followed_as_target

    USER ||--o{ LIKE : creates
    POST ||--o{ LIKE : receives

    USER ||--o{ COMMENT : writes
    POST ||--o{ COMMENT : receives
    MAGAZINE ||--o{ COMMENT : receives

    USER ||--o{ MAGAZINE : owns
    MAGAZINE ||--o{ MAGAZINE_ITEM : contains
    POST ||--o{ MAGAZINE_ITEM : appears_in
    USER ||--o{ MAGAZINE_ITEM : adds

    USER ||--o| MUSEUM : may_own
    MUSEUM ||--o{ MUSEUM_ITEM : contains
    POST ||--o{ MUSEUM_ITEM : appears_in
    USER ||--o{ MUSEUM_ITEM : adds

    USER ||--o{ PERMISSION_REQUEST : sends
    USER ||--o{ PERMISSION_REQUEST : receives
    POST ||--o{ PERMISSION_REQUEST : requested_for
    MAGAZINE ||--o{ PERMISSION_REQUEST : destination
    MUSEUM ||--o{ PERMISSION_REQUEST : destination

    PERMISSION_REQUEST ||--o| MAGAZINE_ITEM : authorizes
    PERMISSION_REQUEST ||--o| MUSEUM_ITEM : authorizes

    USER ||--o{ REPORT : submits
    USER ||--o{ REPORT : reviews
    POST ||--o{ REPORT : reported_post
    COMMENT ||--o{ REPORT : reported_comment
    MAGAZINE ||--o{ REPORT : reported_magazine
    MUSEUM ||--o{ REPORT : reported_museum
    PROFILE ||--o{ REPORT : reported_profile
```

---

## 3. Cardinality Notes

The diagram uses the following Mermaid cardinality notation:

| Symbol | Meaning |
|---|---|
| `||` | Exactly one |
| `o|` | Zero or one |
| `o{` | Zero or many |
| `|{` | One or many |

Examples:

```text
USER ||--|| PROFILE
```

means:

```text
One User has exactly one Profile.
```

```text
USER ||--o{ POST
```

means:

```text
One User may create zero or many Posts.
```

```text
USER ||--o| MUSEUM
```

means:

```text
One User may own zero or one Personal Museum.
```

---

## 4. Constraints Not Fully Represented in the Diagram

Some business rules cannot be represented completely through the visual relationship lines.

They must be enforced through Django validation, database constraints, or application permissions.

### Follow

The pair below must be unique:

```text
(follower_id, following_id)
```

A User cannot follow themselves.

### Like

The pair below must be unique:

```text
(user_id, post_id)
```

A User may like the same Post only once.

### Comment

A Comment must reference exactly one supported target:

```text
Post
or
Magazine
```

It must not reference both or neither.

### MagazineItem

The pair below should normally be unique:

```text
(magazine_id, post_id)
```

Another creator's Post requires an accepted PermissionRequest.

### Museum

A User may own at most one Personal Museum.

Creating a Personal Museum is optional.

### MuseumItem

The pair below should normally be unique:

```text
(museum_id, post_id)
```

Another creator's Post requires an accepted PermissionRequest.

### PermissionRequest

A request must reference exactly one destination:

```text
Magazine
or
Museum
```

Permission is valid only for the specified Post and destination.

### Report

A Report must reference exactly one reportable target:

```text
Post
Comment
Magazine
Museum
Profile
```

---

## 5. Open Design Decisions

The following decisions remain open:

- Behavior when a creator deletes their account
- Preservation of works in historical publications
- Behavior after permission revocation
- Permission revocation for already-published official magazines
- Exact database constraints for conditional uniqueness
- Exact deletion behavior for related records
- Whether Comment targets should remain nullable foreign keys or use separate comment models
- Whether Report targets should remain nullable foreign keys or use a more general moderation-target model

These decisions must be finalized before Django migrations are created.

---

## 6. Diagram Status

Current diagram progress:

- [x] User
- [x] Profile
- [x] Post
- [x] Media
- [x] Follow
- [x] Like
- [x] Comment
- [x] Magazine
- [x] MagazineItem
- [x] Museum
- [x] MuseumItem
- [x] PermissionRequest
- [x] Report
- [ ] Relationship validation
- [ ] Constraint validation
- [ ] Deletion strategy
- [ ] Final ER diagram review
