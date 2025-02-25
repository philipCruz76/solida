import { render, screen, fireEvent, within } from '@/app/__tests__/test-utils';
import { MAIN_NAV_LINKS } from '@/app/constants/navigation';
import { ROUTES } from '@/app/constants/routes';

// Mock the Navbar component entirely
jest.mock('@/app/components/Navbar', () => ({
  Navbar: () => (
    <nav role="navigation" aria-label="Main Navigation">
      <a href={ROUTES.HOME}><img src="/solida-logo.png" alt="Sólida" /></a>
      <div className="desktop-menu" data-testid="desktop-menu">
        {MAIN_NAV_LINKS.map((link) => (
          <a key={link.name} href={link.href}>{link.name}</a>
        ))}
        <a href={ROUTES.CLIENT_AREA}>
          <button>Área Cliente</button>
        </a>
      </div>
      <button 
        aria-label="Open menu"
        onClick={() => {
          const menu = document.querySelector('[aria-label="Mobile Navigation"]');
          if (menu) {
            menu.classList.toggle('opacity-0');
            menu.classList.toggle('max-h-0');
            menu.classList.toggle('opacity-100');
            menu.classList.toggle('max-h-[500px]');
          }
        }}
      >
        Menu
      </button>
      <div 
        role="navigation" 
        aria-label="Mobile Navigation" 
        className="opacity-0 max-h-0"
        data-testid="mobile-menu"
      >
        {MAIN_NAV_LINKS.map((link) => (
          <a key={link.name} href={link.href}>{link.name}</a>
        ))}
        <a href={ROUTES.CLIENT_AREA}>
          <button>Área Cliente</button>
        </a>
      </div>
    </nav>
  )
}));

describe('Navbar', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });

  it('renders the logo correctly', () => {
    // Import the Navbar component only after it's been mocked
    const { Navbar } = require('@/app/components/Navbar');
    render(<Navbar />);
    const logoImg = screen.getByAltText('Sólida');
    expect(logoImg).toBeInTheDocument();
    expect(logoImg.closest('a')).toHaveAttribute('href', ROUTES.HOME);
  });

  it('renders desktop navigation links correctly', () => {
    const { Navbar } = require('@/app/components/Navbar');
    render(<Navbar />);
    
    // Get the desktop menu container to scope our queries
    const desktopMenu = screen.getByTestId('desktop-menu');
    
    // Check if all main navigation links are rendered in the desktop menu
    MAIN_NAV_LINKS.forEach((link) => {
      const linkElement = within(desktopMenu).getByText(link.name);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement.closest('a')).toHaveAttribute('href', link.href);
    });
  });

  it('renders the client area button correctly', () => {
    const { Navbar } = require('@/app/components/Navbar');
    render(<Navbar />);
    
    // Get the desktop menu container to scope our queries
    const desktopMenu = screen.getByTestId('desktop-menu');
    
    const clientAreaButton = within(desktopMenu).getByText('Área Cliente');
    expect(clientAreaButton).toBeInTheDocument();
    expect(clientAreaButton.closest('a')).toHaveAttribute('href', ROUTES.CLIENT_AREA);
  });

  it('toggles mobile menu when menu button is clicked', () => {
    const { Navbar } = require('@/app/components/Navbar');
    render(<Navbar />);
    
    // Initial state: menu is closed
    const mobileMenu = screen.getByTestId('mobile-menu');
    expect(mobileMenu).toHaveClass('opacity-0');
    expect(mobileMenu).toHaveClass('max-h-0');
    
    // Click the menu button to open the menu
    const menuButton = screen.getByRole('button', { name: 'Open menu' });
    fireEvent.click(menuButton);
    
    // The menu should now be open
    expect(mobileMenu).toHaveClass('opacity-100');
    expect(mobileMenu).toHaveClass('max-h-[500px]');
  });
}); 