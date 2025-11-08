<?php

use ACFComposer\ResolveConfig;
use Flynt\Api;
use Flynt\Components;

call_user_func(function (): void {
    $basePath = __DIR__;
    Api::registerComponentsFromPath($basePath);
});

add_action('Flynt/afterRegisterComponents', function (): void {
    $acfData = acf_get_local_store('fields');
    $fieldGroups = ['pageComponents', 'reusableComponents'];
    $layouts = [
        Components\AccordionDefault\getACFLayout(),
        Components\BlockCountUp\getACFLayout(),
        Components\BlockImageTextParallax\getACFLayout(),
        Components\BlockTextImageCrop\getACFLayout(),
        Components\BlockWysiwygSidebar\getACFLayout(),
        Components\BlockWysiwygTwoCol\getACFLayout(),
        Components\FormContactForm7\getACFLayout(),
        Components\HeroCta\getACFLayout(),
        Components\HeroImageCta\getACFLayout(),
        Components\HeroImageText\getACFLayout(),
        Components\HeroSlider\getACFLayout(),
        Components\HeroTextImage\getACFLayout(),
        Components\ListIcons\getACFLayout(),
        Components\ListLogos\getACFLayout(),
        Components\ListSocial\getACFLayout(),
        Components\MapGoogle\getACFLayout(),
        Components\NavigationFooterColumns\getACFLayout(),
        Components\SliderImageGallery\getACFLayout(),
        Components\SliderImagesCentered\getACFLayout(),
    ];

    foreach ($fieldGroups as $fieldGroup) {
        $fields = $acfData->get($fieldGroup);
        foreach ($layouts as $layout) {
            $config = ResolveConfig::forLayout($layout, [$fieldGroup . '_' . $fieldGroup]);
            $config['label'] = "🏆 &nbsp;{$config['label']}";
            $fields['layouts'][] = $config;
        }

        $acfData->set($fields['key'], $fields);
    }
}, 11);
