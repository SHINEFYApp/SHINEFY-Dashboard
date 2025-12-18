import { useParams } from "react-router-dom";

const ServiceBoyDetails = () => {
    const { id } = useParams();

    return (
        <div>
            <h1>Service Boy Details</h1>
            <p>ID: {id}</p>
        </div>
    );
};

export default ServiceBoyDetails;