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

  if (refs.menu) {
    refs.menu.addEventListener('click', onMenuClick)
  }

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

  function onMenuClick (e) {
    // Find the clicked link (could be the target or a parent)
    const link = e.target.closest('.link')
    if (link && isMenuOpen) {
      // Close the menu when any menu link is clicked
      isMenuOpen = false
      refs.menuButton.setAttribute('aria-expanded', false)
      el.removeAttribute('data-status')
      enableBodyScroll(refs.menu)
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
    if (refs.menu) {
      refs.menu.removeEventListener('click', onMenuClick)
    }
  }
}
