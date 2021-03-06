---
title: Decisions, Decisions, Decisions
date: 9999-01-01
draft: true
---
## Examples for decisions in my recent projects

- kotlin vs java
- rules-engine as its own (micro-)service
- serverless for ALA
- code stle at start of project
- team membership
- project duration
- test coverage/strategy at start of project

## Decision Techniques/Concepts/Tools

### General Approach

- "strong opinions, weakly held" by
[Paul Saffo](https://www.saffo.com/02008/07/26/strong-opinions-weakly-held/)
  - [blog by Jeff Atwood](https://blog.codinghorror.com/strong-opinions-weakly-held/)
- principle decisions
  - e.g. plan database model/entities together in the team before the story is started
  - e.g. no premature optimization that uglifies code, before performance tests give evidence that (and where) optimization is needed
- [7 levels of delegation](https://management30.com/practice/delegation-poker/)
  - Determine what stakeholders are willing to delegate (usually what a manager is willing to let the team decide). This can be documented in "levels of delegation" from "tell" when the manager simply tells the team to "delegate" when the team decides completely for themselves.

### Decision Methods

- documenting decisions [with architectural decisions records (adr)](https://adr.github.io/)
- decisions inconsensus methods in increasing complexity order
  - veto question (does anybody have a veto?)
  - thumb voting (pro=thumb up, neutral=thumb horizontal, veto=thumb down)
  - first-to-five
    - from 0="strong veto" to 5="perfect!"
  - [sociacratic vote](https://www.sociocracy.info/the-sociocratic-election-process/)

### Tools

- ad-hoc architecture meetings to quickly estabilsh a team decision when needed instead of waiting for the next regular sprint planning or similar

### Planning

- ["last responsible moment"](https://blog.codinghorror.com/the-last-responsible-moment/)
- proactive planning of (architecture) decision
- proactive evaluation of project risks
  - a premortem meeting to imagine what risks could have made the project fail and try to look back from that
  - [RiskStorming](https://www.ministryoftesting.com/testsphere/riskstorming)

## Resource

["Vorgehensmuster für Softwarearchitektur" by Stefan Toth](https://www.hanser-fachbuch.de/buch/Vorgehensmuster+fuer+Softwarearchitektur/9783446460041)
