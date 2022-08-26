import BaseController from '@controller/base-controller';

class HomeController implements BaseController {
    public async getServerSideProps() {
        return Promise.resolve(1);
    }
}

export default HomeController;
