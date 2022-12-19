import React, { Component } from "react";

class DefinePreserve extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            productionDate: new Date(),
            expiratinDate: new Date(),
        };
    }

    onChange = (event) => {
        var name = event.target.id;
        var value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    addPreserve = () => {
        const {addPreserve} = this.props;
        addPreserve(this.state);
    }

    render() {
        return(
            <div>
                <h1>Define preserve</h1>
                <div>
                    Name: 
                    <input type="text" id="name" onChange={this.onChange}/>   
                </div>
                <div>
                    Description: <br/>
                    <input type="text" id="description" onChange={this.onChange}/>
                </div>
                <div>
                    Date of production: 
                    <input type="date" id="productionDate" onChange={this.onChange}/>
                </div>
                <div>
                    Expiration date: 
                    <input type="date" id="expiratinDate" onChange={this.onChange}/>
                </div>
                <div>
                    <button onClick={this.addPreserve}>
                        Add
                    </button>
                </div>
            </div>
        );
    }
}

export default DefinePreserve;