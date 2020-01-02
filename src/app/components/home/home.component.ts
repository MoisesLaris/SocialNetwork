import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  posts:any;
  users:any;
  coments:any;
  constructor(private http:HttpClient,private router : Router) {

   }

  ngOnInit() {

    let post = this.http.get("https://jsonplaceholder.typicode.com/posts");
    post.subscribe((response)=>{
      this.posts=response;
    });
    let user = this.http.get("https://jsonplaceholder.typicode.com/users");
    user.subscribe((response)=>{
      this.users=response;
    });

    let coment = this.http.get("https://jsonplaceholder.typicode.com/posts/1/comments");
    coment.subscribe((response:Array<any>)=>{

      let obj = new Array((response[response.length-1].postId));
      for (let i = 0; i < obj.length; i ++) {
         obj[i] = [];
      }
      let pId=0; //postid(-1)
      let index=0;
      for( let i = 0; i < response.length;){
        if(pId+1==response[i].postId){
          obj[pId][index]=response[i];
          index++;
          i++
        }else{
          index=0;
          pId++;
        }

      }

      //console.log(obj); //imprimir matriz
      this.coments=obj;
    });

  }
  verPerfil(ide:number){
    this.router.navigate( ['/profile',ide] );
  }


}
