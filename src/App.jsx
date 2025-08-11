import React, { useState } from 'react';
import './App.css';

import GithubLogo from './assets/github.png';
import GoogleLogo from './assets/google.png';
import { useLoginWithGithub } from './components/auth/GithubAuthComponent';
import { useLoginWithGoogle } from './components/auth/GoogleAuthComponent';

function App() {
    const { login: githubLogin, logout: githubLogout, isPending: githubPending, user: githubUser } = useLoginWithGithub();
    const { googleLogin, logout: googleLogout, isPending: googlePending, user: googleUser } = useLoginWithGoogle();

    const currentUser = githubUser || googleUser;
    const isLoading = githubPending || googlePending;

    const [imgError, setImgError] = useState(false);

    const handleLogout = () => {
        if (githubUser) githubLogout();
        else if (googleUser) googleLogout();
    };

    // Get first letter fallback if no image
    const userInitial = (currentUser?.displayName || currentUser?.email || 'U').charAt(0).toUpperCase();

    const getProviderName = () => {
        if (!currentUser?.providerData?.length) return 'Unknown';
        const id = currentUser.providerData[0].providerId;
        if (id.includes('google')) return 'Google';
        if (id.includes('github')) return 'GitHub';
        return 'Unknown';
    };

    return (
        <div className="max-w-xl mx-auto mt-16 p-6 border rounded-lg shadow-md text-center">
            <h1 className="text-4xl mb-8 font-semibold">Login Account</h1>

            {currentUser ? (
                <>
                    <p className="text-xl mb-2">
                        Welcome, <strong>{currentUser.displayName || currentUser.email}</strong>!
                    </p>
                    <p className="mb-6">Logged in with {getProviderName()}</p>

                    {!imgError && currentUser.photoURL ? (
                        <img
                            src={currentUser.photoURL}
                            alt="Profile"
                            className="mx-auto rounded-full w-24 h-24 mb-6 object-cover border"
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <div
                            className="mx-auto mb-6 rounded-full w-24 h-24 flex items-center justify-center text-white text-4xl font-bold bg-blue-600"
                        >
                            {userInitial}
                        </div>
                    )}

                    <button
                        className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                        onClick={handleLogout}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing out...' : 'Sign Out'}
                    </button>
                </>
            ) : (
                <>
                    <button
                        onClick={googleLogin}
                        disabled={googlePending}
                        className="flex items-center justify-center gap-3 mb-4 w-full py-3 border rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
                    >
                        <img src={GoogleLogo} alt="Google" className="w-8 h-8" />
                        {googlePending ? 'Loading...' : 'Login with Google'}
                    </button>

                    <button
                        onClick={githubLogin}
                        disabled={githubPending}
                        className="flex items-center justify-center gap-3 w-full py-3 border rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
                    >
                        <img src={GithubLogo} alt="GitHub" className="w-8 h-8" />
                        {githubPending ? 'Loading...' : 'Login with GitHub'}
                    </button>
                </>
            )}
        </div>
    );
}

export default App;
