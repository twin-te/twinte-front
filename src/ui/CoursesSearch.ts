import { usePorts } from "~/adapter";
import { Ports } from "~/application/ports";
import Usecase from "~/application/usecases";
import { Course } from "~/domain/course";
import { isResultError } from "~/domain/error";
import { Module } from "~/domain/module";
import { Schedule } from "~/domain/schedule";
import { Timetable } from "~/domain/timetable";
import { courseToDisplay } from "~/presentation/presenters/course";
import { DisplayCourse } from "~/presentation/viewmodels/course";
import { Subject } from "./subject";

export type SearchResult = {
  id: string;
  course: DisplayCourse;
  schedules: Schedule[];
};

export class CoursesSearch {
  #offset = 0;
  #limit: number;
  #ports: Ports;

  #searchResults: SearchResult[] = [];
  #resultsHistory: SearchResult[] = [];

  readonly searchResultsSubject = new Subject<{
    results: SearchResult[];
    history: SearchResult[];
  }>();
  readonly fetchingSubject = new Subject<boolean>();

  constructor(limit?: number) {
    this.#ports = usePorts();
    this.#limit = limit ?? 50;
  }

  async search(
    year: number,
    keyword: string,
    code: string,
    timetable: Timetable<Module, boolean>,
    onlyBlank: boolean
  ) {
    this.fetchingSubject.notify(true);

    const result = await Usecase.searchCourse(this.#ports)(
      year,
      keyword.split("/s/"),
      code.split("/s/"),
      timetable,
      onlyBlank,
      "Cover",
      this.#offset,
      this.#limit
    );

    if (isResultError(result)) throw result;

    const formatedResult = this.formatResult(result);

    this.updateResultsHistory(formatedResult);
    this.#searchResults = formatedResult;

    this.#offset += this.#limit;

    this.fetchingSubject.notify(false);

    this.searchResultsSubject.notify({
      results: this.#searchResults,
      history: this.#resultsHistory,
    });
  }

  resetResults() {
    this.#offset = 0;
    this.#searchResults = [];
    this.#resultsHistory = [];

    this.searchResultsSubject.notify({
      results: this.#searchResults,
      history: this.#resultsHistory,
    });
  }

  private formatResult(results: Course[]): SearchResult[] {
    return results.map((course) => ({
      id: course.id,
      course: courseToDisplay(course),
      schedules: course.schedules,
    }));
  }

  private updateResultsHistory(formatedResult: SearchResult[]) {
    if (this.#offset === 0) this.#resultsHistory = formatedResult;
    else this.#resultsHistory = [...this.#searchResults, ...formatedResult];
  }
}
