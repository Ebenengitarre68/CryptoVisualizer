import { type Node } from '@xyflow/react';


export type TextNode = Node<{ text: string }, 'text'>;
export type ResultNode = Node<{}, 'result'>;
export type TextToBinaryNode = Node<{ bytes: [number] }, 't2binary'>;
export type XorNode = Node<{bytes: [number]}, "xor">;
export type MyNode = TextNode | ResultNode | TextToBinaryNode | XorNode;

export function isTextNode(
    node: any,
): node is TextNode | TextToBinaryNode | XorNode | undefined {
    return !node ? false : node.type === 'text';
}
