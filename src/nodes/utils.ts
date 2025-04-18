import { type Node } from '@xyflow/react';



export type TextNode = Node<{}, 'text'>;
export type MonitoringNode = Node<{}, 'monitor'>;
export type CommentNode = Node<{text: string}, 'comment'>;
export type TextToBinaryNode = Node<{}, 't2binary'>;
export type XorNode = Node<{}, "xor">;
export type BinaryToText = Node<{}, "b2text">;
export type SplitNode = Node<{outputs: number}, "split">;
export type RandomGenNode = Node<{}, "random">;
export type DePaddingNode = Node<{}, "dePad">
export type PaddingNode = Node<{}, "pad">;
export type SubBytes = Node<{}, "subBytes">;
export type InvSubBytes = Node<{}, "invSubBytes">;
export type ShiftRows = Node<{}, "shiftR">;
export type InvShiftRows = Node<{}, "invShiftR">
export type ColumnMajorOrder = Node<{},"colMajor">
export type MixColumns = Node<{},"mixColumns">;
export type BytesNode = Node<{},"bytesIn">;
export type MyNode =  BytesNode | ColumnMajorOrder| MixColumns | InvSubBytes | InvShiftRows| ShiftRows | SubBytes |  TextNode | MonitoringNode | TextToBinaryNode | XorNode | CommentNode | BinaryToText | SplitNode | RandomGenNode | PaddingNode | DePaddingNode ;

export function isTextNode(
    node: any,
): node is TextNode | BinaryToText | undefined {
    return !node ? false : node.type === 'text';
}
