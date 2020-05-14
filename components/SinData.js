import Layout from "./Layout";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function NoDataPage(props) {
    return (
            <Layout>
                <div id="app" className="container">
                    <Navbar/>
                    <h5 className="capitulo">{props.texto}</h5>
                    <Footer/>
                </div>
            </Layout>  
    );
}