import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserData} from '../../api/models/user-data';
import {TagData} from '../../api/models/tag-data';
import {UsersService} from '../../api/services/users.service';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {TagsList} from '../../api/models/tags-list';


@Component({
  selector: 'bnl-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  users: UserData[];
  tags: string[];
  searchQuery: string | TagData | UserData;
  queryType: 'title' | 'tag' | 'user' = 'title';
  firstClear = false;

  @ViewChild('searchBar') searchBar: ElementRef;

  constructor(private usersService: UsersService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadLists();
  }

  loadLists() {
    this.usersService.usersTagsListGet().subscribe((data) => {
      this.tags = data.tags;
    });
    this.usersService.usersDataAllGet().subscribe((data) => {
      this.users = data;
    });
  }

  searchUser: OperatorFunction<string, readonly UserData[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.users.filter(usr => (
          usr.pokename.toLowerCase().indexOf(term.toLowerCase()) > -1
          ||
          usr.adjective.toLowerCase().indexOf(term.toLowerCase()) > -1))
          .slice(0, 10))
    );

  searchTag: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.tags.filter(tag => (tag.toLowerCase().indexOf(term.toLowerCase()) > -1))
          .slice(0, 10))
    );

  searchTitle: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => [])
    );

  searchFunction() {
    switch (this.queryType) {
      case 'user':
        return this.searchUser;
      case 'tag':
        return this.searchTag;
      case 'title':
        return this.searchTitle;
    }
  }

  placeholder() {
    switch (this.queryType) {
      case 'user':
        return 'Cherchez un nom d\'utilisateur';
      case 'tag':
        return 'Cherchez une étiquette';
      case 'title':
        return 'Tapez 3615 pour un tag, @ pour un utilisateur';
    }
  }

  clearPrefix() {
    console.log('Backspaced!');
    console.log(this.searchQuery);
    console.log(this.searchBar.nativeElement.value);
    console.log(this.firstClear);
    if (!this.searchBar.nativeElement.value) {
      /*      if (!this.firstClear){
              this.firstClear = true;
            } else {
              this.firstClear = false;
              this.queryType = 'title';
            }*/
      this.queryType = 'title';
    }
  }

  detectPrefix() {
    console.log(this.searchQuery);
    console.log(this.searchFunction());
    if (this.searchQuery === '3615') {
      this.queryType = 'tag';
      this.searchQuery = '';
    } else if (this.searchQuery === '@') {
      this.queryType = 'user';
      this.searchQuery = '';
    }
  }

  selectedItem(event: NgbTypeaheadSelectItemEvent) {
    let routerPromise: Promise<boolean>;
    if (this.queryType === 'tag') {
      const item = event.item as string;
      routerPromise = this.router.navigate(['/tag', item]);

    } else if (this.queryType === 'user') {
      const item = event.item as UserData;
      routerPromise = this.router.navigate(['/user', item.userid]);
    }

    if (routerPromise) {
      routerPromise.then(() => {
        this.searchQuery = '';
        this.queryType = 'title';
      });
    }
  }

}
