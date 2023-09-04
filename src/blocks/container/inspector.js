/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, TextControl, BaseControl, ColorPalette, RangeControl } =
	wp.components;

const Inspector = ({ attributes, setAttributes }) => {
	const { content, textColor, cols } = attributes;

	return (
		<InspectorControls>
			<PanelBody title={__('Test Block Settings', 'boilerplate')}>
				<RangeControl
					label="Columns Number"
					value={cols}
					onChange={(value) => setAttributes({ cols: value })}
					min={1}
					max={4}
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
