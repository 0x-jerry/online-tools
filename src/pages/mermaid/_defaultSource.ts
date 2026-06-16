export const defaultSource = `graph TD
    A[Start] --> B{Check condition}
    B -->|Yes| C[Do action]
    B -->|No| D[Skip]
    C --> E[End]
    D --> E
`
