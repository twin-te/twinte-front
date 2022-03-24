export type ApiCourseForCredit = {
  id: string;
  name: string;
  code: string;
  credit: number;
  tags: string[];
};
export type TagWithoutId = { name: string; order: number };
export type ApiTag = { id: string } & TagWithoutId;

export class CourseRepositoryInMemory {
  private _courses: ApiCourseForCredit[];

  constructor() {
    this._courses = [
      {
        id: "0",
        name: "色彩計画論特講",
        code: "01EB512",
        credit: 1.5,
        tags: ["3"],
      },
      {
        id: "1",
        name: "応用体育シューティングスポーツ",
        code: "EB51201",
        credit: 2.0,
        tags: ["4", "5"],
      },
      {
        id: "2",
        name: "Introduction to Industrial Ecology",
        code: "EG60571",
        credit: 1.5,
        tags: ["0", "1", "3"],
      },
      {
        id: "3",
        name: "メディアアート・フィジカルコンピューティング",
        code: "1E06001",
        credit: 1.5,
        tags: [],
      },
    ];
  }

  public getCourses(): ApiCourseForCredit[] {
    return this._courses;
  }

  public updateTags(id: string, tags: string[]): ApiCourseForCredit {
    const course = this._courses.find((course) => course.id === id);
    if (course == undefined)
      throw new Error("Not Found course with id " + id + ".");
    course.tags = tags;
    return course;
  }

  public deleteTag(tagId: string): void {
    this._courses.forEach((course) => {
      const idx = course.tags.findIndex((id) => id === tagId);
      if (idx === -1) return;
      course.tags.splice(idx, 1);
    });
  }
}

const createId = () => String(Math.floor(Math.random() * 10000000));

export class TagRepositoryInMemory {
  private _tags: ApiTag[];

  constructor() {
    this._tags = [
      { id: "0", name: "専門", order: 0 },
      { id: "1", name: "専門基礎", order: 1 },
      { id: "2", name: "自由", order: 2 },
      { id: "3", name: "教職", order: 3 },
      { id: "4", name: "必修", order: 6 },
      { id: "5", name: "選択", order: 5 },
      { id: "6", name: "学士基盤", order: 4 },
    ];
  }

  public getTags(): ApiTag[] {
    return this._tags;
  }

  public createTag(tagWithoutId: TagWithoutId): ApiTag {
    const tag = { id: createId(), ...tagWithoutId };
    this._tags.push(tag);
    return tag;
  }

  public updateTag(id: string, tagWithoutId: Partial<TagWithoutId>): ApiTag {
    const idx = this._tags.findIndex((tag) => tag.id === id);
    if (idx == -1) throw new Error("Not Found tag with id " + id + ".");
    const name: string = tagWithoutId?.name ?? this._tags[idx].name;
    const order: number = tagWithoutId?.order ?? this._tags[idx].order;
    const updatedTag = { id, name, order };
    this._tags.splice(idx, 1, updatedTag);
    return updatedTag;
  }

  public deleteTag(id: string): void {
    const idx = this._tags.findIndex((tag) => tag.id === id);
    if (idx == -1) throw new Error("Not Found tag with id " + id + ".");
    this._tags.splice(idx, 1);
  }

  public changeOrders(tags: { id: string; order: number }[]): void {
    tags.forEach((tag) => this.updateTag(tag.id, { order: tag.order }));
  }
}
