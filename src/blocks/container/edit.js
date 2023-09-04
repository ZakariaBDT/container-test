/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
const { Fragment, useEffect, useMemo, useState } = wp.element;

const { PanelBody, RangeControl } = wp.components;
import { times } from 'lodash';
const { __ } = wp.i18n;

// editor style
import './editor.scss';

/**
 * Internal dependencies
 */
// import Inspector from './inspector';
import { softMinifyCssStrings } from '../../helper/softminify';

// column
import './column';

/**
 * Edit function
 */

export default function Edit({ attributes, setAttributes, clientId }) {
	const { uniqueId, blockStyle, deskCols } = attributes;

	const [template, setTemplate] = useState([]);

	const expensiveCalculation = (num) => {
		return times(num, () => ['gutenberg-blocks/container-column']);
	};

	const cal = useMemo(() => expensiveCalculation(deskCols), [deskCols]);

	// Unique ID
	useEffect(() => {
		if (!uniqueId) {
			setAttributes({
				uniqueId: 'boilerplate-' + clientId.slice(0, 8),
			});
		}
	}, [uniqueId, clientId]);

	// Block Props
	const blockProps = useBlockProps({
		className: uniqueId,
	});

	/**
	 * Block Styles
	 */
	const deskStyles = ``;
	const tabStyles = ``;
	const mobStyles = ``;

	/**
	 * Block All Styles
	 */
	const blockStyleCss = `
		${deskStyles}
		@media (max-width: 1024px) and (min-width: 768px) {
			${tabStyles}
		}
		@media (max-width: 767px) {
			${mobStyles}
		}
	`;

	// Set Block Styles
	useEffect(() => {
		if (JSON.stringify(blockStyle) !== JSON.stringify(blockStyleCss)) {
			setAttributes({ blockStyle: blockStyleCss });
		}
	}, [blockStyle, blockStyleCss]);

	// Update the template and trigger re-render when deskCols changes
	useEffect(() => {
		setTemplate(cal);
	}, [deskCols]);

	return (
		<Fragment>
			<style>{`${softMinifyCssStrings(blockStyleCss)}`}</style>
			<InspectorControls>
				<PanelBody title={__('Test Block Settings', 'boilerplate')}>
					<RangeControl
						label="Columns Number"
						value={deskCols}
						onChange={(value) => setAttributes({ deskCols: value })}
						min={1}
						max={4}
					/>
				</PanelBody>
			</InspectorControls>
			{/* <Inspector attributes={attributes} setAttributes={setAttributes} /> */}
			<div {...blockProps}>
				<div className="blocks-container">
					<InnerBlocks
						allowedBlocks={['gutenberg-blocks/container-column']}
						renderAppender="false"
						template={template}
					/>
				</div>
			</div>
		</Fragment>
	);
}
