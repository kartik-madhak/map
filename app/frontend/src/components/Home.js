import React, { useEffect } from "react";

const Home = ({ showBlog, setScreen }) => {
	const [state, setState] = React.useState({
		blogs: [],
		loading: true,
	});

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(process.env.REACT_APP_API_URL + "/blogs", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await response.json();
			setState({
				blogs: data,
				loading: false,
			});
		};
		fetchData();
	}, []);

	return (
		<div className="home">
			<div className="logout position-absolute m-2 ms-auto">
				<button
					className="btn btn-custom"
					onClick={() => {
						localStorage.removeItem("token");
						setScreen("login");
					}}
				>
					Logout
				</button>
			</div>
			<div className="title">Home</div>
			{state.loading ? (
				<div className="spinner-border" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			) : (
				<div className="body">
					{state.blogs.map((blog) => (
						<div
							className="blog"
							key={blog.id}
							onClick={() => {
								showBlog(blog);
							}}
						>
							<div className="head">{blog.title}</div>
							{/* truncate content */}
							<div className="content">
								{blog.content.length > 100
									? blog.content.substring(0, 100) + "..."
									: blog.content}
							</div>
						</div>
					))}
					<div className="create-blog">
						<button
							className="btn btn-custom"
							onClick={() => {
								setScreen("create");
							}}
						>
							Create Blog
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Home;
