import { action, observable } from 'mobx';

import axios from 'axios';

type Post = {
  id: number;
  image: string;
  description: string;
  authorId: number;
  author: {
    id: number,
    name: string,
    avatar: string
  }
}

export default class HomeStore {

  @observable photoReady: boolean = false;

  @observable posts: Post[] = [];

  @action getPosts = async () => {
    try {
      const { data: posts } = await axios.get<[Post]>('http://localhost:3000/feed?_expand=author');
      this.posts = posts;
      console.log('Sucess');
    } catch (error) {
      console.log(error);
      this.posts = [];
    }
  }

  @action addPost = (uriPhoto) => {
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