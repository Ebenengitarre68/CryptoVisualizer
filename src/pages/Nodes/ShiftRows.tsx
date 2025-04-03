import Footer from "@/components/Footer.tsx";

function shiftrows({isDark}) {
    return (
        <div data-theme={isDark ? "dark" : "light"} className="background">
            <div className="div" >
                <title>CryptoVisShiftRows</title>

                <h1>Shift Rows</h1>
                <p>
                    Shift Rows is a very simple node that shifts every row n by the number n to the left.<br/>
                    Row 0 is shifted by 0, 1 by 1...
                </p>
                <div className="example">
                    <h2>Example</h2>
                    <p>
                        <br/>
                        Input:<br/>
                        2, 3, 2, 9<br/>
                        6, 4, 8, 3<br/>
                        2, 5, 1, 0<br/>
                        9, 0, 3, 2<br/>
                        <br/>
                        Output:<br/>
                        2, 3, 2, 9<br/>
                        4, 8, 3, 6<br/>
                        1, 0, 2, 5<br/>
                        2, 9, 0, 3<br/>
                    </p>
                </div>

            </div>
            <Footer isDark={isDark} />
        </div>
    )


}

export default shiftrows