/**
 * app全局reducer
 */
import * as types from '../constants/actionTypes'
import * as config from '../constants/config'

const initialState = {
  loading: false,
  users: [],
  page:1,
  pageCount:10,
  mainNav:config.MAIN_NAV_ID.NAV_MESSAGE
}

const appReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.REQ_USER_LIST:
      {
        return Object.assign({}, state, { fetchingNext:action.page>1, refreshing:action.page===1 })
      }
    case types.RES_USER_LIST:
      {
        let dataList = state.users.concat(action.users);
        return Object.assign({}, state, { users: dataList, page:action.page, pageCount:action.pageCount, fetchingNext:false, refreshing:false })
      }
    case types.REQ_USER_INFO:
      {
        return Object.assign({}, state, { user: {}});
      }
    case types.GET_USER_INFO:
      return Object.assign({}, state, { user: action.info });
    case types.SHOW_MORE_MENU:
      return Object.assign({}, state, { maskRender: action.maskRender });
    case types.HIDE_MORE_MENU:
      return Object.assign({}, state, {maskRender: null});
    case types.SHOW_MAIN_NAV:
      return Object.assign({}, state, {mainNav: action.navID});
    case types.REQ_ALL_FRIENDS:
      return Object.assign({}, state, {});
    case types.RES_ALL_FRIENDS:
      return Object.assign({}, state, {friendGroups:action.friendGroups, friends:action.friends});
    default:
      return state
  }
}
export default appReducers