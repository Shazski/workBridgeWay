import mongoose, { Schema } from "mongoose";
// import { IMessages } from "../../../../entities/messageEntities";

const MessageSchema: Schema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  reciverId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  chatRoomId: {
    type: Schema.Types.ObjectId,
  },
  message : {
    type :  String ,
    required : true 
  },
  typeOfMessage : {
    type : String 
  },
  unread : {
    type : String ,
    default : true ,
    required : true 
  },
  showToReciever : {
    type : String ,
    default : true 
  },
  latestMessage : {
    type : String ,
  }
},{
    timestamps : true 
});

// const MessageCollection  = mongoose.model<IMessages>('messages',MessageSchema)
// export default MessageCollection ; 

// export interface MessageDocument  extends IMessages {
//     createdAt : Date,
//     updatedAt : Date 
// }