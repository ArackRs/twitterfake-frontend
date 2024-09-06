import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsOfFollowingComponent } from './posts-of-following.component';

describe('PostsOfFollowingComponent', () => {
  let component: PostsOfFollowingComponent;
  let fixture: ComponentFixture<PostsOfFollowingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsOfFollowingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsOfFollowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
