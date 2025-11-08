<?php

namespace Flynt\Components\MapGoogle;

use Flynt\FieldVariables;

add_filter('Flynt/addComponentData?name=MapGoogle', function (array $data): array {
    // Enqueue Google Maps API script if API key is provided
    if (!empty($data['apiKey'])) {
        $apiKey = $data['apiKey'];
        wp_enqueue_script(
            'google-maps-api',
            "https://maps.googleapis.com/maps/api/js?key={$apiKey}",
            [],
            null,
            true
        );
    }

    return $data;
});

function getACFLayout(): array
{
    return [
        'name' => 'mapGoogle',
        'label' => __('Map: Google', 'flynt'),
        'sub_fields' => [
            [
                'label' => __('Content', 'flynt'),
                'name' => 'contentTab',
                'type' => 'tab',
                'placement' => 'top',
                'endpoint' => 0
            ],
            [
                'label' => __('Google Maps API Key', 'flynt'),
                'instructions' => __('Enter your Google Maps API key. You can obtain one from the Google Cloud Console.', 'flynt'),
                'name' => 'apiKey',
                'type' => 'text',
                'required' => 1,
            ],
            [
                'label' => __('Address', 'flynt'),
                'instructions' => __('Enter the address to display on the map. This will be geocoded to get coordinates.', 'flynt'),
                'name' => 'address',
                'type' => 'text',
                'required' => 1,
                'placeholder' => '1600 Amphitheatre Parkway, Mountain View, CA'
            ],
            [
                'label' => __('Map Settings', 'flynt'),
                'name' => 'mapSettings',
                'type' => 'group',
                'layout' => 'table',
                'sub_fields' => [
                    [
                        'label' => __('Zoom Level', 'flynt'),
                        'instructions' => __('Map zoom level (1-20). Default is 15.', 'flynt'),
                        'name' => 'zoom',
                        'type' => 'number',
                        'default_value' => 15,
                        'min' => 1,
                        'max' => 20,
                        'step' => 1,
                    ],
                    [
                        'label' => __('Map Height', 'flynt'),
                        'instructions' => __('Height of the map in pixels. Default is 450.', 'flynt'),
                        'name' => 'height',
                        'type' => 'number',
                        'default_value' => 450,
                        'min' => 200,
                        'step' => 50,
                        'append' => 'px'
                    ]
                ]
            ],
            [
                'label' => __('Marker Content', 'flynt'),
                'instructions' => __('Content to display in the info window when the marker is clicked. Leave empty to disable the info window.', 'flynt'),
                'name' => 'markerContent',
                'type' => 'wysiwyg',
                'tabs' => 'visual,text',
                'media_upload' => 0,
                'delay' => 0,
                'required' => 0,
            ],
            [
                'label' => __('Options', 'flynt'),
                'name' => 'optionsTab',
                'type' => 'tab',
                'placement' => 'top',
                'endpoint' => 0
            ],
            [
                'label' => '',
                'name' => 'options',
                'type' => 'group',
                'layout' => 'row',
                'sub_fields' => [
                    FieldVariables\getTheme()
                ]
            ]
        ]
    ];
}
