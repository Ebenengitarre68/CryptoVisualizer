import {HashRouter as Router,Routes,Route} from "react-router-dom";
import Flow from "@/pages/Flow.tsx";
import Xor from "@/pages/Nodes/XOR.tsx";
import Home from "@/pages/Home.tsx";
import AES from "@/pages/Algorithms/AES.tsx"
import Sidenav from "@/components/Sidenav.tsx";
import "/src/css/general.css"
import useLocalStorage from "use-local-storage";



export const App = () =>{{
        const preference =window.matchMedia("(prefers-color-scheme: dark)").matches
        const [isDark, setIsDark] = useLocalStorage("isDark",preference);
        return(
            <Router >
                <Sidenav isChecked={isDark} handleChange={()=> setIsDark(!isDark) }/>
                <Routes>
                    <Route path="/" element={<Home isDark={isDark} />} />
                    <Route path="/nodes/xor" element={<Xor isDark={isDark} />} />

                    <Route path="/algorithms/aes" element={<AES isDark={isDark} />} />

                    <Route path="/Sandbox" element={<Flow colorMode={isDark} />} />
                </Routes>
            </Router>
        )
    }
};