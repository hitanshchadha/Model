import { Link, NavLink, Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { PAGES, SITE } from '../siteConfig.js';
import logo from '../images/logo.png';
import hero from '../images/hero.jpg';

export default function Layout() {
  return (
    <div className="site">
      <Navbar expand="lg" className="site-nav" data-bs-theme="dark" collapseOnSelect>
        <Container fluid="xl">
          <Navbar.Brand as={Link} to="/">
            <img src={logo} alt={SITE.name} height={70} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="site-menu" />
          <Navbar.Collapse id="site-menu">
            <Nav className="ms-auto">
              {PAGES.map((p) => (
                <Nav.Link key={p.path} as={NavLink} to={p.path} end eventKey={p.path}>
                  {p.navLabel}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="hero card-box">
        <img src={hero} alt="AICoE: Make AI in India and Make AI work for India" />
      </div>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>{SITE.footer}</p>
      </footer>
    </div>
  );
}
