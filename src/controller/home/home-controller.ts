import ModuleContainer from '@common/shared/module-container';
import PostUseCase from '@domain/use-case/post';

@ModuleContainer.injectable()
class HomeController {
    constructor(private postUC: PostUseCase) {}
    public getRecentPosts() {
        return this.postUC.getRecentPosts();
    }
}

export default HomeController;