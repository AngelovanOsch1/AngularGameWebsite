import { Component } from '@angular/core';

interface Forum {
  title: string;
  description: string;
  posts: number;
  postedOn: string;
}

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.scss']
})
export class ForumsComponent {
  public editing: boolean = false;
  public editingIndex: number = -1;
  public originalTitle: string = '';

  public forums: Forum[] = [
    {
      title: 'Forums suck',
      description: 'I think forums sucks because...',
      posts: 0,
      postedOn: '2024-01-12'
    },
    {
      title: 'Angular',
      description: 'Who else agrees Angular is the best?',
      posts: 0,
      postedOn: '2024-01-12'
    },
    {
      title: 'React is disgusting!',
      description: 'React is absolutely the most disgusting thing I have ever seen...',
      posts: 0,
      postedOn: '2024-01-12'
    }
  ];

  public newForum: Forum = {
    title: '',
    description: '',
    posts: 0,
    postedOn: '2024-01-12'
  };

  constructor() {}

  public addForum() {
    if (this.newForum.title && this.newForum.description) {
      const currentDate = new Date().toISOString().slice(0, 10);
      this.forums.push({ ...this.newForum, posts: 0, postedOn: currentDate });
      this.resetNewForum();
    }
  }

  public removeForum(index: number) {
    this.forums.splice(index, 1);
  }

  public editForum(index: number) {
    this.editing = true;
    const selectedForum = this.forums[index];
    this.newForum = { ...selectedForum };
    this.originalTitle = selectedForum.title;
  }
  
  
  public updateForum() {
    const index = this.forums.findIndex(f => f.title === this.originalTitle);
    if (index !== -1) {
      this.forums[index] = { ...this.newForum };
      this.resetNewForum();
      this.editing = false;
    }
  }

  public cancel() {
    this.resetNewForum();
    this.editing = false;
  }


  private resetNewForum() {
    this.newForum = {
      title: '',
      description: '',
      posts: 0,
      postedOn: '2024-01-12'
    };
  }
}
