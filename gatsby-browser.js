//** @jsx jsx */
import React from 'react';
import { MDXProvider } from "@mdx-js/react";
import { jsx, ThemeProvider, merge } from 'theme-ui'

import Layout from '@modules/layouts/site_layout';
import { TranslationProvider } from "@modules/localization";
import { shortcodes } from "@modules/ui";
import {ThemeUIConfig} from '@modules/utility';
import { LocationContext } from "@reach/router"


export const wrapRootElement = ({element}) => (
<ThemeProvider {...ThemeUIConfig}>
	<MDXProvider components={shortcodes}> 
		<TranslationProvider>
				{element}
		</TranslationProvider>
	</MDXProvider>
</ThemeProvider>
)

export const wrapPageElement = ({element}) => (
	<Layout>
		{element}
	</Layout>
)
