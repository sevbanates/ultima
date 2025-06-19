import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SafeUrlPipe } from './safe-url.pipe';

@Component({
  selector: 'app-video-player',
  template: `
    <ng-container *ngIf="videoUrl; else fallbackIcon">
      <iframe [src]="videoUrl | safeUrl" frameborder="0" allowfullscreen></iframe>
    </ng-container>
    <ng-template  #fallbackIcon>
    <ng-container *ngIf="showDefaultIcon">
      <div class="flex items-center justify-center h-full">
        <span class="material-icons" style="color: #ff0000; font-size: 40px;">ondemand_video</span>
      </div>
      </ng-container>
    </ng-template>
  `,
  styles: [`
    iframe {
      width: 100%;
      height: 100%;
      aspect-ratio: 16 / 9;
    }
    div {
      width: 100%;
      height: 100%;
      aspect-ratio: 16 / 9;
    }
  `],
  standalone:true,
  imports: [CommonModule, SafeUrlPipe]

})
export class VideoPlayerComponent {
  private _videoUrl: string;
  @Input() showDefaultIcon:boolean=false;
  @Input()
  set videoUrl(url: string) {
    this._videoUrl = this.isValidHttpUrl(url) ? this.transformUrl(url) : '';
  }

  get videoUrl(): string {
    return this._videoUrl;
  }

  transformUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname;
      let videoId: string;

      if (hostname.includes('youtube.com')) {
        videoId = urlObj.searchParams.get('v');
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
      } else if (hostname.includes('dailymotion.com')) {
        const pathSegments = urlObj.pathname.split('/');
        videoId = pathSegments[pathSegments.length - 1];
        return videoId ? `https://www.dailymotion.com/embed/video/${videoId}` : url;
      } else if (hostname.includes('vimeo.com')) {
        const pathSegments = urlObj.pathname.split('/');
        videoId = pathSegments[pathSegments.length - 1];
        return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
      } else if (hostname.includes('twitch.tv')) {
        const pathSegments = urlObj.pathname.split('/');
        videoId = pathSegments[pathSegments.length - 1];
        return videoId.startsWith('videos') ? `https://player.twitch.tv/?video=${videoId.split('/')[1]}&parent=example.com` : url;
      } else if (hostname.includes('facebook.com')) {
        return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}`;
      }
      return ''; 
    } catch (error) {
      console.error('Invalid URL:', error);
      return ''; 
    }
  }

  isValidHttpUrl(string) {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false; 
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }
}
