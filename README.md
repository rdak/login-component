# React Login Component

A reusable and responsive authentication component for React applications. It provides a clean and user-friendly interface for both sign-in and registration flows.

```bash
npm install @seva/login-component
```

## Usage

```tsx
import { LoginComponent } from '@seva/login-component';
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <LoginComponent
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAuthSuccess={() => {
          console.log('Authentication successful');
          // Handle successful authentication
        }}
      />

      <button onClick={() => setIsOpen(true)}>
        Sign In / Register
      </button>
    </>
  );
}
```
