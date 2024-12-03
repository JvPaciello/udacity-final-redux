import React from "react";
import Login from "../components/Login/Login";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Provider } from "react-redux";
import store from "../store/store";

test ('the component renders correctly', ()=>{
    const {asFragment} = render (<Provider store={store}><Login/></Provider>);


    expect(asFragment()).toMatchSnapshot();
});