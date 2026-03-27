// Dark Mode Toggle Implementation
console.log('Dark mode script loaded!');

// Check for saved theme preference or default to light mode
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

function toggleDarkMode() {
  console.log('toggleDarkMode called');
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  // Update button icon
  updateToggleIcon(newTheme);
  
  // Force active nav styles after theme change
  setTimeout(forceActiveNavStyles, 50);
}

function updateToggleIcon(theme) {
  // Update checkbox state for header toggle
  const checkbox = document.getElementById('dark-mode-checkbox');
  if (checkbox) {
    checkbox.checked = theme === 'dark';
  }
}

function createDarkModeToggle() {
  console.log('createDarkModeToggle called');

  // Just ensure the checkbox state is correct
  const checkbox = document.getElementById('dark-mode-checkbox');
  if (checkbox) {
    checkbox.checked = savedTheme === 'dark';
    console.log('Header toggle checkbox found and initialized');
  } else {
    console.log('Header toggle checkbox not found yet, will try again later');
  }
  
  // Force override active navigation styles
  forceActiveNavStyles();
}

function forceActiveNavStyles() {
  // Find all navigation links with font-weight styling (active ones)
  const activeNavLinks = document.querySelectorAll('.site-nav a[style*="font-weight"]');
  
  activeNavLinks.forEach(link => {
    // Force our dark background styles
    link.style.setProperty('background-color', '#232528', 'important');
    link.style.setProperty('background-image', 'none', 'important');
    link.style.setProperty('background', '#232528', 'important');
    link.style.setProperty('border-left', '3px solid #79b8ff', 'important');
    link.style.setProperty('color', 'white', 'important');
  });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createDarkModeToggle);
} else {
  createDarkModeToggle();
}

// Also try after window loads
window.addEventListener('load', createDarkModeToggle);

// Force styles after a delay to ensure Jekyll's styles have loaded
setTimeout(forceActiveNavStyles, 100);
setTimeout(forceActiveNavStyles, 500);
setTimeout(forceActiveNavStyles, 1000);

// Expose function globally for testing
window.createDarkModeToggle = createDarkModeToggle;
window.toggleDarkMode = toggleDarkMode; 