import ModuleContainer from '@common/shared/module-container';
import BaseController from '@controller/base-controller';
import PostUseCase from '@domain/use-case/post';

@ModuleContainer.injectable()
class HomeController implements BaseController {
    constructor(private postUC: PostUseCase) {}
    public async getServerSideProps() {
        const data = await this.postUC.getRecentPosts();
        return {
            props: {
                data,
            },
        };
    }
}

export default HomeController;
