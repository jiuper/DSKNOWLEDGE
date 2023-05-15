import { ITestsCatalogPage } from "../../types/type";

export enum selectedFields {
  new = "Новые",
  old = "Старые",
  order = "А-Я",
  reverseOrder = "Я-А",
}

export type RequaredSortFields = {
  createdDate: string
  name: string
}

interface Props<T> {
  selectedField: string
  dataForSorting: T[]
  setFn: (a: T[]) => void
}

export function sortSelect<T extends RequaredSortFields>({
  selectedField,
  dataForSorting,
  setFn,
}: Props<T>): void {

  const select = {
    [selectedFields.new]: () => {
      setFn(dataForSorting.sort((a, b) => (a.createdDate > b.createdDate ? 1 : 0)))
    },
    [selectedFields.old]: () => {
      setFn(dataForSorting.sort((a, b) => (a.createdDate > b.createdDate ? 1 : -1)))
    },
    [selectedFields.order]: () => {
      setFn(dataForSorting.sort((a, b) => (a.name > b.name ? 1 : -1)))
    },
    [selectedFields.reverseOrder]: () => {
      setFn(dataForSorting.sort((a, b) => (a.name > b.name ? -1 : 0)))
    },
  }

  return select[selectedField as selectedFields]()

}

export const testCatalogLevelFilter = (selectValue: string, arrayOfTests: ITestsCatalogPage[]) => {
  const newState = selectValue ? arrayOfTests.filter(test => test.testLevel === selectValue)
    : [...arrayOfTests]
  return newState
}
