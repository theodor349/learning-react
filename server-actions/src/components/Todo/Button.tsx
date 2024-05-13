import React from 'react'
import { useFormStatus } from 'react-dom'

export default function Button() {
  const { pending } = useFormStatus();
  return (
      <button type="submit">
        { pending ? 'Adding...' : 'Add' }
      </button>
  )
}
