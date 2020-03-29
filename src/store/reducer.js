const defaultSatte = {
    inputValue: 'HW',
    list: []
}
export default (state = defaultSatte, action) => {
    if(action.type === 'change_input_value'){
        const newState = JSON.parse(JSON.stringify(state));
        newState.inputValue = action.value;
        return newState;
    }
    return state;
}