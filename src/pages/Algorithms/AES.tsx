import Flow from "@/components/Flow.tsx";
import Footer from "@/components/Footer.tsx";

function aes({isDark}) {
    return (
        <div data-theme={isDark ? "dark" : "light"} className="background">
            <div className="div">
                <title>CryptoVisAES</title>

                <h1>AES</h1>
                <p>
                    The Advanced Encryption Standard AES, originally known as Rijndael is one of the most commonly used block-cyphers. <br/>
                    It is based on a substitution-permutation network design.
                </p>


                <div style={{width: 900+"px" , height: 900+"px", marginTop:"10px"}} >
                    <Flow colorMode={isDark} flow={"graphs/AES128R1.json"} />
                </div>


            </div>
            <Footer isDark={isDark} />

        </div>
    )


}

export default aes