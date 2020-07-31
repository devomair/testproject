import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'covid-track';
  ontarioData;

  listOntarioDetail = Array();
  constructor(private http: HttpClient){

    var self = this;
    self.getOntarioResults();
  }


  getOntarioResults(){
    var self = this;
    this.http.post<any>('/api/api/3/action/datastore_search', 
    {"resource_id":"ed270bb8-340b-41f9-a7c6-e8ef587e6d11","q":"","filters":{},"limit":1,"offset":0,"sort":"Reported Date desc"}).subscribe(data => {

      console.log(data);

      self.ontarioData = data;

      var result_rec = self.ontarioData.result.records[0];
      for ( const key in result_rec ) {

        if ( result_rec.hasOwnProperty( key ) &&  key !== "_id" && key !== "Confirmed Negative" && key !== "Reported Date" &&
          result_rec[key] !== null) {
        
        self.listOntarioDetail.push( {'key': key, 'value':  result_rec[key]});
        }
        
        }
  });
  }

}
