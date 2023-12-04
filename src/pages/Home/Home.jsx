import Container from '../../components/shared/Container/Container';
import Banner from './Banner';
import FeaturedTests from './FeaturedTests';
import Promotions from './Promotions';

const Home = () => {
    return (
        <div>
            <Container>
                <Banner></Banner>
                <FeaturedTests></FeaturedTests>
                <Promotions></Promotions>
            </Container>
        </div>
    );
};

export default Home;