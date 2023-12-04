import Container from '../../components/shared/Container/Container';
import Banner from './Banner';
import FeaturedTests from './FeaturedTests';
import Promotions from './Promotions';
import Recommendation from './Recommendation'

const Home = () => {
    return (
        <div>
            <Container>
                <Banner></Banner>
                <FeaturedTests></FeaturedTests>
                <Promotions></Promotions>
                <Recommendation></Recommendation>
            </Container>
        </div>
    );
};

export default Home;