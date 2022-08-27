import ModuleContainer from '@common/shared/module-container';
import PostUseCase from '@domain/use-case/post';

@ModuleContainer.injectable()
class PostController {
    constructor(private postUC: PostUseCase) {}
    public getPost(postId: string | number) {
        return this.postUC.getPost(postId);
    }
}

export default PostController;
