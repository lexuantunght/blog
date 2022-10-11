import ModuleContainer from 'common/shared/module-container';
import { PostRepositoryName } from 'domain/repository/impl/post-repository-impl';
import type PostRepository from 'domain/repository/post-repository';

@ModuleContainer.injectable()
class PostUseCase {
    constructor(@ModuleContainer.inject(PostRepositoryName) private repository: PostRepository) {}

    public getRecentPosts() {
        return this.repository.getRecent(0, 12);
    }

    public getMostViews() {
        return this.repository.getMostViews(0, 12);
    }

    public getAllPosts(page?: number, limit?: number) {
        return this.repository.getAll(page, limit);
    }

    public getPostsByCategory(page?: number, limit?: number, category?: string) {
        return this.repository.getAll(page, limit, { category: category || '' });
    }

    public getPost(postId: number) {
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
