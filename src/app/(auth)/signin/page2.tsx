'use client'
import Image, { getImageProps } from 'next/image'

function getBackgroundImage(srcSet = '') {
    const imageSet = srcSet
      .split(', ')
      .map((str) => {
        const [url, dpi] = str.split(' ')
        return `url("${url}") ${dpi}`
      })
      .join(', ')
    return `image-set(${imageSet})`
}

// const imageLoader = ({ src, width, quality }) => {
//     return `https://example.com/${src}?w=${width}&q=${quality || 75}`
// }
export default function Login()  {
    const {
        props: { srcSet },
      } = getImageProps({ alt: '', width: 900, height: 1273, src: '/img/curved-images/curved6.jpg' })
      const backgroundImage = getBackgroundImage(srcSet)
      const style = { backgroundImage }

    return (
        <main className="flex mt-0 transition-all duration-200 ease-soft-in-out">
            <section className="flex-col justify-between hidden w-2/5 h-screen bg-white lg:flex">
                <div></div>
                <Image
                    src="/img/logo_terranova.svg"
                    width={445}
                    height={95}
                    alt="Logo"
                    className="object-cover place-self-center"
                />
                <Image
                    src="/img/logo-en_facil.svg"
                    width={73}
                    height={52}
                    alt="watermark"
                    className="object-cover ml-9 mb-7"
                />
            </section>
            <section className="flex flex-col items-center justify-center w-full lg:w-3/5 bg-netral">
                <h1 className="mb-4 text-2xl font-semibold">Login</h1>
                <form action="#" method="POST">
                    {/* Username Input */}
                    <input type="checkbox" id="remember" name="remember" className="text-blue-500" />
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-600">Username</label>
                        <input type="text" id="username" name="username" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" autoComplete="off" />
                    </div>
                    {/* Password Input  */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600">Password</label>
                        <input type="password" id="password" name="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" autoComplete="off" />
                    </div>
                    {/* Remember Me Checkbox */}
                    <div className="flex items-center mb-4">

                        <label htmlFor="remember" className="ml-2 text-gray-600">Remember Me</label>
                    </div>
                    {/* Forgot Password Link */}
                    <div className="mb-6 text-blue-500">
                        <a href="#" className="hover:underline">Forgot Password?</a>
                    </div>
                    {/* Login Button */}
                    <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600">Login</button>
                </form>
            </section>
            {/* <section>
                <div className="relative flex items-center p-0 overflow-hidden bg-center bg-cover min-h-75-screen">
                    <div className="container z-10">
                        <div className="flex flex-wrap mt-0 -mx-3">
                            <div className="flex flex-col w-full max-w-full px-3 mx-auto md:flex-0 shrink-0 md:w-6/12 lg:w-5/12 xl:w-4/12">
                                <div className="relative flex flex-col min-w-0 mt-32 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
                                    <div className="p-6 pb-0 mb-0 bg-transparent border-b-0 rounded-t-2xl">
                                        <h3 className="relative z-10 font-bold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text">Welcome back</h3>
                                        <p className="mb-0">Enter your email and password to sign in</p>
                                    </div>
                                    <div className="flex-auto p-6">
                                        <form role="form">
                                            <label className="mb-2 ml-1 text-xs font-bold text-slate-700">Email</label>
                                            <div className="mb-4">
                                                <input type="email" className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow" placeholder="Email" aria-label="Email" aria-describedby="email-addon" />
                                            </div>
                                            <label className="mb-2 ml-1 text-xs font-bold text-slate-700">Password</label>
                                            <div className="mb-4">
                                                <input type="email" className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow" placeholder="Password" aria-label="Password" aria-describedby="password-addon" />
                                            </div>
                                            <div className="min-h-6 mb-0.5 block pl-12">
                                                <input id="rememberMe" className="mt-0.54 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 h-5 relative float-left -ml-12 w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right" type="checkbox" />
                                                <label className="mb-2 ml-1 text-sm font-normal cursor-pointer select-none text-slate-700" htmlFor="rememberMe">Remember me</label>
                                            </div>
                                            <div className="text-center">
                                                <button type="button" className="inline-block w-full px-6 py-3 mt-6 mb-0 text-xs font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85">Sign in</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="p-6 px-1 pt-0 text-center bg-transparent border-t-0 border-t-solid rounded-b-2xl lg:px-2">
                                        <p className="mx-auto mb-6 text-sm leading-normal">
                                            Don&apos;t have an account?
                                            <a href="../pages/sign-up.html" className="relative z-10 font-semibold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text">Sign up</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full max-w-full px-3 lg:flex-0 shrink-0 md:w-6/12">
                                <div className="absolute top-0 hidden w-3/5 h-full -mr-32 overflow-hidden -skew-x-10 -right-40 rounded-bl-xl md:block">
                                    <div className="absolute inset-x-0 top-0 z-0 h-full -ml-16 bg-cover skew-x-10" style={style}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
        </main>
    );
}
