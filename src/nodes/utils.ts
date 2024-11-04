import { type Node } from '@xyflow/react';


export type TextNode = Node<{ text: string }, 'text'>;
export type MonitoringNode = Node<{}, 'monitor'>;
export type CommentNode = Node<{ text: string }, 'comment'>;
export type TextToBinaryNode = Node<{ bytes: [number] }, 't2binary'>;
export type XorNode = Node<{bytes: [number]}, "xor">;
export type BinaryToText = Node<{text: string}, "b2text">;

export type MyNode = TextNode | MonitoringNode | TextToBinaryNode | XorNode | CommentNode | BinaryToText;

export function isTextNode(
    node: any,
): node is TextNode | TextToBinaryNode | XorNode | BinaryToText | undefined {
    return !node ? false : node.type === 'text';
}
