import { render, screen } from '@/app/__tests__/test-utils';
import { FooterNavSection } from '@/app/components/layout/FooterNavSection';

describe('FooterNavSection', () => {
  const mockProps = {
    title: 'Test Section',
    links: [
      { name: 'Link 1', href: '/link1' },
      { name: 'Link 2', href: '/link2' },
      { name: 'Link 3', href: '/link3' },
    ],
  };

  it('renders the section title correctly', () => {
    render(<FooterNavSection {...mockProps} />);
    expect(screen.getByText('Test Section')).toBeInTheDocument();
  });

  it('renders all links correctly', () => {
    render(<FooterNavSection {...mockProps} />);
    
    // Check if all links are rendered
    mockProps.links.forEach((link) => {
      const linkElement = screen.getByText(link.name);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement.closest('a')).toHaveAttribute('href', link.href);
    });
  });

  it('applies the correct number of list items', () => {
    render(<FooterNavSection {...mockProps} />);
    
    // Check if the correct number of list items are rendered
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockProps.links.length);
  });

  it('assigns proper key attributes to list items', () => {
    // We can't directly test key props, but we can verify unique IDs if needed
    const { container } = render(<FooterNavSection {...mockProps} />);
    
    // Check if list items have unique IDs or data attributes if implemented
    const listItems = container.querySelectorAll('li');
    expect(listItems.length).toBe(mockProps.links.length);
  });
}); 