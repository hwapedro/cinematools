import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

export const Page404 = () => {
  return (
    <div className="container-404">
      <div className="title-404">404</div>
      <div>
        we couldn't find this page, <Link to="users">back home</Link>
      </div>
    </div>
  )
}
