type RelationshipName =
  | 'Single'
  | 'In relationship'
  | 'Married'
  | 'Divorced'
  | null;

export default interface Relationship {
  id: number;
  name: RelationshipName;
}
