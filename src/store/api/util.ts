import { LecturesAnual, LecturesModule } from '../../types/front'
import { Lecture } from '../../types/server'

async function fetchLectures(data: string[]): Promise<Lecture[]> {
  return []
}

function createTableModule(data: Lecture, module: number): LecturesModule {
  return []
}

function createTableAnual(data: LecturesAnual | null, moduleData: LecturesModule, module: number): LecturesAnual {
  if (data === null) {
    const res = new Array(6)
    res[module] = moduleData
    return res
  } else {
    data[module] = moduleData
    return data
  }
}

export { fetchLectures, createTableModule, createTableAnual}
