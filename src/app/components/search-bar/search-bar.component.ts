import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UserData} from '../../api/models/user-data';
import {TagData} from '../../api/models/tag-data';
import {UsersService} from '../../api/services/users.service';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import {NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {FileShortData} from '../../api/models/file-short-data';
import {MediaService} from '../../api/services/media.service';
import {ResultTemplateContext} from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window';

export interface SearchTypeConfig {
  searchFunction: OperatorFunction<string, any>;
  placeHolder: string;
}

type QueryType = 'title' | 'tag' | 'user';

@Component({
  selector: 'bnl-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  users: UserData[];
  tags: string[];
  searchQuery: string | TagData | UserData;
  queryType: QueryType = 'title';
  firstClear = false;
  searchTypeConfigs: { [key: string]: SearchTypeConfig; } = {};

  @ViewChild('searchBar') searchBar: ElementRef;
  @ViewChild('tagTemplate') tagTemplate: TemplateRef<ResultTemplateContext>;
  @ViewChild('userTemplate') userTemplate: TemplateRef<ResultTemplateContext>;
  @ViewChild('titleTemplate') titleTemplate: TemplateRef<ResultTemplateContext>;

  constructor(private usersService: UsersService,
              private mediaService: MediaService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.searchTypeConfigs = {
      title: {
        searchFunction: this.searchTitle,
        placeHolder: 'Tapez 3615 ou # pour une étiquette, @ pour un utilisateur'
      },
      tag: {
        searchFunction: this.searchTag,
        placeHolder: 'Cherchez une étiquette'
      },
      user: {
        searchFunction: this.searchUser,
        placeHolder: 'Cherchez un nom d\'utilisateur'
      },
    };
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

  searchTitle: OperatorFunction<string, readonly FileShortData[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      switchMap(term => this.mediaService.mediaContentSearchGet({title: term}))
    );

  searchFunction() {
    return this.searchTypeConfigs[this.queryType].searchFunction;
  }

  placeholder() {
    return this.searchTypeConfigs[this.queryType].placeHolder;
  }

  clearPrefix() {
    if (!this.searchBar.nativeElement.value) {
      this.queryType = 'title';
    }
  }

  detectPrefix() {
    if (this.searchBar.nativeElement.value === '3615' || this.searchBar.nativeElement.value === '#') {
      this.queryType = 'tag';
      this.searchQuery = '';
    } else if (this.searchBar.nativeElement.value === '@') {
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
    } else {
      const item = event.item as FileShortData;
      routerPromise = this.router.navigate(['/archive', item.file_id]);
    }

    if (routerPromise) {
      routerPromise.then(() => {
        this.searchQuery = '';
        this.queryType = 'title';
      });
    }
  }

}
