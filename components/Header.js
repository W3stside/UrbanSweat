import React from 'react'
import { StyleSheet, css } from 'aphrodite';

const Header = ({style, name}) => (
  <p className={css(style)}>{name}</p>
)

export default Header;
