import { createTheme as createMuiTheme, responsiveFontSizes } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles/createTheme';
import type { ThemeMode } from 'src/constants/settings';
import { createOptions as createBaseOptions } from './base/create-options';
import { createOptions as createDarkOptions } from './dark/create-options';
import { createOptions as createLightOptions } from './light/create-options';

declare module '@mui/material/styles/createPalette' {
	interface ColorRange {
		50: string;
		100: string;
		200: string;
		300: string;
		400: string;
		500: string;
		600: string;
		700: string;
		800: string;
		900: string;
	}

	interface Palette {
		neutral: ColorRange;
	}

	interface PaletteColor {
		lightest?: string;
		darkest?: string;
		alpha4?: string;
		alpha8?: string;
		alpha12?: string;
		alpha30?: string;
		alpha50?: string;
	}

	interface PaletteOptions {
		neutral?: ColorRange;
	}

	interface TypeBackground {
		paper: string;
		default: string;
	}
}

export type ColorPreset = 'blue' | 'green' | 'indigo' | 'purple';

export type Contrast = 'normal' | 'high';

export type Direction = 'ltr' | 'rtl';

export type ThemeConfig = {
	colorPreset?: ColorPreset;
	contrast?: Contrast;
	direction?: Direction;
	paletteMode?: ThemeMode;
	responsiveFontSizes?: boolean;
};

export const createTheme = (config: ThemeConfig): Theme => {
	let theme = createMuiTheme(
		// Base options available for both dark and light palette modes
		createBaseOptions({
			direction: config.direction,
		}),
		// Options based on selected palette mode, color preset and contrast
		config.paletteMode === 'dark'
			? createDarkOptions({
					colorPreset: config.colorPreset,
					contrast: config.contrast,
				})
			: createLightOptions({
					colorPreset: config.colorPreset,
					contrast: config.contrast,
				}),
	);

	if (config.responsiveFontSizes) {
		theme = responsiveFontSizes(theme);
	}

	return theme;
};
