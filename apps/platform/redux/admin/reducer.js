import { actionTypes } from './actions'

const initState = {
    hasAccess: false,
    data:{},
    history: ''
}

const reducer = (state = initState, action) => {
    switch(action.type){
        case actionTypes.ADMIN_ACCESS_ALLOWED:
            return{
                ...state,
                hasAccess: true,
                data:action.props
            }
        case actionTypes.ADMIN_ACCESS_DENIED: 
            return {
                ...state,
                hasAccess: false,
                data:{}
            }
        case actionTypes.SET_HISTORY:
            return {
                ...state,
                history: action.props
            }
        default:
            return state
    }
}

export default reducer