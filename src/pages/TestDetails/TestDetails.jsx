import { useLoaderData } from "react-router-dom";
import Container from "../../components/shared/Container/Container";


const TestDetails = () => {

    const { _id, } = useLoaderData();

    return (
        <div>
            <Container>
                <p>{_id} </p>

            </Container>
        </div>
    );
};

export default TestDetails;