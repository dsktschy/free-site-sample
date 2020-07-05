import axios from 'axios'
import { inputFieldsPerRequest } from '../json/variables.json'
import { createInputFieldsFetcherConfig } from './fetcher-config-creator.ts'

export async function getInputFieldContentList({ fields, offset, limit } = {}) {
  const config = createInputFieldsFetcherConfig({ fields, offset, limit })
  const response = await axios.get('', config)
  if (!response.data) throw new Error('API response is invalid.')
  return response.data.contents
}

export async function getAllInputFieldContents() {
  const allInputFieldContents = []
  let inputFieldContentList = []
  do {
    const offset = allInputFieldContents.length
    const options = { limit: inputFieldsPerRequest, offset }
    inputFieldContentList = await getInputFieldContentList(options)
    allInputFieldContents.push(...inputFieldContentList)
  } while (inputFieldContentList.length === inputFieldsPerRequest)
  return allInputFieldContents
}