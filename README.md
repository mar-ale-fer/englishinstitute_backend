# englishinstitute_backend

## Aplication for an English Institute, with students, attendance, and current account

## ER Diagram

::: mermaid
erDiagram
INSTITUTE ||--o{ USER : has
INSTITUTE ||--o{ LEVEL : has
INSTITUTE ||--o{ COURSE : has
INSTITUTE ||--o{ STUDENT : has
STUDENT ||--o{ ENROLLMENT : has
COURSE ||--o{ ENROLLMENT : has
LEVEL ||--o{ COURSE : taught_in
:::

[1]: https://mermaid.js.org/syntax/entityRelationshipDiagram.html "Mermaid ERD"
