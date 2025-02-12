import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../authContext";
import GitHubLogo from "../../../public/GitHubLogo";


const SignUp = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [usernameError, setUsernameError] = useState("");
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const { currentUser, setCurrentUser } = useAuth();


	const validateEmail = (value) => {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		const isValidEmail = emailRegex.test(value);

		if (!isValidEmail) {
			setEmailError("Invalid email address!");
		} else {
			setEmailError("");
		}
	};


	const validatePassword = (value) => {
		const length = value.length >= 8;
		const hasDigit = /\d/.test(value);
		const hasLowerCase = /[a-z]/.test(value);

		if (!length) {
			setPasswordError("Password must be at least 8 characters!");
		} else if (!hasDigit) {
			setPasswordError("Password must include at least one number!");
		} else if (!hasLowerCase) {
			setPasswordError("Password must include at least one lowercase letter!");
		} else {
			setPasswordError("");
		}
	};


	const validateUsername = (value) => {
		const usernameRegex = /^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/;
		const isValidUsername = usernameRegex.test(value);

		if (!isValidUsername) {
			setUsernameError("Invalid username!");
		} else {
			setUsernameError("");
		}
	};



	const handleSignUp = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			const response = await axios.post("http://localhost:3000/signup", {
				username: username,
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
			console.error("Failed to Sign up : ", err);
			alert("Failed to Sign Up!");
		}
	};



	return (
		<div className="flex items-start justify-center min-h-screen bg-[#0d1117]">
			<div className="w-full max-w-md p-8 space-y-5">

				<div className="flex justify-center">
					<GitHubLogo dimension={45} fill={"white"}/>
				</div>

				<h2 className="text-center text-2xl font-light text-white mb-4">
					Sign up to mini GitHub
				</h2>

				<form className="mx-auto mt-8 space-y-4 bg-[#151b23] p-5 rounded-md border-[1px] border-gray-700">
					<div>
						<label className="block text-sm text-gray-200">
							Email address *
						</label>
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
							Password *
						</label>
						<input
							type="password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
								validatePassword(e.target.value);
							}}
							className="w-full h-8 p-3 mt-2 text-white text-sm bg-[#0d1117] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							required
						/>

						{passwordError && (
							<p className="text-xs text-red-500 mt-1">{passwordError}</p>
						)}

						<p className="text-xs text-gray-400 mt-1">
							Password should be at least 8 characters including a number and a
							lowercase letter.
						</p>
					</div>

					<div>
						<label className="flex justify-between text-sm text-gray-200">
							Username *
						</label>
						<input
							type="text"
							value={username}
							onChange={(e) => {
								setUsername(e.target.value);
								validateUsername(e.target.value);
							}}
							className="w-full h-8 p-3 mt-2 text-white text-sm bg-[#0d1117] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							required
						/>

						{usernameError && (
							<p className="text-xs text-red-500 mt-1">{usernameError}</p>
						)}

						<p className="text-xs text-gray-400 mt-1">
							Username may only contain alphanumeric characters or single
							hyphens, and cannot begin or end with a hyphen.
						</p>
					</div>

					<div>
						<button
							type="submit"
							onClick={handleSignUp}
							disabled={
								!email ||
								!username ||
								!password ||
								loading ||
								passwordError ||
								usernameError ||
								emailError
							}
							className="w-full h-8 text-sm font-medium disabled:bg-[#45386b] disabled:text-[#bebebe] text-white bg-[#583e9e] rounded-md hover:bg-[#49308c]"
						>
							{loading ? "Signing up..." : "Sign up"}
						</button>
					</div>
				</form>

				<div className="mx-auto flex items-center justify-center rounded-md border-[1px] border-gray-700 h-16">
					<div className="text-center text-sm text-gray-400">
						Already have an account?{" "}
						<Link to="/login" className="text-blue-500 hover:underline">
							Sign in
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;