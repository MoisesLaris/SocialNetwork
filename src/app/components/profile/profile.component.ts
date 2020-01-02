import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HomeComponent } from './../home/home.component';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
  providers: [HomeComponent]
})
export class ProfileComponent implements OnInit {
  publicaciones:any;
  perfil:any;
  coments:any;
  id:any;
  constructor(private activatedRoute:ActivatedRoute,private http:HttpClient,private home:HomeComponent) {
    this.perfil=this.home.users;
    this.perfil = home.users;
    this.activatedRoute.params.subscribe( params =>{
      this.id=params['id'];
      });
    }


  ngOnInit() {
    let perf= this.http.get("https://jsonplaceholder.typicode.com/posts?userId="+this.id);
    perf.subscribe((Response)=>this.publicaciones=Response);
    let user = this.http.get("https://jsonplaceholder.typicode.com/users");
    user.subscribe((response)=>this.perfil=response);
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
}
