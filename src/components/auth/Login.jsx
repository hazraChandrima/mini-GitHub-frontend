import React, { useState } from "react";
import GitHubLogo from "../../../public/GitHubLogo";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../authContext";
import { IoIosClose } from "react-icons/io";


const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [loading, setLoading] = useState(false);
	const [invalidCredentials, setInvalidCredentials] = useState(false);

	const navigate = useNavigate();
	const { currentUser, setCurrentUser } = useAuth();

	const closeIconStyle = { 
		color: "#f85149", 
		fontSize: "1.5em",
		cursor: "pointer",
	};


	const validateEmail = (value) => {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		const isValidEmail = emailRegex.test(value);

		if (!isValidEmail) {
			setEmailError("Invalid email address!");
		} else {
			setEmailError("");
		}
	};
 

	const handleCloseAlert = () => {
		setInvalidCredentials(false);
	}


	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await axios.post("http://localhost:3000/login", {
				email: email,
				password: password,
			});

			localStorage.setItem("token", response.data.token);
			localStorage.setItem("userID", response.data.userID);
			setCurrentUser(response.data.userID);

			setLoading(false);
			navigate("/");

		} catch (err) {
			setLoading(false);
			setInvalidCredentials(true);
			console.error("Failed to Login : ", err);
		}
	}



	return (
		<div className="flex items-start justify-center min-h-screen bg-[#0d1117]">
			<div className="w-full mt-4 p-6 space-y-6">

				<div className="flex justify-center mb-6">
					<GitHubLogo dimension={45} fill={"white"}/>
				</div>

				<h2 className="text-center text-2xl font-light text-white mb-6">
					Sign in to mini GitHub
				</h2>

				{ invalidCredentials && (
					<div className="mx-auto flex items-center justify-center rounded-md border-[1px] border-[#792e2e] w-72 h-14 bg-[#25171c] space-x-6">
						<div className="text-center text-sm text-gray-200">
							Incorrect username or password.
						</div>
						<IoIosClose
							style={closeIconStyle}
							onClick={handleCloseAlert}
						/>
					</div>
				)}

				<form className="mx-auto w-72 mt-8 space-y-4 bg-[#151b23] p-5 rounded-md border-[1px] border-gray-700">

					<div>
						<label className="block text-sm text-gray-200">Email address</label>
						<input
							type="text"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
								validateEmail(e.target.value);
							}}
							className="w-full h-8 p-3 mt-2 text-white text-sm bg-[#0d1117] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							required
						/>
						{emailError && (
							<p className="text-xs text-red-500 mt-1">{emailError}</p>
						)}
					</div>

					<div>
						<label className="flex justify-between text-sm text-gray-200">
							Password
							<a href="#" className="text-blue-500 text-xs hover:underline">
								Forgot password?
							</a>
						</label>
						<input
							type="password"
							value={password}
							onChange={(e) => { setPassword(e.target.value) }}
							className="w-full h-8 p-3 mt-2 text-white text-sm bg-[#0d1117] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							required
						/>
					</div>

					<div>
						<button
							type="submit"
							onClick={handleLogin}
							disabled={loading || !email || !password || emailError}
							className="w-full h-8 text-sm font-medium text-white bg-[#583e9e] rounded-md hover:bg-[#49308c] disabled:bg-[#45386b] disabled:text-[#bebebe]">
							{loading ? "Signing in..." : "Sign in"}
						</button>
					</div>

				</form>

				<div className="mx-auto flex items-center justify-center rounded-md border-[1px] border-gray-700 w-72 h-16">
					<div className="text-center text-sm text-gray-400">
						New to GitHub?{" "}
						<Link to="/signup" className="text-blue-500 hover:underline">
							Create an account
						</Link>
					</div>
				</div>

				<footer className="text-xs text-gray-400">
					<div className="flex flex-wrap px-8 justify-center items-center space-x-4 space-y-2">

						<a href="#" className="hover:underline mt-2">
							Terms
						</a>
						<a href="#" className="hover:underline">
							Privacy
						</a>
						<a href="#" className="hover:underline">
							Docs
						</a>
						<a href="#" className="hover:underline">
							Contact GitHub Support
						</a>
						<a href="#" className="hover:underline">
							Manage cookies
						</a>
						<a href="#" className="hover:underline">
							Do not share my personal information
						</a>

					</div>
				</footer>

			</div>
		</div>
	);
};

export default Login;