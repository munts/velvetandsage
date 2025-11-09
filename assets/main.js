import 'vite/modulepreload-polyfill'
import FlyntComponent from './scripts/FlyntComponent'

import 'lazysizes'

if (import.meta.env.DEV) {
  import('@vite/client')
}

import.meta.glob([
  '../Components/**',
  '../assets/**',
  '!**/*.js',
  '!**/*.scss',
  '!**/*.php',
  '!**/*.twig',
  '!**/screenshot.png',
  '!**/*.md'
])

window.customElements.define(
  'flynt-component',
  FlyntComponent
)

// Smooth scroll for anchor links
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]')
  if (!link) return

  const targetId = link.getAttribute('href')
  if (targetId === '#') return

  const targetElement = document.querySelector(targetId)
  if (!targetElement) return

  e.preventDefault()

  const offset = 130 // Header height (120px) + extra padding (10px)
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  })
})
