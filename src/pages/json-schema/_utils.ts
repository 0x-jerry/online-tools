/**
 * https://raw.githubusercontent.com/SchemaStore/schemastore/master/src/api/json/catalog.json
 */
export async function getSchemaList(): Promise<SchemaItem[]> {
  const url =
    'https://raw.githubusercontent.com/SchemaStore/schemastore/master/src/api/json/catalog.json'

  const data: Root = await (await fetch(url)).json()

  return data.schemas
}

interface Root {
  $schema: string
  version: number
  schemas: SchemaItem[]
}

export interface SchemaItem {
  name: string
  description: string
  fileMatch?: string[]
  url: string
  versions?: string
}
