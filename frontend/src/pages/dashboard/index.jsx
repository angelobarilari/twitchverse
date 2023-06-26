import Header from "../../components/Header";
import DefaultPage from "../../components/DefaultPage";
import "./style.css";

function Dashboard() {
    return (
        <>
            <Header />

            <DefaultPage className="dashboard-page">
                MY DASHBOARD
            </DefaultPage>
        </>
    );
}

export default Dashboard;