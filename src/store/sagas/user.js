import { put, takeEvery } from 'redux-saga/effects';
import userActions, { types } from 'store/actions/user';
import { net, forceUtil } from 'react-native-force';

export function* getUserSaga() {
  yield takeEvery(types.USER_GET, makeGetUser);
}

function* makeGetUser({ payload: { id, isRefreshing } }) {
  try {
    yield put(userActions.fetchUserStart({ isRefreshing }));

    const {
      records: [data],
    } = yield forceUtil.promiser(net.query)(
      `SELECT Id, Name, Email, UserType, CommunityNickname, isActive FROM user WHERE Id = '${id}'`,
    );

    yield put(userActions.fetchUserSuccess({ data }));
  } catch (error) {
    console.log(error);
    yield put(userActions.fetchUserFailed());
  }
}
