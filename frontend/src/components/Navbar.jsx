import React from 'react'
import { useAuthStore } from '../store/useAuthStore';

function Navbar() {
  const {logout, authUser} = useAuthStore();
  return (
    <header>

    </header>
  )
}

export default Navbar