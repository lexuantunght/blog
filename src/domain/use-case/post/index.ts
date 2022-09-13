import ModuleContainer from 'common/shared/module-container';
import PostCreation from 'domain/model/post-creation';
import { PostRepositoryName } from 'domain/repository/impl/post-repository-impl';
import type PostRepository from 'domain/repository/post-repository';

@ModuleContainer.injectable()
class PostUseCase {
    constructor(@ModuleContainer.inject(PostRepositoryName) private repository: PostRepository) {}

    public getRecentPosts() {
        // logic
        return this.repository.getAll(0, 8);
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

    public createPost(post: PostCreation) {
        const formData = new FormData();
        formData.append('title', post.title);
        formData.append('content', post.content);
        formData.append('mode', post.mode);
        formData.append('category', post.category);
        post.photos.forEach((photo) => {
            formData.append('image', photo.file, photo.name);
        });
        return this.repository.create(formData);
    }
}

export default PostUseCase;
