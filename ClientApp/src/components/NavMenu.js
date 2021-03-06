﻿import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component {
  displayName = NavMenu.name

  render() {
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>Work</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={'/'} exact>
              <NavItem>
                <Glyphicon glyph='home' /> Home
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/counter'}>
              <NavItem>
                <Glyphicon glyph='education' /> Counter
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/fetchdata'}>
              <NavItem>
                <Glyphicon glyph='th-list' /> Fetch data
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/test'}>
                <NavItem>
                    <Glyphicon glyph='th-list' /> Test
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/stargame'}>
                <NavItem>
                    <Glyphicon glyph='star' /> Stargame
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/notes'}>
                <NavItem>
                    <Glyphicon glyph='book' /> Notes
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/blizzardfetcher'}>
                <NavItem>
                    <Glyphicon glyph='th-list' /> Blizzard
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/quiz'}>
                <NavItem>
                    <Glyphicon glyph='education' /> Quiz
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/mazingcontest'}>
                <NavItem>
                    <Glyphicon glyph='random' /> Mazing Contest
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/numpad'}>
                <NavItem>
                    <Glyphicon glyph='th-list' /> Numpad trainer
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
