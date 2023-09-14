import { SchemaAware, SchemaBuilder, ValueSchema } from '@fluid-experimental/tree2';

// Schema is defined using a builder object that generates a schema that is passed into the
// SharedTree data structure when it is initialized. The following code
// defines a set of types, both primitives and user-defined, that are used to
// build the schema and, in the case of user-defined types, can be exported
// as TypeScript types to make it easier to write the app in a type-safe manner.

// Include a UUID to guarantee that this schema will be unique
const builder = new SchemaBuilder('fc1db2e8-0a00-11ee-be56-0242ac120002');

// Define the primitive this app uses
export const float64 = builder.leaf('number', ValueSchema.Number);
export const string = builder.leaf('string', ValueSchema.String);

// Schema for a row in the table, represented as a map to the cell contents
export const rowSchema = builder.map('demo:row', SchemaBuilder.fieldValue(float64));

// Definition of column metadata. Id is unique per table.
export const columnDefinitionSchema = builder.struct('demo:columnDefinition', {
    id: SchemaBuilder.fieldValue(string),
    name: SchemaBuilder.fieldValue(string),
})

// Schema for table data represented by a sequence of rows
export const tableSchema = builder.struct('demo:table', {
    columnDefinitions: SchemaBuilder.fieldSequence(columnDefinitionSchema),
    rows: SchemaBuilder.fieldSequence(rowSchema),
});

// Define a root type. This only contains a single table but if the app needed
// additional metadata or other app data, it is easy to add that here.
export const appSchema = builder.struct('demo:tableApp', {
    table: SchemaBuilder.fieldValue(tableSchema),
});

// Define the root of the schema as the app type.
export const rootField = SchemaBuilder.fieldValue(appSchema);

// Create the schema object to pass into the SharedTree
export const schema = builder.intoDocumentSchema(rootField);

export type App = SchemaAware.TypedNode<typeof appSchema>;
export type Table = SchemaAware.TypedNode<typeof tableSchema>;
export type Row = SchemaAware.TypedNode<typeof rowSchema>;
export type ColumnDefinition = SchemaAware.TypedNode<typeof columnDefinitionSchema>;
