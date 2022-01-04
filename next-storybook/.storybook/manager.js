import { addons } from '@storybook/addons';

addons.setConfig({
    isFullscreen: false,
    showNav: true,
    showPanel: true,
    panelPosition: 'bottom',
    enableShortcuts: false,
    isToolshown: true,
    selectedPanel: undefined,
    initialActive: 'sidebar',
    sidebar: {
      showRoots: false,
      collapsedRoots: ['other'],
    },
    backgrounds: false,
    toolbar: {
      title: { hidden: false, },
      zoom: { hidden: true, },
      eject: { hidden: true, },
      copy: { hidden: true, },
      fullscreen: { hidden: false, },
      Backgrounds: { hidden: true, },
    },
  });