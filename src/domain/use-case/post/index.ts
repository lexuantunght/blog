import ModuleContainer from '@common/shared/module-container';
import { PostRepositoryName } from '@domain/repository/impl/post-repository-impl';
import type PostRepository from '@domain/repository/post-repository';

@ModuleContainer.injectable()
class PostUseCase {
    constructor(@ModuleContainer.inject(PostRepositoryName) private repository: PostRepository) {}

    public getRecentPosts() {
        // logic
        return this.repository.getAll(0, 8);
    }

    public getPost(postId: string | number) {
        return this.repository.get(postId);
    }
}

export default PostUseCase;
