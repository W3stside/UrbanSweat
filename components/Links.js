import React from 'react'
import { Link } from 'react-router'

const Links = ( {url = "/", className, name} ) => (
  <span>
    <Link to={url} className={className}>{name}</Link>
  </span>
);

export default Links;
