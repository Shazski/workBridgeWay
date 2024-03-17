import { Types } from "mongoose";

export interface MessageEntity {
    _id?: string | Types.ObjectId;
    roomId: string;
    sender: Types.ObjectId | string;
    message: string;
    messageType: 'text' | 'image' | 'video' | 'audio' | 'file';
    recieverSeen: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}