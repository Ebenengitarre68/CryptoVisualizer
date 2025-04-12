import Footer from "@/components/Footer.tsx";

function home({isDark}:{isDark?:boolean}) {
    return (
        <div data-theme={isDark ? "dark" : "light"} className="background">
            <div className="div">

                <title>CryptoVis</title>

                <h1>CryptoVis</h1>
                <h2>DISCLAIMER</h2>
                <p>
                    While this tool should be accurate it is not meant to encrypt important data!<br/>
                    This page does not yet support phones, the website will not look good!<br/>
                    This website is still in development and might change a lot.
                </p>
                <h2>What is CryptoVis</h2>
                <p>
                    CryptoVis is an intuitive and interactive visualization tool, designed to help users understand
                    complex cryptographic algorithms and data encryption processes.
                    Whether you're a beginner learning the basics about cyphers, or an expert analyzing AES encryption,
                    CryptoVis provides real-time graphical representations of encryption, decryption, hashing, and key
                    exchanges.
                    It simplifies cryptography concepts, making them more accessible to
                    students, researchers, and security professionals alike.
                </p>


            </div>
            <Footer isDark={isDark} />
        </div>
    )


}

export default home
