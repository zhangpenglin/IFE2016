import {combineReducers} from 'redux'

const initialState = {
    head: [
        {title: '姓名', sort: false},
        {title: '语文', sort: true},
        {title: '数学', sort: true},
        {title: '英语', sort: true},
        {title: '总分', sort: true}],
    body: [
        ['小明', 80, 90, 70, 240],
        ['小红', 90, 60, 90, 240],
        ['小亮', 60, 100, 70, 230]]
}
function sort(state = initialState, action) {
    let index
    switch (action.type) {
        case 'ASC_SORT':
            state.head.forEach((n, i)=> {
                if (n.title == action.title) {
                    index = i
                }
            })
            return Object.assign(
                {},
                {
                    head: state.head,
                    body: state.body.sort((a, b)=> {
                        if (a[index] > b[index]) {
                            return 1
                        }
                        else if (a[index] == b[index]) {
                            return 0
                        } else {
                            return -1
                        }
                    })
                }
            )
            break;
        case 'DESC_SORT':
            state.head.forEach((n, i)=> {
                if (n.title == action.title) {
                    index = i
                }
            })
            return Object.assign(
                {},
                {
                    head: state.head,
                    body: state.body.sort((a, b)=> {
                        if (a[index] < b[index]) {
                            return 1
                        }
                        else if (a[index] == b[index]) {
                            return 0
                        } else {
                            return -1
                        }
                    })
                }
            )
            break;
        default:
            return state
    }
}
export default combineReducers({sort})