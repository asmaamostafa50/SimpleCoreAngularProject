import { createReducer, on } from "@ngrx/store";
import * as ActionTypes from "./student.action";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Student } from "@app/shared/models";


export const studentFeatureKey = 'student-feature';


export interface StudentState extends EntityState<Student> {
  error: string | null;
  sortType: number;
  searchTerm: string;
  selectedId: number | null;
  pageNumber: number;
  pageSize: number;
  isLoading: boolean;
}
const adapter: EntityAdapter<Student> = createEntityAdapter<Student>();

export const initialStudentState: StudentState = adapter.getInitialState({
  isLoading: false,
  selectedId: null,
  error: null,
  pageNumber: 1,
  pageSize: 10,
  searchTerm: '',
  sortType: 0
});

export const studentReducer = createReducer(
  initialStudentState,
  on(ActionTypes.getAllStudentsRequestAction, state => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(ActionTypes.getAllStudentsSuccessAction, (state, { items }) => (
    adapter.setAll(items, { ...state, isLoading: false })
   )),
  on(ActionTypes.getAllStudentsErrorAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  on(ActionTypes.createStudentRequestAction, (state) => ({
    ...state,
    isLoading: true
  })),

  on(ActionTypes.createStudentSuccessAction, (state, { item }) => (
    adapter.addOne(item, {
      ...state,
      isLoading: false
    })
)),

  on(ActionTypes.createStudentErrorAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error
  })),
  on(ActionTypes.updateStudentRequestAction, (state) => ({
    ...state,
    isLoading: true
  })),

  on(ActionTypes.updateStudentSuccessAction, (state, { item }) => (
    adapter.updateOne({ id: item.id, changes: item }, {
      ...state,
      isLoading: false,
    })
    )),

  on(ActionTypes.updateStudentErrorAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error
  })),
  on(ActionTypes.deleteStudentRequestAction, (state) => ({
    ...state,
    isLoading: true
  })),

  on(ActionTypes.deleteStudentSuccessAction, (state, { id }) => (
    adapter.removeOne(id, {
      ...state,
      isLoading: false,
    })
  )),
  on(ActionTypes.deleteStudentErrorAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error
  })),
  on(ActionTypes.getStudentAction, (state, { id }) => (
    { ...state, selectedId: id }
  )),
  on(ActionTypes.searchStudentAction, (state, { searchTerm }) => (
    { ...state, searchTerm }
  )),
  on(ActionTypes.sortStudentAction, (state, { sortType }) => (
    { ...state, sortType }
  )),
  on(ActionTypes.setPaginationAction, (state, { pageNumber, pageSize }) => (
    { ...state, pageNumber,pageSize }
  )),
)


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

