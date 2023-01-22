import React, { useEffect } from "react";
import DefinePreserve from "./DefinePreserve";
import Preserve from "./Preserve";
import PreserveModel from "../../models/PreserveModel";
import Weather from "../Weather/Weather";
import FutureWeather from "../FutureWeather/FutureWeather";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getPreservesAsync } from "./preserveSlice";

const Preserves = () => {
    const dispatch = useDispatch();
    const preserves = useSelector((state) => state.preserves);
    /*componentDidMount() {
        this.fetchPreserves();
    }

    fetchPreserves() {
        axios.get('http://localhost:3000/api/preserves')
        .then(res => {
            const preserveList = res.data.map((preserve, key) => {
                return new PreserveModel(preserve.name, preserve.description, new Date(preserve.productionDate), new Date(preserve.expirationDate));
            });
            this.setState({preserveList});
        })
    }*/

    /*addPreserve = (preserve) => {
        this.setState(state => {
            var list = state.preserveList;
            let newPreserve = new PreserveModel(preserve.name, preserve.description, new Date(preserve.productionDate), new Date(preserve.expiratinDate));
            /*list.push({
                name: preserve.name,
                description: preserve.description,
                productionDate: new Date(preserve.productionDate),
                expirationDate: new Date(preserve.expiratinDate)
            });*//*
            list.push(newPreserve);
            return {preserveList: list};
        })
    }*/

    useEffect(() => {
        dispatch(getPreservesAsync());
    }, [dispatch]);
    
    return(
        <div>
            <DefinePreserve/>
            <h2>List of Preserves</h2>
            {preserves.map((preserve, key) => {
                return <Preserve
                        key = {key}
                        name = {preserve.name}
                        description = {preserve.description}
                        productionDate = {new Date(preserve.dateOfProduction)}
                        expirationDate = {new Date(preserve.expirationDate)}/>   
            })}
            {/*<DefinePreserve addPreserve={this.addPreserve}/>*/}
            <Weather/>
            <FutureWeather/>
        </div>
    );
}

export default Preserves;