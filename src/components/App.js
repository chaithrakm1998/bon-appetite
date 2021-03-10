import React, { useReducer, useEffect } from "react";
import "../App.css";
import Header from "./Header";
import Foods from "./food";
import Search from "./Search";

const FOOD_API_URL="https://api.edamam.com/search?q=4e9f05eb9b904d703fa0d46a88ce1ac63f29f498"

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

const reducer =(state,action) =>{
  switch(action.type){
    case "SEARCH_food_REQUEST":
      return {
        ...state,
        loading:true,
        errorMessage:null
      };
    case "SEARCH_food_SUCCESS":
      return {
        ...state,
        loading:false,
        food: action.payload
      };
    case "SEARCH_FOOD_FAILURE":
      return {
        ...state,
        loading:false,
        errorMessage:action.error
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
    
        fetch(FOOD_API_URL)
            .then(response => response.json())
            .then(jsonResponse => {
        
            dispatch({
                type: "SEARCH_FOODS_SUCCESS",
                payload: jsonResponse.Search
        	});
      	});
  	}, []);

    const search = searchValue => {
    	dispatch({
      	type: "SEARCH_FOODS_REQUEST"
    	});
      const APP_ID = "4e9f05eb";
  const APP_KEY = "9b904d703fa0d46a88ce1ac63f29f498";
	
      fetch("https://api.edamam.com/search?q=&app_id=${APP_ID}&app_key=${APP_KEY}")
      	.then(response => response.json())
      	.then(jsonResponse => {
        	if (jsonResponse.Response === "True") {
          	dispatch({
                type: "SEARCH_FOODS_SUCCESS",
                payload: jsonResponse.Search
          	});
        	} else {
          	dispatch({
                type: "SEARCH_FOODS_FAILURE",
                error: jsonResponse.Error
          	});
          }
      	});
	  };
    

    const { food, errorMessage, loading } = state;
    

  

    

    return (
    <div className="App">
      <Header text="Bon_Appetite" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite foods</p>
      <div className="food">
        {loading && !errorMessage ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          food.map((food, index) => (
            <Foods key={`${index}-${food.title}`} food={food} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
