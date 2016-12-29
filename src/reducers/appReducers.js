/**
 * app全局reducer
 */
import * as ActionTypes from '../constants/ActionTypes'
import * as Config from '../constants/Config'

const initialState = {
  loading: false,
  users: [],
  page:1,
  pageCount:10,
  mainNav:Config.MAIN_NAV_ID.NAV_MESSAGE
}

const AppReducers = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REQ_USER_LIST:
      {
        return Object.assign({}, state, { fetchingNext:action.page>1, refreshing:action.page===1 })
      }
    case ActionTypes.RES_USER_LIST:
      {
        let dataList = state.users.concat(action.users);
        return Object.assign({}, state, { users: dataList, page:action.page, pageCount:action.pageCount, fetchingNext:false, refreshing:false })
      }
    case ActionTypes.REQ_USER_INFO:
      {
        return Object.assign({}, state, { user: {}});
      }
    case ActionTypes.GET_USER_INFO:
      return Object.assign({}, state, { user: action.info });
    case ActionTypes.SHOW_MORE_MENU:
      return Object.assign({}, state, { maskRender: action.maskRender });
    case ActionTypes.HIDE_MORE_MENU:
      return Object.assign({}, state, { maskRender: null});
    case ActionTypes.SHOW_MAIN_NAV:
      return Object.assign({}, state, { mainNav: action.navID});
    case ActionTypes.REQ_ALL_FRIENDS:
      return Object.assign({}, state, {});
    case ActionTypes.RES_ALL_FRIENDS:
      return Object.assign({}, state, { friendGroups:action.friendGroups, friends:action.friends});
    case ActionTypes.RES_ALL_ZONE_DATAS:
      return Object.assign({}, state, { ...action});
    default:
      return Object.assign({}, state, { ...action});
  }
}
export default AppReducers