# 3. Start with API and UI in the same project

Date: 2019-11-01

## Status

Accepted

## Context

Deciding whether to keep the Rules Audit API and UI as separate projects or the same

## Decision

Start with a single project for now. It can be separated later if needed with minimal effort.

## Consequences

### Pros
* Single codebase to work with, no flipping back and forth between IDEs

### Cons
* Build/test/deploy processes slightly more complex to split between API/UI components
