import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

/**
 * Register column block
 */

registerBlockType('gutenberg-blocks/container-column', {
	title: __('Container Column'),
	description: __('Column block for container block.'),
	category: 'common',
	icon: 'editor-table',
	keywords: [__('Container Column')],
	attributes: {},
	edit: () => {
		return (
			<div className="container-column">
				<InspectorControls>
					<PanelBody title={__('Container Column Settings')}>
						settings
					</PanelBody>
				</InspectorControls>
				<div className="container-column__content">
					<InnerBlocks
						templateLock={false}
						renderAppender={() => (
							<InnerBlocks.ButtonBlockAppender />
						)}
					/>
				</div>
			</div>
		);
	},
	save: () => {
		return (
			<div className="container-column">
				<div className="container-column__content">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
});
