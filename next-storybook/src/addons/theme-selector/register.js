import React, {useCallback, useEffect} from 'react';
import { addons, types } from '@storybook/addons';
import { WithTooltip, IconButton, TooltipLinkList } from '@storybook/components';
import { useGlobals } from '@storybook/api';

const ADDON_ID = 'addons';
const TOOLBAR_ID = `${ADDON_ID}/toolbar`;

const getLinks = async () => {
  const url = 'http://localhost:8080/api/themes';
  const response = await fetch(url);
  const themes = await response.json();


  return themes.map(theme => {
    return {
      id: theme.value, title: theme.title, onClick: (e) => {
        console.log(e);
      }
    };
  })
}
let links = [
  {
    id: 'title', title: 'title', onClick: (e) => {
      console.log(e);
    }
  }
];


const ThemeSelector = ()=>{

  useEffect(()=>{
    getLinks().then(dynLinks=>{
      links = dynLinks;
    });
  },[])

  return <WithTooltip placement="top" trigger="click" tooltip={<TooltipLinkList links={links} />}>
  <IconButton>Click me!</IconButton>
</WithTooltip>;
}
addons.register(ADDON_ID, () => {
  addons.add(TOOLBAR_ID, {
    type: types.TOOL,
    title: 'My Addon',
    render:  ThemeSelector,
  });
});