  
    // Mobile Navigation Toggle
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarNav = document.getElementById('navbarNav');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const body = document.body;

    // Toggle mobile menu
    navbarToggle.addEventListener('click', function() {
      navbarNav.classList.toggle('show');
      mobileOverlay.classList.toggle('show');
      body.classList.toggle('nav-open');
      
      // Toggle icon
      const icon = this.querySelector('i');
      if (navbarNav.classList.contains('show')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // Close mobile menu when clicking overlay
    mobileOverlay.addEventListener('click', function() {
      navbarNav.classList.remove('show');
      mobileOverlay.classList.remove('show');
      body.classList.remove('nav-open');
      const icon = navbarToggle.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    });

    // Close mobile menu when clicking nav links
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
      link.addEventListener('click', function(e) {
        // Only prevent default if it's a hash link
        if (this.getAttribute('href').startsWith('#')) {
          e.preventDefault();
          
          // Get target section
          const targetId = this.getAttribute('href');
          const targetSection = document.querySelector(targetId);
          
          if (targetSection) {
            // Close mobile menu
            navbarNav.classList.remove('show');
            mobileOverlay.classList.remove('show');
            body.classList.remove('nav-open');
            const icon = navbarToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            
            // Smooth scroll to section
            targetSection.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            
            // Update active nav link
            document.querySelectorAll('.navbar-nav .nav-link').forEach(navLink => {
              navLink.classList.remove('active');
            });
            this.classList.add('active');
          }
        }
      });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
      const navbar = document.getElementById('mainNavbar');
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    });

    // Back to top button
    const backToTopButton = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    });

    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
      observer.observe(el);
    });

    // Animate skill bars when in view
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillBars = entry.target.querySelectorAll('.skill-progress-bar');
          skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
              bar.style.width = width + '%';
            }, 200);
          });
        }
      });
    }, observerOptions);

    document.querySelectorAll('.skills-section').forEach(section => {
      skillObserver.observe(section);
    });

    // Active nav link on scroll
    window.addEventListener('scroll', function() {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
      
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });

    // Smooth scrolling for all hash links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Add loading animation
    window.addEventListener('load', function() {
      // Trigger initial animations
      document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach((el, index) => {
        setTimeout(() => {
          if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('animate');
          }
        }, index * 100);
      });
    });

    // Prevent scrolling issues on mobile
    let touchStartY = 0;
    document.addEventListener('touchstart', e => {
      touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchmove', e => {
      const touchY = e.touches[0].clientY;
      const touchDiff = touchStartY - touchY;
      
      // Prevent overscroll bounce effect
      if (body.classList.contains('nav-open')) {
        e.preventDefault();
      }
    }, { passive: false });

    // Handle window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 991 && navbarNav.classList.contains('show')) {
        navbarNav.classList.remove('show');
        mobileOverlay.classList.remove('show');
        body.classList.remove('nav-open');
        const icon = navbarToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // Enhanced mobile menu functionality
    document.addEventListener('DOMContentLoaded', function() {
      // Set initial active nav based on current section
      const currentSection = window.location.hash || '#home';
      const currentNavLink = document.querySelector(`a[href="${currentSection}"]`);
      if (currentNavLink) {
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
          link.classList.remove('active');
        });
        currentNavLink.classList.add('active');
      }
    });
