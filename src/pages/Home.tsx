
function home({isDark}) {
    return (
        <div data-theme={isDark ? "dark" : "light"} className="background">
            <div className="div">

                <title>CryptoVis</title>

                <h1>CryptoVis</h1>
                <h2>What is CryptoVis</h2>
                <p>
                    CryptoVis is an intuitive and interactive visualization tool, designed to help users understand complex cryptographic algorithms and data encryption processes.
                    Whether you're a beginner learning about XOR ciphers or an expert analyzing AES encryption,
                    CryptoVis provides real-time graphical representations of encryption, decryption, hashing, and key exchanges.
                    With a user-friendly interface, it simplifies cryptography concepts, making them accessible to students, researchers, and security professionals alike.
                </p>


            </div>
        </div>
    )


}

export default home
