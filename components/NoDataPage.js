import Layout from "./Layout";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function NoDataPage() {
    return (
            <Layout>
                <div id="app" className="container">
                    <Navbar/>
                    <Footer/>
                </div>
            </Layout>  
    );
}