import { __ } from '@wordpress/i18n';
import Icons from './icons';
const variations = [

	{
		name: 'one-column',
		label: __('One column', 'boilerplate'),
		icon: Icons['100'],
		attributes: {
			deskCols: 1,
		},
		innerBlocks: [
			['gutenberg-blocks/container-column', { columnWidth: { lg: 100, md: 100, sm: 100, unit: '%' } }]
		],
		scope: ['block'],
	},

	{
		name: 'two-column',
		label: __('Two columns', 'boilerplate'),
		icon: Icons['50-50'],
		attributes: {
			deskCols: 2,
		},
		isDefault: true,
		innerBlocks: [
			['gutenberg-blocks/container-column', { columnWidth: { lg: 50, md: 50, sm: 100, unit: '%' } }],
			['gutenberg-blocks/container-column', { columnWidth: { lg: 50, md: 50, sm: 100, unit: '%' } }],
		],
		scope: ['block'],
	},

];
export default variations;
