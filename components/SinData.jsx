import Layout from "./Layout";
import Nav from "./Nav";
import Footer from "./Footer";

export default function NoDataPage(props) {
    return (
            <Layout>
                <div id="app" className="container">
                    <Nav/>
                    <h5 className="capitulo">{props.texto}</h5>
                    <Footer/>
                </div>
            </Layout>  
    );
}