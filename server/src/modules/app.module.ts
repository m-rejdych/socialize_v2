import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import typeOrmConfigModule from './db/typeorm.module';
import UserModule from './user/user.module';
import AuthModule from './auth/auth.module';
import UserInfoModule from './userInfo/userInfo.module';
import FriendshipModule from './friendship/friendship.module';
import CountryModule from './country/country.module';
import CityModule from './city/city.module';
import RelationshipModule from './relationship/relationship.module';
import PostModule from './post/post.module';
import PostReactionModule from './postReaction/postReaction.module';
import ReactionTypeModule from './reactionType/reactionType.module';
import CommentModule from './comment/comment.module';
import CommentReactionModule from './commentReaction/commentReaction.module';
import ChatModule from './chat/chat.module';
import ChatTypeModule from './chatType/chatType.module';
import MessageModule from './message/message.module';
import MessageReactionModule from './messageReaction/messageReaction.module';
import NotificationTypeModule from './notificationType/notificationType.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    typeOrmConfigModule,
    UserModule,
    AuthModule,
    UserInfoModule,
    FriendshipModule,
    CountryModule,
    CityModule,
    RelationshipModule,
    PostModule,
    PostReactionModule,
    ReactionTypeModule,
    CommentModule,
    CommentReactionModule,
    ChatModule,
    ChatTypeModule,
    MessageModule,
    MessageReactionModule,
    NotificationTypeModule,
  ],
})
export class AppModule {}
