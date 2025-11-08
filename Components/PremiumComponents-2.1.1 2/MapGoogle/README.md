# Map: Google

Displays an interactive Google Map with a marker at a specified address.

## Features

- **Address Geocoding**: Automatically converts addresses to map coordinates
- **Customizable Marker**: Add custom content to display in an info window when the marker is clicked
- **Configurable Settings**:
  - Adjustable zoom level (1-20)
  - Custom map height
  - Theme support
- **Lazy Loading**: Map loads when visible in the viewport

## ACF Fields

### Content Tab

1. **Google Maps API Key** (text, required)
   - Your Google Maps API key from the Google Cloud Console
   - Get one at: https://console.cloud.google.com/

2. **Address** (text, required)
   - The address to display on the map
   - Example: "1600 Amphitheatre Parkway, Mountain View, CA"

3. **Map Settings** (group)
   - **Zoom Level** (number): Map zoom level from 1-20 (default: 15)
   - **Map Height** (number): Height in pixels (default: 450px)

4. **Marker Content** (WYSIWYG, optional)
   - HTML content to display when marker is clicked
   - Leave empty to disable the info window

### Options Tab

- **Theme**: Choose a theme variant for the component

## Setup Instructions

1. **Get a Google Maps API Key**:
   - Go to https://console.cloud.google.com/
   - Create a new project or select an existing one
   - Enable the "Maps JavaScript API" and "Geocoding API"
   - Create credentials (API Key)
   - Restrict the key to your domain for security

2. **Add the Component**:
   - Add the "Map: Google" component to your flexible content
   - Enter your API key
   - Enter the address you want to display
   - Optionally customize the zoom level and height
   - Optionally add content for the marker info window

## Technical Notes

- The component uses the Google Maps JavaScript API
- Addresses are geocoded on the fly using the Geocoding API
- The map initializes when it becomes visible in the viewport (lazy loading)
- Error handling is included for failed geocoding or API loading issues

## Browser Compatibility

Works in all modern browsers that support Google Maps JavaScript API.
