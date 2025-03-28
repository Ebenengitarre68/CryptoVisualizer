function footer({isDark}){

    let src = isDark? "/github-mark-white.svg": "/github-mark.svg"
    return (
        <div className="footer" >
            <p> CryptoVis by Daniel Holzapfel  &nbsp;   <a target="_blank" href="https://github.com/Ebenengitarre68/KryptoVisualizer"><img align="right" style={{height:20+"px"}} src={src}/></a> </p>
        </div>
    )
}

export default footer;