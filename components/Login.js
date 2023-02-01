import React, { useEffect, useState } from "react";
import cookieCutter from 'cookie-cutter'

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [hasErrors, setHasErrors] = useState(false);

  const [flagResponse, setFlagResponse] = useState({});

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("authToken"));
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onInputChange = (event) => {
    setHasErrors(false);
    setUser((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onLogin = async () => {
    setHasErrors(false);
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const apiResponse = await response.json();

    if (apiResponse.message || !apiResponse.token || !apiResponse.success) {
      setHasErrors(true);
    } else {
      console.log(apiResponse, apiResponse.token);
      cookieCutter.set('authToken', apiResponse.token)
      localStorage.setItem("authToken", apiResponse.token);
      setIsLoggedIn(true);
    }
  };

  const onFetchFlag = async () => {
    setFlagResponse({});
    const response = await fetch("/api/flag", {
      method: "GET",
      headers: new Headers({
        "CTF-JWTToken": cookieCutter.get('authToken'),
        "Content-Type": "application/json",
        secret: 'mysecrettoken',
      }),
    });
    setFlagResponse(await response.json());
  };

  return (
    <>
      {!isLoggedIn ? (
        <>
          <section className="h-screen">
            <div className="px-6 h-full">
              <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                  <h1 className="text-5xl text-center mb-4"><a className=" text-sky-600 " href="https://jwt.io/">JWT</a> LAB-mysecrettoken</h1>
                  <form>
                    <div className="mb-6">
                      <input
                        type="text"
                        name="username"
                        onChange={onInputChange}
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleFormControlInput2"
                        placeholder="admin"
                      />
                    </div>

                    <div className="mb-6">
                      <input
                        onChange={onInputChange}
                        name="password"
                        type="password"
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleFormControlInput2"
                        placeholder="secret123"
                      />
                    </div>

                    {!!hasErrors && (
                      <>
                        <p className="mb-2 text-red-500">
                          Wrong Username or Password
                        </p>
                      </>
                    )}
                    <div className="flex justify-between items-center mb-6">
                      <div className="form-group form-check">
                        <input
                          onChange={onInputChange}
                          type="checkbox"
                          className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                          id="exampleCheck2"
                        />
                        <label className="form-check-label inline-block text-white">
                          Remember me
                        </label>
                      </div>
                      <a href="#!" className="text-white">
                        Forgot password?
                      </a>
                    </div>

                    <div className="text-center lg:text-left">
                      <button
                        type="button"
                        onClick={onLogin}
                        className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="flex flex-col items-center justify-center h-screen">
            {flagResponse && (
              <p className="text-white">{flagResponse.message}</p>
            )}
            <button
              type="button"
              onClick={onFetchFlag}
              className="inline-block px-7 py-3 bg-red-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Fetch Flag
            </button>
          </section>
        </>
      )}
    </>
  );
};

export default Login;
