/* globals google */
import { buildRefs } from '@/assets/scripts/helpers.js'

export default function (el) {
  const refs = buildRefs(el)

  let map = null
  let marker = null
  let infoWindow = null

  const {
    address,
    markerContent,
    zoom = '15'
  } = refs.mapContainer.dataset

  // Wait for Google Maps API to be loaded
  const initMap = () => {
    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
      console.error('Google Maps API not loaded')
      return
    }

    // Initialize geocoder
    const geocoder = new google.maps.Geocoder()

    // Geocode the address
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK') {
        const location = results[0].geometry.location

        // Create map
        map = new google.maps.Map(refs.mapContainer, {
          center: location,
          zoom: parseInt(zoom, 10),
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true
        })

        // Create marker
        marker = new google.maps.Marker({
          map,
          position: location,
          animation: google.maps.Animation.DROP
        })

        // Create info window if marker content is provided
        if (markerContent && markerContent.trim() !== '') {
          infoWindow = new google.maps.InfoWindow({
            content: markerContent
          })

          // Add click listener to marker to open info window
          marker.addListener('click', () => {
            infoWindow.open(map, marker)
          })
        }
      } else {
        console.error('Geocode was not successful for the following reason: ' + status)
        refs.mapContainer.innerHTML = '<div style="padding: 2rem; text-align: center; background: #f5f5f5;">Unable to load map. Please check the address.</div>'
      }
    })
  }

  // Check if Google Maps is already loaded
  if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
    initMap()
  } else {
    // Wait for the script to load
    const checkGoogleMaps = setInterval(() => {
      if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
        clearInterval(checkGoogleMaps)
        initMap()
      }
    }, 100)

    // Timeout after 10 seconds
    setTimeout(() => {
      clearInterval(checkGoogleMaps)
      if (!map) {
        console.error('Google Maps API failed to load within timeout')
        refs.mapContainer.innerHTML = '<div style="padding: 2rem; text-align: center; background: #f5f5f5;">Unable to load map. Please check your API key.</div>'
      }
    }, 10000)
  }

  // Cleanup function
  return () => {
    if (infoWindow) {
      infoWindow.close()
    }
    if (marker) {
      marker.setMap(null)
    }
    if (map) {
      map = null
    }
  }
}
