import Container from '../../components/shared/Container/Container';
import Banner from './Banner';
import FeaturedTests from './FeaturedTests';

const Home = () => {
    return (
        <div>
            <Container>
                <Banner></Banner>
                <FeaturedTests></FeaturedTests>
            </Container>
        </div>
    );
};

export default Home;