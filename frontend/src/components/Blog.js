import React from "react";
import { getAuthUser } from "../utils";

const Blog = ({ blog, setScreen }) => {
	const [state, setState] = React.useState({
		loading: true,
		comments: [],
		likes: [],
		user: null,
		me: null,
		likedByMe: null,
	});

	React.useEffect(() => {
		const fetchData = async () => {
			let response = await fetch(
				process.env.REACT_APP_API_URL +
					"/comments/getCommentByBlogId/" +
					blog.id,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const comments = await response.json();

			response = await fetch(
				process.env.REACT_APP_API_URL + "/likes/getLikesByBlogId/" + blog.id,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const likes = await response.json();

			response = await fetch(
				process.env.REACT_APP_API_URL + "/users/" + blog.userId,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const user = await response.json();

			const me = await getAuthUser();

			let likedByMe = false;
			likes.forEach((like) => {
				if (like.userId === me.id) {
					likedByMe = true;
				}
			});

			setState({
				loading: false,
				comments: comments,
				likes: likes,
				user: user,
				me: me,
				likedByMe: likedByMe,
			});
		};
		fetchData();
	}, []);

	console.log(state);

	const likeBlog = async () => {
		const response = await fetch(
			process.env.REACT_APP_API_URL + "/likes/create",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
				body: JSON.stringify({
					blogId: blog.id,
				}),
			}
		);
		const data = await response.json();

		let likedByMe = false;
		state.likes.forEach((like) => {
			if (like.userId === state.me.id) {
				likedByMe = true;
			}
		});

		console.log("AFTER TOGGLING", state.likes);

		if (likedByMe)
			setState({
				...state,
				likes: state.likes.filter((like) => like.userId !== state.me.id),
				likedByMe: false,
			});
		else
			setState({
				...state,
				likes: [...state.likes, data],
				likedByMe: true,
			});
	};

	if (state.loading)
		return (
			<div className="spinner-border" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		);

	return (
		<div>
			<div className="each-blog">
				<div className="blog" key={blog.id}>
					<div className="head">{blog.title}</div>
					<div className="content">{blog.content}</div>
				</div>
				{/* <a href={blog.url}>{blog.url}</a> */}
				<p>
					<button
						className={
							!state.likedByMe ? "btn btn-outline-primary" : "btn btn-primary"
						}
						onClick={likeBlog}
					>
						{state.likedByMe ? (
							<i className="bi bi-hand-thumbs-up-fill"></i>
						) : (
							<i className="bi bi-hand-thumbs-up"></i>
						)}
					</button>{" "}
					{state.likes.length} likes
				</p>
				<p>added by {state.user.name}</p>
			</div>
			<div className="comments">
				<h3>Comments</h3>
				{state.comments.map((comment) => (
					<div className="comment" key={comment.id}>
						<div className="content">{comment.content}</div>
                        {/* created at */}
                        <div className="footer">
                            <p>
                                <span className="date">{comment.createdAt}</span>
                            </p>
                        </div>
					</div>
				))}
                <div className="create-comment">
						<button
							className="btn btn-custom"
							onClick={() => {
								setScreen("create-comment");
							}}
						>
							Create Comment
						</button>
					</div>
			</div>
		</div>
	);
};

export default Blog;
