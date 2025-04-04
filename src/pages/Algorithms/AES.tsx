import Flow from "@/components/Flow.tsx";
import Footer from "@/components/Footer.tsx";
import {Link} from "react-router-dom";

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

                <p>
                    AES Treats data as a matrix in Column Major order, meaning the data gets interpreted as a matrix
                </p>
                <div className="example">
                    <h3>Input:</h3>
                    b<sub>0</sub>, b<sub>1</sub>,b<sub>2</sub>, b<sub>3</sub>,...,b<sub>15</sub>
                    <h3>Interpreted as:</h3>
                    <table>
                        <tbody>
                        <tr>
                            <td>b<sub>0</sub></td>
                            <td>b<sub>4</sub></td>
                            <td>b<sub>8</sub></td>
                            <td>b<sub>12</sub></td>
                        </tr>
                        <tr>
                            <td>b<sub>1</sub></td>
                            <td>b<sub>5</sub></td>
                            <td>b<sub>9</sub></td>
                            <td>b<sub>13</sub></td>
                        </tr>
                        <tr>
                            <td>b<sub>2</sub></td>
                            <td>b<sub>6</sub></td>
                            <td>b<sub>10</sub></td>
                            <td>b<sub>14</sub></td>
                        </tr>
                        <tr>
                            <td>b<sub>3</sub></td>
                            <td>b<sub>7</sub></td>
                            <td>b<sub>11</sub></td>
                            <td>b<sub>15</sub></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    After key expansion the cipher starts by using an <Link className="link" to="/nodes/xor" >XOR</Link> operation to combine the initial key with the input bytes.
                    After this is done we have either 9, 11 or 13 (for 128, 192 and 256 bit keys respectively) rounds depending on the key size of the following 4 steps:
                </p>
                <ul style={{listStyleType: 'unset'}} >
                    <li><Link className="link" to="/nodes/sbox">Sub Bytes</Link></li>
                    <li><Link className="link" to="/nodes/shiftrows">Shift Rows</Link></li>
                    <li>Mix Rows</li>
                    <li>Add Round Key</li>
                </ul>
                <p>
                    Add Round Key simply <Link className="link" to="/nodes/xor" >XORs</Link> the roundkey of the specific round to the data.<br/>
                    Here you can see a the beginning of AES in action. For the full algorithm look into the <Link className="link" to="/Sandbox">Sandbox</Link>.
                </p>
                <div style={{width: 75+"%" ,aspectRatio:1.5, marginTop:"10px"}} >
                    <Flow colorMode={isDark} flow={"graphs/AES128R1.json"} />
                </div>
            </div>
            <Footer isDark={isDark} />
        </div>
    )
}

export default aes