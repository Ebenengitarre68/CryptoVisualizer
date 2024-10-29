import { type Node } from '@xyflow/react';

export type TextNode = Node<{ text: string }, 'text'>;
export type ResultNode = Node<{}, 'result'>;
export type TextToBinaryNode = Node<{ text: [number] }, 't2binary'>;
export type MyNode = TextNode | ResultNode | TextToBinaryNode;

export function isTextNode(
    node: any,
): node is TextNode | TextToBinaryNode | undefined {
    return !node ? false : node.type === 'text' || node.type === 't2binary';
}
