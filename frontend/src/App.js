import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Blog from "./components/Blog";
import CreateBlog from "./components/CreateBlog";
import CreateComment from "./components/CreateComment";

const App = () => {
	const [state, setState] = useState({
		screen: "login",
    blog: null,
	});

	console.log(state);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setState({ screen: "home" });
    }
  }, []);

	const setScreen = (screen) => {
		setState({
			...state,
			screen: screen,
		});
	};

  const showBlog = (blog) => {
    setState({
      ...state,
      screen: "blog",
      blog: blog,
    });
  }

	return (
		<div className="container">
			{state.screen === "login" && (
				<Login setScreen={setScreen} />
			)}
			{state.screen === "register" && (
				<Register setScreen={setScreen} />
			)}
			{state.screen === "home" && <Home setScreen={setScreen} showBlog={showBlog}/>}
      {state.screen === "blog" && <Blog blog={state.blog} setScreen={setScreen}/>}
      {state.screen === "create" && <CreateBlog setScreen={setScreen}/>}
      {state.screen === "create-comment" && <CreateComment blog={state.blog} setScreen={setScreen}/>}
		</div>
	);
};

export default App;
