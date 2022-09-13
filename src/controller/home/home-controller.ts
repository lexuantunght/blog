import ModuleContainer from 'common/shared/module-container';
import BaseController from 'controller/base-controller';
import PostUseCase from 'domain/use-case/post';

@ModuleContainer.injectable()
class HomeController extends BaseController {
    constructor(private postUC: PostUseCase) {
        super();
    }
    public getRecentPosts() {
        return this.postUC.getRecentPosts();
    }
}

export default HomeController;
