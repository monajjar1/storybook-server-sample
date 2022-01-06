import React, { useState, useCallback, useEffect } from 'react';
import { addons, types } from '@storybook/addons';
import { WithTooltip, IconButton, TooltipLinkList } from '@storybook/components';
import { useGlobals } from '@storybook/api';

const ADDON_ID = 'addons';
const TOOLBAR_ID = `${ADDON_ID}/toolbar`;

const getThemes = async (onClick) => {
  const url = 'http://localhost:8080/api/themes';
  const response = await fetch(url);
  const themes = await response.json();


  return themes.map(theme => {
    return {
      id: theme, title: theme, onClick: (e) => onClick(e, theme)
    };
  })
}


const getProducts = async (onClick, theme) => {
  const url = `http://localhost:8080/api/products?theme=${theme}`;
  const response = await fetch(url);
  const products = await response.json();


  return products.map(product => {
    return {
      id: product, title: product, onClick: (e) => onClick(e, product)
    };
  })
}

const ProductSelector = ({theme, resetProduct, productHasReset}) => {
  const [products, updateProducts] = useState([]);
  const [{ product }, updateGlobals] = useGlobals();

  const onClick = (e, product) => {
    setProduct(product)
  }

  const setProduct = useCallback(
    (selectProduct) => {
      return updateGlobals({ 'product': selectProduct });
    },
    [product]
  );

  useEffect(()=>{
    if(resetProduct){
      setTimeout(()=>{
        setProduct(undefined)
      productHasReset()
      },100)
    }
  },[resetProduct]);

  const fetchProducts = async () => {
    return new Promise(async (resolve) => {
      const products = await getProducts(onClick,theme);
      updateProducts(products);
      resolve(products);
    })
  }

  return(
  <WithTooltip placement="bottom" trigger="click" tooltip={<TooltipLinkList links={products} />}>
    <IconButton onClick={()=>fetchProducts()} >Product: {product ? product : 'Select'}</IconButton>
  </WithTooltip>
  )
}

const ThemeSelector = () => {
  const [{ theme }, updateGlobals] = useGlobals();
  const [themes, updateThemes] = useState([]);
  const [shouldReset, updateShouldReset] = useState(false);

  const onClick = (e, selectedTheme) => {
    setTheme(selectedTheme)
  }

  const setTheme = useCallback(
    (selectedTheme) => {
      updateShouldReset(true);
      return updateGlobals({ 'theme': selectedTheme });
    },
    [theme]
  );


  const fetchThemes = () => {
    return new Promise(async (resolve) => {
      if (themes.length) {
        resolve(themes);
        return;
      }
      const apiThemes = await getThemes(onClick);
      updateThemes(apiThemes);
      resolve(apiThemes)
    })
  }


  return (<>
      <WithTooltip placement="bottom" trigger="click" tooltip={<TooltipLinkList links={themes} />}>
        <IconButton onClick={()=>fetchThemes()}>Theme: {theme || "Select"}</IconButton>
      </WithTooltip>
      <ProductSelector theme={theme} resetProduct={shouldReset} productHasReset={()=>updateShouldReset(false)} />
     </>

  );

}

addons.register(ADDON_ID, async (api) => {
  addons.add(TOOLBAR_ID, {
    type: types.TOOL,
    title: 'Theme selector',
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: ThemeSelector,
  });
});