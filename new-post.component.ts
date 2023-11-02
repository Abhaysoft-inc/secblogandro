import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent  implements OnInit {
  newPost: any = {
    title: '',
    content: '',
    author:'Abhay',
  };

  constructor(private router: Router ,private alertController: AlertController,private route: ActivatedRoute,private blogService: BlogService) { }

  ngOnInit() {}
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Post Published',
      message: 'The post has been Published successfully.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.route.params.subscribe((params) => {
              const blogId = params['id'];
              this.router.navigate(['/']);
            });
            
            // Redirect to the updated post
            
          },
        },
      ],
    });
  
    await alert.present();
  }
  submitNewPost() {
    // Submit the new post to the API
    this.blogService.createPost(this.newPost).subscribe((result) => {
      this.presentAlert();
      // Handle success or errors
    });
  }


}
