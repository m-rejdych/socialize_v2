import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import Message from '../message/message.entity';
import ReactionType from '../reactionType/reactionType.entity';
import User from '../user/user.entity';

@Entity()
class MessageReaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.messageReactions, { cascade: true })
  user: User;

  @ManyToOne(() => Message, (message) => message.reactions, { cascade: true })
  message: Message;

  @ManyToOne(() => ReactionType)
  type: ReactionType;
}

export default MessageReaction;
