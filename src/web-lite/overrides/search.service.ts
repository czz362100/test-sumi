import { ValidateMessage } from '@opensumi/ide-components';
import { ContentSearchResult, IContentSearchClientService, IUIState, ResultTotal, SEARCH_STATE } from '@opensumi/ide-search'
import { MutableRefObject, KeyboardEvent } from 'react';

import { Injectable } from '@opensumi/di';


@Injectable()
export class SearchServiceServer implements IContentSearchClientService{
  replaceValue: string;
  searchValue: string;
  searchError: string;
  searchState: SEARCH_STATE;
  UIState: IUIState;
  searchResults: Map<string, ContentSearchResult[]>;
  resultTotal: ResultTotal;
  docModelSearchedList: string[];
  currentSearchId: number;
  searchInputEl: MutableRefObject<HTMLInputElement | null>;
  replaceInputEl: MutableRefObject<HTMLInputElement | null>;
  isSearchDoing: boolean;
  isShowValidateMessage: boolean;
  validateMessage: ValidateMessage | undefined;
  updateUIState(obj: any, e?: KeyboardEvent<Element>) {
    throw new Error('Method not implemented.');
  };
  search = (e?: React.KeyboardEvent, insertUIState?: IUIState) => {
    console.log(1111)
  };
}