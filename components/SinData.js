import Layout from "./Layout";
import Navbarra from "./Navbarra";
import Footer from "./Footer";

export default function NoDataPage(props) {
    return (
            <Layout>
                <div id="app" className="container">
                    <Navbarra/>
                    <h5 className="capitulo">{props.texto}</h5>
                    <Footer/>
                </div>
            </Layout>  
    );
}