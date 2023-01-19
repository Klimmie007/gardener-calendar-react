class Field
{
    constructor(name, type, dispatch, validate = (smth) => {return smth ? "" : "Field cannot be empty"})
    {
        this.name = name
        this.type = type
        this.dispatch = dispatch
        this.validate = validate
    }
}

export default Field