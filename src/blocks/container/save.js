/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Save function
 */

export default function save({ attributes }) {
	const { uniqueId } = attributes;

	// Block Props
	const blockProps = useBlockProps.save({
		className: uniqueId,
	});

	return <div {...blockProps}>Save</div>;
}
