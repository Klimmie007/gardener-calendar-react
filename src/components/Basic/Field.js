class Field
{
    constructor(name, type, dispatch, reducer, validate = (smth) => {return smth ? "" : "Field cannot be empty"})
    {
        this.name = name
        this.type = type
        this.dispatch = dispatch
        this.validate = validate
        this.reducer = reducer
    }
}

export default Field