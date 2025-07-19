/*
====================================
    Ronik Chatterjee - Portfolio JS
====================================
    Modern, interactive portfolio functionality
    Author: Ronik Chatterjee
    Version: 1.0
====================================
*/

// ===== DOM ELEMENTS =====
const themeToggle = document.getElementById('theme-toggle')
const themeIcon = document.getElementById('theme-icon')
const body = document.body
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle')
const navMenu = document.querySelector('.nav-menu')

// ===== THEME MANAGEMENT =====
// Check for saved theme or default to light mode
const savedTheme = localStorage.getItem('theme') || 'light'
body.setAttribute('data-theme', savedTheme)
updateThemeIcon(savedTheme)

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme')
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'

  body.setAttribute('data-theme', newTheme)
  localStorage.setItem('theme', newTheme)
  updateThemeIcon(newTheme)
})

function updateThemeIcon(theme) {
  if (theme === 'dark') {
    themeIcon.classList.remove('fa-moon')
    themeIcon.classList.add('fa-sun')
  } else {
    themeIcon.classList.remove('fa-sun')
    themeIcon.classList.add('fa-moon')
  }
}

// ===== AOS INITIALIZATION =====
// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  once: true,
  offset: 100,
})

// ===== LOADING SCREEN =====
window.addEventListener('load', function () {
  const loading = document.getElementById('loading')
  if (loading) {
    loading.style.opacity = '0'
    setTimeout(() => {
      loading.style.display = 'none'
    }, 500)
  }
})

// ===== SMOOTH SCROLLING =====
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href'))
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  })
})

// ===== MOBILE NAVIGATION =====
if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active')
    const icon = mobileMenuToggle.querySelector('i')
    icon.classList.toggle('fa-bars')
    icon.classList.toggle('fa-times')
  })
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active')
      const icon = mobileMenuToggle.querySelector('i')
      icon.classList.remove('fa-times')
      icon.classList.add('fa-bars')
    }
  })
})

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar')
  const currentTheme = body.getAttribute('data-theme')

  if (window.scrollY > 50) {
    if (currentTheme === 'dark') {
      navbar.style.background = 'rgba(17, 24, 39, 0.98)'
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)'
    }
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)'
  } else {
    if (currentTheme === 'dark') {
      navbar.style.background = 'rgba(17, 24, 39, 0.95)'
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)'
    }
    navbar.style.boxShadow = 'none'
  }
})

// ===== BUTTON ANIMATIONS =====
// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function () {
    if (!this.href.startsWith('#')) {
      this.style.transform = 'scale(0.98)'
      setTimeout(() => {
        this.style.transform = 'scale(1)'
      }, 150)
    }
  })
})

// ===== TYPING ANIMATION =====
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ''

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// ===== INTERSECTION OBSERVER =====
// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px',
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate')
    }
  })
}, observerOptions)

// Observe elements for animations
document.querySelectorAll('.fade-up').forEach(el => {
  observer.observe(el)
})

// ===== PARALLAX EFFECTS =====
// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector('.hero')
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})

// ===== STATS COUNTER ANIMATION =====
// Dynamic stats counter
function animateStats() {
  const stats = document.querySelectorAll('.stat-number')
  stats.forEach(stat => {
    const target = parseInt(stat.innerText.replace('+', ''))
    const increment = target / 50
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        stat.innerText = target + '+'
        clearInterval(timer)
      } else {
        stat.innerText = Math.floor(current) + '+'
      }
    }, 30)
  })
}

// Trigger stats animation when in view
const statsSection = document.querySelector('.hero-stats')
if (statsSection) {
  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats()
        statsObserver.unobserve(entry.target)
      }
    })
  })

  statsObserver.observe(statsSection)
}

// ===== THEME-AWARE NAVBAR =====
// Theme-aware navbar update on theme change
const themeObserver = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (
      mutation.type === 'attributes' &&
      mutation.attributeName === 'data-theme'
    ) {
      // Trigger navbar update
      window.dispatchEvent(new Event('scroll'))
    }
  })
})

themeObserver.observe(body, {
  attributes: true,
  attributeFilter: ['data-theme'],
})

// ===== PARTICLE EFFECTS =====
let particles = []
const particleCount = 30

class Particle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.vx = (Math.random() - 0.5) * 2
    this.vy = (Math.random() - 0.5) * 2
    this.life = 1
    this.decay = Math.random() * 0.02 + 0.01
    this.size = Math.random() * 3 + 1
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    this.life -= this.decay
  }

  draw(ctx) {
    ctx.save()
    ctx.globalAlpha = this.life
    ctx.fillStyle = '#6366f1'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}

