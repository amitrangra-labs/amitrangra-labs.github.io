---
title: "Simplifying Identity (and Its Validation)"
date: 2026-01-03
excerpt: "Simple Identity systems: No bloat"
---
# Simplifying Identity (and Its Validation)

## A Short Story — When Identity Becomes the Weakest Link

A small startup launched its product after months of hard work. With limited resources and an aggressive timeline, the team decided to build a simple in-house login system. Email and password seemed sufficient, and security could be “improved later.”

A few months in, a flaw in session handling was exploited. User accounts were compromised, internal systems were accessed, and trust was broken. Incident response consumed weeks. Customers demanded answers. Regulators asked questions.

Left with little choice, the company migrated hastily to an expensive third-party IAM provider. The product survived, but engineering velocity slowed, costs increased, and identity became an opaque dependency rather than a controlled capability.

The lesson was clear: **identity is foundational infrastructure**. When it fails, everything built on top of it is at risk.

This article explores a simpler approach — one that focuses strictly on **identifying entities and validating identity proofs**, without combining identity with authorization or access control.

---

## Scope and Intent

This article addresses only:

- Identifying an entity (human or service)
- Validating proof of that identity
- Doing so in a stateless, protocol-agnostic manner

Out of scope:

- Authorization and permissions
- Roles, scopes, or policy evaluation
- OAuth2, OIDC, SAML, or session orchestration

---

## What Is Identity?

Identity is the ability to assert and verify *who* or *what* an entity is.

In digital systems, identity validation is achieved through cryptographic proof. This article limits identity to two primitives:

- **Identification** — claiming an identifier
- **Validation** — proving control over that identifier

No assumptions are made about what the validated identity may access.

---

## Design Principles

The identity system described here follows these principles:

1. Stateless verification
2. Clear identity proof boundaries
3. Minimal surface area
4. Fixed and predictable token lifetime
5. Separation from authorization concerns

The system is built on:

- Email ownership for human identities
- Cryptographically signed, time-bound tokens
- Verifiable workload identity for services

---

## Identity Establishment Using Email

Email ownership is treated as proof of identity. If an entity can receive and act on a message sent to an email address, control over that identity is established.

### Identity Flow

1. An email address is provided.
2. A secure token is generated.
3. A login link containing the token is emailed.
4. The link is opened.
5. The token is validated.
6. A fixed-lifetime identity token is issued.

---

### Email Login Flow Diagram

```
+-----------+        +----------------+        +------------+
|  Browser  |        | Identity Logic |        |   Email    |
+-----------+        +----------------+        +------------+
     |                       |                        |
     | Enter email           |                        |
     +---------------------->|                        |
     |                       | Generate token         |
     |                       |----------------------->|
     |                       | Send email             |
     |                       |<-----------------------|
     | Click login link      |                        |
     +---------------------->| Validate token         |
     |                       | Issue identity token   |
     |<----------------------|                        |
     | Store token in cookie |                        |
```

---

### Identity Token Model

The issued token is self-contained and signed.

Typical claims:

| Claim | Description |
|------|-------------|
| `sub` | Identity (email or service ID) |
| `iat` | Issued-at timestamp |
| `exp` | Expiry timestamp |
| `jti` | Unique token identifier |

Tokens contain no authorization data.

---

### Token Lifetime and Validation

Identity tokens have a fixed expiration window (e.g., 24 hours).

- Tokens are validated on every request
- Tokens are not refreshed automatically
- Expired tokens require identity re-validation

This guarantees a bounded identity proof window.

---

### Stateless Request Validation

```
[Client] ---> Request + Identity Token ---> [Service]
                                      |
                         Verify signature & expiry
                                      |
                               Valid -> Continue
                               Invalid -> Reject
```

No server-side session state is required.

---

## Identity Use Cases

Identity requirements differ by entity type. The same validation principles apply, but the proof mechanism varies.

---

### Employee Identity

Employees require access to internal systems, dashboards, and tooling.

**Approach**

- Email address represents employee identity
- Identity is validated via secure email token
- Fixed-lifetime identity token is issued
- Downstream systems consume the validated identity

**Benefits**

- No password storage
- No protocol coupling
- Identity validation remains auditable and simple

---

### Customer Identity

Customers may be external, anonymous initially, and diverse in scale.

**Approach**

- Email remains the primary identity anchor
- Magic-link login validates identity ownership
- Stateless tokens represent validated customer identity
- Authorization decisions remain external to identity validation

**Benefits**

- Reduced attack surface
- Simple onboarding experience
- No dependency on third-party IAM unless needed later

---

### Application and Service Identity

Non-human actors require identity as well.

**Approach**

- Each service or workload is assigned a unique identity
- Identity is validated using signed service tokens or workload identity systems
- Tokens are short-lived and verifiable
- Mutual trust is established cryptographically

**Example Flow**

```
[Service A] ---> Signed Identity Token ---> [Service B]
                                   |
                          Verify signature & expiry
                                   |
                             Trust identity
```

**Benefits**

- No shared secrets
- No long-lived credentials
- Clear machine identity boundaries

---

## Security Considerations

| Area | Mitigation |
|----|------------|
| Password attacks | Passwords not used |
| Token replay | Limited by fixed expiry |
| Token leakage | HTTPS and secure cookies |
| Identity sprawl | Single identity primitive |

---

## Identity vs Authorization

This system establishes *who* an entity is, not *what* it can do.

Authorization, permissions, and access control are intentionally decoupled and left to downstream systems.

---

## Conclusion

Identity does not need to be complex to be reliable.

By focusing strictly on identity identification and validation — using email ownership for humans and signed tokens for services — systems can avoid fragile, over-engineered IAM solutions while retaining strong security guarantees.

This identity layer can later integrate with any authorization or policy engine without modification.  
As the user base scales, simpler frictionless authentication methods like push-based login could also be integrated alongside the existing email and token systems. This allows to simplify the user experience while maintaining robust, multi-layered security.  
