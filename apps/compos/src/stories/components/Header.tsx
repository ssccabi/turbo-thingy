import React from 'react';

import { Button } from './Button';
import './header.css';

function fieldsDrawerToggle() {

}

function sectorsDrawerToggle() {

}

export function Header(): JSX.Element {
  return (
  <header>
    <div className="wrapper">
      <Button size='medium' onClick={fieldsDrawerToggle} label='Fields' />
      <Button size='medium' onClick={sectorsDrawerToggle} label='Sectors' />
    </div>
  </header>
)};
