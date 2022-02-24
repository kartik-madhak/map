import React from "react";
import { showModal } from "../utils";

const CreateComment = ({ setScreen, blog }) => {
	const [state, setState] = React.useState({
		content: "",
		blogId: blog.id,
	});

	React.useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			setScreen("login");
		}
	}, []);

	const validate = () => {
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
					process.env.REACT_APP_API_URL + "/comments/create",
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
					setScreen("blog");
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
				<div className="title">Create Comment</div>
				<div className="body">
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

export default CreateComment;
