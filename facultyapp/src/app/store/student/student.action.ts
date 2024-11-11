import { Student } from "@app/shared/models";
import { createAction, props } from "@ngrx/store";

enum ActionTypes {
  GET_StudentS = '[ALL] Students',
  GET_StudentS_SUCCESS = '[ALL] Students Success',
  GET_StudentS_ERROR = '[ALL] Students Error',

  CREATE_Student = '[CREATE] Student',
  CREATE_Student_SUCCESS = '[CREATE] Student Success',
  CREATE_Student_ERROR = '[CREATE] Student Error',

  DELETE_Student = '[DELETE] Student',
  DELETE_Student_SUCCESS = '[DELETE] Student Success',
  DELETE_Student_ERROR = '[DELETE] Student Error',

  UPDATE_Student = '[UPDATE] Student',
  UPDATE_Student_SUCCESS = '[UPDATE] Student Success',
  UPDATE_Student_ERROR = '[UPDATE] Student Error',

  GET_Student = '[GET] Student',
  GET_Student_SUCCESS = '[GET] Student Success',
  GET_Student_ERROR = '[GET] Student Error',

  SEARCH_Student = '[SEARCH] Student',
  SORT_Student = '[SORT] Student',
  PAGINATION_Student = '[PAGINATION] Student',
}




export const getAllStudentsRequestAction = createAction(
  ActionTypes.GET_StudentS
);
export const getAllStudentsSuccessAction = createAction(
  ActionTypes.GET_StudentS_SUCCESS,
  props<{ items: Student[] }>()
);
export const getAllStudentsErrorAction = createAction(
  ActionTypes.GET_StudentS_ERROR,
  props<{ error: string }>()
);



export const createStudentRequestAction = createAction(
  ActionTypes.CREATE_Student,
  props<{ item: Student }>()
);
export const createStudentSuccessAction = createAction(
  ActionTypes.CREATE_Student_SUCCESS,
  props<{ item: Student  }>()
);
export const createStudentErrorAction = createAction(
  ActionTypes.CREATE_Student_ERROR,
  props<{ error: string }>()
);



export const updateStudentRequestAction = createAction(
  ActionTypes.UPDATE_Student,
  props<{ item: Student }>()
);
export const updateStudentSuccessAction = createAction(
  ActionTypes.UPDATE_Student_SUCCESS,
  props<{ item: Student  }>()
);
export const updateStudentErrorAction = createAction(
  ActionTypes.UPDATE_Student_ERROR,
  props<{ error: string }>()
);


export const deleteStudentRequestAction = createAction(
  ActionTypes.DELETE_Student,
  props<{ id: number }>()
);
export const deleteStudentSuccessAction = createAction(
  ActionTypes.DELETE_Student_SUCCESS,
  props<{ id: number }>()
);
export const deleteStudentErrorAction = createAction(
  ActionTypes.DELETE_Student_ERROR,
  props<{ error: string }>()
);


export const getStudentAction = createAction(
  ActionTypes.GET_Student,
  props<{ id: number }>()
);
export const getStudentSuccessAction = createAction(
  ActionTypes.GET_Student_SUCCESS,
  props<{ items: Student }>()
);
export const getStudentErrorAction = createAction(
  ActionTypes.GET_Student_ERROR,
  props<{ error: string }>()
);

export const searchStudentAction = createAction(
  ActionTypes.SEARCH_Student,
  props<{ searchTerm: string }>()
);
export const sortStudentAction = createAction(
  ActionTypes.SORT_Student,
  props<{ sortType: number }>()
);
export const setPaginationAction = createAction(
  ActionTypes.PAGINATION_Student,
  props<{ pageNumber: number,pageSize:number }>()
);