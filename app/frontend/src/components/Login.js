import React from "react";
import { showModal } from "../utils";

const Login = ({ setScreen, setToken }) => {
	const [state, setState] = React.useState({
		email: "",
		password: "",
	});

	React.useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
		  setState({ screen: "home" });
		}
	  }, []);

	const validate = () => {
		if (state.email.length === 0) {
			showModal("Please enter email");
			return false;
		} else if (
			!state.email.match(
				/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
			)
		) {
			showModal("Please enter a valid email");
            return false;
		}
        else if (state.password.length < 8) {
            showModal("Password must be at least 8 characters");
            return false;
        }
        else if (state.password.length === 0) {
			showModal("Please enter password");
			return false;
		}
		return true;
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (validate()) {
			try {
				const response = await fetch(
					process.env.REACT_APP_API_URL + "/users/login",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Accept: "application/json",
						},
						body: JSON.stringify(state),
					}
				);
				const data = await response.json();
				console.log(data);
				if (data.err) {
					showModal("Error", data.err.details, "error");
				} else {
					console.log(data.response);
					// store token locally
					localStorage.setItem("token", data.response.token);
                    // setS(data.response.token, 'home');
                    setScreen("home");
				}
			} catch (err) {
				showModal("Error", err.message, "error");
			}
			// setScreen("home");
		}
	};

	return (
		<div className="login">
			<div className="__container">
				<div className="title">Login</div>
				<div className="body">
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							className="form-control"
							id="email"
							placeholder="Enter email"
							value={state.email}
							onChange={(e) => setState({ ...state, email: e.target.value })}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							className="form-control"
							id="password"
							placeholder="Password"
							value={state.password}
							onChange={(e) => setState({ ...state, password: e.target.value })}
						/>
					</div>
					<button type="submit" className="btn btn-custom" onClick={onSubmit}>
						Login
					</button>
					<div className="text-center">
						<div
							className="btn btn-link"
							onClick={() => {
								setScreen("register");
							}}
						>
							Register instead
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
