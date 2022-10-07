import ModuleContainer from 'common/shared/module-container';
import { PostRepositoryName } from 'domain/repository/impl/post-repository-impl';
import type PostRepository from 'domain/repository/post-repository';

@ModuleContainer.injectable()
class PostUseCase {
    constructor(@ModuleContainer.inject(PostRepositoryName) private repository: PostRepository) {}

    public getRecentPosts() {
        return this.repository.getRecent(0, 8);
    }

    public getMostViews() {
        return this.repository.getMostViews(0, 8);
    }

    public getAllPosts(page?: number, limit?: number) {
        return this.repository.getAll(page, limit);
    }

    public getPost(postId: string | number) {
        return this.repository.get(postId);
    }

    public getCategories() {
        return this.repository.getCategories();
    }

    public createPost(post: FormData) {
        return this.repository.create(post);
    }
}

export default PostUseCase;
