import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromStudent from "./student.reducer";

const selectStudentState = createFeatureSelector<fromStudent.StudentState>(fromStudent.studentFeatureKey);

export const getAllStudents = createSelector(
  selectStudentState,
  fromStudent.selectAll
)



export const getIsLoading = createSelector(
  selectStudentState,
  state => state.isLoading
);

export const getErrormessage = createSelector(
  selectStudentState,
  state => state.error
);

export const getStudentEntities = createSelector(
  selectStudentState,
  fromStudent.selectEntities
)


export const selectCurrentStudentId = createSelector(
  selectStudentState,
  state => state.selectedId
)

export const getSearchTerm = createSelector(
  selectStudentState,
  (state) => state.searchTerm
);

export const getSortType = createSelector(
  selectStudentState,
  (state) => state.sortType
);
export const getPageNumber = createSelector(
  selectStudentState,
  (state) => state.pageNumber
);
export const getPageSize = createSelector(
  selectStudentState,
  (state) => state.pageSize
);

export const getCurrentStudent = createSelector(
  getStudentEntities,
  selectCurrentStudentId,
  (studentEntities, studentId) => (studentId?studentEntities[studentId]:null)??null
)

export const gettotalCount = createSelector(
  getAllStudents,
  getSearchTerm,
  (students, searchTerm) => {
    let filteredStudents = students;
    if (searchTerm) {
      filteredStudents = filteredStudents.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filteredStudents?.length;
  }
)

export const getFilteredStudents = createSelector(
  getAllStudents,
  getSearchTerm,
  getSortType,
  getPageNumber,
  getPageSize,
  (students, searchTerm, sortType, pageNumber, pageSize) => {
    let filteredStudents = students;
    const from = (pageNumber - 1) * pageSize;
    const to = pageNumber  * pageSize;

    if (searchTerm) {
      filteredStudents = filteredStudents.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortType) {
      filteredStudents = filteredStudents.sort((a, b) => {
        if (sortType == 2) {
          return a.name.localeCompare(b.name);
        } else if (sortType == 3) {
          return b.name.localeCompare(a.name);
        }
        return a.id - b.id;
      });
    }

    return filteredStudents?.slice(from, to);
  }
);




