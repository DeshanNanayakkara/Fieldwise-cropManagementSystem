const navbar = document.getElementById('navbar');
    const navFirstGrid = document.getElementById('nav-first-grid');
    const navTitle = document.getElementById('nav-title');
    const navToggleBtn = document.getElementById('nav-toggle-btn');

    navToggleBtn.addEventListener('click', () => {
      // Toggle navbar collapsed state
      navbar.classList.toggle('collapsed');
      
      // Toggle first grid collapsed state
      navFirstGrid.classList.toggle('collapsed');
    });