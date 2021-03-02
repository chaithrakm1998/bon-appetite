import React, { useReducer, useEffect } from "react";
import "../App.css";
import Header from "./Header";
import Foods from "./food";
import Search from "./Search";

const FOOD_API_URL="https://www.omdbapi.com/?s=man&apikey=4a3b711b";

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
	
      fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
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
            <Foods key={`${index}-${food.Title}`} food={food} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
