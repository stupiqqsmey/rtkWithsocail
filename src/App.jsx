
import './App.css'

import FacebookLogo from './assets/facebook.png'
import GithubLogo from './assets/github.png'
import GoogleLogo from './assets/google.png'
// import { useLoginWithFacebook } from './components/auth/FacebookAuthComponent';
import { useLoginWithGithub } from './components/auth/GithubAuthComponent';
import { useLoginWithGoogle } from './components/auth/GoogleAuthComponent';

function App() {
    const { login: githubLogin, logout: githubLogout, isPending: githubPending, user: githubUser } = useLoginWithGithub();
    // const { facebookLogin, logout: facebookLogout, isPending: facebookPending, user: facebookUser } = useLoginWithFacebook();
    const { googleLogin, logout: googleLogout, isPending: googlePending, user: googleUser } = useLoginWithGoogle();
    // Use whichever user is logged in (since they all use the same Firebase auth)
    const currentUser = githubUser || googleUser;
    const isPending = githubPending || googlePending;
    // Determine which provider is being used
    const getProvider = () => {
        if (!currentUser || !currentUser.providerData || currentUser.providerData.length === 0) {
            return 'Unknown';
        }
        const providerId = currentUser.providerData[0].providerId;
        if (providerId.includes('google')) return 'Google';
        if (providerId.includes('github')) return 'GitHub';
        if (providerId.includes('facebook')) return 'Facebook';
        if (providerId.includes('password')) return 'Email/Password';
        return 'Unknown';
    };

    // Use the logout function from whichever service the user is logged in with
    const handleLogout = () => {
        if (githubUser) {
            githubLogout();
        } else if (googleUser) {
            googleLogout();
        }
    };
    const userProfile = currentUser?.photoURL;
    console.log("the currentUser=====?:", userProfile);



    return (
        <div className='max-w-screen-xl container mx-auto mt-30 border-1 border-gray-200 p-15 w-150 rounded-2xl shadow-2xl shadow-gray-300'>
            <h1 className='text-7xl text-center font-medium mb-15'>Login Account</h1>

            {currentUser ? (
                    // User is logged in
                    <section className='text-center flex flex-col'>
                        <h2 className='order-2 mb-5 text-3xl'>Welcome, <span className='font-bold text-4xl'>{currentUser.displayName || currentUser.email}!</span></h2>
                        <p className='order-3 mb-5 text-xl'>You are logged in with {getProvider()}</p>
                        <div style={{ margin: '10px 0' }}>
                            {console.log("The profile user: ", currentUser?.photoURL)}

                            <img
                                src={`${userProfile}`}
                                alt="Profile"
                                className='w-50 mx-auto rounded-full border-1 border-gray-300 shadow-2xl shadow-gray-200 mb-5 order-1'
                                onError={(e) => {
                                    console.log('Image failed to load:', currentUser?.photoURL);
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            {/* {currentUser?.phtoURL? (
              <img
                src={currentUser?.photoURL}
                alt="Profile"
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  border: '2px solid #ccc'
                }}
                onError={(e) => {
                  console.log('Image failed to load:', currentUser?.photoURL);
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null} */}
                            <div
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    display: currentUser.photoURL ? 'none' : 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '20px',
                                    fontWeight: 'bold'
                                }}
                            >
                                {(currentUser.displayName || currentUser.email || 'U').charAt(0).toUpperCase()}
                            </div>
                        </div>
                        <button className="btn order-4 py-3 w-30 rounded-xl mx-auto bg-red-600 text-white text-xl cursor-pointer transition duration-500 hover:scale-105" onClick={handleLogout}>
                            {isPending ? "Signing out..." : "Sign Out"}
                        </button>
                    </section>
                )
                : (
                    // User is not logged in
                    <section className='text-center flex flex-col justify-center'>
                        <div className="App">
                            <button className="btn" onClick={googleLogin}>
                                {googlePending ? "Loading..." : (
                                    <span className='flex gap-3 items-center cursor-pointer mb-10 text-2xl transition duration-500 py-2 px-5 rounded-2xl hover:shadow-[inset_-225px_0_0_0_#000000] hover:text-white '>
                  <img src={GoogleLogo} alt="" width={50} height={50} />
                 Login With Google
                 </span>
                                )
                                }
                            </button>
                        </div>
                        <div className="App">
                            <button className="btn" onClick={githubLogin}>
                                {githubPending ? "Loading..." :
                                    (
                                        <span className='flex gap-3 items-center cursor-pointer text-2xl transition duration-500 py-2 px-5 rounded-2xl hover:shadow-[inset_-220px_0_0_0_#000000] hover:text-white '>
                  <img src={GithubLogo} alt="" width={50} height={50}/>
                 Login With GitHub

                 </span>
                                    )
                                }
                            </button>
                        </div>

                    </section>
                )}
        </div>
    )
}

export default App