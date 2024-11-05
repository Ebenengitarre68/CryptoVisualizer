import { type Node } from '@xyflow/react';


export type TextNode = Node<{}, 'text'>;
export type MonitoringNode = Node<{}, 'monitor'>;
export type CommentNode = Node<{text: string}, 'comment'>;
export type TextToBinaryNode = Node<{}, 't2binary'>;
export type XorNode = Node<{}, "xor">;
export type BinaryToText = Node<{}, "b2text">;
export type SplitNode = Node<{outputs: number}, "split">;

export type MyNode = TextNode | MonitoringNode | TextToBinaryNode | XorNode | CommentNode | BinaryToText | SplitNode;

export function isTextNode(
    node: any,
): node is TextNode | BinaryToText | undefined {
    return !node ? false : node.type === 'text';
}
