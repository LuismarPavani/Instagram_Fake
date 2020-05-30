import { Post, getPosts } from '../apis/posts.api';
import { action, observable } from 'mobx';

export default class HomeStore {

  @observable photoReady: boolean = false;

  @observable posts: Post[] = [];

  @observable loading: boolean = false;

  @action getPosts = async () => {
    this.loading = true
    try {
      const posts = await getPosts();
      this.posts = posts;
    } catch (error) {
      this.posts = [];
      throw error;
    } finally {
      this.loading = false
    }
  }

  @action addPost = (uriPhoto: string) => {
    const post: Post = {
      author: {
        avatar: 'https://avatars1.githubusercontent.com/u/41964562?s=50',
        id: 1,
        name: 'Luismar'
      },
      authorId: 1,
      description: 'minha foto',
      id: this.posts.length + 1,
      image: uriPhoto
    };

    this.posts.unshift(post);
  }

  @action toogleStatus = (status: boolean) => {
    this.photoReady = status;
  }
}

const homeStore = new HomeStore();
export { homeStore };