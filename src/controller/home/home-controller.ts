import ModuleContainer from 'common/shared/module-container';
import BaseController from 'controller/base-controller';
import PostUseCase from 'domain/use-case/post';
import UserUseCase from 'domain/use-case/user';

@ModuleContainer.injectable()
class HomeController extends BaseController {
    constructor(private postUC: PostUseCase, private userUC: UserUseCase) {
        super();
    }

    public getRecentPosts() {
        return this.postUC.getRecentPosts();
    }

    public subscribeBlog(email: string) {
        return this.userUC.subscribe(email);
    }
}

export default HomeController;
