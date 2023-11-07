import {FieldTypeFromFieldPath, Indexes, NamedTableInfo} from 'convex/server'
import {DataModel, Doc, Id, TableNames} from '../_generated/dataModel'
import {DatabaseReader} from '../_generated/server'

export const asyncMap = async <FromType, ToType>(
	list: FromType[], 
	asyncTransform:(item: FromType) => Promise<ToType>
	): Promise<ToType[]> => {
		const promises: Promise<ToType>[] = []
		for (const item of list) {
			promises.push(asyncTransform(item))
		}
		return Promise.all(promises)
}

export const getAll = async <TableName extends TableNames> (
	db: DatabaseReader, 
	ids: Id<TableName>[]
): Promise<(Doc<TableName> | null)[]> => 
	asyncMap(ids, db.get)

type LookupFieldPaths<TableName extends TableNames> = {
	[FieldPath in DataModel[TableName]["fieldPaths"]]: `by_${FieldPath}` extends keyof DataModel[TableName]["indexes"]
		? Indexes<
				NamedTableInfo<DataModel, TableName>
			>[`by_${FieldPath}`][0] extends FieldPath
			? FieldPath
			: never
		: never
}[DataModel[TableName]["fieldPaths"]]

type TableWithLookups = {
	[TableName in TableNames]: LookupFieldPaths<TableName> extends never
	? never
	: TableName
}[TableNames] 

export const getOneFrom = async <
		TableName extends TableWithLookups,
		Field extends LookupFieldPaths<TableName>
	> (
		db: DatabaseReader,
		table: TableName,
		field: Field,
		value: FieldTypeFromFieldPath<Doc<TableName>, Field>
	): Promise<Doc<TableName> | null> => {
		const ret = db
			.query(table)
			.withIndex('by_' + field, q => q.eq(field, value as any))
			.unique()
		
		return ret	
	}

export const getManyFrom = async<
  TableName extends TableWithLookups,
  Field extends LookupFieldPaths<TableName>
>(
  db: DatabaseReader,
  table: TableName,
  field: Field,
  value: FieldTypeFromFieldPath<Doc<TableName>, Field>
): Promise<(Doc<TableName> | null)[]> => 
  db
	.query(table)
  .withIndex("by_" + field, (q) => q.eq(field, value as any))
  .collect()


type IdFilePaths<
	InTableName extends TableWithLookups,
	TableName extends TableNames
> = {
	[FieldName in DataModel[InTableName]['fieldPaths']]: FieldTypeFromFieldPath<
		Doc<InTableName>,
		FieldName
	> extends Id<TableName>
	? FieldName extends '_id'
		? never
		: FieldName
	: never
}[DataModel[InTableName]['fieldPaths']]

type LookupAndIdFilePaths<TableName extends TableWithLookups> = {
	[FieldPath in IdFilePaths<
			TableName,
			TableNames
		>]: LookupFieldPaths<TableName> extends FieldPath
		? never
		: true
}[IdFilePaths<TableName, TableNames>]
	
type JoinTables = {
	[TableName in TableWithLookups]: LookupAndIdFilePaths<TableName> extends never
		? never
		: TableName
}[TableWithLookups]
		
export const getManyVia = async <
  JoinTableName extends JoinTables,
  ToField extends IdFilePaths<JoinTableName, TableNames>,
  FromField extends Exclude<LookupFieldPaths<JoinTableName>, ToField>,
  TargetTableName extends TableNames = FieldTypeFromFieldPath<
    Doc<JoinTableName>,
    ToField
  > extends Id<infer TargetTableName>
    ? TargetTableName
    : never
>(
  db: DatabaseReader,
  table: JoinTableName,
  toField: ToField,
  fromField: FromField,
  value: FieldTypeFromFieldPath<Doc<JoinTableName>, FromField>
): Promise<(Doc<TargetTableName> | null)[]> => {
  return asyncMap(await getManyFrom(db, table, fromField, value), (link) =>
    db.get((link as any)[toField])
  )
}

export const pruneNull = <T>(list: (T | null)[]): T[] => 
  list.filter((i) => i !== null) as T[];
