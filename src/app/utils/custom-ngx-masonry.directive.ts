import {AfterViewInit, Directive, ElementRef, forwardRef, Inject, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {NgxMasonryAnimations, NgxMasonryComponent, NgxMasonryDirective} from 'ngx-masonry';
import {animate, AnimationBuilder, style} from '@angular/animations';

@Directive({
  selector: '[bnlMasonryItem], bnlMasonryItem'
})
export class CustomNgxMasonryDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input() prepend = false;

  public videos: Set<HTMLVideoElement>;
  public images: Set<HTMLImageElement>;
  private animations: NgxMasonryAnimations = {
    show: [
      style({opacity: 0}),
      animate('400ms ease-in', style({opacity: 1})),
    ],
    hide: [
      style({opacity: '*'}),
      animate('400ms ease-in', style({opacity: 0})),
    ]
  };

  constructor(
    public element: ElementRef,
    private builder: AnimationBuilder,
    @Inject(forwardRef(() => NgxMasonryComponent)) private parent: NgxMasonryComponent,
    private renderer: Renderer2,
  ) {
  }

  ngOnInit() {
    if (this.parent.options.animations !== undefined) {
      this.animations = this.parent.options.animations;
    }
    this.renderer.setStyle(this.element.nativeElement, 'position', 'fixed');
    this.renderer.setStyle(this.element.nativeElement, 'right', '-150vw');
    this.parent.addPendingItem(this as unknown as NgxMasonryDirective);
  }

  ngAfterViewInit() {
    const images: HTMLImageElement[] = Array.from(this.element.nativeElement.getElementsByTagName('img'));
    this.images = new Set(images);
    const videos: HTMLVideoElement[] = Array.from(this.element.nativeElement.getElementsByTagName('video'));
    this.videos = new Set(videos);
    console.log(`Found ${images.length} imgs and ${videos.length} videos`);
    if (videos.length === 0 && images.length === 0) {
      setTimeout(() => {
        this.parent.add(this as unknown as NgxMasonryDirective);
      });
    } else {
      for (const videoRef of videos) {
        // skip image render check if image has `masonryLazy` attribute
        this.renderer.listen(videoRef, 'loadedmetadata', _ => {
          this.videoLoaded(videoRef);
        });
        this.renderer.listen(videoRef, 'error', _ => {
          this.videoLoaded(videoRef);
        });
      }

      for (const imageRef of images) {
        this.renderer.listen(imageRef, 'load', _ => {
          this.imageLoaded(imageRef);
        });
        this.renderer.listen(imageRef, 'error', _ => {
          this.imageLoaded(imageRef);
        });
      }
    }
  }

  ngOnDestroy() {
    if (this.videos && this.videos.size === 0
      && this.images && this.images.size === 0
      && this.element.nativeElement.parentNode) {
      this.playAnimation(false);
      this.parent.remove(this.element.nativeElement);
    }
  }

  private checkAllElementsDone() {
    if (this.videos.size === 0 && this.images.size === 0) {
      console.log(`Added ${this}`);
      this.parent.add(this as unknown as NgxMasonryDirective);
    }
  }

  private videoLoaded(video?: HTMLVideoElement) {
    console.log('Loaded metadata for video');
    this.videos.delete(video);
    this.checkAllElementsDone();
  }

  private imageLoaded(image?: HTMLImageElement) {
    this.images.delete(image);
    this.checkAllElementsDone();
  }

  public playAnimation(show: boolean) {
    const metadata = show ? this.animations.show : this.animations.hide;
    if (metadata) {
      const player = this.builder.build(metadata).create(this.element.nativeElement);
      player.play();
    }
  }

}
