import { all } from 'redux-saga/effects';

import { registerSaga, loginSaga, autoLoginSaga } from './authSaga';
import { getUserSaga } from './userSaga';
import { getUserInfoSaga, updateUserInfoSaga } from './profileSaga';
import {
  getAllFriendshipsSaga,
  getFriendshipSaga,
  createFriendshipSaga,
  acceptFriendshipSaga,
  deleteFriendshipSaga,
} from './friendshipSaga';
import {
  createPostSaga,
  getFeedSaga,
  updatePostSaga,
  deletePostSaga,
  addPostReactionSaga,
  deletePostReactionSaga,
} from './postSaga';
import { createCommentSaga } from './commentSaga';

export default function* rootSaga() {
  yield all([
    registerSaga(),
    loginSaga(),
    autoLoginSaga(),
    getUserSaga(),
    getUserInfoSaga(),
    updateUserInfoSaga(),
    getAllFriendshipsSaga(),
    getFriendshipSaga(),
    createFriendshipSaga(),
    acceptFriendshipSaga(),
    deleteFriendshipSaga(),
    createPostSaga(),
    getFeedSaga(),
    updatePostSaga(),
    deletePostSaga(),
    addPostReactionSaga(),
    deletePostReactionSaga(),
    createCommentSaga(),
  ]);
}
