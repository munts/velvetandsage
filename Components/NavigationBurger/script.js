import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import delegate from 'delegate-event-listener'
import { buildRefs } from '@/assets/scripts/helpers.js'

export default function (el) {
  let isMenuOpen
  const refs = buildRefs(el)
  const navigationHeight = parseInt(window.getComputedStyle(el).getPropertyValue('--navigation-height')) || 0

  const isDesktopMediaQuery = window.matchMedia('(min-width: 1024px)')
  isDesktopMediaQuery.addEventListener('change', onBreakpointChange)

  const menuButtonClickDelegate = delegate('[data-ref="menuButton"]', onMenuButtonClick)
  el.addEventListener('click', menuButtonClickDelegate)

  const anchorLinkDelegate = delegate('a[href^="#"]', onAnchorLinkClick)
  el.addEventListener('click', anchorLinkDelegate)

  const menuLinkDelegate = delegate('.menu .link', onMenuLinkClick)
  el.addEventListener('click', menuLinkDelegate)

  onBreakpointChange()

  function onMenuButtonClick (e) {
    isMenuOpen = !isMenuOpen
    refs.menuButton.setAttribute('aria-expanded', isMenuOpen)

    if (isMenuOpen) {
      el.setAttribute('data-status', 'menuIsOpen')
      disableBodyScroll(refs.menu)
    } else {
      el.removeAttribute('data-status')
      enableBodyScroll(refs.menu)
    }
  }

  function onAnchorLinkClick (e) {
    // Close the menu when an anchor link is clicked
    if (isMenuOpen) {
      isMenuOpen = false
      refs.menuButton.setAttribute('aria-expanded', false)
      el.removeAttribute('data-status')
      enableBodyScroll(refs.menu)
    }
  }

  function onMenuLinkClick (e) {
    const href = e.target.getAttribute('href')
    // Close menu if it's an anchor link (either #section or full URL with #)
    if (href && (href.includes('#') || href.startsWith('#'))) {
      if (isMenuOpen) {
        isMenuOpen = false
        refs.menuButton.setAttribute('aria-expanded', false)
        el.removeAttribute('data-status')
        enableBodyScroll(refs.menu)
      }
    }
  }

  function onBreakpointChange () {
    if (!isDesktopMediaQuery.matches) {
      setScrollPaddingTop()
    }
  }

  function setScrollPaddingTop () {
    const scrollPaddingTop = document.getElementById('wpadminbar')
      ? navigationHeight + document.getElementById('wpadminbar').offsetHeight
      : navigationHeight
    document.documentElement.style.scrollPaddingTop = `${scrollPaddingTop}px`
  }

  return () => {
    isDesktopMediaQuery.removeEventListener('change', onBreakpointChange)
    el.removeEventListener('click', menuButtonClickDelegate)
    el.removeEventListener('click', anchorLinkDelegate)
    el.removeEventListener('click', menuLinkDelegate)
  }
}
