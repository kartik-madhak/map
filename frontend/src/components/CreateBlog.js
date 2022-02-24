import React from "react";
import { showModal } from "../utils";

const CreateBlog = ({ setScreen }) => {
	const [state, setState] = React.useState({
		title: "",
		content: "",
	});

	React.useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			setScreen("login");
		}
	}, []);

	const validate = () => {
		if (state.title.length < 5) {
			showModal("Title must be at least 5 characters long.");
			return false;
		}
		if (state.content.length < 10) {
			showModal("Content must be at least 10 characters long.");
			return false;
		}
		return true;
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (validate()) {
			try {
				const response = await fetch(
					process.env.REACT_APP_API_URL + "/blogs/create",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Accept: "application/json",
							Authorization: "Bearer " + localStorage.getItem("token"),
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
				<div className="title">Create Blog</div>
				<div className="body">
					<div className="form-group">
						<label htmlFor="title">Title</label>
						<input
							type="text"
							className="form-control"
							id="title"
							placeholder="Enter title"
							value={state.title}
							onChange={(e) => setState({ ...state, title: e.target.value })}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="url">Content</label>
						<textarea
							className="form-control"
							id="content"
							rows="3"
							placeholder="Enter content"
							value={state.content}
							onChange={(e) => setState({ ...state, content: e.target.value })}
						/>
					</div>
					<button type="submit" className="btn btn-primary" onClick={onSubmit}>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};

export default CreateBlog;
