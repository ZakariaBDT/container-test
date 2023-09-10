/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	__experimentalBlockVariationPicker as BlockVariationPicker
} from '@wordpress/block-editor';
const { Fragment, useEffect, useMemo, useState } = wp.element;

const { PanelBody, RangeControl } = wp.components;
import { times } from 'lodash';
const { __ } = wp.i18n;
import { withSelect, useDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { createBlock } from '@wordpress/blocks';


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

function Edit({ attributes, setAttributes, clientId,
	variations, hasInnerBlocks, defaultVariation, replaceInnerBlocks, preview }) {
	console.log({ variations, hasInnerBlocks });
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

	//Update the template and trigger re-render when deskCols changes
	useEffect(() => {
		setTemplate(cal);
	}, [deskCols]);


	const blockVariationPickerOnSelect = (
		nextVariation = defaultVariation
	) => {
		if (nextVariation.attributes) {
			setAttributes(nextVariation.attributes);
		}

		if (nextVariation.innerBlocks) {
			replaceInnerBlocks(
				clientId,
				createBlocksFromInnerBlocksTemplate(nextVariation.innerBlocks)
			);
		}
	};

	const createBlocksFromInnerBlocksTemplate = (innerBlocksTemplate) => {
		return innerBlocksTemplate.map(
			([name, attributes, innerBlocks = []]) =>
				createBlock(
					name,
					attributes,
					createBlocksFromInnerBlocksTemplate(innerBlocks)
				)
		);
	};

	if (!hasInnerBlocks) {
		return (
			preview ? <h3>preview</h3> :
				<>
					<div className='variation-picker-wrap'>
						<BlockVariationPicker
							icon={''}
							label={__('Select Column Layout')}
							variations={variations}
							instructions={''}
							onSelect={(nextVariation) =>
								blockVariationPickerOnSelect(nextVariation)
							}
						/>
					</div>
				</>
		);
	}



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

			<div {...blockProps}>
				<div className="blocks-container">
					{/* <InnerBlocks
						allowedBlocks={['gutenberg-blocks/container-column']}
						renderAppender="false"
						template={getTemplate}
					/> */}
					<InnerBlocks
						template={template}
						templateLock='all'
						allowedBlocks={['gutenberg-blocks/container-column']}
					/>
				</div>
			</div>
		</Fragment>
	);
}

//export default Edit;


const applyWithSelect = withSelect((select, props) => {
	const { getBlocks } = select('core/block-editor');
	const {
		getBlockType,
		getBlockVariations,
		getDefaultBlockVariation,
	} = select('core/blocks');

	const innerBlocks = getBlocks(props.clientId);
	const { replaceInnerBlocks } = useDispatch('core/block-editor');

	return {
		innerBlocks,
		hasInnerBlocks: select('core/block-editor').getBlocks(props.clientId).length > 0,
		blockType: getBlockType(props.name),
		defaultVariation: typeof getDefaultBlockVariation === 'undefined' ? null : getDefaultBlockVariation(props.name),
		variations: typeof getBlockVariations === 'undefined' ? null : getBlockVariations(props.name),
		replaceInnerBlocks,
	};
});

export default compose(applyWithSelect)(Edit);
