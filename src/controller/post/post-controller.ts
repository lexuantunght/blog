import ModuleContainer from 'common/shared/module-container';
import BaseController from 'controller/base-controller';
import PostUseCase from 'domain/use-case/post';

@ModuleContainer.injectable()
class PostController extends BaseController {
    constructor(private postUC: PostUseCase) {
        super();
    }
    public getPost(postId: string | number) {
        return this.postUC.getPost(postId);
    }
    public getAllPosts(page?: number, limit?: number) {
        return this.postUC.getAllPosts(page, limit);
    }
}

export default PostController;