// ===== SKILL HOVER EFFECTS =====
document.querySelectorAll('.skill-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    const icon = item.querySelector('i')
    if (icon) {
      icon.style.transform = 'scale(1.2) rotate(5deg)'
      icon.style.transition = 'transform 0.3s ease'
    }
  })

  item.addEventListener('mouseleave', () => {
    const icon = item.querySelector('i')
    if (icon) {
      icon.style.transform = 'scale(1) rotate(0deg)'
    }
  })
})

// ===== PROJECT CARD EFFECTS =====
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`
  })

  card.addEventListener('mouseleave', () => {
    card.style.transform =
      'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)'
  })
})

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
  const notification = document.createElement('div')
  notification.className = `notification ${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `

  // Style the notification
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--bg-primary);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 16px 20px;
        color: var(--text-primary);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: var(--shadow-lg);
    `

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)'
  }, 100)

  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)'
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 300)
  }, 3000)
}

function getNotificationIcon(type) {
  switch (type) {
    case 'success':
      return 'fa-check-circle'
    case 'error':
      return 'fa-exclamation-circle'
    case 'warning':
      return 'fa-exclamation-triangle'
    default:
      return 'fa-info-circle'
  }
}

// ===== COPY TO CLIPBOARD =====
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showNotification('Copied to clipboard!', 'success')
      })
      .catch(() => {
        showNotification('Failed to copy to clipboard', 'error')
      })
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand('copy')
      showNotification('Copied to clipboard!', 'success')
    } catch (err) {
      showNotification('Failed to copy to clipboard', 'error')
    }
    document.body.removeChild(textArea)
  }
}

// Add copy functionality to email links
document.addEventListener('DOMContentLoaded', () => {
  const emailElements = document.querySelectorAll('[href^="mailto:"]')
  emailElements.forEach(el => {
    el.addEventListener('contextmenu', e => {
      e.preventDefault()
      const email = el.getAttribute('href').replace('mailto:', '')
      copyToClipboard(email)
    })
  })
})

// ===== EASTER EGGS =====
// Konami Code Easter Egg
let konamiCode = []
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65] // UP UP DOWN DOWN LEFT RIGHT LEFT RIGHT B A

document.addEventListener('keydown', e => {
  konamiCode.push(e.keyCode)

  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift()
  }

  if (
    konamiCode.length === konamiSequence.length &&
    konamiCode.every((code, index) => code === konamiSequence[index])
  ) {
    activateEasterEgg()
    konamiCode = []
  }
})

function activateEasterEgg() {
  // Rainbow effect
  document.body.style.animation = 'rainbow 2s ease infinite'

  // Add rainbow animation CSS
  const style = document.createElement('style')
  style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `
  document.head.appendChild(style)

  showNotification(
    '🎉 Konami Code activated! You found the easter egg!',
    'success'
  )

  // Reset after 5 seconds
  setTimeout(() => {
    document.body.style.animation = ''
    if (document.head.contains(style)) {
      document.head.removeChild(style)
    }
  }, 5000)
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Throttle function for performance
function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// ===== ACCESSIBILITY =====
// Skip to main content functionality
document.addEventListener('keydown', e => {
  if (e.key === 's' || e.key === 'S') {
    if (e.ctrlKey || e.altKey) {
      const mainContent = document.querySelector('#home')
      if (mainContent) {
        mainContent.focus()
        mainContent.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
})

// Keyboard navigation indicators
document.addEventListener('keydown', e => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation')
  }
})

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-navigation')
})

// ===== PRELOAD OPTIMIZATION =====
function preloadImages() {
  const images = [
    'https://avatars.githubusercontent.com/RonikChatterjee',
  ]

  images.forEach(src => {
    const img = new Image()
    img.src = src
  })
}

// Initialize preloading
preloadImages()

// ===== CONSOLE WELCOME MESSAGE =====
console.log(`
    ╔══════════════════════════════════════════════════════════════╗
    ║                                                              ║
    ║                   Welcome to Ronik's Portfolio!             ║
    ║                                                              ║
    ║  👋 Hi there! I see you're checking out the console.        ║
    ║  Feel free to explore the code on GitHub!                   ║
    ║                                                              ║
    ║  🔗 GitHub: https://github.com/RonikChatterjee              ║
    ║  📧 Email: ronikchatterjee615@gmail.com                    ║
    ║                                                              ║
    ║  Try the Konami Code for a surprise! 😉                     ║
    ║  (↑↑↓↓←→←→BA)                                               ║
    ║                                                              ║
    ╚══════════════════════════════════════════════════════════════╝
`)

// ===== ERROR HANDLING =====
window.addEventListener('error', function (e) {
  console.error('JavaScript Error:', e.error)
})

// ===== INITIALIZATION =====
// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  console.log('Portfolio JavaScript initialized successfully!')

  // Initialize any additional components here
  if (typeof AOS !== 'undefined') {
    AOS.refresh()
  }
})

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    updateThemeIcon,
    showNotification,
    copyToClipboard,
    throttle,
    animateStats,
    typeWriter,
  }
}
